import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "@/lib/cn";
import { painPoints } from "@/lib/content";

/* Antes: seis tarjetas idénticas, cada una con una comilla rosa de 40px.
   Seis rosas decorativos en una sola composición.
   Ahora: el tratamiento de cita del brief (regla vertical hairline + frase en
   tinta), y la regla rosa marca la única frase que la marca responde de frente
   — "no sabemos cuál dato es el correcto" es literalmente el valor 01,
   "Un solo número". */

export function PainPoints() {
  return (
    <section className="relative border-b border-hairline py-[clamp(84px,10vw,128px)]">
      <Container>
        <SectionHeading
          eyebrow="PROBLEMAS QUE RESOLVEMOS"
          title="Lo que escuchamos todos los días"
          subtitle="Frases reales de equipos antes de trabajar con nosotros. Probablemente reconozcas alguna."
          className="mb-14 max-w-[640px]"
        />
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {painPoints.map((q, i) => (
            <Reveal key={q} delay={(i % 2) * 80}>
              <blockquote
                className={cn(
                  "h-full border-l-2 pl-5",
                  i === 0 ? "border-accent" : "border-steel",
                )}
              >
                <p className="text-[21px] font-medium leading-[1.34] tracking-[-0.02em] text-ink text-balance">
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
