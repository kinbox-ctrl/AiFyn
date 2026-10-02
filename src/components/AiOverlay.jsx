import { motion } from "framer-motion";

/** Animated AI detection layer — bounding boxes, mono confidence tags, scan line. */
export default function AiOverlay({ boxes = [], scan = true, badge = "LIVE", className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {scan && <div className="scan-sweep" />}
      {boxes.map((b, i) => (
        <motion.div
          key={`${b.label}-${i}`}
          className="absolute"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            className={`h-full w-full rounded-[4px] border-[1.5px] ${
              b.tone === "warm"
                ? "border-coral shadow-[0_0_20px_rgba(254,122,89,0.55)]"
                : "border-aqua shadow-[0_0_20px_rgba(15,181,174,0.5)]"
            }`}
          >
            <span className={`absolute -left-[1.5px] -top-[1.5px] h-1.5 w-1.5 ${b.tone === "warm" ? "bg-coral" : "bg-aqua"}`} />
            <span className={`absolute -right-[1.5px] -top-[1.5px] h-1.5 w-1.5 ${b.tone === "warm" ? "bg-coral" : "bg-aqua"}`} />
            <span className={`absolute -bottom-[1.5px] -left-[1.5px] h-1.5 w-1.5 ${b.tone === "warm" ? "bg-coral" : "bg-aqua"}`} />
            <span className={`absolute -bottom-[1.5px] -right-[1.5px] h-1.5 w-1.5 ${b.tone === "warm" ? "bg-coral" : "bg-aqua"}`} />
          </div>
          <div
            className={`absolute -top-[18px] left-0 whitespace-nowrap rounded-sm px-1.5 py-[2px] font-mono text-[8.5px] font-semibold tracking-wider text-white ${
              b.tone === "warm" ? "bg-coral/95" : "bg-aqua/95"
            }`}
          >
            {b.label}
            {b.conf && b.conf !== "—" && <span className="ml-1 opacity-80">·{b.conf}</span>}
          </div>
        </motion.div>
      ))}
      {badge && (
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.18em] text-deep shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-red-500" />
          {badge}
        </div>
      )}
    </div>
  );
}