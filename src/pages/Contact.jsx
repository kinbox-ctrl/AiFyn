import Seo from "../components/Seo";
import { Reveal, SectionTag } from "../components/Reveal";
import DemoForm from "../components/DemoForm";
import { CONTACT } from "../data/site";
import Icon from "../lib/icons";

export default function Contact() {
  return (
    <>
      <Seo title="Book a Demo" path="/contact" description="Book a 20-minute live AiFyn demo with your own footage. We reply within 24 hours." />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="aurora left-[-6%] top-[10%] h-[420px] w-[420px] animate-drift bg-aqua/20" />
        <div className="mx-auto max-w-7xl px-6">
          <SectionTag>CONTACT · BOOK A DEMO</SectionTag>
          <Reveal><h1 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
            Make your cameras <span className="text-warm">intelligent.</span>
          </h1></Reveal>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
            <Reveal>
              <div className="glass-deep rounded-3xl p-6 sm:p-8" data-testid="contact-form">
                <DemoForm sourcePage="/contact" />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="glass rounded-3xl p-8" data-testid="contact-details">
                <span className="mono-tag">DIRECT LINES</span>
                <a href={`mailto:${CONTACT.email}`} className="mt-5 flex items-center gap-3 text-sm font-medium text-ink/80 hover:text-deep">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-border">
                    <Icon name="Mail" className="h-5 w-5 text-aqua" />
                  </span>
                  {CONTACT.email}
                </a>
                <a href={CONTACT.phoneHref} className="mt-3 flex items-center gap-3 text-sm font-medium text-ink/80 hover:text-deep">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-border">
                    <Icon name="Phone" className="h-5 w-5 text-aqua" />
                  </span>
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-3 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/5 p-3.5 text-sm font-semibold text-deep transition-transform hover:scale-[1.01]"
                  data-testid="contact-whatsapp-link"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25d366] text-white">
                    <Icon name="MessageCircle" className="h-5 w-5" />
                  </span>
                  Chat on WhatsApp — fastest reply
                </a>

                <span className="mono-tag mt-8 mb-3 block">OUR CURRENT PRESENCE</span>
                <p className="flex flex-wrap gap-2">
                  {CONTACT.cities.map((c) => (
                    <span key={c} className="rounded-full bg-tint px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-deep/70">
                      {c}
                    </span>
                  ))}
                </p>
                <p className="mt-6 border-t border-deep/10 pt-5 text-xs leading-relaxed text-ink/50">
                  AiFyn – Ai For Your Needs. Share your site layout and camera count — we demo on your own footage.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </>
  );
}