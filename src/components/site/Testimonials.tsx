import { motion } from "motion/react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    quote:
      "FitMe completely eliminated my online shopping sizing guesswork. Seeing the fabric drape on my actual shoulders and waist before ordering has saved me thousands in returns.",
    author: "Elena Rostova",
    role: "Fashion Director & Stylist",
    location: "London, UK",
    avatar: "E",
    rating: 5,
    tag: "VERIFIED PRO STYLIST",
  },
  {
    quote:
      "The photorealism is unmatched. It doesn't look like an avatar or sticker — it accurately predicts how heavy wool or silk will fall on my posture in real room lighting.",
    author: "Marcus Chen",
    role: "Creative Director",
    location: "New York, USA",
    avatar: "M",
    rating: 5,
    tag: "VERIFIED POWER SHOPPER",
  },
  {
    quote:
      "I used FitMe to plan my entire bridal party and festive wardrobe across 4 different retailers. The multi-store URL extraction worked in seconds flawlessly.",
    author: "Priya Sharma",
    role: "Brand Strategist",
    location: "Mumbai, India",
    avatar: "P",
    rating: 5,
    tag: "VERIFIED BRIDAL SHOPPER",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-14 sm:py-16 md:py-24 border-t border-foreground/8 bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-[clamp(1.9rem,5.5vw,3.2rem)] font-light leading-tight tracking-tight text-foreground text-balance">
            Loved by shoppers,{" "}
            <em className="italic text-primary font-normal">trusted by stylists.</em>
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={r.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-[22px] sm:rounded-[28px] border border-foreground/10 bg-card p-5 sm:p-7 shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-primary">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-foreground/15" />
                </div>

                <p className="mt-5 text-sm sm:text-[15px] leading-relaxed text-foreground/75 italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="mt-7 border-t border-foreground/8 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-serif text-base font-semibold text-primary">
                    {r.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-serif text-sm font-medium text-foreground">{r.author}</p>
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    </div>
                    <p className="text-[11px] text-foreground/55 truncate">
                      {r.role} · {r.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
