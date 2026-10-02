import { CLIENT_LOGOS } from "../data/site";

function Row({ hidden = false }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-16 pr-16">
      {CLIENT_LOGOS.map((l) => (
        <span
          key={l}
          className="whitespace-nowrap font-display text-sm font-semibold tracking-[0.28em] text-deep/30 transition-colors duration-300 hover:text-deep/60"
        >
          {l}
        </span>
      ))}
    </div>
  );
}

/** One slow editorial marquee. */
export default function LogoMarquee() {
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}