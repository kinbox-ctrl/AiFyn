import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionTag } from "../Reveal";
import AiOverlay from "../AiOverlay";
import { MEDIA } from "../../config/media";

const FEED = [
  { tone: "bg-coral", text: "PPE violation · Line 2", time: "10:42 AM" },
  { tone: "bg-coral", text: "Perimeter breach · North fence", time: "10:41 AM" },
  { tone: "bg-aqua", text: "Vehicle logged · Gate 3 · MH-12-AB-3456", time: "10:39 AM" },
  { tone: "bg-amber", text: "Crowd density high · Atrium", time: "10:38 AM" },
  { tone: "bg-coral", text: "Smoke suspected · Kitchen zone", time: "10:36 AM" },
  { tone: "bg-aqua", text: "Shift attendance synced · 214 staff", time: "10:30 AM" },
  { tone: "bg-amber", text: "Forklift near-miss · Bay 7", time: "10:24 AM" },
  { tone: "bg-aqua", text: "Gate 1 clear · Last sweep 10:20 AM", time: "10:20 AM" },
];

const HEAT = Array.from({ length: 7 }, (_, r) =>
  Array.from({ length: 14 }, (_, c) => ((r * 7 + c * 5) % 10) / 10 * (((r + c) % 3) + 1) / 3
));

const TILES = [
  { media: MEDIA.hero, id: "CAM 04 · FLOOR A", boxes: [{ x: 20, y: 30, w: 22, h: 45, label: "PERSON", conf: "0.97", tone: "warm" }] },
  { media: MEDIA.warehouse, id: "CAM 11 · DOCK 2", boxes: [{ x: 45, y: 35, w: 26, h: 40, label: "PALLET", conf: "0.95" }] },
  { media: MEDIA.crowd, id: "CAM 02 · LOBBY", boxes: [{ x: 12, y: 28, w: 16, h: 42, label: "COUNT 34", conf: "—", tone: "warm" }] },
];

const MESSAGES = [
  { text: "PPE violation – Line 2 – 10:42 AM", img: MEDIA.pharmaQc.poster, time: "10:42 AM" },
  { text: "Intrusion detected – Gate 2 – 11:03 PM", img: MEDIA.parking.poster, time: "11:03 PM" },
  { text: "Truck MH-12-AB-3456 logged – Gate 3", img: MEDIA.highway.poster, time: "10:39 AM" },
];

