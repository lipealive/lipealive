import { Star } from "lucide-react";
import { site } from "@/content/site";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { BotaoOuvir, CapaVinil, PlayerEmbed, SpotifyPlayerProvider, Tracklist, type Alvo, type Faixa } from "@/components/spotify-player";
import { SpotifyIcon } from "@/components/icons";
import type { Episodio } from "@/lib/data/podcast";
import { duracaoTexto, haQuanto } from "@/lib/numeros";

/**
 * Dobra Spotify (podcast "O irmão mais velho que você não teve"), compacta: à esquerda a capa como
 * capa de disco com um vinil girando atrás; à direita título, nota, botões e episódios num card,
 * com o embed oficial aparecendo dentro do card só no clique.
 */
export function Spotify({ episodios }: { episodios: readonly Episodio[] }) {
  const { spotify: sp } = site;
  const agora = Date.now();
  const doShow = (titulo: string): Alvo => ({ tipo: "show", id: sp.showId, titulo });
  const alvoDe = (e: Episodio): Alvo => (e.spotifyId ? { tipo: "episode", id: e.spotifyId, titulo: e.titulo } : doShow(e.titulo));

  const faixas: Faixa[] = episodios.map((e, i) => ({
    chave: e.spotifyId ?? `${e.numero ?? i}-${e.titulo}`,
    numero: e.numero !== null ? String(e.numero) : String(i + 1),
    titulo: e.titulo,
    meta: [e.data && haQuanto(e.data, agora), duracaoTexto(e.duracao)].filter(Boolean).join(" · "),
    href: e.link,
    alvo: alvoDe(e),
  }));
  const recente = episodios[0];

  return (
    <section id={sp.slug} data-accent="spotify" aria-labelledby={`${sp.slug}-titulo`} className="scroll-mt-12 relative overflow-clip bg-accent text-accent-foreground">
      <span aria-hidden className="pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[24vw] uppercase leading-none text-outline opacity-20 md:top-4">
        {sp.fundo}
      </span>

      <SpotifyPlayerProvider>
        <div className="relative mx-auto grid w-full max-w-page grid-cols-1 items-center gap-10 px-4 pb-14 pt-16 sm:px-6 md:pt-20 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <CapaVinil className="mx-auto [--capa:240px] [--saida:0.24] sm:[--capa:300px] sm:[--saida:0.32] lg:[--capa:340px] lg:[--saida:0.45] xl:[--capa:420px]" />

          <div className="min-w-0">
            <a href={sp.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] underline-offset-4 hover:underline sm:text-sm">
              <SpotifyIcon className="size-5" />
              {sp.eyebrow}
            </a>
            <h2 id={`${sp.slug}-titulo`} className="mt-3 font-display text-[clamp(2.75rem,11vw,5.25rem)] uppercase leading-[0.9] tracking-tight text-balance">
              {sp.titulo} <span className="text-marcador">{sp.tituloDestaque}</span>
            </h2>
            <p className="mt-3 max-w-md text-base font-semibold leading-snug sm:text-lg">{sp.sobre}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-bold text-white">
                {sp.avaliacao.nota}
                <Star className="size-4 fill-spotify text-spotify" aria-hidden />
                <span className="font-normal text-white/70">
                  ({sp.avaliacao.total} {sp.avaliacao.label})
                </span>
              </p>
              <Magnetic>
                <CtaLink href={sp.url} className="min-h-11 bg-ink px-5 text-white hover:bg-ink/90">
                  <SpotifyIcon className="size-5 text-spotify" />
                  {sp.seguir}
                </CtaLink>
              </Magnetic>
              <Magnetic>
                <BotaoOuvir
                  alvo={recente ? alvoDe(recente) : doShow(sp.nome)}
                  href={recente?.link ?? sp.url}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-ink px-5 text-base font-semibold tracking-tight transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-spotify"
                >
                  {sp.ouvir}
                </BotaoOuvir>
              </Magnetic>
            </div>

            {/* episódios + player num card preto translúcido */}
            <div className="mt-6 rounded-2xl bg-ink/85 p-2 text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-3">
              <PlayerEmbed />
              <h3 className="sr-only">{sp.tracklistTitulo}</h3>
              <Tracklist faixas={faixas} />
            </div>
          </div>
        </div>
      </SpotifyPlayerProvider>
    </section>
  );
}
