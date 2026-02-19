export function scrollToSection(href: string) {
  if (typeof window === "undefined") return;
  if (!href.startsWith("#")) return;

  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const section = document.querySelector(href) as HTMLElement | null;
  if (!section) return;

  // For contact, land on the section's main card container.
  const contactAnchor = href === "#contact"
    ? (section.querySelector("[data-scroll-anchor]") as HTMLElement | null)
    : null;
  const firstText = section.querySelector("p, h2") as HTMLElement | null;
  const target = contactAnchor || firstText || section;
  const headerH = window.innerWidth < 768 ? 84 : 88;
  const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;

  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", href);
}
