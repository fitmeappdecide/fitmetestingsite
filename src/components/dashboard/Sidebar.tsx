import { Link, useRouterState } from "@tanstack/react-router";
import { Home, History, Heart, User, Settings, LogOut, Bell, Sparkles } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const items = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/try-on", label: "New try-on", icon: Sparkles },
  { to: "/app/history", label: "History", icon: History },
  { to: "/app/saved", label: "Saved looks", icon: Heart },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-foreground/8 bg-sidebar px-4 py-6">
      <Link to="/" className="px-2">
        <Logo />
      </Link>

      <nav className="mt-8 flex-1 space-y-0.5">
        {items.map((it) => {
          const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-luxe"
                  : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-foreground/8 bg-card p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 font-serif text-primary">
            A
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">Ana Moreau</p>
            <p className="truncate text-xs text-foreground/50">ana@fitme.app</p>
          </div>
          <Link to="/" className="text-foreground/50 hover:text-foreground">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-4xl leading-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-foreground/60">{subtitle}</p>}
      </div>
      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-card text-foreground/70 hover:text-foreground">
        <Bell className="h-4 w-4" />
      </button>
    </div>
  );
}
