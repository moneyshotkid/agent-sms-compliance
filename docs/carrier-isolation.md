# Carrier isolation strategy

**Goal:** One client’s traffic, reputation, and enforcement actions never damage another client.

Run the onboard checklist before the first production send. Run the offboard checklist when the client leaves or a campaign is suspended. Record the pool, key scope, STOP list, cooling period, and MPS on `templates/case-tracker.csv`.

## Rules

1. **Per-client number pools** — Long codes (and toll-free / short codes if used) are assigned to a single brand/campaign. No shared senders across unrelated customers.
2. **Per-client messaging services / campaigns** — Separate TCR campaign records; do not piggyback use cases.
3. **Per-client CSP tenancy** — Prefer subaccounts, Managed Accounts, or separate API credentials. Rotate keys on offboarding.
4. **No commingled traffic** — Never route Client A’s messages through Client B’s numbers “to save registration.”
5. **Suppression lists stay local** — STOP lists are scoped to the client pool (or global only inside that client’s brands).
6. **Incident blast radius** — If a carrier filters or suspends a campaign, only that client’s pool is affected.
7. **Throughput stays local** — MPS and daily caps attach to the brand/campaign/pool. Record the expectation so a neighbor’s send window is not borrowed.

## CSP tenancy

| CSP | Isolate with |
| --- | --- |
| Twilio | Subaccount (or equivalent separate credentials) and a secondary customer profile whose legal identity is the client. Messaging Service and numbers belong to that client only |
| Bandwidth | Separate credentials / account partition per client, plus that client’s own brand, campaign, and numbers |
| Telnyx | A **Managed Account** per customer, plus that customer’s own **brand**, **campaign**, **messaging profile**, and **dedicated numbers**. See below |

### Telnyx

Sources, re-checked 2026-09-24:

- ISVs & 10DLC — https://support.telnyx.com/en/articles/5593977-isvs-10dlc — `dateModified` 2026-07-17. One brand per end user. One campaign is tied to one brand. Numbers are not shared across brands. Telnyx’s migration order is: new messaging profile, dedicated number, brand, campaign, assign the campaign to the number.
- Managed Accounts — https://support.telnyx.com/en/articles/4951492-managed-accounts — `dateModified` 2026-07-17. Each Managed Account is its own organization with its own balance, API keys, usage, and settings. The manager account can administer it. Managed Accounts are a Telnyx commit-plan feature (Telnyx’s own Starter / Growth / Enterprise minimums). Those minimums are CSP cost, separate from Agent SMS Compliance SaaS tiers in `docs/pricing-comparison.md`.

Do not share a Telnyx number across brands. Assign at most the T-Mobile pool size the ISV article allows (49 numbers without a separate T-Mobile number-pool request).

## Onboard checklist

- [ ] `client_ref` exists on the case tracker and preflight is `ready`
- [ ] CSP tenancy created (Twilio subaccount, Bandwidth credential partition, or Telnyx Managed Account)
- [ ] API key created inside that tenancy and stored in the operator secret store
- [ ] Brand and campaign are this client’s legal entity and this program only
- [ ] Messaging Service or Telnyx messaging profile created for this client
- [ ] Number pool purchased or ported for this client; no number also sits on another client’s campaign
- [ ] Numbers associated only after campaign approval
- [ ] STOP / HELP wired; suppression list created and named in `stop_list_scope`
- [ ] `mps_expectation` filled (see Throughput / MPS)
- [ ] `cooling_period` filled before go-live
- [ ] Pass-through fees noted; SaaS tier invoiced separately

## Offboard checklist

- [ ] Stop sends on this pool
- [ ] Confirm the STOP list is exported into the client archive and is not merged into another client’s list
- [ ] Revoke or disable the API key / subaccount / Managed Account credential used for sends
- [ ] Cancel or transfer the campaign under CSP rules. Budget Bandwidth’s 3-month minimum (except political) and Telnyx’s initial three-month campaign billing; both are pass-through
- [ ] Release numbers from the campaign, then quarantine them for the cooling period
- [ ] Set tracker status to `offboarding`, then `closed` when the quarantine starts
- [ ] Archive consent evidence for the retention window in SKILL §3

## Cooling period

Operator policy, not a carrier-published SLA: after the last send and after the number is released from the campaign, quarantine it for **30 days**. During that window do not attach it to another brand or client.

If the campaign was dating, social, or ended in a content rejection, do not recycle the number to another client. Leave it quarantined for human review or retire it.

Record the policy in the tracker `cooling_period` column at onboard so offboard does not invent a shorter window under time pressure.

## Throughput / MPS

Newly approved low-tier brands often land around **~0.25–4 messages per second**. The per-second rate usually binds before the daily cap, so a 9am reminder batch may trickle rather than blast at 9:00. Set that expectation at handoff (SKILL §8) and store it in `mps_expectation`.

Isolation is what keeps one client’s filtering or suspension from consuming a neighbor’s throughput. A shared pool would make one client’s MPS the other client’s outage.

## Why this matters for AI agents

Agent products often share infra by default. Compliance-as-a-service must **force isolation** in the skill and in contracts so one rejected high-scrutiny program does not burn a neighbor’s throughput or STOP state.
