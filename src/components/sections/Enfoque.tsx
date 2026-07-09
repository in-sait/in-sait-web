import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { values } from "@/lib/content";

export function Enfoque() {
  return (
    <section
      id="enfoque"
      className="relative bg-surface-soft py-[clamp(84px,10vw,128px)]"
    >
      <WaveDivider d={WAVE.b} fill="#ffffff" />
      <Container className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="lg:sticky lg:top-[110px]">
          <p className="mb-3.5 text-[13px] font-semibold tracking-[0.15em] text-accent">
            NUESTRO ENFOQUE
          </p>
          <h2 className="mb-5 text-[clamp(30px,3.6vw,44px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
            Un socio tecnológico, no un proveedor más
          </h2>
          <p className="mb-6.5 text-[17px] leading-[1.65] text-muted">
            Buscamos relaciones de largo plazo. Cada proyecto debe dejar al
            cliente en una mejor situación que cuando empezó.
          </p>
          <div className="rounded-2xl border border-l-[3px] border-ink/9 border-l-accent-light bg-surface px-5.5 py-5">
            <p className="text-[17px] font-semibold leading-[1.5] text-ink">
              La tecnología nunca es el punto de partida.
              <br />
              <span className="text-accent">El negocio, sí.</span>
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4.5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 80 + Math.floor(i / 2) * 40}>
              <Card className="h-full p-6.5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex size-9.5 items-center justify-center rounded-[10px] bg-ink/5">
                    <v.icon className="size-5 text-ink" strokeWidth={1.8} />
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
