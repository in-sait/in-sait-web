import { cn } from "@/lib/cn";

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
          "mb-3.5 text-[13px] font-semibold tracking-[0.15em]",
          tone === "dark" ? "text-accent-light" : "text-accent",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em]",
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
