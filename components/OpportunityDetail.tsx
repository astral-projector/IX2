"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EnquireModal } from "@/components/EnquireModal";
import { type Opportunity, formatCurrency, formatMinInvestment, sectorLabels } from "@/lib/opportunities";
import { FileText, Folder, FolderOpen, Lock } from "lucide-react";

interface OpportunityDetailProps {
  opportunity: Opportunity;
}

function DataRoomFolder({
  name,
  files,
}: {
  name: string;
  files: { name: string; date: string; size: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="border border-white/10 rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/8 transition-colors text-left"
      >
        {open ? (
          <FolderOpen size={16} className="text-white/35 shrink-0" />
        ) : (
          <Folder size={16} className="text-white/35 shrink-0" />
        )}
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="ml-auto text-xs text-white/35">{files.length} files</span>
      </button>
      {open && (
        <div className="divide-y divide-white/5">
          {files.map((file) => (
            <div key={file.name} className="relative">
              <button
                onClick={() => setTooltip(tooltip === file.name ? null : file.name)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left opacity-60 cursor-pointer"
              >
                <FileText size={14} className="text-white/30 shrink-0" />
                <span className="text-sm text-white/55 flex-1">{file.name}</span>
                <span className="text-xs text-white/35">{file.date}</span>
                <span className="text-xs text-white/35 w-14 text-right">{file.size}</span>
                <Lock size={12} className="text-white/30 shrink-0" />
              </button>
              {tooltip === file.name && (
                <div className="absolute left-4 right-4 bottom-full mb-1 z-10 bg-navy-900 text-white text-xs rounded-sm px-3 py-2 shadow-lg">
                  Document access available on request. Please use the Enquire button to request access.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const dataRoomFolders: Record<string, { name: string; date: string; size: string }[]> = {
  "Investment Memorandum": [
    { name: "Information Memorandum v2.1.pdf", date: "Mar 2025", size: "4.2 MB" },
    { name: "Executive Summary.pdf", date: "Mar 2025", size: "0.8 MB" },
  ],
  Financials: [
    { name: "Financial Model — Base Case.xlsx", date: "Feb 2025", size: "2.1 MB" },
    { name: "Audited Accounts FY24.pdf", date: "Oct 2024", size: "3.4 MB" },
  ],
  Legal: [
    { name: "Investment Agreement — Draft.pdf", date: "Mar 2025", size: "1.2 MB" },
    { name: "Trust Deed.pdf", date: "Jan 2025", size: "0.9 MB" },
  ],
  "Impact Assessment": [
    { name: "Theory of Change Report.pdf", date: "Feb 2025", size: "1.8 MB" },
    { name: "Independent Impact Assurance — RMCG.pdf", date: "Mar 2025", size: "2.3 MB" },
  ],
  Other: [
    { name: "Manager Profile.pdf", date: "Jan 2025", size: "0.5 MB" },
  ],
};

export function OpportunityDetail({ opportunity: opp }: OpportunityDetailProps) {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const { base, accent } = opp.heroPalette;

  const keyFacts: { label: string; value: string }[] = [
    opp.type === "fund" ? { label: "Type", value: "Fund" } : { label: "Type", value: "Direct Equity" },
    opp.targetNetReturns ? { label: "Target Net Returns", value: opp.targetNetReturns } : null,
    opp.expectedLiquidity ? { label: "Expected Liquidity", value: opp.expectedLiquidity } : null,
    opp.closeDate ? { label: "Close Date", value: new Date(opp.closeDate).toLocaleDateString("en-AU", { month: "short", year: "numeric" }) } : null,
    opp.minimumInvestable ? { label: "Minimum", value: formatMinInvestment(opp.minimumInvestable.amount, opp.minimumInvestable.currency) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: base }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 100% 0%, ${accent}22 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-20">
          {/* Status badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border"
              style={{ borderColor: `${accent}50`, color: accent, background: `${accent}18` }}>
              Impact Certified
            </span>
            {opp.status === "live" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Coming soon
              </span>
            )}
          </div>

          <p className="text-white/50 text-sm mb-2">By {opp.issuer}</p>
          <h1 className="text-3xl md:text-5xl font-display font-light text-white leading-tight mb-3">
            {opp.projectName}
          </h1>
          <p className="text-white/60 text-base max-w-xl mb-6">{opp.subtitle}</p>
          <div className="text-3xl font-display font-light" style={{ color: accent }}>
            {formatCurrency(opp.issueSize.amount, opp.issueSize.currency)}
          </div>
          <div className="text-white/40 text-sm mt-1">
            {sectorLabels[opp.sector]} · {opp.geography}
          </div>
        </div>
      </div>

      {/* Key facts row */}
      {keyFacts.length > 0 && (
        <div className="bg-navy-950 border-b border-white/8">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-6 md:gap-10">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-0.5">
                <span className="text-xs text-white/40 uppercase tracking-wider font-medium">
                  {fact.label}
                </span>
                <span className="text-sm font-semibold text-white">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="data-room">Data Room</TabsTrigger>
            <TabsTrigger value="impact-room">Impact Room</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-white/40 font-medium mb-3">
                    Capital Requirement
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    {opp.capitalRequirement}
                  </p>
                </div>
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-white/40 font-medium mb-3">
                    Use of Proceeds
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    {opp.useOfProceeds}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-widest text-white/40 font-medium mb-3">
                  Investment Highlights
                </h2>
                <ul className="space-y-2.5">
                  {opp.investmentHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/70 leading-snug">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: opp.heroPalette.accent }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* DATA ROOM TAB */}
          <TabsContent value="data-room">
            <div className="max-w-2xl">
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Document access is available to verified enquirers. Use the Enquire button below to request access.
              </p>
              <div className="flex flex-col gap-3">
                {Object.entries(dataRoomFolders).map(([folder, files]) => (
                  <DataRoomFolder key={folder} name={folder} files={files} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* IMPACT ROOM TAB */}
          <TabsContent value="impact-room">
            <div className="max-w-3xl space-y-10">
              {/* Positive Pursuit */}
              <div>
                <h2 className="text-xs uppercase tracking-widest text-white/40 font-medium mb-4">
                  Primary Positive Pursuit
                </h2>
                <div
                  className="inline-flex items-center gap-3 px-4 py-3 rounded-sm border"
                  style={{ borderColor: `${opp.heroPalette.accent}40`, background: `${opp.heroPalette.accent}10` }}
                >
                  <span className="text-sm font-bold" style={{ color: opp.heroPalette.accent }}>
                    {opp.primaryPositivePursuit.code}
                  </span>
                  <span className="text-sm text-white font-medium">
                    {opp.primaryPositivePursuit.label}
                  </span>
                </div>
                {opp.secondaryPositivePursuit && (
                  <div
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-sm border ml-3"
                    style={{ borderColor: `${opp.heroPalette.accent}25`, background: `${opp.heroPalette.accent}08` }}
                  >
                    <span className="text-sm font-bold text-white/45">
                      {opp.secondaryPositivePursuit.code}
                    </span>
                    <span className="text-sm text-white/55">
                      {opp.secondaryPositivePursuit.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Theory of Change */}
              <div>
                <h2 className="text-xs uppercase tracking-widest text-white/40 font-medium mb-4">
                  Theory of Change
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(["input", "output", "outcome", "impact"] as const).map((key, i) => (
                    <div
                      key={key}
                      className="rounded-sm border border-white/8 p-4 bg-white/5"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <span
                          className="text-xs font-bold"
                          style={{ color: opp.heroPalette.accent }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-semibold text-white/45 uppercase tracking-wider">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-snug">
                        {opp.theoryOfChange[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome KPIs */}
              <div>
                <h2 className="text-xs uppercase tracking-widest text-white/40 font-medium mb-4">
                  Outcome KPIs
                </h2>
                <div className="divide-y divide-white/8 border border-white/8 rounded-sm overflow-hidden">
                  {opp.outcomeKpis.map((kpi, i) => (
                    <div key={i} className="flex items-start gap-4 px-4 py-4 bg-navy-800">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white mb-0.5">
                          {kpi.label}
                        </div>
                        <div className="text-xs text-white/45">{kpi.unit}</div>
                      </div>
                      <div className="text-right shrink-0">
                        {kpi.value ? (
                          <div className="text-lg font-display font-light text-white">
                            {kpi.value}
                          </div>
                        ) : (
                          <div className="text-xs text-white/35 italic max-w-[160px] text-right">
                            {opp.status === "coming-soon"
                              ? "Final KPIs to be confirmed at listing"
                              : "—"}
                          </div>
                        )}
                        <div className="text-xs text-white/35 capitalize">
                          Reported {kpi.cadence.replace("-", " ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assurance & reporting */}
              <div className="space-y-3 text-sm text-white/50 border-t border-white/8 pt-6">
                <div className="flex items-start gap-2">
                  <span className="text-white/40 shrink-0">Reporting cadence:</span>
                  <span className="text-white/70 capitalize font-medium">
                    Reported {opp.reportingCadence.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white/40 shrink-0">Independent assurance:</span>
                  <span className="text-white/70 font-medium">
                    {opp.assuranceProvider ?? "To be confirmed at listing"}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white/40 shrink-0">Break-Even attestation:</span>
                  <span className="text-white/70">
                    A Break-Even analysis has been completed to confirm impact integrity.
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={() => setEnquireOpen(true)}
            className="h-11 px-8 rounded-sm text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: opp.heroPalette.accent }}
          >
            Enquire about this opportunity
          </button>
          <p className="text-xs text-white/40 leading-relaxed max-w-sm">
            This does not constitute an expression of interest in any financial product or an offer to invest.
          </p>
        </div>
      </div>

      <EnquireModal
        open={enquireOpen}
        onOpenChange={setEnquireOpen}
        opportunityName={opp.projectName}
        opportunitySlug={opp.slug}
      />
    </div>
  );
}
