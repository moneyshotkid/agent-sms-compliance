# Changelog

## 0.3.0 — 2026-09-24

### Added

- Client intake: `templates/client-intake.md` and `templates/client-intake.schema.json` (legal name, operator-held EIN, website, use case, opt-in URL, sample messages, expected volume, vertical). Examples use the placeholder `XX-XXXXXXX`.
- Intake → preflight: `docs/intake-preflight.md` maps those fields onto the existing checklists and defines the missing-evidence block (`blocked` / `ready` / `do_not_file`). SKILL §0 tells the agent to emit gaps before any CSP submit.
- Case tracker: `templates/case-tracker.csv` and `templates/case-tracker.md` (Brand ID, Campaign ID, status, numbers, opt-in evidence links, fees noted, CSP). A spreadsheet, not a database.
- Isolation onboard and offboard checklists in `docs/carrier-isolation.md` (pools, keys, STOP lists, 30-day cooling period, MPS row) and the matching SKILL §8 handoff items. Telnyx isolation is a Managed Account plus that customer’s brand, campaign, messaging profile, and dedicated numbers.
- Telnyx column and section on `docs/pricing-comparison.md`, fetched 2026-09-24 from Telnyx Help Center “10DLC Fees and Charges” (`dateModified` 2026-07-17): brand application **$4.50**; sole prop brand **$4.00** (sole prop guide); campaign review **$15** per downstream carrier review; monthly **$1.50** low-volume mixed through **$10** standard; campaign fees billed three months initially; Telnyx states it does not mark up 10DLC fees. Side-by-side with Bandwidth and Twilio.
- Pricing pack language for SaaS Starter **$49** / Pro **$199** / Enterprise **$499**, with pass-through called out separately from those tiers.
- Support worksheet `templates/rejection-triage.md`: remediable fixes versus **non-remediable → human escalate**.
- Contract process path and explicit no-carrier-approval clauses in `contracts/draft-msa-clauses.md` (pass-through, isolation and cooling, stop on non-remediable rejection).

### Changed

- Skill version **0.2.0 → 0.3.0**. `SKILL.md` and `skill/SKILL.md` stay identical.

### Notes

- This repository is the canonical playbook (`SKILL.md`, `templates/`, `docs/`, `contracts/`). The private MCP vendors these files; do not edit copies only in the MCP repo.
- Bandwidth and Twilio registration amounts from 0.2.0 are unchanged. Telnyx is new on the sheet.

## 0.2.0 — 2026-09-24

### Added

- Twilio campaign vetting (**$15**) is charged per campaign submission / resubmission, not once for the life of the campaign. Operator note: roughly **~4 submissions** is common practice before a permanent deny (after ~3 burns, ~$45, one attempt may remain before a new legal entity is required). Practical guidance, not a Twilio SLA. Ties to SKILL §6.
- Handoff checklist (SKILL §8) includes throughput / MPS expectations for newly approved low-tier brands (~0.25–4 messages per second). `docs/carrier-isolation.md` states the same rate so isolation rationale and the checklist match.

### Changed

- Re-verified 10DLC registration fees and date-stamped `docs/pricing-comparison.md` **As of: 2026-09-24**.
- Twilio brand registration now follows the Help Center pricing article (updated 2026-06-15), not the older bundles still printed on the A2P 10DLC product page. Standard brand **$44 → $46** (includes secondary vetting). Low-volume standard and sole proprietor brand **$4 → $4.50**. Campaign vetting ($15) and monthly campaign bands are unchanged.
- Bandwidth registration amounts were re-checked against the fees article (`dateModified` 2026-09-16) and did not change. The sheet now lists the failed-vet, appeal, and political-vet rows explicitly, and notes that Authentication+ applies to all brands after 2027-01-21.
- `SKILL.md` and `skill/SKILL.md` stay identical. Rejection triage keeps the non-remediable rule and now says to escalate to human compliance review. Preconditions state the filing outcomes: do not file prohibited SHAFT / cannabis / gambling, escalate dating and social dating, proceed with evidence for ordinary alerts.

### Notes

- This repository is the canonical playbook (`SKILL.md`, `templates/`, `docs/`, `contracts/`). The private MCP vendors these files; do not edit copies only in the MCP repo.
- Starter $49 / Pro $199 / Enterprise $499 remain Agent SMS Compliance product tiers.
