import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import modelImage from "@/assets/model.png";
import garmentShirt from "@/assets/garment-shirt.jpg";
import garmentBag from "@/assets/garment-bag.jpg";
import garmentTrousers from "@/assets/garment-trousers.jpg";

/* ─── Shared Sub-components ─── */

function ProductCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex-1 rounded-[22px] bg-[#F9F7F4] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/[0.03] flex items-center justify-center overflow-hidden p-1">
      <img src={src} alt={alt} className="h-full w-full object-contain" />
    </div>
  );
}

/* ─── DESKTOP HERO (lg+) ─── */

function DesktopHero() {
  return (
    <div className="hidden lg:block relative h-screen w-full overflow-hidden bg-[#F4EDE7]">
      {/* ZONE A — Left: Full-bleed photograph */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute left-0 top-0 bottom-0 w-[32%]"
      >
        <div className="h-full w-full overflow-hidden">
          <img
            src={modelImage}
            alt="Woman mirror selfie wearing blue shirt, grey trousers, and black bag"
            className="h-full w-full object-cover object-top"
            loading="eager"
          />
        </div>
      </motion.div>

      {/* ZONE B — Center: Headline + Subtitle + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="absolute top-0 bottom-0 left-[32%] right-[21.8%] flex flex-col items-center justify-center px-8 xl:px-12 -mt-[3vh]"
      >
        {/* Headline */}
        <h1 className="font-serif text-[clamp(3.4rem,6.2vw,5.8rem)] font-light leading-[1.03] tracking-tight text-foreground text-center">
          See any outfit,
          <br />
          <em className="font-normal italic text-primary">worn by you.</em>
        </h1>

        {/* Supporting subtitle */}
        <p className="mt-5 max-w-[26rem] text-center text-[15px] xl:text-base leading-relaxed text-foreground/60">
          Realistic AI try‑on that helps you
          <br />
          discover outfits that suit you best.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-2.5">
          <a
            href="#demo"
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <span>Get started for free</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <span className="text-xs text-foreground/45">No credit card required</span>
        </div>
      </motion.div>

      {/* ZONE C — Right: 3 vertically distributed product cards */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="absolute top-0 bottom-0 right-0 w-[21.8%] flex flex-col justify-center gap-[2.8vh] pr-6 xl:pr-8 py-[10vh]"
      >
        <ProductCard src={garmentShirt} alt="Blue Oxford button-down shirt" />
        <ProductCard src={garmentBag} alt="Black leather shoulder handbag" />
        <ProductCard src={garmentTrousers} alt="Grey pleated wide-leg trousers" />
      </motion.div>
    </div>
  );
}

/* ─── MOBILE / TABLET HERO (<lg) ─── */

function MobileHero() {
  return (
    <div className="lg:hidden bg-[#F4EDE7] pt-20 pb-12 px-4 sm:px-8">
      {/* Top Text & CTA */}
      <div className="flex flex-col items-center text-center mb-6 max-w-md mx-auto">
        <h1 className="font-serif text-[clamp(2.3rem,7.5vw,3.4rem)] font-light leading-[1.05] tracking-tight text-foreground text-center">
          See any outfit,
          <br />
          <em className="font-normal italic text-primary">worn by you.</em>
        </h1>
        <p className="mt-3 max-w-xs text-center text-xs sm:text-sm leading-relaxed text-foreground/60">
          Realistic AI try‑on that helps you discover outfits that suit you best.
        </p>
        <div className="mt-5 flex flex-col items-center gap-2">
          <a
            href="#demo"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs sm:text-sm font-medium text-primary-foreground shadow-md hover:brightness-110 active:scale-[0.98]"
          >
            <span>Get started for free</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <span className="text-[11px] text-foreground/45">No credit card required</span>
        </div>
      </div>

      {/* Unified Side-by-Side Model & Product Showcase on Mobile/Tablet */}
      <div className="w-full max-w-[335px] xs:max-w-[350px] sm:max-w-[420px] mx-auto flex items-stretch gap-2 sm:gap-3.5">
        {/* Left: Model Photograph (63% width) */}
        <div className="w-[63%] rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-md border border-black/[0.04] bg-card aspect-[3/4.4]">
          <img
            src={modelImage}
            alt="Woman mirror selfie wearing blue shirt, grey trousers, and black bag"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>

        {/* Right: 3 Vertically Stacked Product Cards (37% width) */}
        <div className="w-[37%] flex flex-col justify-between gap-1.5 sm:gap-2.5 aspect-[3/4.4]">
          <div className="flex-1 rounded-[14px] sm:rounded-[18px] bg-[#F9F7F4] shadow-sm border border-black/[0.03] flex items-center justify-center overflow-hidden p-1">
            <img src={garmentShirt} alt="Blue shirt" className="h-full w-full object-contain" />
          </div>
          <div className="flex-1 rounded-[14px] sm:rounded-[18px] bg-[#F9F7F4] shadow-sm border border-black/[0.03] flex items-center justify-center overflow-hidden p-1">
            <img src={garmentBag} alt="Black bag" className="h-full w-full object-contain" />
          </div>
          <div className="flex-1 rounded-[14px] sm:rounded-[18px] bg-[#F9F7F4] shadow-sm border border-black/[0.03] flex items-center justify-center overflow-hidden p-1">
            <img
              src={garmentTrousers}
              alt="Grey trousers"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */

export function Hero() {
  return (
    <section>
      <DesktopHero />
      <MobileHero />
    </section>
  );
}
