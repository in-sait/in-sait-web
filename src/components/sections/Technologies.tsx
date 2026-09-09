import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { technologies } from "@/lib/content";

export function Technologies() {
  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(96px,11vw,144px)]">
      {/* Retícula en negativo. Antes había dos glows radiales de 420px, uno rosa
          y uno teal, en esquinas opuestas: dos acentos compitiendo y ningún
          recurso derivado del isotipo. */}
      <div
        aria-hidden
        className="brand-grid brand-grid--dark brand-grid--band pointer-events-none absolute inset-0"
      />
      <Container className="relative max-w-[1000px] text-center">
        <Reveal>
          <p className="mb-4 text-[12.5px] font-semibold tracking-[0.16em] text-faint">
            STACK TECNOLÓGICO
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-11 text-balance text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
            Herramientas modernas, elegidas con criterio
          </h2>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((t, i) => (
            <Reveal key={t} delay={180 + i * 55}>
              <Badge variant="dark" className="text-[15px]">
                {t}
              </Badge>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
