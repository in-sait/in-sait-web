# Backlog — In-sait web

Tickets ordenados por bloque. Cada uno tiene contexto, criterio de aceptación
y qué bloquea/depende.

**Actualizado 2026-07-09:** toda la infraestructura base (dominio, hosting,
email, envío del formulario) quedó COMPLETADA en la sesión del 08–09/07. Ver
detalles técnicos y gotchas en mempalace: wing `in-sait`, rooms
`infra-deploy-completado` y `appflowy-selfhost`.

---

## Bloque 1 — Housekeeping inmediato

### TICKET-01 · Commit inicial del proyecto ✅ COMPLETADO (2026-07-09)
Repo commiteado y pusheado. Además, **transferido a una GitHub Organization
propia**: [github.com/in-sait/in-sait-web](https://github.com/in-sait/in-sait-web)
(privado). El remote local ya apunta ahí.

---

## Bloque 2 — Contenido y SEO básico (no bloquean nada, rápidos)

### TICKET-02 · Favicon y metadata de imagen social (OG)
**Prioridad:** media · **Depende de:** nada · **Estado:** pendiente, ya desbloqueado (hay dominio)

**Contexto:** El `<head>` generado por `layout.tsx` no tiene favicon ni imagen
`og:image`. Hoy compartir el link (`https://insait.com.ar`) en WhatsApp/LinkedIn
no muestra nada representativo, y la pestaña del navegador usa el ícono default
de Next.js. Assets de marca: `D:\In-sait\Insait pantallas\` tiene variantes de
ícono; `insait-mark.svg` ya está en `public/assets/brand/`.

**Alcance:**
- Generar favicon (+ `icon.png`/`apple-icon.png`) desde el mark, vía convenciones
  de archivo de `app/` (`app/icon.png`, `app/apple-icon.png` — Next los sirve solos).
- Imagen OG 1200×630 (fondo oscuro de marca + logo + "Data Insights, Always On.")
  y sumar `openGraph.images` / `twitter` al `metadata` de `layout.tsx`.

**Criterio de aceptación:** la pestaña muestra el ícono de In-sait; un preview de
link (OG debugger) muestra imagen y texto correctos.

---

### TICKET-03 · SEO técnico: sitemap y robots
**Prioridad:** baja · **Depende de:** nada (dominio ya definido: `insait.com.ar`)

**Alcance:**
- `app/sitemap.ts` (Next 16, genera `sitemap.xml`) con la home.
- `app/robots.ts` con reglas permisivas + referencia al sitemap.
- Setear `metadataBase` en `layout.tsx` con `https://insait.com.ar` para que las
  URLs de sitemap/OG sean absolutas.

**Criterio de aceptación:** `/sitemap.xml` y `/robots.txt` responden 200 con
contenido válido.

---

## Bloque 3 — Decisión de contenido pendiente

### TICKET-04 · Definir si se agrega la sección "Testimonios"
**Prioridad:** a decidir · **Depende de:** decisión del usuario

**Contexto:** `DESIGN_BRIEF_landing.md` incluye una sección "Testimonials"; el
diseño final aprobado (`Insait Landing.dc.html`) **no la incluye** — se saltea de
Pain Points a FAQ a propósito. La build actual sigue el diseño final.

**Restricción del `PRODUCT.MD`:** nunca inventar clientes/casos de éxito. Hoy no
hay testimonios reales → si se agrega, con placeholders explícitos o cuando haya
casos reales.

**Criterio de aceptación:** el usuario elige — (a) no agregar, (b) agregar con
placeholders marcados, o (c) agregar cuando haya testimonios reales.

---

## Bloque 4 — Infraestructura a costo cero ✅ COMPLETADO (2026-07-09)

Todo funcionando en producción. Costo real: solo el dominio (pago único anual en
NIC.AR). Detalle técnico completo + gotcheos en mempalace `infra-deploy-completado`.

### TICKET-05 · Dominio ✅ — `insait.com.ar` (NIC.AR)
Comprado y activo. **Ojo: es `insait.com.ar` SIN guion** (decisión deliberada —
la marca visual lleva guion "In-sait" pero el dominio/mail van sin guion para
evitar errores al dictar/escribir). DNS delegado a Cloudflare (nameservers
`bailey`/`will.ns.cloudflare.com`). Renovar cada año (NIC.AR no admite multi-año).

### TICKET-06 · Hosting ✅ — Vercel (gratis)
Sitio en producción en `https://insait.com.ar` y `https://www.insait.com.ar`.
Deploy automático desde el repo `in-sait/in-sait-web`. Env vars cargadas
(`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`).

### TICKET-07 · Recibir mail ✅ — Cloudflare Email Routing (gratis)
Reglas activas: `hola@`, `contacto@`, `rgarcia@insait.com.ar` → reenvían a
`insaitdata@gmail.com` (casilla Gmail dedicada, separada de la personal). Envío
"como @insait.com.ar" desde Gmail vía SMTP de Resend (ver mempalace).

### TICKET-08 · Envío del formulario ✅ — Resend (gratis)
`src/app/api/contact/route.ts` integrado con Resend, dominio verificado, probado
end-to-end en producción — confirmado que el mail llega. Links `mailto:` del
Footer y sección Contacto corregidos a `contacto@insait.com.ar`.

### TICKET-06b · VPS/servidor propio (futuro, sin fecha)
Diferido. Ver Bloque 6 abajo — el plan de servidor propio evolucionó a usar un
Moto G6 Plus en vez de un VPS pago.

---

## Bloque 5 — Roadmap a futuro (YAGNI, sin fecha)

Ítems de `PRODUCT.MD` "Evolución prevista" — **no armar hasta que exista la
necesidad real**. La arquitectura actual permite sumarlos sin rediseño.

- **TICKET-09 · Blog técnico** — decidir fuente (MDX vs headless CMS); no arrancar
  sin 2-3 artículos reales escritos.
- **TICKET-10 · Casos de éxito** — requiere clientes reales que autoricen publicar.
- **TICKET-11 · Portal de clientes** — implica auth + DB; recién con un primer
  cliente que lo necesite.
- **TICKET-12 · Docs de producto / SaaS / IA** — dependen de que exista el producto.

---

## Bloque 6 — Infra propia y herramientas internas

Separado de la web pública: son las herramientas de trabajo de Rodrigo y el
servidor casero.

### TICKET-13 · Chip prepago + Moto G6 Plus como servidor 24/7
**Prioridad:** media · **Depende de:** comprar el chip (compra física)

**Contexto:** Rodrigo tiene un Moto G6 Plus sin uso. Plan: meterle un chip
prepago para tener un **número de WhatsApp corporativo**, dejar el teléfono
prendido 24/7, y usarlo además como **servidor liviano** (Termux + Docker/servicios)
para descargar a la PC principal y dejar cosas corriendo siempre — en particular,
mover ahí AppFlowy (hoy corre en la PC, que no está prendida 24/7). Reemplaza la
idea previa de un VPS pago (TICKET-06b).

**Alcance:**
- Comprar chip prepago, activar número, configurar WhatsApp Business corporativo.
- Instalar Termux en el Moto G6; evaluar correr Docker (o los servicios nativos)
  para hostear AppFlowy y automatizaciones (n8n) de forma persistente.
- Migrar AppFlowy de la PC al teléfono-servidor.

**Criterio de aceptación:** el teléfono sirve AppFlowy de forma persistente,
accesible sin depender de que la PC esté encendida.

---

### TICKET-14 · Configurar el workspace de AppFlowy (tareas + CRM) ⚠️ SUPERADO (2026-07-12)
**Estado:** reemplazado por TICKET-17. Ver nota al final de TICKET-15.

~~**Prioridad:** media · **Depende de:** AppFlowy corriendo (✅ hecho) · **Estado:** instancia lista, workspace sin configurar~~

**Contexto:** AppFlowy Cloud self-hosted ya corre en `D:\Passion_Work\AppFlowy`
(Docker), Rodrigo ya tiene cuenta (`rgarcia@insait.com.ar`) y entró. Falta armar
la estructura de información — decisión de Rodrigo, requiere cabeza fresca.

**Estructura propuesta** (de mempalace `herramientas-organizacion`, reusable):
un solo workspace, con vistas de primer nivel: 📥 Inbox · ✅ Tareas (un solo
tablero) · 👥 Clientes/Prospectos (database tipo pipeline: Nuevo → Contactado →
Propuesta → Ganado/Perdido) · 📚 Wiki · 🔁 Revisión semanal (el hábito que
faltaba — la causa raíz de la desorganización era dispersión + falta de revisión
periódica, no falta de estructura).

**Límite conocido:** el self-host free tiene **max_users: 1** (1 usuario dueño +
hasta 3 guests). Sirve para Rodrigo solo hoy; sumar un colaborador full choca con
esto → evaluar licencia paga o alternativa cuando llegue el momento.

**Idea a futuro (automatización mail → prospecto):** AppFlowy tiene API REST +
integración Zapier oficial. El botón-tipo-Notion (crear página+subpáginas
prellenadas) NO existe nativo (feature request #8696). Para automatizar
mail→prospecto sin costo: n8n self-hosted (parquear hasta tener volumen real).

**Sub-tarea — integrar Claude vía MCP para edición directa del workspace:**
Existe `appflowy-mcp` (PyPI, ~73 tools) que da a Claude Code acceso de
lectura/escritura al workspace AppFlowy self-hosted. Verificado viable
(2026-07-09): Claude Code CLI ✅, Python 3.13 ✅, API accesible en
`http://localhost` (el `:8000` interno NO está expuesto, usar el nginx en `:80`).
Faltan 2 pasos: (1) instalar `uv` (no está instalado), (2)
`claude mcp add appflowy -e APPFLOWY_EMAIL=rgarcia@insait.com.ar -e APPFLOWY_PASSWORD=... -e APPFLOWY_BASE_URL=http://localhost -- uvx appflowy-mcp`.
Ojo: el MCP se carga al iniciar sesión → recién se usa tras reiniciar Claude
Code. Es un proyecto community/terceros (riesgo bajo, todo local). Con esto Claude
puede armar el workspace directamente en vez de guiar paso a paso.

**Criterio de aceptación:** workspace con Inbox/Tareas/Clientes/Wiki armados y un
primer prospecto de prueba en el pipeline.

---

### TICKET-15 · Diseñar la estructura de AppFlowy como "estación de trabajo sistematizada"
**Prioridad:** alta (es el diseño que guía al TICKET-14) · **Depende de:** nada (es trabajo de diseño) · **Bloquea:** TICKET-14 (armarlo bien depende de pensarlo bien primero)

**Principio rector:** gestionar Flowy tiene que ser *second nature*. La estructura
debe ser tan intuitiva y automatizada que Rodrigo, Claude o **casi cualquiera**
pueda operarla sin manual. No es "una herramienta más para configurar" — es la
estación de trabajo central del negocio, y su valor depende de que usarla no
cueste esfuerzo. Si mantenerla ordenada requiere disciplina, ya falló (esa fue la
causa raíz de la desorganización: dispersión + falta de un ritual de revisión).

**Criterios de diseño (el "cómo debe sentirse"):**
- **Un solo lugar para cada cosa** — cero ambigüedad sobre dónde va algo. Ante la
  duda, hay un default obvio (ej. Inbox como cajón universal).
- **Nombres y flujos autoexplicativos** — que un tercero entienda la estructura
  con solo mirarla, sin que nadie se la explique.
- **Lo más automatizado posible** — minimizar el trabajo administrativo manual.
  Templates que prellenan, botones/acciones que crean lo repetitivo, entradas que
  llegan solas (mail→prospecto vía API/n8n cuando haya volumen). Cada paso manual
  que se pueda eliminar, se elimina.
- **Bajo en fricción de mantenimiento** — que quede ordenado *como efecto natural
  de usarlo*, no como una tarea extra de "ordenar".
- **Ritual de revisión incorporado** — la vista 🔁 Revisión semanal no es
  opcional: es lo que evita que todo se disperse de nuevo.

**Alcance:**
- Definir el modelo concreto: qué databases, qué campos, qué vistas (Grid/Kanban/
  Calendar), qué templates, qué automatizaciones — partiendo de la estructura
  propuesta en TICKET-14 (Inbox/Tareas/Clientes/Wiki/Revisión) pero validándola
  contra estos criterios.
- Documentar el "manual de una página": cómo se usa en el día a día (para que sea
  transferible a un colaborador futuro).

**Criterio de aceptación:** existe un diseño escrito de la estructura + su lógica
de uso, tal que alguien ajeno al proyecto podría operar el workspace leyéndolo una
vez. Ese diseño es el input directo de TICKET-14 (implementación).

**⚠️ Nota (2026-07-12):** a mitad de armar esto en AppFlowy, Rodrigo se frenó con
la duda de "estoy maquillando un Reno 12 de Falcon" — AppFlowy traía más
herramienta de la que hacía falta para un flujo simple de 1 persona. Se pivoteó a
una **app propia mínima** (Python + SQLite + Streamlit, corre local). Ver
TICKET-17. El diseño conceptual de este ticket (Inbox único, embudo de mail,
ritual de revisión semanal) **se mantuvo** — solo cambió la herramienta que lo
implementa. AppFlowy self-host (`D:\Passion_Work\AppFlowy`, Docker) queda sin usar;
no se borró por si se retoma, pero no hace falta mantenerlo corriendo.

---

### TICKET-16 · Gestión de credenciales y contraseñas
**Prioridad:** alta (dolor recurrente, ya frenó trabajo hoy) · **Depende de:** nada

**Contexto:** Rodrigo pierde/olvida contraseñas con frecuencia — esto ya generó
fricción real hoy (contraseñas de cuentas creadas en la sesión, credenciales de
servicios nuevos como Resend/Vercel/AppFlowy). No hay ningún sistema hoy: cada
credencial nueva es una más para perder.

**Alcance (a definir, no resuelto todavía):**
- Evaluar un gestor de contraseñas real (Bitwarden free es la opción obvia:
  gratis, multiplataforma, autocompletado, generador de contraseñas — habría que
  comparar contra 1Password/otros si el usuario quiere algo más pulido).
- Migrar ahí, como mínimo, las credenciales creadas hoy: NIC.AR/Clave Fiscal,
  Cloudflare, Vercel, Resend, GitHub (ya en `gh` CLI), AppFlowy
  (`rgarcia@insait.com.ar`), Gmail dedicado (`insaitdata@gmail.com`).
- Definir el hábito: cada credencial nueva se guarda ahí en el momento de
  crearla, no "después" (mismo principio que el TICKET-15 de automatizar en vez
  de depender de disciplina).

**Criterio de aceptación:** existe un gestor de contraseñas elegido y en uso, con
al menos las credenciales de esta sesión cargadas ahí.

---

### TICKET-17 · insait-crm — app propia (Python + SQLite + Streamlit) ✅ MVP COMPLETADO (2026-07-12)
**Prioridad:** media · **Depende de:** nada · **Estado:** MVP funcionando local, en uso de prueba

**Contexto:** reemplaza TICKET-14/15 (AppFlowy). Rodrigo pidió "arquitectura más
sencilla" tras notar que AppFlowy era de más para su caso — solo 1 usuario, solo su
PC, sin necesidad de exponer nada a internet. Se construyó una app local mínima:
`D:\Passion_Work\insait-crm` (correr con `python -m streamlit run app.py`).

**Modelo implementado:** Inbox único (captura + triage) → Cliente (ficha con
Status/pipeline, wiki propia, contacto) → Proyecto (N por cliente) → Tarea (Kanban
con botón "mover a siguiente etapa", scoped a un proyecto — nunca kanban global) →
Revisión semanal (detecta tareas vencidas + clientes activos sin tarea abierta).
Vista Tabla + export CSV para histórico. Verificado end-to-end en el navegador:
alta de cliente, proyecto, tarea, movimiento de kanban, y detección de estancados
con datos de prueba (limpiados después).

**Pendiente / a decidir con uso real:**
- Ingesta automática de leads de la web (hoy manual vía Inbox; requeriría exponer
  la app o pollear el mail por IMAP — depende de TICKET-13 si se quiere sin PC prendida).
- Si el Kanban con botones (sin drag-and-drop) se siente corto tras usarlo un tiempo.
- Backup/versionado del archivo `data/insait.db` (hoy no hay, es un solo archivo local).

**Criterio de aceptación:** usarlo unos días con datos reales y confirmar que el
flujo Inbox→Cliente→Proyecto→Tarea→Revisión cubre el laburo diario sin fricción.

---

## Resumen de dependencias

```
✅ TICKET-01 (commit + org GitHub)     → HECHO
   TICKET-02 (favicon/OG)              → pendiente, desbloqueado, rápido
   TICKET-03 (sitemap/robots)          → pendiente, desbloqueado, rápido
   TICKET-04 (testimonios)             → decisión del usuario
✅ TICKET-05 (dominio insait.com.ar)   → HECHO
✅ TICKET-06 (Vercel)                  → HECHO
✅ TICKET-07 (Cloudflare Email Routing)→ HECHO
✅ TICKET-08 (Resend + formulario)     → HECHO
   TICKET-13 (chip + Moto G6 server)   → compra física pendiente
⚠️ TICKET-15 (diseño estructura Flowy) → superado, pivoteó a TICKET-17
⚠️ TICKET-14 (armar workspace AppFlowy)→ superado, pivoteó a TICKET-17
✅ TICKET-17 (insait-crm, app propia)  → MVP HECHO, en prueba de uso real
   TICKET-16 (gestor de contraseñas)   → independiente, dolor recurrente, creció hoy (cuenta Microsoft)
   TICKET-09..12 (roadmap)             → sin fecha, esperan necesidad real
```
