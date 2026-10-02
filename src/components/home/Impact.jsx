import { Reveal, SectionTag } from "../Reveal";
import Counter from "../Counter";
import GlowCard from "../GlowCard";
import LogoMarquee from "../LogoMarquee";
import { DIFFERENTIATORS, STATS } from "../../data/site";
import Icon from "../../lib/icons";

function StatValue({ s }) {
  if (s.animated) {
    return (
      <Counter to={90} prefix="up to " suffix="%" className="text-warm font-display text-5xl font-bold tracking-tight sm:text-6xl" />
    );
  }
  return (
    <span className={`${s.value === "<1s" ? "shimmer-text" : "text-teal-grad"} font-display text-5xl font-bold tracking-tight sm:text-6xl`}>
      {s.value}
    </span>
  );
}

export default function Impact() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTag>IMPACT + WHY AIFYN</SectionTag>
        <Reveal><h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
          Efficient team. Vast coverage.
        </h2></Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3" data-testid="impact-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="gradient-border rounded-3xl p-7 text-center sm:text-left">
                <StatValue s={s} />
                <p className="mono-tag mt-3">{s.label.toUpperCase()}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="differentiators">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08} className="h-full">
              <GlowCard className="glass h-full rounded-3xl p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint">
                  <Icon name={d.icon} className="h-5 w-5 text-deep" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-deep">{d.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{d.body}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <p className="mono-tag mb-6 text-center">TRUSTED BY TEAMS AT · PLACEHOLDER LOGOS</p>
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}