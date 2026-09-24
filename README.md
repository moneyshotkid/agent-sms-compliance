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

Point your agent at `SKILL.md` (repo root). Supporting templates live under `templates/`, contracts under `contracts/`, and fee/isolation notes under `docs/`.

## When to use

- Registering a Brand + Campaign for US 10DLC (Twilio, Bandwidth, TCR)
- Fixing carrier / CSP rejections (weak opt-in, sample mismatch, dating/social)
- Drafting consent language and STOP/HELP replies
- ISV patterns: one subaccount / secondary profile per client

## Demo — example agent turn

**User:** “Twilio rejected our dating-coach SMS campaign for weak opt-in. What do we fix?”

**Skill-guided agent (summary):**

1. Pull rejection theme → weak opt-in (`SKILL.md` §6).
2. Require a public opt-in page with brand name, frequency, msg&data rates, and “consent not required to purchase.”
3. Wire checkbox + timestamped audit log; keep disclosure version.
4. Align website + privacy SMS section + sample messages (`templates/consent-language.md`, `templates/campaign-dating-social.md`).
5. Re-submit only after evidence exists; do not resubmit identical SHAFT-adjacent copy if content was the real block.
6. Confirm HELP/STOP with `templates/stop-help-replies.md` before production volume.

**User:** “Register Acme LLC for appointment reminders on Twilio as an ISV.”

**Skill-guided agent (summary):**

1. Collect EIN, legal name, website, authorized reps (`templates/brand-registration-fields.md`).
2. Use ISV primary profile + **secondary profile under Acme’s subaccount** (client legal identity, not yours).
3. Brand → Campaign → Messaging Service → numbers **after** approval.
4. Isolation: Acme-only number pool (`docs/carrier-isolation.md`).
5. Pass through TCR/CSP fees; do not invent prices (`docs/pricing-comparison.md`).

## Layout

```
SKILL.md              # Canonical skill (agentskills frontmatter)
skill/SKILL.md        # Same file (compat path)
templates/            # Brand, campaign, consent, STOP/HELP
contracts/            # Draft MSA clauses
docs/                 # Pricing comparison + carrier isolation
```

## Topics

`agent-skill` · `sms` · `10dlc` · `a2p` · `compliance` · `twilio` · `tcr`

## Disclaimer

Not legal advice. Carrier and TCR rules change. Dating and social messaging remain high-scrutiny and may be rejected regardless of paperwork quality.
