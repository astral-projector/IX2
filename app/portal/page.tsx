import { Suspense } from "react";
import type { Metadata } from "next";
import { OpportunityGrid } from "@/components/OpportunityGrid";

export const metadata: Metadata = {
  title: "Opportunities",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <div>
      <div className="bg-white border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-display font-light text-navy-900 mb-1">
            Impact-certified opportunities
          </h1>
          <p className="text-sm text-navy-500">
            Each opportunity has completed ImpactX&apos;s full assessment — Theory of Change, KPIs, and assurance criteria — prior to listing.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-10 text-navy-400 text-sm">Loading…</div>}>
        <OpportunityGrid />
      </Suspense>
    </div>
  );
}
