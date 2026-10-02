import { useRef } from "react";

/** Glass card with a cursor-reactive aqua glow. */
export default function GlowCard({ children, className = "", ...props }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(15,181,174,0.16), transparent 65%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}