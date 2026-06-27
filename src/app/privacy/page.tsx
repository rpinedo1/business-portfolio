import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — NexGen Studio",
  description: "How NexGen Studio collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>

      <div className="prose prose-sm mt-10 max-w-none text-foreground">
        <h2 className="text-lg font-bold">1. Who We Are</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          NexGen Studio (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides landing page design and digital marketing
          services for small businesses. Our website is{" "}
          <span className="font-medium text-foreground">nexgen.studio</span>. You can contact us at{" "}
          <a href="mailto:hello@nexgen.studio" className="text-mineral underline decoration-mineral/40 underline-offset-2">
            hello@nexgen.studio
          </a>
          .
        </p>

        <h2 className="mt-8 text-lg font-bold">2. Information We Collect</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          When you submit our intake form, we collect:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>Business name, owner name, email address, and phone number</li>
          <li>Business details you provide (services, location, hours)</li>
          <li>Optional information: review links, testimonials, upgrade preferences</li>
          <li>Your IP address and browser details (for fraud prevention)</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We also collect standard analytics data (page views, session duration) through Google
          Analytics 4 if you have not opted out via your browser settings.
        </p>

        <h2 className="mt-8 text-lg font-bold">3. How We Use Your Information</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>To build and deliver your landing page</li>
          <li>To contact you about your project and onboarding</li>
          <li>To send service updates, invoices, and support communications</li>
          <li>To send marketing communications (only with your consent; unsubscribe anytime)</li>
          <li>To prevent fraud and abuse of our services</li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">4. SMS Communications</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          If you opt in to SMS messages on our intake form, we may send you project status updates
          and service announcements via text message. Message and data rates may apply. Message
          frequency varies. Reply <strong>STOP</strong> to unsubscribe at any time. Reply{" "}
          <strong>HELP</strong> for help.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We do not sell or share your phone number with third-party marketing companies.
        </p>

        <h2 className="mt-8 text-lg font-bold">5. Data Sharing</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We do not sell your personal information. We may share your data with:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>
            <strong>Service providers</strong> who help us deliver our services (e.g., hosting
            providers, automation tools, email delivery)
          </li>
          <li>
            <strong>Legal authorities</strong> if required by law or to protect our rights
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold">6. Data Retention</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We retain your information for as long as you are a customer, plus up to 3 years after
          your last interaction with us for legal and accounting purposes. You may request deletion
          at any time by emailing{" "}
          <a href="mailto:hello@nexgen.studio" className="text-mineral underline decoration-mineral/40 underline-offset-2">
            hello@nexgen.studio
          </a>
          .
        </p>

        <h2 className="mt-8 text-lg font-bold">7. Your Rights</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Depending on your location, you may have rights to access, correct, or delete your personal
          data. To exercise any of these rights, contact us at{" "}
          <a href="mailto:hello@nexgen.studio" className="text-mineral underline decoration-mineral/40 underline-offset-2">
            hello@nexgen.studio
          </a>
          .
        </p>

        <h2 className="mt-8 text-lg font-bold">8. Cookies</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Our website uses essential cookies for functionality and optional analytics cookies (Google
          Analytics). You can disable cookies in your browser settings at any time.
        </p>

        <h2 className="mt-8 text-lg font-bold">9. Changes to This Policy</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We may update this policy periodically. The &quot;Last updated&quot; date at the top will reflect any
          changes. Continued use of our services after changes constitutes acceptance.
        </p>

        <h2 className="mt-8 text-lg font-bold">10. Contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Questions? Email us at{" "}
          <a href="mailto:hello@nexgen.studio" className="text-mineral underline decoration-mineral/40 underline-offset-2">
            hello@nexgen.studio
          </a>
          .
        </p>
      </div>
    </div>
  );
}
