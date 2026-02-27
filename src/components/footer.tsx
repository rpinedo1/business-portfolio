import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Free Landing Page", href: "#services" },
    { label: "AI Features", href: "#services" },
    { label: "Custom Features", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Get Your $0 Setup Page", href: "#contact" },
    { label: "Our Work", href: "#work" },
    { label: "How It Works", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
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
    <footer className="relative border-t border-black/8 bg-white/60">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-mono text-sm font-bold text-white">
                N
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                NexGen<span className="text-amber">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              $0 setup landing pages for small businesses. Grow with AI when you&apos;re ready.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/8 bg-white text-muted-foreground shadow-sm transition hover:border-amber/30 hover:text-amber hover:shadow-md"
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
                      className="text-sm text-muted-foreground transition hover:text-amber"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/6 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground/80">
            &copy; {new Date().getFullYear()} NexGen Studio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/80">Built with precision and care.</p>
        </div>
      </div>
    </footer>
  );
}
