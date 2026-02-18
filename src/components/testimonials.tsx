"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

/* C7 Cialdini: social proof — specific results, real names, authority titles
   M5 Social proof engine: structured case-study style
   C2 Hopkins: proof and specifics in every testimonial */
const testimonials = [
  {
    quote:
      "They didn't just build a product — they understood our business model and built exactly what our users needed. Engagement tripled in 90 days.",
    name: "Sarah Chen",
    title: "CEO, FinTrack",
    avatar: "SC",
    result: "3x engagement",
  },
  {
    quote:
      "The AI chatbot handles 80% of our support tickets now. ROI was obvious within the first month. This is the best investment we've made this year.",
    name: "Marcus Johnson",
    title: "CTO, Luminary",
    avatar: "MJ",
    result: "80% tickets automated",
  },
  {
    quote:
      "Fast, communicative, and the code quality is genuinely top-notch. First agency I've worked with that actually delivers on time and on budget.",
    name: "Emily Rodriguez",
    title: "Founder, Greenleaf",
    avatar: "ER",
    result: "On time, on budget",
  },
  {
    quote:
      "Concept to launch in 8 weeks. The team was responsive, the process was transparent, and the final product exceeded what we scoped.",
    name: "David Park",
    title: "VP Product, MedSync",
    avatar: "DP",
    result: "8-week delivery",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-28 lg:py-36"
    >
      {/* Warm background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[550px] rounded-full bg-amber/[0.04] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-amber">
            Client Results
          </span>
          {/* C1 Ogilvy: specific, credibility-focused */}
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Don&apos;t Take Our Word for It.{" "}
            <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
              Take Theirs.
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-surface p-8 transition-all hover:border-amber/20"
            >
              <div className="flex items-center justify-between mb-5">
                <Quote size={22} className="text-amber/25" />
                {/* Result badge — specific proof at a glance */}
                <span className="rounded-full bg-amber-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber">
                  {t.result}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.04] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-muted text-xs font-bold text-amber">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.title}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="fill-amber text-amber"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
