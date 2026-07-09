import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { CountUp } from "../ui/CountUp";
import { metrics } from "@/lib/content";

export function Metrics() {
  return (
    <section className="relative py-[clamp(84px,10vw,120px)]">
      <WaveDivider d={WAVE.a} fill="#2B2D33" className="h-[clamp(48px,5.5vw,88px)]" />
      <Container>
        <SectionHeading
          eyebrow="EL IMPACTO QUE BUSCAMOS"
          title="Resultados que se notan en la operación"
          subtitle="Cifras ilustrativas de los objetivos típicos de un proyecto."
          className="mb-13 max-w-[600px]"
        />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {metrics.map((m) => (
            <Reveal
              key={m.label}
              className="rounded-[20px] border border-ink/8 bg-[linear-gradient(180deg,#fff,#fbfbfd)] px-5 py-8.5 text-center"
            >
              <p className="text-brand-gradient mb-2 text-[clamp(38px,5vw,56px)] font-bold leading-none tracking-[-0.03em]">
                {typeof m.value === "number" ? (
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                ) : (
                  m.value
                )}
              </p>
              <p className="text-[14.5px] font-medium text-muted">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