function Dashboard() {
  return (
    <div className="glass-deep rounded-3xl p-4 shadow-glass sm:p-5" data-testid="dashboard-mock">
      <div className="flex items-center justify-between gap-3 px-1 pb-3">
        <span className="mono-tag font-semibold">AIFYN OPS · GURUGRAM CAMPUS</span>
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-red-50 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-red-500">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-red-500" /> Simulated Real-Time View
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {TILES.map((t) => (
          <div key={t.id} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-tint">
            <img src={t.media.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
            <AiOverlay boxes={t.boxes} scan={false} badge={null} className="[&>div]:!scale-100" />
            <span className="absolute bottom-1 left-1.5 font-mono text-[7px] tracking-wider text-white/90 bg-black/30 rounded px-1">{t.id}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1.15fr_1fr]">
        {/* scrolling alert feed */}
        <div className="flex h-56 flex-col rounded-xl border border-deep/10 bg-white/70 p-3 md:h-auto">
          {/* heading stays put; only the list below it scrolls */}
          <p className="mono-tag mb-2 shrink-0">ALERT FEED</p>
          <div className="relative min-h-0 flex-1">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%)",
            }}
          >
            <motion.div
              animate={useReducedMotion() ? {} : { y: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {[...FEED, ...FEED].map((f, i) => (
                <div key={i} className="flex items-center gap-2 py-1 font-mono text-[10px] text-ink/70">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${f.tone}`} />
                  <span className="min-w-0 flex-1 truncate">{f.text}</span>
                  <span className="shrink-0 text-ink/35">{f.time}</span>
                </div>
              ))}
            </motion.div>
          </div>
          </div>
        </div>

        {/* heatmap + sparkline */}
        <div className="grid grid-rows-2 gap-3">
          <div className="rounded-xl border border-deep/10 bg-white/70 p-3">
            <p className="mono-tag mb-2">HEATMAP · MOVEMENT</p>
            <div className="grid grid-cols-14 gap-[3px]" style={{ gridTemplateColumns: "repeat(14, 1fr)" }}>
              {HEAT.flatMap((row, r) => row.map((v, c) => (
                <span key={`${r}-${c}`} className="aspect-square rounded-[2px]" style={{ background: `rgba(15,181,174,${0.08 + v * 0.55})` }} />
              )))}
            </div>
          </div>
          <div className="rounded-xl border border-deep/10 bg-white/70 p-3">
            <div className="flex items-center justify-between">
              <p className="mono-tag">ALERTS / HOUR</p>
              <span className="font-mono text-[9px] text-aqua">▼ 32% THIS WEEK</span>
            </div>
            <svg viewBox="0 0 120 36" className="mt-1 h-9 w-full" preserveAspectRatio="none" aria-hidden="true">
              <polyline points="0,30 15,26 30,28 45,18 60,20 75,10 90,14 105,6 120,8"
                fill="none" stroke="#0FB5AE" strokeWidth="2" strokeLinecap="round" />
              <polyline points="0,30 15,26 30,28 45,18 60,20 75,10 90,14 105,6 120,8 120,36 0,36"
                fill="rgba(15,181,174,0.12)" stroke="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="mx-auto w-[290px] rounded-[44px] glass-deep p-2.5 shadow-glass" data-testid="phone-mock">
      <div className="force-light overflow-hidden rounded-[36px] bg-[#efe9e1]">
        <div className="flex items-center gap-2.5 bg-[#f0f0f0] px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-deep font-display text-[10px] font-bold text-white">Ai</span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-ink">AiFyn Alerts</p>
            <p className="font-mono text-[9px] text-emerald-600">online · alerts only</p>
          </div>
        </div>
        <div className="space-y-2.5 px-3 py-4">
          {MESSAGES.map((m, i) => (
            <motion.div
              key={m.text}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, 8] }}
              transition={{ duration: 12, times: [0, 0.06, 0.9, 1], repeat: Infinity, delay: i * 2.2 }}
              className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white p-2 shadow-sm"
            >
              <img src={m.img} alt="" loading="lazy" className="h-20 w-full rounded-lg object-cover" />
              <p className="mt-1.5 px-1 text-[11.5px] leading-snug text-ink/85">{m.text}</p>
              <p className="px-1 pt-0.5 text-right font-mono text-[8px] text-ink/35">{m.time} ✓✓</p>
            </motion.div>
          ))}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardShowcase() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [12, 0]);

  return (
    <section id="live-dashboard" ref={ref} className="relative overflow-hidden py-24">
      <div className="aurora right-[-6%] top-[10%] h-[420px] w-[420px] animate-drift-slow bg-aqua/20" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionTag>LIVE DASHBOARD + WHATSAPP</SectionTag>
        <Reveal><h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
          Your security, on one calm screen.
        </h2></Reveal>
        <Reveal delay={0.1}><p className="mt-3 max-w-lg text-ink/60">
          Every camera, alert and trend in one live view — with WhatsApp alerts that reach the right person first.
        </p></Reveal>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.45fr_1fr]">
          <motion.div style={{ rotateX, transformPerspective: 1200 }} className="[transform-style:preserve-3d]">
            <Dashboard />
          </motion.div>
          <div>
            <Phone />
            <Reveal delay={0.2}><p className="mx-auto mt-8 max-w-xs text-center text-sm leading-relaxed text-ink/60">
              Alerts reach the right person first — on the app your team already uses.
            </p></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}