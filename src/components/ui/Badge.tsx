import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "teal" | "accent";

const variants: Record<Variant, string> = {
  // pill sobre fondo claro (sectores)
  light: "bg-surface border border-ink/10 text-ink-soft",
  // pill sobre fondo oscuro (tecnologías)
  dark: "bg-white/6 border border-white/12 text-[#e4e5e9] backdrop-blur-[6px]",
  // estado positivo (tabla de calidad)
  teal: "bg-teal/12 text-teal-dark",
  // estado a revisar
  accent: "bg-accent-light/16 text-accent-dark",
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
        "inline-flex items-center rounded-full px-4.5 py-2 text-[14.5px] font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
