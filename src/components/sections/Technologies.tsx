import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { technologies } from "@/lib/content";

export function Technologies() {
  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(72px,8vw,104px)]">
      <WaveDivider d={WAVE.b} fill="#ffffff" className="h-[clamp(48px,5.5vw,88px)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-40px] top-10 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(249,138,202,0.2),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-[-40px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(42,188,156,0.16),transparent_62%)]"
      />
      <Container className="relative max-w-[1000px] text-center">
        <Reveal>
          <p className="mb-3.5 text-[13px] font-semibold tracking-[0.15em] text-accent-light">
            STACK TECNOLÓGICO
          </p>
          <h2 className="mb-8.5 text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.025em] text-white">
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
