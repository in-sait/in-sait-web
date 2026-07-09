"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Formato es-AR: miles con ".", decimales con ",". */
function fmt(
  n: number,
  decimals: number,
  prefix: string,
  suffix: string,
): string {
  const parts = n.toFixed(decimals).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return prefix + parts.join(",") + suffix;
}

/** Contador animado 0 → value al entrar en viewport (easeOutCubic, 1.5s). */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    fmt(0, decimals, prefix, suffix),
  );

  useEffect(() => {
    // reduced-motion → sin animación: se muestra el valor final directo en el render
    if (!inView || reduce) return;
    const dur = 1500;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setDisplay(fmt(value * ease(p), decimals, prefix, suffix));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {reduce ? fmt(value, decimals, prefix, suffix) : display}
    </span>
  );
}
