"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 text-sm text-white/45 hover:text-white/80 transition-colors group"
    >
      <ChevronLeft
        size={16}
        className="group-hover:-translate-x-0.5 transition-transform"
      />
      Back to opportunities
    </button>
  );
}
