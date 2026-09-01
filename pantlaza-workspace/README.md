# Pantlaza App — AI Agents for Compliance

Single-file web app (`public/index.html`, ~10,200 lines) deployed on Firebase Hosting.

- **Live:** https://dsf-advisors.web.app (Firebase project `dsf-advisors`)
- **Source of truth:** `public/index.html` in this folder — recovered from the live site on 2026-07-30 because the copies in Downloads (`Nomos_AI_WebApp.html`, Jul 20) were older than what was deployed.
- **Deploy:** run `firebase deploy` from this folder (CLI already logged in as manuelperez@cetis17.edu.mx).

## What's inside the app

- Login (Firebase Auth) + dashboard shell with 15 views: hub, cases, docs, taxes, excel, inbox, messages, agent, ai, qb (QuickBooks), integrations, kb, history, payment, admin
- Claude API calls go straight from the browser (`api.anthropic.com/v1/messages`); the user pastes their own `sk-ant-...` key in the AI settings (stored in localStorage)
- n8n automations: events POST to `https://mdlatecnologies.app.n8n.cloud/webhook/nomos-ai` (override in Admin → n8n)
- QuickBooks agent: manual export upload works; OAuth connect is still a stub
- All app data (cases, docs, messages, history, payments) persists in localStorage per user

## Naming history

Nexum AI → Nomos AI → **Pantlaza** ("Powered by MDLA Technologies"). Old filenames in Downloads keep the Nomos name.

Note: **Pantlaza** is also the name of the web agency landing page (separate product) — latest agency file: `Downloads\pantlaza.html`.
