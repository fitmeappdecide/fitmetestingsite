import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const links = [
  { label: "Products", to: "/products" as const },
  { label: "Solutions", to: "/solutions" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "Resources", to: "/resources" as const },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-foreground/5" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-3.5 sm:py-4">
        {/* Brand Logo */}
        <Link to="/" className="relative z-10 flex items-center">
          <Logo className="text-[1.65rem] sm:text-[1.85rem] font-light" />
        </Link>

        {/* Center Navigation Links (lg+) */}
        <nav className="hidden items-center gap-8 lg:flex absolute left-1/2 -translate-x-1/2">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[14px] transition-colors ${
                  active
                    ? "font-semibold text-foreground"
                    : "text-foreground/80 hover:text-foreground font-normal"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Links (Desktop) */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/login"
            className="text-[14px] font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="rounded-full bg-foreground px-5 py-2 text-[13px] font-semibold text-background transition-all hover:bg-foreground/90 active:scale-95 shadow-sm"
          >
            Go to app
          </Link>
        </div>

        {/* Mobile / Tablet actions */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Link
            to="/app"
            className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background transition shadow-sm"
          >
            Go to app
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground hover:bg-foreground/5 transition"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {open && (
        <div className="border-t border-foreground/8 bg-background/98 px-6 py-5 backdrop-blur-xl lg:hidden shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-foreground/10 pt-4">
              <Link
                to="/login"
                className="text-sm font-medium text-foreground flex-1 text-center py-2 rounded-full border border-foreground/15"
              >
                Sign in
              </Link>
              <Link
                to="/app"
                className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-xs font-semibold flex-1 text-center shadow-sm"
              >
                Launch Studio
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
