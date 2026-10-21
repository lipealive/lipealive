"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

const HEADER_H = 56;
const SLUGS = site.versoes.map((v) => v.slug);

/**
 * Header fixo: nome à esquerda e atalhos das versões à direita.
 * Ganha fundo ao rolar; o atalho da dobra visível fica destacado com a cor da versão.
 */
export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SLUGS);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-safe transition-[background-color,border-color] duration-300",
        scrolled ? "border-b border-border/10 bg-background/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-page items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="font-display text-2xl uppercase leading-none tracking-wide text-foreground">
          {site.name}
        </a>
        <nav aria-label={site.nav.label} className="-mr-4 flex gap-1 overflow-x-auto pr-4 no-scrollbar sm:mr-0 sm:pr-0">
          {site.versoes.map((v) => (
            <a
              key={v.slug}
              href={`#${v.slug}`}
              data-accent={v.accent}
              aria-current={active === v.slug ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                active === v.slug ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {site.nav.atalhos[v.slug]}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Slug da seção que ocupa a faixa logo abaixo do header. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: `-${HEADER_H}px 0px -70% 0px`, threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
