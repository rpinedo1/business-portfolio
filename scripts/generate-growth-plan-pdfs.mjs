import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.resolve("docs/growth-plans-pdfs");
const SITE_URL = "https://nexgen.studio";
const BOOKING_URL = "https://nexgen.studio/#contact";

class PdfWriter {
  constructor() {
    this.objects = [];
    this.pages = [];
    this.fontRegularId = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    this.fontBoldId = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length;
  }

  addPage({ width = 612, height = 792, content, links = [] }) {
    const stream = `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`;
    const contentId = this.addObject(stream);

    const annotIds = links.map((link) => {
      const rect = `[${link.x1.toFixed(2)} ${link.y1.toFixed(2)} ${link.x2.toFixed(2)} ${link.y2.toFixed(2)}]`;
      const uri = escapePdfText(link.url);
      return this.addObject(
        `<< /Type /Annot /Subtype /Link /Rect ${rect} /Border [0 0 0] /A << /S /URI /URI (${uri}) >> >>`
      );
    });

    this.pages.push({ width, height, contentId, annotIds });
  }

  toBuffer() {
    const pageIds = this.pages.map((page) => {
      const annots = page.annotIds.length ? `/Annots [${page.annotIds.map((id) => `${id} 0 R`).join(" ")}]` : "";
      return this.addObject(
        `<< /Type /Page /Parent PAGES_REF /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 ${this.fontRegularId} 0 R /F2 ${this.fontBoldId} 0 R >> >> /Contents ${page.contentId} 0 R ${annots} >>`
      );
    });

    const kids = pageIds.map((id) => `${id} 0 R`).join(" ");
    const pagesId = this.addObject(`<< /Type /Pages /Kids [${kids}] /Count ${pageIds.length} >>`);

    // Replace placeholder parent ref.
    pageIds.forEach((id) => {
      this.objects[id - 1] = this.objects[id - 1].replace("PAGES_REF", `${pagesId} 0 R`);
    });

    const catalogId = this.addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

    let pdf = "%PDF-1.4\n";
    const offsets = [0];

    this.objects.forEach((obj, idx) => {
      offsets.push(Buffer.byteLength(pdf, "utf8"));
      pdf += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
    });

    const xrefOffset = Buffer.byteLength(pdf, "utf8");
    pdf += `xref\n0 ${this.objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    for (let i = 1; i <= this.objects.length; i += 1) {
      pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${this.objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    return Buffer.from(pdf, "utf8");
  }
}

function escapePdfText(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function textWidth(text, fontSize) {
  return text.length * fontSize * 0.5;
}

function wrapLines(text, maxWidth, fontSize) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, fontSize) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function categoryColor(category) {
  if (category === "AI") return { r: 0.11, g: 0.36, b: 0.78 };
  if (category === "Landing Pages") return { r: 0.01, g: 0.50, b: 0.33 };
  return { r: 0.56, g: 0.26, b: 0.67 };
}

function buildPlanData() {
  return [
    {
      category: "AI",
      leadName: "Dr. Ana Morales",
      company: "BrightSmile Dental Group",
      industry: "Dental Clinics",
      trafficUsers: "~9,500 monthly site visits; 420 monthly inbound calls",
      teamSize: "18 staff across 3 clinics",
      primaryGoal: "Save time with AI",
      projectContext: "Front desk teams are overloaded with appointment questions, insurance checks, and rescheduling. Average first response is slow during peak hours.",
      bottlenecks: [
        "Manual intake and repetitive patient questions consume front-desk capacity.",
        "No central workflow for after-hours inquiries and appointment triage.",
      ],
      assumptions: "Assumes current PMS supports API or secure webhook integration.",
      plan: [
        ["0-30 days", "AI Intake", "Deploy HIPAA-safe FAQ + triage assistant for web and SMS", "Reduce repetitive call load 20-30%", "High confidence"],
        ["31-60 days", "Workflow", "Automate insurance pre-check + appointment reminders", "Save 8-12 staff hours/week", "Medium confidence"],
        ["61-90 days", "Optimization", "Route high-intent leads to live booking priority queue", "Increase booked consults 10-15%", "Medium confidence"],
      ],
      topActions: [
        "Map top 25 repetitive patient questions and response rules.",
        "Connect AI assistant to booking availability for real-time slot suggestions.",
        "Automate no-show reactivation texts with personalized follow-up.",
        "Trigger staff alerts only for high-value or exception scenarios.",
        "Review weekly transcript quality and tighten prompts.",
      ],
      offer: "AI Automation (Primary), Landing Pages (Secondary)",
      metric: "Hours saved/week, first-response time, booked consult rate",
      risks: [
        "Risk: Compliance concerns. Mitigation: constrained prompts + human escalation.",
        "Risk: Staff adoption lag. Mitigation: 1-page SOP and role-based handoff rules.",
        "Risk: Integration delays. Mitigation: start with standalone assistant + phased integration.",
      ],
      nextStep: "Run a 45-minute workflow audit of intake/rescheduling and select one automation path to ship this week.",
      chart: [65, 78, 86],
    },
    {
      category: "AI",
      leadName: "Marcus Lee",
      company: "PeakFlow HVAC Services",
      industry: "Home Services (HVAC)",
      trafficUsers: "~7,200 monthly visits; 310 monthly service requests",
      teamSize: "24 employees",
      primaryGoal: "Save time with AI",
      projectContext: "Dispatch and support teams manually triage service requests, quote follow-ups, and technician scheduling updates.",
      bottlenecks: [
        "Request triage and follow-ups are handled manually across phone, email, and SMS.",
        "Leads cool down before quote reminders are sent.",
      ],
      assumptions: "Assumes CRM has pipeline stages and webhook access.",
      plan: [
        ["0-30 days", "Lead Triage", "Automate request classification + urgency routing", "Cut response lag by 30-40%", "High confidence"],
        ["31-60 days", "Follow-up", "Auto-send quote nudges based on job type and timing", "Lift close rate 8-12%", "Medium confidence"],
        ["61-90 days", "Ops", "Generate daily technician prep summaries from tickets", "Save 6-10 ops hours/week", "Medium confidence"],
      ],
      topActions: [
        "Define triage tags for emergency, maintenance, and replacement requests.",
        "Use AI to draft personalized follow-up texts within 5 minutes of quote delivery.",
        "Add missed-call AI callback workflow for after-hours leads.",
        "Create escalation rules for premium contracts and repeat customers.",
        "Track and prune low-performing message templates every week.",
      ],
      offer: "AI Automation (Primary)",
      metric: "First-response time, quote-to-close rate, dispatch admin hours",
      risks: [
        "Risk: Bad lead routing. Mitigation: human override for first 2 weeks.",
        "Risk: Message fatigue. Mitigation: frequency caps and channel preference.",
        "Risk: Data quality gaps. Mitigation: enforce required fields at intake.",
      ],
      nextStep: "Implement an AI-powered missed-call recovery and triage flow for one service region in the next 7 days.",
      chart: [58, 73, 82],
    },
    {
      category: "AI",
      leadName: "Sofia Grant",
      company: "LunaSkin DTC",
      industry: "Ecommerce (Beauty)",
      trafficUsers: "~52,000 monthly sessions; 1,400 support tickets/month",
      teamSize: "14 team members",
      primaryGoal: "Save time with AI",
      projectContext: "Support team spends too much time on order status, returns, and product-match questions, impacting retention campaigns.",
      bottlenecks: [
        "High-volume repetitive support tickets delay personalized support.",
        "Retention opportunities are missed because support context is siloed.",
      ],
      assumptions: "Assumes Shopify + helpdesk API access.",
      plan: [
        ["0-30 days", "Support", "Deploy AI ticket deflection for order and return intents", "Deflect 25-35% tickets", "High confidence"],
        ["31-60 days", "Retention", "Trigger post-support upsell and replenishment journeys", "Raise repeat purchase 4-8%", "Medium confidence"],
        ["61-90 days", "Insights", "Auto-tag support themes for product and CX feedback", "Faster issue resolution cycles", "Exploratory"],
      ],
      topActions: [
        "Train AI on shipping/returns policy and top 50 macros.",
        "Auto-generate suggested replies for agents with one-click approval.",
        "Route VIP customers to priority human support.",
        "Link support outcomes to retention email audience segments.",
        "Monitor deflection accuracy weekly and tune fallback logic.",
      ],
      offer: "AI Automation (Primary), Web Apps (Secondary)",
      metric: "Ticket deflection, response SLA, repeat purchase rate",
      risks: [
        "Risk: Tone inconsistency. Mitigation: brand voice guardrails + QA sampling.",
        "Risk: Policy drift. Mitigation: weekly sync from source-of-truth docs.",
        "Risk: Over-deflection. Mitigation: confidence threshold for human handoff.",
      ],
      nextStep: "Launch AI responses for the top 3 intents (order status, returns, product match) and compare SLA before/after.",
      chart: [62, 77, 84],
    },
    {
      category: "AI",
      leadName: "James Holloway",
      company: "Holloway Injury Law",
      industry: "Legal Services",
      trafficUsers: "~11,300 monthly visits; 260 case inquiries/month",
      teamSize: "11 employees",
      primaryGoal: "Save time with AI",
      projectContext: "Paralegals manually screen leads and schedule consults; response delays lower signed-case volume.",
      bottlenecks: [
        "Manual screening of non-qualified inquiries drains paralegal bandwidth.",
        "After-hours leads wait too long for first contact.",
      ],
      assumptions: "Assumes intake questionnaire can be standardized.",
      plan: [
        ["0-30 days", "Intake", "Deploy AI pre-qualification form + conversational follow-up", "Reduce non-qualified consults 20%", "High confidence"],
        ["31-60 days", "Scheduling", "Automate consult scheduling and reminders", "Raise show-up rate 10-15%", "Medium confidence"],
        ["61-90 days", "Ops", "Generate case-intake summaries for legal team", "Save 5-8 hours/week", "Medium confidence"],
      ],
      topActions: [
        "Define qualification thresholds for case value and claim fit.",
        "Add AI assistant to intake page + SMS handoff for urgent cases.",
        "Use structured summaries to reduce attorney prep time.",
        "Prioritize high-intent lead callbacks in under 15 minutes.",
        "Track signed-case rate by intake source weekly.",
      ],
      offer: "AI Automation (Primary), Landing Pages (Secondary)",
      metric: "Qualified consult rate, show rate, intake hours saved",
      risks: [
        "Risk: Misclassification. Mitigation: attorney-approved decision rubric.",
        "Risk: Ethical/compliance edge cases. Mitigation: clear disclaimers + human review.",
        "Risk: Low adoption. Mitigation: involve paralegal lead in workflow design.",
      ],
      nextStep: "Roll out AI pre-qualification on one practice-area landing page and measure consult quality for 2 weeks.",
      chart: [60, 74, 81],
    },
    {
      category: "AI",
      leadName: "Elena Rossi",
      company: "HarborPoint Property Management",
      industry: "Property Management",
      trafficUsers: "3,900 resident portal users; 1,100 monthly maintenance requests",
      teamSize: "32 across leasing and maintenance",
      primaryGoal: "Save time with AI",
      projectContext: "Leasing and maintenance coordination is fragmented across email and phone; ticket updates are inconsistent.",
      bottlenecks: [
        "Maintenance triage and vendor coordination are manual and slow.",
        "Residents repeatedly ask for status updates.",
      ],
      assumptions: "Assumes work-order data is accessible via API exports.",
      plan: [
        ["0-30 days", "Service Desk", "Automate maintenance intake categorization and resident updates", "Cut inbound status calls 25%", "High confidence"],
        ["31-60 days", "Vendor Ops", "Auto-assign jobs by vendor SLA and capacity", "Improve completion speed 12-18%", "Medium confidence"],
        ["61-90 days", "Leasing", "AI follow-up for tour no-shows and application nudges", "Increase application completion 8-10%", "Medium confidence"],
      ],
      topActions: [
        "Standardize maintenance issue taxonomy and urgency tags.",
        "Auto-send status notifications at key job milestones.",
        "Create AI summaries for weekly property manager reviews.",
        "Add exception alerts for jobs breaching SLA thresholds.",
        "Track vendor turnaround by property and issue type.",
      ],
      offer: "AI Automation (Primary), Web Apps (Secondary)",
      metric: "Ticket cycle time, resident call volume, SLA compliance",
      risks: [
        "Risk: Incomplete ticket data. Mitigation: required input fields.",
        "Risk: Vendor pushback. Mitigation: phased rollout with top vendors first.",
        "Risk: Update fatigue. Mitigation: resident preference controls.",
      ],
      nextStep: "Automate updates for one property portfolio and benchmark call volume reduction over 14 days.",
      chart: [57, 71, 80],
    },

    {
      category: "Landing Pages",
      leadName: "Nina Patel",
      company: "PulseHR SaaS",
      industry: "B2B SaaS (HR Tech)",
      trafficUsers: "~18,000 monthly sessions; 640 demo clicks/month",
      teamSize: "22 people",
      primaryGoal: "More qualified leads",
      projectContext: "Paid traffic is growing but demo quality is inconsistent; positioning is broad and CTA path is unclear.",
      bottlenecks: [
        "Message-to-audience mismatch on paid traffic landing pages.",
        "Form friction blocks high-intent visitors from booking demos.",
      ],
      assumptions: "Assumes traffic split by campaign intent is available in analytics.",
      plan: [
        ["0-30 days", "Messaging", "Build ICP-specific landing page variants by segment", "Raise qualified demo rate 15-25%", "High confidence"],
        ["31-60 days", "Conversion", "Shorten form + improve social proof sequencing", "Lift CVR 10-18%", "High confidence"],
        ["61-90 days", "Optimization", "Run weekly A/B tests on headline and CTA framing", "Sustain incremental gains", "Medium confidence"],
      ],
      topActions: [
        "Rewrite hero around one pain + one promised outcome for HR leaders.",
        "Match ad promise to landing page headline and first CTA.",
        "Replace generic testimonials with role-specific proof.",
        "Reduce form fields from 9 to 5 for initial qualification.",
        "Add pricing guidance or qualification framing before form.",
      ],
      offer: "Landing Pages (Primary), AI Automation (Secondary)",
      metric: "Visitor-to-demo CVR, qualified call rate, CAC efficiency",
      risks: [
        "Risk: Internal opinion loops. Mitigation: KPI-based decision criteria.",
        "Risk: Low sample size by segment. Mitigation: prioritize top 2 channels first.",
        "Risk: Slow design/dev. Mitigation: component-based page system.",
      ],
      nextStep: "Ship one high-intent paid-search page with segment-specific proof and track qualified demos for 10 business days.",
      chart: [54, 70, 79],
    },
    {
      category: "Landing Pages",
      leadName: "Karina Wells",
      company: "EverGlow Med Spa",
      industry: "Healthcare Aesthetics",
      trafficUsers: "~6,400 monthly visits; 190 consultation requests",
      teamSize: "12 staff",
      primaryGoal: "More qualified leads",
      projectContext: "Instagram and Google traffic is high, but consultation bookings drop at the inquiry form step.",
      bottlenecks: [
        "Offer pages are generic and don’t map to treatment intent.",
        "Weak CTA hierarchy causes drop-off before booking.",
      ],
      assumptions: "Assumes top 3 services generate most revenue.",
      plan: [
        ["0-30 days", "Offer Pages", "Create service-specific landing pages for top treatments", "Increase consult bookings 12-20%", "High confidence"],
        ["31-60 days", "Trust", "Add before/after proof and clinician credibility blocks", "Improve qualified inquiry mix", "Medium confidence"],
        ["61-90 days", "Retargeting", "Retarget non-bookers with aligned landing experiences", "Recover 5-10% lost demand", "Medium confidence"],
      ],
      topActions: [
        "Build one page per core treatment with clear price context and outcomes.",
        "Move booking CTA above the fold and repeat after proof sections.",
        "Add short FAQ covering downtime, eligibility, and expectations.",
        "Use dynamic UTM copy blocks to match ad intent.",
        "Set up thank-you page micro-conversion tracking.",
      ],
      offer: "Landing Pages (Primary)",
      metric: "Booking CVR, qualified consult ratio, cost per booked consult",
      risks: [
        "Risk: Compliance with claims. Mitigation: approved claim library.",
        "Risk: Creative inconsistency. Mitigation: standardized page template.",
        "Risk: Lead quality drift. Mitigation: qualification questions in form.",
      ],
      nextStep: "Launch a dedicated page for your highest-margin treatment and compare consult quality against the current generic page.",
      chart: [56, 72, 83],
    },
    {
      category: "Landing Pages",
      leadName: "Javier Romero",
      company: "SunPeak Solar",
      industry: "Residential Solar",
      trafficUsers: "~21,000 monthly visits; 480 lead forms",
      teamSize: "35 employees",
      primaryGoal: "More qualified leads",
      projectContext: "Lead volume is healthy but disqualified submissions are high due to unclear eligibility messaging.",
      bottlenecks: [
        "Page copy doesn’t pre-qualify by home ownership and utility profile.",
        "No clear handoff from estimate tool to appointment booking.",
      ],
      assumptions: "Assumes sales team can define qualification thresholds.",
      plan: [
        ["0-30 days", "Qualification", "Add eligibility-first landing flow with gated estimator", "Reduce low-fit leads 20%", "High confidence"],
        ["31-60 days", "Conversion", "Improve appointment path after estimate completion", "Raise booked inspection rate 10-14%", "Medium confidence"],
        ["61-90 days", "Scale", "Duplicate winning page by region with localized proof", "Boost regional CAC efficiency", "Medium confidence"],
      ],
      topActions: [
        "Insert quick eligibility checklist above form.",
        "Use geo-specific testimonials and utility savings examples.",
        "Add progress indicators for multi-step lead forms.",
        "Align paid ad keywords with landing headline language.",
        "Track form-to-appointment conversion by campaign.",
      ],
      offer: "Landing Pages (Primary), Web Apps (Secondary)",
      metric: "Qualified lead rate, form completion, appointment set rate",
      risks: [
        "Risk: Over-filtering leads. Mitigation: test strict vs moderate qualification.",
        "Risk: Regional proof gaps. Mitigation: reusable regional content blocks.",
        "Risk: Sales follow-up delay. Mitigation: instant routing + SLA alerts.",
      ],
      nextStep: "Deploy one qualification-first page for your highest-spend ad group and measure disqualification rate change.",
      chart: [59, 75, 84],
    },
    {
      category: "Landing Pages",
      leadName: "Adrian Chen",
      company: "NorthBridge Wealth Advisors",
      industry: "Financial Services",
      trafficUsers: "~4,700 monthly visits; 110 consultation requests",
      teamSize: "9 staff",
      primaryGoal: "More qualified leads",
      projectContext: "Website traffic is steady from referrals and SEO, but discovery calls include many low-fit prospects.",
      bottlenecks: [
        "Generalist messaging attracts broad but low-fit inquiries.",
        "No clear page path by client type or investable assets.",
      ],
      assumptions: "Assumes ideal client profile is already defined.",
      plan: [
        ["0-30 days", "Positioning", "Create niche-focused landing pages by client segment", "Increase qualified call mix 15-20%", "High confidence"],
        ["31-60 days", "Trust", "Add compliance-safe authority proof and process clarity", "Improve call-to-proposal rate", "Medium confidence"],
        ["61-90 days", "Optimization", "Test CTA phrasing for fit-first vs urgency-first", "Higher meeting show rate", "Exploratory"],
      ],
      topActions: [
        "Build a page specifically for your top client segment.",
        "Use qualification framing before scheduling CTA.",
        "Include transparent process timeline and outcomes.",
        "Add fit-check form field to reduce low-intent bookings.",
        "Instrument source-to-qualified-call analytics.",
      ],
      offer: "Landing Pages (Primary)",
      metric: "Qualified call ratio, show-up rate, proposal conversion",
      risks: [
        "Risk: Compliance copy constraints. Mitigation: pre-approved content blocks.",
        "Risk: Too narrow messaging. Mitigation: maintain broad page as backup.",
        "Risk: Attribution gaps. Mitigation: enforce UTM standards.",
      ],
      nextStep: "Publish one segment-specific page with fit-check CTA and monitor qualified call rate for the next 3 weeks.",
      chart: [53, 68, 78],
    },
    {
      category: "Landing Pages",
      leadName: "Brianna Cole",
      company: "Vertex MSP",
      industry: "Managed IT Services",
      trafficUsers: "~8,900 monthly sessions; 170 inbound leads",
      teamSize: "27 employees",
      primaryGoal: "More qualified leads",
      projectContext: "Inbound forms generate mixed company sizes; enterprise leads are rare despite targeting mid-market accounts.",
      bottlenecks: [
        "Landing pages don’t speak to decision-maker pain for mid-market IT leaders.",
        "CTA flow lacks clarity on assessment value and next steps.",
      ],
      assumptions: "Assumes service packaging for target segment is stable.",
      plan: [
        ["0-30 days", "ICP Fit", "Launch segment-specific page for 100-500 employee companies", "Improve SQL rate 12-18%", "High confidence"],
        ["31-60 days", "Offer", "Frame assessment as outcome-driven with clear deliverables", "Boost form completion 8-12%", "Medium confidence"],
        ["61-90 days", "Testing", "Run proof-order and CTA copy tests", "Steady incremental CVR lift", "Medium confidence"],
      ],
      topActions: [
        "Rewrite hero to business risk and downtime cost language.",
        "Add verticalized proof snippets by industry.",
        "Clarify what prospects receive after submitting form.",
        "Use role-based CTA variants (CIO vs COO messaging).",
        "Track MQL-to-SQL conversion by landing page version.",
      ],
      offer: "Landing Pages (Primary), AI Automation (Secondary)",
      metric: "SQL rate, form CVR, cost per qualified lead",
      risks: [
        "Risk: Sales/marketing misalignment. Mitigation: shared qualification rubric.",
        "Risk: Underpowered tests. Mitigation: focus on highest-traffic pages.",
        "Risk: Proof scarcity. Mitigation: repurpose case snippets quickly.",
      ],
      nextStep: "Ship the mid-market segment page and run a 14-day traffic split against your current generic page.",
      chart: [55, 71, 81],
    },

    {
      category: "Web Apps",
      leadName: "Derrick Owens",
      company: "FreightLoop Logistics",
      industry: "Logistics Brokerage",
      trafficUsers: "120 internal users; 2,300 shipments/month",
      teamSize: "48 employees",
      primaryGoal: "Build/improve web app",
      projectContext: "Operations rely on spreadsheets + emails for load tracking and exceptions; delays cause customer churn risk.",
      bottlenecks: [
        "No unified workflow for shipment status, exceptions, and owner accountability.",
        "Manual reporting slows intervention on at-risk loads.",
      ],
      assumptions: "Assumes TMS data feeds can be ingested daily.",
      plan: [
        ["0-30 days", "MVP Scope", "Build thin-slice exception dashboard with role-based actions", "Reduce issue response time 25%", "High confidence"],
        ["31-60 days", "Workflow", "Add SLA alerts and carrier communication logging", "Lower missed SLA incidents 15%", "Medium confidence"],
        ["61-90 days", "Adoption", "Roll out to all ops pods + usage coaching", "Increase throughput per coordinator", "Medium confidence"],
      ],
      topActions: [
        "Define one critical workflow: exception detection to resolution.",
        "Implement role-based queue with due-time prioritization.",
        "Add in-app activity timeline to remove email dependency.",
        "Instrument cycle-time metrics before rollout.",
        "Set weekly adoption review with pod leads.",
      ],
      offer: "Web Apps (Primary), AI Automation (Secondary)",
      metric: "Cycle time, exceptions resolved/day, user adoption",
      risks: [
        "Risk: Scope creep. Mitigation: lock MVP to one workflow.",
        "Risk: Low usage. Mitigation: integrate into daily standups.",
        "Risk: Data mismatch. Mitigation: reconciliation checks per ingest.",
      ],
      nextStep: "Run a 60-minute workflow mapping session and lock the first release scope to one exception-management flow.",
      chart: [52, 69, 80],
    },
    {
      category: "Web Apps",
      leadName: "Olivia Cruz",
      company: "BuildRight Contractors",
      industry: "Construction Operations",
      trafficUsers: "85 internal users; 45 active projects",
      teamSize: "62 employees",
      primaryGoal: "Build/improve web app",
      projectContext: "Project updates, RFIs, and change orders are scattered across chat threads and spreadsheets.",
      bottlenecks: [
        "Workflow fragmentation creates rework and approval delays.",
        "No real-time visibility for project-level blockers.",
      ],
      assumptions: "Assumes leadership can standardize status cadence.",
      plan: [
        ["0-30 days", "Workflow", "Ship change-order intake + approval module", "Cut approval lag 20-30%", "High confidence"],
        ["31-60 days", "Visibility", "Add project health dashboards by PM", "Faster risk escalation", "Medium confidence"],
        ["61-90 days", "Adoption", "Integrate subcontractor update submissions", "Increase on-time updates", "Medium confidence"],
      ],
      topActions: [
        "Define required fields for every change-order request.",
        "Create approval SLA notifications to prevent bottlenecks.",
        "Standardize weekly project status template in-app.",
        "Track rework incidents tied to late approvals.",
        "Pilot with two project teams before full rollout.",
      ],
      offer: "Web Apps (Primary)",
      metric: "Approval cycle time, project update compliance, rework rate",
      risks: [
        "Risk: Process variance by PM. Mitigation: enforce common workflow states.",
        "Risk: Adoption resistance. Mitigation: pilot champions + role training.",
        "Risk: Data entry burden. Mitigation: mobile-first quick entry screens.",
      ],
      nextStep: "Prototype the change-order workflow with one PM and one finance approver, then validate within 7 days.",
      chart: [51, 67, 77],
    },
    {
      category: "Web Apps",
      leadName: "Rachel Kim",
      company: "Summit Tutors Network",
      industry: "Education Services",
      trafficUsers: "5,400 monthly parents/students; 210 tutors",
      teamSize: "19 staff",
      primaryGoal: "Build/improve web app",
      projectContext: "Matching students to tutors and scheduling sessions is partially manual, causing slow onboarding.",
      bottlenecks: [
        "Manual matching and onboarding create long time-to-first-session.",
        "Fragmented communication increases no-shows.",
      ],
      assumptions: "Assumes tutor availability data can be standardized.",
      plan: [
        ["0-30 days", "MVP", "Build matching and booking thin-slice for top subjects", "Reduce onboarding time 30%", "High confidence"],
        ["31-60 days", "Experience", "Add reminders, reschedule, and attendance tracking", "Lower no-shows 10-15%", "Medium confidence"],
        ["61-90 days", "Growth", "Launch parent progress dashboard", "Improve retention and referrals", "Medium confidence"],
      ],
      topActions: [
        "Define matching logic by subject, level, and tutor rating.",
        "Create one-click booking confirmation flow.",
        "Add automated reminder sequence across email + SMS.",
        "Capture session outcomes to improve future matches.",
        "Track activation rate from signup to first session.",
      ],
      offer: "Web Apps (Primary), Landing Pages (Secondary)",
      metric: "Activation rate, time-to-first-session, retention",
      risks: [
        "Risk: Matching quality misses. Mitigation: tutor lead override in early phase.",
        "Risk: Feature bloat. Mitigation: strict release gating by KPI impact.",
        "Risk: Parent UX confusion. Mitigation: guided onboarding steps.",
      ],
      nextStep: "Ship a booking-focused MVP for one subject category and benchmark activation against current process.",
      chart: [55, 70, 82],
    },
    {
      category: "Web Apps",
      leadName: "Trevor James",
      company: "Apex Field Services",
      industry: "Field Service Operations",
      trafficUsers: "140 internal users; 3,800 jobs/month",
      teamSize: "73 employees",
      primaryGoal: "Build/improve web app",
      projectContext: "Technician dispatch, parts tracking, and customer updates are split across legacy tools.",
      bottlenecks: [
        "Disconnected systems increase dispatch errors and delays.",
        "Lack of mobile-first workflows hurts field adoption.",
      ],
      assumptions: "Assumes existing ERP can expose core job data.",
      plan: [
        ["0-30 days", "Core Flow", "Build dispatch board + mobile technician status updates", "Reduce scheduling conflicts 15%", "High confidence"],
        ["31-60 days", "Inventory", "Add parts request and availability checks", "Cut repeat visits 8-12%", "Medium confidence"],
        ["61-90 days", "Customer", "Automate customer ETA and completion updates", "Raise CSAT and reduce inbound calls", "Medium confidence"],
      ],
      topActions: [
        "Prioritize one field workflow with highest daily volume.",
        "Design mobile interaction to complete updates in under 20 seconds.",
        "Add alerting for overdue jobs and missing parts.",
        "Track jobs completed/tech/day before and after rollout.",
        "Run weekly feedback loop with 5 technicians.",
      ],
      offer: "Web Apps (Primary), AI Automation (Secondary)",
      metric: "Throughput, repeat-visit rate, app adoption",
      risks: [
        "Risk: Legacy integration delays. Mitigation: staged sync and fallback exports.",
        "Risk: Field usability issues. Mitigation: rapid mobile usability tests.",
        "Risk: Data latency. Mitigation: near-real-time sync for critical events.",
      ],
      nextStep: "Prototype the dispatch + technician status flow for one district and validate cycle-time improvement in week one.",
      chart: [50, 66, 78],
    },
    {
      category: "Web Apps",
      leadName: "Maya Singh",
      company: "UrbanCore Clinics",
      industry: "Multi-site Healthcare",
      trafficUsers: "260 staff users; 14,000 monthly patient interactions",
      teamSize: "110 employees",
      primaryGoal: "Build/improve web app",
      projectContext: "Care coordination and referral tracking rely on manual spreadsheets, creating follow-up gaps.",
      bottlenecks: [
        "Referral status tracking is manual and often stale.",
        "Care teams lack a shared task queue with ownership.",
      ],
      assumptions: "Assumes non-clinical workflow module can launch independently.",
      plan: [
        ["0-30 days", "MVP", "Build referral tracking queue with owner and due date", "Improve follow-up completion 20%", "High confidence"],
        ["31-60 days", "Coordination", "Add role-based dashboards by clinic", "Improve throughput visibility", "Medium confidence"],
        ["61-90 days", "Scale", "Expand to all sites + quality monitoring", "Sustain system-wide adoption", "Medium confidence"],
      ],
      topActions: [
        "Define referral lifecycle stages and SLA targets.",
        "Create shared queue with escalation triggers.",
        "Automate reminders for overdue follow-up tasks.",
        "Instrument clinic-level throughput and closure metrics.",
        "Run adoption training with site coordinators.",
      ],
      offer: "Web Apps (Primary), AI Automation (Secondary)",
      metric: "Referral cycle time, task closure rate, active users",
      risks: [
        "Risk: Workflow variance by clinic. Mitigation: core standard + local extensions.",
        "Risk: Security concerns. Mitigation: strict role permissions and audits.",
        "Risk: Change fatigue. Mitigation: phased deployment calendar.",
      ],
      nextStep: "Map referral handoff workflow in one clinic and deliver a clickable prototype for queue management this week.",
      chart: [53, 68, 79],
    },
  ];
}

function renderPlanPdf(plan) {
  const pdf = new PdfWriter();
  const links = [];
  const commands = [];

  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;
  const { r, g, b } = categoryColor(plan.category);

  const push = (cmd) => commands.push(cmd);

  function rect(x, y, w, h, fillColor) {
    push(`${fillColor.r.toFixed(3)} ${fillColor.g.toFixed(3)} ${fillColor.b.toFixed(3)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
  }

  function text(x, y, value, size = 10, bold = false, color = { r: 0.11, g: 0.13, b: 0.16 }) {
    push(`BT /${bold ? "F2" : "F1"} ${size.toFixed(2)} Tf ${color.r.toFixed(3)} ${color.g.toFixed(3)} ${color.b.toFixed(3)} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(value)}) Tj ET`);
  }

  function writeWrapped(x, y, width, value, size = 9, bold = false, color) {
    const lines = wrapLines(value, width, size);
    let cursorY = y;
    for (const line of lines) {
      text(x, cursorY, line, size, bold, color);
      cursorY -= size + 2;
    }
    return cursorY;
  }

  function linkText(x, y, value, url, size = 9) {
    const width = textWidth(value, size);
    text(x, y, value, size, true, { r: 0.04, g: 0.31, b: 0.74 });
    push(`0.040 0.310 0.740 RG ${x.toFixed(2)} ${(y - 1).toFixed(2)} m ${(x + width).toFixed(2)} ${(y - 1).toFixed(2)} l S`);
    links.push({ x1: x, y1: y - 2, x2: x + width, y2: y + size + 2, url });
  }

  rect(0, pageHeight - 108, pageWidth, 108, { r, g, b });
  text(margin, pageHeight - 42, "Growth Action Plan", 20, true, { r: 1, g: 1, b: 1 });
  text(margin, pageHeight - 66, `${plan.company} | ${plan.category}`, 11, false, { r: 0.92, g: 0.95, b: 1 });
  text(margin, pageHeight - 84, `Lead: ${plan.leadName}  |  Primary Goal: ${plan.primaryGoal}`, 10, false, { r: 0.92, g: 0.95, b: 1 });

  rect(margin, pageHeight - 166, contentWidth * 0.48, 46, { r: 0.95, g: 0.97, b: 1.0 });
  rect(margin + contentWidth * 0.52, pageHeight - 166, contentWidth * 0.48, 46, { r: 0.93, g: 0.97, b: 0.95 });
  text(margin + 10, pageHeight - 140, `Industry: ${plan.industry}`, 9, true);
  text(margin + 10, pageHeight - 154, `Team Size: ${plan.teamSize}`, 9);
  text(margin + contentWidth * 0.52 + 10, pageHeight - 140, `Traffic/Users: ${plan.trafficUsers}`, 9, true);
  text(margin + contentWidth * 0.52 + 10, pageHeight - 154, "Expected first measurable gains: 2-6 weeks", 9);

  let y = pageHeight - 190;
  text(margin, y, "1) Executive Summary", 11, true);
  y -= 14;
  const execBullets = [
    `Likely bottleneck: ${plan.bottlenecks[0]}`,
    `Fastest path: ${plan.plan[0][2]}`,
    `Expected impact: ${plan.plan[0][3]} (${plan.plan[0][4]}).`,
    `Context: ${plan.projectContext}`,
  ];
  for (const bullet of execBullets) {
    text(margin + 2, y, "-", 9, true);
    y = writeWrapped(margin + 12, y, contentWidth - 12, bullet, 8.7) - 1;
  }

  y -= 2;
  text(margin, y, "2) Opportunity Diagnosis", 11, true);
  y -= 13;
  const diagnosisLines = [
    `Primary: ${plan.bottlenecks[0]}`,
    `Secondary: ${plan.bottlenecks[1]}`,
    `Assumption: ${plan.assumptions}`,
  ];
  for (const line of diagnosisLines) {
    text(margin + 2, y, "-", 9, true);
    y = writeWrapped(margin + 12, y, contentWidth - 12, line, 8.5) - 1;
  }

  y -= 2;
  text(margin, y, "3) 30-60-90 Plan (Outcome-Based)", 11, true);
  y -= 12;
  const columns = [margin, margin + 82, margin + 196, margin + 354, margin + 488];
  text(columns[0], y, "Window", 8.5, true);
  text(columns[1], y, "Focus", 8.5, true);
  text(columns[2], y, "Action", 8.5, true);
  text(columns[3], y, "Impact", 8.5, true);
  text(columns[4], y, "Confidence", 8.5, true);
  y -= 9;
  push(`0.85 0.88 0.92 RG ${margin} ${y} m ${pageWidth - margin} ${y} l S`);
  y -= 2;

  for (const [window, focus, action, impact, confidence] of plan.plan) {
    const rowStart = y;
    const actionLines = wrapLines(action, 150, 8);
    const impactLines = wrapLines(impact, 128, 8);
    const rowHeight = Math.max(actionLines.length, impactLines.length, 1) * 10 + 2;
    text(columns[0], rowStart, window, 8);
    text(columns[1], rowStart, focus, 8);
    let ay = rowStart;
    actionLines.forEach((l) => {
      text(columns[2], ay, l, 8);
      ay -= 10;
    });
    let iy = rowStart;
    impactLines.forEach((l) => {
      text(columns[3], iy, l, 8);
      iy -= 10;
    });
    text(columns[4], rowStart, confidence, 8);
    y -= rowHeight;
    push(`0.92 0.93 0.95 RG ${margin} ${y + 4} m ${pageWidth - margin} ${y + 4} l S`);
  }

  y -= 2;
  text(margin, y, "4) Top 5 Priority Actions", 11, true);
  y -= 12;
  plan.topActions.forEach((action, idx) => {
    text(margin + 2, y, `${idx + 1}.`, 8.5, true);
    y = writeWrapped(margin + 16, y, contentWidth - 16, action, 8.3) - 1;
  });

  const chartBaseY = y - 6;
  text(margin, chartBaseY + 48, "Projected KPI Direction (30/60/90)", 8.5, true);
  const barX = margin + 215;
  const barWidth = 26;
  const gaps = 14;
  const maxHeight = 40;
  plan.chart.forEach((value, index) => {
    const h = (value / 100) * maxHeight;
    const x = barX + index * (barWidth + gaps);
    rect(x, chartBaseY, barWidth, h, { r: r * 0.85, g: g * 0.85, b: b * 0.85 });
    text(x + 3, chartBaseY - 10, ["30d", "60d", "90d"][index], 7.5);
  });

  y = chartBaseY - 18;
  text(margin, y, "5) Offer Recommendation + KPI Scorecard", 11, true);
  y -= 12;
  y = writeWrapped(margin + 2, y, contentWidth, `Recommended: ${plan.offer}. Track weekly: ${plan.metric}.`, 8.5) - 1;

  y -= 2;
  text(margin, y, "6) Risks & Mitigation", 11, true);
  y -= 12;
  plan.risks.forEach((risk) => {
    text(margin + 2, y, "-", 8.5, true);
    y = writeWrapped(margin + 12, y, contentWidth - 12, risk, 8.2) - 1;
  });

  y -= 2;
  text(margin, y, "7) Immediate Next Step", 11, true);
  y -= 11;
  y = writeWrapped(margin + 2, y, contentWidth, plan.nextStep, 8.5) - 2;
  y = writeWrapped(
    margin + 2,
    y,
    contentWidth,
    '"If useful, I can turn this into a hands-on execution sprint with milestones, owners, and delivery dates."',
    8.3,
    true
  );

  y -= 12;
  text(margin, y, "Book a strategy call:", 9.5, true);
  linkText(margin + 102, y, BOOKING_URL, BOOKING_URL, 9.5);
  y -= 13;
  text(margin, y, "Site:", 9.5, true);
  linkText(margin + 28, y, SITE_URL, SITE_URL, 9.5);

  text(pageWidth - margin - 180, 18, "Prepared by NexGen Studio", 8.2, false, { r: 0.4, g: 0.44, b: 0.52 });

  pdf.addPage({ width: pageWidth, height: pageHeight, content: commands.join("\n"), links });
  return pdf.toBuffer();
}

function writeIndex(plans) {
  const lines = [
    "# Growth Action Plan PDFs",
    "",
    `Generated on ${new Date().toISOString()}.`,
    "",
    `Booking link used: ${BOOKING_URL}`,
    `Site link used: ${SITE_URL}`,
    "",
  ];

  const categories = ["AI", "Landing Pages", "Web Apps"];
  for (const category of categories) {
    lines.push(`## ${category}`);
    plans
      .filter((plan) => plan.category === category)
      .forEach((plan) => {
        const filename = `${slugify(category)}-${slugify(plan.company)}.pdf`;
        lines.push(`- ${plan.company} (${plan.industry}) -> ${filename}`);
      });
    lines.push("");
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, "README.md"), lines.join("\n"), "utf8");
}

function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const plans = buildPlanData();

  for (const plan of plans) {
    const filename = `${slugify(plan.category)}-${slugify(plan.company)}.pdf`;
    const outPath = path.join(OUTPUT_DIR, filename);
    const pdf = renderPlanPdf(plan);
    fs.writeFileSync(outPath, pdf);
  }

  writeIndex(plans);
  console.log(`Generated ${plans.length} PDFs in ${OUTPUT_DIR}`);
}

main();
