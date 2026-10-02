import { Reveal } from "../Reveal";
import DemoForm from "../DemoForm";
import { MEDIA } from "../../config/media";

export default function CtaSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="gradient-border relative overflow-hidden rounded-[40px] shadow-glass">
          {/* aurora + soft looping video layer */}
          <img src={MEDIA.ctaLoop.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
          <video
            src={MEDIA.ctaLoop.video}
            muted loop playsInline autoPlay preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 [&[data-ok='1']]:opacity-100"
            onCanPlay={(e) => e.currentTarget.setAttribute("data-ok", "1")}
            aria-hidden="true"
          />
          <div className="aurora left-[10%] top-[-30%] h-[420px] w-[420px] animate-drift bg-aqua/30" />
          <div className="aurora bottom-[-40%] right-[5%] h-[460px] w-[460px] animate-drift-slow bg-amber/30" />
          <div className="aurora left-[45%] top-[30%] h-[300px] w-[300px] animate-drift bg-coral/20" />
          <div className="absolute inset-0 bg-white/72 backdrop-blur-[2px]" />

          <div className="relative px-6 py-16 sm:px-12 lg:px-20 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <h2 className="font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
                  Make your cameras <span className="text-warm">intelligent.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-ink/65">Book a 20-minute live demo — with your own footage.</p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="glass-deep mx-auto mt-10 max-w-2xl rounded-3xl p-6 sm:p-8" data-testid="cta-form">
                <DemoForm sourcePage="/" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}