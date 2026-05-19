import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Enquiries",
  robots: { index: false, follow: false },
};

export default function EnquiriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-center">
      <div className="inline-flex w-12 h-12 rounded-full bg-navy-100 items-center justify-center mb-6">
        <span className="text-navy-400 text-lg">◎</span>
      </div>
      <h1 className="text-2xl font-display font-light text-navy-900 mb-3">
        My Enquiries
      </h1>
      <p className="text-navy-500 text-sm max-w-sm mx-auto">
        Enquiry tracking is coming soon. For this pilot, enquiry responses will be managed directly by the ImpactX team.
      </p>
    </div>
  );
}
