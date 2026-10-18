// First-party page-view tracking for the AiFyn dashboard. No cookies, no third-party script:
// one beacon per route change (POST /api/t) and the time spent on the page when the tab is hidden or left.
const SESSION_KEY = "aifyn-session";
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

// Per-tab session id; links every page view and the demo request to the same visit.
export function sessionId() {
  try {
    let s = sessionStorage.getItem(SESSION_KEY);
    if (!s) {
      s = uuid();
      sessionStorage.setItem(SESSION_KEY, s);
    }
    return s;
  } catch {
    return "";
  }
}

let current = null; // { id, start } of the page view being timed
let last = { path: null, at: 0 };

function send(payload) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon && navigator.sendBeacon("/api/t", new Blob([body], { type: "application/json" }))) return;
  } catch {}
  fetch("/api/t", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true }).catch(() => {});
}

function sendDuration() {
  if (!current) return;
  send({ id: current.id, session: sessionId(), duration_ms: Date.now() - current.start });
}

export function trackPageview(path) {
  if (path.startsWith("/admin")) return;
  // React StrictMode mounts effects twice in development.
  if (last.path === path && Date.now() - last.at < 1000) return;
  sendDuration();
  const q = new URLSearchParams(window.location.search);
  current = { id: uuid(), start: Date.now() };
  last = { path, at: current.start };
  send({
    id: current.id,
    session: sessionId(),
    path,
    referrer: document.referrer || null,
    utm_source: q.get("utm_source"),
    utm_medium: q.get("utm_medium"),
    utm_campaign: q.get("utm_campaign"),
  });
}

export function initAnalytics() {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sendDuration();
  });
  window.addEventListener("pagehide", sendDuration);
}
