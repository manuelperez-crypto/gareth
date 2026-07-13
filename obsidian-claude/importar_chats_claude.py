#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Importador de chats de Claude a Obsidian.

Convierte el archivo `conversations.json` (que obtienes al exportar tus datos
desde claude.ai) en notas Markdown, una por conversación, listas para tu
bóveda de Obsidian.

Uso:
    python importar_chats_claude.py conversations.json "C:/ruta/a/tu/boveda/Chats Claude"

No necesita instalar nada: solo Python 3 (viene incluido en macOS y Linux;
en Windows se instala desde python.org o la Microsoft Store).
"""

import json
import os
import re
import sys


def limpiar_nombre_archivo(nombre: str) -> str:
    """Quita caracteres que no se permiten en nombres de archivo."""
    nombre = nombre.strip() or "Conversación sin título"
    nombre = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "", nombre)
    nombre = re.sub(r"\s+", " ", nombre)
    return nombre[:120].strip() or "Conversación sin título"


def texto_del_mensaje(mensaje: dict) -> str:
    """Extrae el texto de un mensaje, soportando formatos viejos y nuevos del export."""
    partes = []
    # Formato nuevo: lista de bloques en "content"
    for bloque in mensaje.get("content") or []:
        if isinstance(bloque, dict) and bloque.get("type") == "text":
            partes.append(bloque.get("text", ""))
    # Formato viejo: campo "text" directo
    if not partes and mensaje.get("text"):
        partes.append(mensaje["text"])
    return "\n\n".join(p for p in partes if p).strip()


def fecha_corta(iso: str) -> str:
    """'2026-07-13T18:21:00.000Z' -> '2026-07-13 18:21'"""
    if not iso:
        return ""
    return iso[:16].replace("T", " ")


def convertir(ruta_json: str, carpeta_salida: str) -> None:
    with open(ruta_json, "r", encoding="utf-8") as f:
        conversaciones = json.load(f)

    if isinstance(conversaciones, dict):
        # Algunos exports envuelven la lista en un objeto
        conversaciones = (
            conversaciones.get("conversations")
            or conversaciones.get("chats")
            or [conversaciones]
        )

    os.makedirs(carpeta_salida, exist_ok=True)
    creadas = 0
    usados = set()

    for conv in conversaciones:
        titulo = conv.get("name") or "Conversación sin título"
        creada = fecha_corta(conv.get("created_at", ""))
        actualizada = fecha_corta(conv.get("updated_at", ""))
        uuid = conv.get("uuid", "")
        mensajes = conv.get("chat_messages") or conv.get("messages") or []

        if not mensajes:
            continue

        # Nombre de archivo único: "2026-07-13 Título.md"
        base = limpiar_nombre_archivo(titulo)
        prefijo = creada[:10] + " " if creada else ""
        nombre = f"{prefijo}{base}"
        candidato, n = nombre, 2
        while candidato.lower() in usados:
            candidato = f"{nombre} ({n})"
            n += 1
        usados.add(candidato.lower())

        lineas = [
            "---",
            'title: "{}"'.format(base.replace('"', "'")),
            f"created: {creada}" if creada else "created:",
            f"updated: {actualizada}" if actualizada else "updated:",
            f"claude_uuid: {uuid}",
            "tags:",
            "  - claude-chat",
            "---",
            "",
            f"# {base}",
            "",
        ]

        for msg in mensajes:
            texto = texto_del_mensaje(msg)
            if not texto:
                continue
            quien = "🧑 Tú" if msg.get("sender") == "human" else "🤖 Claude"
            cuando = fecha_corta(msg.get("created_at", ""))
            encabezado = f"## {quien}" + (f" — {cuando}" if cuando else "")
            lineas += [encabezado, "", texto, ""]

        ruta = os.path.join(carpeta_salida, candidato + ".md")
        with open(ruta, "w", encoding="utf-8") as f:
            f.write("\n".join(lineas))
        creadas += 1

    print(f"✅ Listo: {creadas} conversaciones convertidas en notas dentro de:")
    print(f"   {os.path.abspath(carpeta_salida)}")
    print("Abre Obsidian y ahí estarán (si la carpeta está dentro de tu bóveda).")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python importar_chats_claude.py conversations.json <carpeta de salida>")
        print('Ejemplo: python importar_chats_claude.py conversations.json "C:/Users/manuel/Documentos/MiBoveda/Chats Claude"')
        sys.exit(1)
    convertir(sys.argv[1], sys.argv[2])
