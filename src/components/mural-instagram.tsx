import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight, Clapperboard, Copy, Heart, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { MuralQueda } from "@/components/mural-queda";
import type { InstagramPost } from "@/lib/data/instagram-posts";
import { compacto, haQuanto } from "@/lib/numeros";

/** Composição solta de colagem: rotação (-6° a +6°) e deslocamento de cada foto (desktop). */
const LAYOUT = [
  { r: -5, x: "6%", y: "0px", fita: -7 },
  { r: 4, x: "-4%", y: "18px", fita: 5 },
  { r: -2, x: "-14%", y: "-4px", fita: -3 },
  { r: 6, x: "8%", y: "4px", fita: 8 },
  { r: -4, x: "-6%", y: "22px", fita: -6 },
  { r: 2, x: "-12%", y: "6px", fita: 4 },
];

/**
 * Mural de posts do Instagram: fotos impressas (borda branca, sombra) espalhadas com rotação
 * e sobreposição, fitas adesivas por cima de algumas. Hover endireita e mostra legenda e números;
 * clique abre o post. Mobile: carrossel com snap, fotos ainda tortas.
 */
export function MuralInstagram({ posts, perfilUrl, handle }: { posts: readonly InstagramPost[]; perfilUrl: string; handle: string }) {
  const { mural } = site.alive;
  const agora = Date.now();

  return (
    <div>
      <MuralQueda>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pb-6 pt-7 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-x-0 md:gap-y-7 md:overflow-visible md:px-0 md:pb-4 md:pt-4">
          {posts.map((p, i) => {
            const l = LAYOUT[i % LAYOUT.length];
            const fita = mural.fitas[i];
            const rodape = p.timestamp ? haQuanto(p.timestamp, agora) : handle;
            const numeros = [p.curtidas !== undefined && `${compacto(p.curtidas)} ${mural.curtidas}`, p.comentarios !== undefined && `${compacto(p.comentarios)} ${mural.comentarios}`].filter(Boolean);
            return (
              <li
                key={p.id}
                className="mural-item relative w-[58vw] max-w-[260px] shrink-0 snap-center md:w-auto md:max-w-none"
                style={{ "--i": i, "--r": `${l.r}deg`, "--x": l.x, "--y": l.y } as CSSProperties}
              >
                <a
                  href={p.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${mural.abrir}: ${p.legenda || handle}${numeros.length ? ` (${numeros.join(", ")})` : ""}`}
                  className="mural-foto relative block bg-white p-2 pb-8 shadow-[0_16px_30px_-14px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink sm:p-2.5 sm:pb-9"
                >
                  <span className="relative block aspect-[4/5] overflow-hidden bg-ink">
                    <Image src={p.imagem} alt={p.legenda.slice(0, 120)} fill sizes="(min-width: 768px) 200px, 58vw" loading="lazy" className="object-cover" style={{ objectPosition: p.posicao }} />

                    {p.tipo !== "imagem" && (
                      <span className="absolute right-2 top-2 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" title={p.tipo === "reel" ? mural.reel : mural.carrossel}>
                        {p.tipo === "reel" ? <Clapperboard className="size-5" aria-hidden /> : <Copy className="size-5" aria-hidden />}
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

                  <span className="absolute inset-x-0 bottom-2 text-center font-display text-sm uppercase tracking-[0.12em] text-ink/55 sm:bottom-2.5">{rodape}</span>

                  {fita && (
                    <span
                      aria-hidden
                      className="fita-adesiva absolute -top-3 left-1/2 whitespace-nowrap px-4 py-1 font-display text-sm uppercase tracking-[0.2em] text-ink/75"
                      style={{ transform: `translateX(-50%) rotate(${l.fita}deg)` }}
                    >
                      {fita}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </MuralQueda>

      <a href={perfilUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline md:mt-4">
        {mural.verTudo} {handle}
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}
