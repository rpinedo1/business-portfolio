import type { Metadata } from "next";
import { Toaster } from "sonner";
import WebglHero from "@/components/demo/webgl-hero";
import Gallery from "@/components/demo/gallery";
import ScrollProgress from "@/components/demo/scroll-progress";

export const metadata: Metadata = {
  title: "Interactive Capabilities | NexGen Studio",
  description:
    "A live showcase of the interactive effects, motion, and 3D experiences NexGen Studio can build into your website.",
};

export default function DemoPage() {
  return (
    <main className="bg-[#0c1016]">
      <ScrollProgress />
      <WebglHero />
      <Gallery />
      <Toaster theme="dark" position="bottom-center" richColors />
    </main>
  );
}
