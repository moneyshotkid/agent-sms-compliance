---
name: sms-10dlc-compliance
description: >-
  Use when registering or repairing US A2P 10DLC SMS for an AI agent product:
  brand registration, campaign registration, consent/opt-in, STOP/HELP,
  carrier submission, and common rejection fixes. Prefer this skill for
  Twilio/Bandwidth/TCR filing, dating/social high-risk use cases, and
  ISV secondary-profile patterns. Do not invent carrier fees — check
  docs/pricing-comparison.md.
---

# SMS 10DLC Compliance

Follow these steps in order. Do not skip consent evidence. Do not promise carrier approval.

## When to use

- Brand + campaign registration for US A2P 10DLC
- Twilio / Bandwidth / TCR rejection triage
- Consent, STOP/HELP, and sample-message review
- Per-client isolation for ISV / multi-tenant SMS

## Preconditions

Collect from the client (store outside this skill):

- Legal entity name, EIN (or sole-prop path if CSP supports it), address, website
- Authorized contact email/phone
- Exact use case in one sentence (who texts whom, why)
- Opt-in mechanism URL or UI flow + screenshot/script
- Sample messages (2–5), HELP and STOP replies
- Estimated daily volume and whether dating/social/adult-adjacent

If the use case is dating, social dating, escort, adult, or SHAFT-adjacent, flag **high rejection risk** before filing. Prefer honest use-case labels over marketing spin.

Prohibited SHAFT content (sex, hate, alcohol, firearms, tobacco) and cannabis or gambling promotions: **do not file**. Dating and social dating: **escalate** to a human before filing. Ordinary transactional or operational alerts: **proceed with evidence** (brand, campaign, consent, STOP/HELP). Do not promise carrier approval.

## 1. Brand registration

1. Choose CSP path (Bandwidth, Twilio Trust Hub, or direct TCR as CSP).
2. Create / select **Brand** with legal name matching tax records.
3. Submit entity type (public profit, private, nonprofit, government — per CSP).
4. Complete Auth+ / secondary vetting when required for trust score or public-profit rules.
5. Record Brand ID / TCR brand ID and approval status.
6. Do not attach phone numbers yet.

**Stop conditions:** EIN mismatch, incomplete address, website down or contradictory to use case → fix before campaign.

Templates: `templates/brand-registration-fields.md`

## 2. Campaign registration

1. Pick **one primary use case** (standard, low-volume mixed, or special). Dating/social often needs special / conversational buckets — confirm CSP taxonomy.
2. Write campaign description: who sends, who receives, purpose, how consent is collected.
3. Attach sample messages that match the live product (no bait-and-switch).
4. Declare HELP and STOP behavior (keyword handling, auto-replies, opt-out latency).
5. Submit for CSP / TCR / MNO vetting. Expect a 3-month minimum on many CSPs (Bandwidth) except political.
6. On approval, create Messaging Service / number pool and associate **only this client’s** numbers.

Templates: `templates/campaign-dating-social.md`

## 3. Consent flow

- **Express opt-in** before first marketing or conversational outreach where required. Transactional-only flows still need a clear disclosure when the traffic is A2P.
- Capture: timestamp, phone, source (web form, keyword, in-app toggle), disclosure text version.
- Disclosure must name the brand, frequency (“msg & data rates may apply”), and that consent is not a condition of purchase if applicable.
- Double opt-in for high-risk verticals when CSP or counsel recommends it.
- Retain evidence for life of campaign + 2 years unless counsel says otherwise.

Reject filing if the client only has purchased lead lists with no SMS consent.

Templates: `templates/consent-language.md`

## 4. STOP / HELP keywords

| Keyword | Behavior |
| --- | --- |
| **STOP**, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT | Cease A2P immediately; send confirmation; suppress future sends |
| **HELP**, INFO | Reply with brand name, help contact, opt-out how-to |

Templates: `templates/stop-help-replies.md`. Opt-out must not require a login wall.

## 5. Carrier / CSP submission

1. Brand approved → Campaign draft → Vetting → MNO acceptance where required.
2. Map numbers to campaign **after** approval.
3. Probe HELP/STOP before production volume.
4. Monitor filtering, error codes (for example Twilio 30xxx), and trust-score changes.
5. For Bandwidth-style paths, confirm current vetting billing in the CSP fee article before invoicing.

## 6. Common rejection fixes

| Theme | Fix |
| --- | --- |
| Missing / weak opt-in | Publish a public opt-in page; checkbox + disclosure; audit log |
| Sample messages ≠ website | Align website, privacy policy, samples, and brand name |
| SHAFT / adult / dating content | Reframe only if truthful; otherwise do not resubmit an identical campaign. Adult, escort, and other prohibited content may be non-remediable. Consider an alternate channel only after human review |
| Privacy policy / Terms missing SMS section | Add SMS terms: purpose, frequency, STOP/HELP, data handling |
| Sole prop unsupported | Use an EIN brand path or a CSP that supports sole prop |
| Mixed undeclared use cases | Split campaigns or use Low-Volume Mixed honestly |
| Age-gated / social scraping | Document first-party consent; do not file scraped numbers |
| ISV filing for end customer without secondary profile | Use the ISV / secondary customer profile pattern |

After a **non-remediable** content rejection, do not loop the same submission. Escalate to human compliance review.

## 7. Isolation

- Per-client number pools; no shared long codes across unrelated brands
- Separate messaging services / campaigns per client
- Separate API keys / subaccounts when CSP supports it

See `docs/carrier-isolation.md`.

## 8. Handoff checklist

- [ ] Brand ID + status
- [ ] Campaign ID + use case + status
- [ ] Numbers mapped
- [ ] Opt-in URL + evidence sample
- [ ] HELP/STOP verified
- [ ] Fee schedule noted (pass-through)
- [ ] Throughput / MPS expectations set (newly approved low-tier brands often ~0.25–4 messages per second; per-second rate usually binds before the daily cap — a 9am reminder batch may trickle, not blast at 9:00)
- [ ] Contract signed (process warranty, liability cap)

Contracts: `contracts/draft-msa-clauses.md` · Fees: `docs/pricing-comparison.md`

## Out of scope

- Guaranteeing carrier approval
- Putting government ID or secrets into chat transcripts
- Commingling clients on one sender pool
