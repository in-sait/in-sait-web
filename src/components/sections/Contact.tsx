"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { WaveDivider } from "../ui/WaveDivider";
import { contact } from "@/lib/content";

const info = [
  { Icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { Icon: Phone, label: "Teléfono", value: contact.phone, href: `tel:${contact.phone.replace(/ /g, "")}` },
  { Icon: MapPin, label: "Ubicación", value: contact.location },
];

const inputClass =
  "w-full rounded-control border border-white/15 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent-light focus-visible:ring-2 focus-visible:ring-accent-light/60";

type Status = "idle" | "loading" | "error" | "success";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const payload = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      empresa: (form.elements.namedItem("empresa") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Error al enviar.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error al enviar.");
    }
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,#33353d,#232429_70%)] py-[clamp(96px,11vw,152px)]"
    >
      <WaveDivider />
      {/* Se fueron los dos glows radiales de 460 y 520px (uno rosa, uno con el
          teal inventado #1e6b7a). Queda el degradado de fondo, que es
          profundidad, más la retícula. */}
      <div
        aria-hidden
        className="brand-grid brand-grid--dark brand-grid--band pointer-events-none absolute inset-0"
      />

      <Container className="relative grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="mb-3.5 text-[12.5px] font-semibold tracking-[0.16em] text-faint">
            HABLEMOS
          </p>
          <h2 className="mb-5 text-[clamp(32px,4.4vw,50px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white text-balance">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="mb-9 max-w-[420px] text-[17px] leading-[1.6] text-[#b9bbc2]">
            Contanos qué problema querés resolver. Te respondemos con una
            propuesta clara, sin compromiso.
          </p>
          <div className="flex flex-col gap-4.5">
            {info.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3.5">
                {/* tiles neutras: el rosa de esta sección es el botón de envío */}
                <span className="flex size-11 flex-none items-center justify-center rounded-control border border-white/12 bg-white/6">
                  <Icon className="size-5 text-white" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="text-[12.5px] text-faint">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="rounded-sm text-[15.5px] font-semibold text-white transition-colors hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[15.5px] font-semibold text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel sólido con hairline. Antes: bg-white/5 + backdrop-blur-14px,
            que sobre el degradado leía como glassmorphism — está en la lista
            negra del brief. */}
        <div className="relative rounded-panel border border-white/12 bg-ink-900/70 p-8 shadow-overlay sm:p-9">
          {status === "success" ? (
            <div className="flex min-h-[340px] flex-col items-center justify-center gap-5 py-10 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-accent">
                <Check className="size-7 text-white" strokeWidth={2.4} />
              </span>
              <h3 className="text-[22px] font-semibold text-white">
                ¡Gracias por escribirnos!
              </h3>
              <p className="max-w-[300px] text-[15.5px] leading-[1.6] text-[#b9bbc2]">
                Recibimos tu mensaje. Te vamos a responder a la brevedad con los
                próximos pasos.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nombre" name="nombre" placeholder="Tu nombre" required />
                <Field label="Empresa" name="empresa" placeholder="Tu empresa" />
              </div>
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
              />
              <div>
                <label
                  htmlFor="mensaje"
                  className="mb-1.5 block text-[13px] font-medium text-[#b9bbc2]"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  placeholder="Contanos brevemente qué necesitás"
                  className={`${inputClass} resize-y`}
                />
              </div>

              {status === "error" && (
                <p
                  className="text-[14px] font-medium text-accent-light"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-control bg-accent px-4 py-3.5 text-[16px] font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "loading" ? "Enviando…" : "Enviar mensaje"}
                {status !== "loading" && (
                  <ArrowRight className="size-4" strokeWidth={2.2} />
                )}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[13px] font-medium text-[#b9bbc2]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
