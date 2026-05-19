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

export function JohnWestCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { start, end, startLabel, endLabel, caveat } = brand.johnWestCounter;

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-8 md:gap-14">
        {/* Left: total reviewed */}
        <div className="flex flex-col items-center">
          <div className="text-7xl md:text-9xl font-display font-light text-red-400 tabular-nums leading-none">
            <AnimatedNumber from={start} to={start} isRunning={inView} />
          </div>
          <div className="mt-2 text-xs text-white/40 uppercase tracking-widest font-medium">
            {startLabel}
          </div>
        </div>

        {/* Filter icon divider */}
        <div className="flex flex-col items-center gap-1.5 opacity-30">
          <div className="w-px h-10 bg-white/30" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/50">
            <path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="w-px h-10 bg-white/30" />
        </div>

        {/* Right: impact certified */}
        <div className="flex flex-col items-center">
          <div className="text-7xl md:text-9xl font-display font-light text-brand-green tabular-nums leading-none">
            <AnimatedNumber from={start} to={end} duration={2.2} isRunning={inView} />
          </div>
          <div className="mt-2 text-xs text-white/40 uppercase tracking-widest font-medium">
            {endLabel}
          </div>
        </div>
      </div>

      {/* Filter bars */}
      <div className="w-full max-w-sm flex flex-col gap-1.5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              inView
                ? {
                    opacity: i < 2 ? 0.9 : 0.15,
                    scaleX: 1,
                    backgroundColor: i < 2 ? "#00e890" : "#374d76",
                  }
                : { opacity: 0, scaleX: 0, backgroundColor: "#374d76" }
            }
            transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
            style={{ transformOrigin: "left" }}
          />
        ))}
        <div className="flex justify-between mt-1">
          <span className="text-xs text-white/35">Declined</span>
          <span className="text-xs text-brand-green font-medium">Impact certified</span>
        </div>
      </div>

      <p className="text-xs text-white/30 text-center max-w-xs leading-relaxed">
        {caveat}
      </p>
    </div>
  );
}
