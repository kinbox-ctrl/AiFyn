import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MaskLine, SectionTag } from "../Reveal";
import Magnetic from "../Magnetic";
import NodeGlobe from "../NodeGlobe";
import VideoFrame from "../VideoFrame";
import { scrollToId } from "../../lib/useLenis";
import { BRAND } from "../../data/site";
import { MEDIA } from "../../config/media";
import Icon from "../../lib/icons";

const HERO_BOXES = [
  { x: 8, y: 44, w: 19, h: 36, label: "PERSON", conf: "0.98", tone: "warm" },
  { x: 56, y: 26, w: 30, h: 26, label: "FORKLIFT", conf: "0.94" },
  { x: 36, y: 58, w: 15, h: 26, label: "HELMET", conf: "0.97" },
];

const CHIPS = [
  { text: "Intrusion detected · 0.3s", className: "left-0 top-8 lg:-left-6", tone: "bg-coral", delay: 1.5 },
  { text: "PPE ✓", className: "bottom-24 left-2 lg:-left-4", tone: "bg-aqua", delay: 1.75 },
  { text: "Vehicle logged", className: "right-0 top-1/3 lg:-right-4", tone: "bg-amber", delay: 2.0 },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32 lg:pt-28">
      <div className="aurora left-[-10%] top-[-20%] h-[520px] w-[520px] animate-drift bg-aqua/25" />
      <div className="aurora bottom-[-30%] right-[-8%] h-[560px] w-[560px] animate-drift-slow bg-amber/25" />
      <div className="aurora right-[30%] top-[10%] h-[300px] w-[300px] animate-drift bg-coral/15" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.02fr_1fr]">
        {/* Left — kinetic headline */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionTag>AI VIDEO ANALYTICS · 24/7</SectionTag>
          </motion.div>

          <h1 className="mt-6 font-display text-[13.5vw] font-bold leading-[0.98] tracking-[-0.03em] text-deep sm:text-6xl lg:text-[4.6rem]">
            <MaskLine delay={0.15}>See Everything.</MaskLine>
            <MaskLine delay={0.32} innerClassName="text-warm">Miss Nothing.</MaskLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink/70"
          >
            AI video analytics that makes your existing CCTV think, alert and act — 24/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.25}>
              <Link
                to="/contact"
                data-testid="hero-book-demo-cta"
                className="btn-warm inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold tracking-wide transition-transform duration-200 hover:scale-[1.03]"
              >
                Book a Live Demo
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                onClick={() => scrollToId("live-dashboard")}
                data-testid="hero-watch-video-cta"
                className="glass inline-flex items-center gap-2.5 rounded-full px-6 py-4 text-sm font-semibold text-deep transition-transform duration-200 hover:scale-[1.03]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-deep text-white">
                  <Icon name="Play" className="ml-0.5 h-3 w-3" />
                </span>
                Watch Video
              </button>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.15 }}
            className="mono-tag mt-10 flex items-center gap-3"
          >
            <span className="h-px w-9 bg-aqua" />
            {BRAND.coreLine}
          </motion.p>
        </div>

        {/* Right — node globe + glass video frame + floating chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[520px]"
          data-testid="hero-visual"
        >
          <NodeGlobe className="absolute -inset-12 opacity-80 sm:opacity-100" />

          <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 sm:px-10">
            <VideoFrame media={MEDIA.hero} boxes={HERO_BOXES} innerClassName="aspect-[4/3]" />
          </div>

          {CHIPS.map((c) => (
            <motion.div
              key={c.text}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: c.delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className={`glass-deep absolute z-20 flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-wide text-deep shadow-card ${c.className}`}
              data-testid="hero-chip"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${c.tone}`} />
              {c.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="mono-tag">SCROLL</span>
        <span className="relative h-9 w-px overflow-hidden bg-deep/15">
          <motion.span className="absolute inset-x-0 top-0 h-3 bg-aqua" animate={{ y: [0, 30] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </motion.div>
    </section>
  );
}