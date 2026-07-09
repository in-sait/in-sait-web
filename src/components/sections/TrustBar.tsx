import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { WaveDivider, WAVE } from "../ui/WaveDivider";
import { sectors } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="relative bg-surface-soft pb-16 pt-2">
      <WaveDivider d={WAVE.b} fill="#ffffff" />
      <Container>
        <Reveal className="py-6.5">
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
