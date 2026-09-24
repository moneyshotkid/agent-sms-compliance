# Rejection triage

Use this when a CSP, TCR, or carrier rejects or suspends a brand or campaign. Classify the reason, fix only what is remediable, and stop when it is not.

SKILL §6 is the short table. This template is the worksheet. Non-remediable content goes to a human. The agent does not keep resubmitting.

## Rule

**Non-remediable → human escalate.**

If the rejection is prohibited content (SHAFT, adult or escort, cannabis, gambling, or a carrier “content violation” / permanent deny), do all of the following and then stop:

1. Set case-tracker status to `non_remediable_escalated`.
2. Do not resubmit the same campaign or a lightly edited copy.
3. Do not shop the same use case to another CSP as a workaround.
4. Hand the case to human compliance review with this worksheet attached.
5. Tell the client the process warranty does not include a carrier-approval guarantee (`contracts/draft-msa-clauses.md`).

Dating and social dating are high-scrutiny. A content rejection on that vertical is treated as non-remediable unless a human decides a truthful, narrower program is a different use case. Do not make that call inside the agent loop.

Each resubmission can repeat campaign-review fees (Twilio: $15 per submission; Telnyx: $15 per downstream carrier review). Record that in `fees_noted` before another submit. See `docs/pricing-comparison.md`.

## Worksheet

```
client_ref:
csp:
brand_id:
campaign_id:
rejected_at (UTC):
verbatim_reason:
```

| Theme | Remediable? | Evidence now | Fix before any resubmit |
| --- | --- | --- | --- |
| Missing / weak opt-in | Usually yes | Public opt-in URL, checkbox text, audit-log sample | Publish the page; align disclosure; then resubmit |
| Samples ≠ website or brand name | Usually yes | URL, samples, privacy SMS section | Make them the same program |
| Privacy / Terms missing SMS section | Usually yes | Policy URL | Add purpose, frequency, STOP/HELP, rates |
| Sole prop unsupported on this CSP | Yes, by changing path | Entity type | EIN brand, or a CSP that supports sole prop |
| Mixed undeclared use cases | Yes | Use-case sentence and volume | Split campaigns or file Low-Volume Mixed honestly |
| Age-gated / scraped numbers | Only with first-party consent | Source of the list | Do not file scraped or purchased lists |
| ISV filed without the end customer’s identity | Yes | Whose legal name is on the brand | Secondary profile / per-customer brand |
| SHAFT, adult, escort, cannabis, gambling, or permanent content deny | **No** | Verbatim reason | **Stop. Human escalate.** |

## Classification

- `rejected_remediable` — a row above is “usually yes” and the fix is real evidence, not a wording trick. Update the tracker, fix, re-run `docs/intake-preflight.md`, then resubmit once.
- `non_remediable_escalated` — content, permanent deny, or the same theme after the evidence was already corrected. Human owns it.

## Operator note (not a CSP SLA)

On Twilio, operators often see on the order of four campaign submissions before a permanent deny. After about three billed resubmissions, one attempt may be all that remains before that brand path is exhausted. That note is practical guidance from SKILL §6, not a promise from the CSP. Telnyx can also send a campaign downstream more than once; each downstream review is a separate $15 pass-through unless the client has asked Telnyx not to resubmit.

## Example (remediable)

Example Alerts LLC, Twilio campaign `CXXXXXXX`, reason “opt-in not found”. Classification: `rejected_remediable`. Fix: publish `https://example.com/sms-opt-in` with brand, frequency, msg & data rates, STOP/HELP, and “consent is not a condition of purchase”, plus a screenshot in the client folder. Re-run preflight. Resubmit only after the gap list is empty. Note another $15 campaign-review pass-through.

## Example (non-remediable)

A campaign rejected for sexual or escort content, or for any other prohibited SHAFT category: classification `non_remediable_escalated`. No resubmit. Human escalate.
