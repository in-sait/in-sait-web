import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { painPoints } from "@/lib/content";

export function PainPoints() {
  return (
    <section className="relative py-[clamp(84px,10vw,128px)]">
      <WaveDivider d={WAVE.a} fill="#fbfbfd" />
      <Container>
        <SectionHeading
          eyebrow="PROBLEMAS QUE RESOLVEMOS"
          title="Lo que escuchamos todos los días"
          subtitle="Frases reales de equipos antes de trabajar con nosotros. Probablemente reconozcas alguna."
          className="mb-14 max-w-[640px]"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((q, i) => (
            <Reveal key={q} delay={(i % 3) * 80}>
              <div className="h-full rounded-[18px] border border-ink/8 bg-surface-soft p-7.5">
                <span className="text-[40px] font-bold leading-none text-accent-light">
                  &ldquo;
                </span>
                <p className="mt-2 text-[18px] font-semibold leading-[1.45] text-ink">
                  {q}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
