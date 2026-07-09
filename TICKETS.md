# Backlog — In-sait web

Tickets para lo que quedó pendiente después del build inicial (F0–F6, completo y
verificado). Ordenados por bloque. Cada uno tiene contexto, criterio de aceptación
y qué bloquea/depende.

---

## Bloque 1 — Housekeeping inmediato

### TICKET-01 · Commit inicial del proyecto
**Prioridad:** alta · **Depende de:** nada · **Bloquea:** todo lo demás (no hay historial git)

**Contexto:** `D:\In-sait\web` tiene 15 archivos sin commitear (scaffold + todas las
secciones + Docker/deploy prep). Es un repo nuevo (`git init` corrido por
`create-next-app`), rama `master`, sin ningún commit todavía.

**Alcance:**
- `git add` de todo lo relevante (código, `Dockerfile`, `.dockerignore`,
  `.env.example`, `DEPLOY.md`, assets copiados).
- Un commit inicial descriptivo (o varios chicos si se prefiere separar
  scaffold / secciones / self-host prep, según "Git Philosophy" del CLAUDE.md raíz:
  commits chicos y descriptivos).
- Verificar que no se cuelen secretos (no debería haber ninguno; `.env.example`
  no tiene valores reales).

**Criterio de aceptación:** `git log` muestra al menos un commit, `git status`
queda limpio (o solo con lo esperado en curso).

---

## Bloque 2 — Contenido y SEO básico (no bloquean nada, rápidos)

### TICKET-02 · Favicon y metadata de imagen social (OG)
**Prioridad:** media · **Depende de:** nada

