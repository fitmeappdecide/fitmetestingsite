import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { BookOpen, Code, LifeBuoy, Newspaper } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — FitMe" },
      {
        name: "description",
        content: "Guides, API docs, blog and support for the FitMe AI virtual try-on platform.",
      },
      { property: "og:title", content: "Resources — FitMe" },
      {
        property: "og:description",
        content: "Everything you need to build with, and get the most from, FitMe.",
      },
    ],
  }),
  component: Resources,
});

const cards = [
  {
    icon: BookOpen,
    name: "Guides",
    desc: "Best practices for photos, product URLs, and outfit stacking.",
  },
  {
    icon: Code,
    name: "API Docs",
    desc: "REST + SDKs. Add try-on to any product page in an afternoon.",
  },
  { icon: Newspaper, name: "Blog", desc: "Research notes, case studies, and industry benchmarks." },
  {
    icon: LifeBuoy,
    name: "Support",
    desc: "Talk to a human. Available 24/5 for Pro and Business plans.",
  },
];

const posts = [
  {
    tag: "RESEARCH",
    title: "Why photoreal try-on beats 3D avatars in every shopper study",
    date: "May 2026",
  },
  {
    tag: "CASE STUDY",
    title: "How Séraphine cut returns by 34% in one quarter with FitMe",
    date: "April 2026",
  },
  { tag: "PRODUCT", title: "Introducing multi-garment outfit stacking", date: "March 2026" },
];

function Resources() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Learn. Build."
      emphasis="Ship faster with FitMe."
      intro="Guides, docs, research, and a real support team — everything you need to get the most from the platform."
    >
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <motion.a
                key={c.name}
                href="#"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-3xl border border-foreground/8 bg-card p-8 shadow-luxe transition hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{c.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">{c.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <p className="text-[10px] tracking-[0.24em] text-primary/80">LATEST</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            From the <em className="italic text-foreground/60">journal.</em>
          </h2>
          <div className="mt-14 divide-y divide-foreground/10 border-y border-foreground/10">
            {posts.map((p, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-[140px_1fr_auto] md:items-center md:gap-8"
              >
                <span className="text-[10px] tracking-[0.22em] text-primary/80">{p.tag}</span>
                <span className="font-serif text-2xl leading-tight transition group-hover:text-primary">
                  {p.title}
                </span>
                <span className="text-sm text-foreground/50">{p.date}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
