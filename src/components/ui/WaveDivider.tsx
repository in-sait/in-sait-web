/**
 * Transición curva entre una sección clara y una oscura.
 *
 * El trazado es la ola de julio de 2026 (el `WAVE.top` del WaveDivider
 * original, que separaba FAQ de Contacto), tal cual: una S asimétrica que se
 * hunde en el tercio izquierdo y se levanta en el derecho. Se eligió por
 * decisión de Rodrigo (15/09/2026) después de probar dos alternativas:
 *
 *   - radio en las esquinas superiores de los bloques oscuros (propuesta de
 *     marca): "duro y sin personalidad".
 *   - un arco derivado del borde exterior del aspa del isotipo, ver
 *     Documentos/Transiciones curvas: geométricamente impecable, pero a esta
 *     escala el aspa es casi un círculo y la curva salía simétrica. No se
 *     sentía In-sait. El trazado queda documentado ahí por si sirve al manual:
 *     M0,0 C471.4,96.4 950.7,106 1440,0 Z
 *
 * No deriva del isotipo. Marca aclaró que la regla de derivación gobierna el
 * ornamento (lo que se dibuja sobre la página), no la estructura; las
 * transiciones se rigen por las seis reglas que adoptaron del pedido, y esta
 * ola las cumple:
 *   contraste real   → sólo en las dos entradas a bloque oscuro (stack, Contacto)
 *   cantidad         → dos, "una o dos como máximo"
 *   color            → relleno del blanco exacto de la sección que termina
 *   sin rosa         → nunca
 *   curva ≠ hairline → en esos dos bordes no hay línea
 *   escala           → 44–80px de alto, como en julio; no un cerro
 *
 * Se posiciona en el borde SUPERIOR de la sección oscura y se rellena con el
 * color de la sección clara que termina: la clara "apoya" sobre la oscura.
 * preserveAspectRatio="none": el alto lo fija el clamp; a 1440 es 1:1 con el
 * viewBox, en pantallas más anchas la S se estira y queda más suave.
 */
export function WaveDivider({ fill = "var(--color-surface-soft)" }: { fill?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-px z-[1] h-[clamp(44px,5.5vw,80px)] leading-[0]"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <path d="M0,0 L1440,0 L1440,44 C1030,6 470,86 0,38 Z" fill={fill} />
      </svg>
    </div>
  );
}
