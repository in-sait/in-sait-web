# Deploy — In-sait web

## Ahora: Vercel (costo $0)

1. Crear cuenta en [vercel.com](https://vercel.com) (gratis, plan Hobby).
2. Importar este repo (`D:\In-sait\web`) como proyecto — Vercel detecta Next.js
   solo, no requiere configuración.
3. Variables de entorno (Project Settings → Environment Variables):
   - `RESEND_API_KEY`
   - `CONTACT_FROM` (ej. `web@insait.com`, debe ser de un dominio verificado en Resend)
   - `CONTACT_TO` (ej. `hola@insait.com`)
4. Dominio propio: Project Settings → Domains → agregar el dominio comprado en
   Cloudflare Registrar. Vercel indica el registro DNS exacto (CNAME o A) para
   crear en Cloudflare.
5. Cada push a la rama principal redeploya solo.

### Email del formulario (Resend)

1. Crear cuenta en [resend.com](https://resend.com) (free tier: 3.000
   emails/mes, sin tarjeta).
2. Agregar y verificar el dominio propio (Resend da 2-3 registros DNS —
   crearlos en Cloudflare, el mismo lugar donde está el DNS del dominio).
3. Generar un API Key y cargarlo como `RESEND_API_KEY` en Vercel.

### Recibir mail en `hola@insait.com` (Cloudflare Email Routing, gratis)

En el dashboard de Cloudflare del dominio → Email → Email Routing → crear
regla que reenvíe `hola@insait.com` a una casilla Gmail personal. No requiere
Google Workspace ni ningún plan pago.

---

## Futuro: self-host en VPS o servidor propio

Cuando haya presupuesto o servidor propio (ej. "con los primeros clientes"),
el mismo proyecto corre sin cambios de código gracias a `output: 'standalone'`
en `next.config.ts`.

### Opción A — Docker

```bash
docker build -t insait-web .
docker run -d --name insait-web -p 3000:3000 --env-file .env insait-web
```

### Opción B — Node directo

```bash
npm ci
npm run build
node .next/standalone/server.js   # sirve en el puerto 3000
```

### Reverse proxy + HTTPS

**Caddy** (más simple, HTTPS automático) — `Caddyfile`:

```
insait.com {
    reverse_proxy localhost:3000
}
```

**nginx** (esbozo):

```nginx
server {
    server_name insait.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
# usar certbot para el certificado TLS
```

Las mismas variables de entorno (`RESEND_API_KEY`, `CONTACT_FROM`,
`CONTACT_TO`) siguen aplicando — no hace falta montar SMTP propio ni una cola
de reintentos: Resend es una API cloud siempre disponible, no depende de que
el servidor propio esté encendido.
