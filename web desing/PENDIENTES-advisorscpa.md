# Advisors CPA — Checklist antes de publicar

Sitio: `advisorscpa-v1.html` (hermano del sitio DSF, mismo sistema de diseño navy #041e42).
Estado: **listo en diseño y estructura**. Falta contenido final y unos pasos técnicos.
Toda la info de negocio la aprueba **Wilfredo Rodriguez (CPA)**.

---

## 1. Contenido real (reemplazar lo que está como "Demo")

- [ ] **Logo real de Advisors CPA** — hoy es un wordmark de texto ("A" + Advisors CPA).
      Si la firma tiene logo propio, integrarlo igual que se hizo con el de DSF.
- [ ] **Equipo** — los 3 perfiles son placeholders (Managing Partner, Senior Accountant,
      Office Manager). Poner nombres, fotos cuadradas de estudio y bios reales.
- [ ] **Reseñas / testimonios** — las 3 actuales son demo. Poner las reales.
- [ ] **Horario de oficina** — puse Lun–Vie 9:00–5:00 como demo; confirmar el real
      (y si cambia en temporada de impuestos).
- [ ] **Cifra "20+ años sirviendo a clientes"** — confirmarla con Wil (está marcada Demo).
- [ ] **Historia de la firma** — el texto de About es genérico ("firma de barrio en
      Midland Park"); si hay año de fundación o historia real, ponerla.

## 2. Datos ya reales (verificados contra el sitio DSF) ✅

- Dirección: 700 Godwin Ave, Suite 210, Midland Park, NJ 07432 (con mapa propio).
- Tel (201) 794-9300 · Fax (201) 794-3355 · info@cpaadvisors.tax.
- Adquisición por el grupo DSF (2026) y rol como práctica fiscal del grupo.
- Link real a la biblioteca de recursos: advisors.cpa/resources/resources-library.
- Oficina DSF Hackensack (55 Main St, 3rd Floor) como sede del grupo, con su mapa.
- Links oficiales IRS (refunds, payments) y NJ Division of Taxation.

## 3. Legal (contenido lo aprueba Wil; textos vía generador)

- [ ] **Términos y Condiciones** y **Política de Privacidad/Cookies** — hoy son plantilla
      profesional (marcadas "Template"). Generar definitivos con Termly / iubenda y que
      Wil los revise. Luego reemplazarlos en los paneles.

## 4. Técnico (al momento de publicar)

- [ ] **Formulario de contacto** — usa formsubmit.co hacia info@cpaadvisors.tax.
      El primer envío dispara un correo de activación a esa bandeja: hay que confirmarlo
      una vez para que empiecen a llegar los mensajes.
- [ ] **Dominio** — decidir dónde vive: ¿advisors.cpa (reemplaza el sitio actual),
      cpaadvisors.tax, o subcarpeta del hosting de DSF en Firebase?
- [ ] **Auto-hospedar las fotos** — las imágenes de servicios/proceso son de Unsplash
      (legal para uso comercial); por robustez, replicar el flujo de descarga local
      que se usó para DSF (`descargar-imagenes.ps1`) antes de publicar.
- [ ] Renombrar el HTML final a `index.html` al subirlo.

## Ya hecho ✅

- Sitio completo de una sola página: hero (gradiente navy de marca, sin foto stock),
  marquee, about, 8 servicios con alcance desplegable + tarjeta ancha del grupo DSF,
  sección "One group" (stack de capacidades), recursos con links reales, cifras,
  proceso en 4 pasos, equipo (placeholders), FAQ (6), reseñas (demo), contacto con
  formulario, 2 mapas (Midland Park + Hackensack), footer, banner de cookies y
  paneles de Términos y Privacidad.
- Mismo sistema de diseño que DSF v2: navy #041e42, Poppins, mismos patrones de
  interacción (nav sólida al scroll, reveal, acordeones, cursor, ripple, barra de progreso).
- Cross-links en ambos sentidos con DSF (dsfadv.com) — "A DSF Group Company".
- Auditoría de accesibilidad WCAG 2.1 AA: **0 violaciones** (axe-core, escritorio y móvil).
- Responsive (móvil sin overflow horizontal), reduced-motion respetado, skip link,
  formulario con labels y honeypot antispam.
