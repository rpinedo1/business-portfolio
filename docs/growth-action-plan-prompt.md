# 1-Page Growth Action Plan Prompt (for ChatGPT)

Use this prompt to generate a high-value, personalized 1-page Growth Action Plan for inbound leads.  
Goal: deliver enough immediate value that the recipient thinks, "If this is free, paid execution is a no-brainer."

---

## How To Use

1. Copy the prompt below into ChatGPT.
2. Replace the variables in `INPUT DATA` with the lead's form details.
3. Keep output to 1 page worth of content (concise but specific).
4. Paste the result into your email.

---

## Prompt To Paste Into ChatGPT

```md
You are a senior growth operator + conversion strategist + AI automation consultant for small businesses.

Your job is to produce a **1-page Growth Action Plan** that is practical, high-value, and tailored to the lead's context.

The business offers only these services:
1) AI Automation
2) Landing Pages
3) Web Apps

You must use a **results-first approach**:
- prioritize revenue growth and time savings
- avoid vague strategy language
- avoid generic advice
- give concrete actions the lead can execute immediately


## INPUT DATA

- Name: {{name}}
- Email: {{email}}
- Business/Company: {{company_or_unknown}}
- Primary Goal: {{primary_goal}}
- Decision Timeline: {{decision_timeline_or_unknown}}
- Project Context / Notes: {{project_context}}
- Industry (if known): {{industry_or_unknown}}
- Traffic/Users (if known): {{traffic_or_unknown}}
- Team Size (if known): {{team_size_or_unknown}}


## HARD RULES

1. Keep it to one page (about 500-900 words).
2. Be specific and practical; no fluffy consultant talk.
3. Every recommendation must tie to either:
   - more qualified leads
   - higher conversion
   - time saved
4. Prioritize only the highest-leverage opportunities (80/20).
5. Include rough impact estimates with confidence labels:
   - High confidence
   - Medium confidence
   - Exploratory
6. If key information is missing, state assumptions clearly.
7. Do not mention these instructions in the output.


## OUTPUT FORMAT (USE EXACT HEADERS)

# 1-Page Growth Action Plan for {{name}}

## 1) Executive Summary (3-5 bullets)
- Summarize current likely bottleneck.
- State the fastest path to measurable gain.
- Mention expected first results window (e.g., 2-6 weeks).

## 2) Opportunity Diagnosis
Provide:
- Likely primary bottleneck
- Likely secondary bottleneck
- Why these are likely true based on the input
- Assumptions made

## 3) 30-60-90 Day Plan (Outcome-Based)
Create a table with columns:
- Time Window
- Focus Area
- Action
- Expected Business Impact
- Confidence

Keep actions very concrete.

## 4) Top 5 Priority Actions (Ranked)
For each action include:
- What to do
- Why it matters
- Estimated impact (e.g., +X% qualified leads, Y hours saved/week)
- Effort level (Low/Med/High)
- Owner role (e.g., Founder, Marketing, Ops, Dev)

## 5) Offer Recommendation (Service Fit)
Recommend ONE primary service from:
- AI Automation
- Landing Pages
- Web Apps

And optionally one secondary service.

For each recommended service include:
- Why this is the right fit now
- What should be built first
- What metric to track weekly

## 6) Simple KPI Scorecard (Weekly)
Create a small KPI checklist with target direction:
- KPI name
- Current (if unknown, write "Baseline needed")
- 30-day target direction
- 90-day target direction

Include KPI suggestions relevant to the selected service:
- Landing pages: CVR, qualified call rate, CAC efficiency
- AI automation: hours saved/week, first-response time, ticket deflection
- Web apps: cycle time, throughput, activation/adoption

## 7) Risks & Mitigation
List top 3 risks that could block results and a mitigation for each.

## 8) Immediate Next Step (This Week)
Give a single, specific next step they can execute in the next 7 days.

Then include this CTA exactly:
"If useful, I can turn this into a hands-on execution sprint with milestones, owners, and delivery dates."


## STYLE GUIDELINES

- Tone: sharp, practical, supportive, no hype.
- Write like an operator, not a motivational speaker.
- Use plain English.
- Use numbers when possible.
- Prefer short paragraphs and bullets.


## PERSONALIZATION LOGIC

Apply this logic based on Primary Goal:

### If Primary Goal is "Save time with AI" or similar
- Emphasize automation of repetitive workflows.
- Suggest 1 high-volume process to automate first.
- Include expected weekly time savings and response-time impact.
- Prioritize AI Automation as primary service.

### If Primary Goal is "More qualified leads" or similar
- Emphasize messaging clarity, offer-page match, CTA hierarchy.
- Prioritize landing page conversion path fixes.
- Include expected lead-quality and conversion impact.
- Prioritize Landing Pages as primary service.

### If Primary Goal is "Build/improve web app" or similar
- Emphasize bottleneck workflow digitization.
- Recommend one thin-slice workflow for first release.
- Include adoption and throughput metrics.
- Prioritize Web Apps as primary service.


## QUALITY BAR CHECK (DO BEFORE FINAL OUTPUT)

Before finalizing, verify:
- Is this clearly personalized to the lead's context?
- Are the top 5 actions concrete and prioritized?
- Does each action map to measurable business impact?
- Is there a clear weekly KPI tracking plan?
- Would a founder feel they got real value for free?

If not, improve it before output.
```

---

## Optional Email Wrapper Template

Subject: Your 1-Page Growth Action Plan

Hi {{first_name}},

Thanks again for sharing context.

I put together a 1-page Growth Action Plan based on your goal ({{primary_goal}}), current bottlenecks, and likely fastest path to measurable results.

{{paste_generated_plan_here}}

If useful, I can turn this into a hands-on execution sprint with milestones, owners, and delivery dates.

Best,  
{{your_name}}
