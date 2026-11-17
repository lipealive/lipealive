"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Pause, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** O que o player toca: um episódio (com ID) ou o show inteiro. */
export type Alvo = { tipo: "episode" | "show"; id: string; titulo: string };

const Ctx = createContext<{ atual: Alvo | null; abrir: (a: Alvo | null) => void } | null>(null);

/** Estado do player da dobra Spotify (só contexto, não gera DOM). */
export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
  const [atual, setAtual] = useState<Alvo | null>(null);
  return <Ctx.Provider value={{ atual, abrir: setAtual }}>{children}</Ctx.Provider>;
}

function usePlayer() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlayer fora do SpotifyPlayerProvider");
  return c;
}

/** Embed oficial (152px) dentro do card dos episódios. Só existe depois do clique: nada de iframe antes. */
export function PlayerEmbed() {
  const { atual, abrir } = usePlayer();
  const { spotify } = site;
  if (!atual) return null;
  return (
    <div className="relative mb-3">
      <iframe
        key={`${atual.tipo}-${atual.id}`}
        src={`https://open.spotify.com/embed/${atual.tipo}/${atual.id}?utm_source=generator`}
        title={`${spotify.playerTitulo}: ${atual.titulo}`}
        height={152}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block h-[152px] w-full rounded-xl border-0"
      />
      <button
        type="button"
        onClick={() => abrir(null)}
        aria-label={spotify.fechar}
        className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-white text-ink shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotify"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}

/** Link que abre o player (sem JS: abre no Spotify). */
export function BotaoOuvir({ alvo, href, className, children }: { alvo: Alvo; href: string; className?: string; children: ReactNode }) {
  const { abrir } = usePlayer();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        abrir(alvo);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

export type Faixa = { chave: string; numero: string; titulo: string; meta: string; href: string; alvo: Alvo };

/** Lista compacta estilo Spotify: hover destaca a linha e o número vira play; clique toca no player do card. */
export function Tracklist({ faixas }: { faixas: readonly Faixa[] }) {
  const { atual, abrir } = usePlayer();
  const { spotify } = site;

  return (
    <ol>
      {faixas.map((f) => {
        const tocando = atual?.tipo === f.alvo.tipo && atual.id === f.alvo.id && atual.titulo === f.alvo.titulo;
        return (
          <li key={f.chave}>
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                abrir(f.alvo);
              }}
              aria-label={`${spotify.tocar}: ${f.titulo}`}
              className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none sm:px-3"
            >
              <span className="relative flex h-6 items-center justify-center font-mono text-sm tabular-nums text-white/60">
                <span className={cn("transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0", tocando && "text-spotify")}>{f.numero}</span>
                <Play className="absolute size-4 fill-current text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className={cn("line-clamp-2 text-sm font-semibold leading-snug sm:line-clamp-1 sm:text-base", tocando ? "text-spotify" : "text-white")}>{f.titulo}</span>
                <span className="block text-xs text-white/60">{f.meta}</span>
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-spotify text-ink transition-transform group-hover:scale-105">
                {tocando ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="ml-0.5 size-4 fill-current" aria-hidden />}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

const EQ = [
  { d: "0.8s", a: "0s" },
  { d: "1.1s", a: "-0.4s" },
  { d: "0.95s", a: "-0.2s" },
];

/**
 * Capa do podcast como capa de disco, com um vinil girando atrás que sai para a direita.
 * SSR: disco já para fora (visível). Depois da hidratação, se a capa estiver fora da tela, o disco
 * fica guardado e desliza para fora quando ela entra. Com o player aberto o disco acelera (~2 s/volta)
 * e aparece um mini equalizador na capa. Reduced-motion: disco parado. Tamanhos em `--capa`/`--saida`.
 */
export function CapaVinil({ className }: { className?: string }) {
  const { atual } = usePlayer();
  const { capa } = site.spotify;
  const ref = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<"ssr" | "guardado" | "fora">("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return; // já visível: fica para fora
    setEstado("guardado");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEstado("fora");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-vinil={estado}
      data-tocando={atual ? "" : undefined}
      className={cn("capa-vinil relative", className)}
      style={{ width: "calc(var(--capa) * (1 + var(--saida) + 0.08))", height: "var(--capa)" } as CSSProperties}
    >
      {/* vinil: trilho (sai da capa) > giro base (8 s) > giro extra (tocando) */}
      <div aria-hidden className="vinil-trilho absolute left-[calc(var(--capa)*0.02)] top-[calc(var(--capa)*0.02)] size-[calc(var(--capa)*0.96)]">
        <div className="vinil-giro size-full">
          <div className="vinil-turbo vinil-disco relative size-full rounded-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]">
            <span className="absolute left-1/2 top-1/2 size-[34%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-2 ring-black/60">
              <Image src={capa.src} alt="" fill sizes="140px" className="object-cover" style={{ objectPosition: "50% 92%" }} />
              <span className="absolute left-1/2 top-1/2 size-[9%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
            </span>
          </div>
        </div>
        <span className="vinil-brilho pointer-events-none absolute inset-0 rounded-full" />
      </div>

      {/* capa do disco */}
      <div className="relative z-10 size-[var(--capa)] -rotate-2 overflow-hidden rounded-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65),0_8px_20px_rgba(0,0,0,0.25)]">
        <Image src={capa.src} alt={capa.alt} fill sizes="(min-width: 1280px) 420px, (min-width: 1024px) 360px, (min-width: 640px) 300px, 240px" className="object-cover" />
        {atual && (
          <span aria-hidden className="absolute bottom-3 right-3 flex h-7 items-end gap-[3px] rounded-md bg-ink/85 px-2 py-1.5">
            {EQ.map((b, i) => (
              <span key={i} className="eq-barra block h-full w-1 rounded-full bg-spotify" style={{ "--eq-dur": b.d, "--eq-delay": b.a } as CSSProperties} />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
