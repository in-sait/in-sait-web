import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden border-b border-hairline py-[clamp(84px,10vw,128px)]"
    >
      <div
        aria-hidden
        className="brand-grid brand-grid--band pointer-events-none absolute inset-0"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="QUÉ HACEMOS"
          title="Soluciones a problemas reales mediante tecnología"
          subtitle="No vendemos dashboards ni software. Diseñamos e implementamos la solución que el negocio necesita — con criterio de ingeniería."
          className="mb-15 max-w-[680px]"
        />
        {/* Grilla real de 3 columnas. Antes era flex-wrap con justify-center y
            las dos últimas tarjetas quedaban centradas y huérfanas bajo la fila
            de tres; ahora la última fila alinea a la izquierda, que se lee como
            decisión y no como error de maqueta. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <Card hover className="h-full p-8">
                {/* Íconos en tinta, no en rosa: son etiquetas, no conclusiones. */}
                <div className="mb-6 flex size-12 items-center justify-center rounded-control border border-hairline bg-surface-soft">
                  <s.icon className="size-6 text-ink" strokeWidth={1.6} />
                </div>
                <h3 className="mb-2.5 text-[19px] font-semibold tracking-[-0.01em] text-ink">
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
