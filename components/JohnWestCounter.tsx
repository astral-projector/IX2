"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { brand } from "@/lib/brand";

type Phase = "idle" | "counting" | "collapsed";

function AnimatedNumber({ from, to, duration, isRunning }: {
  from: number;
  to: number;
  duration: number;
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
  const triggered = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");

  const { start, end, caveat } = brand.johnWestCounter;

  useEffect(() => {
    if (!inView || triggered.current) return;
    triggered.current = true;
    setPhase("counting");
    // counting runs for ~2.4s, then 0.6s pause before collapsing
    const t1 = setTimeout(() => setPhase("collapsed"), 3200);
    return () => clearTimeout(t1);
  }, [inView]);

  const counting  = phase !== "idle";
  const collapsed = phase === "collapsed";

  return (
    <div ref={ref} className="flex flex-col items-center gap-10 w-full max-w-md">

      {/* ── Main counter row ── */}
      <div className="flex items-center justify-center gap-8 w-full">

        {/* 27 reviewed — fades out after counting */}
        <motion.div
          animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -12 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-center shrink-0"
        >
          <div className="text-8xl md:text-9xl font-display font-light text-white/18 tabular-nums leading-none">
            {start}
          </div>
          <div className="mt-3 text-[10px] text-white/22 uppercase tracking-widest font-medium text-center leading-loose">
            deals<br />reviewed
          </div>
        </motion.div>

        {/* Divider with filter icon — fades with the 27 */}
        <motion.div
          animate={{ opacity: collapsed ? 0 : 0.2 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="flex flex-col items-center gap-1.5 shrink-0 pb-10"
        >
          <div className="w-px h-8 bg-white/40" />
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white/60">
            <path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="w-px h-8 bg-white/40" />
        </motion.div>

        {/* 6 certified — scales up and brightens once 27 is gone */}
        <motion.div
          animate={{
            scale: collapsed ? 1.22 : 1,
            x: collapsed ? -20 : 0,
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="flex flex-col items-center shrink-0"
        >
          <div className="text-8xl md:text-9xl font-display font-light text-brand-green tabular-nums leading-none">
            <AnimatedNumber from={start} to={end} duration={2.4} isRunning={counting} />
          </div>
          <motion.div
            animate={{ opacity: collapsed ? 1 : 0.45 }}
            transition={{ duration: 0.5 }}
            className="mt-3 text-[10px] text-brand-green/70 uppercase tracking-widest font-medium text-center leading-loose"
          >
            impact<br />certified
          </motion.div>
        </motion.div>
      </div>

      {/* ── Caveat ── */}
      <motion.p
        animate={{ opacity: collapsed ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-[9px] text-white/18 text-center leading-relaxed max-w-xs"
      >
        {caveat}
      </motion.p>
    </div>
  );
}
