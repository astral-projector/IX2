"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Search } from "lucide-react";
import {
  opportunities,
  type Opportunity,
  formatCurrency,
  sectorLabels,
} from "@/lib/opportunities";

// ─── Chip types ───────────────────────────────────────────────────────────────

type ChipDimension =
  | "sector"
  | "geography"
  | "type"
  | "status"
  | "pursuit"
  | "keyword";

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
  {
    terms: ["fund"],
    chip: { dimension: "type", label: "Fund", value: "fund" },
  },
  {
    terms: ["direct equity", "equity"],
    chip: { dimension: "type", label: "Direct Equity", value: "direct-equity" },
  },
  {
    terms: ["live", "open", "available"],
    chip: { dimension: "status", label: "Live", value: "live" },
  },
  {
    terms: ["coming soon", "upcoming", "pipeline"],
    chip: { dimension: "status", label: "Coming soon", value: "coming-soon" },
  },
  {
    terms: ["australia", "australian"],
    chip: { dimension: "geography", label: "Australia", value: "australia" },
  },
];

function parseQuery(query: string): Chip[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];

  const found: Chip[] = [];
  const usedDimensions = new Set<string>();

  for (const { terms, chip } of keywordMap) {
    if (usedDimensions.has(chip.dimension + chip.value)) continue;
    if (terms.some((t) => lower.includes(t))) {
      found.push({ ...chip, id: `${chip.dimension}-${chip.value}` });
      usedDimensions.add(chip.dimension + chip.value);
    }
  }

  return found;
}

// ─── Filter logic ─────────────────────────────────────────────────────────────

function filterOpportunities(opps: Opportunity[], chips: Chip[]): Opportunity[] {
  if (chips.length === 0) return opps;

  return opps.filter((opp) => {
    return chips.every((chip) => {
      switch (chip.dimension) {
        case "sector":
          return opp.sector === chip.value;
        case "type":
          return opp.type === chip.value;
        case "status":
          return opp.status === chip.value;
        case "geography":
          return opp.geography.toLowerCase().includes(chip.value.toLowerCase());
        case "pursuit":
          return (
            opp.primaryPositivePursuit.code === chip.value ||
            opp.secondaryPositivePursuit?.code === chip.value
          );
        default:
          return true;
      }
    });
  });
}

// ─── Opportunity Tile ─────────────────────────────────────────────────────────

