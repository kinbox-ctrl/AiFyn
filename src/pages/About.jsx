import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { Reveal, SectionTag } from "../components/Reveal";
import GlowCard from "../components/GlowCard";
import Magnetic from "../components/Magnetic";
import { BRAND, CONTACT } from "../data/site";
import { FOUNDERS, MENTORSHIP } from "../data/team";
import Icon from "../lib/icons";

export default function About() {
  return (
    <>
      <Seo title="About" path="/about" description="AiFyn — Ai For Your Needs. Vision, mission and the founders, Raghav Gupta and Rishi Jha, making cameras intelligent." />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="aurora left-[-6%] top-[0%] h-[420px] w-[420px] animate-drift bg-aqua/20" />
        <div className="mx-auto max-w-7xl px-6">
          <SectionTag>ABOUT · AI FOR YOUR NEEDS</SectionTag>
          <Reveal><h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
            Precision, watching over people.
          </h1></Reveal>
          <Reveal delay={0.1}><p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">{BRAND.coreLine}</p></Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Reveal className="h-full">
              <GlowCard className="glass h-full rounded-3xl p-8" data-testid="vision-card">
                <span className="mono-tag">VISION</span>
                <h2 className="mt-3 font-display text-2xl font-bold text-deep">
                  A world where every space with a camera is a safer, smarter space.
                </h2>
              </GlowCard>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <GlowCard className="glass h-full rounded-3xl p-8" data-testid="mission-card">
                <span className="mono-tag">MISSION</span>
                <h2 className="mt-3 font-display text-2xl font-bold text-deep">
                  Make existing cameras intelligent — so teams prevent loss and act in seconds, not shifts.
                </h2>
              </GlowCard>
            </Reveal>
          </div>

          <section className="mt-24" aria-labelledby="leadership-heading">
            <SectionTag>LEADERSHIP</SectionTag>
            <Reveal><h2 id="leadership-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-deep sm:text-4xl">
              The people behind AiFyn.
            </h2></Reveal>
            <div className="mt-10 space-y-6">
              {FOUNDERS.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.08}>
                  <GlowCard className="glass rounded-3xl p-6 sm:p-8" data-testid="leader-card">
                    <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-start">
                      <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl border-t-4 border-coral bg-tint">
                        <img
                          src={f.photo}
                          alt={`${f.name}, ${f.role}`}
                          loading="lazy"
                          className="aspect-[4/5] w-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-deep sm:text-3xl">{f.name}</h3>
                        <p className="mt-1.5 text-sm font-semibold italic text-coral">{f.role}</p>
                        <span className="mt-4 block h-0.5 w-16 rounded-full bg-coral" aria-hidden="true" />
                        <p className="mt-5 text-base font-medium leading-relaxed text-ink/85">{f.lead}</p>
                        <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/65">
                          {f.bio.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mt-24" aria-labelledby="mentorship-heading">
            <SectionTag>MENTORSHIP</SectionTag>
            <Reveal><h2 id="mentorship-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-deep sm:text-4xl">
              Guided by decades of experience.
            </h2></Reveal>
            <Reveal delay={0.08} className="mt-10">
              <GlowCard className="glass rounded-3xl p-6 sm:p-8" data-testid="mentorship-card">
                <p className="text-base font-medium leading-relaxed text-ink/85">{MENTORSHIP[0]}</p>
                <span className="mt-5 block h-0.5 w-16 rounded-full bg-coral" aria-hidden="true" />
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink/65">
                  {MENTORSHIP.slice(1).map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
                </div>
              </GlowCard>
            </Reveal>
          </section>

          <Reveal className="mt-20">
            <div className="glass-deep flex flex-col items-center justify-between gap-6 rounded-[32px] p-10 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-2xl font-bold text-deep">Come see what your cameras know.</h2>
                <p className="mt-1.5 text-sm text-ink/60">{CONTACT.email} · {CONTACT.phone}</p>
              </div>
              <Magnetic strength={0.25}>
                <Link to="/contact" className="btn-warm inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold">
                  Get in Touch <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}