"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Story = { src: string; alt: string };

const DURATION = 4; // segundos por story

/**
 * Moldura de celular tocando "stories": avança sozinho e no toque.
 * SSR mostra o primeiro story (sem JS fica estático).
 */
export function PhoneStories({ stories, label, handle }: { stories: readonly Story[]; label: string; handle: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlaying(true);
    const t = setInterval(() => setI((n) => (n + 1) % stories.length), DURATION * 1000);
    return () => clearInterval(t);
  }, [stories.length]);

  return (
    <button
      type="button"
      aria-label={`${label}: ${i + 1} de ${stories.length}`}
      onClick={() => setI((n) => (n + 1) % stories.length)}
      className="relative aspect-[9/19] w-[min(68vw,280px)] overflow-hidden rounded-[2.4rem] border-[6px] border-ink bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/40"
    >
      {stories.map((s, n) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="280px"
          loading={n === 0 ? undefined : "lazy"}
          className={cn("object-top-cover transition-opacity duration-500", n === i ? "opacity-100" : "opacity-0")}
        />
      ))}
      {/* barras de progresso */}
      <span className="absolute inset-x-3 top-3 flex gap-1">
        {stories.map((s, n) => (
          <span key={s.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/40">
            <span
              key={`${n}-${i}`}
              className={cn("block h-full origin-left bg-white", n < i && "scale-x-100", n > i && "scale-x-0")}
              style={
                n === i && playing
                  ? ({ animation: `story-fill ${DURATION}s linear forwards` } as CSSProperties)
                  : n === i
                    ? { transform: "scaleX(0.35)" }
                    : undefined
              }
            />
          </span>
        ))}
      </span>
      <span className="absolute left-3 top-6 flex items-center gap-2 text-xs font-semibold text-white drop-shadow">
        <span className="size-6 rounded-full border-2 border-white bg-accent" aria-hidden />
        {handle}
      </span>
      {/* entalhe */}
      <span aria-hidden className="absolute left-1/2 top-1 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
    </button>
  );
}
