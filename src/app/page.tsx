import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import { Fragment } from "react";

const sections = [Hero, Services, Portfolio, About, Testimonials, CTA];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {sections.map((Section, index) => (
          <Fragment key={Section.name}>
            <Section />
            {index < sections.length - 1 ? <div className="section-divider" /> : null}
          </Fragment>
        ))}
      </main>
      <Footer />
    </>
  );
}
