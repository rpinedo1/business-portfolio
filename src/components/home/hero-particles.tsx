"use client";

import dynamic from "next/dynamic";
import { useCapabilities } from "@/hooks/use-capabilities";

const HeroParticlesScene = dynamic(() => import("./hero-particles-scene"), {
  ssr: false,
});

/** Static cream poster shown on reduced-motion / no-WebGL. */
function ParticlesPoster() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(rgba(45,58,68,0.34) 1.1px, transparent 1.3px)",
        backgroundSize: "26px 26px",
        maskImage:
          "radial-gradient(circle at 50% 45%, black, transparent 62%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 45%, black, transparent 62%)",
      }}
    />
  );
}

export default function HeroParticles() {
  const { ready, allowWebGL, webglTier } = useCapabilities();

  return (
    <div className="absolute inset-0">
      {ready && allowWebGL ? (
        <HeroParticlesScene lite={webglTier === "lite"} />
      ) : (
        <ParticlesPoster />
      )}
    </div>
  );
}
