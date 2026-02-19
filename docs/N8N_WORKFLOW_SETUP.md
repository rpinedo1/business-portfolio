# n8n Workflow Setup Guide

Step-by-step guide to wire form submissions from this app into automations.

## Goal

Handle incoming leads from `/api/contact` and route them to:

- Email list / CRM
- Notification channel (email/Slack)
- Optional autoresponder

---

## 1. Create Workflow

1. Open n8n
2. Create new workflow: `website-contact-leads`
3. Save immediately

---

## 2. Add Webhook Trigger

1. Add node: **Webhook**
2. Configure:
- Method: `POST`
- Path: `contact-lead`
- Response mode: `Using Respond to Webhook node` (recommended)
3. Save

Use one of these URLs in app env:

- Active workflow URL: `/webhook/contact-lead`
- Test URL (editor): `/webhook-test/contact-lead`

---

## 3. Add Secret Validation Gate

1. Add node: **IF** (name it `Validate Secret`)
2. Compare value from webhook header:
- Left side: `{{$json.headers["x-webhook-secret"]}}`
- Operation: `equals`
- Right side: your shared secret

If true -> continue.
If false -> return 401 via `Respond to Webhook`.

---

## 4. Normalize Incoming Data

1. Add node: **Set** (name it `Normalize Lead`)
2. Keep only fields you need:
- `name`: `{{$json.body.lead.name || $json.lead.name}}`
- `email`: `{{$json.body.lead.email || $json.lead.email}}`
- `service`: `{{$json.body.lead.service || $json.lead.service}}`
- `project`: `{{$json.body.lead.project || $json.lead.project}}`
- `source`: `{{$json.body.source || $json.source}}`
- `submittedAt`: `{{$json.body.timestamp || $json.timestamp || $now}}`
- `ip`: `{{$json.body.metadata.ip || $json.metadata.ip || "unknown"}}`
- `userAgent`: `{{$json.body.metadata.userAgent || $json.metadata.userAgent || "unknown"}}`

---

## 5. Add Provider Nodes

Choose your stack.

## Option A: Email list first

Examples:
- Mailchimp: Add/Update member
- Brevo: Create/Update contact
- ConvertKit: Add subscriber to form

Recommended field mappings:
- Email -> `email`
- Name -> `name`
- Tag -> `website-lead`
- Extra tag -> `service:{{$json.service}}`
- Custom field -> `project`

## Option B: CRM first

Examples:
- HubSpot, Pipedrive, Airtable, Notion

Store:
- `name`, `email`, `service`, `project`, `submittedAt`, `source`

---

## 6. Add Notification Step

Recommended channels:
- Email (SMTP/Gmail)
- Slack
- Discord

Suggested message format:

- Subject: `New Website Lead: {{$json.name}}`
- Body:
  - Name: `{{$json.name}}`
  - Email: `{{$json.email}}`
  - Service: `{{$json.service}}`
  - Project: `{{$json.project}}`
  - Time: `{{$json.submittedAt}}`

---

## 7. Optional: Autoresponder

Send confirmation to lead email:

- To: `{{$json.email}}`
- Subject: `We got your request`
- Message: short confirmation + expected response window

---

## 8. Add Response Node

1. Add node: **Respond to Webhook**
2. Success branch:
- Status: `200`
- Body: `{"ok":true}`

3. Secret-fail branch:
- Status: `401`
- Body: `{"ok":false,"error":"Unauthorized"}`

4. Error branch (optional):
- Status: `500`
- Body: `{"ok":false,"error":"Workflow failed"}`

---

## 9. Activate and Test

1. Activate workflow
2. Submit form from site
3. Verify execution in n8n
4. Verify subscriber/contact creation
5. Verify notification received

---

## 10. Common Mistakes

- Using `/webhook-test` in production env
- Workflow not activated while using `/webhook`
- Secret mismatch in IF node
- Respond node missing (request hangs)
- Provider credentials expired

---

## Local Test Payload

Use this against your app endpoint:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Smith",
    "email":"jane@example.com",
    "service":"webapp",
    "project":"We need a dashboard for our team.",
    "company":""
  }'
```
