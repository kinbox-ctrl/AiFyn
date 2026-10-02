import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { MaskLine } from "../components/Reveal";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" />
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <p className="mono-tag flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-coral" />
          CAM 404 · SIGNAL LOST
        </p>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-deep sm:text-5xl">
          <MaskLine>This corridor isn't</MaskLine>
          <MaskLine delay={0.15} innerClassName="text-warm">under surveillance.</MaskLine>
        </h1>
        <p className="mt-4 max-w-sm text-sm text-ink/60">
          The page you're looking for moved, or never existed. Head back to base.
        </p>
        <Link to="/" className="btn-warm mt-8 rounded-full px-7 py-3.5 text-sm font-bold">
          Back to Home
        </Link>
      </main>
    </>
  );
}