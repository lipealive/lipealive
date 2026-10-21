import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { HyroxTimer } from "@/components/hyrox-timer";
import { InstagramIcon } from "@/components/icons";

const v = site.versoes[3];

/** Dobra Lipe Treina: vermelho/preto, cronômetro, ECG, palavras cinéticas e "COMFORT KILLS DREAMS". */
export function Treina() {
  const { treina, ui } = site;
  const palavras = [...treina.palavras, ...treina.palavras, ...treina.palavras];

  return (
    <section id={v.slug} data-accent={v.accent} aria-labelledby={`${v.slug}-titulo`} className="scroll-mt-12 relative overflow-hidden bg-accent text-white">
      <div className="relative mx-auto w-full max-w-page px-4 pt-14 sm:px-6 md:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <HyroxTimer label={treina.cronometroLabel} />
          <p className="text-sm font-semibold">
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
              <InstagramIcon className="size-4" />
              {v.handle}
            </a>
            <span className="ml-3 opacity-75">
              {v.seguidores} {ui.seguidores}
            </span>
          </p>
        </div>
      </div>

      {/* palavras cinéticas */}
      <div aria-hidden className="relative mt-6 select-none overflow-hidden">
        <div className="marquee-track flex w-max whitespace-nowrap font-display text-[18vw] uppercase leading-[0.85] text-ink md:text-[11vw]" style={{ ["--marquee-duration" as string]: "22s" }}>
          {[...palavras, ...palavras].map((p, i) => (
            <span key={i} className="px-[0.2em]">{p}</span>
          ))}
        </div>
        <div className="marquee-track flex w-max whitespace-nowrap font-display text-[18vw] uppercase leading-[0.85] text-outline-2 text-white md:text-[11vw]" data-reverse="" style={{ ["--marquee-duration" as string]: "26s" }}>
          {[...palavras, ...palavras].map((p, i) => (
            <span key={i} className="px-[0.2em]">{p}</span>
          ))}
        </div>
      </div>

      {/* linha de batimento atravessando a dobra */}
      <svg aria-hidden className="pointer-events-none mt-4 h-16 w-full text-ink md:h-24" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path
          className="ecg-line"
          pathLength={1}
          d="M0 20 H60 L66 20 L70 8 L74 32 L78 20 H120 L126 14 L130 26 L134 20 H200 L206 20 L210 4 L214 36 L218 20 H280 L286 16 L290 24 L294 20 H340 L346 20 L350 10 L354 30 L358 20 H400"
        />
      </svg>

      <div className="relative mx-auto w-full max-w-page px-4 pb-0 pt-4 sm:px-6 md:pt-8">
        <div className="grid grid-cols-1 gap-8 pb-14 md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:pb-24">
          <div>
            <h2 id={`${v.slug}-titulo`} className="font-display text-[clamp(3.5rem,14.5vw,10rem)] uppercase leading-[0.86] tracking-tight">
              {v.nome}
            </h2>
            <p className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{v.headline}</p>
            <p className="mt-3 max-w-prose text-base leading-relaxed opacity-85">{v.descricao}</p>
            <p className="mt-6 flex flex-col">
              <Senha value="44.300" className="font-display text-[clamp(3rem,10vw,6rem)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] opacity-75">{ui.seguidores}</span>
            </p>

            <Reveal className="mt-10 border-l-4 border-ink pl-4">
              <p className="font-display text-[clamp(2.5rem,9vw,5rem)] uppercase leading-[0.9] text-ink">{treina.frase}</p>
              <p className="mt-1 text-sm opacity-75">{treina.fraseTraducao}</p>
            </Reveal>

            <div className="mt-8">
              <Magnetic className="inline-block">
                <CtaLink href={v.url} className="bg-ink text-white hover:bg-ink/90">
                  <InstagramIcon className="size-5" />
                  {ui.seguir}
                </CtaLink>
              </Magnetic>
            </div>
          </div>

          {v.recorte && (
            <div className="relative h-[60vh] md:h-auto">
              <Image
                src={v.recorte.src}
                alt={v.recorte.alt}
                fill
                sizes="(min-width: 768px) 36vw, 90vw"
                loading="lazy"
                className="object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] md:object-center"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
