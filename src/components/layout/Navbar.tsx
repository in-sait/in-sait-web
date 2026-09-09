"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "../ui/Container";
import { ScheduleButton } from "../sections/ScheduleModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Sección activa. IntersectionObserver en vez de un listener de scroll: el
     listener recalcula posiciones en cada frame y en mobile se nota. */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-[14px] transition-[box-shadow,background-color] duration-500 ease-brand",
        scrolled
          ? "border-hairline bg-surface/85 shadow-raise"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex items-center justify-between gap-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-4"
        >
          <Image
            src="/assets/brand/insait-mark.svg"
            alt="In-sait"
            width={32}
            height={32}
            className="h-8 w-auto"
            priority
            unoptimized
          />
          <span className="text-xl font-bold tracking-tight">In-sait</span>
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.label}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-sm py-1 text-[15px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-4",
                  isActive ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {l.label}
                {/* subrayado que se desliza de un ítem al otro */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-ink"
                    transition={{ duration: 0.4, ease: [0.16, 0.84, 0.44, 1] }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <ScheduleButton size="sm">Agendar reunión</ScheduleButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="inline-flex size-11 items-center justify-center rounded-control text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {open && (
        <div className="flex flex-col gap-1 border-t border-hairline bg-surface/97 px-6 pb-5 pt-2 lg:hidden">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/5 px-2 py-3 font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2.5" onClick={() => setOpen(false)}>
            <ScheduleButton className="w-full">Agendar reunión</ScheduleButton>
          </div>
        </div>
      )}

      {/* Riel de progreso: es la única lectura de dato que hay en el chrome del
          sitio — te dice dónde estás dentro de la página, y de paso avisa que
          hay página por delante. */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accent"
      />
    </nav>
  );
}
