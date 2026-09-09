"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowLeft, X, Check } from "lucide-react";
import { services, painPoints } from "@/lib/content";
import { cn } from "@/lib/cn";
import { buttonStyles } from "../ui/Button";

type Status = "idle" | "loading" | "error" | "success";

/* El modal se abre desde dos botones que prometen cosas distintas: "Pedir un
   diagnóstico" (hero) y "Agendar reunión" (navbar). Por eso la cabecera es
   fija y encuadra las dos: esto no es un calendario, es el diagnóstico inicial
   del que sale la reunión. */
const STEPS = [
  {
    title: "¿Con quién hablamos?",
    hint: "Nombre, empresa y tu rol. Nada más.",
  },
  {
    title: "¿Qué parte necesitás resolver?",
    hint: "Elegí una o varias. No es un compromiso: ordena la conversación.",
  },
  {
    title: "¿Qué es lo que hoy no podés ver?",
    hint: "Escribilo con tus palabras. Si alguna de estas frases te suena, empezá por ahí.",
  },
  {
    title: "¿Dónde te escribimos?",
    hint: "Te respondemos con dos o tres horarios posibles para la primera reunión.",
  },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "w-full rounded-control border border-ink/15 bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent-dark focus-visible:ring-2 focus-visible:ring-accent-dark/40";

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
  // estable: el modal lo usa dentro de un efecto que no debe reengancharse
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonStyles({ size, className })}
      >
        {children}
        <ArrowRight className="size-[17px]" strokeWidth={2.2} />
      </button>
      {open && <ScheduleModal onClose={close} />}
    </>
  );
}

