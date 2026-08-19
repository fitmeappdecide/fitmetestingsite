import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/Sidebar";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

const groups = [
  {
    title: "Account",
    items: [
      { label: "Name", value: "Ana Moreau" },
      { label: "Email", value: "ana@fitme.app" },
      { label: "Password", value: "••••••••" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Language", value: "English" },
      { label: "Currency", value: "USD" },
      { label: "Theme", value: "Warm Ivory (default)" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { label: "New try-on ready", value: "On" },
      { label: "Weekly digest", value: "On" },
      { label: "Marketing", value: "Off" },
    ],
  },
];

function SettingsPage() {
  return (
    <div>
      <DashboardHeader title="Settings" />
      <div className="space-y-6">
        {groups.map((g) => (
          <div
            key={g.title}
            className="overflow-hidden rounded-3xl border border-foreground/8 bg-card shadow-luxe"
          >
            <div className="border-b border-foreground/8 px-6 py-4">
              <p className="text-[10px] tracking-[0.22em] text-foreground/50">
                {g.title.toUpperCase()}
              </p>
            </div>
            <div className="divide-y divide-foreground/8">
              {g.items.map((it) => (
                <div key={it.label} className="flex items-center justify-between px-6 py-4 text-sm">
                  <span className="text-foreground/70">{it.label}</span>
                  <span className="text-foreground/90">{it.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
