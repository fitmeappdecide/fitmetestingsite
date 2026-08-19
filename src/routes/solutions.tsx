import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { Testimonials } from "@/components/site/Testimonials";
import { ShoppingBag, Store, Building2, Palette } from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — FitMe" },
      {
        name: "description",
        content: "FitMe for shoppers, brands, marketplaces, and creative agencies.",
      },
      { property: "og:title", content: "Solutions — FitMe" },
      {
        property: "og:description",
        content: "Purpose-built AI fashion imagery for every kind of team.",
      },
    ],
  }),
  component: Solutions,
});

const solutions = [
  {
    icon: ShoppingBag,
    name: "For Shoppers",
    desc: "Shop with confidence. See any garment on you before you buy — no measurements, no returns.",
  },
  {
    icon: Store,
    name: "For Brands",
    desc: "Replace 40% of your PDP shoot budget with photoreal AI imagery. Ship faster, sell more.",
  },
  {
    icon: Building2,
    name: "For Marketplaces",
    desc: "Add try-on to every product page across your catalog. API, SDK and embed available.",
  },
  {
    icon: Palette,
    name: "For Agencies",
    desc: "Deliver campaign concepts and mood boards in hours, not weeks. White-label ready.",
  },
];

const stats = [
  { n: "34%", l: "Return rate reduction" },
  { n: "2.4×", l: "Conversion uplift" },
  { n: "87%", l: "Photorealism (blind test)" },
  { n: "8s", l: "Average render time" },
];

function Solutions() {
  return (
    <PageShell
      eyebrow="Solutions"
      title="One product."
      emphasis="Every kind of fashion team."
      intro="From individual shoppers to global marketplaces, FitMe adapts to how your team works — and grows with you."
    >
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {solutions.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card p-10 shadow-luxe transition hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-8 font-serif text-3xl">{s.name}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-foreground/60">{s.desc}</p>
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-foreground/8 bg-background/40 py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <p className="text-center text-[10px] tracking-[0.24em] text-primary/80">
            MEASURED IMPACT
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-serif text-5xl text-primary md:text-6xl">{s.n}</p>
                <p className="mt-2 text-sm text-foreground/60">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </PageShell>
  );
}
