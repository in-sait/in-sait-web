import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { CountUp } from "../ui/CountUp";
import { cn } from "@/lib/cn";
import { metrics } from "@/lib/content";

/* Recurso 06 del brief · "La cifra como recurso gráfico":
   cifra enorme con tracking negativo y tabular-nums, etiqueta micro en
   versalitas espaciadas debajo, sin ícono al lado, SIN CAJA y sin sombra.
   Una sola cifra por bloque va en rosa: la que resume el caso.
   Antes: cuatro tarjetas con borde, degradado de fondo y las cuatro cifras
   en gradiente rosa — o sea, cuatro conclusiones y por lo tanto ninguna. */

export function Metrics() {
  return (
    <section className="relative border-b border-hairline py-[clamp(96px,11vw,152px)]">
      <Container>
        <SectionHeading
          eyebrow="EL IMPACTO QUE BUSCAMOS"
          title="Resultados que se notan en la operación"
          subtitle="Cifras ilustrativas de los objetivos típicos de un proyecto."
          className="mb-14 max-w-[600px]"
        />
        {/* Separadores verticales hairline. El -ml-px + overflow-hidden esconde
            el borde izquierdo de la primera columna en todas las filas, así no
            hace falta nth-child para cada breakpoint. */}
        <Reveal className="overflow-hidden border-y border-hairline">
          <dl className="-ml-px grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="border-l border-hairline px-3 py-9 sm:px-6"
              >
                <dd
                  className={cn(
                    "mb-2.5 text-[clamp(38px,5vw,56px)] font-semibold tabular-nums leading-none tracking-[-0.04em]",
                    m.highlight ? "text-accent" : "text-ink",
                  )}
                >
                  {typeof m.value === "number" ? (
                    <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  ) : (
                    m.value
                  )}
                </dd>
                <dt className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
