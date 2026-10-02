import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { Reveal, SectionTag } from "../components/Reveal";
import VideoFrame from "../components/VideoFrame";
import GlowCard from "../components/GlowCard";
import Magnetic from "../components/Magnetic";
import { CAPABILITIES, getCapability } from "../data/capabilities";
import Icon from "../lib/icons";
import NotFound from "./NotFound";

const DEPLOY_STEPS = [
  { icon: "PlugZap", title: "Connect", body: "AiFyn links to your existing cameras — no new hardware." },
  { icon: "ScanEye", title: "Detect", body: "Models tuned to your site watch every relevant frame." },
  { icon: "BellRing", title: "Alert & report", body: "Instant alerts plus shift-level insights and reports." },
];

export default function SolutionDetail() {
  const { slug } = useParams();
  const cap = getCapability(slug);
  if (!cap) return <NotFound />;

  const idx = CAPABILITIES.indexOf(cap);
  const next = CAPABILITIES[(idx + 1) % CAPABILITIES.length];

  return (
    <>
      <Seo title={cap.name} path={`/solutions/${cap.slug}`} description={cap.short} />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="aurora right-[-6%] top-[0%] h-[420px] w-[420px] animate-drift-slow bg-aqua/20" />
        <div className="mx-auto max-w-7xl px-6">
          <SectionTag>
            <Link to="/solutions" className="hover:text-aqua">SOLUTIONS</Link>
            <span className="text-deep/30">/ {cap.name.toUpperCase()}</span>
          </SectionTag>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal><h1 className="font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">{cap.name}</h1></Reveal>
              <Reveal delay={0.08}><p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">{cap.short}</p></Reveal>
              <Reveal delay={0.15}>
                <h2 className="mono-tag mt-10 mb-4">WHAT AIFYN CATCHES</h2>
                <ul className="space-y-3">
                  {cap.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm font-medium text-ink/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/15">
                        <Icon name="Check" className="h-3 w-3 text-aqua" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Magnetic strength={0.25}>
                    <Link to="/contact" className="btn-warm inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold">
                      Book a Live Demo <Icon name="ArrowRight" className="h-4 w-4" />
                    </Link>
                  </Magnetic>
                  <Link to="/solutions" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-deep">
                    All solutions
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <VideoFrame media={cap.media} boxes={cap.boxes} innerClassName="aspect-[4/3]" />
            </Reveal>
          </div>

          <div className="mt-24">
            <SectionTag>HOW IT DEPLOYS</SectionTag>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {DEPLOY_STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1} className="h-full">
                  <GlowCard className="glass h-full rounded-3xl p-6">
                    <span className="font-mono text-[11px] font-semibold tracking-widest text-deep/30">0{i + 1}</span>
                    <div className="mt-3 flex items-center gap-2.5">
                      <Icon name={s.icon} className="h-5 w-5 text-aqua" />
                      <h3 className="font-display text-base font-semibold text-deep">{s.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.body}</p>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-20">
            <Link
              to={`/solutions/${next.slug}`}
              className="group gradient-border flex items-center justify-between rounded-3xl p-7 transition-transform hover:scale-[1.01]"
              data-testid="next-solution-link"
            >
              <div>
                <p className="mono-tag">NEXT SOLUTION</p>
                <p className="mt-1.5 font-display text-xl font-bold text-deep">{next.name}</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-deep text-white transition-transform group-hover:translate-x-1">
                <Icon name="ArrowRight" className="h-5 w-5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </main>
    </>
  );
}