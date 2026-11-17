import Image from "next/image";
import { Star } from "lucide-react";
import { site } from "@/content/site";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { BonecoFone } from "@/components/boneco-fone";
import { BotaoOuvir, SpotifyPlayerProvider, Tracklist, type Alvo, type Faixa } from "@/components/spotify-player";
import { SpotifyIcon } from "@/components/icons";
import type { Episodio } from "@/lib/data/podcast";
import { duracaoTexto, haQuanto } from "@/lib/numeros";

/**
 * Dobra Spotify (podcast "O irmão mais velho que você não teve"): verde Spotify, título manuscrito
 * e bonecos palito da capa sobre cartões creme tortos, fone de ouvido desenhado na cabeça do irmão
 * mais velho, tracklist estilo app e mini player com o embed oficial carregado só no clique.
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
    data: e.data ? haQuanto(e.data, agora) : undefined,
    duracao: duracaoTexto(e.duracao),
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
        <div className="relative mx-auto flex w-full max-w-page flex-col items-center px-4 pb-12 pt-20 text-center sm:px-6 md:pt-28">
          <a href={sp.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] underline-offset-4 hover:underline">
            <SpotifyIcon className="size-6" />
            {sp.eyebrow} · {sp.handle}
          </a>

          {/* título manuscrito real da capa, sobre cartão creme torto (o PNG tem halo claro) */}
          <div className="mt-6 w-[90%] max-w-[640px] -rotate-2 bg-creme px-4 py-4 shadow-[0_22px_40px_-18px_rgba(0,0,0,0.55)] sm:px-8 sm:py-6">
            <h2 id={`${sp.slug}-titulo`}>
              <Image src={sp.titulo.src} alt={sp.titulo.alt} width={sp.titulo.width} height={sp.titulo.height} sizes="(min-width: 768px) 600px, 85vw" className="h-auto w-full" />
            </h2>
          </div>
          <p className="mt-6 max-w-md text-base font-semibold leading-snug sm:text-lg">{sp.sobre}</p>

          <div className="mt-8 sm:mt-10">
            <BonecoFone />
          </div>

          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-white">
            {sp.avaliacao.nota}
            <Star className="size-4 fill-spotify text-spotify" aria-hidden />
            <span className="font-normal text-white/70">
              ({sp.avaliacao.total} {sp.avaliacao.label})
            </span>
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <CtaLink href={sp.url} className="bg-ink text-white hover:bg-ink/90">
                <SpotifyIcon className="size-5 text-spotify" />
                {sp.seguir}
              </CtaLink>
            </Magnetic>
            <Magnetic>
              <BotaoOuvir
                alvo={recente ? alvoDe(recente) : doShow(sp.nome)}
                href={recente?.link ?? sp.url}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ink px-6 text-base font-semibold tracking-tight transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-spotify"
              >
                {sp.ouvir}
              </BotaoOuvir>
            </Magnetic>
          </div>
        </div>

        {/* tracklist em largura total sobre faixa preta translúcida */}
        <div className="relative bg-ink/85 py-6 text-white backdrop-blur-sm sm:py-8">
          <div className="mx-auto w-full max-w-page px-2 sm:px-6">
            <h3 className="mb-3 px-2 font-display text-2xl uppercase tracking-wide sm:px-4 sm:text-3xl">{sp.tracklistTitulo}</h3>
            <Tracklist faixas={faixas} />
          </div>
        </div>
      </SpotifyPlayerProvider>
    </section>
  );
}
