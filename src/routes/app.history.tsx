import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/Sidebar";
import hero from "@/assets/hero-model.jpg";
import s1 from "@/assets/showcase-1.jpg";
import s2 from "@/assets/showcase-2.jpg";
import s3 from "@/assets/showcase-3.jpg";
import s4 from "@/assets/showcase-4.jpg";

export const Route = createFileRoute("/app/history")({ component: HistoryPage });

const items = [
  { img: hero, title: "Silk Slip Midi Dress", brand: "Maison Cléo", date: "Today" },
  { img: s1, title: "Camel Wool Blazer", brand: "The Row", date: "Yesterday" },
  { img: s3, title: "Pointelle Knit Tank", brand: "Toteme", date: "Yesterday" },
  { img: s4, title: "Wide-Leg Denim", brand: "Agolde", date: "3 days ago" },
  { img: s2, title: "Cream Cashmere Coat", brand: "Loro Piana", date: "Last week" },
  { img: hero, title: "Ivory Silk Blouse", brand: "The Row", date: "Last week" },
];

function HistoryPage() {
  return (
    <div>
      <DashboardHeader title="Try-on history" subtitle="Every look you've generated with FitMe." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-foreground/8 bg-card shadow-luxe"
          >
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-serif text-sm">{it.title}</p>
                <p className="text-xs text-foreground/50">{it.brand}</p>
              </div>
              <span className="text-xs text-foreground/40">{it.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
