import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Link2, Sparkles, ArrowRight } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/Sidebar";
import s1 from "@/assets/showcase-1.jpg";
import s2 from "@/assets/showcase-2.jpg";
import s3 from "@/assets/showcase-3.jpg";
import s4 from "@/assets/showcase-4.jpg";
import hero from "@/assets/hero-model.jpg";

export const Route = createFileRoute("/app/")({
  component: AppHome,
});

const recent = [
  { img: hero, title: "Silk Slip Midi Dress", brand: "Maison Cléo" },
  { img: s1, title: "Camel Wool Blazer", brand: "The Row" },
  { img: s3, title: "Pointelle Knit Tank", brand: "Toteme" },
  { img: s4, title: "Wide-Leg Denim", brand: "Agolde" },
];

const saved = [
  { img: s2, title: "Cream Cashmere Coat", brand: "Loro Piana" },
  { img: s1, title: "Camel Wool Blazer", brand: "The Row" },
  { img: hero, title: "Silk Slip Midi Dress", brand: "Maison Cléo" },
];

function AppHome() {
  return (
    <div>
      <DashboardHeader
        title="Welcome back, Ana"
        subtitle="Paste a link, upload a photo — we do the rest."
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-foreground/8 bg-card p-8 shadow-luxe"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <p className="text-[10px] tracking-[0.22em] text-primary/80">AI TRY-ON</p>
        <h2 className="mt-2 font-serif text-3xl">Paste a product URL</h2>
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-foreground/12 bg-background px-4 py-3">
          <Link2 className="h-4 w-4 text-foreground/50" />
          <input
            placeholder="https://…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
          />
          <Link
            to="/app/try-on"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
          >
            Try on <Sparkles className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>

      <Section title="Recent try-ons" href="/app/history">
        <Grid items={recent} />
      </Section>

      <Section title="Saved looks" href="/app/saved">
        <Grid items={saved} />
      </Section>

      <Section title="Recommended for you">
        <Grid items={[...recent].reverse()} />
      </Section>
    </div>
  );
}

function Section({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12">
      <div className="mb-4 flex items-end justify-between">
        <h3 className="font-serif text-2xl">{title}</h3>
        {href && (
          <Link
            to={href}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function Grid({ items }: { items: { img: string; title: string; brand: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          whileHover={{ y: -4 }}
          className="overflow-hidden rounded-2xl border border-foreground/8 bg-card shadow-luxe"
        >
          <img
            src={it.img}
            alt={it.title}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="p-3">
            <p className="font-serif text-sm leading-tight">{it.title}</p>
            <p className="text-xs text-foreground/50">{it.brand}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
