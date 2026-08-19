import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/Sidebar";
import hero from "@/assets/hero-model.jpg";
import s1 from "@/assets/showcase-1.jpg";
import s2 from "@/assets/showcase-2.jpg";
import s3 from "@/assets/showcase-3.jpg";

export const Route = createFileRoute("/app/saved")({ component: SavedPage });

const items = [
  { img: hero, title: "Silk Slip Midi Dress", brand: "Maison Cléo" },
  { img: s2, title: "Cream Cashmere Coat", brand: "Loro Piana" },
  { img: s1, title: "Camel Wool Blazer", brand: "The Row" },
  { img: s3, title: "Pointelle Knit Tank", brand: "Toteme" },
];

function SavedPage() {
  return (
    <div>
      <DashboardHeader
        title="Saved looks"
        subtitle="Your private wardrobe, across every retailer."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-foreground/8 bg-card shadow-luxe"
          >
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-primary backdrop-blur">
              <Heart className="h-4 w-4 fill-current" />
            </button>
            <div className="p-4">
              <p className="font-serif text-sm">{it.title}</p>
              <p className="text-xs text-foreground/50">{it.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
