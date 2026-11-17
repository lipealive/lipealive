"use client";

import Image from "next/image";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Pause, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** O que o mini player toca: um episódio (com ID) ou o show inteiro. */
export type Alvo = { tipo: "episode" | "show"; id: string; titulo: string };

const Ctx = createContext<{ atual: Alvo | null; abrir: (a: Alvo) => void } | null>(null);

/**
 * Mini player da dobra Spotify. O embed oficial (height 152) só é carregado no clique: nada de iframe antes.
 * A barra é `sticky bottom-0` e filha direta da seção (o provider não cria DOM): fica no rodapé da tela
 * enquanto a seção está visível e para no fim dela. A seção precisa de overflow-clip (não hidden).
 */
export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
  const [atual, setAtual] = useState<Alvo | null>(null);
  const { spotify } = site;

  return (
    <Ctx.Provider value={{ atual, abrir: setAtual }}>
      {children}
      {atual && (
        <div className="sticky bottom-0 z-40 px-3 pb-3 pt-2 sm:px-6 sm:pb-5">
          <div className="relative mx-auto max-w-3xl rounded-2xl bg-ink p-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]">
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
              onClick={() => setAtual(null)}
              aria-label={spotify.fechar}
              className="absolute -right-2 -top-3 flex size-8 items-center justify-center rounded-full bg-white text-ink shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotify"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

function usePlayer() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlayer fora do SpotifyPlayerProvider");
  return c;
}

/** Link que abre o mini player (sem JS: abre no Spotify). */
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

export type Faixa = { chave: string; numero: string; titulo: string; data?: string; duracao: string; href: string; alvo: Alvo };

/** Tracklist estilo Spotify: hover destaca a linha e o número vira play; clique toca no mini player. */
export function Tracklist({ faixas }: { faixas: readonly Faixa[] }) {
  const { atual, abrir } = usePlayer();
  const { spotify } = site;

  return (
    <ol className="divide-y divide-white/10">
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
              className="group grid grid-cols-[1.75rem_2.75rem_1fr_auto] items-center gap-3 rounded-md px-2 py-3 transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none sm:grid-cols-[2.5rem_3rem_1fr_8rem_6rem_auto] sm:gap-4 sm:px-4"
            >
              <span className="relative flex h-6 items-center justify-center font-mono text-sm tabular-nums text-white/60">
                <span className={cn("transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0", tocando && "text-spotify")}>{f.numero}</span>
                <Play className="absolute size-4 fill-current text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
              </span>
              <Image src={spotify.capa.src} alt="" width={48} height={48} sizes="48px" loading="lazy" className="aspect-square w-full rounded bg-creme object-cover" />
              <span className="min-w-0">
                <span className={cn("line-clamp-2 font-semibold leading-snug sm:line-clamp-1", tocando ? "text-spotify" : "text-white")}>{f.titulo}</span>
                <span className="mt-0.5 block text-xs text-white/60 sm:hidden">{[f.data, f.duracao].filter(Boolean).join(" · ")}</span>
              </span>
              <span className="hidden text-sm text-white/60 sm:block">{f.data}</span>
              <span className="hidden text-right text-sm tabular-nums text-white/60 sm:block">{f.duracao}</span>
              <span className="flex size-10 items-center justify-center rounded-full bg-spotify text-ink transition-transform group-hover:scale-105">
                {tocando ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="ml-0.5 size-4 fill-current" aria-hidden />}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
