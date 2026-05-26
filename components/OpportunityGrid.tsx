"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  opportunities,
  type Opportunity,
  formatCurrency,
  formatMinInvestment,
  sectorLabels,
} from "@/lib/opportunities";
import { positivePursuits, sdgs, matchTaxonomy, matchesActiveTaxonomy } from "@/lib/taxonomy";

// ─── Chip types ───────────────────────────────────────────────────────────────

type ChipDimension = "sector" | "geography" | "type" | "status" | "pp" | "sdg";

interface Chip {
  id: string;
  dimension: ChipDimension;
  label: string;
  value: string;
}

// ─── Keyword → filter mapping ─────────────────────────────────────────────────

const keywordMap: { terms: string[]; chip: Omit<Chip, "id"> }[] = [
  {
    terms: ["biodiversity", "nature", "ecosystem", "ecosystems", "water", "basin", "environmental"],
    chip: { dimension: "sector", label: "Nature-Based", value: "nature-based" },
  },
  {
    terms: ["ev", "electric vehicle", "freight", "transport", "trucks", "zero-emission"],
    chip: { dimension: "sector", label: "Energy & Transport", value: "energy-transport" },
  },
  {
    terms: ["methane", "livestock", "cattle", "sheep", "feed", "agritech", "pastoral", "agri"],
    chip: { dimension: "sector", label: "Agritech", value: "agritech" },
  },
  {
    terms: ["housing", "homelessness", "affordable", "social housing", "women", "older women"],
    chip: { dimension: "sector", label: "Social Housing", value: "social-housing" },
  },
  {
    terms: ["battery", "anode", "silicon", "advanced materials", "materials", "lithium"],
    chip: { dimension: "sector", label: "Advanced Materials", value: "advanced-materials" },
  },
  { terms: ["fund"], chip: { dimension: "type", label: "Fund", value: "fund" } },
  {
    terms: ["direct equity", "equity"],
    chip: { dimension: "type", label: "Direct Equity", value: "direct-equity" },
  },
  { terms: ["live", "open", "available"], chip: { dimension: "status", label: "Live", value: "live" } },
  {
    terms: ["coming soon", "upcoming", "pipeline"],
    chip: { dimension: "status", label: "Coming soon", value: "coming-soon" },
  },
];

function parseQueryToChips(query: string): Chip[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];
  const found: Chip[] = [];
  const used = new Set<string>();
  for (const { terms, chip } of keywordMap) {
    const key = `${chip.dimension}-${chip.value}`;
    if (used.has(key)) continue;
    if (terms.some((t) => lower.includes(t))) {
      found.push({ ...chip, id: key });
      used.add(key);
    }
  }
  return found;
}

// ─── Filter logic ─────────────────────────────────────────────────────────────

function filterOpportunities(opps: Opportunity[], chips: Chip[], activePPs: string[], activeSDGs: number[]): Opportunity[] {
  let result = opps;

  if (chips.length > 0) {
    result = result.filter((opp) =>
      chips.every((chip) => {
        switch (chip.dimension) {
          case "sector":    return opp.sector === chip.value;
          case "type":      return opp.type === chip.value;
          case "status":    return opp.status === chip.value;
          case "geography": return opp.geography.toLowerCase().includes(chip.value.toLowerCase());
          case "pp":        return opp.primaryPositivePursuit.code === chip.value || opp.secondaryPositivePursuit?.code === chip.value;
          case "sdg":       return (opp.sdgAlignment ?? []).includes(`SDG ${chip.value}`);
          default:          return true;
        }
      })
    );
  }

  if (activePPs.length > 0 || activeSDGs.length > 0) {
    result = result.filter((opp) =>
      matchesActiveTaxonomy(opp, activePPs, activeSDGs)
    );
  }

  return result;
}

