import { motion } from "motion/react";

const brands = [
  "MAISON CLÉO",
  "AURÉLIE",
  "NORD & CO.",
  "ATELIER 12",
  "SÉRAPHINE",
  "LUME",
  "HARLOW",
  "STUDIO NOIR",
];

export function TrustedBrands() {
  return (
    <section className="border-y border-foreground/8 bg-background/40 py-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] tracking-[0.28em] text-foreground/50"
        >
          TRUSTED BY MODERN FASHION HOUSES & MARKETPLACES
        </motion.p>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex w-max animate-marquee gap-16">
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="font-serif text-2xl tracking-[0.2em] text-foreground/40 whitespace-nowrap"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
