import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    priceMonthly: "$0",
    priceAnnual: "$0",
    period: "forever",
    tagline: "For casual shoppers discovering virtual styling.",
    features: [
      "10 photoreal try-ons / month",
      "Standard 1080p rendering",
      "500+ retailer URL support",
      "Save up to 20 lookbooks",
      "Zero photo retention privacy",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Style Pro",
    priceMonthly: "$14",
    priceAnnual: "$10",
    period: "per month",
    tagline: "For daily fashion enthusiasts & smart shoppers.",
    features: [
      "Unlimited AI try-ons",
      "4K Ultra-HD photorealism",
      "Multi-garment outfit stacking",
      "Priority sub-5s GPU inference",
      "Cross-store price drop tracker",
      "Unlimited private wardrobes",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Enterprise Studio",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    period: "volume-based",
    tagline: "For fashion brands, DTC labels & marketplaces.",
    features: [
      "High-throughput REST API & SDK",
      "Bulk PDP on-model rendering",
      "White-label storefront widget",
      "Custom brand model diversity",
      "Dedicated account SLA & GPU pool",
    ],
    cta: "Book Technical Demo",
    highlighted: false,
  },
];

export function PricingPreview() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      id="pricing-preview"
      className="relative py-14 sm:py-16 md:py-24 border-t border-foreground/8 bg-background"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-[clamp(1.9rem,5.5vw,3.2rem)] font-light leading-tight tracking-tight text-foreground text-balance">
            Simple pricing.{" "}
            <em className="italic text-primary font-normal">Infinite wardrobe certainty.</em>
          </h2>

          {/* Billing Switch */}
          <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-foreground/12 bg-card p-1 sm:p-1.5 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition ${
                !annual
                  ? "bg-foreground text-background shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition ${
                annual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold">
                SAVE 30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 items-stretch">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col justify-between rounded-[22px] sm:rounded-[28px] p-5 sm:p-7 md:p-8 transition-all duration-300 ${
                t.highlighted
                  ? "bg-foreground text-background shadow-2xl ring-2 ring-primary scale-[1.01] sm:scale-[1.02] md:-translate-y-2"
                  : "border border-foreground/10 bg-card shadow-xl hover:-translate-y-1"
              }`}
            >
              {t.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[9px] font-bold tracking-widest text-primary-foreground uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                <p className="font-serif text-2xl font-medium">{t.name}</p>
                <p
                  className={`mt-2 text-xs leading-relaxed ${t.highlighted ? "text-background/70" : "text-foreground/60"}`}
                >
                  {t.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5 border-b border-foreground/10 pb-5">
                  <span className="font-serif text-4xl sm:text-5xl font-light tracking-tight">
                    {annual ? t.priceAnnual : t.priceMonthly}
                  </span>
                  <span
                    className={`text-xs ${t.highlighted ? "text-background/60" : "text-foreground/50"}`}
                  >
                    /{t.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-xs">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                          t.highlighted ? "text-primary" : "text-primary"
                        }`}
                      />
                      <span className={t.highlighted ? "text-background/90" : "text-foreground/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={t.name === "Enterprise Studio" ? "/resources" : "/signup"}
                className={`mt-8 inline-flex items-center justify-center rounded-full py-3.5 text-xs font-semibold tracking-wider uppercase transition shadow-md ${
                  t.highlighted
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
