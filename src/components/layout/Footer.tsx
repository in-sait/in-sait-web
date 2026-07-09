import Image from "next/image";
import { Mail } from "lucide-react";
import { contact, footerColumns } from "@/lib/content";
import { LinkedinIcon, GithubIcon } from "../icons/BrandIcons";
import { Container } from "../ui/Container";

const socials = [
  { href: "#", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "#", label: "GitHub", Icon: GithubIcon },
  { href: `mailto:${contact.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-[#232429] pb-8 pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-10 border-b border-white/9 pb-11 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" className="mb-4.5 flex items-center gap-2.5 text-white">
              <Image
                src="/assets/brand/insait-mark.svg"
                alt="In-sait"
                width={32}
                height={32}
                className="h-8 w-auto opacity-95 [filter:brightness(0)_invert(1)]"
                unoptimized
              />
              <span className="text-xl font-bold tracking-tight">In-sait</span>
            </a>
            <p className="mb-5 max-w-[300px] text-[14.5px] leading-relaxed text-faint">
              Consultora de datos, analítica e ingeniería de software.
              Convertimos información en decisiones confiables.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-[#c9cbd1] transition-colors hover:bg-accent-light/16 hover:text-accent-light"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[12.5px] font-semibold tracking-[0.1em] text-muted">
                {col.title}
              </p>
              <div className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-[14.5px] text-[#b9bbc2] transition-colors hover:text-accent-light"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="mb-4 text-[12.5px] font-semibold tracking-[0.1em] text-muted">
              RECURSOS
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="#faq"
                className="text-[14.5px] text-[#b9bbc2] transition-colors hover:text-accent-light"
              >
                Preguntas frecuentes
              </a>
              <a
                href="#contacto"
                className="text-[14.5px] text-[#b9bbc2] transition-colors hover:text-accent-light"
              >
                Contacto
              </a>
              <span className="text-[14.5px] text-muted">Blog · próximamente</span>
              <span className="text-[14.5px] text-muted">Casos · próximamente</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 pt-6.5">
          <p className="text-[13px] text-muted">
            © 2026 In-sait · Digital Design System v3.0
          </p>
          <p className="text-[13px] tracking-[0.04em] text-muted">
            Data Insights, Always On.
          </p>
        </div>
      </Container>
    </footer>
  );
}
