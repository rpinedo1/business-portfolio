"use client";

import { useEffect, useRef } from "react";

type Options = {
  speedPxPerSecond?: number;
  maxWidth?: number;
};

export function useMobileAutoCarousel<T extends HTMLElement>({
  speedPxPerSecond = 18,
  maxWidth = 1024,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let rafId: number | null = null;
    let lastTime = 0;
    let loopWidth = 0;

    const shouldAutoRotate = () =>
      window.innerWidth <= maxWidth ||
      window.matchMedia("(pointer: coarse)").matches;

    const removeClones = () => {
      const clones = container.querySelectorAll<HTMLElement>("[data-carousel-clone='true']");
      clones.forEach((node) => node.remove());
    };

    const disableInteractiveDescendants = (root: HTMLElement) => {
      const interactive = root.querySelectorAll<HTMLElement>(
        "a,button,input,select,textarea,[tabindex]"
      );
      interactive.forEach((el) => {
        el.setAttribute("tabindex", "-1");
        el.setAttribute("aria-hidden", "true");
      });
    };

    const ensureInfiniteTrack = () => {
      if (!shouldAutoRotate()) {
        removeClones();
        loopWidth = 0;
        container.scrollLeft = 0;
        return;
      }

      const hasClones = container.querySelector("[data-carousel-clone='true']");
      if (!hasClones) {
        const originals = Array.from(container.children) as HTMLElement[];
        originals.forEach((child) => {
          const clone = child.cloneNode(true) as HTMLElement;
          clone.dataset.carouselClone = "true";
          clone.setAttribute("aria-hidden", "true");
          disableInteractiveDescendants(clone);
          container.appendChild(clone);
        });
      }

      loopWidth = container.scrollWidth / 2;
    };

    const tick = (now: number) => {
      if (!lastTime) lastTime = now;
      const deltaSeconds = (now - lastTime) / 1000;
      lastTime = now;

      if (shouldAutoRotate() && loopWidth > 0) {
        const next = container.scrollLeft + speedPxPerSecond * deltaSeconds;
        container.scrollLeft = next >= loopWidth ? next - loopWidth : next;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onResize = () => ensureInfiniteTrack();

    ensureInfiniteTrack();
    window.addEventListener("resize", onResize, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      removeClones();
    };
  }, [speedPxPerSecond, maxWidth]);

  return ref;
}
