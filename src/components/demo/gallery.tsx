"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import EffectTile from "./effect-tile";
import TiltCard from "./effects/tilt-card";
import MagneticButton from "./effects/magnetic-button";
import TextScramble from "./effects/text-scramble";
import CountUp from "./effects/count-up";
import DraggableGallery from "./effects/draggable-gallery";
import ParallaxReveal from "./effects/parallax-reveal";
import AuroraCard from "./effects/aurora-card";
import SpotlightCard from "./effects/spotlight-card";
import Marquee from "./effects/marquee";
import FlipCard from "./effects/flip-card";
import BeforeAfter from "./effects/before-after";
import ToastButton from "./effects/toast-button";
import MorphBlob from "./effects/morph-blob";
import DotGrid from "./effects/dot-grid";
import Accordion from "./effects/accordion";
import AnimatedTabs from "./effects/animated-tabs";
import ReorderList from "./effects/reorder-list";
import ConfettiButton from "./effects/confetti-button";
import CardStack from "./effects/card-stack";
import GradientBorder from "./effects/gradient-border";
import ShimmerText from "./effects/shimmer-text";
import ProgressRing from "./effects/progress-ring";
import StarRating from "./effects/star-rating";
import PricingToggle from "./effects/pricing-toggle";
import FloatingLabel from "./effects/floating-label";
import AnimatedCheck from "./effects/animated-check";
import CopyClipboard from "./effects/copy-clipboard";
import RangeSlider from "./effects/range-slider";
import ThemeToggle from "./effects/theme-toggle";
import Stepper from "./effects/stepper";
import SkeletonLoader from "./effects/skeleton-loader";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative bg-[#0c1016] px-6 pb-28 pt-20 text-white lg:px-8"
    >
      {/* Ambient top glow bleeding from the hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(5,96,91,0.18),transparent)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8fd6cf]">
            The effects menu
          </span>
          <h2 className="font-display mt-4 text-[2rem] leading-[1.1] sm:text-[2.7rem]">
            Real, working interactions &mdash;{" "}
            <em className="italic text-[#e3c489]">not screenshots.</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            Play with each one. Everything here runs on real devices, degrades
            gracefully, and respects reduced-motion. Pick the pieces that fit your
            brand and I&apos;ll build them in.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <EffectTile
            className="lg:col-span-3"
            title="3D Tilt Cards"
            caption="Cards that respond to the cursor with real depth — and tilt with device motion on a phone."
            useCase="Products"
            hint="Hover / Tilt"
          >
            <TiltCard />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Magnetic Buttons"
            caption="CTAs that lean toward the cursor so they feel alive — taps ripple on touch devices."
            useCase="CTAs"
            hint="Hover / Tap"
          >
            <MagneticButton />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Text Scramble"
            caption="Headlines that decode into place. Great for a punchy, memorable hero line."
            useCase="Headlines"
            hint="Tap"
          >
            <TextScramble />
          </EffectTile>

          <EffectTile
            className="lg:col-span-4"
            title="Animated Counters"
            caption="Stats and proof points that count up the moment they scroll into view."
            useCase="Proof"
            hint="Scroll"
          >
            <CountUp />
          </EffectTile>

          <EffectTile
            className="lg:col-span-4"
            title="Draggable Gallery"
            caption="Throwable, momentum-based card rows for portfolios and product lineups."
            useCase="Portfolio"
            hint="Drag"
          >
            <DraggableGallery />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Parallax Depth"
            caption="Layers that move at different speeds on scroll for a cinematic sense of depth."
            useCase="Story"
            hint="Scroll"
          >
            <ParallaxReveal />
          </EffectTile>

          <EffectTile
            className="lg:col-span-6"
            title="Living Backgrounds"
            caption="Soft, drifting aurora gradients that give a page atmosphere without a single image."
            useCase="Atmosphere"
          >
            <AuroraCard />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Spotlight"
            caption="A glow that follows the cursor — or your finger — to make any card feel interactive."
            useCase="Cards"
            hint="Move / Touch"
          >
            <SpotlightCard />
          </EffectTile>

          <EffectTile
            className="lg:col-span-4"
            title="Infinite Marquee"
            caption="A smooth, looping ticker for logos, tech, or services. Runs effortlessly on mobile."
            useCase="Logos"
          >
            <Marquee />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Flip Cards"
            caption="Tap to flip and reveal details or pricing on the back. Great for service tiles."
            useCase="Services"
            hint="Tap"
          >
            <FlipCard />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Before / After"
            caption="A draggable reveal slider — perfect for showing a redesign or transformation."
            useCase="Proof"
            hint="Drag"
          >
            <BeforeAfter />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Live Notifications"
            caption="Real toast alerts for bookings, payments, or new leads. Tap to see one fire."
            useCase="Feedback"
            hint="Tap"
          >
            <ToastButton />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Organic Shapes"
            caption="Soft, morphing blobs that add personality without feeling busy."
            useCase="Atmosphere"
          >
            <MorphBlob />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Interactive Dot Grid"
            caption="A reactive texture that lights up under the cursor or a fingertip."
            useCase="Backgrounds"
            hint="Move / Touch"
          >
            <DotGrid />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Smooth Accordion"
            caption="Animated expand/collapse for FAQs and details — tidy on any screen."
            useCase="FAQ"
            hint="Tap"
          >
            <Accordion />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Animated Tabs"
            caption="A sliding indicator and crossfading content for switching between views."
            useCase="Navigation"
            hint="Tap"
          >
            <AnimatedTabs />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Drag to Reorder"
            caption="Reorderable lists with spring physics — works with mouse and touch."
            useCase="Web apps"
            hint="Drag"
          >
            <ReorderList />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Confetti Burst"
            caption="A celebratory burst for successful bookings, signups, or purchases."
            useCase="Delight"
            hint="Tap"
          >
            <ConfettiButton />
          </EffectTile>

          <EffectTile
            className="lg:col-span-3"
            title="Swipeable Cards"
            caption="A throwable card stack for testimonials, results, or product highlights."
            useCase="Proof"
            hint="Swipe"
          >
            <CardStack />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Glowing Borders"
            caption="An animated gradient frame that makes a featured card impossible to miss."
            useCase="Featured"
          >
            <GradientBorder />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Shimmer Headlines"
            caption="A moving sheen for hero lines and premium callouts."
            useCase="Headlines"
          >
            <ShimmerText />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Progress Rings"
            caption="Circular meters that draw and count up on view — great for stats."
            useCase="Stats"
            hint="Scroll"
          >
            <ProgressRing />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Star Ratings"
            caption="Interactive ratings for reviews and feedback widgets."
            useCase="Reviews"
            hint="Tap"
          >
            <StarRating />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Pricing Toggle"
            caption="Animated billing switch with a rolling price — ideal for plan tables."
            useCase="Pricing"
            hint="Tap"
          >
            <PricingToggle />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Floating Labels"
            caption="Polished form fields where the label animates out of the way as you type."
            useCase="Forms"
            hint="Type"
          >
            <FloatingLabel />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Success Check"
            caption="A self-drawing checkmark to confirm a booking, payment, or submission."
            useCase="Feedback"
            hint="Tap"
          >
            <AnimatedCheck />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Copy to Clipboard"
            caption="One-tap copy with instant confirmation — handy for emails and codes."
            useCase="Utility"
            hint="Tap"
          >
            <CopyClipboard />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Range Slider"
            caption="A smooth, touch-friendly slider with a live value — great for quote tools."
            useCase="Web apps"
            hint="Drag"
          >
            <RangeSlider />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Mode Switch"
            caption="A tactile day/night toggle with a sliding, color-shifting knob."
            useCase="Settings"
            hint="Tap"
          >
            <ThemeToggle />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Multi-step Flow"
            caption="A progress stepper for onboarding, checkout, or booking flows."
            useCase="Web apps"
            hint="Tap"
          >
            <Stepper />
          </EffectTile>

          <EffectTile
            className="lg:col-span-2"
            title="Skeleton Loading"
            caption="Shimmering placeholders that keep a page feeling fast while data loads."
            useCase="Performance"
            hint="Tap"
          >
            <SkeletonLoader />
          </EffectTile>
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c5450]/40 to-[#3a2050]/30 p-8 text-center backdrop-blur sm:p-12"
        >
          <h3 className="font-display text-2xl sm:text-3xl">
            Want any of these on your site?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Tell me which effects caught your eye and I&apos;ll fold them into a
            build that actually fits your business.
          </p>
          <Link
            href="/#contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0c1016] transition hover:bg-[#e3c489]"
          >
            Request a Quote
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
