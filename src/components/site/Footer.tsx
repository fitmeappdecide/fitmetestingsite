import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const groups = [
  {
    title: "Platform",
    links: [
      { label: "Virtual Try-On", to: "/#demo" },
      { label: "Visual Garment Search", to: "/#compare" },
      { label: "Products Suite", to: "/products" },
      { label: "Pricing & Plans", to: "/pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Smart Shoppers", to: "/solutions" },
      { label: "For Fashion Brands", to: "/solutions" },
      { label: "For Marketplaces", to: "/solutions" },
      { label: "For Creative Agencies", to: "/solutions" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "REST API Docs", to: "/resources" },
      { label: "Storefront SDKs", to: "/resources" },
      { label: "Neural Engine Specs", to: "/resources" },
      { label: "Status & Uptime", to: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Studio", to: "/resources" },
      { label: "Editorial Journal", to: "/resources" },
      { label: "Privacy & RAM Enclaves", to: "/resources" },
      { label: "Contact Stylists", to: "/resources" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 bg-card/60 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-6">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="group flex items-center">
              <Logo className="text-[1.85rem] font-light" />
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-foreground/60">
              Generative virtual styling and visual apparel intelligence. Engineered for discerning
              shoppers, premier brands, and digital marketplaces.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 bg-background text-foreground/60 transition hover:border-primary hover:text-primary hover:scale-105"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-foreground/50 uppercase">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-xs">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-foreground/65 transition hover:text-primary hover:translate-x-0.5 inline-block"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-foreground/8 bg-background/50">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-foreground/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} FitMe Fashion Technologies. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground">
              Security & In-Memory Enclaves
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
