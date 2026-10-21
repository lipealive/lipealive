"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

const SLUGS = site.versoes.map((v) => v.slug);

/**
 * Barra fixa estilo Stories do Instagram: um segmento por versão, que enche
 * conforme a rolagem dentro da dobra. Clicar pula para a versão.
 */
export function StoriesProgress() {
  const { scrollY } = useScroll();
  const [progress, setProgress] = useState<number[]>(() => SLUGS.map(() => 0));
  const [visible, setVisible] = useState(false);

  function measure(y: number) {
    const vh = window.innerHeight;
    const next = SLUGS.map((slug) => {
      const el = document.getElementById(slug);
      if (!el) return 0;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      // 0 quando o topo da dobra chega ao meio da tela; 1 quando o fim passa do meio
      return Math.min(1, Math.max(0, (y + vh * 0.5 - top) / h));
    });
    setProgress(next);
    setVisible(y > vh * 0.5);
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
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-safe transition-[opacity,transform] duration-300",
        visible ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <div className="mx-auto flex w-full max-w-page items-center gap-2 px-3 pb-2 pt-2 sm:px-6">
        <a href="#top" className="mr-1 hidden font-display text-lg uppercase leading-none text-white mix-blend-difference sm:block">
          {site.name}
        </a>
        {site.versoes.map((v, i) => (
          <a
            key={v.slug}
            href={`#${v.slug}`}
            data-accent={v.accent}
            aria-label={`${site.ui.irPara} ${v.nome}`}
            aria-current={progress[i] > 0 && progress[i] < 1 ? "true" : undefined}
            className="group flex min-h-9 flex-1 flex-col justify-center gap-1"
          >
            <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/35 mix-blend-difference">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{ width: `${progress[i] * 100}%` }}
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white mix-blend-difference">{v.atalho}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
