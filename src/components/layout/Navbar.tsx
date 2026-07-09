"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-[14px] transition-[box-shadow] duration-300",
        scrolled
          ? "border-[#2b2d3314] bg-[#ffffffd1] shadow-[0_8px_30px_rgba(43,45,51,0.06)]"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex items-center justify-between gap-6 py-4">
        <a href="#top" className="flex items-center gap-2.5 text-ink">
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
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="#contacto" size="sm">
            Agendar reunión
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="inline-flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-ink/5 lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {open && (
        <div className="flex flex-col gap-1 border-t border-ink/6 bg-white/97 px-6 pb-5 pt-2 lg:hidden">
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
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="bg-brand-gradient mt-2.5 rounded-xl px-4 py-3.5 text-center font-semibold text-white"
          >
            Agendar reunión
          </a>
        </div>
      )}
    </nav>
  );
}
