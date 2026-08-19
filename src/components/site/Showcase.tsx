import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import tryonSareeRealistic from "@/assets/tryon-saree-realistic.jpg";
import person1 from "@/assets/person-1.png";
import tryonDressRealistic from "@/assets/tryon-dress-realistic.jpg";
import person2 from "@/assets/person-2.png";

const slides = [
  {
    id: "saree",
    src: tryonSareeRealistic,
    title: "Festive Embroidered Silk Saree",
    sub: "Intricate drape, previewed effortlessly.",
  },
  {
    id: "blazer",
    src: person1,
    title: "Tailored Structured Blazer",
    sub: "Sharp proportions, true to your shape.",
  },
  {
    id: "dress",
    src: tryonDressRealistic,
    title: "Satin Silk Slip Midi Dress",
    sub: "Natural fabric sheen and fluid neckline.",
  },
  {
    id: "linen",
    src: person2,
    title: "Relaxed Linen Button-Down",
    sub: "Summer texture previewed instantly.",
  },
];

export function Showcase() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[i];

  return (
    <section className="relative py-10 md:py-14">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6">
        {/* Title and Subtitle */}
        <div className="mb-4">
          <h2 className="font-serif text-xl md:text-2xl font-normal text-foreground">
            {slide.title}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-foreground/50">{slide.sub}</p>
        </div>

        {/* Compact 3-Panel Try-On Showcase Frame */}
        <div className="relative overflow-hidden rounded-[22px] border border-foreground/10 bg-card shadow-xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="h-full w-full"
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimal Progress Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === i ? "w-6 bg-primary" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
