"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * As fotos do mural "caem" uma a uma ao entrar na tela, SEM esconder nada no SSR
 * (mesma regra do Reveal): só depois da hidratação, e só se o mural ainda estiver abaixo
 * da viewport, os itens ficam ocultos. Com JS desligado ou reduced-motion, ficam visíveis.
 */
export function MuralQueda({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<"ssr" | "armado" | "caiu">("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return; // já visível: não anima

    setEstado("armado");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEstado("caiu");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-mural={estado} className={cn(className)}>
      {children}
    </div>
  );
}
