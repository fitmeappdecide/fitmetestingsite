import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TryFromStores } from "@/components/site/TryFromStores";
import { Showcase } from "@/components/site/Showcase";
import { LiveDemo } from "@/components/site/LiveDemo";
import { ScanCompare } from "@/components/site/ScanCompare";
import { Testimonials } from "@/components/site/Testimonials";
import { PricingPreview } from "@/components/site/PricingPreview";
import { Faq } from "@/components/site/Faq";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "FitMe-Try on" }] }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <Nav />
      <main>
        <Hero />
        <TryFromStores />
        <Showcase />
        <LiveDemo />
        <ScanCompare />
        <Testimonials />
        <PricingPreview />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
