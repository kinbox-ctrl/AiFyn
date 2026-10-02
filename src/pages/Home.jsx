import Seo from "../components/Seo";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Capabilities from "../components/home/Capabilities";
import IndustriesTabs from "../components/home/IndustriesTabs";
import DashboardShowcase from "../components/home/DashboardShowcase";
import Impact from "../components/home/Impact";
import CtaSection from "../components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <main>
        <Hero />
        <HowItWorks />
        <Capabilities />
        <IndustriesTabs />
        <DashboardShowcase />
        <Impact />
        <CtaSection />
      </main>
    </>
  );
}