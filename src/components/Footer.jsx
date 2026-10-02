import { Link } from "react-router-dom";
import Logo from "./Logo";
import { BRAND, CONTACT, NAV_LINKS, SOCIALS } from "../data/site";
import { CAPABILITIES } from "../data/capabilities";
import Icon from "../lib/icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-deep/10 bg-white/60">
      <div className="aurora -left-32 -top-32 h-72 w-72 bg-aqua/20" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">{BRAND.coreLine}</p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-deep/15 text-deep/60 transition-all hover:border-aqua hover:text-aqua"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Solutions">
            <p className="mono-tag mb-4">Solutions</p>
            <ul className="space-y-2.5">
              {CAPABILITIES.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link to={`/solutions/${c.slug}`} className="text-sm text-ink/60 transition-colors hover:text-deep">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/solutions" className="text-sm font-medium text-aqua hover:text-deep">
                  All solutions →
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="mono-tag mb-4">Company</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink/60 transition-colors hover:text-deep">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/privacy" className="text-sm text-ink/60 transition-colors hover:text-deep">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="mono-tag mb-4">Reach Us</p>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-ink/70 hover:text-deep">
              <Icon name="Mail" className="h-4 w-4 text-aqua" /> {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="mt-2.5 flex items-center gap-2 text-sm text-ink/70 hover:text-deep">
              <Icon name="Phone" className="h-4 w-4 text-aqua" /> {CONTACT.phone}
            </a>
            <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-deep/50">
              {CONTACT.cities.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  {i > 0 && <span className="text-amber">·</span>} {c}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-deep/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink/50">
            © {year} {BRAND.name} – {BRAND.tagline}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deep/40">
            AI VIDEO ANALYTICS · SECURITY · OPERATIONS
          </p>
        </div>
      </div>
    </footer>
  );
}