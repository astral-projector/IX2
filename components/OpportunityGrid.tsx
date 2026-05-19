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

function FieldRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium">{label}</span>
      <span className="text-xs text-white/75 font-medium truncate">
        {value ?? <span className="text-white/25 font-normal italic">TBC at listing</span>}
      </span>
    </div>
  );
}

const intensityConfig = {
  High:        { dots: 3, label: "High" },
  Moderate:    { dots: 2, label: "Moderate" },
  Exploratory: { dots: 1, label: "Exploratory" },
};

function OpportunityCard({ opp }: { opp: Opportunity }) {
  const { accent } = opp.heroPalette;
  const intensity = opp.impactIntensity ? intensityConfig[opp.impactIntensity] : null;

  return (
    <Link
      href={`/portal/opportunities/${opp.slug}`}
      className="group flex flex-col bg-navy-800 border border-white/8 rounded-sm hover:border-white/20 hover:shadow-lg hover:shadow-black/25 transition-all duration-200 overflow-hidden"
    >
      {/* Top accent stripe */}
      <div className="h-0.5 w-full shrink-0" style={{ backgroundColor: accent }} />

      <div className="p-5 flex flex-col gap-3.5 flex-1">
        {/* Header: avatar + issuer + project name */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
            style={{ backgroundColor: opp.heroPalette.base }}
          >
            {opp.avatarInitials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-white/40 mb-0.5 truncate">{opp.issuer}</div>
            <div className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-brand-green transition-colors">
              {opp.projectName}
            </div>
          </div>
        </div>

        {/* Investment type label */}
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-sm border"
            style={{ color: accent, borderColor: `${accent}35`, background: `${accent}10` }}
          >
            {opp.investmentTypeLabel}
          </span>
          <span className="text-[11px] text-white/30 border border-white/10 px-2 py-0.5 rounded-sm">
            {opp.assetClass}
          </span>
        </div>

        {/* Key fields grid: 4 fields, 2 columns */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 bg-navy-900/60 rounded-sm p-3 border border-white/5">
          <FieldRow label="Issue Size" value={formatCurrency(opp.issueSize.amount, opp.issueSize.currency)} />
          <FieldRow
            label="Min. Investment"
            value={
              opp.minimumInvestable
                ? formatMinInvestment(opp.minimumInvestable.amount, opp.minimumInvestable.currency)
                : null
            }
          />
          <FieldRow label="Liquidity" value={opp.expectedLiquidity} />
          <FieldRow label="Term" value={opp.expectedMaturity} />
        </div>

        {/* Positive Pursuit */}
        <div
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm text-xs font-medium"
          style={{ color: accent, background: `${accent}14` }}
        >
          <span className="font-mono text-[10px] opacity-70">{opp.primaryPositivePursuit.code}</span>
          <span>{opp.primaryPositivePursuit.label}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {opp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-sm border border-white/10 text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Impact intensity */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Impact intensity</span>
          {intensity ? (
            <span className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i < intensity.dots ? accent : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
              <span className="text-[10px] ml-1" style={{ color: accent }}>
                {intensity.label}
              </span>
            </span>
          ) : (
            <span className="text-[10px] text-white/25 italic">TBC</span>
          )}
        </div>

        {/* Footer: status + Impact Certified — always one line */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/8 overflow-hidden mt-auto">
          {opp.status === "live" ? (
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-400 border border-emerald-700/40 font-medium shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
          ) : (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-400 border border-amber-700/30 font-medium shrink-0">
              Soon
            </span>
          )}
          <span
            className="ml-auto text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0"
            style={{ color: accent, borderColor: `${accent}35`, background: `${accent}10` }}
          >
            Impact Certified
          </span>
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
                    : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/65",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] opacity-80 shrink-0">{pp.code}</span>
                <span className="text-[10px]">{pp.label}</span>
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
