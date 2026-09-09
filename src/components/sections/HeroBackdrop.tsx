"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * El isotipo a escala de fondo.
 *
 * Ocupa media pantalla, sangra por el borde derecho y vive al 14% de opacidad:
 * deja de ser una figura que compite con el titular y pasa a ser el terreno
 * sobre el que está escrito. Los tres arcos se apagan; el núcleo NO. Esa es la
 * regla madre del brief a escala de hero — el gris es el dato, el rosa es la
 * conclusión, y en el logo el rosa es literalmente el núcleo.
 *
 * El núcleo rosa no se redibuja: es un círculo posicionado con las coordenadas
 * exactas del <circle> del SVG original (cx 962.5, cy 1010.8, r 162.36 sobre un
 * viewBox de 1884.5 × 1809.32), así el archivo de marca sigue siendo la única
 * fuente de verdad del dibujo.
 */
const CORE = {
  left: `${(962.5 / 1884.5) * 100}%`,
  top: `${(1010.8 / 1809.32) * 100}%`,
  width: `${((162.36 * 2) / 1884.5) * 100}%`,
};

export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // paralaje: la marca se queda atrás del texto al scrollear
  const y = useTransform(scrollY, [0, 900], [0, -120]);
  const opacity = useTransform(scrollY, [0, 760], [1, 0.3]);

  return (
    <motion.div
      aria-hidden
      style={reduce ? undefined : { y, opacity }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute right-[-42%] top-1/2 aspect-[1884.5/1809.32] w-[min(92vw,104vh,1000px)] -translate-y-1/2 md:right-[-20%]">
        {/* órbitas: lo que gira es la órbita, nunca el núcleo */}
        <div className="animate-spin-slow absolute inset-[-9%] rounded-full border border-dashed border-steel/45" />
        <div className="animate-spin-rev absolute inset-[7%] rounded-full border border-dashed border-steel/30" />

        <Image
          src="/assets/brand/insait-mark.svg"
          alt=""
          width={1885}
          height={1809}
          priority
          unoptimized
          className="absolute inset-0 h-full w-full opacity-[0.07] md:opacity-[0.11]"
        />

        <span
          className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 md:bg-accent/28"
          style={CORE}
        />
        <span
          className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 scale-[1.75] rounded-full border border-accent/10 md:border-accent/20"
          style={CORE}
        />
      </div>
    </motion.div>
  );
}
