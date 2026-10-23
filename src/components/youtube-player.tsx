"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { site } from "@/content/site";
import type { Video } from "@/lib/data/youtube";

const ORIGENS = ["https://www.youtube-nocookie.com", "https://i.ytimg.com", "https://www.google.com"];

/**
 * Lite embed: vídeo em destaque (thumb 16:9) + os outros em linha. Nenhum iframe antes do clique;
 * no clique a thumb vira embed youtube-nocookie com autoplay. Clicar num menor leva ele para o destaque.
 * Sem JS, as thumbs são links para o YouTube.
 */
export function YoutubePlayer({ videos }: { videos: readonly Video[] }) {
  const { youtube } = site;
  const [atual, setAtual] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [semMaxres, setSemMaxres] = useState<Record<string, boolean>>({});
  const aquecido = useRef(false);

  const video = videos[atual];
  if (!video) return null;
  const outros = videos.map((v, n) => ({ v, n })).filter(({ n }) => n !== atual);

  // preconnect só quando a pessoa mostra intenção (hover/foco), como o lite-youtube-embed
  function aquecer() {
    if (aquecido.current) return;
    aquecido.current = true;
    for (const href of ORIGENS) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      document.head.append(link);
    }
  }

  function tocar(n: number) {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setAtual(n);
      setTocando(true);
    };
  }

  return (
    <div onPointerEnter={aquecer} onFocus={aquecer}>
      <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-ink bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]">
        {tocando ? (
          <iframe
            key={video.id}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
            title={`${youtube.playerTitle}: ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <a href={video.url} onClick={tocar(atual)} aria-label={`${youtube.tocarLabel}: ${video.title}`} className="group absolute inset-0 block focus-visible:outline-none">
            <Image
              key={video.id}
              src={semMaxres[video.id] ? video.thumb : `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
              onError={() => setSemMaxres((s) => ({ ...s, [video.id]: true }))}
              alt=""
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-20 items-center justify-center rounded-2xl bg-accent text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-white md:h-16 md:w-24">
                <Play className="size-7 fill-current md:size-8" aria-hidden />
              </span>
            </span>
          </a>
        )}
      </div>

      <div className="mt-3 min-h-[3.5rem]">
        {atual === 0 && <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink">{youtube.recenteLabel}</p>}
        <h3 className="mt-0.5 line-clamp-2 text-lg font-bold leading-snug sm:text-xl">{video.title}</h3>
      </div>

      {/* os outros: carrossel com snap no mobile, linha de 3 no desktop */}
      <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {outros.map(({ v, n }) => (
          <li key={v.id} className="w-[62vw] shrink-0 snap-start md:w-auto">
            <a
              href={v.url}
              onClick={tocar(n)}
              aria-label={`${youtube.tocarLabel}: ${v.title}`}
              className="group block overflow-hidden rounded-md border-2 border-ink bg-ink text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="relative block aspect-video overflow-hidden">
                <Image src={v.thumb} alt="" fill sizes="(min-width: 768px) 18vw, 62vw" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span aria-hidden className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-accent text-white">
                  <Play className="size-4 fill-current" />
                </span>
              </span>
              <span className="line-clamp-2 block p-2.5 text-xs font-semibold leading-snug sm:text-[13px]">{v.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
