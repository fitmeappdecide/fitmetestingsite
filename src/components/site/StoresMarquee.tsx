import { motion } from "motion/react";

const stores = [
  "ZARA",
  "NORDSTROM",
  "MYNTRA",
  "FARFETCH",
  "H&M",
  "SSENSE",
  "AJIO",
  "NET-A-PORTER",
  "UNIQLO",
  "REVOLVE",
  "NYKAA LUXE",
  "COS",
  "MASSIMO DUTTI",
  "ASOS",
  "MANGO",
];

export function StoresMarquee() {
  return (
    <section className="relative border-y border-foreground/8 bg-card/50 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] text-primary/90 uppercase">
            Compatible with 500+ Global Fashion Retailers
          </p>
        </motion.div>

        <div className="relative mt-8 overflow-hidden">
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

          {/* Marquee track */}
          <div className="flex w-max animate-marquee gap-16 py-2">
            {[...stores, ...stores].map((s, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="whitespace-nowrap font-serif text-2xl tracking-[0.18em] text-foreground/45 transition hover:text-foreground md:text-3xl">
                  {s}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
