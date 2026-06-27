"use client";

import { useEffect, useState } from "react";

/**
 * Central capability detection used to gate every interactive effect.
 *
 * - `reducedMotion`: user asked the OS to minimize animation. We honor it everywhere.
 * - `touch`: no fine pointer / hover. Cursor + magnetic effects fall back to tap/in-view.
 * - `webglTier`: how heavy a WebGL scene this device should run.
 *     - "full"   : desktop / capable device -> full particle count, high dpr.
 *     - "lite"   : phones & tablets -> reduced particle count, capped dpr. Still live WebGL.
 *     - "poster" : reduced-motion or no WebGL support -> static image, no canvas.
 *
 * Values resolve after mount (SSR-safe). Before resolution they default to the
 * conservative side (motion off, poster) so the server render and first paint never
 * ship a heavy experience that then has to be torn down.
 */
export type WebglTier = "full" | "lite" | "poster";

export type Capabilities = {
  ready: boolean;
  reducedMotion: boolean;
  touch: boolean;
  webglTier: WebglTier;
  /** Mount a canvas at all (full or lite). False only for reduced-motion / unsupported. */
  allowWebGL: boolean;
};

const initial: Capabilities = {
  ready: false,
  reducedMotion: true,
  touch: true,
  webglTier: "poster",
  allowWebGL: false,
};

/** One-time, cached check that the browser can actually create a WebGL context. */
let webglSupportCache: boolean | null = null;
function supportsWebGL(): boolean {
  if (webglSupportCache !== null) return webglSupportCache;
  try {
    const canvas = document.createElement("canvas");
    webglSupportCache = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    webglSupportCache = false;
  }
  return webglSupportCache;
}

export function useCapabilities(): Capabilities {
  const [caps, setCaps] = useState<Capabilities>(initial);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const compute = (): Capabilities => {
      const reducedMotion = motionQuery.matches;
      const touch = !hoverQuery.matches;
      const cores = navigator.hardwareConcurrency ?? 4;
      const narrow = window.innerWidth < 1024;
      const hasWebGL = supportsWebGL();

      let webglTier: WebglTier;
      if (reducedMotion || !hasWebGL) {
        webglTier = "poster";
      } else if (touch || narrow || cores <= 4) {
        webglTier = "lite";
      } else {
        webglTier = "full";
      }

      return {
        ready: true,
        reducedMotion,
        touch,
        webglTier,
        allowWebGL: webglTier !== "poster",
      };
    };

    setCaps(compute());

    const onChange = () => setCaps(compute());
    motionQuery.addEventListener("change", onChange);
    hoverQuery.addEventListener("change", onChange);
    window.addEventListener("resize", onChange, { passive: true });
    return () => {
      motionQuery.removeEventListener("change", onChange);
      hoverQuery.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return caps;
}
