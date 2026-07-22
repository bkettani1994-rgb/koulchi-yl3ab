import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_STYLES: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-primary to-primary-light text-white shadow-[0_8px_30px_-8px_rgba(0,111,205,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(0,168,255,0.75)] hover:brightness-110",
  secondary:
    "glass text-white hover:border-primary-light/60 hover:bg-white/[0.08]",
  ghost: "text-foreground-muted hover:text-white",
};

const SIZE_STYLES: Record<NonNullable<BaseProps["size"]>, string> = {
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex cursor-pointer select-none items-center justify-center rounded-full font-medium tracking-tight transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-primary-light",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="size-[1.1em]" aria-hidden />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="size-[1.1em]" aria-hidden />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
