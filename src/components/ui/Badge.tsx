import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "teal" | "accent";

const variants: Record<Variant, string> = {
  // pill sobre fondo claro (sectores)
  light: "bg-surface border border-hairline text-ink-soft",
  // pill sobre fondo oscuro (tecnologías)
  dark: "bg-white/6 border border-white/12 text-[#e4e5e9]",
  // estado positivo (tabla de calidad). El texto va en tinta, no en teal: el
  // teal sobre blanco da 2.39:1 y el teal oscuro 4.00:1 — ninguno llega a AA.
  // El color vive en el fondo y el borde, que no tienen que ser legibles.
  teal: "bg-teal/12 border border-teal/35 text-ink",
  // estado a revisar
  accent: "bg-accent-light/16 border border-accent/35 text-accent-dark",
};

export function Badge({
  variant = "light",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4.5 py-2 text-[14.5px] font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
