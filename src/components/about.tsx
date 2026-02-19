"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Users, Clock, ShieldCheck, Linkedin, ChevronDown } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const team = [
  {
    initials: "RP",
    name: "Ramiro Pinedo",
    role: "Founder & Lead Developer",
    bio: "Full-stack engineer and product strategist. Leads every client engagement from architecture through launch.",
    gradient: "from-amber via-orange-400 to-orange-500",
    ringColor: "ring-amber/20",
    isFounder: true,
    linkedin: "#",
    hoverBorder: "hover:border-amber/30",
    hoverGlow: "from-amber/[0.08]",
    about: {
      paragraphs: [
        "Full-stack developer and designer with a passion for building products that actually move the needle. With experience across SaaS platforms, AI integrations, and high-conversion landing pages, I bring both the technical depth and product instinct to turn complex problems into clean, scalable solutions.",
        "I work directly with every client, from discovery through launch, to keep communication fast and decisions grounded in business goals.",
      ],
      skills: [
        "React", "Next.js", "TypeScript", "Node.js",
        "Python", "AI / LLM", "PostgreSQL", "AWS",
      ],
    },
  },
  {
    initials: "SM",
    name: "Sofia Marchetti",
    role: "UI/UX Designer",
    bio: "Turns complex user flows into clean, on-brand interfaces that are as intuitive as they are conversion-focused.",
    gradient: "from-blue-400 via-violet-500 to-purple-500",
    ringColor: "ring-violet-200",
    isFounder: false,
    hoverBorder: "hover:border-violet-200",
    hoverGlow: "from-violet-50/70",
    about: {
      paragraphs: [
        "Product designer focused on simplifying complex workflows for B2B and SaaS products. I translate messy requirements into clean interfaces users can understand on first use.",
        "I typically lead wireframes, visual systems, and prototype testing, then partner closely with engineering to keep design quality high through implementation.",
      ],
      skills: [
        "Figma", "User Flows", "Design Systems", "UX Research",
        "Prototyping", "Accessibility",
      ],
    },
  },
  {
    initials: "JO",
    name: "James Okafor",
    role: "Project Manager",
    bio: "Keeps every engagement on scope, on time, and stress-free — so clients always know where things stand.",
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    ringColor: "ring-green-200",
    isFounder: false,
    hoverBorder: "hover:border-green-200",
    hoverGlow: "from-green-50/70",
    about: {
      paragraphs: [
        "Project manager with a background in digital product delivery for startups and small teams. I keep timelines realistic, risks visible, and communication consistent.",
        "My role is turning strategy into weekly momentum by coordinating scope, dependencies, and feedback so projects move forward without surprises.",
      ],
      skills: [
        "Agile Delivery", "Sprint Planning", "Client Communication", "QA Coordination",
        "Risk Tracking", "Notion / Jira",
      ],
    },
  },
  {
    initials: "KN",
    name: "Kai Nakamura",
    role: "AI Solutions Architect",
    bio: "Designs the LLM pipelines, custom agents, and data integrations that power our AI-driven products.",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    ringColor: "ring-indigo-200",
    isFounder: false,
    hoverBorder: "hover:border-blue-200",
    hoverGlow: "from-blue-50/70",
    about: {
      paragraphs: [
        "AI engineer focused on practical applications of LLMs for internal tools and customer-facing products. I design reliable retrieval, prompting, and evaluation workflows.",
        "I prioritize measurable outcomes over hype, making sure model integrations are secure, maintainable, and useful in day-to-day operations.",
      ],
      skills: [
        "LLM Workflows", "RAG", "Prompt Engineering", "Python",
        "Model Evaluation", "Vector Databases",
      ],
    },
  },
];

