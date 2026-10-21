"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Deslocamento inicial em px. */
  y?: number;
  /** Atraso em segundos. */
  delay?: number;
  as?: "div" | "li" | "section";
  style?: CSSProperties;
};

/**
 * Entrada ao rolar SEM esconder nada no SSR.
 * Só depois da hidratação, e só se o elemento ainda estiver abaixo da viewport,
 * ele fica oculto e anima quando entra. Com JS desligado ou reduced-motion, fica visível.
 */
export function Reveal({ children, className, y = 24, delay = 0, as: Tag = "div", style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"ssr" | "hidden" | "shown">("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // já visível: não anima

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={state}
      className={cn(className)}
      style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
