"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCapabilities } from "@/hooks/use-capabilities";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ#%&*<>/";
const WORDS = ["DESIGNED.", "BUILT.", "LAUNCHED.", "REMEMBERED."];

/**
 * Cycles words with a "decode" scramble. Pauses on reduced-motion (shows static
 * text). Tapping/hovering re-triggers a decode, so touch users get the effect too.
 */
export default function TextScramble() {
  const { reducedMotion } = useCapabilities();
  const [display, setDisplay] = useState(WORDS[0]);
  const wordIndex = useRef(0);
  const frame = useRef<number>(0);
  const raf = useRef<number | null>(null);

  const scrambleTo = useCallback((target: string) => {
    cancelAnimationFrame(raf.current ?? 0);
    const from = display;
    const len = Math.max(from.length, target.length);
    frame.current = 0;

    const tick = () => {
      const progress = frame.current;
      let out = "";
      for (let i = 0; i < len; i++) {
        const revealAt = i * 2.2;
        if (progress >= revealAt + 8) {
          out += target[i] ?? "";
        } else if (progress >= revealAt) {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          out += from[i] ?? "";
        }
      }
      setDisplay(out);
      frame.current += 1;
      if (progress < len * 2.2 + 10) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [display]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(WORDS[0]);
      return;
    }
    const interval = setInterval(() => {
      wordIndex.current = (wordIndex.current + 1) % WORDS.length;
      scrambleTo(WORDS[wordIndex.current]);
    }, 2200);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf.current ?? 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <button
      type="button"
      onClick={() => !reducedMotion && scrambleTo(WORDS[wordIndex.current])}
      className="flex flex-col items-center gap-2 text-center"
    >
      <span className="text-xs uppercase tracking-[0.2em] text-white/40">
        Your work,
      </span>
      <span className="font-mono text-2xl font-bold tracking-tight text-[#8fd6cf] sm:text-3xl">
        {display}
      </span>
    </button>
  );
}
