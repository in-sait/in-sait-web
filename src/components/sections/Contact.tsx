"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { contact } from "@/lib/content";

const info = [
  { Icon: Mail, label: "Email", value: contact.email },
  { Icon: Phone, label: "Teléfono", value: contact.phone },
  { Icon: MapPin, label: "Ubicación", value: contact.location },
];

const inputClass =
  "w-full rounded-xl border border-white/14 bg-white/6 px-4 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-accent-light";

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
      className="relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,#33353d,#232429_70%)] py-[clamp(84px,10vw,130px)]"
    >
      <WaveDivider
        d={WAVE.top}
        fill="#fbfbfd"
        position="top"
        className="z-[1] h-[clamp(48px,5.5vw,88px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-24 left-[-60px] size-[460px] rounded-full bg-[radial-gradient(circle,rgba(219,110,156,0.28),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-40px] top-[-40px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(30,107,122,0.34),transparent_66%)]"
      />

      <Container className="relative grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="mb-3.5 text-[13px] font-semibold tracking-[0.15em] text-accent-light">
            HABLEMOS
          </p>
          <h2 className="mb-5 text-[clamp(32px,4.4vw,50px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="mb-8.5 max-w-[420px] text-[17px] leading-[1.6] text-[#b9bbc2]">
            Contanos qué problema querés resolver. Te respondemos con una
            propuesta clara, sin compromiso.
          </p>
          <div className="flex flex-col gap-4.5">
            {info.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3.5">
                <span className="bg-brand-gradient flex size-11 flex-none items-center justify-center rounded-xl">
                  <Icon className="size-5 text-white" strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-[12.5px] text-faint">{label}</p>
                  <p className="text-[15.5px] font-semibold text-white">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl border border-white/12 bg-white/5 p-8.5 shadow-[0_30px_70px_rgba(0,0,0,0.3)] backdrop-blur-[14px]">
          {status === "success" ? (
            <div className="flex min-h-[340px] flex-col items-center justify-center gap-5 py-10 text-center">
              <span className="bg-brand-gradient flex size-16 items-center justify-center rounded-full shadow-[0_12px_30px_rgba(219,110,156,0.4)]">
                <Check className="size-8 text-white" strokeWidth={2.4} />
              </span>
              <h3 className="text-[22px] font-bold text-white">
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
                <p className="text-[14px] font-medium text-accent-light" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-brand-gradient mt-1 inline-flex items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-white shadow-[0_12px_30px_rgba(219,110,156,0.4)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
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
