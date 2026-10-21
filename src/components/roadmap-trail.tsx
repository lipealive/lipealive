"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

type Marco = { n: string; titulo: string; texto: string; icone: string };

/**
 * Trilha do Roadmap: linha que se desenha conforme o scroll, passando pelos 4 marcos.
 * SSR renderiza a linha inteira (sem dash); o dash só entra depois da hidratação.
 */
export function RoadmapTrail({ marcos }: { marcos: readonly Marco[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (path.current && ready) path.current.style.strokeDashoffset = String(1 - v);
  });

  return (
    <ol ref={ref} className="relative grid gap-10 md:grid-cols-4 md:gap-6">
      {/* linha: vertical no mobile, horizontal no desktop */}
      <svg aria-hidden className="pointer-events-none absolute left-8 top-0 h-full w-px md:hidden" viewBox="0 0 2 100" preserveAspectRatio="none">
        <path d="M1 0 V100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <path ref={path} d="M1 0 V100" stroke="white" strokeWidth="2" pathLength={1} style={ready ? { strokeDasharray: 1, strokeDashoffset: 1 } : undefined} />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute left-0 top-8 hidden h-px w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none">
        <path d="M0 1 H100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <path d="M0 1 H100" stroke="white" strokeWidth="2" pathLength={1} className="md:[stroke-dasharray:1]" style={ready ? { strokeDashoffset: "inherit" } : undefined} data-trail />
      </svg>

      {marcos.map((m, i) => (
        <li key={m.n} className="relative flex gap-5 md:flex-col md:gap-4">
          <span className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-4 ring-ensina">
            <Image src={m.icone} alt="" width={64} height={64} unoptimized className="size-16" />
          </span>
          <div className="pt-1">
            <p className="font-mono text-xs font-bold tracking-[0.2em] opacity-70">{m.n}</p>
            <h4 className="mt-1 font-ensina text-2xl font-bold leading-tight">{m.titulo}</h4>
            <p className="mt-1 text-sm leading-relaxed opacity-85">{m.texto}</p>
          </div>
          {i < marcos.length - 1 && <span className="sr-only">→</span>}
        </li>
      ))}
    </ol>
  );
}
