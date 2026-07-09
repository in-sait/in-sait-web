import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-base",
  sm: "px-4.5 py-2.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-[0_12px_30px_rgba(219,110,156,0.34)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(219,110,156,0.44)]",
  secondary:
    "bg-surface text-ink border border-ink/15 hover:-translate-y-0.5 hover:border-ink/35",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={cn(base, sizes[size], variants[variant], className)}>
      {children}
      {withArrow && <ArrowRight className="size-[17px]" strokeWidth={2.2} />}
    </a>
  );
}
