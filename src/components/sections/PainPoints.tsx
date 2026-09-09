import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "@/lib/cn";
import { painPoints } from "@/lib/content";

/* Las frases van CENTRADAS y en cajas iguales.
   Con regla al margen izquierdo y texto alineado a la izquierda, las seis
   frases —que tienen largos muy distintos— se leían como si estuvieran mal
   puestas: cada bloque arrancaba en el mismo punto pero terminaba en otro, y
   sin caja que las contenga no había nada que explicara la diferencia.
   La primera lleva el rosa: es la única que la marca contesta de frente,
   literalmente el valor 01, "Un solo número". */

export function PainPoints() {
  return (
    <section className="relative border-b border-hairline py-[clamp(96px,11vw,152px)]">
      <Container>
        <SectionHeading
          eyebrow="PROBLEMAS QUE RESOLVEMOS"
          title="Lo que escuchamos todos los días"
          subtitle="Frases reales de equipos antes de trabajar con nosotros. Probablemente reconozcas alguna."
          className="mb-16 max-w-[640px]"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((q, i) => (
            <Reveal key={q} delay={(i % 3) * 90}>
              <blockquote
                className={cn(
                  "flex h-full items-center justify-center rounded-card border px-7 py-10 text-center transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-1 hover:shadow-card",
                  i === 0
                    ? "border-accent/45 bg-accent-light/6"
                    : "border-hairline bg-surface-soft",
                )}
              >
                <p className="text-balance text-[19px] font-medium leading-[1.4] tracking-[-0.02em] text-ink">
                  {q}
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
