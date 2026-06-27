"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

type InquiryData = {
  ownerName: string;
  email: string;
  phone: string;
  businessName: string;
  websiteType: string;
  currentWebsite: string;
  projectGoal: string;
  timeline: string;
  company: string;
};

const defaultData: InquiryData = {
  ownerName: "",
  email: "",
  phone: "",
  businessName: "",
  websiteType: "",
  currentWebsite: "",
  projectGoal: "",
  timeline: "",
  company: "",
};

const inputClass =
  "w-full rounded-xl border border-black/10 bg-card px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-mineral/45 focus:ring-2 focus:ring-mineral/15";
const labelClass = "mb-1.5 block text-xs font-semibold text-foreground/70";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return phone.replace(/\D/g, "").length >= 7;
}

export default function CTA() {
  const [formData, setFormData] = useState<InquiryData>(defaultData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof InquiryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: string[] = [];

    if (!formData.ownerName.trim()) nextErrors.push("Your name is required.");
    if (!isValidEmail(formData.email)) nextErrors.push("A valid email is required.");
    if (!isValidPhone(formData.phone)) nextErrors.push("A valid phone number is required.");
    if (!formData.businessName.trim()) nextErrors.push("Business or project name is required.");
    if (!formData.websiteType.trim()) nextErrors.push("Choose the type of website you need.");
    if (!formData.projectGoal.trim()) nextErrors.push("Tell us what you want the website to do.");

    setErrors(nextErrors);
    if (nextErrors.length > 0) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        industry: formData.websiteType,
        city: "",
        topServices: formData.projectGoal,
        idealCustomer: "",
        differentiator: formData.currentWebsite
          ? `Current website: ${formData.currentWebsite}`
          : "",
        promo: formData.timeline ? `Preferred timeline: ${formData.timeline}` : "",
        reviewsLink: "",
        testimonials: "",
        leadPhone: formData.phone,
        leadEmail: formData.email,
        businessHours: "",
        responseSpeed: formData.timeline,
        upgrades: formData.websiteType,
        understandsPricing: true,
        understandsTerm: true,
        smsConsent: false,
        emailConsent: true,
        company: formData.company,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setErrors(["Something went wrong. Please try again or email hello@nexgen.studio."]);
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setFormData(defaultData);
      setIsSubmitting(false);
    } catch {
      setErrors(["Network error. Please try again or email hello@nexgen.studio."]);
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell id="contact" className="pb-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-mineral/25 bg-mineral/[0.08] px-3 py-1.5 text-xs font-semibold text-mineral">
            <Mail size={14} />
            Project inquiry
          </p>
          <h2 className="font-display mt-5 text-[2rem] leading-[1.08] sm:text-[2.5rem] lg:text-[3rem]">
            Tell me what you need from your{" "}
            <em className="italic text-mineral">website.</em>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            No pricing games, no long onboarding form. Send the basics and I&apos;ll follow up with
            the right questions, scope, and next step.
          </p>

          <div className="mt-7 space-y-3">
            {[
              "A landing page, business site, or more custom web experience",
              "Clear quote after we understand the scope",
              "Sample sites available above so you can judge the style",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-mineral" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/8 bg-card p-5 shadow-[0_12px_40px_rgba(16,21,31,0.08)] sm:p-7">
          {submitted ? (
            <div className="rounded-xl border border-mineral/20 bg-mineral-muted p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-mineral" />
                <div>
                  <p className="font-semibold text-plum-depth">Inquiry sent.</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                    I&apos;ll review the details and follow up with the cleanest next step.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className={submitted ? "mt-5" : ""}>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={(event) => update("company", event.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ownerName" className={labelClass}>
                  Your name
                </label>
                <input
                  id="ownerName"
                  className={inputClass}
                  value={formData.ownerName}
                  onChange={(event) => update("ownerName", event.target.value)}
                  autoComplete="name"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="businessName" className={labelClass}>
                  Business or project
                </label>
                <input
                  id="businessName"
                  className={inputClass}
                  value={formData.businessName}
                  onChange={(event) => update("businessName", event.target.value)}
                  autoComplete="organization"
                  placeholder="NexGen Studio"
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={formData.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                  placeholder="you@business.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={inputClass}
                  value={formData.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  autoComplete="tel"
                  placeholder="(305) 555-0100"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="websiteType" className={labelClass}>
                  What do you need?
                </label>
                <select
                  id="websiteType"
                  className={inputClass}
                  value={formData.websiteType}
                  onChange={(event) => update("websiteType", event.target.value)}
                >
                  <option value="">Choose one</option>
                  <option value="Landing page">Landing page</option>
                  <option value="Business website">Business website</option>
                  <option value="Website redesign">Website redesign</option>
                  <option value="Online booking or payments">Online booking or payments</option>
                  <option value="Custom web app">Custom web app</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className={labelClass}>
                  Timeline
                </label>
                <select
                  id="timeline"
                  className={inputClass}
                  value={formData.timeline}
                  onChange={(event) => update("timeline", event.target.value)}
                >
                  <option value="">Choose one</option>
                  <option value="ASAP">ASAP</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="Just exploring">Just exploring</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="currentWebsite" className={labelClass}>
                Current website, if you have one
              </label>
              <input
                id="currentWebsite"
                type="url"
                className={inputClass}
                value={formData.currentWebsite}
                onChange={(event) => update("currentWebsite", event.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="projectGoal" className={labelClass}>
                What should this website help you do?
              </label>
              <textarea
                id="projectGoal"
                rows={5}
                className={`${inputClass} resize-none`}
                value={formData.projectGoal}
                onChange={(event) => update("projectGoal", event.target.value)}
                placeholder="Example: look more professional, explain my services clearly, get more calls, show my work, take bookings, or replace an outdated site."
              />
            </div>

            {errors.length > 0 ? (
              <div className="mt-4 rounded-xl border border-destructive/25 bg-destructive/8 p-3">
                {errors.map((error) => (
                  <p key={error} className="text-xs text-destructive">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mineral px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-mineral/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Project Inquiry"}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No published pricing. I&apos;ll quote after I understand the work.
            </p>
          </form>
        </div>
      </div>
    </SectionShell>
  );
}
