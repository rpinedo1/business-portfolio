"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

const benefits = [
  "30-minute strategy call focused on your current bottleneck",
  "Build plan with scope, timeline, and budget range",
  "Clear first milestone you can execute immediately",
  "Direct access to the team doing the implementation",
];

type ProjectType = "webapp" | "website" | "ai";
type Urgency = "normal" | "soon" | "rush";
type Traffic = "low" | "mid" | "high";
type DecisionTimeline = "under-30" | "30-90" | "exploring";

const planPreview = [
  {
    title: "Scope Snapshot",
    detail: "Prioritized feature list tied to business outcomes.",
  },
  {
    title: "Sprint Timeline",
    detail: "Week-by-week rollout plan with milestone checkpoints.",
  },
  {
    title: "Budget Logic",
    detail: "Range estimate with the assumptions behind it.",
  },
];

const objections = [
  {
    question: "What budget range should we expect?",
    answer:
      "Most engagements start in the $8k-$35k range depending on scope, urgency, and integration complexity. You get a transparent range with assumptions in the call.",
  },
  {
    question: "Do we need full specs before starting?",
    answer:
      "No. Week 1 is for scoping and architecture validation so you can make decisions with less risk before committing to full build.",
  },
  {
    question: "How much internal bandwidth is required?",
    answer:
      "Usually 1 stakeholder for weekly reviews and quick feedback. We keep async updates tight to avoid draining your team.",
  },
  {
    question: "What if priorities change mid-sprint?",
    answer:
      "We re-prioritize in sprint planning and document tradeoffs clearly. The goal is adaptability without derailing delivery.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We monitor outcomes, ship optimizations, and can continue with growth sprints focused on conversion, retention, or automation impact.",
  },
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getEstimate(projectType: ProjectType, urgency: Urgency, traffic: Traffic) {
  const base = {
    webapp: { low: 18, high: 35, milestone: "Scope core flows and ship an MVP sprint plan." },
    website: { low: 8, high: 18, milestone: "Lock messaging and redesign the highest-intent pages first." },
    ai: { low: 14, high: 30, milestone: "Define one AI workflow with measurable ROI and ship a pilot." },
  }[projectType];

  const urgencyAdj = urgency === "rush" ? 8 : urgency === "soon" ? 4 : 0;
  const trafficAdj = traffic === "high" ? 5 : traffic === "mid" ? 2 : 0;

  return {
    range: `$${base.low + urgencyAdj}k - $${base.high + urgencyAdj + trafficAdj}k`,
    milestone: base.milestone,
  };
}

function getFollowUpMessage(timeline: DecisionTimeline) {
  if (timeline === "under-30") {
    return "Request sent. High-priority lead noted. We will send available slots today.";
  }
  if (timeline === "30-90") {
    return "Request sent. We will share your build plan and scheduling options shortly.";
  }
  return "Request sent. We will send a roadmap-first follow-up so you can plan the right next step.";
}

type CTAProps = {
  advancedMode?: boolean;
};

export default function CTA({ advancedMode = true }: CTAProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadGoal, setLeadGoal] = useState("");
  const [leadTimeline, setLeadTimeline] = useState<DecisionTimeline | "">("");
  const [openObjection, setOpenObjection] = useState<string | null>(objections[0]?.question ?? null);

  const [projectType, setProjectType] = useState<ProjectType>("webapp");
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const [traffic, setTraffic] = useState<Traffic>("mid");

  const estimate = useMemo(
    () => getEstimate(projectType, urgency, traffic),
    [projectType, urgency, traffic]
  );

  const handleContinue = () => {
    setStatus("idle");
    setStatusMessage("");
    if (!isValidEmail(leadEmail)) {
      setStatus("error");
      setStatusMessage("Enter a valid work email to continue.");
      return;
    }
    if (!leadGoal) {
      setStatus("error");
      setStatusMessage("Pick your primary goal so we can tailor the plan.");
      return;
    }
    if (advancedMode && !leadTimeline) {
      setStatus("error");
      setStatusMessage("Pick your decision timeline so we can tailor follow-up.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    if (step !== 2) {
      handleContinue();
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const projectNotes = String(formData.get("project") ?? "");

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      project: advancedMode
        ? `[Decision timeline: ${leadTimeline}] ${projectNotes}`
        : projectNotes,
      company: String(formData.get("company") ?? ""),
    };

    if (!isValidEmail(payload.email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
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
        const providerDetails =
          data?.providerStatus || data?.provider
            ? ` (provider: ${data?.providerStatus ?? "unknown"} ${data?.provider ?? ""})`
            : "";
        setStatus("error");
        setStatusMessage(
          (data?.error ?? "Could not send your request. Please try again.") +
            providerDetails
        );
        return;
      }

      setStatus("success");
      setStatusMessage(
        advancedMode && leadTimeline
          ? getFollowUpMessage(leadTimeline)
          : "Request sent. We will reach out shortly."
      );
      setStep(1);
      setLeadEmail("");
      setLeadGoal("");
      setLeadTimeline("");
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

        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber-muted px-4 py-1.5 text-xs font-semibold text-amber">
              <Calendar size={12} />
              Next kickoff window: March 18, 2026
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Get your 30-minute build plan
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Bring your goals and constraints. We&apos;ll map the fastest path to
              launch with a clear first milestone.
            </p>
          </div>

          <div className="space-y-5 lg:row-span-2 lg:self-center">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-[0_4px_24px_rgba(16,24,40,0.08)] backdrop-blur-sm"
            >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Step {step} of 2
            </p>

            {step === 1 ? (
              <div className="mt-4">
                <div>
                  <label htmlFor="lead-email" className="mb-2 block text-xs font-semibold text-foreground/70">
                    Work Email
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="jane@company.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="lead-goal" className="mb-2 block text-xs font-semibold text-foreground/70">
                    Primary Goal
                  </label>
                  <select
                    id="lead-goal"
                    value={leadGoal}
                    onChange={(e) => setLeadGoal(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-muted-foreground outline-none transition focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                  >
                    <option value="">Pick a goal...</option>
                    <option value="increase-leads">Increase qualified leads</option>
                    <option value="ship-product">Ship a new product fast</option>
                    <option value="automate-ops">Automate support or operations</option>
                    <option value="improve-conversion">Improve conversion rate</option>
                  </select>
                </div>

                {advancedMode ? (
                  <div className="mt-4">
                    <label htmlFor="lead-timeline" className="mb-2 block text-xs font-semibold text-foreground/70">
                      Decision Timeline
                    </label>
                    <select
                      id="lead-timeline"
                      value={leadTimeline}
                      onChange={(e) => setLeadTimeline(e.target.value as DecisionTimeline)}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-muted-foreground outline-none transition focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                    >
                      <option value="">Pick a timeline...</option>
                      <option value="under-30">Under 30 days</option>
                      <option value="30-90">30-90 days</option>
                      <option value="exploring">Just exploring for now</option>
                    </select>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={handleContinue}
                  className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-amber/30"
                >
                  Continue to Build Plan Details
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <input type="hidden" name="email" value={leadEmail} />
                <input type="hidden" name="service" value={leadGoal} />

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

                <div className="mt-4">
                  <label htmlFor="project" className="mb-2 block text-xs font-semibold text-foreground/70">
                    Project Context
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    rows={4}
                    placeholder="Current bottleneck, target outcome, and ideal timeline."
                    minLength={10}
                    required
                    className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                  />
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="mt-4 flex gap-2">
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
                    {isSubmitting ? "Sending..." : "Send Me the Build Plan"}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

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

          {advancedMode ? (
            <div className="lg:col-start-1 lg:row-start-2">
              <div className="rounded-2xl border border-black/8 bg-white/85 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Plan Preview
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {planPreview.map((item) => (
                    <div key={item.title} className="rounded-xl border border-black/8 bg-white p-3">
                      <p className="text-xs font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-black/8 bg-white/80 px-4 py-2.5 text-center text-xs font-semibold text-foreground shadow-sm">
                  <ShieldCheck size={14} className="text-amber" />
                  100% confidential. We never share project details.
                </p>
              </div>
            </div>
          ) : null}

          <div className="lg:col-start-1 lg:row-start-3">
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-amber" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-8 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <details className="group rounded-2xl border border-black/8 bg-white/90 p-5 shadow-[0_4px_24px_rgba(16,24,40,0.08)] backdrop-blur-sm">
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Fit Estimator
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Quick range estimate based on your scope, urgency, and audience size.
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  />
                </div>
              </summary>
              <div className="mt-4 grid gap-3">
                <label className="text-xs font-semibold text-foreground/70">
                  Project type
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                  >
                    <option value="webapp">Web Application</option>
                    <option value="website">Website or Landing Page</option>
                    <option value="ai">AI Product or Integration</option>
                  </select>
                </label>
                <label className="text-xs font-semibold text-foreground/70">
                  Urgency
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as Urgency)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                  >
                    <option value="normal">Normal (4-8 weeks)</option>
                    <option value="soon">Soon (2-4 weeks)</option>
                    <option value="rush">Rush (under 2 weeks)</option>
                  </select>
                </label>
                <label className="text-xs font-semibold text-foreground/70">
                  Monthly visitors or active users
                  <select
                    value={traffic}
                    onChange={(e) => setTraffic(e.target.value as Traffic)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-amber/40 focus:ring-2 focus:ring-amber/15"
                  >
                    <option value="low">Under 10k</option>
                    <option value="mid">10k-100k</option>
                    <option value="high">100k+</option>
                  </select>
                </label>
              </div>
              <div className="mt-4 rounded-xl border border-amber/25 bg-amber/[0.08] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber">
                  Typical engagement range
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">{estimate.range}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{estimate.milestone}</p>
              </div>
            </details>

            <div className="rounded-2xl border border-black/8 bg-white/85 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Risk Reversal
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Missed milestone date? That sprint is discounted by 10%.</li>
                <li>You own all code and infrastructure from day one.</li>
                <li>Week 1 is architecture and scope validation before full build commitment.</li>
              </ul>
            </div>
          </div>

          {advancedMode ? (
            <div className="rounded-2xl border border-black/8 bg-white/85 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Common Objections
              </p>
              <div className="mt-3 space-y-2">
                {objections.map((item) => {
                  const isOpen = openObjection === item.question;
                  return (
                    <div
                      key={item.question}
                      className="rounded-lg border border-black/8 bg-white px-3 py-2.5"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenObjection((prev) =>
                            prev === item.question ? null : item.question
                          )
                        }
                        className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-foreground"
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
          ) : null}
        </div>
      </motion.div>
    </SectionShell>
  );
}
