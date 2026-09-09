import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "@/lib/cn";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden border-b border-hairline py-[clamp(96px,11vw,152px)]"
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
          className="mb-16 max-w-[680px]"
        />
        {/* Grilla asimétrica: la primera tarjeta ocupa dos columnas. Rompe la
            monotonía de cinco cajas iguales y de paso resuelve la fila
            huérfana que quedaba con flex-wrap + justify-center. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={s.title}
                delay={i * 70}
                className={cn(featured && "sm:col-span-2")}
              >
                <Card
                  hover
                  className={cn(
                    "group h-full",
                    featured
                      ? "flex flex-col justify-between p-9 lg:p-10"
                      : "p-8",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-control border border-hairline bg-surface-soft transition-transform duration-500 ease-brand group-hover:-translate-y-1",
                      featured ? "mb-8 size-14" : "mb-6 size-12",
                    )}
                  >
                    <s.icon
                      className={cn("text-ink", featured ? "size-7" : "size-6")}
                      strokeWidth={1.6}
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "mb-2.5 font-semibold tracking-[-0.015em] text-ink",
                        featured ? "text-[clamp(24px,2.4vw,32px)]" : "text-[19px]",
                      )}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={cn(
                        "leading-[1.6] text-muted",
                        featured ? "max-w-[46ch] text-[17px]" : "text-[15px]",
                      )}
                    >
                      {s.desc}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
