"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowLeft, X, Check } from "lucide-react";
import { services, painPoints } from "@/lib/content";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "error" | "success";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";

const insights = [
  "Diseñamos la solución más simple que resuelve el problema, no la más compleja.",
  "Nos integramos a tu stack actual: elegimos la tecnología según el problema.",
  "Capacitamos a tu equipo y acompañamos la evolución de la solución.",
  "Trazabilidad y reglas claras en cada indicador que construimos.",
];

const STEPS = 4;

export function ScheduleButton({
  className,
  size = "md",
  children = "Agendar una reunión",
}: {
  className?: string;
  size?: "md" | "sm";
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "bg-brand-gradient inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white shadow-[0_12px_30px_rgba(219,110,156,0.34)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(219,110,156,0.44)]",
          size === "md" ? "px-6 py-3.5 text-base" : "px-4.5 py-2.5 text-[15px]",
          className,
        )}
      >
        {children}
        <ArrowRight className="size-[17px]" strokeWidth={2.2} />
      </button>
      {open && <ScheduleModal onClose={() => setOpen(false)} />}
    </>
  );
}

function ScheduleModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState({
    nombre: "",
    empresa: "",
    rol: "",
    servicios: [] as string[],
    problema: "",
    email: "",
    telefono: "",
  });

  function toggleServicio(title: string) {
    setData((d) => ({
      ...d,
      servicios: d.servicios.includes(title)
        ? d.servicios.filter((s) => s !== title)
        : [...d.servicios, title],
    }));
  }

  const canAdvance =
    (step === 0 && data.nombre.trim() !== "") ||
    (step === 1 && data.servicios.length > 0) ||
    (step === 2 && data.problema.trim() !== "") ||
    step === 3;

  async function submit() {
    setStatus("loading");
    setError("");
    const mensaje = [
      `Servicios de interés: ${data.servicios.join(", ")}`,
      `Problema / hipótesis: ${data.problema}`,
      data.rol ? `Rol: ${data.rol}` : null,
      data.telefono ? `Teléfono: ${data.telefono}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          empresa: data.empresa,
          email: data.email,
          mensaje,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Error al enviar.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error al enviar.");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-y-auto rounded-3xl bg-white p-8 shadow-[0_30px_70px_rgba(0,0,0,0.3)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full text-faint transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <X className="size-5" />
        </button>

        {status === "success" ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-5 py-10 text-center">
            <span className="bg-brand-gradient flex size-16 items-center justify-center rounded-full shadow-[0_12px_30px_rgba(219,110,156,0.4)]">
              <Check className="size-8 text-white" strokeWidth={2.4} />
            </span>
            <h3 className="text-[22px] font-bold text-ink">
              ¡Gracias, {data.nombre.split(" ")[0]}!
            </h3>
            <p className="max-w-[340px] text-[15.5px] leading-[1.6] text-muted">
              Uno de nuestros colaboradores se contactará con usted lo antes
              posible para agendar la reunión.
            </p>
          </div>
        ) : (
          <>
            {/* progress */}
            <div className="mb-7 flex gap-1.5 pr-10">
              {Array.from({ length: STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    i <= step ? "bg-brand-gradient" : "bg-ink/10",
                  )}
                />
              ))}
            </div>

            {step === 0 && (
              <div>
                <h3 className="mb-1.5 text-[22px] font-bold text-ink">¿Quién sos?</h3>
                <p className="mb-6 text-[14.5px] text-muted">
                  Así sabemos con quién estamos hablando.
                </p>
                <div className="flex flex-col gap-4">
                  <input
                    className={inputClass}
                    placeholder="Tu nombre"
                    value={data.nombre}
                    onChange={(e) => setData({ ...data, nombre: e.target.value })}
                  />
                  <input
                    className={inputClass}
                    placeholder="Empresa"
                    value={data.empresa}
                    onChange={(e) => setData({ ...data, empresa: e.target.value })}
                  />
                  <input
                    className={inputClass}
                    placeholder="Tu rol (ej. Gerente de Operaciones)"
                    value={data.rol}
                    onChange={(e) => setData({ ...data, rol: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="mb-1.5 text-[22px] font-bold text-ink">
                  ¿Qué servicio necesitás?
                </h3>
                <p className="mb-6 text-[14.5px] text-muted">
                  Elegí uno o más — los que se acercan a lo que buscás.
                </p>
                <div className="flex flex-col gap-2.5">
                  {services.map((s) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => toggleServicio(s.title)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition-colors",
                        data.servicios.includes(s.title)
                          ? "border-accent bg-accent-light/10 text-ink"
                          : "border-ink/12 text-ink-soft hover:border-ink/25",
                      )}
                    >
                      <s.icon className="size-[18px] flex-none text-accent" strokeWidth={1.9} />
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-1.5 text-[22px] font-bold text-ink">
                  ¿Qué problema querés resolver?
                </h3>
                <p className="mb-4 text-[14.5px] text-muted">
                  Contanos la hipótesis que querés confirmar o desmentir.
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {painPoints.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setData({ ...data, problema: p })}
                      className="rounded-full border border-ink/12 px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink/25"
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={4}
                  className={cn(inputClass, "resize-y")}
                  placeholder="Escribí con tus palabras qué necesitás resolver"
                  value={data.problema}
                  onChange={(e) => setData({ ...data, problema: e.target.value })}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="mb-1.5 text-[22px] font-bold text-ink">Ya casi.</h3>
                <p className="mb-6 text-[14.5px] text-muted">
                  Dejanos cómo contactarte.
                </p>
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="tu@email.com"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
                  <input
                    className={inputClass}
                    placeholder="Teléfono (opcional)"
                    value={data.telefono}
                    onChange={(e) => setData({ ...data, telefono: e.target.value })}
                  />
                </div>
                {status === "error" && (
                  <p className="mt-3 text-[14px] font-medium text-accent" role="alert">
                    {error}
                  </p>
                )}
              </div>
            )}

            <p className="mt-6 text-[13px] italic leading-[1.5] text-faint">
              {insights[step]}
            </p>

            <div className="mt-7 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] font-semibold text-ink-soft transition-colors hover:bg-ink/5",
                  step === 0 && "invisible",
                )}
              >
                <ArrowLeft className="size-4" />
                Atrás
              </button>

              {step < STEPS - 1 ? (
                <button
                  type="button"
                  disabled={!canAdvance}
                  onClick={() => setStep((s) => s + 1)}
                  className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_12px_30px_rgba(219,110,156,0.34)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Siguiente
                  <ArrowRight className="size-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!data.email.trim() || status === "loading"}
                  onClick={submit}
                  className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_12px_30px_rgba(219,110,156,0.34)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {status === "loading" ? "Enviando…" : "Enviar"}
                  <ArrowRight className="size-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
