import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "@/lib/cn";
import { processSteps } from "@/lib/content";

export function Process() {
  const lastStep = processSteps[processSteps.length - 1].n;

  return (
    <section
      id="proceso"
      className="relative border-b border-hairline bg-surface-soft py-[clamp(84px,10vw,128px)]"
    >
      <Container>
        <SectionHeading
          eyebrow="CÓMO TRABAJAMOS"
          title="Un enfoque claro, de principio a fin"
          subtitle="Cada proyecto sigue el mismo camino. Incluye validación con el cliente y capacitación del equipo."
          className="mb-16 max-w-[640px]"
        />

        <Reveal className="relative">
          {/* línea horizontal (solo desktop) — hairline gris, no degradado rosa */}
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[26px] hidden h-px bg-hairline lg:block"
          />
          <ol className="proc-grid relative">
            {processSteps.map((step) => (
              <li key={step.n} className="proc-step">
                {/* El único rosa del proceso: el paso final, que es donde está
                    la promesa (acompañar, no entregar y desaparecer). */}
                <div
                  className={cn(
                    "proc-badge flex size-[54px] items-center justify-center rounded-card text-[18px] font-semibold tabular-nums",
                    step.n === lastStep
                      ? "bg-accent text-white"
                      : "border border-hairline bg-surface text-ink shadow-raise",
                  )}
                >
                  {step.n}
                </div>
                <h3 className="text-[16px] font-semibold text-ink lg:mt-[18px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-muted">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
