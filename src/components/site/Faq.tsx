import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How accurate is FitMe?",
    a: "Our in-house model achieves state-of-the-art results on garment fit, drape, and colour accuracy. In blind studies, 87% of users cannot distinguish FitMe renders from real photography.",
  },
  {
    q: "Which stores are supported?",
    a: "FitMe works with 200+ marketplaces and DTC brands including Amazon, Myntra, AJIO, Nykaa Fashion, Flipkart, Zara, H&M, ASOS, SHEIN, Uniqlo, and every major D2C brand. Anything with a public product page.",
  },
  {
    q: "Is my photo safe?",
    a: "Yes. Your photo is processed in-memory in a private inference environment and deleted immediately after generation. We never train on user photos and never share them with third parties.",
  },
  {
    q: "Can I use FitMe for my brand?",
    a: "Absolutely. Our Business plan includes API access, bulk PDP image generation, white-label embed, and a dedicated success team. Get in touch to see a demo.",
  },
  {
    q: "How much does it cost?",
    a: "Personal use starts free with 10 try-ons per month. Pro is $12/month for unlimited try-ons and 4K resolution. Business pricing scales with volume — contact us for a quote.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.24em] text-primary/80">FAQ</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Questions, <em className="italic text-foreground/60">answered.</em>
          </h2>
        </div>

        <div className="mt-14 divide-y divide-foreground/10 border-y border-foreground/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-xl md:text-2xl">{f.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/15 transition ${
                      isOpen ? "rotate-45 bg-primary text-primary-foreground border-primary" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-14 text-foreground/65 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
