import { createFileRoute } from "@tanstack/react-router";
import { Camera, Ruler, Palette, Shield } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/Sidebar";

export const Route = createFileRoute("/app/profile")({ component: ProfilePage });

const cards = [
  { icon: Camera, title: "My Photos", body: "Manage the portraits used for try-ons." },
  { icon: Ruler, title: "Measurements", body: "Height, chest, waist, hips — for a truer fit." },
  { icon: Palette, title: "Style DNA", body: "Colours, fits, brands, personality." },
  { icon: Shield, title: "Privacy & Security", body: "Data, sessions, deletion." },
];

function ProfilePage() {
  return (
    <div>
      <DashboardHeader title="Profile" />
      <div className="rounded-3xl border border-foreground/8 bg-card p-6 shadow-luxe">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 font-serif text-2xl text-primary">
            A
          </span>
          <div>
            <p className="font-serif text-2xl">Ana Moreau</p>
            <p className="text-sm text-foreground/60">ana@fitme.app</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:max-w-md">
          <Stat value="48" label="Try-ons" />
          <Stat value="12" label="Saved" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <button
            key={c.title}
            className="flex items-start gap-4 rounded-2xl border border-foreground/8 bg-card p-5 text-left shadow-luxe transition hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <c.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-serif text-base">{c.title}</p>
              <p className="text-sm text-foreground/60">{c.body}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-foreground/8 bg-background p-4">
      <p className="font-serif text-3xl">{value}</p>
      <p className="text-xs tracking-widest text-foreground/50">{label.toUpperCase()}</p>
    </div>
  );
}
