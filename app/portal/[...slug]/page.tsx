import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PortalPlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <span className="text-white/25 text-lg">◇</span>
      </div>
      <h1 className="text-xl font-display font-light text-white mb-2">
        Coming soon
      </h1>
      <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-8">
        This section is not yet available in the prototype. The Opportunities view is the active section of this demonstration.
      </p>
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm rounded-sm hover:bg-brand-green/20 transition-colors font-medium"
      >
        View Opportunities
      </Link>
    </div>
  );
}
