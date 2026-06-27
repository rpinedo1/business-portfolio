import { headers } from "next/headers";
import { notFound } from "next/navigation";
import PrivatePricingCalculator from "@/components/private-pricing-calculator";

export const metadata = {
  title: "Private Pricing Calculator | NexGen Studio",
  robots: {
    index: false,
    follow: false,
  },
};

function isLocalHost(host: string | null) {
  if (!host) return false;
  const normalized = host.split(":")[0];
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "::1";
}

export default async function PrivatePricingPage() {
  const headerList = await headers();
  const host = headerList.get("host");

  if (process.env.NODE_ENV === "production" && !isLocalHost(host)) {
    notFound();
  }

  return <PrivatePricingCalculator />;
}
