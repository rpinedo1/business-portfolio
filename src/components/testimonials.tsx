"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "They didn't just build us a product — they understood our business and built exactly what our users needed. Our engagement metrics tripled.",
    name: "Sarah Chen",
    title: "CEO, FinTrack",
    avatar: "SC",
  },
  {
    quote:
      "The AI chatbot they built handles 80% of our support tickets now. The ROI was obvious within the first month. Absolute game-changer.",
    name: "Marcus Johnson",
    title: "CTO, Luminary",
    avatar: "MJ",
  },
  {
    quote:
      "Fast, communicative, and the code quality is top-notch. They're the first agency I've worked with that actually delivers on time.",
    name: "Emily Rodriguez",
    title: "Founder, Greenleaf",
    avatar: "ER",
  },
  {
    quote:
      "We went from concept to launch in 8 weeks. The team was incredibly responsive and the final product exceeded our expectations.",
    name: "David Park",
    title: "VP Product, MedSync",
    avatar: "DP",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-amber/5 blur-[150px]" />
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
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Trusted by Founders &{" "}
            <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
              Product Leaders
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/5 bg-card p-8 transition-all hover:border-amber/20"
            >
              <Quote
                size={24}
                className="mb-4 text-amber/30"
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
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
