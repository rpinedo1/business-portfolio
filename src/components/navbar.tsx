"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to-section";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-position-based active tracking — much more reliable than IntersectionObserver
  useEffect(() => {
    const update = () => {
      const headerH = window.innerWidth < 768 ? 84 : 88;
      // Look-ahead: consider a link active once its section top passes 50% of the header height
      const threshold = window.scrollY + headerH + 60;

      let current = "";
      for (const { href } of navLinks) {
        const el = document.querySelector(href) as HTMLElement | null;
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= threshold) current = href;
      }
      setActiveHref(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Update active immediately on click — don't wait for scroll detection
    if (href !== "#") setActiveHref(href);
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-black/8 bg-white/90 shadow-sm shadow-black/[0.04] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="group flex items-center gap-2.5" onClick={(e) => handleNavClick(e, "#")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-mono text-sm font-bold text-white transition-transform group-hover:scale-105">
              N
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              NexGen<span className="text-amber">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`rounded-lg px-4 py-2 text-sm transition-all duration-150 ${
                  activeHref === link.href
                    ? "bg-amber/[0.10] font-semibold text-amber"
                    : "font-medium text-muted-foreground hover:text-foreground"
                }`}
                aria-current={activeHref === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden rounded-xl bg-amber px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-amber/25 transition hover:brightness-105 md:inline-flex"
          >
            Book a Call
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-black/[0.05] hover:text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
              aria-label="Close menu overlay"
            />
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-2xl border border-black/10 bg-white/97 p-3 shadow-xl shadow-black/10 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`rounded-lg px-4 py-3 text-sm transition-all duration-150 ${
                      activeHref === link.href
                        ? "bg-amber/[0.08] font-semibold text-amber"
                        : "font-medium text-muted-foreground hover:bg-black/[0.03] hover:text-foreground"
                    }`}
                    aria-current={activeHref === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="mt-2 rounded-xl bg-amber px-5 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-amber/25 transition hover:brightness-105"
                >
                  Book a Call
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
