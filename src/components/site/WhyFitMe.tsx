import { motion } from "motion/react";
import { Check, X, Sparkles } from "lucide-react";

const comparisons = [
  {
    feature: "True-to-Life Identity & Face Preservation",
    traditional: "Cartoonish avatars or generic models",
    fitme: "100% your genuine face, skin tone, and body shape",
  },
  {
    feature: "Universal Garment URL Compatibility",
    traditional: "Limited strictly to partnering brand catalogs",
    fitme: "Works on 500+ global fashion stores & physical scans",
  },
  {
    feature: "Physics-Based Fabric Drape & Tension",
    traditional: "Flat 2D static sticker overlays",
    fitme: "Realistic wrinkles, gravity fold lines & fabric weight",
  },
  {
    feature: "Cross-Brand Unified Lookbook",
    traditional: "Siloed to single retailer shopping carts",
    fitme: "Stack tops, bottoms, and jackets across distinct stores",
  },
  {
    feature: "Render Latency & Speed",
    traditional: "Manual photo edits or multi-minute rendering",
    fitme: "Sub-8 second photorealistic 4K neural synthesis",
  },
  {
    feature: "Return Rate Reduction",
    traditional: "30-40% return rates due to inaccurate sizing",
    fitme: "Eliminates fit anxiety before purchasing",
  },
];

export function WhyFitMe() {
  return (
    <section className="relative py-28 md:py-36 border-t border-foreground/8 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
            Comparative Benchmark
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl text-balance">
            Conventional shopping vs.{" "}
            <em className="italic text-primary font-normal">FitMe Generative Engine</em>
          </h2>
          <p className="mt-4 text-sm text-foreground/60 max-w-lg mx-auto">
            Why leading fashion tech houses and over 400,000 shoppers choose FitMe over flat
            overlays.
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-[32px] border border-foreground/10 bg-card shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-[1.3fr_1fr_1.2fr] items-center border-b border-foreground/10 bg-muted/20 px-6 py-5 text-xs font-semibold tracking-wider text-foreground md:px-8">
            <span className="uppercase text-foreground/50">Core Capability</span>
            <span className="text-center uppercase text-foreground/45">Legacy 3D / Flat Apps</span>
            <span className="text-center uppercase text-primary flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> FitMe AI Studio
            </span>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-foreground/8">
            {comparisons.map((c, i) => (
              <motion.div
                key={c.feature}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-[1.3fr_1fr_1.2fr] items-center gap-4 px-6 py-5 text-sm md:px-8 hover:bg-foreground/[0.015] transition"
              >
                <div>
                  <p className="font-serif text-base font-medium text-foreground">{c.feature}</p>
                </div>

                <div className="text-center px-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1 text-xs text-foreground/60">
                    <X className="h-3.5 w-3.5 text-destructive/70 shrink-0" />
                    <span className="truncate hidden sm:inline">{c.traditional}</span>
                  </div>
                </div>

                <div className="text-center px-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate hidden sm:inline">{c.fitme}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
