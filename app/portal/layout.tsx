import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-50 flex flex-col">
      {/* Confidential banner */}
      <div className="bg-navy-950 border-b border-white/10 py-1.5 px-6 text-center">
        <span className="text-xs text-white/40 tracking-wider uppercase font-medium">
          {brand.confidentialBannerText}
        </span>
        <span className="text-white/20 mx-2">·</span>
        <span className="text-xs text-white/30">
          This portal is shared for demonstration purposes only. Not for further distribution.
        </span>
      </div>

      <Nav variant="portal" />

      <main className="flex-1">{children}</main>

      <footer className="bg-navy-900 border-t border-white/10 py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-white/30 max-w-xl leading-relaxed">
            {brand.legalDisclaimer}
          </p>
          <div className="text-xs text-white/20 whitespace-nowrap">
            {brand.confidentialBannerText}
          </div>
        </div>
      </footer>
    </div>
  );
}
