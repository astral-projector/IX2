"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
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
  const rounded = useTransform(count, (v) => Math.round(v));
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
      {/* Main counter display */}
      <div className="relative flex items-center gap-8 md:gap-16">
        {/* Left: total reviewed */}
        <div className="flex flex-col items-center">
          <div className="text-7xl md:text-9xl font-display font-light text-red-500 tabular-nums leading-none">
            <AnimatedNumber
              from={start}
              to={start}
              isRunning={inView}
            />
          </div>
          <div className="mt-2 text-sm text-navy-400 uppercase tracking-widest font-medium">
            {startLabel}
          </div>
        </div>

        {/* Divider / filter metaphor */}
        <div className="flex flex-col items-center gap-1.5 opacity-40">
          <div className="w-px h-10 bg-navy-300" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-navy-400">
            <path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="w-px h-10 bg-navy-300" />
        </div>

        {/* Right: impact certified */}
        <div className="flex flex-col items-center">
          <div className="text-7xl md:text-9xl font-display font-light tabular-nums leading-none text-brand-green">
            <AnimatedNumber
              from={start}
              to={end}
              duration={2.2}
              isRunning={inView}
            />
          </div>
          <div className="mt-2 text-sm text-navy-400 uppercase tracking-widest font-medium">
            {endLabel}
          </div>
        </div>
      </div>

      {/* Filter animation bars */}
      <div className="w-full max-w-sm flex flex-col gap-1.5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              inView
                ? {
                    opacity: i < 2 ? 0.8 : 0.2,
                    scaleX: 1,
                    backgroundColor: i < 2 ? "#2d7a4f" : "#e5e7eb",
                  }
                : { opacity: 0, scaleX: 0, backgroundColor: "#e5e7eb" }
            }
            transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
            style={{ transformOrigin: "left" }}
          />
        ))}
        <div className="flex justify-between mt-1">
          <span className="text-xs text-navy-400">Declined</span>
          <span className="text-xs text-brand-green font-medium">Impact certified</span>
        </div>
      </div>

      {/* Caveat */}
      <p className="text-xs text-navy-400 text-center max-w-xs leading-relaxed">
        {caveat}
      </p>
    </div>
  );
}
