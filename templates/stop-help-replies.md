# STOP / HELP auto-reply templates

## HELP

```
[Brand]: [One-line what we text]. Support: [email or URL]. Reply STOP to opt out. Msg & data rates may apply.
```

## STOP (and synonyms)

```
[Brand]: You’re unsubscribed and will receive no more texts from this number. Reply HELP for help.
```

## Implementation notes

- Honor STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT (case-insensitive).
- Suppress within seconds; do not require app login to complete opt-out.
- Keep a suppression list shared across all numbers in the client’s pool.
- HELP must work even after STOP (informational only; do not re-subscribe without new opt-in).
