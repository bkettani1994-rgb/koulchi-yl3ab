import { cn } from "@/lib/utils";
import { AnimateIn } from "./AnimateIn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <AnimateIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            {eyebrow}
          </span>
        </AnimateIn>
      )}
      <AnimateIn delay={0.08}>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </AnimateIn>
      {description && (
        <AnimateIn delay={0.16}>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-foreground-muted sm:text-lg">
            {description}
          </p>
        </AnimateIn>
      )}
    </div>
  );
}
