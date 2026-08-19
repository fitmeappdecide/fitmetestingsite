import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-foreground px-6 py-12 sm:px-12 sm:py-18 md:px-16 md:py-22 text-center text-background shadow-2xl"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light leading-[1.06] tracking-tight text-white text-balance">
              Never guess the fit.
              <br />
              <em className="italic text-primary font-normal">See the truth on you.</em>
            </h2>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
              >
                <span>Launch Studio Free</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-95"
              >
                <span>Test Interactive Demo</span>
              </a>
            </div>

            <p className="mt-6 text-[11px] sm:text-xs text-white/45">
              Zero credit card required · Instant 4K generation · End-to-end privacy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
