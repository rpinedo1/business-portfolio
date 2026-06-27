import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  // Step 1 — required
  businessName: z.string().trim().min(1).max(200),
  ownerName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(50),
  // Step 1 — optional
  industry: z.string().trim().max(100).optional(),
  city: z.string().trim().max(200).optional(),
  // Step 2 — offer
  topServices: z.string().trim().max(500).optional(),
  idealCustomer: z.string().trim().max(500).optional(),
  differentiator: z.string().trim().max(500).optional(),
  promo: z.string().trim().max(500).optional(),
  // Step 3 — proof/assets
  reviewsLink: z.string().trim().max(500).optional(),
  testimonials: z.string().trim().max(1000).optional(),
  // Step 4 — lead handling
  leadPhone: z.string().trim().min(7).max(50),
  leadEmail: z.string().trim().email().max(200),
  businessHours: z.string().trim().max(200).optional(),
  responseSpeed: z.string().trim().max(100).optional(),
  // Step 5 — upgrades (comma-separated list)
  upgrades: z.string().trim().max(500).optional(),
  // Step 6 — consents
  understandsPricing: z.boolean().optional(),
  understandsTerm: z.boolean().optional(),
  smsConsent: z.boolean().optional(),
  emailConsent: z.boolean().optional(),
  // Honeypot
  company: z.string().trim().max(0).optional(),
});

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  ipHits.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();
    if (typeof body?.company === "string" && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Automation webhook is not configured." },
        { status: 500 }
      );
    }

    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const {
      // contact fields
      ownerName,
      email,
      phone,
      smsConsent,
      emailConsent,
      // business fields
      businessName,
      industry,
      city,
      topServices,
      idealCustomer,
      differentiator,
      promo,
      reviewsLink,
      testimonials,
      leadPhone,
      leadEmail,
      businessHours,
      responseSpeed,
      upgrades,
      understandsPricing,
      understandsTerm,
    } = parsed.data;

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
      },
      body: JSON.stringify({
        source: "website-intake-form",
        timestamp: new Date().toISOString(),
        leadContact: {
          ownerName,
          email,
          phone,
          smsConsent,
          emailConsent,
        },
        business: {
          businessName,
          industry,
          city,
          topServices,
          idealCustomer,
          differentiator,
          promo,
          reviewsLink,
          testimonials,
          leadPhone,
          leadEmail,
          businessHours,
          responseSpeed,
          upgrades,
          understandsPricing,
          understandsTerm,
        },
        metadata: { ip, userAgent },
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      return NextResponse.json(
        {
          error: "Failed to trigger automation.",
          providerStatus: webhookResponse.status,
          provider: errorText,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
