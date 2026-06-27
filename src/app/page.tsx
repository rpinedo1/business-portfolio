import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import StatsBand from "@/components/stats-band";
import MarqueeStrip from "@/components/marquee-strip";
import Transformation from "@/components/transformation";
import Faq from "@/components/faq";
import DemoTeaser from "@/components/demo-teaser";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import MobileStickyCta from "@/components/mobile-sticky-cta";
import ScrollProgress from "@/components/demo/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <StatsBand />
        <MarqueeStrip />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Portfolio />
        <div className="section-divider" />
        <Transformation />
        <div className="section-divider" />
        <DemoTeaser />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Faq />
        <div className="section-divider" />
        <CTA />
      </main>
      <MobileStickyCta />
      <Footer />
    </>
  );
}
