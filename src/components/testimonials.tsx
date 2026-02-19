"use client";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const testimonials = [
  {
    before: "Fragmented reporting and low product adoption across teams.",
    after: "Unified reporting plus guided onboarding for each user segment.",
    name: "Sarah Chen",
    title: "CEO, FinTrack",
    companyMeta: "B2B fintech | 45-person team",
    avatar: "SC",
    result: "3x engagement in 90 days",
    avatarBg: "bg-blue-50",
    avatarText: "text-blue-600",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
  },
  {
    before: "Support backlog with 4-hour first response and inconsistent quality.",
    after: "AI-first support workflow with escalation routing for complex tickets.",
    name: "Marcus Johnson",
    title: "CTO, Luminary",
    companyMeta: "SaaS | 22k MAU",
    avatar: "MJ",
    result: "80% tickets automated",
    avatarBg: "bg-violet-50",
    avatarText: "text-violet-600",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-600",
  },
  {
    before: "Paid traffic was rising while landing page conversion stayed flat.",
    after: "Message hierarchy and checkout UX aligned to purchase intent.",
    name: "Emily Rodriguez",
    title: "Founder, Greenleaf",
    companyMeta: "Ecommerce | DTC growth stage",
    avatar: "ER",
    result: "On-time delivery + 3.2x conversion lift",
    avatarBg: "bg-green-50",
    avatarText: "text-green-700",
    badgeBg: "bg-green-50",
    badgeText: "text-green-700",
  },
  {
    before: "Patient scheduling and messaging sat across disconnected systems.",
    after: "Single secure portal with scheduling, messaging, and records access.",
    name: "David Park",
    title: "VP Product, MedSync",
    companyMeta: "Healthtech | Multi-provider network",
    avatar: "DP",
    result: "8-week delivery",
    avatarBg: "bg-amber-muted",
    avatarText: "text-amber",
    badgeBg: "bg-amber-muted",
    badgeText: "text-amber",
  },
];

export default function Testimonials() {
  const isMobile = useIsMobile();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialsPaused, setTestimonialsPaused] = useState(false);

  useEffect(() => {
    if (!isMobile || testimonialsPaused) return;
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isMobile, testimonialsPaused]);

  return (
    <SectionShell id="testimonials" className="relative overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.07] blur-[130px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          eyebrow="Client Results"
          title="Trusted by teams that need dependable delivery"
          align="center"
        />

        {isMobile ? (
          <div className="relative mt-12 min-h-[320px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[testimonialIndex].name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="group relative rounded-2xl border border-black/8 bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,0.07)]"
              >
                {/* Large decorative quote mark */}
                <div
                  className="absolute right-6 top-5 select-none font-serif text-7xl font-bold leading-none text-black/[0.04]"
                  aria-hidden
                >
                  &ldquo;
                </div>

                {/* Result badge */}
                <span className={`inline-flex items-center rounded-full ${testimonials[testimonialIndex].badgeBg} ${testimonials[testimonialIndex].badgeText} px-3 py-1 text-[10px] font-semibold uppercase tracking-wide`}>
                  Verified client result: {testimonials[testimonialIndex].result}
                </span>

                <div className="relative z-10 mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                  <p>
                    <span className="font-semibold text-foreground">Before:</span> {testimonials[testimonialIndex].before}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">After:</span> {testimonials[testimonialIndex].after}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-black/6 pt-5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${testimonials[testimonialIndex].avatarBg} ${testimonials[testimonialIndex].avatarText} text-xs font-bold`}>
                    {testimonials[testimonialIndex].avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-foreground">{testimonials[testimonialIndex].name}</div>
                    <div className="text-xs text-muted-foreground">{testimonials[testimonialIndex].title}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground/80">{testimonials[testimonialIndex].companyMeta}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={11} className="fill-amber text-amber" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-3 flex justify-center gap-1.5">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setTestimonialIndex(index);
                    setTestimonialsPaused(true);
                  }}
                  aria-label={`View testimonial from ${item.name}`}
                  aria-pressed={index === testimonialIndex}
                  className={`h-1.5 rounded-full transition-all ${
                    index === testimonialIndex ? "w-5 bg-amber" : "w-1.5 bg-black/15 hover:bg-black/30"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-black/8 bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/8"
              >
              {/* Large decorative quote mark */}
              <div
                className="absolute right-6 top-5 font-serif text-7xl font-bold leading-none text-black/[0.04] select-none"
                aria-hidden
              >
                &ldquo;
              </div>

              {/* Result badge */}
              <span className={`inline-flex items-center rounded-full ${t.badgeBg} ${t.badgeText} px-3 py-1 text-[10px] font-semibold uppercase tracking-wide`}>
                Verified client result: {t.result}
              </span>

              <div className="relative z-10 mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                <p>
                  <span className="font-semibold text-foreground">Before:</span> {t.before}
                </p>
                <p>
                  <span className="font-semibold text-foreground">After:</span> {t.after}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-black/6 pt-5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${t.avatarBg} ${t.avatarText} text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.title}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground/80">{t.companyMeta}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={11} className="fill-amber text-amber" />
                  ))}
                </div>
              </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
