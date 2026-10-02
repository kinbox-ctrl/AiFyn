import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, SectionTag } from "../Reveal";
import Icon from "../../lib/icons";

const STEPS = [
  { icon: "PlugZap", title: "Connect existing cameras", body: "No rip-and-replace. AiFyn plugs into the CCTV you already own — IP or analogue." },
  { icon: "ScanEye", title: "AI detects", body: "Models watch every frame for people, vehicles, PPE, smoke, plates and more." },
  { icon: "BellRing", title: "Instant alerts", body: "WhatsApp, app and dashboard — the right team knows in under a second." },
  { icon: "TrendingUp", title: "Insights & reports", body: "Trends, heatmaps and shift reports that sharpen every decision." },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="how-it-works" className="relative py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag>HOW IT WORKS</SectionTag>
            <Reveal><h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
              From cameras to clarity in four steps.
            </h2></Reveal>
          </div>
          <Reveal delay={0.15}><p className="max-w-xs text-sm leading-relaxed text-ink/60">
            Your existing CCTV becomes an intelligent layer — live in days.
          </p></Reveal>
        </div>

        <div className="relative mt-16">
          {/* glowing connector line, drawn on scroll */}
          <div className="absolute left-[12%] right-[12%] top-[52px] hidden h-px bg-deep/10 md:block" aria-hidden="true">
            <motion.div
              className="h-[2px] -translate-y-px origin-left bg-gradient-to-r from-aqua via-warmorange to-amber shadow-[0_0_14px_rgba(15,181,174,0.7)]"
              style={{ scaleX }}
              data-testid="how-it-works-line"
            />
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 md:grid-cols-4" data-testid="how-it-works-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <li className="glass relative h-full rounded-3xl p-6">
                  <span className="absolute right-6 top-5 font-mono text-[11px] font-semibold tracking-widest text-deep/30">
                    0{i + 1}
                  </span>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-border shadow-card">
                    <Icon name={s.icon} className="h-6 w-6 text-aqua" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-deep">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}