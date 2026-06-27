"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

/** Shimmering skeleton that resolves into content. Tap to replay the load. */
export default function SkeletonLoader() {
  const { reducedMotion } = useCapabilities();
  const [loading, setLoading] = useState(true);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, [cycle]);

  return (
    <div className="w-full max-w-xs">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <Bar className="h-10 w-10 rounded-full" shimmer={!reducedMotion} />
                <div className="flex-1 space-y-2">
                  <Bar className="h-3 w-2/3 rounded" shimmer={!reducedMotion} />
                  <Bar className="h-3 w-1/3 rounded" shimmer={!reducedMotion} />
                </div>
              </div>
              <Bar className="h-3 w-full rounded" shimmer={!reducedMotion} />
              <Bar className="h-3 w-4/5 rounded" shimmer={!reducedMotion} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0c5450] font-display text-white">
                  N
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">NexGen Studio</p>
                  <p className="text-xs text-[#8fd6cf]">Content loaded</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/55">
                Skeletons keep a page feeling fast while real data arrives.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => setCycle((c) => c + 1)}
        className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/50 transition hover:text-white/80"
      >
        <RefreshCw size={12} /> Replay load
      </button>
    </div>
  );
}

function Bar({ className, shimmer }: { className: string; shimmer: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-white/10 ${className}`}>
      {shimmer ? (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </div>
  );
}
