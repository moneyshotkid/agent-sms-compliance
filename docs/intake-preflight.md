# Intake → preflight

Run this after `templates/client-intake.md` and before any CSP submit. The agent emits a gap list. It does not invent missing evidence, and it does not file while the decision is `blocked`.

EIN / tax ID is operator-held. The preflight may say the field is present or missing. It must not copy the value into the repo, the case tracker, or a committed transcript.

## Map

| Intake field | Preflight check | If it is missing |
| --- | --- | --- |
| `legal_name` | `templates/brand-registration-fields.md` legal company name; SKILL §1 | **Blocks** brand submit |
| `ein_or_tax_id` | Same template, EIN row. Sole prop: only when `entity_type` is `sole_proprietor` and the CSP sole-prop path has no EIN | **Blocks** brand submit. Status `operator_held_missing`. Do not write the value down here |
| `entity_type` | SKILL §1 entity type. Public profit may need Authentication+ | **Blocks** brand submit |
| `website` | Brand website is live and matches the use case. SKILL §1 stop condition | **Blocks** brand and campaign |
| `use_case` | SKILL §2 one primary use case and campaign description | **Blocks** campaign submit |
| `opt_in_url` | SKILL §3 express opt-in page; `templates/consent-language.md`; screenshot in the client folder | **Blocks** campaign submit |
| `sample_messages` (2–5) | SKILL §2 samples match the website and the opt-in disclosure | **Blocks** campaign submit |
| `expected_volume` | Use-case picker (low-volume mixed vs standard) and the fee row in `docs/pricing-comparison.md` | **Blocks** fee quote and use-case selection |
| `vertical` | SKILL preconditions | Prohibited SHAFT, cannabis, or gambling → decision `do_not_file`. Dating or social dating → `escalate_before_filing` even when every field is present. Ordinary alerts → no extra flag |
| `privacy_policy_url` | Brand template; SMS section required | **Blocks** campaign submit |
| `terms_url` | Brand template | Gap. Does not by itself block if privacy already covers SMS purpose, frequency, and STOP/HELP |
| `help_reply` / `stop_reply` | SKILL §4; `templates/stop-help-replies.md` | **Blocks** campaign submit |
| `address` | Brand template. PO Box fails when the CSP forbids it | **Blocks** brand submit |
| `authorized_contact` | Brand template | **Blocks** brand submit |
| `dba` | HELP display name | Gap when HELP would otherwise show a different name than the brand |
| `csp` | SKILL §1 path: Bandwidth, Twilio, Telnyx, or direct TCR | **Blocks** filing. `undecided` is a gap |

Purchased or scraped lists with no SMS consent fail preflight even if `opt_in_url` is filled in. Record that as a blocking gap on `opt_in_url` / consent evidence.

## Missing-evidence output

Emit this block to the operator. Use `missing` when the client has not supplied the field. Use `operator_held_missing` when the EIN (or other operator-held ID) is not yet in the client folder. Use `present` only when the operator has the evidence.

```
## Preflight result

- client_ref: example-alerts
- decision: blocked
- risk_flag: none
- csp: undecided

### Gaps

| field | status | blocks | maps to |
| --- | --- | --- | --- |
| ein_or_tax_id | operator_held_missing | brand submit | templates/brand-registration-fields.md |
| opt_in_url | missing | campaign submit | SKILL §3, templates/consent-language.md |
| csp | missing | filing | SKILL §1 |

### Present

| field | evidence (no secrets) |
| --- | --- |
| legal_name | Example Alerts LLC |
| website | https://example.com |
| use_case | Appointment reminders requested at signup |
| vertical | account_notification |
| sample_messages | 2 samples on file |
| expected_volume | about 200 messages/day |

### Next

Store the EIN in the client folder, publish the opt-in URL, choose a CSP, then re-run preflight. Do not submit a brand or campaign on this pass.
```

### Decision values

| decision | Meaning |
| --- | --- |
| `blocked` | One or more blocking gaps. Do not file |
| `ready` | No blocking gaps. Dating/social still needs a human before filing when `risk_flag` is `escalate_before_filing` |
| `do_not_file` | Prohibited content. Stop. Do not shop the same use case across CSPs |

| risk_flag | Meaning |
| --- | --- |
| `none` | Ordinary transactional or operational traffic with evidence |
| `escalate_before_filing` | Dating, social dating, or another high-scrutiny case a human must accept before submit |
| `do_not_file` | Prohibited SHAFT, cannabis, or gambling promotion |

## After a ready result

1. Open or update `templates/case-tracker.csv` with status `preflight_ready`.
2. Continue at SKILL §1. Record Brand ID only after the CSP returns one.
3. Quote fees from `docs/pricing-comparison.md` using that file’s As-of date. Put the quoted lines in the tracker `fees_noted` column.

## Private MCP

This file is the checklist. The private MCP vendors it; it should not keep a second copy of the map. A later MCP tool can accept intake JSON (`templates/client-intake.schema.json`) and return this same gap list. That tool is not in this repository.
