import { cn } from "@/lib/cn";

/**
 * Separador "wave" entre secciones. La sección lo posiciona en su borde
 * inferior (o superior) y le pasa el color de la sección siguiente, de modo
 * que la curva "recorta" hacia la próxima superficie. Paths tomados del mockup.
 */
export function WaveDivider({
  d,
  fill,
  position = "bottom",
  className,
}: {
  d: string;
  fill: string;
  position?: "bottom" | "top";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 right-0 z-[4] h-[clamp(44px,5vw,82px)] leading-[0]",
        position === "bottom" ? "-bottom-px" : "-top-px",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}

/** Paths reutilizables del mockup. */
export const WAVE = {
  // curva cóncava (borde inferior)
  a: "M0,80 L1440,80 L1440,34 C1030,82 470,2 0,40 Z",
  // curva convexa (borde inferior, alterna con `a`)
  b: "M0,80 L1440,80 L1440,40 C1030,2 470,82 0,34 Z",
  // borde superior (sección de contacto)
  top: "M0,0 L1440,0 L1440,44 C1030,6 470,86 0,38 Z",
} as const;
