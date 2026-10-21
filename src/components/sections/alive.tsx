import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { site } from "@/content/site";
import youtube from "@/content/youtube.json";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { PhoneStories } from "@/components/phone-stories";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";

const v = site.versoes[0];

/** Dobra Lipe Alive: laranja chapado, celular com stories, destaques e últimos vídeos do YouTube. */
export function Alive() {
  const { alive, ui } = site;

  return (
    <section id={v.slug} data-accent={v.accent} aria-labelledby={`${v.slug}-titulo`} className="relative overflow-hidden bg-accent text-accent-foreground">
      <span aria-hidden className="pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[26vw] leading-none text-outline opacity-25 md:top-0">
        {v.handle}
      </span>

      <div className="relative mx-auto w-full max-w-page px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
          <div>
            <p className="flex flex-wrap items-center gap-x-3 text-sm font-semibold">
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                <InstagramIcon className="size-4" />
                {v.handle}
              </a>
              <span className="opacity-70">
                {v.seguidores} {ui.seguidores}
              </span>
            </p>
            <h2 id={`${v.slug}-titulo`} className="mt-3 font-display text-[clamp(3.5rem,14.5vw,10rem)] uppercase leading-[0.86] tracking-tight">
              {v.nome}
            </h2>
            <p className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{v.headline}</p>
            <p className="mt-3 max-w-prose text-base leading-relaxed opacity-80">{v.descricao}</p>

            {v.provas && (
              <p className="mt-6 flex flex-col">
                <Senha value={v.provas[0].value} className="font-display text-[clamp(3rem,10vw,6rem)]" />
                <span className="text-sm font-semibold uppercase tracking-[0.18em] opacity-70">{v.provas[0].label}</span>
              </p>
            )}

            {/* destaques em bolinhas */}
            <Reveal className="mt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] opacity-70">{alive.destaquesLabel}</p>
              <ul className="-mx-4 flex gap-4 overflow-x-auto px-4 no-scrollbar md:mx-0 md:flex-wrap md:px-0">
                {v.destaques?.map((d, i) => (
                  <li key={d} className="flex w-16 shrink-0 flex-col items-center gap-2 text-center">
                    <span className="flex size-16 items-center justify-center rounded-full border-2 border-ink bg-ink p-[3px]">
                      <span className="flex size-full items-center justify-center rounded-full bg-accent font-display text-2xl text-ink">{i + 1}</span>
                    </span>
                    <span className="text-[11px] font-semibold leading-tight">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <CtaLink href={v.url} className="bg-ink text-white hover:bg-ink/90">
                  <InstagramIcon className="size-5" />
                  {ui.seguir}
                </CtaLink>
              </Magnetic>
              {v.youtube && (
                <Magnetic>
                  <CtaLink href={v.youtube.url} variant="outline" className="border-ink/40 text-ink hover:border-ink hover:text-ink">
                    <YoutubeIcon className="size-5" />
                    {v.ctas[0].label}
                  </CtaLink>
                </Magnetic>
              )}
            </div>
          </div>

          <Reveal className="flex justify-center md:justify-end" y={40}>
            <PhoneStories stories={alive.stories} label={alive.storiesLabel} handle={v.handle} />
          </Reveal>
        </div>

        {/* YouTube */}
        {v.youtube && (
          <Reveal className="mt-16 md:mt-24">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h3 className="font-display text-4xl uppercase leading-none sm:text-5xl">{alive.youtubeTitle}</h3>
              <a href={v.youtube.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
                <YoutubeIcon className="size-5" />
                {v.youtube.inscritos} · {v.youtube.videos}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
            <ul className="mt-5 grid grid-cols-1 grid-cols-2 gap-3 md:grid-cols-4">
              {youtube.videos.map((video) => (
                <li key={video.id}>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${ui.verVideo}: ${video.title}`}
                    className="group block overflow-hidden rounded-md border-2 border-ink bg-ink text-white"
                  >
                    <span className="relative block aspect-video overflow-hidden">
                      <Image src={video.thumb} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex size-11 items-center justify-center rounded-full bg-accent text-ink">
                          <Play className="size-5 fill-current" aria-hidden />
                        </span>
                      </span>
                    </span>
                    <span className="line-clamp-2 block p-3 text-xs font-semibold leading-snug sm:text-sm">{video.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
