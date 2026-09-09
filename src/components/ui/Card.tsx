import { cn } from "@/lib/cn";

export function Card({
  hover = false,
  className,
  children,
}: {
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-hairline bg-surface",
        // solo transform/box-shadow en la transición (transicionar colores con
        // alpha se traba en este engine); el color de borde snapea en hover
        hover &&
          "shadow-raise transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
