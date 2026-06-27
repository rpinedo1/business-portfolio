"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const faqs = [
  {
    question: "How much does a website cost?",
    answer:
      "Every project is quoted after we understand the scope. Pages, copy, integrations, timeline, and custom functionality all affect the price. You get a clear quote before work starts.",
  },
  {
    question: "Do I have to pay monthly?",
    answer:
      "No mandatory monthly plan. Hosting and care are optional. If you want us to handle updates, small edits, uptime checks, and reporting, we can quote a monthly care plan separately.",
  },
  {
    question: "What is the payment structure?",
    answer:
      "Most projects use 50% to reserve the build and 50% before launch. Smaller projects may be paid in one invoice. Larger work can be split into milestones.",
  },
  {
    question: "Do you do SEO?",
    answer:
      "Your page will be fast, structured with semantic HTML, and have correct meta tags — which are the technical foundations for SEO. We don't offer ongoing SEO writing, keyword research, or link building as part of the base plan. Those can be scoped as a separate engagement.",
  },
  {
    question: "Can you connect my CRM, booking system, or payments?",
    answer:
      "Yes — as optional add-ons. We can connect popular tools like HubSpot, Calendly, Square, Stripe, and others. The cost depends on the integration complexity and is quoted during your onboarding call. Online booking and CRM sync are the most commonly requested.",
  },
  {
    question: "Do you work with medical or HIPAA-regulated businesses?",
    answer:
      "We build pages for local service businesses including MedSpas and wellness providers. We avoid making medical claims and follow standard web advertising best practices. HIPAA compliance for form submissions, data storage, or intake forms is your responsibility. We can discuss your specific situation on your onboarding call.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the intake form on this page. Once submitted, you'll be redirected to book a short call. After that, you'll receive a scope, price, and timeline before the build starts.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.question ?? null);

  return (
    <SectionShell id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Common questions, straight answers"
        description="No vague non-answers. If something isn't clear here, ask on your onboarding call."
        align="center"
      />

      <div className="mx-auto mt-10 max-w-2xl space-y-2">
        {faqs.map((faq) => {
          const isOpen = open === faq.question;
          return (
            <div
              key={faq.question}
              className="rounded-xl border border-black/8 bg-card px-5 py-4 shadow-[0_1px_3px_rgba(16,24,40,0.05)]"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : faq.question)}
                className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-foreground"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
