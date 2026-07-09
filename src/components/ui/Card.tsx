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
        "rounded-[20px] border border-ink/9 bg-surface",
        // solo transform/box-shadow en la transición (transicionar colores con
        // alpha se traba en este engine); el color de borde snapea en hover
        hover &&
          "shadow-[0_1px_3px_rgba(43,45,51,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-accent-light/50 hover:shadow-[0_24px_50px_rgba(43,45,51,0.10)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
