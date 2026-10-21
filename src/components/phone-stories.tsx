"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HardHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

type Story = { slug: string; src: string | null; alt: string; posicao?: string; fita?: string; overlay?: string };

const DURATION = 3; // segundos por story
const versaoPorSlug = Object.fromEntries(site.versoes.map((v) => [v.slug, v]));

/**
 * Moldura de celular tocando "stories" que contam as versões do Lipe.
 * Avança sozinho (Ken Burns leve), toque na direita avança, na esquerda volta, segurar/hover pausa.
 * Avatar, handle e glow mudam com a versão do story. SSR mostra o 1º story (estático sem JS).
 */
export function PhoneStories({ stories, label, className }: { stories: readonly Story[]; label: string; className?: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const hold = useRef<ReturnType<typeof setTimeout> | null>(null);

  // autoplay + preload das próximas imagens em segundo plano depois do load
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlaying(true);
    const preload = () => stories.slice(1).forEach((s) => { if (s.src) { const img = new window.Image(); img.src = s.src; } });
    if (document.readyState === "complete") preload();
    else window.addEventListener("load", preload, { once: true });
  }, [stories]);

  useEffect(() => {
    if (!playing || paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % stories.length), DURATION * 1000);
    return () => clearTimeout(t);
  }, [i, playing, paused, stories.length]);

  const atual = stories[i];
  const versao = versaoPorSlug[atual.slug];

  function onPointerDown() {
    hold.current = setTimeout(() => setPaused(true), 180);
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (hold.current) clearTimeout(hold.current);
    if (paused) {
      setPaused(false);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const direita = e.clientX - r.left > r.width / 2;
    setI((n) => (direita ? (n + 1) % stories.length : (n - 1 + stories.length) % stories.length));
  }

  return (
    <div className={cn("relative isolate", className)} data-accent={versao.accent}>
      {/* glow na cor do story */}
      <span aria-hidden className="pointer-events-none absolute inset-[-12%] -z-10 rounded-full bg-accent/40 blur-[70px] transition-colors duration-700" />

      <div
        role="group"
        aria-roledescription="stories"
        aria-label={`${label}: ${i + 1} de ${stories.length}, ${versao.nome}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => { if (hold.current) clearTimeout(hold.current); setPaused(false); }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={cn(
          "relative mx-auto aspect-[9/19] h-full max-h-[70vh] cursor-pointer select-none overflow-hidden rounded-[2.6rem] border-[7px] border-ink bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] md:max-h-none",
          paused && "story-paused",
        )}
        style={{ touchAction: "pan-y" }}
      >
        {stories.map((s, n) => (
          <div key={n} className={cn("absolute inset-0 transition-opacity duration-500", n === i ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={n !== i}>
            {s.src ? (
              <Image
                key={`${n}-${n === i ? i : "off"}`}
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 420px, 80vw"
                priority={n === 0}
                loading={n === 0 ? undefined : "lazy"}
                className="story-img object-top-cover"
                style={{ objectPosition: s.posicao, ...(n === i && playing ? { animation: `ken-burns ${DURATION + 0.6}s ease-out forwards` } : {}) }}
              />
            ) : (
              <div data-accent="constroi" className="blueprint absolute inset-0 flex items-center justify-center">
                <HardHat className="size-12 text-ink/70" aria-hidden />
                <span className="fita-obra absolute left-1/2 top-[45%] w-[170%] -translate-x-1/2 -rotate-12 py-2 text-center font-display text-3xl uppercase tracking-[0.3em] text-constroi">
                  <span className="bg-ink px-4 py-1">{s.fita}</span>
                </span>
              </div>
            )}
            {s.overlay && (
              <span className="absolute inset-x-0 bottom-[14%] px-4 text-center font-display text-[3rem] uppercase leading-[0.9] text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] md:text-[3.75rem]">
                {s.overlay}
              </span>
            )}
          </div>
        ))}
        {/* gradiente de leitura no topo */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />

        {/* barras de progresso */}
        <span className="absolute inset-x-3 top-3 flex gap-1">
          {stories.map((s, n) => (
            <span key={n} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/40">
              <span
                key={`${n}-${i}`}
                className={cn("block h-full origin-left bg-white", n < i && "scale-x-100", n > i && "scale-x-0")}
                style={n === i && playing ? ({ animation: `story-fill ${DURATION}s linear forwards` } as CSSProperties) : n === i ? { transform: "scaleX(0.35)" } : undefined}
              />
            </span>
          ))}
        </span>

        {/* avatar + handle: clicar rola até a dobra da versão */}
        <a
          href={`#${versao.slug}`}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          className="absolute left-3 top-6 flex items-center gap-2 text-xs font-semibold text-white drop-shadow transition-colors hover:underline"
        >
          <span className="relative size-7 overflow-hidden rounded-full border-2 border-accent bg-accent transition-colors duration-500">
            <Image src="/fotos/lipe-close.jpg" alt="" fill sizes="28px" className="object-top-cover" />
          </span>
          {versao.handle}
        </a>
        <span aria-hidden className="absolute left-1/2 top-1 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}
