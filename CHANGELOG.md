# Changelog

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
