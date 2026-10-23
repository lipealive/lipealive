import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { YoutubePlayer } from "@/components/youtube-player";
import { YoutubeIcon, YoutubeLogo } from "@/components/icons";
import type { Stats } from "@/lib/data/stats";
import type { Video } from "@/lib/data/youtube";
import { exato } from "@/lib/numeros";

/** Dobra YouTube: vermelho YouTube chapado, contadores do canal e player com o vídeo mais recente em destaque. */
export function Youtube({ stats, videos }: { stats: Stats; videos: readonly Video[] }) {
  const { youtube: yt, ui } = site;
  const contadores = [
    { value: exato(stats.ytInscritos), label: ui.inscritos },
    { value: exato(stats.ytVideos), label: ui.videos },
  ];

  return (
    <section id={yt.slug} data-accent="youtube" aria-labelledby={`${yt.slug}-titulo`} className="scroll-mt-12 relative overflow-hidden bg-accent text-white">
      <span aria-hidden className="pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[26vw] uppercase leading-none text-outline opacity-20 md:top-0">
        {yt.handle}
      </span>

      <div className="relative mx-auto w-full max-w-page px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-14">
          <div>
            <a href={yt.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
              <YoutubeLogo className="h-6 w-auto text-white" />
              {yt.handle}
            </a>
            <h2 id={`${yt.slug}-titulo`} className="mt-3 font-display text-[clamp(3.5rem,14.5vw,8.5rem)] uppercase leading-[0.86] tracking-tight text-balance">
              {yt.titulo}
            </h2>
            <p className="mt-4 text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">{yt.frase}</p>

            <div className="mt-7 flex gap-8 border-l-4 border-ink pl-4">
              {contadores.map((c) => (
                <p key={c.label} className="flex flex-col">
                  <Senha value={c.value} className="font-display text-[clamp(2.75rem,9vw,5rem)]" />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] opacity-80">{c.label}</span>
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <CtaLink href={yt.inscrever.href} className="bg-ink text-white hover:bg-ink/90">
                  <YoutubeIcon className="size-5" />
                  {yt.inscrever.label}
                </CtaLink>
              </Magnetic>
              <Magnetic>
                <CtaLink href={yt.url} variant="outline" className="border-white/50 text-white hover:border-white hover:text-white">
                  {yt.verCanal}
                </CtaLink>
              </Magnetic>
            </div>
          </div>

          <Reveal>
            <YoutubePlayer videos={videos} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
