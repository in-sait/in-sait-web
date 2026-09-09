import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { values } from "@/lib/content";

export function Enfoque() {
  return (
    <section
      id="enfoque"
      className="relative border-b border-hairline bg-surface-soft py-[clamp(84px,10vw,128px)]"
    >
      <Container className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="lg:sticky lg:top-[110px]">
          <p className="mb-3.5 text-[12.5px] font-semibold tracking-[0.16em] text-muted">
            NUESTRO FOCO
          </p>
          {/* El único rosa de esta sección: la conclusión del titular. */}
          <h2 className="mb-5 text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink text-balance">
            Nos especializamos en una sola cosa:{" "}
            <span className="text-accent">
              que sepas lo que está pasando en tu empresa.
            </span>
          </h2>
          <p className="mb-4.5 text-[17px] leading-[1.65] text-muted">
            No hacemos de todo. Hacemos que tus datos te den control: dónde se
            gana, dónde se pierde, qué proceso te está costando horas y cuál
            indicador te está mintiendo.
          </p>
          <p className="mb-7 text-[17px] leading-[1.65] text-muted">
            Cuando el proyecto necesita además una solución tecnológica, la
            resuelve Zulpik, nuestro socio.
          </p>
          <div className="rounded-card border border-hairline border-l-[3px] border-l-ink bg-surface px-6 py-5">
            <p className="text-[17px] font-semibold leading-[1.5] text-ink">
              La tecnología nunca es el punto de partida.
              <br />
              <span className="text-ink-soft">El negocio, sí.</span>
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4.5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 80 + Math.floor(i / 2) * 40}>
              <Card className="h-full p-6.5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-control border border-hairline bg-surface-soft">
                    <v.icon className="size-[18px] text-ink" strokeWidth={1.7} />
                  </span>
                  <h3 className="text-[17px] font-semibold text-ink">
                    {v.title}
                  </h3>
                </div>
                <p className="text-[14.5px] leading-[1.6] text-muted">
                  {v.desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
