"use client";

import { useState } from "react";
import { Home, BarChart3, Clock, Database, Settings } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { CountUp } from "../ui/CountUp";
import { cn } from "@/lib/cn";

/* ───────────────────────────────────────────────────────────────────────────
   Reglas de dataviz del brief (§02, "Sobre gráficos reales"), aplicadas acá:
     · una sola serie destacada en rosa, el resto en gris
     · sin leyenda flotante si se puede etiquetar la serie directamente
     · sin grilla completa: sólo eje base
     · sin efectos (se fue el relleno de área con degradado)
     · torta y barra 3D prohibidas incluso cuando el dato lo pida — se
       reemplazan por barra horizontal simple o por la cifra sola
   El donut de "Distribución por canal" era una torta: está reemplazado por
   barras horizontales.

   El movimiento de esta sección no es decorativo: la serie SE DIBUJA y las
   barras CRECEN desde cero. Es la única sección donde el dato se construye
   delante tuyo, que es exactamente lo que In-sait vende.
   ─────────────────────────────────────────────────────────────────────────── */

const EASE = [0.16, 0.84, 0.44, 1] as const;

type Tab = "resumen" | "ventas" | "calidad";

const kpis = [
  { label: "Ingresos", value: 12540, delta: "▲ 12,5%" },
  { label: "Operaciones", value: 8320, delta: "▲ 8,1%" },
  { label: "Pendientes", value: 4210, delta: "▼ 3,4%" },
  { label: "Nuevos clientes", value: 2890, delta: "▲ 5,7%" },
];

const channels = [
  { name: "Directo", pct: 45 },
  { name: "Partners", pct: 30 },
  { name: "Digital", pct: 25 },
];

const regions = [
  { name: "Buenos Aires", pct: 82 },
  { name: "Córdoba", pct: 64 },
  { name: "Santa Fe", pct: 51 },
  { name: "Mendoza", pct: 38 },
];

const quality = [
  { src: "ERP · Ventas", rows: "128.400", comp: "99,2%", ok: true },
  { src: "CRM · Clientes", rows: "42.180", comp: "96,8%", ok: true },
  { src: "Planillas · Logística", rows: "9.640", comp: "81,5%", ok: false },
  { src: "API · Facturación", rows: "64.020", comp: "98,1%", ok: true },
];

const sidebarIcons = [Home, BarChart3, Clock, Database, Settings];

export function DashboardShowcase() {
  const [tab, setTab] = useState<Tab>("resumen");

  return (
    <section
      id="dashboard"
      className="relative overflow-hidden border-b border-hairline py-[clamp(96px,11vw,152px)]"
    >
      <div
        aria-hidden
        className="brand-grid brand-grid--band pointer-events-none absolute inset-0"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="NUESTRO TRABAJO"
          title="Insights que generan impacto"
          subtitle="Ejemplo de una plataforma de BI: KPIs en vivo, análisis y control de calidad de datos en una sola vista."
          className="mb-14 max-w-[660px]"
        />

        <Reveal className="grid grid-cols-1 overflow-hidden rounded-panel border border-hairline bg-surface shadow-panel lg:grid-cols-[78px_1fr]">
          {/* sidebar */}
          <div className="flex flex-row items-center justify-center gap-3 bg-ink px-4 py-3 lg:flex-col lg:gap-2 lg:px-0 lg:py-6">
            <Image
              src="/assets/brand/insait-mark.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              className="size-8 opacity-90 [filter:brightness(0)_invert(1)] lg:mb-4"
            />
            {sidebarIcons.map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  "flex size-9 items-center justify-center rounded-control lg:size-11",
                  i === 1 ? "bg-white/12 text-white" : "text-white/40",
                )}
              >
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
            ))}
          </div>

          {/* main */}
          <div className="bg-surface-soft p-6 lg:px-7 lg:pb-8 lg:pt-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3.5">
              <div>
                <p className="mb-1 text-[11.5px] font-semibold tracking-[0.12em] text-muted">
                  PANEL EJECUTIVO
                </p>
                <h3 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
                  Rendimiento comercial
                </h3>
              </div>
              <div className="inline-flex gap-1 rounded-control bg-hairline p-1">
                {(["resumen", "ventas", "calidad"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    aria-pressed={tab === t}
                    className={cn(
                      "relative rounded-[7px] px-4 py-2 text-[13.5px] font-medium capitalize transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1",
                      tab === t ? "text-white" : "text-muted hover:text-ink",
                    )}
                  >
                    {/* la pastilla activa se desliza entre pestañas */}
                    {tab === t && (
                      <motion.span
                        layoutId="dash-tab"
                        aria-hidden
                        className="absolute inset-0 rounded-[7px] bg-ink"
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* KPIs — cifras en tinta, tabular-nums para que no bailen al contar.
                Los deltas van en gris: la flecha ya comunica la dirección, y el
                rosa está reservado para la conclusión del panel. */}
            <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-card border border-hairline bg-surface px-4.5 py-4"
                >
                  <p className="mb-1.5 text-[12.5px] font-medium text-muted">
                    {k.label}
                  </p>
                  <p className="mb-1 text-[26px] font-semibold tabular-nums tracking-[-0.02em] text-ink">
                    <CountUp value={k.value} />
                  </p>
                  <span className="text-[12.5px] font-medium tabular-nums text-muted">
                    {k.delta}
                  </span>
                </div>
              ))}
            </div>

            {tab === "resumen" && <ResumenPanel />}
            {tab === "ventas" && <VentasPanel />}
            {tab === "calidad" && <CalidadPanel />}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Barra horizontal simple. Reemplaza a la torta y se reusa en los dos paneles. */
function Bar({
  name,
  pct,
  highlight = false,
  index = 0,
}: {
  name: string;
  pct: number;
  highlight?: boolean;
  index?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[13px]">
        <span className={cn("font-medium", highlight ? "text-ink" : "text-ink-soft")}>
          {name}
        </span>
        <span className="tabular-nums text-muted">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-hairline">
        <motion.div
          className={cn(
            "h-full origin-left rounded-full",
            highlight ? "bg-accent" : "bg-steel",
          )}
          style={{ width: `${pct}%` }}
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 + index * 0.09 }}
        />
      </div>
    </div>
  );
}

