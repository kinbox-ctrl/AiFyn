import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { Reveal, SectionTag } from "../components/Reveal";
import { INDUSTRIES } from "../data/industries";
import Icon from "../lib/icons";

export default function Industries() {
  return (
    <>
      <Seo title="Industries" path="/industries" description="AiFyn for schools, pharma, construction, manufacturing, hospitality, food & beverage and logistics." />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="aurora right-[-8%] top-[0%] h-[420px] w-[420px] animate-drift bg-amber/20" />
        <div className="mx-auto max-w-7xl px-6">
          <SectionTag>INDUSTRIES</SectionTag>
          <Reveal><h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
            Same platform. Your terrain.
          </h1></Reveal>
          <Reveal delay={0.1}><p className="mt-3 max-w-lg text-ink/60">
            AiFyn is tuned to the risks, rules and rhythms of each environment.
          </p></Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  to={`/industries/${ind.slug}`}
                  className="group glass block h-full overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1"
                  data-testid={`industries-link-${ind.slug}`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={ind.media.poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-pearl via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <span className="mono-tag flex items-center gap-2">
                      <Icon name={ind.icon} className="h-4 w-4 text-aqua" /> {ind.name.toUpperCase()}
                    </span>
                    <h2 className="mt-2.5 font-display text-xl font-semibold text-deep">{ind.tagline}</h2>
                    <span className="mono-tag mt-4 flex items-center gap-1.5 text-aqua">
                      EXPLORE <Icon name="ArrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}