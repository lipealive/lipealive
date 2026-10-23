import type { CSSProperties } from "react";
import { Clapperboard, Copy, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { MuralImagem } from "@/components/mural-imagem";
import type { InstagramPost } from "@/lib/data/instagram-posts";
import { compacto, haQuanto } from "@/lib/numeros";

/** Rotações leves alternadas por posição na coluna (e inclinação da fita). */
const ROTACOES = [
  { r: -4, fita: -6 },
  { r: 3, fita: 5 },
  { r: -2, fita: -3 },
  { r: 5, fita: 7 },
  { r: -5, fita: -5 },
  { r: 2, fita: 4 },
];

type PolaroidProps = {
  post: InstagramPost;
  /** Índice do post na lista toda (fita e foto de reserva). */
  indice: number;
  /** Posição dentro da coluna/faixa (rotação). */
  posicao: number;
  /** Cópia do loop: fora do teclado e do leitor de tela. */
  copia?: boolean;
  tamanho: "g" | "p";
  agora: number;
};

/**
 * Foto impressa de um post (borda branca, sombra, fita adesiva em algumas, data na borda).
 * Hover (ponteiro fino) endireita, cresce e mostra legenda + curtidas/comentários; clique abre o post.
 */
export function Polaroid({ post: p, indice, posicao, copia = false, tamanho, agora }: PolaroidProps) {
  const { mural } = site.alive;
  const handle = `@${mural.username}`;
  const rot = ROTACOES[posicao % ROTACOES.length];
  const fita = mural.fitas[indice];
  const reserva = mural.fallback[indice % mural.fallback.length];
  const rodape = p.timestamp ? haQuanto(p.timestamp, agora) : handle;
  const numeros = [p.curtidas !== undefined && `${compacto(p.curtidas)} ${mural.curtidas}`, p.comentarios !== undefined && `${compacto(p.comentarios)} ${mural.comentarios}`].filter(Boolean);
  const g = tamanho === "g";

  return (
    <li className={cn("mural-item relative shrink-0", g ? "w-[clamp(200px,17vw,250px)]" : "w-[140px]")} style={{ "--r": `${rot.r}deg` } as CSSProperties}>
      <a
        href={p.permalink}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={copia ? -1 : undefined}
        aria-label={`${mural.abrir}: ${p.legenda || handle}${numeros.length ? ` (${numeros.join(", ")})` : ""}`}
        className={cn(
          "mural-foto relative block bg-white shadow-[0_16px_30px_-14px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink",
          g ? "p-2.5 pb-9" : "p-1.5 pb-6",
        )}
      >
        <span className="relative block aspect-[4/5] overflow-hidden bg-ink">
          <MuralImagem foto={{ src: p.imagem, posicao: p.posicao }} reserva={reserva} alt={copia ? "" : p.legenda.slice(0, 120)} sizes={g ? "250px" : "140px"} baixa={copia} />

          {p.tipo !== "imagem" && (
            <span className="absolute right-1.5 top-1.5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" title={p.tipo === "reel" ? mural.reel : mural.carrossel}>
              {p.tipo === "reel" ? <Clapperboard className={g ? "size-5" : "size-4"} aria-hidden /> : <Copy className={g ? "size-5" : "size-4"} aria-hidden />}
            </span>
          )}

          {/* hover (desktop): legenda e números */}
          <span aria-hidden className="mural-info absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3 text-white">
            {p.legenda && <span className="line-clamp-2 text-xs leading-snug">{p.legenda}</span>}
            {(p.curtidas !== undefined || p.comentarios !== undefined) && (
              <span className="mt-1.5 flex gap-3 text-xs font-bold">
                {p.curtidas !== undefined && (
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-3.5 fill-current" /> {compacto(p.curtidas)}
                  </span>
                )}
                {p.comentarios !== undefined && (
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5 fill-current" /> {compacto(p.comentarios)}
                  </span>
                )}
              </span>
            )}
          </span>
        </span>

        <span className={cn("absolute inset-x-0 text-center font-display uppercase tracking-[0.12em] text-ink/55", g ? "bottom-2.5 text-sm" : "bottom-1.5 text-[10px]")}>{rodape}</span>

        {fita && (
          <span
            aria-hidden
            className={cn("fita-adesiva absolute left-1/2 whitespace-nowrap font-display uppercase tracking-[0.2em] text-ink/75", g ? "-top-3 px-4 py-1 text-sm" : "-top-2 px-2.5 py-0.5 text-[10px]")}
            style={{ transform: `translateX(-50%) rotate(${rot.fita}deg)` }}
          >
            {fita}
          </span>
        )}
      </a>
    </li>
  );
}
