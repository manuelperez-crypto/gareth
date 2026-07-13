# Conectar tu PC y tus chats de Claude con Obsidian

Esta guía te deja tres cosas funcionando en tu computadora:

1. **Tus chats de Claude convertidos en notas de Obsidian** (importación).
2. **Claude Desktop conectado a tu bóveda de Obsidian**, para que en chats futuros Claude pueda leer y escribir tus notas directamente.
3. **Acceso de Claude a otras carpetas de tu PC** (Documentos, proyectos, etc.).

> **Nota importante:** Obsidian no se conecta a "toda la PC". Obsidian trabaja con una **bóveda** (vault), que es simplemente una carpeta de tu computadora. Todo lo que pongas dentro de esa carpeta aparece en Obsidian. Lo que haremos es meter tus chats en esa carpeta y darle a Claude acceso a ella.

---

## Parte 1 — Importar tus chats de Claude a Obsidian

### Paso 1: Exportar tus chats desde claude.ai

1. Entra a [claude.ai](https://claude.ai) en el navegador.
2. Haz clic en tus iniciales (abajo a la izquierda) → **Settings** (Configuración).
3. Ve a **Privacy** (Privacidad) → **Export data** (Exportar datos).
4. Te llegará un **correo con un enlace de descarga** (puede tardar unos minutos).
5. Descarga el archivo `.zip` y descomprímelo. Dentro encontrarás un archivo llamado **`conversations.json`** — ese contiene todos tus chats.

### Paso 2: Ejecutar el script de importación

En esta misma carpeta está el script `importar_chats_claude.py`. Cópialo a tu PC y ejecútalo así (necesitas Python 3, que en Windows se instala gratis desde la Microsoft Store buscando "Python"):

```
python importar_chats_claude.py conversations.json "C:\Users\TU_USUARIO\Documentos\MiBoveda\Chats Claude"
```

- El primer argumento es la ruta al `conversations.json` que descargaste.
- El segundo es la carpeta **dentro de tu bóveda de Obsidian** donde quieres las notas (se crea sola si no existe).

El script crea **una nota por conversación**, con título, fecha, etiqueta `#claude-chat` y los mensajes marcados como "🧑 Tú" y "🤖 Claude". Abre Obsidian y ahí estarán.

> Puedes repetir el proceso cada cierto tiempo (exportar de nuevo y volver a correr el script) para traer los chats nuevos. Las notas de conversaciones ya importadas simplemente se actualizan.

### ¿Todavía no tienes bóveda de Obsidian?

1. Descarga Obsidian gratis en [obsidian.md](https://obsidian.md).
2. Al abrirlo, elige **"Create new vault"** (Crear nueva bóveda), dale un nombre y elige dónde guardarla (por ejemplo, en Documentos).
3. Esa carpeta es tu bóveda: usa su ruta en el comando del Paso 2.

---

## Parte 2 — Conectar Claude Desktop a tu bóveda (y a tu PC)

Con esto, en chats futuros Claude podrá **leer, buscar, crear y editar notas** de tu bóveda directamente, sin exportar nada.

1. Descarga **Claude Desktop** (la aplicación para Windows/Mac) desde [claude.ai/download](https://claude.ai/download) e inicia sesión.
2. Abre **Settings** (Configuración) → **Extensions** (Extensiones) / **Connectors** (Conectores).
3. Instala la extensión **Filesystem** (Sistema de archivos), que es oficial de Anthropic.
4. Cuando te pida qué carpetas permitir, agrega:
   - La carpeta de tu **bóveda de Obsidian**.
   - Cualquier otra carpeta de tu PC a la que quieras que Claude tenga acceso (por ejemplo, Documentos o tus proyectos).
5. Reinicia Claude Desktop.

Listo. Ahora en cualquier chat puedes decirle cosas como:

- *"Busca en mi bóveda de Obsidian mis notas sobre el proyecto DSF"*
- *"Crea una nota nueva en Obsidian con el resumen de esta conversación"*
- *"Lee el archivo X de mi carpeta Documentos"*

> **Consejo de seguridad:** dale acceso solo a las carpetas que realmente necesites. No hace falta (ni conviene) dar acceso a todo el disco C:\.

---

## Parte 3 — Guardar chats nuevos en Obsidian sin exportar

Una vez hecha la Parte 2, ya no necesitas exportar para guardar conversaciones nuevas: al final de cualquier chat en Claude Desktop, simplemente pídele:

> *"Guarda esta conversación como nota en la carpeta 'Chats Claude' de mi bóveda de Obsidian"*

y Claude la escribirá directamente como archivo Markdown en tu bóveda.

---

## Resumen

| Qué quieres | Cómo se hace |
|---|---|
| Traer chats antiguos a Obsidian | Exportar datos en claude.ai + script `importar_chats_claude.py` (Parte 1) |
| Que Claude lea/escriba tus notas | Claude Desktop + extensión Filesystem apuntando a tu bóveda (Parte 2) |
| Guardar chats nuevos automáticamente | Pedírselo a Claude al final del chat (Parte 3) |
| "Conectar toda la PC" | Agregar las carpetas que quieras a la extensión Filesystem (Parte 2, paso 4) |