function OpportunityTile({ opp }: { opp: Opportunity }) {
  const { base, accent } = opp.heroPalette;

  return (
    <Link
      href={`/portal/opportunities/${opp.slug}`}
      className="group flex flex-col bg-navy-800 border border-white/8 rounded-sm hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ backgroundColor: accent }} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Avatar + issuer */}
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-sm flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: base }}
          >
            {opp.avatarInitials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white leading-tight truncate">
              {opp.issuer}
            </div>
            <div className="text-xs text-white/55 leading-snug mt-0.5 line-clamp-2">
              {opp.projectName}
            </div>
          </div>
        </div>

        {/* Sector / Geography / Type */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-white/40 truncate">
            {sectorLabels[opp.sector]} · {opp.geography.split("—")[0].trim()}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full border border-white/15 text-white/45 shrink-0">
            {opp.type === "fund" ? "Fund" : "Direct Equity"}
          </span>
        </div>

        {/* Primary Positive Pursuit */}
        <div
          className="text-xs font-medium px-2.5 py-1 rounded-sm"
          style={{ color: accent, background: `${accent}14` }}
        >
          {opp.primaryPositivePursuit.code} — {opp.primaryPositivePursuit.label}
        </div>

        {/* Issue size */}
        <div className="flex-1 flex flex-col justify-end gap-1">
          <div className="text-base font-display font-light text-white">
            {formatCurrency(opp.issueSize.amount, opp.issueSize.currency)}
          </div>
          <div className="text-xs text-white/40">
            {opp.stage}
            {opp.closeDate
              ? ` · Closes ${new Date(opp.closeDate).toLocaleDateString("en-AU", { month: "short", year: "numeric" })}`
              : ""}
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/8">
          <span
            className="text-xs px-2 py-0.5 rounded-full border font-medium"
            style={{
              color: accent,
              borderColor: `${accent}40`,
              background: `${accent}12`,
            }}
          >
            Impact Certified
          </span>
          {opp.status === "live" ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Live
            </span>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Quick filter chips (taxonomy) ────────────────────────────────────────────

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

// ─── Sorted opportunities ─────────────────────────────────────────────────────

function sortedOpportunities(opps: Opportunity[]): Opportunity[] {
  const live = opps
    .filter((o) => o.status === "live")
    .sort((a, b) => {
      if (a.closeDate && b.closeDate)
        return new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime();
      if (a.closeDate) return -1;
      if (b.closeDate) return 1;
      return a.issuer.localeCompare(b.issuer);
    });

  const coming = opps
    .filter((o) => o.status === "coming-soon")
    .sort((a, b) => a.issuer.localeCompare(b.issuer));

  return [...live, ...coming];
}

const placeholders = [
  "Show me biodiversity opportunities in Australia",
  "Find funds with verified KPIs closing this year",
  "What's available in agritech?",
  "Show me nature-based investments",
  "Direct equity in energy transition",
];

// ─── Main component ───────────────────────────────────────────────────────────

export function OpportunityGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [chips, setChips] = useState<Chip[]>(() => {
    const raw = searchParams.get("filters");
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholder text
  useEffect(() => {
    const id = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % placeholders.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  const updateUrl = useCallback(
    (q: string, newChips: Chip[]) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (newChips.length > 0) params.set("filters", JSON.stringify(newChips));
      const search = params.toString();
      router.replace(search ? `?${search}` : "/portal", { scroll: false });
    },
    [router]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const parsed = parseQuery(val);
    const merged = mergeChips(chips, parsed);
    setChips(merged);
    updateUrl(val, merged);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const parsed = parseQuery(query);
      const merged = mergeChips(chips, parsed);
      setChips(merged);
      setQuery("");
      updateUrl("", merged);
    }
  };

  const addQuickFilter = (filter: Omit<Chip, "id">) => {
    const chip: Chip = { ...filter, id: `${filter.dimension}-${filter.value}` };
    if (chips.find((c) => c.id === chip.id)) return;
    const newChips = [...chips, chip];
    setChips(newChips);
    updateUrl(query, newChips);
  };

  const removeChip = (id: string) => {
    const newChips = chips.filter((c) => c.id !== id);
    setChips(newChips);
    updateUrl(query, newChips);
  };

  const clearAll = () => {
    setChips([]);
    setQuery("");
    updateUrl("", []);
  };

  const filtered = sortedOpportunities(filterOpportunities(opportunities, chips));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Search bar */}
      <div className="mb-8">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[placeholderIdx]}
            className="w-full h-14 pl-11 pr-4 bg-white/5 border border-white/12 rounded-sm text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors shadow-sm"
          />
        </div>

        {/* Active chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {chips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => removeChip(chip.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/20 text-brand-green border border-brand-green/30 text-xs rounded-full font-medium hover:bg-brand-green/30 transition-colors"
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
            {chips.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-white/35 hover:text-white/60 underline"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Quick filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {quickFilters
            .filter((f) => !chips.find((c) => c.id === `${f.dimension}-${f.value}`))
            .map((f) => (
              <button
                key={`${f.dimension}-${f.value}`}
                onClick={() => addQuickFilter(f)}
                className="px-3 py-1 text-xs border border-white/15 text-white/55 rounded-full hover:bg-white/8 hover:border-white/25 transition-colors"
              >
                {f.label}
              </button>
            ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
          {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"}
          {chips.length > 0 ? " matching filters" : ""}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((opp) => (
            <OpportunityTile key={opp.slug} opp={opp} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-4 text-white/15">◯</div>
          <p className="text-white/40 font-medium mb-1">No opportunities match these filters</p>
          <button
            onClick={clearAll}
            className="text-sm text-brand-green hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function mergeChips(existing: Chip[], parsed: Chip[]): Chip[] {
  const map = new Map(existing.map((c) => [c.id, c]));
  for (const c of parsed) {
    if (!map.has(c.id)) map.set(c.id, c);
  }
  return Array.from(map.values());
}
