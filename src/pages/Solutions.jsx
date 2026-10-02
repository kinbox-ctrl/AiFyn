import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { Reveal, SectionTag } from "../components/Reveal";
import GlowCard from "../components/GlowCard";
import { CAPABILITIES } from "../data/capabilities";
import Icon from "../lib/icons";

export default function Solutions() {
  return (
    <>
      <Seo title="Solutions" path="/solutions" description="Ten AI capabilities for your existing CCTV — intrusion, theft, PPE, ANPR, footfall, fire, hygiene, driver behaviour and quality checks." />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="aurora left-[-8%] top-[-10%] h-[420px] w-[420px] animate-drift bg-aqua/20" />
        <div className="mx-auto max-w-7xl px-6">
          <SectionTag>SOLUTIONS</SectionTag>
          <Reveal><h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
            Ten ways your cameras start working.
          </h1></Reveal>
          <Reveal delay={0.1}><p className="mt-3 max-w-lg text-ink/60">
            Every capability runs on the same platform and the same cameras — switch on what you need.
          </p></Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.08} className="h-full">
                <GlowCard className="glass h-full min-h-[190px] rounded-3xl" data-testid="solution-card">
                  <Link to={`/solutions/${c.slug}`} className="flex h-full flex-col p-6" data-testid={`solution-link-${c.slug}`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-border">
                      <Icon name={c.icon} className="h-5 w-5 text-aqua" />
                    </div>
                    <h2 className="mt-4 font-display text-lg font-semibold text-deep">{c.name}</h2>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/60">{c.short}</p>
                    <span className="mono-tag mt-4 flex items-center gap-1.5 text-aqua">
                      EXPLORE <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}