import Seo from "../components/Seo";
import { Reveal, SectionTag } from "../components/Reveal";
import { BRAND, CONTACT } from "../data/site";

const SECTIONS = [
  {
    h: "What we collect",
    p: "When you book a demo we collect the details you submit: name, company, industry, number of cameras, phone number, email, city and any optional message.",
  },
  {
    h: "Why we collect it",
    p: "Only to respond to your enquiry and schedule your demo. We reply within 24 hours on working days.",
  },
  {
    h: "How it is stored",
    p: "Submissions are stored in a secured database accessible only to the AiFyn team. We do not sell or share your details with third parties.",
  },
  {
    h: "Video analytics on your site",
    p: "Any AiFyn deployment on your premises processes video under your control and our data-privacy settings. Face and plate data stay under your ownership.",
  },
  {
    h: "Contact",
    p: `Questions about your data? Write to ${CONTACT.email} or call ${CONTACT.phone}.`,
  },
];

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" path="/privacy" description="How AiFyn collects, uses and protects your details." />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="mx-auto max-w-3xl px-6">
          <SectionTag>PRIVACY POLICY</SectionTag>
          <Reveal><h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-deep">Plain words about your data.</h1></Reveal>
          <div className="mt-10 space-y-4">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.05}>
                <div className="glass rounded-3xl p-7">
                  <h2 className="font-display text-lg font-semibold text-deep">{s.h}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-ink/40">© {new Date().getFullYear()} {BRAND.name} – {BRAND.tagline}. Editable placeholder policy.</p>
        </div>
      </main>
    </>
  );
}