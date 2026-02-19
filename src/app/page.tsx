import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import MobileStickyCta from "@/components/mobile-sticky-cta";
import { Fragment } from "react";

const sections = [Hero, Services, Portfolio, About, Testimonials, CTA];

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Home({ searchParams }: PageProps) {
  const intentParam = searchParams?.intent;
  const sourceParam = searchParams?.source;
  const rawIntent = Array.isArray(intentParam) ? intentParam[0] : intentParam;
  const rawSource = Array.isArray(sourceParam) ? sourceParam[0] : sourceParam;
  const intent = (rawIntent ?? "").toLowerCase();
  const source = (rawSource ?? "").toLowerCase();
  const targeting = `${intent} ${source}`;

  const heroVariant =
    intent === "ai" || targeting.includes(" ai")
      ? "ai"
      : intent === "web" || intent === "website" || targeting.includes(" web") || targeting.includes(" site")
        ? "web"
        : intent === "app" || intent === "product" || targeting.includes(" app")
          ? "app"
        : "default";

  return (
    <>
      <Navbar />
      <main id="main-content">
        {sections.map((Section, index) => (
          <Fragment key={Section.name}>
            {Section === Hero ? <Hero variant={heroVariant} /> : <Section />}
            {index < sections.length - 1 ? <div className="section-divider" /> : null}
          </Fragment>
        ))}
      </main>
      <MobileStickyCta />
      <Footer />
    </>
  );
}