function sortedOpportunities(opps: Opportunity[]): Opportunity[] {
  const live = opps
    .filter((o) => o.status === "live")
    .sort((a, b) => {
      if (a.closeDate && b.closeDate) return new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime();
      if (a.closeDate) return -1;
      if (b.closeDate) return 1;
      return a.issuer.localeCompare(b.issuer);
    });
  const coming = opps.filter((o) => o.status === "coming-soon").sort((a, b) => a.issuer.localeCompare(b.issuer));
  return [...live, ...coming];
}

// ─── Opportunity Card ─────────────────────────────────────────────────────────

function MetricCell({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="bg-navy-800 px-3 py-2.5 flex flex-col gap-0.5">
      <span className="text-[9px] uppercase tracking-wider text-white/25 font-medium">{label}</span>
      <span className="text-[11px] text-white/70 font-medium truncate">
        {value ?? <span className="text-white/22 font-normal italic">TBC</span>}
      </span>
    </div>
  );
}

function OpportunityCard({ opp }: { opp: Opportunity }) {
  const { accent } = opp.heroPalette;

  return (
    <Link
      href={`/portal/opportunities/${opp.slug}`}
      className="group flex flex-col bg-navy-800 border border-white/8 rounded-md hover:border-white/18 hover:-translate-y-px hover:shadow-xl hover:shadow-black/40 transition-all duration-200 overflow-hidden"
    >
      {/* Thick accent stripe + sector label */}
      <div className="h-1 w-full shrink-0" style={{ backgroundColor: accent }} />
      <div className="px-5 pt-2.5">
        <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: accent }}>
          {sectorLabels[opp.sector]}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-5 pt-2 pb-0 gap-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-medium tracking-wide text-white/35 truncate">
                {opp.issuer}
              </span>
              {opp.status === "live" && (
                <span className="inline-flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-medium">Live</span>
                </span>
              )}
            </div>
            <h3
              className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-brand-green transition-colors duration-200"
              style={{ minHeight: "2.6rem" }}
            >
              {opp.projectName}
            </h3>
          </div>
          {/* PP badge replaces avatar initials */}
          <div
            className="shrink-0 mt-0.5 px-2 py-1 rounded-sm border text-center"
            style={{ borderColor: `${accent}35`, backgroundColor: `${accent}10` }}
          >
            <span className="font-mono text-[10px] font-bold block" style={{ color: accent }}>
              {opp.primaryPositivePursuit.code}
            </span>
          </div>
        </div>

        {/* Type badges */}
        <div className="flex items-center gap-1.5">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-sm border"
            style={{ color: accent, borderColor: `${accent}44`, backgroundColor: `${accent}12` }}
          >
            {opp.investmentTypeLabel}
          </span>
          <span className="text-[11px] text-white/28 border border-white/8 px-2 py-0.5 rounded-sm">
            {opp.assetClass}
          </span>
        </div>

        {/* Metric grid — always shows Target Return */}
        <div className="grid grid-cols-2 gap-px bg-white/6 rounded-sm overflow-hidden">
          <MetricCell label="Raise" value={formatCurrency(opp.issueSize.amount, opp.issueSize.currency)} />
          <MetricCell
            label="Min. Investment"
            value={opp.minimumInvestable ? formatMinInvestment(opp.minimumInvestable.amount, opp.minimumInvestable.currency) : null}
          />
          <MetricCell label="Target Return" value={opp.targetNetReturns} />
          <MetricCell label="Term" value={opp.expectedMaturity} />
        </div>

        {/* Positive Pursuit */}
        <div className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full mt-[3px] shrink-0" style={{ backgroundColor: accent }} />
          <div className="min-w-0">
            <span className="font-mono text-[10px] font-semibold text-white/30 mr-1.5">
              {opp.primaryPositivePursuit.code}
            </span>
            <span className="text-[11px] text-white/50 leading-snug">
              {opp.primaryPositivePursuit.label}
            </span>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="px-5 py-3 mt-4 border-t border-white/6 flex items-center gap-2">
        {opp.status === "live" ? (
          <span className="text-[10px] text-white/35">Closes Dec 2026</span>
        ) : (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/35 border border-white/10 font-medium">
            Coming soon
          </span>
        )}
        <div className="ml-auto flex items-center gap-1 text-[10px] font-medium text-brand-green shrink-0">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 5.5l2 2L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Certified</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Taxonomy filter panel ────────────────────────────────────────────────────

