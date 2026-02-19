import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import MobileStickyCta from "@/components/mobile-sticky-cta";
import { landingFlags } from "@/lib/landing-flags";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const intentParam = params.intent;
  const sourceParam = params.source;
  const heroParam = params.hero;
  const abParam = params.ab;
  const rawIntent = Array.isArray(intentParam) ? intentParam[0] : intentParam;
  const rawSource = Array.isArray(sourceParam) ? sourceParam[0] : sourceParam;
  const rawHero = Array.isArray(heroParam) ? heroParam[0] : heroParam;
  const rawAb = Array.isArray(abParam) ? abParam[0] : abParam;
  const intent = (rawIntent ?? "").toLowerCase();
  const source = (rawSource ?? "").toLowerCase();
  const hero = (rawHero ?? "").toLowerCase();
  const ab = (rawAb ?? "").toLowerCase();
  const targeting = `${intent} ${source}`;

  const heroVariant = landingFlags.enableIntentMatching
    ? intent === "ai" || targeting.includes(" ai")
      ? "ai"
      : intent === "web" || intent === "website" || targeting.includes(" web") || targeting.includes(" site")
        ? "web"
        : intent === "app" || intent === "product" || targeting.includes(" app")
          ? "app"
          : "default"
    : "default";

  const heroVisualVariant = landingFlags.enableHeroAbQuery
    ? hero === "control" || hero === "a" || ab === "a"
      ? "control"
      : hero === "creative" || hero === "b" || ab === "b"
        ? "creative"
        : landingFlags.defaultHeroVisual
    : landingFlags.defaultHeroVisual;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero
          variant={heroVariant}
          visualVariant={heroVisualVariant}
          showCroBlocks={landingFlags.croEnabled}
        />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Portfolio />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <CTA advancedMode={landingFlags.croEnabled} />
      </main>
      {landingFlags.showMobileStickyCta ? <MobileStickyCta /> : null}
      <Footer />
    </>
  );
}
