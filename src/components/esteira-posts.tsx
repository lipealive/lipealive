"use client";

import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useVelocity } from "motion/react";
import { cn } from "@/lib/utils";

/** Deslocamento extra por px/s de scroll da página. */
const FATOR = 0.35;

type EsteiraProps = {
  eixo: "x" | "y";
  /** `false`: sobe (y) / vai para a esquerda (x). `true`: desce / vai para a direita. */
  reverso?: boolean;
  /** Segundos por volta no ritmo base. */
  duracao?: number;
  className?: string;
  /** As cópias da lista (3), iguais e em sequência; a 1ª é a real, as outras aria-hidden. */
  children: ReactNode;
};

/**
 * Esteira infinita de posts. O loop base é CSS puro (trilho com 3 cópias + translate de 1/3);
 * por cima, um deslocamento extra (só transform) acelera conforme a velocidade do scroll e volta
 * suave ao ritmo base (useVelocity + useSpring). Pausa no hover (ponteiro fino) e fora da tela.
 * Com reduced-motion fica parada, mostrando as fotos.
 */
export function EsteiraPosts({ eixo, reverso = false, duracao = 40, className, children }: EsteiraProps) {
  const raiz = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const copia = useRef(0); // tamanho de uma cópia (px)
  const acumulado = useRef(0);
  const ultimo = useRef<number | null>(null);
  const emHover = useRef(false);
  const visivel = useRef(false);
  const reduzido = useRef(true);
  const [parado, setParado] = useState(false);
  const copias = Children.count(children);

  const extra = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocidade = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });

  useEffect(() => {
    const r = raiz.current;
    const t = trilho.current;
    if (!r || !t) return;
    reduzido.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const medir = () => {
      copia.current = (eixo === "y" ? t.scrollHeight : t.scrollWidth) / copias;
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(t);
    const io = new IntersectionObserver(([e]) => {
      visivel.current = e.isIntersecting;
      setParado(!e.isIntersecting);
    });
    io.observe(r);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [eixo, copias]);

  useAnimationFrame((_, delta) => {
    const tam = copia.current;
    if (reduzido.current || !tam || !visivel.current) return;
    if (!emHover.current) acumulado.current += Math.abs(velocidade.get()) * FATOR * (delta / 1000);
    // o CSS anda entre 0 e -1 cópia; o extra fica em [-1 cópia, 0], então o total nunca passa de -2 cópias
    const m = acumulado.current % tam;
    const valor = reverso ? m - tam : -m;
    if (valor !== ultimo.current) {
      ultimo.current = valor;
      extra.set(valor);
    }
  });

  return (
    <div
      ref={raiz}
      data-parado={parado ? "" : undefined}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") emHover.current = true;
      }}
      onPointerLeave={() => {
        emHover.current = false;
      }}
      className={cn("esteira overflow-hidden", eixo === "y" ? "esteira-mask-y" : "esteira-mask-x", className)}
    >
      <motion.div style={eixo === "y" ? { y: extra } : { x: extra }} className={eixo === "x" ? "w-max" : undefined}>
        <div
          ref={trilho}
          data-reverso={reverso ? "" : undefined}
          className={cn("esteira-trilho flex", eixo === "y" ? "esteira-y flex-col" : "esteira-x w-max")}
          style={{ "--esteira-dur": `${duracao}s` } as CSSProperties}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
