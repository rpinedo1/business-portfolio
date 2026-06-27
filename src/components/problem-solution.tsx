"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingUp } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

const problems = [
  {
    title: "It loads slow",
    detail: "Page builders and bloated themes kill load time. Visitors leave in 3 seconds. You lose leads before they even read your offer.",
  },
  {
    title: "The layout is confusing",
    detail: "Too much text. Too many options. No clear path. Visitors don't know what to do — so they do nothing.",
  },
  {
    title: "There's no clear CTA",
    detail: "\"Contact Us\" buried in the footer doesn't convert. Visitors need one obvious action: call, book, or message.",
  },
  {
    title: "There's no follow-up",
    detail: "Someone visits, doesn't call, and you never hear from them again. Without follow-up automation, you're leaving leads on the table every week.",
  },
];

export default function ProblemSolution() {
  return (
    <SectionShell id="why">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Problem */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-muted px-3 py-1.5 text-xs font-semibold text-foreground/70">
            <AlertCircle size={12} />
            Why most SMB websites don&apos;t generate leads
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your website is a brochure.{" "}
            <span className="text-muted-foreground">Not a lead machine.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Most small business websites were built to look good — not to convert. They&apos;re slow,
            unclear, and have no follow-up system. Here&apos;s what&apos;s costing you calls every week:
          </p>

          <div className="mt-8 space-y-4">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-3 rounded-xl border border-black/8 bg-card p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-black text-muted-foreground">
                  ✕
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Solution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mineral/25 bg-mineral-muted px-3 py-1.5 text-xs font-semibold text-plum-depth">
            <TrendingUp size={12} />
            The fix
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            This isn&apos;t a website.{" "}
            <span className="text-mineral">
              It&apos;s a lead funnel.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            One page. One goal. One clear action for your visitors to take. Built to load fast,
            communicate your offer clearly, and get people to call — or book — right now.
          </p>

          <div className="mt-8 rounded-2xl border border-mineral/20 bg-gradient-to-br from-mineral-muted to-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-plum-depth">
              What we optimize for
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "One clear headline that states your offer and who it's for",
                "Single primary CTA — call, book, or message",
                "Social proof above the fold (reviews, credentials)",
                "Mobile-first layout that loads under 2 seconds",
                "Your real phone number and address, prominently placed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mineral text-[10px] font-black text-mineral-foreground">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-black/8 bg-card p-4">
            <p className="text-sm font-semibold text-foreground">
              &ldquo;I had a site for 3 years. First week with this page I got 4 calls.&rdquo;
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">— Demo scenario (simulated for illustration)</p>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
