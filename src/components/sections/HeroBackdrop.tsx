"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * El isotipo a escala de fondo.
 *
 * Ocupa media pantalla, sangra por el borde derecho y vive a baja opacidad:
 * deja de ser una figura que compite con el titular y pasa a ser el terreno
 * sobre el que está escrito. Los tres arcos se apagan; el núcleo NO. Esa es la
 * regla madre del brief a escala de hero — el gris es el dato, el rosa es la
 * conclusión, y en el logo el rosa es literalmente el núcleo.
 *
 * El núcleo rosa no se redibuja: es un círculo posicionado con las coordenadas
 * exactas del <circle> del SVG original (cx 962.5, cy 1010.8, r 162.36 sobre un
 * viewBox de 1884.5 × 1809.32), así el archivo de marca sigue siendo la única
 * fuente de verdad del dibujo.
 *
 * ── Las tres perillas, para ajustar a ojo ──────────────────────────────────
 *   arcos:  md:opacity-[0.5] — valor cerrado por Rodrigo.
 *           En mobile queda en 0.1 y NO es un olvido: ahí la marca pasa por
 *           detrás del titular y del párrafo. Con los arcos al 50%, el gris
 *           del párrafo (#6b6e78) sobre el arco da 2.26:1 de contraste y no
 *           se lee. A 0.1 da 4.6:1 y cumple AA. Para subirlo en mobile hay
 *           que sacar la marca de atrás del texto, no subir la opacidad.
 *   núcleo: bg-accent/18   / md:bg-accent/45
 *   anillo: border-accent/12 / md:border-accent/30
 *   velocidad de giro: .animate-spin-slow en globals.css (hoy 60s)
 * ──────────────────────────────────────────────────────────────────────────
 */
const CORE_X = (962.5 / 1884.5) * 100;
const CORE_Y = (1010.8 / 1809.32) * 100;

const CORE = {
  left: `${CORE_X}%`,
  top: `${CORE_Y}%`,
  width: `${((162.36 * 2) / 1884.5) * 100}%`,
};

export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // paralaje: la marca se queda atrás del texto al scrollear
  const y = useTransform(scrollY, [0, 900], [0, -120]);
  // Sólo se desvanecen los arcos y las órbitas. El núcleo queda afuera de este
  // bloque: es lo único que no se apaga, en el logo y en la regla de color.
  const arcsFade = useTransform(scrollY, [0, 760], [1, 0.3]);

  return (
    <motion.div
      aria-hidden
      style={reduce ? undefined : { y }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute right-[-42%] top-1/2 aspect-[1884.5/1809.32] w-[min(92vw,104vh,1000px)] -translate-y-1/2 md:right-[-20%]">
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { opacity: arcsFade }}
        >
          <div className="animate-spin-slow absolute inset-[-9%] rounded-full border border-dashed border-steel/45" />
          <div className="animate-spin-rev absolute inset-[7%] rounded-full border border-dashed border-steel/30" />

          {/* El isotipo gira SOBRE SU NÚCLEO, no sobre el centro de la caja.
              Rotando sobre el centro geométrico, el núcleo del propio SVG haría
              una órbita chica y se despegaría del círculo rosa de acá abajo.
              Con el origen puesto en el núcleo, los arcos barren alrededor y el
              núcleo queda clavado — que además es la idea que el brief pide
              conservar: el núcleo es lo único quieto entre tres cosas girando. */}
          <Image
            src="/assets/brand/insait-mark.svg"
            alt=""
            width={1885}
            height={1809}
            priority
            unoptimized
            style={{ transformOrigin: `${CORE_X}% ${CORE_Y}%` }}
            className="animate-spin-slow absolute inset-0 h-full w-full opacity-[0.1] md:opacity-[0.5]"
          />
        </motion.div>

        <span
          className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/18 md:bg-accent/45"
          style={CORE}
        />
        <span
          className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 scale-[1.75] rounded-full border border-accent/12 md:border-accent/30"
          style={CORE}
        />
      </div>
    </motion.div>
  );
}
