"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

const benefits = [
  "Free 30-minute strategy call with practical recommendations",
  "Custom project roadmap you keep whether we work together or not",
  "Clear fixed-scope proposal with transparent pricing",
  "Fast response times and direct communication",
];

export default function CTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      project: String(formData.get("project") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

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
        setStatusMessage(
          data?.error ?? "Could not send your request. Please try again."
        );
        return;
      }

      setStatus("success");
      setStatusMessage("Request sent. We will reach out shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
    } finally {
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

        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber-muted px-4 py-1.5 text-xs font-semibold text-amber">
              <Calendar size={12} />
              2 spots left this quarter
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s build your next product with confidence
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Share your goals and constraints. You&apos;ll get a practical plan
              with clear scope, timeline, and next steps.
            </p>
            <ul className="mt-7 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-amber" />
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="mt-7 inline-flex items-center gap-2 rounded-lg border border-black/8 bg-white/80 px-4 py-2.5 text-xs text-muted-foreground shadow-sm">
              <ShieldCheck size={14} className="text-amber" />
              100% confidential. We never share project details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-[0_4px_24px_rgba(16,24,40,0.08)] backdrop-blur-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold text-foreground/70">
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
                <label htmlFor="email" className="mb-2 block text-xs font-semibold text-foreground/70">
                  Work Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="service" className="mb-2 block text-xs font-semibold text-foreground/70">
                What Do You Need?
              </label>
              <select
                id="service"
                name="service"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-muted-foreground outline-none transition focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                defaultValue=""
                required
              >
                <option value="">Pick a service...</option>
                <option value="webapp">Web Application</option>
                <option value="website">Website / Landing Page</option>
                <option value="ai">AI Product or Integration</option>
                <option value="other">Not Sure Yet</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="project" className="mb-2 block text-xs font-semibold text-foreground/70">
                Tell Us About Your Project
              </label>
              <textarea
                id="project"
                name="project"
                rows={4}
                placeholder="What problem are you solving? Who are your users? Any timeline or budget in mind?"
                minLength={10}
                required
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
              />
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-amber/30 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isSubmitting ? "Sending..." : "Book Your Free Discovery Call"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            {status === "success" ? (
              <p className="mt-3 text-center text-xs text-emerald-700">{statusMessage}</p>
            ) : null}
            {status === "error" ? (
              <p className="mt-3 text-center text-xs text-rose-700">{statusMessage}</p>
            ) : null}
            {status === "idle" ? (
              <p className="mt-3 text-center text-xs text-muted-foreground/60">
                We respond within 2 business hours.
              </p>
            ) : null}
          </form>
        </div>
      </motion.div>
    </SectionShell>
  );
}
