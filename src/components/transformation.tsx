"use client";

import { useRef, useState } from "react";
import { MoveHorizontal, Star, Wrench, Droplets, Flame, Phone } from "lucide-react";
import { SectionHeader } from "@/components/section-shell";

/** A "before" (dated) website mock — cramped, clashing, serif. */
function BeforeMock() {
  return (
    <div className="absolute inset-0 select-none bg-[#dcdcd6] p-4 font-serif text-[#2a2a2a]">
      <div className="flex items-center justify-between border-b-2 border-[#888] pb-2">
        <span className="text-sm font-bold text-[#7a1f1f]">★ Joe&apos;s Plumbing ★</span>
        <div className="flex gap-2 text-[10px] text-[#1a3aa0] underline">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="mt-2 bg-[#fff3a0] py-1 text-center text-[11px] font-bold text-[#b00]">
        ★★★ WELCOME TO OUR WEBSITE!!! ★★★
      </div>
      <p className="mt-3 text-[11px] leading-tight">
        We are the best plumbers in town since 1998. Call us today for all your
        plumbing needs we do everything!!! Best prices guaranteed!!!
      </p>
      <div className="mt-2 flex gap-1">
        <div className="h-12 w-16 border border-[#999] bg-[#bbb]" />
        <div className="h-12 w-16 border border-[#999] bg-[#bbb]" />
        <div className="h-12 w-16 border border-[#999] bg-[#bbb]" />
      </div>
      <button className="mt-3 border-2 border-[#444] bg-[#cdcdcd] px-3 py-1 text-[10px]">
        Click Here!!!
      </button>
    </div>
  );
}

/** An "after" (modern) website mock — clean, branded, confident. */
function AfterMock() {
  const services = [
    { icon: Wrench, label: "Repairs" },
    { icon: Droplets, label: "Drains" },
    { icon: Flame, label: "Water heaters" },
  ];
  return (
    <div className="absolute inset-0 select-none bg-gradient-to-b from-[#fdfaf3] to-[#eef3f0] p-4 sm:p-6">
      {/* Nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-lg bg-mineral text-[10px] font-bold text-white">
            JP
          </div>
          <span className="text-xs font-bold tracking-tight text-foreground">
            Joe&apos;s Plumbing
          </span>
        </div>
        <div className="hidden items-center gap-3 text-[10px] font-medium text-muted-foreground sm:flex">
          <span>Services</span>
          <span>Reviews</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-mineral px-2.5 py-1 text-white">
            <Phone size={9} /> Book now
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[1.25fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mineral/25 bg-mineral-muted px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-mineral">
            Licensed &amp; insured
          </span>
          <div className="font-display mt-2 text-xl leading-[1.1] text-foreground sm:text-[1.7rem]">
            Fast, trusted plumbing in{" "}
            <span className="italic text-mineral">24 hours</span>
          </div>
          {/* Rating */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={11} className="fill-[#e3b049] text-[#e3b049]" />
              ))}
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">
              4.9 · 212 reviews
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="rounded-lg bg-mineral px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm shadow-mineral/30">
              Get a free quote
            </div>
            <div className="rounded-lg border border-black/10 bg-card px-3 py-1.5 text-[10px] font-semibold text-foreground">
              (305) 555-0142
            </div>
          </div>
        </div>

        {/* Preview / image card */}
        <div className="relative hidden overflow-hidden rounded-xl border border-black/8 bg-gradient-to-br from-mineral/90 to-plum-depth shadow-md sm:block">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-card/95 p-2 shadow-sm backdrop-blur">
            <div className="h-1.5 w-2/3 rounded-full bg-foreground/20" />
            <div className="mt-1 h-1.5 w-1/2 rounded-full bg-foreground/10" />
          </div>
          <div className="absolute right-2 top-2 rounded-full bg-[#e3b049] px-2 py-0.5 text-[8px] font-bold text-[#3a2a08]">
            24/7
          </div>
        </div>
      </div>

      {/* Service tiles */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {services.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="rounded-lg border border-black/8 bg-card p-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
          >
            <div className="grid h-6 w-6 place-items-center rounded-md bg-mineral-muted text-mineral">
              <Icon size={13} />
            </div>
            <p className="mt-1.5 text-[10px] font-semibold text-foreground">{label}</p>
            <div className="mt-1 h-1 w-10 rounded-full bg-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="anchor-section px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="The Difference"
          title="From dated to undeniable"
          description="Drag the handle to see the kind of jump most service businesses get — from a site that costs them trust to one that earns it."
          align="center"
        />

        <div
          ref={ref}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setFromX(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          className="relative mx-auto mt-12 h-[300px] w-full max-w-3xl cursor-ew-resize touch-none overflow-hidden rounded-2xl border border-black/10 shadow-luxe sm:h-[400px]"
        >
          <AfterMock />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <BeforeMock />
          </div>

          {/* Labels */}
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Before
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-mineral px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            After
          </span>

          {/* Handle */}
          <div className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-mineral shadow-lg ring-1 ring-black/10">
              <MoveHorizontal size={16} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
