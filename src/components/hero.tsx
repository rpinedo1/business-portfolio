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
    <section className="relative flex min-h-[88vh] items-center overflow-hidden noise-bg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-amber/20 blur-3xl" />
        <div className="absolute bottom-8 right-10 h-48 w-48 rounded-full bg-sky-200/50 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-16 pt-28 text-center lg:px-8 lg:pb-24 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber-muted px-4 py-1.5 text-xs font-medium text-amber">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            2 project slots open for Q1
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Digital Products That{" "}
          <span className="bg-gradient-to-r from-amber to-orange-500 bg-clip-text text-transparent">
            Convert and Scale
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          We design and build modern web apps, websites, and AI products with
          clear UX, solid engineering, and measurable business outcomes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-amber px-7 py-3.5 text-sm font-semibold text-amber-foreground shadow-sm shadow-amber/25 transition hover:brightness-105"
          >
            Book a Free Call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-7 py-3.5 text-sm font-medium text-foreground transition hover:bg-black/[0.02]"
          >
            <Play size={14} className="text-amber" />
            See Our Work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/8 bg-white/80 p-4 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
            >
              <div className="text-2xl font-semibold text-foreground sm:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
