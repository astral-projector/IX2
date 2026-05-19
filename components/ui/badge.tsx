import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "certified" | "live" | "coming-soon" | "sector" | "subtle";
}

export function Badge({ className, variant = "subtle", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "certified" && "bg-brand-green/15 text-brand-green border border-brand-green/30",
        variant === "live" && "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30",
        variant === "coming-soon" && "bg-amber-500/15 text-amber-600 border border-amber-500/30",
        variant === "sector" && "bg-navy-100 text-navy-600 border border-navy-200",
        variant === "subtle" && "bg-navy-100 text-navy-600",
        className
      )}
      {...props}
    />
  );
}
