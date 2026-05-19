"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { brand } from "@/lib/brand";

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

// Matrix data: instrument type → impact theme → certified count
const instrumentTypes = ["Private Equity", "Private Credit", "Funds", "Real Assets"] as const;
const impactThemes = ["Climate", "Nature", "Housing", "Energy", "Agritech"] as const;

type InstrumentType = (typeof instrumentTypes)[number];
type ImpactTheme = (typeof impactThemes)[number];

// Derived from the 5 pilot opportunities
const matrixDots: Partial<Record<InstrumentType, Partial<Record<ImpactTheme, number>>>> = {
  "Private Equity": { Climate: 2, Energy: 1, Agritech: 1 },
  "Private Credit": { Housing: 1 },
  "Funds":          { Nature: 1, Housing: 1 },
  "Real Assets":    { Nature: 1 },
};

function ComparisonMatrix({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="w-full"
    >
      <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-3 text-center">
        Certified opportunities — comparable across
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-[10px] border-collapse">
          <thead>
            <tr>
              <th className="w-28 text-left pb-2 text-white/25 font-normal pr-3" />
              {impactThemes.map((theme) => (
                <th
                  key={theme}
                  className="pb-2 text-center text-white/35 font-medium tracking-wide px-1"
                  style={{ minWidth: "52px" }}
                >
                  {theme}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {instrumentTypes.map((instrument, rowIdx) => (
              <tr key={instrument}>
                <td
                  className={[
                    "py-1.5 pr-3 text-white/45 font-medium whitespace-nowrap border-t",
                    rowIdx === 0 ? "border-white/10" : "border-white/6",
                  ].join(" ")}
                >
                  {instrument}
                </td>
                {impactThemes.map((theme) => {
                  const count = matrixDots[instrument]?.[theme] ?? 0;
                  return (
                    <td
                      key={theme}
                      className={[
                        "py-1.5 text-center border-t",
                        rowIdx === 0 ? "border-white/10" : "border-white/6",
                      ].join(" ")}
                    >
                      {count > 0 ? (
                        <span className="inline-flex items-center justify-center gap-0.5">
                          {Array.from({ length: count }).map((_, i) => (
                            <span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block"
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-white/8 inline-block" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[9px] text-white/20 text-center mt-3 leading-relaxed">
        {brand.johnWestCounter.caveat}
      </p>
    </motion.div>
  );
}

export function JohnWestCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { start, end, startLabel, endLabel } = brand.johnWestCounter;

  return (
    <div ref={ref} className="flex flex-col items-center gap-8 w-full max-w-sm">
      {/* Stage 1 + 2: counter */}
      <div className="flex items-center gap-6 md:gap-10 w-full justify-center">
        <div className="flex flex-col items-center">
          <div className="text-6xl md:text-8xl font-display font-light text-white/30 tabular-nums leading-none">
            <AnimatedNumber from={start} to={start} isRunning={inView} />
          </div>
          <div className="mt-1.5 text-[10px] text-white/30 uppercase tracking-widest font-medium">
            {startLabel}
          </div>
        </div>

        {/* Filter divider */}
        <div className="flex flex-col items-center gap-1 opacity-25">
          <div className="w-px h-8 bg-white/30" />
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-white/50">
            <path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="w-px h-8 bg-white/30" />
        </div>

        <div className="flex flex-col items-center">
          <div className="text-6xl md:text-8xl font-display font-light text-brand-green tabular-nums leading-none">
            <AnimatedNumber from={start} to={end} duration={2.2} isRunning={inView} />
          </div>
          <div className="mt-1.5 text-[10px] text-white/40 uppercase tracking-widest font-medium">
            {endLabel}
          </div>
        </div>
      </div>

      {/* Stage 3: comparison matrix */}
      <ComparisonMatrix visible={inView} />
    </div>
  );
}