function ScheduleModal({ onClose }: { onClose: () => void }) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;

  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [data, setData] = useState({
    nombre: "",
    empresa: "",
    rol: "",
    servicios: [] as string[],
    problema: "",
    email: "",
    telefono: "",
  });

  /* Diálogo de verdad: Escape cierra, el foco queda atrapado adentro, el fondo
     no scrollea y al cerrar el foco vuelve al botón que lo abrió. Antes no
     había nada de esto: con Tab te ibas al sitio de atrás. */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [onClose]);

  // al cambiar de paso el foco va al título del paso, que es lo que anuncia el lector
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function toggleServicio(title: string) {
    setData((d) => ({
      ...d,
      servicios: d.servicios.includes(title)
        ? d.servicios.filter((s) => s !== title)
        : [...d.servicios, title],
    }));
  }

  const emailValid = EMAIL_RE.test(data.email.trim());
  const canAdvance =
    (step === 0 && data.nombre.trim() !== "") ||
    (step === 1 && data.servicios.length > 0) ||
    (step === 2 && data.problema.trim() !== "") ||
    (step === 3 && emailValid);

  async function submit() {
    if (!emailValid) {
      setEmailTouched(true);
      return;
    }
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

  const current = STEPS[step];

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full flex-col rounded-t-panel bg-surface shadow-overlay sm:max-h-[90vh] sm:max-w-[560px] sm:rounded-panel"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark"
        >
          <X className="size-5" />
        </button>

        {status === "success" ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-5 px-7 py-14 text-center sm:px-10">
            <span className="flex size-14 items-center justify-center rounded-full bg-accent">
              <Check className="size-7 text-white" strokeWidth={2.4} />
            </span>
            <h2 id={titleId} className="text-[24px] font-semibold tracking-[-0.02em] text-ink">
              Listo, {data.nombre.trim().split(" ")[0]}.
            </h2>
            <p id={descId} className="max-w-[380px] text-[15.5px] leading-[1.6] text-muted">
              Te escribimos a{" "}
              <span className="font-medium text-ink">{data.email.trim()}</span>{" "}
              con dos o tres horarios para la primera reunión.
            </p>
            <p className="max-w-[380px] text-[14.5px] leading-[1.6] text-muted">
              Si querés adelantar trabajo, respondé ese mail con lo que tengas a
              mano: un reporte, una planilla, una captura del tablero que usan hoy.
            </p>
          </div>
        ) : (
          <>
            {/* cabecera fija: encuadra el modal completo, no el paso */}
            <div className="border-b border-hairline px-7 pb-6 pt-8 sm:px-10">
              <p className="mb-2.5 text-[11.5px] font-semibold tracking-[0.16em] text-muted">
                DIAGNÓSTICO INICIAL
              </p>
              <h2
                id={titleId}
                className="mb-2 text-[23px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink"
              >
                Contanos qué número no cierra.
              </h2>
              <p id={descId} className="text-[14.5px] leading-[1.55] text-muted">
                Cuatro preguntas, un minuto. Con eso llegamos a la primera
                reunión con algo para mostrarte, no con un cuestionario.
              </p>

              {/* progreso: un riel hairline y un solo tramo rosa, no cuatro
                  barras con degradado */}
              <div className="mt-6 flex items-center gap-3.5">
                <div
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-hairline"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={STEPS.length}
                  aria-valuenow={step + 1}
                  aria-label="Progreso del formulario"
                >
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-300 ease-brand"
                    style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  />
                </div>
                <span className="shrink-0 text-[12px] font-medium tabular-nums text-muted">
                  Paso {step + 1} de {STEPS.length}
                </span>
              </div>
            </div>

            {/* cuerpo: alto mínimo fijo para que el modal no salte de tamaño
                entre el paso 2 (cinco servicios) y el paso 4 (dos inputs) */}
            <div className="min-h-[292px] flex-1 overflow-y-auto px-7 py-7 sm:px-10">
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="mb-1.5 text-[18px] font-semibold tracking-[-0.01em] text-ink outline-none"
              >
                {current.title}
              </h3>
              <p className="mb-6 text-[14.5px] leading-[1.5] text-muted">
                {current.hint}
              </p>

              {step === 0 && (
                <div className="flex flex-col gap-4">
                  <Field
                    id={`${uid}-nombre`}
                    label="Nombre y apellido"
                    placeholder="Ej.: Rodrigo García"
                    value={data.nombre}
                    onChange={(v) => setData({ ...data, nombre: v })}
                  />
                  <Field
                    id={`${uid}-empresa`}
                    label="Empresa"
                    placeholder="Ej.: Distribuidora del Sur"
                    value={data.empresa}
                    onChange={(v) => setData({ ...data, empresa: v })}
                  />
                  <Field
                    id={`${uid}-rol`}
                    label="Tu rol"
                    placeholder="Ej.: Gerente de Operaciones"
                    value={data.rol}
                    onChange={(v) => setData({ ...data, rol: v })}
                  />
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-2.5">
                  {services.map((s) => {
                    const selected = data.servicios.includes(s.title);
                    return (
                      <button
                        key={s.title}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleServicio(s.title)}
                        className={cn(
                          "flex items-center gap-3 rounded-control border px-4 py-3 text-left text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark",
                          selected
                            ? "border-ink bg-ink/4 text-ink"
                            : "border-hairline text-ink-soft hover:border-ink/30",
                        )}
                      >
                        <s.icon
                          className="size-[18px] flex-none text-ink"
                          strokeWidth={1.7}
                        />
                        <span className="flex-1">{s.title}</span>
                        {/* el estado no se comunica sólo por color */}
                        <span
                          aria-hidden
                          className={cn(
                            "flex size-5 flex-none items-center justify-center rounded-full border",
                            selected
                              ? "border-accent bg-accent text-white"
                              : "border-hairline",
                          )}
                        >
                          {selected && <Check className="size-3" strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {painPoints.map((p) => (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={data.problema === p}
                        onClick={() => setData({ ...data, problema: p })}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark",
                          data.problema === p
                            ? "border-ink bg-ink text-white"
                            : "border-hairline text-ink-soft hover:border-ink/30",
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <label
                    htmlFor={`${uid}-problema`}
                    className="mb-1.5 block text-[13px] font-medium text-ink-soft"
                  >
                    Contanos con tus palabras
                  </label>
                  <textarea
                    id={`${uid}-problema`}
                    rows={4}
                    className={cn(inputClass, "resize-y")}
                    placeholder="Ej.: cada área informa una venta distinta y nadie sabe cuál es la buena."
                    value={data.problema}
                    onChange={(e) =>
                      setData({ ...data, problema: e.target.value })
                    }
                  />
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <Field
                    id={`${uid}-email`}
                    label="Email"
                    type="email"
                    placeholder="tu@empresa.com"
                    value={data.email}
                    onChange={(v) => setData({ ...data, email: v })}
                    onBlur={() => setEmailTouched(true)}
                    error={
                      emailTouched && !emailValid
                        ? "Revisá el email: falta el @ o el dominio."
                        : undefined
                    }
                  />
                  <Field
                    id={`${uid}-telefono`}
                    label="Teléfono"
                    optional
                    type="tel"
                    placeholder="+54 9 11 …"
                    value={data.telefono}
                    onChange={(v) => setData({ ...data, telefono: v })}
                  />
                  {status === "error" && (
                    <p
                      className="text-[14px] font-medium text-accent-dark"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* pie fijo: el CTA siempre a mano, también en mobile. El padding
                inferior respeta la barra de gestos del teléfono. */}
            <div className="border-t border-hairline px-7 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 sm:px-10 sm:pb-5">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-control px-3.5 py-2.5 text-[14.5px] font-semibold text-ink-soft transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark",
                    step === 0 && "invisible",
                  )}
                >
                  <ArrowLeft className="size-4" />
                  Atrás
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    disabled={!canAdvance}
                    onClick={() => setStep((s) => s + 1)}
                    className={buttonStyles({
                      size: "sm",
                      className:
                        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-accent",
                    })}
                  >
                    Continuar
                    <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canAdvance || status === "loading"}
                    onClick={submit}
                    className={buttonStyles({
                      size: "sm",
                      className:
                        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-accent",
                    })}
                  >
                    {status === "loading" ? "Enviando…" : "Pedir la reunión"}
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
              {/* una línea fija, no cuatro en itálica rotando por paso */}
              <p className="mt-4 text-[12.5px] leading-[1.5] text-muted">
                Sin costo y sin compromiso. Si no somos los indicados para tu
                problema, te lo decimos en la primera reunión.
              </p>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

/** Input con label visible. El placeholder es el ejemplo, no la etiqueta. */
function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  optional = false,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline gap-2 text-[13px] font-medium text-ink-soft"
      >
        {label}
        {optional && (
          <span className="text-[12px] font-normal text-muted">opcional</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, error && "border-accent-dark")}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[13px] font-medium text-accent-dark"
        >
          {error}
        </p>
      )}
    </div>
  );
}
