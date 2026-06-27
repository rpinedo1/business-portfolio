"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type EffectTileProps = {
  title: string;
  caption: string;
  /** Short "good for…" use-case shown as a tag. */
  useCase: string;
  className?: string;
  /** The interactive demo content. */
  children: React.ReactNode;
  /** Hint shown on the stage, e.g. "Hover" / "Drag" / "Scroll". */
  hint?: string;
};

export default function EffectTile({
  title,
  caption,
  useCase,
  className,
  children,
  hint,
}: EffectTileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-sm",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_20px_50px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* Interactive stage */}
      <div className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden p-6">
        {hint ? (
          <span className="pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
            {hint}
          </span>
        ) : null}
        {children}
      </div>

      {/* Meta */}
      <div className="border-t border-white/8 bg-black/20 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg text-white">{title}</h3>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#d9b873]/25 bg-[#d9b873]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#e3c489]">
            <Plus size={11} />
            {useCase}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{caption}</p>
      </div>
    </motion.article>
  );
}