**Contexto:** El `<head>` generado por `layout.tsx` no tiene favicon ni imagen
`og:image`. Hoy compartir el link en WhatsApp/LinkedIn no muestra nada
representativo, y la pestaña del navegador usa el ícono default de Next.js.
Los assets de marca ya están catalogados: `D:\In-sait\Insait pantallas\` tiene
las variantes de ícono en varias resoluciones/fondos; `insait-mark.svg` ya está
copiado a `public/assets/brand/`.

**Alcance:**
- Generar `favicon.ico` (+ opcionalmente `icon.png`/`apple-icon.png`) a partir del
  mark, vía las convenciones de archivo de `app/` (`app/icon.png`,
  `app/apple-icon.png` — Next los sirve solos, sin tocar `<head>` a mano).
- Armar una imagen OG 1200×630 (fondo oscuro de marca + logo + tagline "Data
  Insights, Always On.") y añadir `openGraph.images` / `twitter` en el
  `metadata` de `layout.tsx` (ya existe un objeto `metadata` armado, solo hay
  que sumarle `images`).

**Criterio de aceptación:** la pestaña del navegador muestra el ícono de
In-sait; un preview de link (debugger de OG tipo Facebook Sharing Debugger o
similar) muestra imagen y texto correctos.

---

### TICKET-03 · SEO técnico: sitemap y robots
**Prioridad:** baja · **Depende de:** tener dominio definitivo (TICKET-05) para que las URLs absolutas tengan sentido, aunque se puede armar antes con placeholder

**Contexto:** No hay `sitemap.xml` ni `robots.txt`. Es una landing de una sola
página así que el impacto es bajo, pero es gratis de agregar y ayuda a que
buscadores indexen bien.

**Alcance:**
- `app/sitemap.ts` (convención de Next 16, genera `sitemap.xml` solo) con la
  home.
- `app/robots.ts` con reglas permisivas + referencia al sitemap.
- Usar `metadataBase` en `layout.tsx` cuando el dominio esté definido, para que
  las URLs de sitemap/OG sean absolutas y correctas.

**Criterio de aceptación:** `/sitemap.xml` y `/robots.txt` responden 200 con
contenido válido.

---

## Bloque 3 — Decisión de contenido pendiente

### TICKET-04 · Definir si se agrega la sección "Testimonios"
**Prioridad:** a decidir · **Depende de:** que el usuario decida si sigue el `DESIGN_BRIEF_landing.md` original o el `.dc.html` final

**Contexto:** `DESIGN_BRIEF_landing.md` (el brief inicial) incluye una sección
"9 Testimonials" con contenido placeholder. El diseño final aprobado
(`Insait Landing.dc.html`, la referencia que se usó para construir todo el
sitio) **no la incluye** — se saltea de Pain Points directo a FAQ. La build
actual sigue el diseño final, así que la sección no está, **a propósito**, no
por omisión.

**Alcance (si se decide agregarla):**
- Nuevo componente `sections/Testimonials.tsx` (cards con cita + nombre/cargo +
  empresa), usando el patrón `Card` + `Reveal` ya existente.
- Datos en `lib/content.ts` (array `testimonials`).
- **Restricción del `PRODUCT.MD` raíz:** "Nunca inventar clientes,
  certificaciones o casos de éxito. Si falta información, utilizar
  placeholders o solicitar aclaraciones." — hoy no hay testimonios reales, así
  que si se agrega la sección tiene que ser con placeholders explícitos o
  quedar oculta hasta tener casos reales.

**Criterio de aceptación:** el usuario elige una opción — (a) no agregar por
ahora, (b) agregar con placeholders marcados como tales, o (c) agregar cuando
haya testimonios reales de clientes.

---

## Bloque 4 — Infraestructura a costo cero (dominio, hosting, email)

**Actualizado:** el usuario está sin presupuesto. Se pivoteó de "self-host en
VPS" a "gratis salvo el dominio" — ver plan de infra en
`aranquemos-el-proyecto-stateless-volcano.md`. El código ya está adaptado
(Resend en vez de SMTP casero, `DEPLOY.md` con Vercel como camino principal).
El VPS/servidor propio se retoma más adelante ("con los primeros clientes"),
sin urgencia.

### TICKET-05 · Comprar dominio — `in-sait.com.ar` vía NIC.AR
**Prioridad:** alta (es el único paso pago) · **Depende de:** recuperar Clave Fiscal AFIP/ARCA (turno pendiente) · **Bloquea:** TICKET-06, TICKET-07, TICKET-08

**Decisión:** en vez de un `.com` por Cloudflare Registrar, se va con
`in-sait.com.ar` — audiencia local (Buenos Aires/Argentina), pago en pesos
(sin necesitar tarjeta internacional), refuerza la identidad local. Cloudflare
no vende `.com.ar`, pero eso no importa: su DNS free funciona igual con
cualquier dominio comprado en otro lado.

**Bloqueador actual:** el usuario necesita la Clave Fiscal de AFIP/ARCA para
loguearse en nic.ar — el reconocimiento facial del asistente virtual no lo
detecta, tiene turno presencial para resolverlo.

**Alcance:**
1. Recuperar Clave Fiscal (turno en ARCA — bloqueador externo, no depende de
   este proyecto).
2. Registrar `in-sait.com.ar` en [nic.ar](https://nic.ar) con esa Clave Fiscal.
3. Crear cuenta en Cloudflare (gratis), agregar el sitio `in-sait.com.ar` —
   Cloudflare asigna 2 nameservers propios.
4. En el panel de nic.ar, cambiar la delegación de DNS del dominio a esos 2
   nameservers de Cloudflare.

**Nota:** NIC.AR renueva de a 1 año por vez (no admite pagar varios años
juntos) — acordarse de renovar.

**Criterio de aceptación:** `in-sait.com.ar` registrado y con DNS delegado a
Cloudflare (verificable con `nslookup -type=NS in-sait.com.ar`).

---

### TICKET-06 · Hostear el sitio en Vercel (gratis)
**Prioridad:** alta · **Depende de:** TICKET-05 (para el dominio propio; sin dominio igual funciona con la URL `*.vercel.app`) · **Bloquea:** nada

**Contexto:** Reemplaza al VPS por ahora. El proyecto no necesita ningún
cambio para correr en Vercel (Next.js estándar); `output: 'standalone'` queda
en el código sin afectar el deploy, para cuando se migre a servidor propio.

**Alcance:**
- Crear cuenta en Vercel (gratis, plan Hobby), importar el repo de
  `D:\In-sait\web`.
- Cargar variables de entorno: `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`
  (ver TICKET-08).
- Conectar el dominio de TICKET-05 en Project Settings → Domains.

**Criterio de aceptación:** el sitio responde en `https://<dominio>` (o en la
URL `*.vercel.app` mientras no haya dominio), sin errores de consola.

---

### TICKET-07 · Recibir mail en hola@insait.com (Cloudflare Email Routing, gratis)
**Prioridad:** media · **Depende de:** TICKET-05 (dominio en Cloudflare)

