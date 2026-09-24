# Draft contract language — Agent SMS Compliance

**Status:** Draft for counsel review. Not legal advice. Not an executed agreement.

**What this covers:** Process warranty only. Provider does not guarantee that any carrier, CSP, or The Campaign Registry will approve, keep, or un-suspend a brand, campaign, or number.

## Process path (order of work)

The Services follow the public playbook, in order:

1. Client intake (`templates/client-intake.md`). EIN / tax ID stays with the operator. It is not a deliverable stored in the playbook repo.
2. Preflight gap list (`docs/intake-preflight.md`). Filing waits until the decision is `ready`.
3. Brand, then campaign, then numbers, on an isolated pool (`docs/carrier-isolation.md`).
4. Rejection triage (`templates/rejection-triage.md`). Non-remediable rejections escalate to a human and stop the agent resubmit loop.
5. Handoff on the case tracker (`templates/case-tracker.csv`): Brand ID, Campaign ID, status, numbers, opt-in evidence links, fees noted, CSP.

SaaS fees (Starter $49/mo, Pro $199/mo, Enterprise $499/mo) pay for that process. TCR, CSP, vetting, campaign-review, monthly campaign, and carrier fees are pass-through under §4 and `docs/pricing-comparison.md`.

## 1. Liability cap (fees paid)

```
EXCEPT FOR A PARTY’S GROSS NEGLIGENCE, WILLFUL MISCONDUCT, OR BREACH OF CONFIDENTIALITY,
EACH PARTY’S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL
NOT EXCEED THE AMOUNTS PAID BY CLIENT TO PROVIDER FOR THE SERVICES IN THE TWELVE (12)
MONTHS PRECEDING THE CLAIM. IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT,
INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOST PROFITS, EVEN IF ADVISED
OF THE POSSIBILITY OF SUCH DAMAGES.
```

Optional tighter cap for Starter:

```
…shall not exceed the amounts paid by Client to Provider in the three (3) months preceding the claim.
```

The cap applies to SaaS fees paid to Provider. It is not a cap on pass-through amounts Provider has already remitted to a CSP, TCR, or carrier, and it is not a promise to refund those third-party fees after a rejection.

## 2. Client warranty — legitimate use case and real opt-in

```
Client represents and warrants that: (a) its messaging use case is lawful and accurately
described in registration materials; (b) it will not submit false, misleading, or incomplete
information to Provider or any CSP, TCR, or carrier; (c) it has obtained and will maintain
verifiable opt-in consent from each message recipient as required by applicable law and
carrier/CSP rules; (d) it will not use purchased, scraped, or otherwise non-consented
telephone numbers for A2P SMS; and (e) content will not violate CTIA, CSP, or carrier
prohibited-content policies (including SHAFT and adult-content rules). Client retains all
responsibility for message content and recipient lists.
```

## 3. Process warranty — no carrier-approval guarantee

```
Provider warrants that it will perform the Services in a professional and workmanlike manner
consistent with the skill pack and registration process described in the Order Form. Provider
does not warrant or guarantee that any CSP, The Campaign Registry, mobile network operator,
or other third party will approve, maintain, or refrain from suspending any brand, campaign,
or telephone number. Carrier filtering, throughput limits, surcharges, and enforcement actions
are outside Provider’s control. Provider’s obligation is limited to diligent process assistance,
accurate filing of Client-provided information, and reasonable remediation guidance after a
remediable rejection—not to any particular registration outcome.
```

Approval, throughput tier, delivery rate, and “we will get the campaign through” are outside this warranty. A rejected filing can still be a completed Service if intake, preflight, filing, and triage were done as described.

## 4. Pass-through fees

```
TCR, CSP, vetting, campaign-review, monthly campaign, and carrier fees are pass-through
costs, invoiced at the amount the CSP charges (including a CSP’s initial multi-month
campaign minimum and each campaign submission or downstream review the CSP bills).
They are not included in Starter, Pro, or Enterprise SaaS fees. Client authorizes Provider
to invoice such fees at cost [or cost plus __%]. Nonpayment of pass-through fees may
result in suspension of registration work and, where applicable, campaign cancellation.
Provider will identify the CSP fee article and As-of date on the case tracker before
invoicing. Fee articles change; the dated schedule controls over any older quote.
```

## 5. Isolation, STOP lists, and cooling

```
Provider will not knowingly place Client’s A2P traffic on telephone numbers, messaging
services, or messaging profiles shared with unrelated Client brands, except with Client’s
prior written consent. Provider will use a separate credential boundary where the CSP
supports it (subaccount, Managed Account, or separate API key), keep STOP/suppression
lists scoped to Client’s pool, and on offboarding stop sends, revoke those credentials,
and quarantine released numbers for the cooling period stated on the Order Form (default
thirty (30) days). Numbers that served a high-scrutiny or content-rejected program are
not recycled to another customer without written human review.
```

## 6. Non-remediable rejection

```
If a CSP, TCR, or carrier rejects or suspends a program for prohibited content, or
otherwise states that the rejection is not curable by correcting registration evidence,
Provider will stop resubmission, mark the case escalated, and refer it to human review.
Provider has no obligation to refile the same use case, including on a different CSP.
```

## 7. Governing note

Have counsel localize for Delaware / California / client jurisdiction and add DPA if EU/UK data is processed. Replace bracketed cost-plus language before use. Do not represent these clauses as an approved carrier filing.
