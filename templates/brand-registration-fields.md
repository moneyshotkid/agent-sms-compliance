# Brand registration — field checklist

Fill every field before CSP submit. Keep a copy in the client folder (not in git if PII).

Start from `templates/client-intake.md`. The EIN stays operator-held (`XX-XXXXXXX` in examples). `docs/intake-preflight.md` maps intake fields onto this table.

| Field | Value | Notes |
| --- | --- | --- |
| Legal company name | | Must match EIN / formation docs |
| DBA / display name | | Shown to end users in HELP text |
| Entity type | | Private / public / nonprofit / government |
| EIN / Tax ID | | Or sole-prop path if CSP allows |
| Street address | | Physical; no PO Box if CSP forbids |
| City / State / ZIP / Country | | |
| Website URL | | Live; matches use case |
| Vertical / industry | | Honest label (dating/social if true) |
| Authorized contact name | | |
| Authorized contact email | | |
| Authorized contact phone | | |
| Stock ticker (if public) | | |
| Privacy policy URL | | Must cover SMS |
| Terms of service URL | | SMS section preferred |
| Support email / URL | | Used in HELP replies |
| Estimated monthly volume | | Segments, not just messages |
| CSP account / subaccount | | Isolation per client |

## Attachments

- [ ] Formation doc / W-9 (if CSP requests)
- [ ] Screenshot of opt-in UI
- [ ] Privacy + Terms PDFs or URLs
