import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { Reveal, SectionTag } from "../components/Reveal";
import GlowCard from "../components/GlowCard";
import Magnetic from "../components/Magnetic";
import { getIndustry } from "../data/industries";
import { CAPABILITIES } from "../data/capabilities";
import Icon from "../lib/icons";
import NotFound from "./NotFound";

export default function IndustryDetail() {
  const { slug } = useParams();
  const ind = getIndustry(slug);
  if (!ind) return <NotFound />;

  const caps = CAPABILITIES.filter((c) => ind.capabilities.includes(c.slug));

  return (
    <>
      <Seo title={ind.name} path={`/industries/${ind.slug}`} description={`${ind.name} — ${ind.tagline} AiFyn AI video analytics.`} />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTag>
            <Link to="/industries" className="hover:text-aqua">INDUSTRIES</Link>
            <span className="text-deep/30">/ {ind.name.toUpperCase()}</span>
          </SectionTag>

          {/* banner */}
          <Reveal className="mt-8">
            <div className="gradient-border relative overflow-hidden rounded-[32px] shadow-card">
              <img src={ind.media.poster} alt={`${ind.name} site under AiFyn watch`} className="h-[300px] w-full object-cover sm:h-[380px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
                <span className="mono-tag flex items-center gap-2">
                  <Icon name={ind.icon} className="h-4 w-4 text-aqua" /> {ind.name.toUpperCase()}
                </span>
                <h1 className="mt-3 max-w-xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">{ind.tagline}</h1>
              </div>
            </div>
          </Reveal>

          {/* outcomes */}
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {ind.bullets.map((b, i) => (
              <Reveal key={b} delay={i * 0.1} className="h-full">
                <GlowCard className="glass h-full rounded-3xl p-7" data-testid="industry-outcome">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua/15">
                    <Icon name="Check" className="h-4 w-4 text-aqua" />
                  </span>
                  <p className="mt-4 font-display text-base font-semibold leading-relaxed text-deep">{b}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>

          {/* relevant capabilities */}
          <div className="mt-20">
            <SectionTag>MOST USED IN {ind.name.toUpperCase()}</SectionTag>
            <div className="mt-8 flex flex-wrap gap-3">
              {caps.map((c) => (
                <Link
                  key={c.slug}
                  to={`/solutions/${c.slug}`}
                  className="glass group flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium text-deep transition-transform hover:scale-[1.03]"
                >
                  <Icon name={c.icon} className="h-4 w-4 text-aqua" />
                  {c.name}
                  <Icon name="ArrowUpRight" className="h-3.5 w-3.5 text-deep/40 transition-transform group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <Reveal className="mt-20">
            <div className="glass-deep flex flex-col items-center justify-between gap-6 rounded-[32px] p-10 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-2xl font-bold text-deep">See {ind.name} through AiFyn.</h2>
                <p className="mt-1.5 text-sm text-ink/60">A 20-minute live demo, with your own footage.</p>
              </div>
              <Magnetic strength={0.25}>
                <Link to="/contact" className="btn-warm inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold">
                  Book a Live Demo <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}