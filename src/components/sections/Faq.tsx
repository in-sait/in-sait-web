"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { cn } from "@/lib/cn";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-surface-soft py-[clamp(84px,10vw,128px)]">
      <Container className="max-w-[820px]">
        <div className="mb-12 text-center">
          <p className="mb-3.5 text-[13px] font-semibold tracking-[0.15em] text-accent">
            PREGUNTAS FRECUENTES
          </p>
          <h2 className="text-[clamp(30px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
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
                  "overflow-hidden rounded-2xl border bg-surface",
                  isOpen ? "border-accent-light/45" : "border-ink/9",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5.5 text-left text-[17px] font-semibold text-ink"
                >
                  {f.q}
                  <ChevronDown
                    className={cn(
                      "size-5 flex-none text-accent transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-[cubic-bezier(0.16,0.84,0.44,1)]",
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
