"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { cn } from "@/lib/cn";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="relative border-b border-hairline bg-surface-soft py-[clamp(96px,11vw,152px)]"
    >
      <Container className="max-w-[820px]">
        <div className="mb-12 text-center">
          <p className="mb-3.5 text-[12.5px] font-semibold tracking-[0.16em] text-muted">
            PREGUNTAS FRECUENTES
          </p>
          <h2 className="text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            Todo lo que querés saber
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-card border bg-surface transition-shadow",
                  // el único rosa de la sección: la respuesta que se está leyendo
                  isOpen ? "border-accent/55 shadow-raise" : "border-hairline",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5.5 text-left text-[17px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-dark"
                >
                  {f.q}
                  <ChevronDown
                    className={cn(
                      "size-5 flex-none transition-transform duration-300",
                      isOpen ? "rotate-180 text-accent-dark" : "text-muted",
                    )}
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={cn(
                    "grid transition-all duration-300 ease-brand",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15.5px] leading-[1.65] text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
