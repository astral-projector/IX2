"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { brand } from "@/lib/brand";

type Phase = "idle" | "reviewing" | "filtering" | "certified";

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const certifiedDeals = [
  { name: "MDB Balanced Water Fund",        category: "Nature",   type: "Open-ended Fund", accent: "#4caf82" },
  { name: "Wilton Zero-Emission Freight",   category: "Climate",  type: "Series B",        accent: "#4c8af0" },
  { name: "Methane-Reduction Technology",   category: "Agritech", type: "Series A",        accent: "#4caf82" },
  { name: "Silicon Anode Technology",       category: "Energy",   type: "Series B",        accent: "#4c8af0" },
  { name: "Older Women's Housing Fund",     category: "Social",   type: "Private Credit",  accent: "#d4648a" },
  { name: "Biodiverse Farmland Transition", category: "Nature",   type: "Open-ended Fund", accent: "#4caf82" },
];

// 27 tiles total; certified deals occupy these positions (spread across all three rows)
const CERTIFIED_INDICES = [2, 6, 11, 15, 19, 24];
const certifiedSet = new Set(CERTIFIED_INDICES);

const tiles = Array.from({ length: 27 }, (_, i) => {
  const dealIdx = CERTIFIED_INDICES.indexOf(i);
  return {
    index: i,
    isCertified: certifiedSet.has(i),
    deal: dealIdx >= 0 ? certifiedDeals[dealIdx] : null,
  };
});

export function JohnWestCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!inView || phase !== "idle") return;
    setPhase("reviewing");
    // tiles finish staggering in at ~27 * 38ms + 300ms ≈ 1330ms; pause then filter
    const t1 = setTimeout(() => setPhase("filtering"), 2100);
    // filtering takes ~750ms, then reveal certified list
    const t2 = setTimeout(() => setPhase("certified"), 2950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView, phase]);

  const isCertifying = phase === "filtering" || phase === "certified";

  return (
    <div ref={ref} className="w-full max-w-sm">

      {/* ── Tile grid: 9 cols × 3 rows = 27 tiles ── */}
      <div className="grid grid-cols-9 gap-1.5 mb-4">
        {tiles.map((tile) => {
          const dimmed = isCertifying && !tile.isCertified;
          return (
            <motion.div
              key={tile.index}
              className="relative rounded-sm overflow-hidden border"
              style={{
                aspectRatio: "1",
                backgroundColor: tile.isCertified && isCertifying
                  ? hexToRgba(tile.deal!.accent, 0.09)
                  : "rgba(255,255,255,0.04)",
                borderColor: tile.isCertified && isCertifying
                  ? hexToRgba(tile.deal!.accent, 0.38)
                  : "rgba(255,255,255,0.07)",
                transition: "background-color 0.65s ease, border-color 0.65s ease",
              }}
              initial={{ opacity: 0, scale: 0.55, filter: "blur(0px)" }}
              animate={
                phase === "idle"
                  ? { opacity: 0, scale: 0.55, filter: "blur(0px)" }
                  : dimmed
                  ? { opacity: 0.12, scale: 1, filter: "blur(1.5px)" }
                  : { opacity: 1, scale: 1, filter: "blur(0px)" }
              }
              transition={
                phase === "reviewing"
                  ? { duration: 0.3, delay: tile.index * 0.038, ease: "easeOut" }
                  : { duration: 0.75, ease: "easeInOut", delay: 0 }
              }
            >
              {/* Certified check + category label — fades in when filtering begins */}
              {tile.isCertified && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-[3px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isCertifying ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.5 5l2.5 2.5L8.5 2"
                      stroke={tile.deal!.accent}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[4.5px] uppercase tracking-[0.07em] font-bold leading-none text-center"
                    style={{ color: tile.deal!.accent }}
                  >
                    {tile.deal!.category}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Counter row ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-display font-light text-white/28 tabular-nums leading-none">
            27
          </span>
          <span className="text-[8px] uppercase tracking-widest text-white/20 font-medium leading-tight">
            deals<br />reviewed
          </span>
        </div>

        <motion.div
          className="flex flex-1 items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isCertifying ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-brand-green/25" />
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className="shrink-0 text-brand-green/40">
            <path
              d="M3 7h8M8 4l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isCertifying ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <span className="text-xl font-display font-light text-brand-green tabular-nums leading-none">
            6
          </span>
          <span className="text-[8px] uppercase tracking-widest text-brand-green/60 font-medium leading-tight">
            impact<br />certified
          </span>
        </motion.div>
      </div>

      {/* ── Certified deal list ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: phase === "certified" ? 1 : 0, y: phase === "certified" ? 0 : 8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-[8px] text-white/20 uppercase tracking-widest font-semibold mb-2 text-center">
          Certified opportunities
        </p>

        <div className="border-t border-white/8">
          {/* Column headers */}
          <div className="flex items-center gap-2.5 py-1.5 border-b border-white/8">
            <div className="w-[6px] shrink-0" />
            <span className="text-[7.5px] uppercase tracking-wider text-white/18 font-medium w-[50px] shrink-0">
              Category
            </span>
            <span className="text-[7.5px] uppercase tracking-wider text-white/18 font-medium flex-1">
              Opportunity
            </span>
            <span className="text-[7.5px] uppercase tracking-wider text-white/18 font-medium text-right shrink-0">
              Type
            </span>
          </div>

          {/* Deal rows */}
          {certifiedDeals.map((deal, i) => (
            <motion.div
              key={deal.name}
              className="flex items-center gap-2.5 py-1.5 border-b border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "certified" ? 1 : 0 }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.3 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: deal.accent }}
              />
              <span
                className="text-[8px] uppercase tracking-wide font-semibold w-[50px] shrink-0 leading-none"
                style={{ color: deal.accent }}
              >
                {deal.category}
              </span>
              <span className="flex-1 text-[10px] text-white/50 truncate leading-tight min-w-0">
                {deal.name}
              </span>
              <span className="text-[8px] text-white/25 shrink-0 text-right whitespace-nowrap">
                {deal.type}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-[8px] text-white/15 text-center mt-3 leading-relaxed">
          {brand.johnWestCounter.caveat}
        </p>
      </motion.div>
    </div>
  );
}
