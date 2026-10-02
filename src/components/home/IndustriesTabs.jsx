import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionTag } from "../Reveal";
import { INDUSTRIES } from "../../data/industries";
import Icon from "../../lib/icons";

export default function IndustriesTabs() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];

  return (
    <section id="industries" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTag>INDUSTRIES</SectionTag>
        <Reveal><h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
          Built for the places you run.
        </h2></Reveal>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Industries">
          {INDUSTRIES.map((it, i) => (
            <button
              key={it.slug}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              data-testid={`industry-tab-${it.slug}`}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                i === active ? "bg-deep text-white shadow-glow" : "glass text-deep/60 hover:text-deep"
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>

        <div className="gradient-border relative mt-6 overflow-hidden rounded-[28px] shadow-card" data-testid="industry-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.slug}
              role="tabpanel"
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative min-h-[400px]"
            >
              <img src={ind.media.poster} alt={`${ind.name} in view of an AiFyn camera`} loading="lazy"
                className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/20" />

              <div className="relative flex min-h-[400px] flex-col justify-end p-8 sm:p-12">
                <span className="mono-tag flex items-center gap-2">
                  <Icon name={ind.icon} className="h-4 w-4 text-aqua" /> {ind.name.toUpperCase()}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-deep sm:text-3xl">{ind.tagline}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-6">
                  {ind.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm font-medium text-ink/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/15">
                        <Icon name="Check" className="h-3 w-3 text-aqua" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/industries/${ind.slug}`}
                  className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-deep px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  data-testid={`industry-explore-${ind.slug}`}
                >
                  Explore {ind.name}
                  <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}