**Contexto:** Reemplaza a Google Workspace/Zoho (que son pagos). Cloudflare
Email Routing reenvía mail dirigido a `hola@insait.com` hacia una casilla
Gmail personal existente, gratis, sin bandeja propia que mantener.

**Alcance:**
- En el dashboard de Cloudflare del dominio → Email → Email Routing → crear
  regla `hola@insait.com` → Gmail personal.
- (Opcional, más adelante) configurar "enviar como hola@insait.com" desde
  Gmail usando el SMTP relay de Resend, para responder consultas con esa
  dirección en vez de la personal.

**Criterio de aceptación:** un mail enviado a `hola@insait.com` llega a la
casilla Gmail.

---

### TICKET-08 · Activar envío real del formulario de contacto (Resend)
**Prioridad:** alta · **Estado:** código ya integrado, falta la cuenta/credenciales · **Depende de:** TICKET-05 (dominio, para verificar en Resend)

**Contexto:** `src/app/api/contact/route.ts` ya usa el SDK de `resend` (no
SMTP casero) y toda la validación server-side sigue intacta. Si Resend
devuelve error, la API responde 502 con mensaje claro — no hay cola/retry
porque una API cloud siempre está disponible, no depende de ninguna máquina
propia encendida.

**Alcance:**
- Crear cuenta en Resend (gratis, 3.000 emails/mes, sin tarjeta).
- Verificar el dominio de TICKET-05 en Resend (agrega 2-3 registros DNS en
  Cloudflare).
- Generar el API key y cargar `RESEND_API_KEY` + `CONTACT_FROM` + `CONTACT_TO`
  en Vercel (TICKET-06).

**Criterio de aceptación:** completar el formulario en el sitio real produce
un email en `hola@insait.com` (vía TICKET-07).

---

### TICKET-06b · VPS/servidor propio (futuro, sin fecha)
**Prioridad:** baja, explícitamente diferido · **Depende de:** tener los primeros clientes

**Contexto:** El usuario tiene compute de sobra en su PC pero no está
prendida 24/7 y la reserva para más adelante. `Dockerfile` + sección "Futuro"
de `DEPLOY.md` ya están listos para ese momento — no requiere retrabajo,
solo migrar el hosting de Vercel al servidor propio cuando exista.

**Alcance (cuando llegue el momento):** seguir la sección "Futuro: self-host
en VPS o servidor propio" de `DEPLOY.md`.

**Criterio de aceptación:** N/A por ahora — ticket de backlog sin fecha.

---

## Bloque 5 — Roadmap a futuro (explícitamente fuera de alcance, YAGNI)

Estos ítems están en `PRODUCT.MD` como "Evolución prevista" pero **no se arman
hasta que exista la necesidad real** — la arquitectura actual (Next.js App
Router) permite sumarlos después sin rediseño.

### TICKET-09 · Blog técnico
Requiere decidir fuente de contenido (MDX en el repo vs. headless CMS). Sin
esto no hay contenido que mostrar — no arrancar hasta tener al menos 2-3
artículos reales escritos.

### TICKET-10 · Casos de éxito
Igual que Testimonios (TICKET-04): requiere clientes reales que autoricen
publicar su caso. No inventar contenido (regla del `PRODUCT.MD`).

### TICKET-11 · Portal de clientes
Implica autenticación y, probablemente, una base de datos. Recién tiene
sentido cuando haya un primer cliente que lo necesite — no antes.

### TICKET-12 · Documentación de producto / SaaS / soluciones de IA
Dependen de que exista el producto propio que documentar. Fuera de alcance
hasta que ese producto exista.

---

## Resumen de dependencias

```
TICKET-01 (commit)          → independiente, hacer ya
TICKET-02 (favicon/OG)      → independiente
TICKET-03 (sitemap/robots)  → mejor después de TICKET-05
TICKET-04 (testimonios)     → decisión del usuario, independiente
TICKET-05 (dominio, $)      → independiente, único paso pago
TICKET-06 (Vercel, gratis)  → funciona ya con *.vercel.app; dominio propio depende de TICKET-05
TICKET-07 (email, gratis)   → depende de TICKET-05
TICKET-08 (Resend, gratis)  → código ya integrado; depende de TICKET-05 (verificar dominio) + TICKET-06 (cargar env vars)
TICKET-06b (VPS futuro)     → sin fecha, backlog, no bloquea nada de lo anterior
TICKET-09..12 (roadmap)     → sin fecha, esperan necesidad real
```
