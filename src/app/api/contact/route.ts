import { Resend } from "resend";

function bad(error: string) {
  return Response.json({ ok: false, error }, { status: 400 });
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return bad("Formato inválido.");
  }

  const nombre = String(data.nombre ?? "").trim();
  const empresa = String(data.empresa ?? "").trim();
  const email = String(data.email ?? "").trim();
  const mensaje = String(data.mensaje ?? "").trim();

  if (!nombre || !email || !mensaje) {
    return bad("Nombre, email y mensaje son obligatorios.");
  }
  if (
    nombre.length > 120 ||
    empresa.length > 120 ||
    email.length > 200 ||
    mensaje.length > 4000
  ) {
    return bad("Algún campo supera el largo permitido.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("El email no tiene un formato válido.");
  }

  const fail = () =>
    Response.json(
      { ok: false, error: "No se pudo enviar el mensaje. Probá de nuevo en un rato." },
      { status: 502 },
    );

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `In-sait Web <${process.env.CONTACT_FROM}>`,
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject: `Nueva consulta de ${nombre}${empresa ? ` (${empresa})` : ""}`,
      text: `Nombre: ${nombre}\nEmpresa: ${empresa || "-"}\nEmail: ${email}\n\n${mensaje}`,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return fail();
    }
  } catch (err) {
    // ej. RESEND_API_KEY sin configurar — no debe tirar un 500 opaco
    console.error("[contact] resend threw", err);
    return fail();
  }

  return Response.json({ ok: true });
}
