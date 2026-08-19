import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PricingPreview } from "@/components/site/PricingPreview";
import { Faq } from "@/components/site/Faq";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — FitMe" },
      {
        name: "description",
        content: "Simple, transparent pricing for shoppers, brands, and marketplaces. Start free.",
      },
      { property: "og:title", content: "Pricing — FitMe" },
      {
        property: "og:description",
        content:
          "Free forever for personal use. Pro from $12/mo. Business pricing scales with volume.",
      },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Simple. Transparent."
      emphasis="Priced for how you shop."
      intro="Start free. Upgrade when you're ready. Cancel anytime. No hidden fees, no per-image billing surprises."
    >
      <PricingPreview />
      <Faq />
    </PageShell>
  );
}
