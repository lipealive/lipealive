import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  itens: readonly string[];
  className?: string;
  /** Inclinação em graus. */
  tilt?: number;
  reverse?: boolean;
  duration?: number;
  separator?: string;
};

/** Faixa marquee inclinada entre as dobras. Só CSS (roda sem JS). */
export function Marquee({ itens, className, tilt = -2, reverse = false, duration = 30, separator = "•" }: MarqueeProps) {
  const row = (
    <>
      {itens.map((t, i) => (
        <span key={i} className="flex shrink-0 items-center gap-6 px-3">
          <span>{t}</span>
          <span aria-hidden className="opacity-60">{separator}</span>
        </span>
      ))}
    </>
  );
  return (
    <div
      aria-hidden
      className={cn("relative z-10 -mx-[6vw] -my-6 w-[112vw] overflow-hidden py-3 font-display text-2xl uppercase tracking-wide sm:text-3xl", className)}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div
        className="marquee-track flex w-max whitespace-nowrap"
        data-reverse={reverse ? "" : undefined}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
