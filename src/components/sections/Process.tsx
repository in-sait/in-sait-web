import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { cn } from "@/lib/cn";
import { processSteps } from "@/lib/content";

export function Process() {
  const last = processSteps.length - 1;

  return (
    <section
      id="proceso"
      className="relative bg-surface-soft py-[clamp(84px,10vw,128px)]"
    >
      <WaveDivider d={WAVE.a} fill="#ffffff" />
      <Container>
        <SectionHeading
          eyebrow="CÓMO TRABAJAMOS"
          title="Un enfoque claro, de principio a fin"
          subtitle="Cada proyecto sigue el mismo camino. Incluye validación con el cliente y capacitación del equipo."
          className="mb-16 max-w-[640px]"
        />

        <Reveal className="relative">
          {/* línea horizontal (solo desktop) */}
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[26px] hidden h-[2px] bg-[linear-gradient(90deg,#E8E9EC,#F98ACA,#E8E9EC)] lg:block"
          />
          <ol className="proc-grid relative">
            {processSteps.map((step) => (
              <li key={step.n} className="proc-step">
                <div
                  className={cn(
                    "proc-badge flex size-[54px] items-center justify-center rounded-2xl text-[18px] font-bold",
                    step.n === last + 1
                      ? "bg-brand-gradient text-white shadow-[0_10px_22px_rgba(219,110,156,0.35)]"
                      : "border border-ink/10 bg-surface text-accent shadow-[0_6px_16px_rgba(43,45,51,0.06)]",
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