const reasons = [
  {
    icon: Users,
    title: "Partner, Not Vendor",
    description:
      "We take on fewer clients so we can go deep. Your goals become our goals — and we stay involved long after launch day.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    hoverBorder: "hover:border-blue-200",
    hoverGlow: "from-blue-50/70",
  },
  {
    icon: Clock,
    title: "Weekly Deliverables",
    description:
      "No months of radio silence. You see working progress every week with demos, feedback loops, and clear next steps.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    hoverBorder: "hover:border-violet-200",
    hoverGlow: "from-violet-50/70",
  },
  {
    icon: ShieldCheck,
    title: "Code You Can Trust",
    description:
      "Clean architecture, automated tests, and real documentation. Your next developer will thank you (and us).",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    hoverBorder: "hover:border-green-200",
    hoverGlow: "from-green-50/70",
  },
  {
    icon: CheckCircle2,
    title: "Tied to Your KPIs",
    description:
      "Every design and engineering decision maps to a business outcome. If it doesn't move the needle, we don't build it.",
    iconBg: "bg-amber-muted",
    iconColor: "text-amber",
    hoverBorder: "hover:border-amber/30",
    hoverGlow: "from-amber/[0.07]",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We learn your business, your users, and what success looks like. You walk away with clarity — even if we're not the right fit.",
    accent: "text-blue-500",
    dot: "bg-blue-400",
    pinBg: "bg-blue-500",
    pinShadow: "shadow-blue-200",
    hoverBorder: "hover:border-blue-200",
    hoverGlow: "from-blue-50/70",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    description:
      "We map out the technical approach, define milestones, and give you a transparent, fixed-scope proposal.",
    accent: "text-violet-500",
    dot: "bg-violet-400",
    pinBg: "bg-violet-500",
    pinShadow: "shadow-violet-200",
    hoverBorder: "hover:border-violet-200",
    hoverGlow: "from-violet-50/70",
  },
  {
    step: "03",
    title: "Build & Iterate",
    description:
      "Agile sprints with weekly demos. You're in the loop at every step, and can change direction without starting over.",
    accent: "text-amber",
    dot: "bg-amber",
    pinBg: "bg-amber",
    pinShadow: "shadow-amber/30",
    hoverBorder: "hover:border-amber/30",
    hoverGlow: "from-amber/[0.07]",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description:
      "We deploy, monitor performance, and optimize based on real user data. Then we help you scale what's working.",
    accent: "text-green-600",
    dot: "bg-green-400",
    pinBg: "bg-green-500",
    pinShadow: "shadow-green-200",
    hoverBorder: "hover:border-green-200",
    hoverGlow: "from-green-50/70",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function About() {
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});

  return (
    <SectionShell id="about">

      {/* ── Team ── */}
      <SectionHeader
        eyebrow="The Team"
        title="Small by design, mighty in execution"
        description="A tight-knit group of specialists who care about craft. Every role exists for a reason — and every client feels it."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {team.map((member) => (
          <motion.article
            key={member.name}
            variants={cardVariants}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/8 ${member.hoverBorder}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${member.hoverGlow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
            {/* Founder badge */}
            {member.isFounder && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-amber-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber">
                Founder
              </span>
            )}

            {/* Avatar */}
            <div
              className={`relative z-10 h-14 w-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-md ring-4 ${member.ringColor}`}
            >
              <span className="text-lg font-bold text-white">{member.initials}</span>
            </div>

            {/* Identity */}
            <div className="relative z-10 mt-4 flex-1">
              <h3 className="text-base font-bold text-foreground">{member.name}</h3>
              <p className="mt-0.5 text-sm font-medium text-muted-foreground">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

              {/* Expandable detail */}
              {member.about && (
                <>
                  <button
                    onClick={() =>
                      setExpandedMembers((prev) => ({
                        ...prev,
                        [member.name]: !prev[member.name],
                      }))
                    }
                    className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber transition-colors hover:text-orange-500"
                  >
                    About me
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${expandedMembers[member.name] ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedMembers[member.name] && (
                      <motion.div
                        key={`${member.name}-detail`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 border-t border-black/6 pt-4">
                          {member.about.paragraphs.map((paragraph, index) => (
                            <p
                              key={`${member.name}-paragraph-${index}`}
                              className={`text-sm leading-relaxed text-muted-foreground ${index > 0 ? "mt-2.5" : ""}`}
                            >
                              {paragraph}
                            </p>
                          ))}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {member.about.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-lg border border-black/8 bg-black/[0.02] px-2.5 py-1 font-mono text-xs font-medium text-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* LinkedIn — founder only */}
            {member.isFounder && (
              <div className="relative z-10 mt-5 border-t border-black/6 pt-4">
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-blue-600"
                >
                  <Linkedin size={13} />
                  LinkedIn
                </a>
              </div>
            )}
          </motion.article>
        ))}
      </motion.div>

      {/* ── Why Us + Our Process ── */}
      <div id="why-us" className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-16">

        {/* Why Us */}
        <div>
          <SectionHeader
            eyebrow="Why Us"
            title="A focused team that ships"
            description="We keep our client roster small so each project gets direct senior attention from strategy to launch."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className={`group relative overflow-hidden rounded-2xl border border-black/8 bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${reason.hoverBorder}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.hoverGlow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="relative z-10">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${reason.iconBg} ${reason.iconColor}`}>
                    <reason.icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Our Process */}
        <div>
          <SectionHeader
            eyebrow="Our Process"
            title="Four steps, zero surprises"
            description="You get weekly progress, clear milestones, and direct communication from kickoff through post-launch."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative mt-8 space-y-3"
          >
            <div className="absolute left-[1.85rem] top-10 bottom-10 w-px bg-gradient-to-b from-black/8 via-black/6 to-transparent" />

            {processSteps.map((step) => (
              <article
                key={step.step}
                className={`group relative flex gap-4 overflow-hidden rounded-2xl border border-black/8 bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${step.hoverBorder}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.hoverGlow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="relative shrink-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-black/8 shadow-sm font-mono text-sm font-bold ${step.accent}`}>
                    {step.step}
                  </div>
                  <div className={`absolute -right-[0.65rem] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${step.dot} ring-2 ring-white`} />
                </div>
                <div className="relative z-10 pt-0.5">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

      </div>
    </SectionShell>
  );
}
