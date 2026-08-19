import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { ScanCompare } from "@/components/site/ScanCompare";
import { Showcase } from "@/components/site/Showcase";
import { Shirt, Camera, Layers3, Sparkles, Wand2, LineChart } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — FitMe" },
      {
        name: "description",
        content: "Explore FitMe's suite of AI virtual try-on and fashion imagery products.",
      },
      { property: "og:title", content: "Products — FitMe" },
      {
        property: "og:description",
        content: "AI try-on, PDP generation, and fashion imagery products by FitMe.",
      },
    ],
  }),
  component: Products,
});

const products = [
  {
    icon: Shirt,
    name: "Try-On",
    desc: "Photoreal virtual try-on for any garment from any URL. Under 8 seconds.",
  },
  {
    icon: Camera,
    name: "PDP Studio",
    desc: "Generate on-model product photography at scale. Studio quality, no photoshoot.",
  },
  {
    icon: Layers3,
    name: "Outfit Stacking",
    desc: "Compose full looks from separate garments and accessories.",
  },
  {
    icon: Wand2,
    name: "Background Swap",
    desc: "Place your models in any editorial setting with one click.",
  },
  {
    icon: Sparkles,
    name: "Model Diversity",
    desc: "Generate every look across body types, skin tones, and poses.",
  },
  {
    icon: LineChart,
    name: "Analytics",
    desc: "See how try-on drives conversion, AOV, and return reduction.",
  },
];

function Products() {
  return (
    <PageShell
      eyebrow="Products"
      title="One engine."
      emphasis="Every fashion image you'll ever need."
      intro="FitMe is a suite of purpose-built AI products for shoppers, brands and marketplaces — powered by the same in-house rendering engine."
    >
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-3xl border border-foreground/8 bg-card p-8 shadow-luxe transition hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ScanCompare />
      <Showcase />
    </PageShell>
  );
}
