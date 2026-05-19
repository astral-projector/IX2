import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOpportunity, opportunities } from "@/lib/opportunities";
import { OpportunityDetail } from "@/components/OpportunityDetail";
import { BackButton } from "@/components/BackButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return opportunities.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opp = getOpportunity(slug);
  if (!opp) return { title: "Not found" };
  return {
    title: opp.projectName,
    description: opp.subtitle,
    robots: { index: false, follow: false },
  };
}

export default async function OpportunityPage({ params }: PageProps) {
  const { slug } = await params;
  const opp = getOpportunity(slug);
  if (!opp) notFound();
  return (
    <>
      <div className="bg-navy-900 border-b border-white/6 px-6 py-3">
        <BackButton />
      </div>
      <OpportunityDetail opportunity={opp} />
    </>
  );
}
