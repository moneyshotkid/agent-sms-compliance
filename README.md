# SMS 10DLC Compliance — Agent Skill

Loadable [Agent Skills](https://agentskills.io) pack for **US A2P 10DLC** brand/campaign registration, consent, STOP/HELP, and rejection triage — aimed at AI agents and ISVs that text end users.

## Install

```bash
npx skills add moneyshotkid/agent-sms-compliance
```

Or with the GitHub CLI skill helper (when available):

```bash
gh skill install moneyshotkid/agent-sms-compliance
```

Clone manually:

```bash
git clone https://github.com/moneyshotkid/agent-sms-compliance.git
```

Point your agent at `SKILL.md` (repo root). Supporting templates live under `templates/`, contracts under `contracts/`, and fee, intake, and isolation notes under `docs/`.

## When to use

- Intake and preflight before a Brand + Campaign filing (Twilio, Bandwidth, Telnyx, TCR)
- Fixing carrier / CSP rejections (weak opt-in, sample mismatch, and high-scrutiny verticals)
- Drafting consent language and STOP/HELP replies
- ISV isolation: one subaccount, Managed Account, or secondary profile per client

## Demo — example agent turn

**User:** “Twilio rejected our dating-coach SMS campaign for weak opt-in. What do we fix?”

**Skill-guided agent (summary):**

1. Pull rejection theme → weak opt-in (`SKILL.md` §6).
2. Require a public opt-in page with brand name, frequency, msg&data rates, and “consent not required to purchase.”
3. Wire checkbox + timestamped audit log; keep disclosure version.
4. Align website + privacy SMS section + sample messages (`templates/consent-language.md`, `templates/campaign-dating-social.md`).
5. Re-submit only after evidence exists. If content was the block, stop and escalate (`templates/rejection-triage.md`).
6. Confirm HELP/STOP with `templates/stop-help-replies.md` before production volume.

**User:** “Register Acme LLC for appointment reminders on Twilio as an ISV.”

**Skill-guided agent (summary):**

1. Collect intake (`templates/client-intake.md`): legal name, website, use case, opt-in, samples, volume, vertical. Store the EIN in the operator folder.
2. Use ISV primary profile + **secondary profile under Acme’s subaccount** (client legal identity, not yours).
3. Brand → Campaign → Messaging Service → numbers **after** approval.
4. Isolation: Acme-only number pool (`docs/carrier-isolation.md`).
5. Pass through TCR/CSP fees; do not invent prices (`docs/pricing-comparison.md`). SaaS tiers are Starter $49 / Pro $199 / Enterprise $499 and do not include those fees.

**User:** “Here is a new client. What is missing before we file?”

**Skill-guided agent (summary):**

1. Collect `templates/client-intake.md`. Keep the EIN in the operator folder (`XX-XXXXXXX` in any example).
2. Run `docs/intake-preflight.md` and emit the gap list.
3. If the decision is `blocked`, stop. Open `templates/case-tracker.csv` with status `preflight_gaps`.

## Layout

```
SKILL.md              # Canonical skill (agentskills frontmatter)
skill/SKILL.md        # Same file (compat path)
templates/            # Intake, brand, campaign, consent, STOP/HELP, case tracker, rejection triage
contracts/            # Draft MSA / process-warranty clauses
docs/                 # Pricing (Bandwidth, Twilio, Telnyx), intake preflight, carrier isolation
```

## Topics

`agent-skill` · `sms` · `10dlc` · `a2p` · `compliance` · `twilio` · `bandwidth` · `telnyx` · `tcr`

## Canonical playbook

This repository is the source of truth for the playbook:

- `SKILL.md` (canonical skill; agentskills frontmatter)
- `skill/SKILL.md` (same file, compat path — keep it identical; `npm run check:copies`)
- `templates/`
- `docs/` (`docs/pricing-comparison.md`, `docs/intake-preflight.md`, `docs/carrier-isolation.md`)
- `contracts/`

The private MCP server vendors these paths. Edit them here, then re-sync the MCP repo. Do not put secrets, API keys, client EINs, or government IDs in this repository.

## Disclaimer

Not legal advice. Carrier and TCR rules change. Dating and social messaging remain high-scrutiny and may be rejected regardless of paperwork quality. Prohibited SHAFT content (sex, hate, alcohol, firearms, tobacco), plus cannabis or gambling promotions, should not be filed.
