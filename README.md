# NexGen Studio Portfolio

Modern Next.js marketing site with a lead capture form that sends validated contact requests to an n8n webhook for automation (CRM/email list/notifications).

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zod validation
- n8n webhook integration for lead automation

## Features

- Responsive portfolio website
- Smooth section navigation (desktop + mobile)
- Contact form with:
  - Client-side validation
  - Server-side validation (`/api/contact`)
  - Honeypot spam protection
  - Basic rate limiting
  - n8n webhook forwarding

## Project Structure

- `src/app/page.tsx`: Main landing page composition
- `src/components/*`: UI sections (`hero`, `services`, `portfolio`, `about`, `testimonials`, `cta`, `footer`, `navbar`)
- `src/components/section-shell.tsx`: Shared section layout primitives
- `src/app/api/contact/route.ts`: Form backend endpoint
- `.env.example`: Required environment variables template

---

## Prerequisites

- Node.js 20+
- npm 10+
- Optional for automation: n8n (local Docker or hosted)

---

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Fill `.env.local`:

```env
N8N_WEBHOOK_URL=https://your-n8n-domain/webhook/contact-lead
N8N_WEBHOOK_SECRET=replace_with_shared_secret
```

4. Start dev server:

```bash
npm run dev
```

5. Open:

- App: `http://localhost:3000`

---

## Run and Test Locally

### App validation

```bash
npm run lint
```

### Test contact API quickly (without UI)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Smith",
    "email":"jane@example.com",
    "service":"webapp",
    "project":"We need a new client dashboard for internal operations.",
    "company":""
  }'
```

Expected:

- `200` when webhook succeeds
- `400` invalid payload
- `429` rate-limited
- `502` webhook failed/rejected

---

## n8n Setup (Recommended Pipeline)

### 1. Run n8n locally (Docker)

```bash
docker run -it --rm \
  -p 5678:5678 \
  -e N8N_HOST=localhost \
  -e N8N_PORT=5678 \
  -e N8N_PROTOCOL=http \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Open `http://localhost:5678`.

### 2. Create workflow

1. Add **Webhook** node
2. Method: `POST`
3. Path: `contact-lead`
4. Save and activate workflow

For local dev, set:

```env
N8N_WEBHOOK_URL=http://localhost:5678/webhook/contact-lead
```

Note:

- Use `/webhook/...` for active workflows
- Use `/webhook-test/...` when testing from editor mode

### 3. Verify webhook secret

In your workflow, add an IF/Code step that checks:

- Header: `x-webhook-secret`
- Must equal `N8N_WEBHOOK_SECRET`

### 4. Suggested automation flow

- Webhook -> Secret check -> Normalize data (Set node)
- Add/update lead in email tool (Mailchimp/Brevo/ConvertKit)
- Send notification to your inbox (Gmail SMTP or other)
- Optional autoresponder email to lead
- Respond `200 {"ok": true}`

### Payload sent from app

```json
{
  "source": "website-contact-form",
  "timestamp": "2026-02-19T00:00:00.000Z",
  "lead": {
    "name": "Jane",
    "email": "jane@example.com",
    "service": "webapp",
    "project": "..."
  },
  "metadata": {
    "ip": "...",
    "userAgent": "..."
  }
}
```

---

## Gmail App Password (for n8n Gmail SMTP)

If you send notification emails via Gmail in n8n SMTP, use an App Password (not your main password).

### Requirements

- Google account with **2-Step Verification enabled**

### Steps

1. Open Google Account -> Security
2. Enable **2-Step Verification** if not already enabled
3. Go to **App passwords**
4. Choose app: `Mail`
5. Choose device: `Other` (e.g., `n8n`)
6. Click Generate
7. Copy 16-character app password

Use in n8n SMTP credentials:

- Host: `smtp.gmail.com`
- Port: `465` (SSL) or `587` (STARTTLS)
- User: your Gmail address
- Password: generated app password

Important:

- Treat app passwords like secrets
- If leaked, revoke and regenerate immediately

---

## Production Setup

### Architecture

- Frontend/API route: deploy on Vercel (or equivalent)
- Automation: n8n hosted (self-hosted VM, Docker, Railway, Render, etc.)

## 1. Deploy app

- Deploy Next.js project
- Set environment variables in hosting dashboard:
  - `N8N_WEBHOOK_URL`
  - `N8N_WEBHOOK_SECRET`

## 2. Deploy n8n

- Ensure public HTTPS URL
- Activate workflow
- Configure authentication/secret check in workflow

## 3. Configure production email/list nodes

- CRM/email list integration credentials
- Gmail SMTP app password or provider API credentials

## 4. Verify end-to-end

- Submit form on production site
- Confirm:
  - Workflow execution appears in n8n
  - Lead added to list/automation
  - Notification received

---

## Troubleshooting

### `POST /api/contact 500`

- Missing `N8N_WEBHOOK_URL`
- Missing/incorrect env vars
- Did not restart app after env changes

### `POST /api/contact 502`

- n8n URL is wrong
- Webhook path mismatch (`/webhook` vs `/webhook-test`)
- Workflow inactive
- Secret mismatch (`x-webhook-secret`)
- n8n returned non-2xx from downstream step

### Email invalid errors

- Client and server both validate email format
- Ensure user email looks like `name@domain.com`

### Rate limit triggered (`429`)

- Basic in-memory rate limit is active
- Wait ~1 minute and retry
- For production scale, move to Redis-based rate limiting

---

## Security Notes

- Never commit real secrets to git
- Keep `.env.local` private
- Rotate secrets if exposed
- Keep webhook secret validation in n8n enabled

---

## Useful Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Note: build may fail in network-restricted environments when fetching Google Fonts.
