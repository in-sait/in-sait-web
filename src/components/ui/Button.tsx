import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 ease-brand active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-base",
  sm: "px-4.5 py-2.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  // rosa plano. El glow rosado que había debajo (0 12px 30px rgba(219,110,156,.34))
  // era el efecto más "app de consumo" del sitio; la sombra ahora es neutra.
  primary:
    "bg-accent text-white shadow-raise hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-card",
  secondary:
    "bg-surface text-ink border border-ink/15 hover:-translate-y-0.5 hover:border-ink/35",
};

/**
 * Receta de estilos del botón. Se exporta para que cualquier disparador que no
 * sea `<a>` —el `ScheduleButton`, que es un `<button>` que abre el modal— use
 * exactamente estas clases en vez de duplicarlas. Antes estaban copiadas a mano
 * y la copia se había quedado sin el `focus-visible`, o sea que el CTA principal
 * del sitio no tenía foco visible con teclado.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, sizes[size], variants[variant], className);
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={buttonStyles({ variant, size, className })}>
      {children}
      {withArrow && (
        <ArrowRight
          className="size-[17px] transition-transform duration-300 ease-brand group-hover:translate-x-0.5"
          strokeWidth={2.2}
        />
      )}
    </a>
  );
}
