"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade + slide-up al entrar en viewport (una vez).
 * El recorrido es más largo y más lento que antes (34px / 0.85s contra 26px /
 * 0.7s) para que el elemento tenga peso al llegar, y dispara antes —con el 15%
 * visible y sin margen negativo— para que scrolleando rápido no se vea una
 * sección en blanco.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** delay en ms (como data-reveal-delay) */
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.85,
        ease: [0.16, 0.84, 0.44, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
