import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  /** Abre em nova aba (padrão para links externos). */
  external?: boolean;
  children: ReactNode;
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold tracking-tight transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:brightness-110",
  outline: "border border-border/20 text-foreground hover:border-accent hover:text-accent",
  ghost: "text-foreground underline-offset-4 hover:text-accent hover:underline",
};

/** Link estilizado como botão. `external` abre em nova aba com rel seguro. */
export function CtaLink({ variant = "primary", external = true, className, children, ...props }: CtaLinkProps) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a className={cn(base, variants[variant], className)} {...ext} {...props}>
      {children}
    </a>
  );
}
