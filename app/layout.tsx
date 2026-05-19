import type { Metadata } from "next";
import "./globals.css";
import { brand, siteUrl } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    default: `${brand.fullName} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "ImpactX Markets connects family-office and wholesale investors with impact-certified private market opportunities. Structural accountability for impact from day one.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: brand.fullName,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
