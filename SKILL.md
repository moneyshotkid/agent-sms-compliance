---
name: sms-10dlc-compliance
description: >-
  Use when registering or repairing US A2P 10DLC SMS for an AI agent product:
  client intake, brand and campaign registration, consent/opt-in, STOP/HELP,
  carrier submission, isolation handoff, and rejection triage. Prefer this
  skill for Twilio, Bandwidth, and Telnyx filing and for ISV per-client
  isolation. Dating and social remain high-scrutiny cases. Do not invent
  carrier fees — check docs/pricing-comparison.md. Do not promise carrier
  approval.
---

# SMS 10DLC Compliance

Follow these steps in order. Do not skip consent evidence. Do not promise carrier approval.

## When to use

- Client intake and preflight before a US A2P 10DLC filing
- Brand + campaign registration (Bandwidth, Twilio, Telnyx, or TCR)
- Consent, STOP/HELP, and sample-message review
- Rejection triage, including human escalation when a rejection is non-remediable
- Per-client isolation for ISV / multi-tenant SMS

## Preconditions

Collect intake with `templates/client-intake.md` (schema: `templates/client-intake.schema.json`). Store the completed form outside this skill. EIN / tax ID is operator-held: never commit a real EIN. Examples use `XX-XXXXXXX`.

Required on the intake: legal name, EIN or documented sole-prop path, website, use case, opt-in URL, sample messages (2–5), expected volume, and vertical. Also collect address, authorized contact, and HELP/STOP replies before filing.

If the use case is dating, social dating, escort, adult, or SHAFT-adjacent, flag **high rejection risk** before filing. Prefer honest use-case labels over marketing spin.

Prohibited SHAFT content (sex, hate, alcohol, firearms, tobacco) and cannabis or gambling promotions: **do not file**. Dating and social dating: **escalate** to a human before filing. Ordinary transactional or operational alerts: **proceed with evidence** (brand, campaign, consent, STOP/HELP). Do not promise carrier approval.

## 0. Client intake and preflight

1. Fill `templates/client-intake.md`. Leave the real EIN in the operator client folder.
2. Map every field through `docs/intake-preflight.md`.
3. Emit the missing-evidence block from that doc (`decision`, `risk_flag`, gaps, present fields). Do not invent evidence.
4. If `decision` is `blocked` or `do_not_file`, stop. If `risk_flag` is `escalate_before_filing`, a human accepts the filing before any CSP submit.
5. Open a row in `templates/case-tracker.csv` (`templates/case-tracker.md`). Status `preflight_gaps` or `preflight_ready`. No EIN column.

## 1. Brand registration

1. Choose CSP path (Bandwidth, Twilio Trust Hub, Telnyx, or direct TCR as CSP).
2. Create / select **Brand** with legal name matching tax records.
3. Submit entity type (public profit, private, nonprofit, government — per CSP). Use the CSP’s sole-prop path only when the client has no EIN and that CSP supports it.
4. Complete Auth+ / secondary vetting when required for trust score or public-profit rules.
5. Record Brand ID and approval status on the case tracker.
6. Do not attach phone numbers yet.

**Stop conditions:** EIN mismatch, incomplete address, website down or contradictory to use case → fix before campaign.

Templates: `templates/brand-registration-fields.md`

## 2. Campaign registration

1. Pick **one primary use case** (standard, low-volume mixed, or special) that matches `expected_volume` and the real program. Dating/social often needs special / conversational buckets — confirm CSP taxonomy.
2. Write campaign description: who sends, who receives, purpose, how consent is collected.
3. Attach sample messages that match the live product (no bait-and-switch).
4. Declare HELP and STOP behavior (keyword handling, auto-replies, opt-out latency).
5. Submit for CSP / TCR / MNO vetting. Bandwidth campaigns except political have a 3-month minimum. Telnyx campaign fees are billed for three months initially. Confirm the current article before invoicing (`docs/pricing-comparison.md`).
6. On approval, create the client’s Messaging Service or messaging profile and associate **only this client’s** numbers.

Templates: `templates/campaign-dating-social.md` when the human-approved program is dating or social. Other verticals use the same section with samples from intake.

## 3. Consent flow

