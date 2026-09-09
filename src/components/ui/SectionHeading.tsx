import { cn } from "@/lib/cn";

/**
 * El eyebrow va en GRIS, no en rosa.
 * Regla madre del brief: "el gris es el dato, el rosa es la conclusión". Una
 * etiqueta de sección es metadato, no conclusión. Además el rosa #db6e9c sobre
 * blanco da 3.12:1 de contraste y no llega a AA en 13px.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p
        className={cn(
          "mb-3.5 text-[12.5px] font-semibold tracking-[0.16em]",
          tone === "dark" ? "text-faint" : "text-muted",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-[clamp(30px,4vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em] text-balance",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-[17px] leading-relaxed",
            tone === "dark" ? "text-faint" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
