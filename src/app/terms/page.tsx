import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — NexGen Studio",
  description: "Terms and conditions for NexGen Studio website services.",
};

export default function TermsPage() {
  const updated = "February 27, 2026";
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-mineral"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>

      <div className="prose prose-sm mt-10 max-w-none text-foreground">
        <h2 className="text-lg font-bold">1. Agreement</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          By submitting our intake form or using our services, you agree to these Terms of Service
          (&quot;Terms&quot;). These Terms govern your use of NexGen Studio website design and development
          services. If you don&apos;t agree, don&apos;t use our services.
        </p>

        <h2 className="mt-8 text-lg font-bold">2. The Service</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          NexGen Studio provides website design, development, launch, and optional care services.
          Project deliverables are defined in the written scope you approve before work starts.
          Typical website services may include:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>Responsive website design and development</li>
          <li>Contact forms, lead routing, and launch support</li>
          <li>Basic analytics setup when scoped</li>
          <li>Optional hosting, care, and minor edit support when scoped</li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">3. Pricing & Payment</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <strong>Quotes:</strong> Website projects are quoted after scope review. Your quote defines
          the project deliverables, timeline, payment schedule, and revision terms.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <strong>Payment:</strong> Build work begins only after you approve the quote and required
          initial payment. Remaining payment terms are defined in the approved scope.
        </p>

        <h2 className="mt-8 text-lg font-bold">4. Build Turnaround</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Any timeline shared before scope approval is an estimate. Confirmed delivery timelines are
          included in your approved scope and may shift if required assets, content, approvals, or
          access are delayed.
        </p>

        <h2 className="mt-8 text-lg font-bold">5. Intellectual Property</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Upon full payment of any outstanding balances, you own the content and design of your
          website. We retain the right to display your site in our portfolio unless you request
          otherwise in writing. Any proprietary NexGen Studio templates, code libraries, or systems
          used to build your page remain our intellectual property.
        </p>

        <h2 className="mt-8 text-lg font-bold">6. Your Responsibilities</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>Provide accurate business information in your intake form</li>
          <li>Ensure any content you supply does not violate third-party rights or applicable law</li>
          <li>Obtain necessary rights for logos, photos, or other assets you provide</li>
          <li>
            Comply with applicable laws and regulations (including HIPAA, FTC guidelines, and
            advertising standards) for your industry
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">7. Cancellation & Refunds</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Ongoing hosting or care plans, when included, may be cancelled by emailing{" "}
          <a href="mailto:hello@nexgen.studio" className="text-mineral underline decoration-mineral/40 underline-offset-2">
            hello@nexgen.studio
          </a>{" "}
          . Project build payments are non-refundable once work has commenced unless your written
          scope states otherwise.
        </p>

        <h2 className="mt-8 text-lg font-bold">8. Disclaimer of Warranties</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Our services are provided &quot;as is.&quot; We do not guarantee specific results, lead volumes, or
          revenue outcomes. We make no medical, financial, or business performance claims on behalf of
          your business. You are responsible for the accuracy and compliance of your website content.
        </p>

        <h2 className="mt-8 text-lg font-bold">9. Limitation of Liability</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          To the maximum extent permitted by law, NexGen Studio&apos;s liability for any claim
          arising from our services is limited to the fees paid for the approved project or care plan.
          We are not liable for indirect, consequential, or lost-profit damages.
        </p>

        <h2 className="mt-8 text-lg font-bold">10. Governing Law</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          These Terms are governed by the laws of the State of Florida, United States, without regard
          to conflict of law principles.
        </p>

        <h2 className="mt-8 text-lg font-bold">11. Changes</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We may update these Terms. Continued use of our services after changes constitutes
          acceptance of the revised Terms. Material changes will be communicated to active customers
          by email.
        </p>

        <h2 className="mt-8 text-lg font-bold">12. Contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Questions about these Terms? Email{" "}
          <a href="mailto:hello@nexgen.studio" className="text-mineral underline decoration-mineral/40 underline-offset-2">
            hello@nexgen.studio
          </a>
          .
        </p>
      </div>
    </div>
  );
}
