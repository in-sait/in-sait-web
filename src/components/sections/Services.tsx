import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative py-[clamp(84px,10vw,128px)]"
    >
      <WaveDivider d={WAVE.a} fill="#fbfbfd" />
      <Container>
        <SectionHeading
          eyebrow="QUÉ HACEMOS"
          title="Soluciones a problemas reales mediante tecnología"
          subtitle="No vendemos dashboards ni software. Diseñamos e implementamos la solución que el negocio necesita — con criterio de ingeniería."
          className="mb-15 max-w-[680px]"
        />
        <div className="flex flex-wrap justify-center gap-5.5">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={(i % 3) * 80}
              className="flex-[0_1_362px]"
            >
              <Card hover className="h-full p-8">
                <div className="mb-5.5 flex size-13 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,rgba(249,138,202,0.16),rgba(249,138,202,0.06))]">
                  <s.icon className="size-6.5 text-accent" strokeWidth={1.8} />
                </div>
                <h3 className="mb-2.5 text-[20px] font-semibold tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-muted">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
