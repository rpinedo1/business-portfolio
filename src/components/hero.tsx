"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Zap, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Shipped" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 3, suffix: "×", label: "Avg. ROI Increase" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
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

  return <span ref={ref}>{count}{suffix}</span>;
}

/* Floating UI visual — fake dashboard + metric cards */
function HeroVisual() {
  const bars = [55, 72, 48, 88, 65, 94, 78];

  return (
    <div className="relative w-full h-[420px] lg:h-[480px]">
      {/* Background glow behind the whole visual */}
      <div className="absolute inset-0 -m-8 rounded-full bg-amber/[0.08] blur-3xl orb-b" />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-0 top-4 w-[88%] rounded-2xl border border-black/8 bg-white shadow-2xl shadow-black/10"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-black/6 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <div className="ml-2 flex-1 rounded-md bg-black/[0.04] px-3 py-1">
            <span className="font-mono text-[10px] text-muted-foreground">dashboard.app</span>
          </div>
        </div>
        {/* Dashboard body */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Monthly Revenue</p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">$284,900</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600">
              <TrendingUp size={11} />
              +32.4%
            </span>
          </div>
          {/* Bar chart */}
          <div className="mt-5 flex items-end gap-2 h-20">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                className="flex-1 rounded-t-md origin-bottom"
                style={{
                  height: `${h}%`,
                  background: i === 5
                    ? "linear-gradient(180deg, #e07b30, #f5a560)"
                    : "linear-gradient(180deg, #e8ecf5, #dfe4f0)",
                }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Active Users", val: "10.2K" },
              { label: "Conversion", val: "3.8%" },
              { label: "Avg. Session", val: "4m 22s" },
            ].map((m) => (
              <div key={m.label} className="rounded-lg bg-black/[0.025] p-2.5">
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
                <p className="mt-0.5 text-sm font-bold text-foreground">{m.val}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating card 1 — Performance */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-0 top-8 w-44 rounded-xl border border-black/8 bg-white p-3.5 shadow-xl shadow-black/10"
        style={{ rotate: "2deg" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/10">
            <Zap size={14} className="text-amber" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Perf Score</p>
            <p className="text-sm font-bold text-green-600">98 / 100</p>
          </div>
        </div>
        <div className="mt-2.5 h-1.5 w-full rounded-full bg-black/[0.05]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "98%" }}
            transition={{ duration: 1, delay: 1 }}
            className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-500"
          />
        </div>
      </motion.div>

      {/* Floating card 2 — Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-20 right-2 w-48 rounded-xl border border-black/8 bg-white p-3.5 shadow-xl shadow-black/10"
        style={{ rotate: "-2deg" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
              <Users size={14} className="text-blue-500" />
            </div>
            <p className="text-[11px] font-medium text-foreground">New Users</p>
          </div>
          <span className="text-[10px] font-semibold text-blue-500">+1,248</span>
        </div>
        <div className="mt-3 flex gap-0.5">
          {[4, 7, 5, 9, 6, 11, 8, 13, 10, 14].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 1.1 + i * 0.04 }}
              className="flex-1 rounded-sm bg-blue-400/40 origin-bottom"
              style={{ height: `${h * 3}px` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating card 3 — AI tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-amber/25 bg-amber/[0.08] px-3.5 py-2 shadow-md"
        style={{ rotate: "1deg" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
        </span>
        <span className="text-xs font-semibold text-amber">AI-Powered</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden noise-bg">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-a absolute -top-24 left-[15%] h-[500px] w-[500px] rounded-full bg-amber/[0.12] blur-[120px]" />
        <div className="orb-b absolute right-[10%] top-[20%] h-80 w-80 rounded-full bg-blue-400/[0.12] blur-[90px]" />
        <div className="orb-c absolute bottom-0 left-[40%] h-72 w-72 rounded-full bg-sky-300/[0.10] blur-[80px]" />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8 lg:pt-36 lg:pb-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* Left: text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-7 flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber-muted px-4 py-1.5 text-xs font-semibold text-amber">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                2 project slots open for Q1
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
            >
              Digital Products That{" "}
              <span className="bg-gradient-to-r from-amber via-orange-500 to-amber bg-clip-text text-transparent">
                Convert and Scale
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-none"
            >
              We design and build modern{" "}
              <strong className="font-semibold text-foreground">web apps</strong>,{" "}
              <strong className="font-semibold text-foreground">websites</strong>, and{" "}
              <strong className="font-semibold text-foreground">AI products</strong>{" "}
              with clear UX, solid engineering, and measurable business outcomes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-amber/30"
              >
                Book a Free Call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-7 py-3.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-white hover:shadow-md"
              >
                See Our Work
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5 }}
              className="mt-12 flex justify-center gap-0 divide-x divide-black/10 lg:justify-start"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="px-5 text-center first:pl-0 last:pr-0 lg:text-left">
                  <div className="text-2xl font-bold tracking-tight text-amber sm:text-3xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex-1 lg:max-w-[520px]"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
