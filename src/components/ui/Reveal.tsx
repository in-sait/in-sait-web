"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Fade + slide-up al entrar en viewport (una vez). Replica data-reveal del mockup. */
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
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 0.84, 0.44, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
