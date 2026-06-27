"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const samples = [
  {
    title: "Law Firm Website Builder",
    type: "Service business website",
    url: "https://law-firm-website-builder.vercel.app/",
    description:
      "A serious service-business site: clear positioning, trust signals, practice areas, and an intake path that feels professional.",
    details: ["Trust-first layout", "Service page structure", "Clear intake flow"],
    image: "/sample-sites/law-firm-top.png",
    accent: "bg-mineral",
    tint: "from-mineral to-plum-depth",
  },
  {
    title: "Modern Engaging Web App",
    type: "Product and web app sample",
    url: "https://modern-engaging-web-app.vercel.app/",
    description:
      "A product-style build with a sharp landing page, dashboard previews, workflow screens, and enough detail to feel real.",
    details: ["Product landing page", "Dashboard UI", "Workflow screens"],
    image: "/sample-sites/revive-top.png",
    accent: "bg-plum-depth",
    tint: "from-plum-depth to-[#0d5c63]",
  },
];

export default function Portfolio() {
  return (
    <SectionShell id="work" className="relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="Sample Sites"
            title="Live builds you can click through"
            description="Don't take my word for the quality — open these and judge it yourself. This is the structure, polish, and interaction I'll bring to your site."
            className="max-w-2xl"
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {samples.map((sample, index) => (
            <motion.article
              key={sample.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="shadow-luxe overflow-hidden rounded-2xl border border-black/8 bg-card transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${sample.tint}`}>
                  <Image
                    alt={`${sample.title} homepage preview`}
                    src={sample.image}
                    width={1440}
                    height={760}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                  <div className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {sample.type}
                  </div>
                </div>
                <div className="border-y border-black/8 bg-surface px-5 py-3">
                  <a
                    href={sample.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-foreground/90 sm:w-auto"
                  >
                    Visit sample site
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="p-6 text-left">
                <h3 className="font-display text-2xl text-foreground">{sample.title}</h3>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                  {sample.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {sample.details.map((detail) => (
                    <span
                      key={detail}
                      className="rounded-full border border-black/8 bg-black/[0.025] px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
