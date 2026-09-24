# Client intake

Collect this before preflight. Keep the completed form and the EIN in the operator client folder. Do not commit the completed form.

Field definitions for agents also live in `templates/client-intake.schema.json`. Mapping to the filing checklist is `docs/intake-preflight.md`.

## Field schema

| Field | Required | Held | Rule |
| --- | --- | --- | --- |
| `client_ref` | Recommended | Case tracker | Short id, lowercase, used as the tracker key |
| `legal_name` | Yes | Client folder | Legal entity name. Must match tax or formation records |
| `ein_or_tax_id` | Yes, unless sole prop with no EIN | **Operator only** | Never commit a real EIN. Docs and examples use `XX-XXXXXXX` |
| `entity_type` | Yes before brand submit | Client folder | `private_profit`, `public_profit`, `nonprofit`, `government`, or `sole_proprietor` |
| `website` | Yes | This form | Live URL. Content must match the use case |
| `use_case` | Yes | This form | One sentence: who texts whom, and why |
| `opt_in_url` | Yes | This form | Public opt-in page or screen. Screenshot stays in the client folder |
| `sample_messages` | Yes, 2–5 | This form | Match the live product. Include brand name and STOP where the CSP requires it |
| `expected_volume` | Yes | This form | Messages per day and, if known, segments per month. Drives low-volume vs standard |
| `vertical` | Yes | This form | Honest label. Dating/social → escalate before filing. Prohibited SHAFT, cannabis, gambling → do not file |
| `dba` | If different from legal name | Client folder | Display name used in HELP |
| `address` | Yes before brand submit | Client folder | Physical street. No PO Box when the CSP forbids it |
| `authorized_contact` | Yes before brand submit | Client folder | Name, email, phone |
| `privacy_policy_url` | Yes before campaign submit | This form | Must cover SMS |
| `terms_url` | Expected | This form | SMS section preferred |
| `help_reply` / `stop_reply` | Yes before campaign submit | This form | See `templates/stop-help-replies.md` |
| `csp` | Yes before filing | Case tracker | `bandwidth`, `twilio`, `telnyx`, `tcr_direct`, or `undecided` |

## Blank template

```
client_ref:
legal_name:
ein_or_tax_id: XX-XXXXXXX   # operator-held; replace only in the client folder
entity_type:
dba:
website:
use_case:
opt_in_url:
vertical:
expected_volume:
  summary:
  messages_per_day:
  segments_per_month:
sample_messages:
  1.
  2.
privacy_policy_url:
terms_url:
help_reply:
stop_reply:
address:
  street:
  city:
  region:
  postal_code:
  country:
authorized_contact:
  name:
  email:
  phone:
csp:
```

## Example (placeholders only)

```
client_ref: example-alerts
legal_name: Example Alerts LLC
ein_or_tax_id: XX-XXXXXXX
entity_type: private_profit
dba: Example Alerts
website: https://example.com
use_case: Example Alerts texts its own customers appointment reminders they requested at signup.
opt_in_url: https://example.com/sms-opt-in
vertical: account_notification
expected_volume:
  summary: about 200 messages per day
  messages_per_day: 200
  segments_per_month: 8000
sample_messages:
  1. Example Alerts: Reminder — your visit is tomorrow at 9:00 AM. Reply STOP to opt out, HELP for help.
  2. Example Alerts: You’re confirmed for SMS reminders. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel.
privacy_policy_url: https://example.com/privacy
terms_url: https://example.com/terms
help_reply: Example Alerts: Appointment reminders. Support: help@example.com. Reply STOP to opt out.
stop_reply: Example Alerts: You’re unsubscribed and will receive no more texts from this number.
address:
  street: 1 Example Way
  city: Springfield
  region: IL
  postal_code: 62701
  country: US
authorized_contact:
  name: A. Operator
  email: ops@example.com
  phone: +15555550100
csp: undecided
```

The string `XX-XXXXXXX` is a placeholder. A completed intake with a real EIN stays out of this repository.
