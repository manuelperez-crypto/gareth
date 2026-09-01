# Pantlaza App — Deploy Guide

Todo se corre desde esta carpeta (`Escritorio\pantlaza-app`). El CLI ya está logueado como manuelperez@cetis17.edu.mx.

## 1. Preparación en la consola de Firebase (una sola vez)

1. **Plan Blaze** (las Cloud Functions lo requieren; tiene free tier generoso):
   https://console.firebase.google.com/project/dsf-advisors/usage/details
2. **Authentication → Sign-in method → Email/Password → Enable**:
   https://console.firebase.google.com/project/dsf-advisors/authentication/providers
3. **Firestore**: si nunca se creó la base, créala en **production mode**:
   https://console.firebase.google.com/project/dsf-advisors/firestore

## 2. Secrets (una sola vez)

```powershell
cd $HOME\OneDrive\Documentos\Escritorio\pantlaza-app

# Tu API key de Anthropic (sk-ant-...) — vive SOLO en el servidor
firebase functions:secrets:set ANTHROPIC_API_KEY

# Inventa una clave fuerte para el endpoint de setup (guárdala)
firebase functions:secrets:set SETUP_KEY

# QuickBooks: crea una app en https://developer.intuit.com (tipo QuickBooks Online Accounting)
# Redirect URI de la app de Intuit: https://dsf-advisors.web.app/api/qb/callback
firebase functions:secrets:set QB_CLIENT_ID
firebase functions:secrets:set QB_CLIENT_SECRET
```

> QuickBooks es opcional — puedes deployar sin esos dos secrets y configurarlos después,
> pero el deploy de functions pedirá que existan. Si aún no tienes cuenta de Intuit,
> pon cualquier valor placeholder y actualízalo luego.

## 3. Instalar dependencias y deployar

```powershell
cd functions
npm install
cd ..
firebase deploy
```

Esto sube: hosting (la app con todos los cambios), las 5 functions, y las reglas de Firestore.

## 4. Crear los usuarios reales (una sola vez, después del deploy)

```powershell
curl.exe -X POST https://dsf-advisors.web.app/api/setup/users -H "x-setup-key: TU_SETUP_KEY"
```

Crea las 7 cuentas del equipo en Firebase Auth (`admin@pantlaza.app`, `ana.garcia@pantlaza.app`, ...)
con las contraseñas demo actuales. **Cámbialas después** con el mismo endpoint:

```powershell
curl.exe -X POST https://dsf-advisors.web.app/api/setup/users -H "x-setup-key: TU_SETUP_KEY" -H "Content-Type: application/json" -d "{\"passwords\":{\"admin\":\"NUEVA_CLAVE\"}}"
```

⚠️ Las contraseñas también están hardcodeadas en `public/index.html` (login demo). Si las cambias
en Firebase, actualiza el array `USERS` del bloque "AUTH OVERRIDE" al final del archivo para que coincidan.

## 5. n8n

Importa `n8n/pantlaza-events-workflow.json` en tu instancia (mdlatecnologies.app.n8n.cloud):
Workflows → Import from File. Reemplaza cada nodo NoOp con la acción real (Telegram, Gmail, Sheets)
y actívalo. El path del webhook (`nomos-ai`) es el mismo que la app ya usa — si tienes un workflow
viejo activo en ese path, desactívalo primero.

## 6. Probar

1. https://dsf-advisors.web.app → login con `admin` / `dsf_admin` → consola del browser debe decir `Firebase Auth: signed in as admin` y `Syncing from Firestore...`
2. Vista **Memo (AI)** → pregunta algo SIN poner API key en Admin → debe responder vía `/api/claude`
3. Vista **QuickBooks** → Connect → OAuth popup de Intuit → autoriza → "QuickBooks data loaded"
4. Admin → n8n → botón de test → revisa la ejecución en n8n

## Qué asegura cada pieza (seguridad)

| Pieza | Antes | Ahora |
|---|---|---|
| Firestore | Reglas abiertas — cualquiera leía/escribía todo | Solo usuarios autenticados; cada quien su data; admin ve todo |
| API key de Claude | En el browser (localStorage) | Secret del servidor; el proxy exige login |
| QuickBooks | Sin conexión real | Tokens en colección server-only, refresh automático |
| Login | Solo teatro client-side | Firebase Auth real respaldando al login demo |
