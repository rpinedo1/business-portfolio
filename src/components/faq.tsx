"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/section-shell";

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "It depends on scope — a focused landing page is very different from a multi-page site with booking. I quote a clear, fixed price after a short conversation, so there are no surprises and no published-but-meaningless price tags.",
  },
  {
    q: "How long does it take?",
    a: "Landing pages can launch in days. Larger sites get a realistic timeline up front, before any invoice is approved. You'll always know where the project stands.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. You own the code, the content, and the domain. No proprietary builder lock-in, and you can take it elsewhere any time.",
  },
  {
    q: "Will it actually work on phones?",
    a: "Every build is designed mobile-first and tested on real devices — most of your visitors are on a phone, so that's where it has to shine.",
  },
  {
    q: "Can you add booking, payments, or other features later?",
    a: "Absolutely. We start with the smallest site that does the job well and layer in booking, payments, dashboards, or automations when they actually support the business goal.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="anchor-section px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered"
          description="The things service-business owners ask most before getting started."
          align="center"
        />

        <div className="mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-black/8 bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-foreground">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-mineral"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