function ResumenPanel() {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-card border border-hairline bg-surface p-5">
        <div className="mb-3.5 flex items-center justify-between">
          <p className="text-[14px] font-semibold text-ink">
            Tendencia de ingresos
          </p>
          <span className="text-[12px] text-muted">Últimos 12 meses</span>
        </div>
        {/* Sin grilla y sin relleno de área: sólo el eje base y la serie.
            El punto rosa del final es la conclusión del panel. */}
        <svg viewBox="0 0 560 200" className="block h-auto w-full">
          <line
            x1="0"
            y1="186"
            x2="560"
            y2="186"
            className="stroke-steel"
            strokeWidth="1"
          />
          <motion.path
            d="M0,150 C40,140 70,120 110,124 C150,128 175,96 215,92 C255,88 280,110 320,96 C360,82 385,54 425,58 C465,62 500,40 552,26"
            fill="none"
            className="stroke-accent"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? undefined : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, ease: EASE }}
          />
          <motion.circle
            cx="552"
            cy="26"
            r="4.5"
            className="fill-accent"
            initial={reduce ? undefined : { scale: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: EASE, delay: 1.35 }}
            style={{ transformOrigin: "552px 26px" }}
          />
        </svg>
      </div>
      <div className="flex flex-col rounded-card border border-hairline bg-surface p-5">
        <p className="mb-4 text-[14px] font-semibold text-ink">
          Distribución por canal
        </p>
        {/* Antes era un donut. Torta está en la lista negra del brief. */}
        <div className="flex flex-1 flex-col justify-center gap-4">
          {channels.map((c, i) => (
            <Bar key={c.name} name={c.name} pct={c.pct} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VentasPanel() {
  const top = Math.max(...regions.map((r) => r.pct));

  return (
    <div className="rounded-card border border-hairline bg-surface p-5">
      <div className="mb-4.5 flex items-center justify-between">
        <p className="text-[14px] font-semibold text-ink">Ventas por región</p>
        <span className="text-[12px] text-muted">Trimestre actual</span>
      </div>
      <div className="flex flex-col gap-4">
        {regions.map((r, i) => (
          <Bar
            key={r.name}
            name={r.name}
            pct={r.pct}
            index={i}
            highlight={r.pct === top}
          />
        ))}
      </div>
    </div>
  );
}

function CalidadPanel() {
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-surface">
      <div className="grid grid-cols-[2fr_1fr] gap-2 border-b border-hairline px-4.5 py-3.5 text-[11.5px] font-semibold tracking-[0.06em] text-muted sm:grid-cols-[2fr_1fr_1fr_1fr]">
        <span>FUENTE DE DATOS</span>
        <span className="hidden sm:block">REGISTROS</span>
        <span className="hidden sm:block">COMPLETITUD</span>
        <span>ESTADO</span>
      </div>
      {quality.map((q, i) => (
        <motion.div
          key={q.src}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
          className={cn(
            "grid grid-cols-[2fr_1fr] items-center gap-2 px-4.5 py-3.5 text-[13.5px]",
            "sm:grid-cols-[2fr_1fr_1fr_1fr]",
            i < quality.length - 1 && "border-b border-hairline",
            // la fila a revisar es la conclusión de la tabla
            !q.ok && "bg-accent-light/8",
          )}
        >
          <span className="font-medium text-ink">{q.src}</span>
          <span className="hidden tabular-nums text-muted sm:block">{q.rows}</span>
          <span className="hidden tabular-nums text-muted sm:block">{q.comp}</span>
          <span>
            <span
              className={cn(
                "inline-block rounded-full border px-2.5 py-0.5 text-[12px] font-medium",
                q.ok
                  ? "border-teal/35 bg-teal/12 text-ink"
                  : "border-accent/40 bg-accent-light/16 text-accent-dark",
              )}
            >
              {q.ok ? "Confiable" : "Revisar"}
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}
