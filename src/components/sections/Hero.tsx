import Image from "next/image";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { WaveDivider, WAVE } from "../ui/WaveDivider";

const tags = [
  "Business Intelligence",
  "Data Engineering",
  "Automatización",
  "Software a medida",
];

export function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfbfd_0%,#ffffff_62%)] pb-[120px] pt-[170px]"
    >
      <WaveDivider d={WAVE.a} fill="#fbfbfd" />
      <div aria-hidden className="hero-dots pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute right-[6%] top-[34%] size-[640px] rounded-full"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent-light/28 bg-accent-light/10 px-4 py-1.5">
              <span className="size-[7px] rounded-full bg-accent-light shadow-[0_0_0_4px_rgba(249,138,202,0.2)]" />
              <span className="text-[12.5px] font-semibold tracking-[0.14em] text-accent-dark">
                DATA INSIGHTS, ALWAYS ON.
              </span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mb-5.5 text-[clamp(38px,5.4vw,64px)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
              Transformamos datos en{" "}
              <span className="text-brand-gradient">decisiones inteligentes</span>
              .
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mb-9 max-w-[520px] text-[clamp(16px,1.4vw,19px)] leading-[1.62] text-muted">
              Consultora de datos, analítica e ingeniería de software.
              Convertimos información dispersa en indicadores confiables y
              automatizamos los procesos que hoy te consumen horas.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-3.5">
              <Button href="#contacto" withArrow>
                Agendar una reunión
              </Button>
              <Button href="#servicios" variant="secondary">
                Ver servicios
              </Button>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-x-5.5 gap-y-2 text-[13.5px] font-medium text-faint">
              {tags.map((t, i) => (
                <span key={t} className="flex items-center gap-x-5.5">
                  {t}
                  {i < tags.length - 1 && (
                    <span className="text-accent-light">·</span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative hidden h-[520px] items-center justify-center lg:flex">
          <div className="hero-glow absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full" />
          <div className="absolute left-1/2 top-1/2 -ml-[215px] -mt-[215px] size-[430px] animate-spin-slow rounded-full border-[1.5px] border-dashed border-accent-light/32" />
          <div className="absolute left-1/2 top-1/2 -ml-[165px] -mt-[165px] size-[330px] animate-spin-rev rounded-full border-[1.5px] border-dashed border-[#7d7f8a]/24" />
          <div className="relative animate-floaty">
            <Image
              src="/assets/brand/insait-mark.svg"
              alt="In-sait símbolo"
              width={300}
              height={300}
              priority
              unoptimized
              className="w-[300px] animate-spin-slow drop-shadow-[0_30px_50px_rgba(43,45,51,0.2)]"
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
