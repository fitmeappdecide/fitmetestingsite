import { motion } from "motion/react";
import { Cpu, Eye, Lock, Zap } from "lucide-react";

const cards = [
  {
    icon: Eye,
    title: "Neural Vision Parser",
    body: "Trained on 12M+ high-fashion garment pairs to detect pleats, hems, textures, and fabric elasticity.",
    stat: "12M+",
    statLabel: "Training Pairs",
  },
  {
    icon: Zap,
    title: "Instant Diffusion Inference",
    body: "Custom FP8 TensorRT execution engine delivering sub-8s high-resolution photorealistic rendering.",
    stat: "<8s",
    statLabel: "Average Render",
  },
  {
    icon: Cpu,
    title: "Multi-Store Parsing Stack",
    body: "Real-time scraper and metadata engine compatible with over 500+ global fashion marketplaces.",
    stat: "500+",
    statLabel: "Retailers Supported",
  },
  {
    icon: Lock,
    title: "RAM-Only Privacy Enclave",
    body: "User portrait images are processed ephemerally in RAM and purged immediately post-render.",
    stat: "100%",
    statLabel: "Ephemeral Privacy",
  },
];

export function Technology() {
  return (
    <section className="relative py-28 md:py-36 bg-card/40 border-y border-foreground/8">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
              Proprietary Infrastructure
            </p>
            <h2 className="mt-3 font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl text-balance">
              A vertically integrated{" "}
              <em className="italic text-primary font-normal">AI fashion engine.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm text-foreground/60 leading-relaxed">
            Built from scratch for apparel physics, true human anatomy, and luxury fashion accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex flex-col justify-between rounded-[28px] border border-foreground/10 bg-card p-8 shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                    {c.statLabel}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="font-serif text-5xl font-light tracking-tight text-foreground">
                    {c.stat}
                  </p>
                  <h3 className="mt-4 font-serif text-xl font-medium text-foreground">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60">{c.body}</p>
                </div>
              </div>

              <div className="mt-6 h-0.5 w-full bg-foreground/5 overflow-hidden">
                <div className="h-full bg-primary/40 w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