interface TaxonomyPanelProps {
  activePPs: string[];
  activeSDGs: number[];
  highlightedPPs: string[];
  highlightedSDGs: number[];
  onTogglePP: (code: string) => void;
  onToggleSDG: (num: number) => void;
}

function TaxonomyPanel({
  activePPs,
  activeSDGs,
  highlightedPPs,
  highlightedSDGs,
  onTogglePP,
  onToggleSDG,
}: TaxonomyPanelProps) {
  return (
    <div className="border border-white/10 rounded-sm bg-navy-900/80 p-4 space-y-4">
      {/* Positive Pursuits */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/35 font-semibold mb-2">
          Positive Pursuits
        </p>
        <div className="flex flex-wrap gap-1.5">
          {positivePursuits.map((pp) => {
            const isActive = activePPs.includes(pp.code);
            const isHighlighted = highlightedPPs.includes(pp.code);
            return (
              <button
                key={pp.code}
                onClick={() => onTogglePP(pp.code)}
                className={[
                  "inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-sm border transition-all text-left",
                  isActive
                    ? "bg-brand-green/20 border-brand-green/50 text-brand-green font-semibold"
                    : isHighlighted
                    ? "bg-brand-green/8 border-brand-green/30 text-brand-green/70"
                    : pp.available
                    ? "border-brand-green/20 text-white/55 bg-brand-green/[0.04] hover:border-brand-green/40 hover:text-white/75"
                    : "border-white/8 text-white/28 hover:border-white/18 hover:text-white/45",
                ].join(" ")}
              >
                <span className={["font-mono text-[10px] shrink-0", isActive ? "opacity-100" : pp.available ? "text-brand-green/50" : "opacity-50"].join(" ")}>{pp.code}</span>
                <span className="text-[10px]">{pp.label}</span>
                {pp.available && !isActive && (
                  <span className="w-1 h-1 rounded-full bg-brand-green/50 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SDGs */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/35 font-semibold mb-2">
          UN Sustainable Development Goals
        </p>
        <div className="flex flex-wrap gap-1.5">
          {sdgs.map((sdg) => {
            const isActive = activeSDGs.includes(sdg.number);
            const isHighlighted = highlightedSDGs.includes(sdg.number);
            return (
              <button
                key={sdg.number}
                onClick={() => onToggleSDG(sdg.number)}
                className={[
                  "inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-sm border font-medium transition-all",
                  isActive
                    ? "bg-brand-green/20 border-brand-green/50 text-brand-green"
                    : isHighlighted
                    ? "bg-brand-green/8 border-brand-green/30 text-brand-green/60"
                    : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/65",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] shrink-0">{sdg.number}</span>
                <span className="text-[10px]">{sdg.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Quick filter chips ───────────────────────────────────────────────────────

const quickFilters: Omit<Chip, "id">[] = [
  { dimension: "sector", label: "Nature-Based", value: "nature-based" },
  { dimension: "sector", label: "Energy & Transport", value: "energy-transport" },
  { dimension: "sector", label: "Agritech", value: "agritech" },
  { dimension: "sector", label: "Social Housing", value: "social-housing" },
  { dimension: "sector", label: "Advanced Materials", value: "advanced-materials" },
  { dimension: "status", label: "Live now", value: "live" },
  { dimension: "type", label: "Fund", value: "fund" },
  { dimension: "type", label: "Direct Equity", value: "direct-equity" },
];

const placeholders = [
  "Show me biodiversity opportunities",
  "Find climate-impact investments",
  "What's available in agritech?",
  "Show me nature-based funds",
  "Housing and social impact",
];

// ─── Main component ───────────────────────────────────────────────────────────

function mergeChips(existing: Chip[], parsed: Chip[]): Chip[] {
  const map = new Map(existing.map((c) => [c.id, c]));
  for (const c of parsed) {
    if (!map.has(c.id)) map.set(c.id, c);
  }
  return Array.from(map.values());
}

export function OpportunityGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [chips, setChips] = useState<Chip[]>(() => {
    const raw = searchParams.get("filters");
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  });
  const [activePPs, setActivePPs] = useState<string[]>(() => {
    const raw = searchParams.get("pp");
    return raw ? raw.split(",").filter(Boolean) : [];
  });
  const [activeSDGs, setActiveSDGs] = useState<number[]>(() => {
    const raw = searchParams.get("sdg");
    return raw ? raw.split(",").map(Number).filter(Boolean) : [];
  });
  const [taxonomyOpen, setTaxonomyOpen] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Taxonomy matches from current query (for highlighting)
  const queryMatches = matchTaxonomy(query);

  useEffect(() => {
    const id = setInterval(() => setPlaceholderIdx((i) => (i + 1) % placeholders.length), 3500);
    return () => clearInterval(id);
  }, []);

  const updateUrl = useCallback(
    (q: string, newChips: Chip[], pps: string[], sdgNums: number[]) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (newChips.length > 0) params.set("filters", JSON.stringify(newChips));
      if (pps.length > 0) params.set("pp", pps.join(","));
      if (sdgNums.length > 0) params.set("sdg", sdgNums.join(","));
      const search = params.toString();
      router.replace(search ? `?${search}` : "/portal", { scroll: false });
    },
    [router]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const parsed = parseQueryToChips(val);
    const merged = mergeChips(chips, parsed);
    setChips(merged);
    updateUrl(val, merged, activePPs, activeSDGs);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Commit highlighted taxonomy matches as active filters
      const matched = matchTaxonomy(query);
      const newPPs = Array.from(new Set([...activePPs, ...matched.pps]));
      const newSDGs = Array.from(new Set([...activeSDGs, ...matched.sdgs]));
      const parsed = parseQueryToChips(query);
      const merged = mergeChips(chips, parsed);
      setChips(merged);
      setActivePPs(newPPs);
      setActiveSDGs(newSDGs);
      setQuery("");
      updateUrl("", merged, newPPs, newSDGs);
    }
  };

  const togglePP = (code: string) => {
    const newPPs = activePPs.includes(code) ? activePPs.filter((p) => p !== code) : [...activePPs, code];
    setActivePPs(newPPs);
    updateUrl(query, chips, newPPs, activeSDGs);
  };

  const toggleSDG = (num: number) => {
    const newSDGs = activeSDGs.includes(num) ? activeSDGs.filter((n) => n !== num) : [...activeSDGs, num];
    setActiveSDGs(newSDGs);
    updateUrl(query, chips, activePPs, newSDGs);
  };

  const addQuickFilter = (filter: Omit<Chip, "id">) => {
    const chip: Chip = { ...filter, id: `${filter.dimension}-${filter.value}` };
    if (chips.find((c) => c.id === chip.id)) return;
    const newChips = [...chips, chip];
    setChips(newChips);
    updateUrl(query, newChips, activePPs, activeSDGs);
  };

  const removeChip = (id: string) => {
    const newChips = chips.filter((c) => c.id !== id);
    setChips(newChips);
    updateUrl(query, newChips, activePPs, activeSDGs);
  };

  const clearAll = () => {
    setChips([]);
    setActivePPs([]);
    setActiveSDGs([]);
    setQuery("");
    updateUrl("", [], [], []);
  };

  const filtered = sortedOpportunities(filterOpportunities(opportunities, chips, activePPs, activeSDGs));
  const hasActiveFilters = chips.length > 0 || activePPs.length > 0 || activeSDGs.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Search bar */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[placeholderIdx]}
              className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/12 rounded-sm text-white placeholder-white/25 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green/40 focus:border-brand-green/50 transition-colors"
            />
          </div>
          <button
            onClick={() => setTaxonomyOpen((v) => !v)}
            className={[
              "flex items-center gap-2 px-3 h-11 border rounded-sm text-sm transition-colors shrink-0",
              taxonomyOpen || activePPs.length > 0 || activeSDGs.length > 0
                ? "bg-brand-green/10 border-brand-green/40 text-brand-green"
                : "border-white/12 text-white/45 hover:border-white/25 hover:text-white/70",
            ].join(" ")}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Impact filters</span>
            {(activePPs.length > 0 || activeSDGs.length > 0) && (
              <span className="bg-brand-green/20 text-brand-green text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                {activePPs.length + activeSDGs.length}
              </span>
            )}
            <ChevronDown size={12} className={taxonomyOpen ? "rotate-180" : ""} style={{ transition: "transform 0.15s" }} />
          </button>
        </div>

        {/* Taxonomy panel */}
        {taxonomyOpen && (
          <div className="mt-2">
            <TaxonomyPanel
              activePPs={activePPs}
              activeSDGs={activeSDGs}
              highlightedPPs={queryMatches.pps}
              highlightedSDGs={queryMatches.sdgs}
              onTogglePP={togglePP}
              onToggleSDG={toggleSDG}
            />
          </div>
        )}

        {/* Active chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {chips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => removeChip(chip.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/8 text-white/70 border border-white/15 text-xs rounded-full hover:bg-white/12 transition-colors"
              >
                {chip.label}
                <X size={11} />
              </button>
            ))}
            {activePPs.map((code) => {
              const pp = positivePursuits.find((p) => p.code === code);
              return (
                <button
                  key={`pp-${code}`}
                  onClick={() => togglePP(code)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-green/15 text-brand-green border border-brand-green/30 text-xs rounded-full hover:bg-brand-green/25 transition-colors font-medium"
                >
                  <span className="font-mono text-[10px]">{code}</span>
                  {pp && <span>{pp.label}</span>}
                  <X size={11} />
                </button>
              );
            })}
            {activeSDGs.map((num) => {
              const sdg = sdgs.find((s) => s.number === num);
              return (
                <button
                  key={`sdg-${num}`}
                  onClick={() => toggleSDG(num)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-green/15 text-brand-green border border-brand-green/30 text-xs rounded-full hover:bg-brand-green/25 transition-colors font-medium"
                >
                  <span className="font-mono text-[10px]">SDG {num}</span>
                  {sdg && <span>{sdg.shortLabel}</span>}
                  <X size={11} />
                </button>
              );
            })}
            <button onClick={clearAll} className="text-xs text-white/30 hover:text-white/55 underline">
              Clear all
            </button>
          </div>
        )}

        {/* Quick filters */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {quickFilters
            .filter((f) => !chips.find((c) => c.id === `${f.dimension}-${f.value}`))
            .map((f) => (
              <button
                key={`${f.dimension}-${f.value}`}
                onClick={() => addQuickFilter(f)}
                className="px-2.5 py-1 text-[11px] border border-white/10 text-white/40 rounded-full hover:bg-white/6 hover:border-white/20 hover:text-white/60 transition-colors"
              >
                {f.label}
              </button>
            ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-xs text-white/35 font-medium uppercase tracking-wider">
          {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"}
          {hasActiveFilters ? " matching filters" : ""}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((opp) => (
            <OpportunityCard key={opp.slug} opp={opp} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-3xl mb-4 text-white/10">◯</div>
          <p className="text-white/40 font-medium mb-1 text-sm">No opportunities match these filters</p>
          <button onClick={clearAll} className="text-sm text-brand-green hover:underline mt-2">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
