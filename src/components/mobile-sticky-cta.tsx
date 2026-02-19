"use client";

import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to-section";

export default function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/96 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-[0_-8px_24px_rgba(16,24,40,0.08)] backdrop-blur md:hidden">
      <button
        type="button"
        onClick={() => scrollToSection("#contact")}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-amber/25 transition hover:brightness-105"
      >
        Get Build Plan
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
        30 mins • no pitch deck
      </p>
    </div>
  );
}
