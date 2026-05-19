"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { brand } from "@/lib/brand";

type Phase = "idle" | "counting" | "collapse" | "compare";

function AnimatedNumber({
  from,
  to,
  duration = 1.8,
  isRunning,
}: {
  from: number;
  to: number;
  duration?: number;
  isRunning: boolean;
}) {
  const count = useMotionValue(from);
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!isRunning) return;
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isRunning, count, to, duration]);

  return <span>{display}</span>;
}

// Derived from the 5 certified opportunities in the pilot
const certifiedList = [
  { name: "MDB Balanced Water Fund",      category: "Nature",   accent: "#4caf82", type: "Open-ended Fund" },
  { name: "Wilton Zero-Emission Freight", category: "Climate",  accent: "#4c8af0", type: "Series B"        },
  { name: "Methane-Reduction Technology", category: "Agritech", accent: "#4caf82", type: "Series A"        },
  { name: "Silicon Anode Technology",     category: "Energy",   accent: "#4c8af0", type: "Series B"        },
  { name: "Older Women's Housing Fund",   category: "Social",   accent: "#d4648a", type: "Private Credit"  },
];

export function JohnWestCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState<Phase>("idle");

  const { start, end, caveat } = brand.johnWestCounter;

  useEffect(() => {
    if (!inView || phase !== "idle") return;
    setPhase("counting");
    // counting animation: ~2.2s + 0.7s pause before collapse
    const t1 = setTimeout(() => setPhase("collapse"), 2900);
    // collapse takes 0.5s, then show comparison
    const t2 = setTimeout(() => setPhase("compare"), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, phase]);

  const counted   = phase !== "idle";
  const collapsed = phase === "collapse" || phase === "compare";
  const comparing = phase === "compare";

  return (
    <div ref={ref} className="flex flex-col items-center gap-8 w-full max-w-sm">

      {/* ── Counter row ── */}
      <div className="flex items-end justify-center gap-6 w-full">

        {/* 27 reviewed — fades out after counting */}
        <motion.div
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.45, ease: "easeIn" }}
          className="flex flex-col items-center"
        >
          <div className="text-6xl md:text-7xl font-display font-light text-white/20 tabular-nums leading-none">
            {start}
          </div>
          <div className="mt-2 text-[9px] text-white/20 uppercase tracking-widest font-medium text-center leading-loose">
            deals<br />reviewed
          </div>
        </motion.div>

        {/* Filter divider — fades with the 27 */}
        <motion.div
          animate={{ opacity: collapsed ? 0 : 0.22 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="flex flex-col items-center gap-1 shrink-0 pb-9"
        >
          <div className="w-px h-7 bg-white/50" />
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="text-white/60">
            <path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="w-px h-7 bg-white/50" />
        </motion.div>

        {/* 6 certified — scales up and brightens once 27 is gone */}
        <motion.div
          animate={{ scale: collapsed ? 1.14 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="text-6xl md:text-7xl font-display font-light text-brand-green tabular-nums leading-none">
            <AnimatedNumber from={start} to={end} duration={2.2} isRunning={counted} />
          </div>
          <motion.div
            animate={{ opacity: collapsed ? 1 : 0.5 }}
            transition={{ duration: 0.4 }}
            className="mt-2 text-[9px] text-white/50 uppercase tracking-widest font-medium text-center leading-loose"
          >
            impact<br />certified
          </motion.div>
        </motion.div>
      </div>

      {/* ── Comparison list ── */}
      <motion.div
        animate={comparing ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        {/* Section label */}
        <p className="text-[9px] text-white/25 uppercase tracking-widest font-semibold mb-2 text-center">
          Certified opportunities
        </p>

        {/* Column headers */}
        <div className="flex items-center gap-2.5 pb-1.5 border-b border-white/10">
          <div className="w-[6px] shrink-0" />
          <span className="text-[8px] uppercase tracking-wider text-white/20 font-medium w-[54px] shrink-0">
            Category
          </span>
          <span className="text-[8px] uppercase tracking-wider text-white/20 font-medium flex-1">
            Opportunity
          </span>
          <span className="text-[8px] uppercase tracking-wider text-white/20 font-medium text-right shrink-0">
            Type
          </span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {certifiedList.map((opp, i) => (
            <motion.div
              key={opp.name}
              animate={comparing ? { opacity: 1 } : { opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.12 + i * 0.08, duration: 0.3 }}
              className="flex items-center gap-2.5 py-2"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: opp.accent }}
              />
              <span
                className="text-[9px] uppercase tracking-wide font-semibold w-[54px] shrink-0 leading-none"
                style={{ color: opp.accent }}
              >
                {opp.category}
              </span>
              <span className="flex-1 text-[11px] text-white/55 truncate leading-tight min-w-0">
                {opp.name}
              </span>
              <span className="text-[9px] text-white/28 shrink-0 text-right whitespace-nowrap">
                {opp.type}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Caveat */}
        <p className="text-[9px] text-white/18 text-center mt-3 leading-relaxed">
          {caveat}
        </p>
      </motion.div>
    </div>
  );
}
