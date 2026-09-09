import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ScheduleButton } from "./ScheduleModal";
import { HeroBackdrop } from "./HeroBackdrop";

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
      className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-hairline bg-surface pb-28 pt-[150px]"
    >
      {/* Recurso 04 · retícula de precisión, enmascarada para no competir con el
          texto. Reemplaza a los dos glows radiales rosados que había acá. */}
      <div
        aria-hidden
        className="brand-grid brand-grid--bloom pointer-events-none absolute inset-0"
      />
      <HeroBackdrop />

      <Container className="relative">
        <div className="max-w-[660px]">
          <Reveal>
            {/* Pill rosa sobre claro: especificado así en el brief §04 (Hero). */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-light/10 px-4 py-1.5">
              <span className="size-[6px] rounded-full bg-accent" />
              <span className="text-[12.5px] font-semibold tracking-[0.14em] text-accent-dark">
                DATA INSIGHTS, ALWAYS ON.
              </span>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mb-6 text-balance text-[clamp(42px,6.2vw,82px)] font-semibold leading-[0.98] tracking-[-0.038em] text-ink">
              Sabé dónde ganás, dónde perdés{" "}
              <span className="text-brand-gradient">y por qué</span>.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mb-10 max-w-[540px] text-[clamp(16.5px,1.4vw,19px)] leading-[1.62] text-muted">
              Conectamos los sistemas de tu empresa en un solo tablero y
              automatizamos los reportes que hoy se arman a mano. Ves el negocio
              completo, al día, sin discutir qué número es el correcto.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <div className="flex flex-wrap gap-3.5">
              <ScheduleButton>Pedir un diagnóstico</ScheduleButton>
              <Button href="#dashboard" variant="secondary">
                Ver un tablero
              </Button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <ul className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-medium text-muted">
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
      </Container>
    </header>
  );
}
