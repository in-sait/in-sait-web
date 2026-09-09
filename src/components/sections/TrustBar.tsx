import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { PartnerBadge } from "../ui/PartnerBadge";
import { sectors } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="relative bg-surface-soft pb-16 pt-2">
      <WaveDivider d={WAVE.b} fill="#ffffff" />
      <Container>
        <Reveal className="flex flex-col items-center gap-3.5 pt-4">
          <PartnerBadge />
          <p className="max-w-[520px] text-center text-[14.5px] leading-[1.6] text-muted">
            Zulpik resuelve la parte tecnológica. Nosotros, todo lo que pasa con
            los datos después.
          </p>
        </Reveal>
        <Reveal className="py-6.5" delay={80}>
          <p className="mb-4.5 text-center text-[12.5px] font-semibold tracking-[0.16em] text-faint">
            SECTORES CON LOS QUE TRABAJAMOS
          </p>
          <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-3">
            {sectors.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
