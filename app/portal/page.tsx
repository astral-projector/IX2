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
      <div className="bg-navy-950 border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-xl font-display font-light text-white">
            Impact-certified opportunities
          </h1>
        </div>
      </div>

      <Suspense fallback={<div className="p-10 text-white/40 text-sm">Loading…</div>}>
        <OpportunityGrid />
      </Suspense>
    </div>
  );
}
