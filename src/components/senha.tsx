"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SenhaProps = {
  /** Texto final, ex.: "+2.000.000" ou "1,7 mi". Só os dígitos rolam. */
  value: string;
  className?: string;
  /** Anima ao montar (hero) em vez de ao entrar na viewport. */
  onMount?: boolean;
  /** `false`: não rola do zero ao aparecer; só rola quando `value` muda (painel do hero). */
  intro?: boolean;
  duration?: number;
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * "Pega a senha": cada dígito rola como painel de senha/ticket até o valor final.
 * SSR renderiza o valor final (visível, sem JS). No cliente, zera e rola ao entrar em vista.
 */
export function Senha({ value, className, onMount = false, intro = true, duration = 1.6 }: SenhaProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"ssr" | "zero" | "done">("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el || !intro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setPhase("zero");
    const go = () => requestAnimationFrame(() => requestAnimationFrame(() => setPhase("done")));

    if (onMount) {
      go();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          go();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onMount, intro]);

  const chars = Array.from(value);
  let digitIndex = 0;

  return (
    <span ref={ref} className={cn("senha inline-flex tabular-nums", className)} aria-label={value} role="img">
      {chars.map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} className="inline-block h-[1em] leading-none" aria-hidden>
              {ch}
            </span>
          );
        }
        const target = Number(ch);
        const d = phase === "zero" ? 0 : target;
        const delay = digitIndex++ * 0.06;
        return (
          <span key={i} className="senha-digit" aria-hidden>
            <span
              className="senha-strip"
              data-instant={phase === "zero" ? "" : undefined}
              style={{ "--d": d, "--senha-delay": `${delay}s`, "--senha-duration": `${duration}s` } as CSSProperties}
            >
              {DIGITS.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