- **Express opt-in** before first marketing or conversational outreach where required. Transactional-only flows still need a clear disclosure when the traffic is A2P.
- Capture: timestamp, phone, source (web form, keyword, in-app toggle), disclosure text version.
- Disclosure must name the brand, frequency (“msg & data rates may apply”), and that consent is not a condition of purchase if applicable.
- Double opt-in for high-risk verticals when CSP or counsel recommends it.
- Retain evidence for life of campaign + 2 years unless counsel says otherwise.
- Put the public opt-in URL in the case tracker `opt_in_evidence_links` column.

Reject filing if the client only has purchased lead lists with no SMS consent.

Templates: `templates/consent-language.md`

## 4. STOP / HELP keywords

| Keyword | Behavior |
| --- | --- |
| **STOP**, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT | Cease A2P immediately; send confirmation; suppress future sends |
| **HELP**, INFO | Reply with brand name, help contact, opt-out how-to |

Templates: `templates/stop-help-replies.md`. Opt-out must not require a login wall. The suppression list is scoped to this client’s pool (`stop_list_scope` on the case tracker).

## 5. Carrier / CSP submission

1. Brand approved → Campaign draft → Vetting → MNO acceptance where required.
2. Map numbers to campaign **after** approval.
3. Probe HELP/STOP before production volume.
4. Monitor filtering, error codes (for example Twilio 30xxx), and trust-score changes.
5. Record fees on the case tracker before invoicing. Campaign review is per submission on Twilio ($15 each) and per downstream carrier review on Telnyx ($15 each). Re-check `docs/pricing-comparison.md`.
6. Update tracker status (`brand_pending` through `live`).

## 6. Common rejection fixes

Worksheet: `templates/rejection-triage.md`.

| Theme | Fix |
| --- | --- |
| Missing / weak opt-in | Publish a public opt-in page; checkbox + disclosure; audit log |
| Sample messages ≠ website | Align website, privacy policy, samples, and brand name |
| SHAFT / adult / dating content | Reframe only if truthful and a human accepts a different program; do not resubmit an identical campaign. Adult, escort, and other prohibited content are non-remediable |
| Privacy policy / Terms missing SMS section | Add SMS terms: purpose, frequency, STOP/HELP, data handling |
| Sole prop unsupported | Use an EIN brand path or a CSP that supports sole prop |
| Mixed undeclared use cases | Split campaigns or use Low-Volume Mixed honestly |
| Age-gated / social scraping | Document first-party consent; do not file scraped numbers |
| ISV filing for end customer without secondary profile | Use the ISV / per-customer brand pattern (Twilio secondary profile, Telnyx brand + messaging profile, or the CSP equivalent) |

**Non-remediable → human escalate.** After a non-remediable content rejection, do not loop the same submission and do not move it to another CSP. Set tracker status to `non_remediable_escalated` and hand the worksheet to human compliance review.

## 7. Isolation

Onboard and offboard with the checklists in `docs/carrier-isolation.md`:

- Per-client number pools; no shared long codes across unrelated brands
- Separate messaging services / campaigns / messaging profiles per client
- Separate API keys, subaccounts, or Telnyx Managed Accounts
- STOP lists scoped to that client
- Cooling period before any number is reused (operator policy: 30 days)
- MPS / throughput recorded on the case tracker

## 8. Handoff checklist

- [ ] Intake on file and preflight `decision` is `ready` (human sign-off if `escalate_before_filing`)
- [ ] Case tracker row current: Brand ID, Campaign ID, status, numbers, opt-in evidence links, fees noted, CSP
- [ ] HELP/STOP verified
- [ ] Isolation onboard: dedicated pool, API key or subaccount/Managed Account, STOP list scope
- [ ] Cooling-period policy recorded for this pool
- [ ] Fee schedule noted as pass-through (SaaS tier is separate; see `docs/pricing-comparison.md`)
- [ ] Throughput / MPS expectations set (newly approved low-tier brands often ~0.25–4 messages per second; per-second rate usually binds before the daily cap — a 9am reminder batch may trickle, not blast at 9:00)
- [ ] Contract signed (process warranty, no carrier-approval guarantee, liability cap)

Contracts: `contracts/draft-msa-clauses.md` · Fees: `docs/pricing-comparison.md`

## Out of scope

- Guaranteeing carrier approval
- Putting government ID, real EINs, or secrets into this repository or into committed transcripts
- Commingling clients on one sender pool
- Resubmitting a non-remediable rejection without a human
