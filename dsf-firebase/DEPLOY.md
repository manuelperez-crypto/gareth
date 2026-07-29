# DSF Advisors — Deploy Guide
## Sistema v2 — AI Agent Control + IA desde archivo local

---

## CAMBIOS EN V2

- ✅ **IA funciona desde archivo local** — ya no necesitas Firebase para probar. Abre el HTML directo, pon tu API key en AI Assistant y todo funciona.
- ✅ **Nuevo tab: AI Agent Control** — Gmail, QuickBooks y Drive controlados por IA con aprobación humana
- ✅ **Cola de aprobación** — cada acción propuesta requiere tu ✓ antes de ejecutarse

---

## LO QUE NECESITAS (una sola vez)

1. Node.js instalado → https://nodejs.org (descarga la versión LTS)
2. Una cuenta en console.anthropic.com con API key
3. Tu cuenta Google con acceso al proyecto dsf-advisors en Firebase

---

## PASO 1 — Instalar Firebase CLI

```
npm install -g firebase-tools
```

## PASO 2 — Login en Firebase

```
firebase login
```

## PASO 3 — Deploy

```
cd dsf-firebase
firebase use dsf-advisors
firebase deploy --only hosting
```

URL live: **https://dsf-advisors.web.app**

---

## PARA PRUEBAS RÁPIDAS (sin Firebase)

1. Abre `ai-supervision-system.html` en Chrome
2. Login con `admin` / `dsf_admin`
3. Ve a **AI Assistant** → pon tu API key de Anthropic
4. Ve a **Integrations** → conecta Gmail, QuickBooks o Drive (modo demo)
5. Ve a **AI Agent** → haz click en **Scan & Propose Actions**

---

## USUARIOS

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | dsf_admin | Administrador |
| ana.garcia | dsf2024 | Senior Compliance Officer |
| carlos.mendoza | dsf2024 | Risk Analyst |
| sofia.ruiz | dsf2024 | Fraud Prevention Specialist |
| michael.torres | pay2024 | Payment Approver |
| linda.park | pay2024 | Payment Confirmer |
| dsf.live | live2024 | Live User (pantalla limpia) |

---

*DSF Advisors Financial Intelligence LLC — AI Supervision System v2*
*150 Parker Ave Suite 300, Hackensack, NJ 07601*
