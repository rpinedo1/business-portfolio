"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Shipped" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 3, suffix: "x", label: "Avg. ROI Increase" },
];

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden noise-bg grid-pattern">
      {/* Warm gradient orbs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[900px] opacity-25">
        <div className="absolute top-24 left-1/3 h-80 w-80 rounded-full bg-amber/20 blur-[140px]" />
        <div className="absolute top-48 right-1/4 h-60 w-60 rounded-full bg-orange-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-36 pb-24 lg:px-8 lg:pt-48 lg:pb-36">
        {/* Social proof badge — Cialdini: authority + scarcity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber-muted px-4 py-1.5 text-xs font-medium text-amber">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            2 project slots open for Q1
          </span>
        </motion.div>

        {/* Headline — Ogilvy: benefit-led, specific. StoryBrand: customer is the hero */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-center text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Your Next Web App, Website, or AI Product{" "}
          <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
            — Shipped Right
          </span>
        </motion.h1>

        {/* Subheadline — Sugarman: slippery slide into specifics. Hopkins: reason-why */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          We design, build, and launch digital products that look great,
          load fast, and actually convert visitors into customers.
        </motion.p>

        {/* CTAs — Fitts's Law: primary CTA large + prominent. Hick's: two clear choices */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-amber px-8 py-4 text-sm font-semibold text-amber-foreground shadow-lg shadow-amber/15 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-amber/20"
          >
            Book a Free Discovery Call
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-medium text-foreground transition-all hover:bg-white/[0.07]"
          >
            <Play size={14} className="text-amber" />
            See Our Work
          </a>
        </motion.div>

        {/* Stats — Hopkins: proof. Cialdini: social proof */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 grid w-full max-w-xl grid-cols-3 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-foreground sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 text-xs tracking-wide text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
