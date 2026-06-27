"use client";

import dynamic from "next/dynamic";
import { useCapabilities } from "@/hooks/use-capabilities";

const Scene = dynamic(() => import("../webgl-hero-scene"), { ssr: false });

/** A compact, always-lite WebGL particle field showcasing the 3D capability. */
export default function ParticleField() {
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
              "radial-gradient(rgba(143,214,207,0.5) 1px, transparent 1.2px)",
            backgroundSize: "20px 20px",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black, transparent 65%)",
          }}
        />
      )}
      <span className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-white/45">
        Real-time 3D particles
      </span>
    </div>
  );
}
