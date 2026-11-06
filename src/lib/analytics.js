// Page-view tracking: the AiFyn dashboard's own beacon (POST /api/t on every route change, plus time on
// page when the tab is hidden or left) and, when GA_MEASUREMENT_ID is set, Google Analytics 4 in parallel.
import { GA_MEASUREMENT_ID } from "../data/site";

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

// Google Analytics 4: loaded once, page views sent manually so client-side route changes are counted.
function loadGa() {
  if (!GA_MEASUREMENT_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(s);
}

function gaPageview(path) {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

// Demo request submitted: GA4's standard lead conversion event.
export function trackLead(industry) {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag?.("event", "generate_lead", { industry });
}

export function trackPageview(path) {
  if (path.startsWith("/admin")) return;
  // React StrictMode mounts effects twice in development.
  if (last.path === path && Date.now() - last.at < 1000) return;
  sendDuration();
  gaPageview(path);
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
  loadGa();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sendDuration();
  });
  window.addEventListener("pagehide", sendDuration);
}
