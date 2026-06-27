import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Landing Pages", href: "#services" },
    { label: "Business Websites", href: "#services" },
    { label: "Advanced Builds", href: "#services" },
  ],
  Company: [
    { label: "How It Works", href: "#about" },
    { label: "Sample Sites", href: "#work" },
    { label: "Project Inquiry", href: "#contact" },
  ],
  Resources: [
    { label: "Request a Quote", href: "#contact" },
    { label: "Our Work", href: "#work" },
    { label: "Services", href: "#services" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://x.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@nexgen.studio", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-black/8 bg-card/60">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mineral/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mineral font-mono text-sm font-bold text-white">
                N
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                NexGen<span className="text-mineral">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Custom websites for service businesses that need to look established, explain the offer
              clearly, and turn visitors into qualified inquiries.
            </p>
            <a
              href="mailto:hello@nexgen.studio"
              className="mt-3 inline-flex text-xs text-muted-foreground transition hover:text-mineral"
            >
              hello@nexgen.studio
            </a>
            <div className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/8 bg-card text-muted-foreground shadow-sm transition hover:border-mineral/30 hover:text-mineral hover:shadow-md"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition hover:text-mineral"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-black/6 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground/80">
            &copy; {new Date().getFullYear()} NexGen Studio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-xs text-muted-foreground/80 transition hover:text-mineral">
              Privacy Policy
            </a>
            <a href="/terms" className="text-xs text-muted-foreground/80 transition hover:text-mineral">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
