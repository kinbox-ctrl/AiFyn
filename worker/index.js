// AiFyn API on Cloudflare Workers + D1.
// Static assets (the React app) are served by Workers Static Assets; only /api/* reaches this code.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const PHONE_RE = /^\+?[0-9][0-9\s\-()]{7,16}$/;
const RATE_LIMIT_PER_HOUR = 5;
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
const LIMITS = { name: 120, company: 160, industry: 80, cameras: 40, phone: 32, email: 200, city: 120, message: 2000, sourcePage: 200 };
const CSV_COLUMNS = ["created_at", "name", "company", "industry", "cameras", "phone", "email", "city", "message", "source_page"];

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });

const enc = new TextEncoder();
const b64url = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function sha256Hex(s) {
  const d = await crypto.subtle.digest("SHA-256", enc.encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}

// Length-independent constant-time comparison (compares digests).
async function safeEqual(a, b) {
  const [x, y] = await Promise.all([sha256Hex(a), sha256Hex(b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0;
}

async function issueToken(env) {
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return `${exp}.${await hmac(env.ADMIN_PASSWORD, `admin:${exp}`)}`;
}

async function verifyToken(env, token) {
  if (!token || !env.ADMIN_PASSWORD) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(env.ADMIN_PASSWORD, `admin:${exp}`));
}

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

async function createLead(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ detail: "Invalid JSON" }, 400);
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success, store nothing.
  if (clean(body.website, 200)) return json({ ok: true, id: crypto.randomUUID() }, 201);

  const lead = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body[k], max)]));
  const errors = {};
  for (const k of ["name", "company", "industry", "cameras", "city"]) if (!lead[k]) errors[k] = "required";
  if (!PHONE_RE.test(lead.phone)) errors.phone = "invalid";
  if (!EMAIL_RE.test(lead.email)) errors.email = "invalid";
  if (Object.keys(errors).length) return json({ detail: "Validation failed", errors }, 422);

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const ipHash = await sha256Hex(`${ip}:${env.ADMIN_PASSWORD || "aifyn"}`);
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { n } = await env.DB.prepare("SELECT COUNT(*) AS n FROM leads WHERE ip_hash = ? AND created_at > ?")
    .bind(ipHash, since)
    .first();
  if (n >= RATE_LIMIT_PER_HOUR) return json({ detail: "Too many submissions. Try again later." }, 429);

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO leads (id, name, company, industry, cameras, phone, email, city, message, source_page, ip_hash, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, lead.name, lead.company, lead.industry, lead.cameras, lead.phone, lead.email, lead.city,
      lead.message || null, lead.sourcePage || null, ipHash, new Date().toISOString())
    .run();

  return json({ ok: true, id }, 201);
}

async function listLeads(env) {
  const { results } = await env.DB.prepare(
    `SELECT id, name, company, industry, cameras, phone, email, city, message, source_page, created_at
     FROM leads ORDER BY created_at DESC LIMIT 5000`,
  ).all();
  return results;
}

const csvCell = (v) => {
  let s = String(v ?? "");
  if (/^[=@\t\r]/.test(s) || /^[+\-](?![\d\s()\-]*$)/.test(s)) s = `'${s}`; // neutralise spreadsheet formula injection
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

async function handleApi(request, env, path) {
  const method = request.method;

  if (path === "/api" || path === "/api/") return json({ message: "AiFyn API is live" });

  if (path === "/api/leads" && method === "POST") return createLead(request, env);

  if (path === "/api/admin/login" && method === "POST") {
    if (!env.ADMIN_PASSWORD) return json({ detail: "Admin not configured" }, 503);
    const { password = "" } = await request.json().catch(() => ({}));
    if (!(await safeEqual(String(password), env.ADMIN_PASSWORD))) return json({ detail: "Invalid password" }, 401);
    return json({ token: await issueToken(env) });
  }

  if (path.startsWith("/api/admin/")) {
    if (!(await verifyToken(env, request.headers.get("x-admin-token")))) return json({ detail: "Unauthorized" }, 401);

    if (path === "/api/admin/leads" && method === "GET") return json(await listLeads(env));

    if (path === "/api/admin/leads/export" && method === "GET") {
      const rows = await listLeads(env);
      const csv = [CSV_COLUMNS.join(","), ...rows.map((r) => CSV_COLUMNS.map((c) => csvCell(r[c])).join(","))].join("\r\n");
      return new Response(csv, {
        headers: {
          "content-type": "text/csv; charset=utf-8",
          "content-disposition": 'attachment; filename="aifyn-leads.csv"',
          "cache-control": "no-store",
        },
      });
    }
  }

  return json({ detail: "Not Found" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request, env, url.pathname);
      } catch (err) {
        console.error(err);
        return json({ detail: "Internal error" }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
