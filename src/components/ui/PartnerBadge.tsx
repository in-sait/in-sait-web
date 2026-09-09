import { cn } from "@/lib/cn";

/**
 * Badge de alianza con Zulpik.
 * Markup provisto por Zulpik; los estilos viven en el bloque .zk-badge de
 * globals.css. Se mantiene verbatim (mismas clases, mismo orden) para poder
 * actualizarlo si mandan otra versión.
 */
export function PartnerBadge({
  variant = "light",
  className,
}: {
  /** "dark" usa la versión de la guía de marca de Zulpik para fondos oscuros. */
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <a
      className={cn("zk-badge", variant === "dark" && "zk-badge--dark", className)}
      href="https://zulpik.com"
      target="_blank"
      rel="noopener"
    >
      <span className="zk-badge__kicker">EN ALIANZA CON</span>
      <span className="zk-badge__rule" aria-hidden />
      <span className="zk-badge__lockup">
        <span className="zk-badge__mark" aria-hidden>
          <i />
          <i />
        </span>
        <span className="zk-badge__word">zulpik</span>
      </span>
    </a>
  );
}
