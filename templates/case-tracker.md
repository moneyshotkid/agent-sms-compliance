# Case tracker

One spreadsheet row per campaign. This is a CSV (or the same columns in a sheet), not a database. Do not put EINs, API keys, or government IDs in the sheet.

Schema file: `templates/case-tracker.csv` (header plus one placeholder row).

## Columns

| Column | Required | What to store |
| --- | --- | --- |
| `client_ref` | Yes | Same id as intake |
| `legal_name` | Yes | Legal name only. No EIN |
| `csp` | Yes | `bandwidth`, `twilio`, `telnyx`, or `tcr_direct` |
| `brand_id` | When the CSP issues one | TCR / CSP brand id |
| `campaign_id` | When the CSP issues one | TCR / CSP campaign id |
| `status` | Yes | See statuses below |
| `numbers` | When assigned | E.164 list for this campaign only. Quote the cell if it contains commas |
| `opt_in_evidence_links` | Yes once preflight is ready | Public opt-in URL. Screenshots stay in the client folder; link the folder path only if it is not a secret store |
| `fees_noted` | Yes before invoicing | CSP, As-of date from `docs/pricing-comparison.md`, and the pass-through lines quoted for this campaign. SaaS tier is separate |
| `vertical` | Yes | Honest label from intake |
| `mps_expectation` | Yes at handoff | Throughput note. Newly approved low-tier brands are often ~0.25–4 MPS; the per-second rate usually binds before the daily cap |
| `stop_list_scope` | Yes at onboard | Which suppression list this pool uses. One client only |
| `cooling_period` | Yes at onboard | Operator quarantine after offboard. Default policy is 30 days; see `docs/carrier-isolation.md` |
| `notes` | Optional | Rejection theme, human-escalation pointer, or offboard date. No secrets |

## Status values

`intake` · `preflight_gaps` · `preflight_ready` · `brand_pending` · `brand_approved` · `campaign_pending` · `campaign_approved` · `live` · `rejected_remediable` · `non_remediable_escalated` · `offboarding` · `closed`

`non_remediable_escalated` means a human owns the case. Do not resubmit from the agent loop. See `templates/rejection-triage.md`.

## Example row

The CSV already contains this placeholder. Fees in the example are an illustration of how to note a quote; re-check `docs/pricing-comparison.md` before invoicing.

| Column | Example |
| --- | --- |
| client_ref | `example-alerts` |
| legal_name | Example Alerts LLC |
| csp | `telnyx` |
| brand_id | `BXXXXXXX` |
| campaign_id | `CXXXXXXX` |
| status | `campaign_pending` |
| numbers | `+15555550100` |
| opt_in_evidence_links | `https://example.com/sms-opt-in` |
| fees_noted | Telnyx, quote As-of 2026-09-24: brand application $4.50 one-time; campaign review $15 per downstream submission; low-volume mixed $1.50/mo billed 3 months initially. SaaS tier separate. Pass-through. |
| vertical | `account_notification` |
| mps_expectation | `0.25-4 MPS until the CSP shows a higher tier` |
| stop_list_scope | `example-alerts pool only` |
| cooling_period | `30 days after last send and campaign release` |
| notes | Placeholder row. No EIN. |

A second campaign for the same client is a second row with the same `client_ref` and its own `campaign_id`, numbers, and STOP scope if the pool is separate.
