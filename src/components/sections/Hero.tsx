import Image from "next/image";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ScheduleButton } from "./ScheduleModal";

const tags = [
  "Business Intelligence",
  "Integración de sistemas",
  "Automatización",
  "IA aplicada",
];

export function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden border-b border-hairline bg-surface pb-[120px] pt-[170px]"
    >
      {/* Recurso 04 · retícula de precisión, enmascarada para no competir con el
          texto. Reemplaza a los dos glows radiales rosados que había acá. */}
      <div
        aria-hidden
        className="brand-grid brand-grid--bloom pointer-events-none absolute inset-0"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            {/* Pill rosa sobre claro: especificado así en el brief §04 (Hero). */}
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-light/10 px-4 py-1.5">
              <span className="size-[6px] rounded-full bg-accent" />
              <span className="text-[12.5px] font-semibold tracking-[0.14em] text-accent-dark">
                DATA INSIGHTS, ALWAYS ON.
              </span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mb-5 text-balance text-[clamp(38px,5.4vw,64px)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
              Sabé dónde ganás, dónde perdés{" "}
              <span className="text-brand-gradient">y por qué</span>.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mb-9 max-w-[520px] text-[clamp(16px,1.4vw,19px)] leading-[1.62] text-muted">
              Conectamos los sistemas de tu empresa en un solo tablero y
              automatizamos los reportes que hoy se arman a mano. Ves el negocio
              completo, al día, sin discutir qué número es el correcto.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-3.5">
              <ScheduleButton>Pedir un diagnóstico</ScheduleButton>
              <Button href="#dashboard" variant="secondary">
                Ver un tablero
              </Button>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-medium text-muted">
              {tags.map((t, i) => (
                <li key={t} className="flex items-center gap-x-5">
                  {t}
                  {i < tags.length - 1 && (
                    <span aria-hidden className="text-steel">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* El isotipo queda QUIETO: es el núcleo. Lo que gira son las órbitas.
            Antes rotaba la marca misma (46s) además de flotar, dentro de dos
            anillos que también giraban y sobre un glow que pulsaba. Rotándolo,
            quien entra a la página ve el isotipo en un ángulo arbitrario y
            nunca en su orientación real.
            ponytail: decisión pendiente de Rodrigo. Para volver a la versión
            que rota, agregar `animate-spin-slow` al className del <Image>. */}
        <div className="relative hidden h-[520px] items-center justify-center lg:flex">
          <div className="absolute left-1/2 top-1/2 -ml-[215px] -mt-[215px] size-[430px] animate-spin-slow rounded-full border border-dashed border-steel/70" />
          <div className="absolute left-1/2 top-1/2 -ml-[165px] -mt-[165px] size-[330px] animate-spin-rev rounded-full border border-dashed border-steel/45" />
          <Image
            src="/assets/brand/insait-mark.svg"
            alt="In-sait símbolo"
            width={300}
            height={300}
            priority
            unoptimized
            className="relative w-[300px] drop-shadow-[0_24px_44px_rgba(43,45,51,0.14)]"
          />
        </div>
      </Container>
    </header>
  );
}
