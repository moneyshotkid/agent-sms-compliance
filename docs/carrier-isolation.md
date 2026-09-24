# Carrier isolation strategy

**Goal:** One client’s traffic, reputation, and enforcement actions never damage another client.

## Rules

1. **Per-client number pools** — Long codes (and toll-free / short codes if used) are assigned to a single brand/campaign. No shared senders across unrelated customers.
2. **Per-client messaging services / campaigns** — Separate TCR campaign records; do not piggyback use cases.
3. **Per-client CSP tenancy** — Prefer subaccounts or separate API credentials. Rotate keys on offboarding.
4. **No commingled traffic** — Never route Client A’s messages through Client B’s numbers “to save registration.”
5. **Suppression lists stay local** — STOP lists are scoped to the client pool (or global only inside that client’s brands).
6. **Incident blast radius** — If a carrier filters or suspends a campaign, only that client’s pool is affected.

## Offboarding

1. Stop sends.
2. Cancel or transfer campaigns per CSP rules (watch 3-month Bandwidth minimums).
3. Release or quarantine numbers; do not immediately recycle into another dating/social client without cooling period and audit.
4. Revoke API keys; archive consent evidence per retention policy.

## Why this matters for AI agents

Agent products often share infra by default. Compliance-as-a-service must **force isolation** in the skill and in contracts so one rejected dating bot does not burn a neighbor’s throughput.
