import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import { Mark } from "../components/Logo";
import { adminLogin, fetchLeads, exportCsv } from "../lib/api";
import Icon from "../lib/icons";

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("aifyn-admin-token") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { token: t } = await adminLogin(password);
      sessionStorage.setItem("aifyn-admin-token", t);
      setToken(t);
      load(t);
    } catch {
      setError("Wrong password.");
    }
  };

  const load = async (t = token) => {
    setLoading(true);
    try {
      setLeads(await fetchLeads(t));
    } catch {
      setError("Could not load leads.");
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pearl px-6">
        <Seo title="Admin" path="/admin" />
        <form onSubmit={login} className="glass-deep w-full max-w-sm rounded-3xl p-8 shadow-glass" data-testid="admin-login-form">
          <Mark className="h-10 w-10" />
          <h1 className="mt-4 font-display text-xl font-bold text-deep">Lead Desk</h1>
          <p className="mt-1 text-xs text-ink/50">Password-protected. AiFyn team only.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-5 w-full rounded-xl border border-deep/15 bg-white/80 px-4 py-3 text-sm focus:border-aqua focus:outline-none focus:ring-2 focus:ring-aqua/25"
            data-testid="admin-password-input"
          />
          {error && <p role="alert" className="mt-2 text-xs font-medium text-coral" data-testid="admin-login-error">{error}</p>}
          <button type="submit" className="btn-warm mt-4 w-full rounded-xl px-6 py-3 text-sm font-bold" data-testid="admin-login-button">
            Enter
          </button>
          <Link to="/" className="mt-4 block text-center text-xs text-ink/40 hover:text-deep">← Back to site</Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pearl px-6 py-10">
      <Seo title="Lead Desk" path="/admin" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-deep">Lead Desk</h1>
            <p className="mono-tag mt-1">{leads.length} LEADS · LATEST FIRST</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => load()} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-deep" data-testid="admin-refresh-button">
              <Icon name="RefreshCw" className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button onClick={() => exportCsv(token)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-deep" data-testid="admin-export-csv">
              <Icon name="Download" className="h-3.5 w-3.5" /> Export CSV
            </button>
            <button onClick={() => { sessionStorage.removeItem("aifyn-admin-token"); setToken(""); }} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-coral" data-testid="admin-logout">
              <Icon name="LogOut" className="h-3.5 w-3.5" /> Logout
            </button>
            <Link to="/" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-deep">Site</Link>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-deep mt-6 overflow-x-auto rounded-3xl shadow-card">
          <table className="w-full min-w-[900px] text-left text-xs" data-testid="admin-leads-table">
            <thead>
              <tr className="border-b border-deep/10 font-mono text-[10px] uppercase tracking-wider text-deep/50">
                {["Time (UTC)", "Name", "Company", "Industry", "Cameras", "Phone", "Email", "City", "Message", "Source"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-deep/5 text-ink/75 last:border-0 hover:bg-tint/50">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-[10px]">{(l.created_at || "").replace("T", " ").slice(0, 19)}</td>
                  <td className="px-4 py-3 font-semibold text-deep">{l.name}</td>
                  <td className="px-4 py-3">{l.company}</td>
                  <td className="px-4 py-3">{l.industry}</td>
                  <td className="px-4 py-3">{l.cameras}</td>
                  <td className="whitespace-nowrap px-4 py-3">{l.phone}</td>
                  <td className="px-4 py-3">{l.email}</td>
                  <td className="px-4 py-3">{l.city}</td>
                  <td className="max-w-[180px] truncate px-4 py-3">{l.message || "—"}</td>
                  <td className="px-4 py-3 font-mono text-[10px]">{l.source_page}</td>
                </tr>
              ))}
              {!leads.length && !loading && (
                <tr><td colSpan={10} className="px-4 py-10 text-center text-ink/40">No leads yet — they will appear here the moment the demo form is used.</td></tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
}