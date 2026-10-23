"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { site } from "@/content/site";

/** Segmentos da barra: YouTube + as 4 versões. */
const SEGMENTOS = [
  { slug: site.youtube.slug, nome: site.youtube.titulo, atalho: site.youtube.atalho, accent: "youtube" },
  ...site.versoes.map((v) => ({ slug: v.slug, nome: v.nome, atalho: v.atalho, accent: v.accent as string })),
];
const SLUGS = SEGMENTOS.map((s) => s.slug);
/** Todas as dobras com id, na ordem, e a cor que o header assume sobre cada uma. */
const DOBRAS: { id: string; accent: string }[] = [
  { id: "top", accent: "ink" },
  ...SEGMENTOS.map((s) => ({ id: s.slug, accent: s.accent })),
  { id: "produtos", accent: "ink" },
  { id: "publicidade", accent: "paper" },
];
const HEADER_H = 48;

/**
 * Header fixo estilo Stories do Instagram: nome + um segmento por dobra (YouTube e versões), que enche
 * conforme a rolagem dentro da dobra. Clicar pula para a versão.
 * O fundo assume a cor da dobra atual (85% + blur), com transição.
 */
export function StoriesProgress() {
  const { scrollY } = useScroll();
  const [progress, setProgress] = useState<number[]>(() => SLUGS.map(() => 0));
  const [accent, setAccent] = useState("ink");

  function measure(y: number) {
    const vh = window.innerHeight;
    setProgress(
      SLUGS.map((slug) => {
        const el = document.getElementById(slug);
        if (!el) return 0;
        return Math.min(1, Math.max(0, (y + vh * 0.5 - el.offsetTop) / el.offsetHeight));
      }),
    );
    // dobra que está sob o header (último topo acima da linha do header)
    const linha = y + HEADER_H;
    let atual = DOBRAS[0].accent;
    for (const d of DOBRAS) {
      const el = document.getElementById(d.id);
      if (el && el.offsetTop <= linha) atual = d.accent;
    }
    setAccent(atual);
  }

  useMotionValueEvent(scrollY, "change", measure);
  useEffect(() => {
    measure(window.scrollY);
    const onResize = () => measure(window.scrollY);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      aria-label={site.ui.progressoLabel}
      data-accent={accent}
      className="fixed inset-x-0 top-0 z-50 bg-accent/85 pt-safe text-accent-foreground backdrop-blur-xl transition-colors duration-500"
    >
      <div className="mx-auto flex h-12 w-full max-w-page items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <a href="#top" className="mr-1 shrink-0 font-display text-lg uppercase leading-none sm:mr-2">
          {site.name}
        </a>
        {SEGMENTOS.map((v, i) => (
          <a
            key={v.slug}
            href={`#${v.slug}`}
            aria-label={`${site.ui.irPara} ${v.nome}`}
            aria-current={progress[i] > 0 && progress[i] < 1 ? "true" : undefined}
            className="group flex min-h-9 flex-1 flex-col justify-center gap-1"
          >
            <span className="relative block h-[3px] overflow-hidden rounded-full bg-accent-foreground/30">
              <span className="absolute inset-y-0 left-0 rounded-full bg-accent-foreground" style={{ width: `${progress[i] * 100}%` }} />
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:block">{v.atalho}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
