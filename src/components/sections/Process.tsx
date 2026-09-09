"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "@/lib/cn";
import { processSteps } from "@/lib/content";

const EASE = [0.16, 0.84, 0.44, 1] as const;

export function Process() {
  const lastStep = processSteps[processSteps.length - 1].n;
  const reduce = useReducedMotion();

  return (
    <section
      id="proceso"
      className="relative border-b border-hairline bg-surface-soft py-[clamp(96px,11vw,152px)]"
    >
      <Container>
        <SectionHeading
          eyebrow="CÓMO TRABAJAMOS"
          title="Un enfoque claro, de principio a fin"
          subtitle="Cada proyecto sigue el mismo camino. Incluye validación con el cliente y capacitación del equipo."
          className="mb-16 max-w-[640px]"
        />

        <div className="relative">
          {/* La línea se dibuja de izquierda a derecha al entrar en viewport, al
              mismo ritmo al que van apareciendo los pasos: el recorrido del
              método se ve avanzar en vez de estar ahí de entrada. */}
          <motion.div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[26px] hidden h-px origin-left bg-hairline lg:block"
            initial={reduce ? undefined : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <ol className="proc-grid relative">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.n}
                className="proc-step"
                initial={reduce ? undefined : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.13 }}
              >
                {/* El único rosa del proceso: el paso final, que es donde está
                    la promesa (acompañar, no entregar y desaparecer). */}
                <div
                  className={cn(
                    "proc-badge flex size-[54px] items-center justify-center rounded-card text-[18px] font-semibold tabular-nums",
                    step.n === lastStep
                      ? "bg-accent text-white"
                      : "border border-hairline bg-surface text-ink shadow-raise",
                  )}
                >
                  {step.n}
                </div>
                <h3 className="text-[16px] font-semibold text-ink lg:mt-[18px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-muted">
                  {step.desc}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
