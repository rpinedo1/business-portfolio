# Operations Runbook

Operational checklist for reliability, secrets, monitoring, and incident handling.

## Environments

Use separate values per environment:

- `dev`
- `staging`
- `production`

At minimum:

- `N8N_WEBHOOK_URL`
- `N8N_WEBHOOK_SECRET`

---

## Secrets Management

## Rules

- Never commit real secrets
- Only store real secrets in host env manager
- Rotate immediately if exposed

## Rotation Process

1. Generate new `N8N_WEBHOOK_SECRET`
2. Update n8n validation logic
3. Update app env var
4. Redeploy/restart app
5. Confirm submissions still succeed
6. Invalidate old secret

## Gmail App Password Rotation (if used)

1. Revoke old app password in Google account
2. Generate new app password
3. Update n8n SMTP credentials
4. Send test notification

---

## Monitoring

## What to monitor

- API status rates for `/api/contact`:
  - `200` success
  - `400` bad payload
  - `429` rate limit
  - `502` downstream webhook failures

- n8n metrics:
  - Workflow execution failures
  - Average run duration
  - Provider node failures

## Minimum alerting

- Alert on sustained `502` spikes
- Alert on n8n workflow failure count > threshold
- Alert when notification/email provider fails

---

## Incident Response

## Symptom: `500` from `/api/contact`

Likely cause:
- Missing env vars in app runtime

Actions:
1. Check deployment env vars
2. Restart/redeploy app
3. Verify endpoint again

## Symptom: `502` from `/api/contact`

Likely causes:
- Wrong webhook URL
- Workflow inactive
- Secret mismatch
- Downstream node failure

Actions:
1. Check response details (`providerStatus` + message)
2. Validate URL path (`/webhook` vs `/webhook-test`)
3. Verify n8n workflow active
4. Verify `x-webhook-secret` value
5. Open n8n Execution logs

## Symptom: no notifications but successful webhook

Likely cause:
- Failure in downstream provider node

Actions:
1. Inspect n8n node-level failures
2. Re-auth provider credentials
3. Retry failed execution

---

## Reliability Improvements

Recommended next upgrades:

1. Replace in-memory rate limiting with Redis-backed limiter
2. Add queue (e.g., BullMQ/SQS) between app and automation for retries
3. Add idempotency key to avoid duplicate lead creation
4. Persist failed payloads to durable storage

---

## Pre-Deployment Checklist

1. `.env` values configured in host
2. n8n workflow active
3. Secret validation enabled
4. Provider credentials valid
5. End-to-end test completed
6. Monitoring and alerts configured

---

## Post-Deployment Verification

1. Submit a real test lead
2. Confirm `/api/contact` returns `200`
3. Confirm n8n execution success
4. Confirm list/CRM record created
5. Confirm notification delivered

---

## Data Handling Notes

Lead payload includes:

- Name
- Email
- Service interest
- Project details
- Metadata (IP/user-agent)

Ensure this aligns with your privacy policy and retention requirements.
