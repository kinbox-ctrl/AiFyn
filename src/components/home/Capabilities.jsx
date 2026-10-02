import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, SectionTag } from "../Reveal";
import GlowCard from "../GlowCard";
import AiOverlay from "../AiOverlay";
import { CAPABILITIES } from "../../data/capabilities";
import Icon from "../../lib/icons";

function CapCard({ cap, index }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [videoOk, setVideoOk] = useState(false);

  const play = () => {
    setHovered(true);
    videoRef.current?.play?.().catch(() => {});
  };
  const stop = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <GlowCard className="h-full min-h-[240px] rounded-3xl glass" data-testid="capability-card">
      <Link
        to={`/solutions/${cap.slug}`}
        className="relative flex h-full min-h-[240px] flex-col"
        onMouseEnter={play}
        onMouseLeave={stop}
        data-testid={`capability-link-${cap.slug}`}
        aria-label={`${cap.name} — explore solution`}
      >
        {/* media layer */}
        <div className="absolute inset-0" aria-hidden="true">
          <img src={cap.media.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
          <video
            ref={videoRef}
            src={cap.media.video}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoOk(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoOk && hovered ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pearl via-pearl/70 to-pearl/10" />
        </div>

        {hovered && <AiOverlay boxes={cap.boxes} scan={false} badge={null} />}

        <span className="mono-tag absolute left-5 top-5">CAM {String(index + 1).padStart(2, "0")}</span>
        <span className="mono-tag absolute right-5 top-5 flex items-center gap-1 text-aqua opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          VIEW <Icon name="ArrowUpRight" className="h-3 w-3" />
        </span>

        <div className="relative mt-auto p-5">
          <div className="flex items-center gap-2.5">
            <Icon name={cap.icon} className="h-5 w-5 text-aqua" />
            <h3 className="font-display text-base font-semibold text-deep">{cap.name}</h3>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{cap.short}</p>
        </div>
      </Link>
    </GlowCard>
  );
}

export default function Capabilities() {
  return (
    <section className="relative py-24">
      <div className="aurora left-[-6%] top-[20%] h-[380px] w-[380px] animate-drift bg-aqua/20" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag>CAPABILITIES</SectionTag>
            <Reveal><h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
              One platform. Every watchful eye.
            </h2></Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link to="/solutions" className="group inline-flex items-center gap-2 text-sm font-semibold text-aqua hover:text-deep" data-testid="capabilities-view-all">
              Explore all solutions
              <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[236px] md:grid-cols-6">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.slug} delay={(i % 3) * 0.08} className={`h-full ${cap.span}`}>
              <CapCard cap={cap} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}