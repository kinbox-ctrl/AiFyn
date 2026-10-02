import { Link } from "react-router-dom";
import { BRAND } from "../data/site";

export function Mark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="aifyn-mark-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FE7A59" />
          <stop offset="1" stopColor="#FE9937" />
        </linearGradient>
        <linearGradient id="aifyn-mark-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEC437" />
          <stop offset="1" stopColor="#FFD447" />
        </linearGradient>
        <clipPath id="aifyn-mark-clip">
          <rect width="64" height="64" rx="14" />
        </clipPath>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#aifyn-mark-bg)" />
      <g clipPath="url(#aifyn-mark-clip)" fill="none" stroke="url(#aifyn-mark-arrow)" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M46.5 17.5 L-4 68" />
        <path d="M23 17.5 H46.5 V41" />
      </g>
    </svg>
  );
}

export default function Logo({ withTagline = true, className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} data-testid="logo-link" aria-label="AiFyn home">
      <Mark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-deep">
          {BRAND.name}
        </span>
        {withTagline && (
          <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-deep/50">
            {BRAND.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}