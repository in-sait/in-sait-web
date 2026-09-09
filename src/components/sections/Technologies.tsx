import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { technologies } from "@/lib/content";

export function Technologies() {
  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(72px,8vw,104px)]">
      {/* Retícula en negativo. Antes había dos glows radiales de 420px, uno rosa
          y uno teal, en esquinas opuestas: dos acentos compitiendo y ningún
          recurso derivado del isotipo. */}
      <div
        aria-hidden
        className="brand-grid brand-grid--dark brand-grid--band pointer-events-none absolute inset-0"
      />
      <Container className="relative max-w-[1000px] text-center">
        <Reveal>
          <p className="mb-3.5 text-[12.5px] font-semibold tracking-[0.16em] text-faint">
            STACK TECNOLÓGICO
          </p>
          <h2 className="mb-9 text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.12] tracking-[-0.025em] text-white text-balance">
            Herramientas modernas, elegidas con criterio
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((t) => (
              <Badge key={t} variant="dark" className="text-[15px]">
                {t}
              </Badge>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
