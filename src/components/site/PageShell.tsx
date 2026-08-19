import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";

export function PageShell({
  eyebrow,
  title,
  emphasis,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  emphasis?: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <Nav />
      <main>
        <section className="relative pt-40 pb-20">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-32 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[oklch(0.93_0.04_65)] opacity-60 blur-3xl" />
          </div>
          <div className="mx-auto max-w-[1400px] px-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.24em] text-primary/80"
            >
              {eyebrow.toUpperCase()}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mt-4 max-w-4xl font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.02] tracking-tight text-balance"
            >
              {title} {emphasis && <em className="italic text-primary">{emphasis}</em>}
            </motion.h1>
            {intro && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="mt-8 max-w-2xl text-lg text-foreground/60"
              >
                {intro}
              </motion.p>
            )}
          </div>
        </section>
        {children}
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
