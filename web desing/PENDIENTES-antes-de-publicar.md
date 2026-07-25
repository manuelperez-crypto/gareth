# DSF Advisors — Checklist antes de publicar

Estado del sitio: **listo en diseño y estructura**. Falta contenido final y unos pasos técnicos.
Toda la info de negocio la aprueba **Wilfredo Rodriguez (CPA)**.

---

## 1. Contenido real (reemplazar lo que está como "demo")

- [ ] **Equipo** — perfiles demo pendientes: Maria Garcia, David Lee, Sarah Brown
      (foto cuadrada de estudio + nombre + puesto + bio real de cada uno).
      Ya están reales: Wilfredo, Vernis, Keyla, Freddy.
- [ ] **Reseñas / testimonios** — las 6 actuales son demo. Poner las reales.
      ⚠️ Si DSF es RIA registrada, revisar avisos de la *SEC Marketing Rule* (Wil sabe).
- [ ] **News / noticias** — 1 real (adquisición Advisors CPA) + 2 tarjetas demo por llenar.

## 2. Cifras y afirmaciones (las aprueba Wil)

- [ ] Confirmar: **$1.5B+** en administración · **$300M+** en private equity · **20+ años** · **8 años PwC**.
      Deben ser exactas y demostrables.

## 3. Legal (contenido lo aprueba Wil; textos vía generador)

- [ ] **Términos y Condiciones** y **Política de Privacidad/Cookies** — hoy son plantilla profesional.
      Generar los definitivos con Termly / iubenda (~$20) y Wil los revisa. Luego reemplazarlos en los paneles.
- [ ] Disclaimer "esto no es asesoría financiera" — ya incluido; que Wil confirme.

## 4. Técnico (al momento de publicar en Firebase)

- [ ] **Auto-hospedar las fotos** — usar `dsf-selfhost.html` + correr `descargar-imagenes.ps1`
      (crea la carpeta `images/`). Así las fotos no dependen de Unsplash.
      *(Nota: Unsplash es legal para uso comercial; esto es solo por robustez.)*
- [ ] **Formulario de contacto** — hoy usa formsubmit.co; verificar/activar el correo destino (info@dsfadv.com).
- [ ] **Dominio** — conectar `dsfadv.com` en Firebase Hosting (cambiar registros DNS; NO tocar los MX del correo).
- [ ] Renombrar el HTML final a `index.html` al subirlo.

## Ya hecho ✅

- Logo real (oficial) integrado, con su navy exacto (#041e42) en todo el sitio.
- Correo info@dsfadv.com, teléfono (201) 212-5584, dirección 55 Main St, 3rd Floor, Hackensack NJ 07601.
- Sección de equipo en pirámide (Partners arriba), paneles individuales por miembro.
- Banner de cookies + paneles de Términos y Privacidad.
- Portada, servicios (con nota de expansión Advisors CPA), asesoría, industrias, proceso, FAQ, contacto, mapa.
- Segunda oficina (Midland Park — Advisors CPA): 700 Godwin Avenue, Suite 210, Midland Park NJ 07432,
  tel (201) 794-9300, fax (201) 794-3355, info@cpaadvisors.tax, con su propio mapa.
- Auditoría de accesibilidad WCAG 2.1 AA: 0 violaciones (axe-core, escritorio y móvil).
- Ortografía revisada, todo en inglés, responsive (móvil), tipografía y color de marca.
