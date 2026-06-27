"use client";

import { useMemo, useState } from "react";
import {
  BadgeDollarSign,
  Calculator,
  CheckCircle2,
  ExternalLink,
  HeartHandshake,
  Layers,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

const projectTypes = [
  {
    id: "landing",
    label: "Landing page",
    base: 1500,
    low: 1100,
    high: 2200,
    includedPages: 1,
    hours: 18,
    description: "Single offer, single audience, strong CTA, simple form.",
  },
  {
    id: "brochure",
    label: "Business website",
    base: 3200,
    low: 2400,
    high: 5200,
    includedPages: 5,
    hours: 42,
    description: "Home, services, about, proof, FAQ, contact, and launch support.",
  },
  {
    id: "conversion",
    label: "Conversion site",
    base: 4800,
    low: 3500,
    high: 7200,
    includedPages: 7,
    hours: 62,
    description: "More strategy, proof sequencing, service funnels, booking flow.",
  },
  {
    id: "commerce",
    label: "E-commerce starter",
    base: 5800,
    low: 4200,
    high: 9000,
    includedPages: 8,
    hours: 74,
    description: "Products, checkout, policies, payment setup, launch testing.",
  },
  {
    id: "app-demo",
    label: "Web app demo",
    base: 7800,
    low: 5500,
    high: 11500,
    includedPages: 8,
    hours: 95,
    description: "Product marketing plus realistic dashboard or workflow screens.",
  },
  {
    id: "complex",
    label: "Complex site or app",
    base: 12000,
    low: 8500,
    high: 18000,
    includedPages: 12,
    hours: 140,
    description: "Custom flows, integrations, auth, data, dashboards, or workflows.",
  },
];

const discounts = [
  { id: "none", label: "No discount", rate: 0 },
  { id: "friend", label: "Friend rate", rate: 0.15 },
  { id: "family", label: "Family rate", rate: 0.3 },
  { id: "hardship", label: "Help-them-out rate", rate: 0.45 },
];

const contentOptions = [
  { id: "ready", label: "Client gives clean copy/assets", add: 0 },
  { id: "cleanup", label: "I clean up rough copy/assets", add: 650 },
  { id: "full", label: "I write most copy and structure", add: 1400 },
];

const timelineOptions = [
  { id: "normal", label: "Normal timeline", multiplier: 1 },
  { id: "fast", label: "Fast turnaround", multiplier: 1.18 },
  { id: "rush", label: "Rush build", multiplier: 1.35 },
];

const caseStudyPrices = [
  {
    title: "Law Firm Website Builder",
    url: "https://law-firm-website-builder.vercel.app/",
    type: "Polished multi-page law firm marketing and intake site",
    charge: "$5,800",
    range: "$4,800 to $7,500",
    friend: "$4,000 minimum",
    notes:
      "Includes home, practice area structure, intake CTA, trust metrics, mobile nav, and a professional legal visual system. Charge more if the intake/admin routes become real backend workflows.",
  },
  {
    title: "Modern Engaging Web App",
    url: "https://modern-engaging-web-app.vercel.app/",
    type: "Product marketing page plus simulated SaaS workflow UI",
    charge: "$8,500",
    range: "$7,500 to $11,500",
    friend: "$5,500 minimum",
    notes:
      "This is not just a brochure site. It has product positioning, dashboard previews, approval queues, compliance screens, and app-like routes. Real auth, CRM, SMS, or data storage would push it into a larger build.",
  },
];

function usd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PrivatePricingCalculator() {
  const [projectType, setProjectType] = useState(projectTypes[1].id);
  const [pages, setPages] = useState(5);
  const [integrations, setIntegrations] = useState(1);
  const [content, setContent] = useState(contentOptions[1].id);
  const [timeline, setTimeline] = useState(timelineOptions[0].id);
  const [discount, setDiscount] = useState(discounts[0].id);
  const [care, setCare] = useState(false);

  const estimate = useMemo(() => {
    const selected = projectTypes.find((item) => item.id === projectType) ?? projectTypes[1];
    const selectedContent = contentOptions.find((item) => item.id === content) ?? contentOptions[0];
    const selectedTimeline = timelineOptions.find((item) => item.id === timeline) ?? timelineOptions[0];
    const selectedDiscount = discounts.find((item) => item.id === discount) ?? discounts[0];

    const extraPages = Math.max(0, pages - selected.includedPages);
    const extraPageCost = extraPages * 375;
    const integrationCost = integrations * 700;
    const raw = (selected.base + extraPageCost + integrationCost + selectedContent.add) * selectedTimeline.multiplier;
    const low = Math.max(selected.low, raw * 0.82);
    const high = Math.max(selected.high, raw * 1.22);
    const discounted = raw * (1 - selectedDiscount.rate);
    const floor = Math.max(selected.low * 0.72, selected.hours * 45);
    const minimum = Math.max(discounted, floor);
    const carePlan = care ? Math.max(175, Math.round(raw * 0.045)) : 0;

    return {
      raw,
      low,
      high,
      minimum,
      floor,
      discountRate: selectedDiscount.rate,
      carePlan,
      selected,
    };
  }, [care, content, discount, integrations, pages, projectType, timeline]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
        <div className="pointer-events-none absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-mineral/[0.14] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-mineral/25 bg-mineral/[0.08] px-3 py-1.5 text-xs font-semibold text-mineral">
                <Calculator size={14} />
                Private local pricing tool
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                Quote confidently without publishing your rates.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Use this to anchor project pricing before client calls. Public site stays custom quote only. This page is blocked outside localhost.
              </p>
            </div>

            <div className="rounded-2xl border border-black/8 bg-card p-6 shadow-xl shadow-black/8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Suggested quote
              </p>
              <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
                <p className="text-5xl font-black tracking-tight text-foreground">{usd(estimate.raw)}</p>
                <p className="pb-2 text-sm font-semibold text-muted-foreground">
                  range {usd(estimate.low)} to {usd(estimate.high)}
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-mineral-muted p-4">
                  <p className="text-xs font-semibold text-plum-depth">Discount floor</p>
                  <p className="mt-1 text-2xl font-bold text-plum-depth">{usd(estimate.minimum)}</p>
                </div>
                <div className="rounded-xl bg-accent-soft p-4">
                  <p className="text-xs font-semibold text-mineral">Optional care</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {care ? `${usd(estimate.carePlan)}/mo` : "Not included"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Do not go below the discount floor unless it is a gift. The floor protects your time, QA, revisions, and launch responsibility.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-mineral" />
                <h2 className="text-lg font-bold">Calculator</h2>
              </div>

              <div className="mt-6 space-y-5">
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">Project type</span>
                  <select
                    value={projectType}
                    onChange={(event) => setProjectType(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-mineral/40 focus:ring-2 focus:ring-mineral/15"
                  >
                    {projectTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Pages or major screens</span>
                    <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-xs font-bold">{pages}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={pages}
                    onChange={(event) => setPages(Number(event.target.value))}
                    className="mt-3 w-full accent-mineral"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Integrations or special features</span>
                    <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-xs font-bold">{integrations}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    value={integrations}
                    onChange={(event) => setIntegrations(Number(event.target.value))}
                    className="mt-3 w-full accent-mineral"
                  />
                </div>

                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">Content help</span>
                  <select
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-mineral/40 focus:ring-2 focus:ring-mineral/15"
                  >
                    {contentOptions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">Timeline</span>
                  <select
                    value={timeline}
                    onChange={(event) => setTimeline(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-mineral/40 focus:ring-2 focus:ring-mineral/15"
                  >
                    {timelineOptions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground">Relationship discount</span>
                  <select
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-mineral/40 focus:ring-2 focus:ring-mineral/15"
                  >
                    {discounts.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-black/8 bg-black/[0.02] p-4">
                  <span>
                    <span className="block text-sm font-semibold">Include optional care plan</span>
                    <span className="text-xs text-muted-foreground">Use for hosting checks, small edits, updates, and reporting.</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={care}
                    onChange={(event) => setCare(event.target.checked)}
                    className="h-5 w-5 accent-mineral"
                  />
                </label>
              </div>
            </section>

            <section className="grid gap-4">
              <div className="rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-mineral" />
                  <h2 className="text-lg font-bold">How to use the number</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Client quote", usd(estimate.raw), "Use this as the normal proposal anchor."],
                    ["Low end", usd(estimate.low), "Only use when scope is very clean."],
                    ["High end", usd(estimate.high), "Use when content, urgency, or risk is high."],
                  ].map(([label, value, body]) => (
                    <div key={label} className="rounded-xl border border-black/8 bg-black/[0.02] p-4">
                      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                      <p className="mt-1 text-2xl font-black">{value}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-mineral/20 bg-mineral/[0.07] p-4 text-sm leading-relaxed">
                  Family and friend rule: say, &quot;I can discount the labor, but I still need to cover planning, build time, QA, launch, and support.&quot; Never make a serious website free unless you intentionally want it to be a gift.
                </div>
              </div>

              <div className="rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <BadgeDollarSign size={18} className="text-mineral" />
                  <h2 className="text-lg font-bold">Private baseline menu</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {projectTypes.map((item) => (
                    <div key={item.id} className="rounded-xl border border-black/8 p-4">
                      <p className="text-sm font-bold">{item.label}</p>
                      <p className="mt-1 text-xl font-black">{usd(item.base)}</p>
                      <p className="text-xs font-semibold text-muted-foreground">
                        Normal range {usd(item.low)} to {usd(item.high)}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-mineral" />
              <h2 className="text-lg font-bold">Case-study pricing</h2>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {caseStudyPrices.map((item) => (
                <article key={item.title} className="rounded-xl border border-black/8 bg-black/[0.02] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold">{item.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">{item.type}</p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-card px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                    >
                      Visit
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">I would charge</p>
                      <p className="text-2xl font-black">{item.charge}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Defensible range</p>
                      <p className="text-sm font-bold">{item.range}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Friend floor</p>
                      <p className="text-sm font-bold">{item.friend}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.notes}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              "DIY builders are cheap monthly tools, so your value has to be strategy, polish, and saved time.",
              "Custom-coded website ranges online are often much higher than these numbers, so this calculator stays competitive.",
              "When a project includes real backend risk, integrations, compliance, or support, price it like software, not a page.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-black/8 bg-card p-5 shadow-sm">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-mineral" />
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </section>

          <section className="mt-6 rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <HeartHandshake size={18} className="text-mineral" />
              <h2 className="text-lg font-bold">Sources used as market anchors</h2>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
              <a className="rounded-xl border border-black/8 p-4 transition hover:border-mineral/25 hover:text-foreground" href="https://www.techradar.com/news/how-much-does-it-cost-to-build-a-website" target="_blank" rel="noreferrer">
                TechRadar website cost guide: custom-coded sites commonly range far above budget builder pricing.
              </a>
              <a className="rounded-xl border border-black/8 p-4 transition hover:border-mineral/25 hover:text-foreground" href="https://www.techradar.com/best/best-small-business-website-builders" target="_blank" rel="noreferrer">
                TechRadar small business builder guide: DIY platforms anchor the low-cost alternative market.
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
