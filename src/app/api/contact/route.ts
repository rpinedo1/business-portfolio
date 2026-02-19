import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(200),
  service: z.string().trim().min(1).max(100),
  project: z.string().trim().min(10).max(4000),
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

    const { name, email, service, project } = parsed.data;
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret
          ? { "x-webhook-secret": webhookSecret }
          : {}),
      },
      body: JSON.stringify({
        source: "website-contact-form",
        timestamp: new Date().toISOString(),
        lead: {
          name,
          email,
          service,
          project,
        },
        metadata: {
          ip,
          userAgent,
        },
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
