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
      <Suspense fallback={<div className="p-10 text-white/40 text-sm">Loading…</div>}>
        <OpportunityGrid />
      </Suspense>
    </div>
  );
}
