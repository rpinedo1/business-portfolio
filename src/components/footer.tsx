import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Web Applications", href: "#services" },
    { label: "Websites", href: "#services" },
    { label: "AI Solutions", href: "#services" },
    { label: "Performance Audits", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#work" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@nexgen.studio", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#141419]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-mono text-sm font-bold text-amber-foreground">
                N
              </div>
              <span className="text-lg font-semibold tracking-tight">
                NexGen<span className="text-amber">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Web apps, websites, and AI products — designed for growth
              and engineered to last.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-muted-foreground transition-all hover:border-amber/20 hover:text-amber"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} NexGen Studio. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Built with precision. Engineered for results.
          </p>
        </div>
      </div>
    </footer>
  );
}
