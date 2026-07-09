"use client";

import { useState } from "react";
import { Home, BarChart3, Clock, Database, Settings } from "lucide-react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { CountUp } from "../ui/CountUp";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { cn } from "@/lib/cn";

type Tab = "resumen" | "ventas" | "calidad";

const kpis = [
  { label: "Ingresos", value: 12540, delta: "▲ 12,5%", up: true },
  { label: "Operaciones", value: 8320, delta: "▲ 8,1%", up: true },
  { label: "Pendientes", value: 4210, delta: "▼ 3,4%", up: false },
  { label: "Nuevos clientes", value: 2890, delta: "▲ 5,7%", up: true },
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
    <section id="dashboard" className="relative overflow-hidden py-[clamp(84px,10vw,128px)]">
      <WaveDivider d={WAVE.a} fill="#fbfbfd" />
      <Container>
        <SectionHeading
          eyebrow="NUESTRO TRABAJO"
          title="Insights que generan impacto"
          subtitle="Ejemplo de una plataforma de BI: KPIs en vivo, análisis y control de calidad de datos en una sola vista."
          className="mb-13 max-w-[660px]"
        />

        <Reveal className="grid grid-cols-1 overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-[0_40px_90px_rgba(43,45,51,0.14)] lg:grid-cols-[78px_1fr]">
          {/* sidebar */}
          <div className="flex flex-row items-center justify-center gap-3 bg-ink px-4 py-3 lg:flex-col lg:gap-2 lg:px-0 lg:py-5.5">
            <Image
              src="/assets/brand/insait-mark.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              className="size-8 opacity-90 [filter:brightness(0)_invert(1)] lg:mb-4.5"
            />
            {sidebarIcons.map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  "flex size-9.5 items-center justify-center rounded-xl lg:size-11",
                  i === 1
                    ? "bg-brand-gradient text-white shadow-[0_6px_16px_rgba(219,110,156,0.4)]"
                    : "text-[#9a9ca4]",
                )}
              >
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
            ))}
          </div>

          {/* main */}
          <div className="bg-[#fcfcfd] p-6.5 lg:px-7.5 lg:pb-8 lg:pt-6.5">
            <div className="mb-5.5 flex flex-wrap items-center justify-between gap-3.5">
              <div>
                <p className="mb-1 text-[12px] font-semibold tracking-[0.1em] text-faint">
                  PANEL EJECUTIVO
                </p>
                <h3 className="text-[20px] font-bold tracking-[-0.01em] text-ink">
                  Rendimiento comercial
                </h3>
              </div>
              <div className="inline-flex gap-1 rounded-xl bg-[#eceef1] p-1.5">
                {(["resumen", "ventas", "calidad"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={cn(
                      "rounded-[9px] px-4 py-2 text-[13.5px] font-semibold capitalize transition-colors",
                      tab === t ? "bg-ink text-white" : "text-[#7d7f8a]",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-[14px] border border-ink/8 bg-surface px-4.5 py-4"
                >
                  <p className="mb-1.5 text-[12.5px] font-medium text-faint">
                    {k.label}
                  </p>
                  <p className="mb-1 text-[26px] font-bold tracking-[-0.02em] text-ink">
                    <CountUp value={k.value} />
                  </p>
                  <span
                    className={cn(
                      "text-[12.5px] font-semibold",
                      k.up ? "text-teal" : "text-accent",
                    )}
                  >
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

function ResumenPanel() {
  return (
    <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-2xl border border-ink/8 bg-surface p-5">
        <div className="mb-3.5 flex items-center justify-between">
          <p className="text-[14px] font-semibold text-ink">
            Tendencia de ingresos
          </p>
          <span className="text-[12px] text-faint">Últimos 12 meses</span>
        </div>
        <svg viewBox="0 0 560 200" className="block h-auto w-full">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F98ACA" stopOpacity=".28" />
              <stop offset="1" stopColor="#F98ACA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="50" x2="560" y2="50" stroke="#eef0f2" />
          <line x1="0" y1="100" x2="560" y2="100" stroke="#eef0f2" />
          <line x1="0" y1="150" x2="560" y2="150" stroke="#eef0f2" />
          <path
            d="M0,150 C40,140 70,120 110,124 C150,128 175,96 215,92 C255,88 280,110 320,96 C360,82 385,54 425,58 C465,62 500,40 560,26 L560,200 L0,200 Z"
            fill="url(#areaFill)"
          />
          <path
            d="M0,150 C40,140 70,120 110,124 C150,128 175,96 215,92 C255,88 280,110 320,96 C360,82 385,54 425,58 C465,62 500,40 560,26"
            fill="none"
            stroke="#DB6E9C"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx="560" cy="26" r="4.5" fill="#DB6E9C" />
          <circle cx="560" cy="26" r="8" fill="#DB6E9C" opacity=".2" />
        </svg>
      </div>
      <div className="flex flex-col rounded-2xl border border-ink/8 bg-surface p-5">
        <p className="mb-3 text-[14px] font-semibold text-ink">
          Distribución por canal
        </p>
        <div className="flex flex-1 items-center gap-4.5">
          <svg viewBox="0 0 120 120" className="size-28 flex-none">
            <circle cx="60" cy="60" r="46" fill="none" stroke="#eceef1" strokeWidth="16" />
            <circle cx="60" cy="60" r="46" fill="none" stroke="#DB6E9C" strokeWidth="16" strokeDasharray="130 289" transform="rotate(-90 60 60)" strokeLinecap="round" />
            <circle cx="60" cy="60" r="46" fill="none" stroke="#2ABC9C" strokeWidth="16" strokeDasharray="87 289" strokeDashoffset="-134" transform="rotate(-90 60 60)" strokeLinecap="round" />
            <circle cx="60" cy="60" r="46" fill="none" stroke="#7D7F8A" strokeWidth="16" strokeDasharray="58 289" strokeDashoffset="-225" transform="rotate(-90 60 60)" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col gap-2.5 text-[13px] text-ink-soft">
            {[
              ["Directo 45%", "#DB6E9C"],
              ["Partners 30%", "#2ABC9C"],
              ["Digital 25%", "#7D7F8A"],
            ].map(([label, color]) => (
              <span key={label} className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-[3px]"
                  style={{ background: color }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VentasPanel() {
  return (
    <div className="rounded-2xl border border-ink/8 bg-surface p-5">
      <div className="mb-4.5 flex items-center justify-between">
        <p className="text-[14px] font-semibold text-ink">Ventas por región</p>
        <span className="text-[12px] text-faint">Trimestre actual</span>
      </div>
      <div className="flex flex-col gap-4">
        {regions.map((r) => (
          <div key={r.name}>
            <div className="mb-1.5 flex justify-between text-[13px]">
              <span className="font-medium text-ink-soft">{r.name}</span>
              <span className="text-faint">{r.pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-md bg-[#eceef1]">
              <div
                className="bg-brand-gradient h-full rounded-md"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalidadPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/8 bg-surface">
      <div className="grid grid-cols-[2fr_1fr] gap-2 border-b border-ink/7 px-4.5 py-3.5 text-[12px] font-semibold tracking-[0.04em] text-faint sm:grid-cols-[2fr_1fr_1fr_1fr]">
        <span>FUENTE DE DATOS</span>
        <span className="hidden sm:block">REGISTROS</span>
        <span className="hidden sm:block">COMPLETITUD</span>
        <span>ESTADO</span>
      </div>
      {quality.map((q, i) => (
        <div
          key={q.src}
          className={cn(
            "grid grid-cols-[2fr_1fr] items-center gap-2 px-4.5 py-3.5 text-[13.5px] sm:grid-cols-[2fr_1fr_1fr_1fr]",
            i < quality.length - 1 && "border-b border-ink/5",
          )}
        >
          <span className="font-medium text-ink">{q.src}</span>
          <span className="hidden text-muted sm:block">{q.rows}</span>
          <span className="hidden text-muted sm:block">{q.comp}</span>
          <span>
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-1 text-[12px] font-semibold",
                q.ok ? "bg-teal/12 text-teal-dark" : "bg-accent-light/16 text-accent-dark",
              )}
            >
              {q.ok ? "Confiable" : "Revisar"}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
