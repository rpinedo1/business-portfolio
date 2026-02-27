"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const faq = [
  {
    question: "Is it really free?",
    answer:
      "$0 setup means we build your landing page at no upfront cost. You pay for hosting and maintenance only after the page goes live — starting around $49/month.",
  },
  {
    question: "What's included in the free page?",
    answer:
      "Hero section, About/What You Do, contact CTA, mobile responsive design, and full hosting. It's a complete, live landing page — not a template.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most pages go live within 3–5 business days after your onboarding call. We build fast so you can start getting leads quickly.",
  },
  {
    question: "What are the AI add-ons?",
    answer:
      "We offer 24/7 AI chatbot, automated lead follow-up, and instant response flows. These are optional paid upgrades you can add any time after launch.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No long-term contracts. If you cancel, you keep your page files and domain — we never lock you in.",
  },
];

const trustSignals = [
  "$0 to get started",
  "Live in 3–5 days",
  "No long-term contracts",
  "You own your page",
];

export default function CTA() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Step 1 fields
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");

  const handleStep1Continue = () => {
    setStatus("idle");
    setStatusMessage("");
    if (businessName.trim().length < 1) {
      setStatus("error");
      setStatusMessage("Please enter your business name.");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }
    if (industry.trim().length < 1) {
      setStatus("error");
      setStatusMessage("Please enter your industry.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email,
      businessName,
      industry,
      description: String(formData.get("description") ?? "").trim(),
      visitorGoal: String(formData.get("visitorGoal") ?? ""),
      contactInfo: String(formData.get("contactInfo") ?? "").trim(),
      hasBranding: String(formData.get("hasBranding") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    if (payload.name.length < 2) {
      setStatus("error");
      setStatusMessage("Please enter your name.");
      return;
    }
    if (payload.description.length < 10) {
      setStatus("error");
      setStatusMessage("Please describe what your business does (at least 10 characters).");
      return;
    }
    if (!payload.visitorGoal) {
      setStatus("error");
      setStatusMessage("Please select what you want visitors to do.");
      return;
    }
    if (payload.contactInfo.length < 5) {
      setStatus("error");
      setStatusMessage("Please enter a phone number or address.");
      return;
    }
    if (!payload.hasBranding) {
      setStatus("error");
      setStatusMessage("Please let us know if you have a logo or brand colors.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(data?.error ?? "Could not send your request. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
      if (calendlyUrl) {
        window.location.href = calendlyUrl;
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell id="contact">
      <motion.div
        data-scroll-anchor
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-amber/20 bg-gradient-to-br from-amber/[0.09] via-white to-blue-50/60 p-8 sm:p-12 lg:p-16"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-amber/[0.18] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />

        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading + trust signals */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Get Your Landing Page —{" "}
              <span className="bg-gradient-to-r from-amber via-orange-500 to-amber bg-clip-text text-transparent">
                $0 Setup
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Fill out the 2-minute form, book a quick call, and we start building.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustSignals.map((signal) => (
                <span
                  key={signal}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber/25 bg-amber/[0.08] px-3 py-1.5 text-xs font-semibold text-amber"
                >
                  <CheckCircle2 size={11} />
                  {signal}
                </span>
              ))}
            </div>
          </div>

          {/* Right: 2-step form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-[0_4px_24px_rgba(16,24,40,0.08)] backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Step {step} of 2
              </p>

              {step === 1 ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="businessName"
                      className="mb-2 block text-xs font-semibold text-foreground/70"
                    >
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Joe's Plumbing"
                      autoComplete="organization"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cta-email"
                      className="mb-2 block text-xs font-semibold text-foreground/70"
                    >
                      Email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourbusiness.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="industry"
                      className="mb-2 block text-xs font-semibold text-foreground/70"
                    >
                      Industry
                    </label>
                    <input
                      id="industry"
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g. restaurant, salon, plumbing"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    />
                  </div>

                  {status === "error" ? (
                    <p className="text-xs text-rose-700">{statusMessage}</p>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleStep1Continue}
                    className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-amber/30"
                  >
                    Continue
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Takes 2 minutes. No credit card required.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold text-foreground/70"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Smith"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-xs font-semibold text-foreground/70"
                    >
                      What does your business do?
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      placeholder="Briefly describe your business and who you help."
                      minLength={10}
                      required
                      className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="visitorGoal"
                      className="mb-2 block text-xs font-semibold text-foreground/70"
                    >
                      What do you want visitors to do?
                    </label>
                    <select
                      id="visitorGoal"
                      name="visitorGoal"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-muted-foreground outline-none transition focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    >
                      <option value="" disabled>
                        Select an action...
                      </option>
                      <option value="call">Call you</option>
                      <option value="book">Book an appointment</option>
                      <option value="buy">Buy a product</option>
                      <option value="email">Send an email</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="contactInfo"
                      className="mb-2 block text-xs font-semibold text-foreground/70"
                    >
                      Phone number or address for the page
                    </label>
                    <input
                      id="contactInfo"
                      name="contactInfo"
                      type="text"
                      placeholder="(555) 123-4567 or 123 Main St, Austin TX"
                      required
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    />
                  </div>
                  <div>
                    <p className="mb-2 block text-xs font-semibold text-foreground/70">
                      Do you have a logo or brand colors?
                    </p>
                    <div className="flex gap-4">
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                        <input
                          type="radio"
                          name="hasBranding"
                          value="yes"
                          required
                          className="accent-amber"
                        />
                        Yes
                      </label>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                        <input
                          type="radio"
                          name="hasBranding"
                          value="no"
                          required
                          className="accent-amber"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === "error" ? (
                    <p className="text-xs text-rose-700">{statusMessage}</p>
                  ) : null}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex w-1/3 items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/[0.02]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-2/3 items-center justify-center gap-2 rounded-xl bg-amber px-8 py-3 text-sm font-semibold text-white shadow-md shadow-amber/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-amber/30 disabled:cursor-not-allowed disabled:opacity-75"
                    >
                      {isSubmitting ? "Sending..." : "Book My Free Call"}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    Takes 2 minutes. No credit card required.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="relative z-10 mt-12">
          <h3 className="text-center text-lg font-semibold text-foreground">
            Frequently Asked Questions
          </h3>
          <div className="mt-6 space-y-2">
            {faq.map((item) => {
              const isOpen = openFaq === item.question;
              return (
                <div
                  key={item.question}
                  className="rounded-xl border border-black/8 bg-white/90 px-5 py-3.5 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : item.question)}
                    className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-foreground"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={15}
                      className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
