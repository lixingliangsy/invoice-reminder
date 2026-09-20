# Dunner — Security & Compliance (billing data — MANDATORY full depth)

## What we handle
Dunner processes the client name, amount owed, and days-overdue you enter to draft reminder emails. This is billing/financial-adjacent data and treated as sensitive. We do **not** move money or read your bank.

## Data handling commitments
- **Minimization (GDPR Art.5):** we keep only what is needed to draft the reminder; avoid long retention. ref: https://gdpr-info.eu/art-5/
- **No financial-institution access:** Dunner never reads accounts or initiates payments. ref: OWASP A01. https://owasp.org/Top10/A01_2021-Broken_Access_Control/
- **Encryption in transit:** TLS. ref: OWASP ASVS V9.
- **No silent mock:** if live AI is unavailable, the tool returns a `503 AI_NOT_CONFIGURED` or a labeled rule-based draft — never fake "sent" confirmations under HTTP 200.

## Compliance posture (honesty rule)
> **We do NOT guarantee** payment, collection, or that a client will respond. Dunner drafts professional reminders; it is not a debt collector, legal, or tax advisor. Your contract and local laws govern collection. Output is a writing aid, not legal sign-off.

## Subprocessors
- Hosting: **Vercel**. Payments: **Waffo** (card data never stored by us).
- No billing data sold to third parties.

## Request handling
- Deletion / access: contact support; actioned within reasonable GDPR timelines (Art.15–17). ref: https://gdpr-info.eu/art-17/
- Webhook (Waffo) verifies RSA-SHA256 signatures and dedupes on event/order id; we do not modify that handler.
