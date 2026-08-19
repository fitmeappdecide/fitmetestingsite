import { motion } from "motion/react";
import { Link2, UserCheck, Sparkles, Layers, ShieldCheck, Cpu } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Link2,
    title: "Paste URL or Upload Catalog",
    desc: "Works with any URL from Amazon, Zara, Myntra, ASOS, and 500+ global retailers. Our computer vision parser isolates garment geometry, seam lines, and texture maps automatically.",
    tag: "AUTOMATIC SEGMENTATION",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Provide a Single Portrait",
    desc: "A standard mirror selfie or front-facing portrait is all that's required. No measurement tapes, no specialized 3D scanners, and no avatars — we preserve your true face and skin tone.",
    tag: "IDENTITY PRESERVATION",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Photorealistic Neural Drape",
    desc: "In under 8 seconds, our physics-informed diffusion model synthesizes the outfit directly onto your body, matching ambient shadows, fabric tension, and posture with 4K clarity.",
    tag: "SUB-8S GENERATION",
  },
];

const pillars = [
  { icon: Cpu, label: "Physics-Based Drape", sub: "True cloth wrinkles & gravity simulation" },
  { icon: Layers, label: "Multi-Garment Stacking", sub: "Pair tops, bottoms, coats & accessories" },
  { icon: ShieldCheck, label: "Private & Secure", sub: "Processed in RAM, auto-purged on render" },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative py-28 md:py-36 border-t border-foreground/8 bg-background/50"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
            The Methodology
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl text-balance">
            How FitMe renders <em className="italic text-primary font-normal">perfection.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/60 text-[15px] leading-relaxed">
            Unlike legacy 3D mannequin overlays, FitMe utilizes neural generative diffusion trained
            on high-fashion drape, fabric physics, and authentic body morphology.
          </p>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-8 shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl font-light text-primary/80">{s.step}</span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>

                <span className="mt-6 inline-block rounded-full bg-foreground/5 px-3 py-1 text-[9px] font-semibold tracking-widest text-primary uppercase">
                  {s.tag}
                </span>

                <h3 className="mt-4 font-serif text-2xl font-medium text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{s.desc}</p>
              </div>

              <div className="mt-8 h-1 w-full rounded-full bg-foreground/5 overflow-hidden">
                <div className="h-full bg-primary/40 w-1/3 transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Feature Badges Bar */}
        <div className="mt-12 grid grid-cols-1 gap-4 rounded-3xl border border-foreground/8 bg-card/60 p-6 sm:grid-cols-3 backdrop-blur">
          {pillars.map((p) => (
            <div key={p.label} className="flex items-center gap-3.5 px-3 py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{p.label}</p>
                <p className="text-[11px] text-foreground/55">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
