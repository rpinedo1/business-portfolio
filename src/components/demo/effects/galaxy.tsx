"use client";

import dynamic from "next/dynamic";
import { useCapabilities } from "@/hooks/use-capabilities";

const Scene = dynamic(() => import("../galaxy-scene"), { ssr: false });

/** A compact, always-lite rotating particle galaxy. */
export default function Galaxy() {
  const { ready, allowWebGL } = useCapabilities();

  return (
    <div className="relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl bg-[#080b10]">
      {ready && allowWebGL ? (
        <Scene lite />
      ) : (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(227,196,137,0.5) 1px, transparent 1.2px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black, transparent 60%)",
          }}
        />
      )}
      <span className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-white/45">
        Spiral particle galaxy
      </span>
    </div>
  );
}
