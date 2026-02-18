"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3x", label: "Avg. ROI Increase" },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const numericPart = target.replace(/[^0-9]/g, "");
  const prefix = target.replace(/[0-9]/g, "").replace(suffix, "");
  const [count, setCount] = useState(0);
  const end = parseInt(numericPart);

  useEffect(() => {
    let frame: number;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end]);

  return (
    <span>
      {prefix}
      {count}
      {suffix || target.replace(/[0-9]/g, "")}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden noise-bg grid-pattern">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] opacity-30">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-amber/20 blur-[120px]" />
        <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-20 lg:px-8 lg:pt-44 lg:pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber-muted px-4 py-1.5 text-xs font-medium text-amber">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            Now accepting new projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-center text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          We Build Digital Products{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
              That Convert
            </span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          High-performance web apps, stunning websites, and intelligent AI
          solutions — engineered to drive growth and transform your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-amber px-7 py-3.5 text-sm font-medium text-amber-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-amber/20"
          >
            Book a Free Discovery Call
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-white/10"
          >
            <Play size={14} className="text-amber" />
            See Our Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-8 border-t border-white/5 pt-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
