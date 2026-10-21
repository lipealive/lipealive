import Image from "next/image";
import { ArrowDown, HardHat } from "lucide-react";
import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { PhoneStories } from "@/components/phone-stories";
import { PainelSenha } from "@/components/painel-senha";
import { Selo } from "@/components/selo";
import { VersaoAtualProvider } from "@/components/versao-atual";

/**
 * Hero: "PEGA A SENHA." + painel de senha sincronizado com o celular de stories (selo girando na quina)
 * + "QUANTAS VERSÕES DE VOCÊ EXISTEM?" com as 4 cartas (hover expande no desktop; swipe no mobile).
 * Tudo visível no SSR; o contador rola ao carregar.
 */
export function Hero() {
  const { hero, ensina } = site;

  return (
    <VersaoAtualProvider>
      <section id="top" data-accent="alive" className="relative overflow-x-clip bg-ink text-white">
        <div className="relative mx-auto w-full max-w-page px-4 pb-10 pt-20 sm:px-6 md:pt-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-stretch md:gap-12">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent text-balance sm:text-sm sm:tracking-[0.25em]">{hero.eyebrow}</p>
              <h1 className="mt-3 font-display text-[clamp(5.5rem,42vw,10rem)] uppercase leading-[0.82] tracking-tight text-balance md:text-[clamp(8rem,20vw,18rem)]">
                {hero.title}
                <span className="text-accent">{hero.titlePonto}</span>
              </h1>
              <PainelSenha className="mt-6" />
              <p className="mt-5 max-w-md text-lg text-white/80 sm:text-xl">{hero.subtitle}</p>
              <p className="mt-6 flex flex-col gap-1">
                <Senha value={hero.prova.value} onMount className="font-display text-[clamp(2.75rem,9vw,5.5rem)] text-accent" />
                <span className="max-w-xs text-sm text-white/70 sm:text-base">{hero.prova.label}</span>
              </p>
            </div>

            {/* celular: no desktop acompanha a altura da headline; no mobile abaixo, até 70vh */}
            <div className="relative flex h-[70vh] items-center justify-center md:h-auto md:min-h-0">
              <PhoneStories stories={hero.stories} label={hero.storiesLabel} className="h-full">
                <Selo texto={hero.selo} className="absolute -bottom-3 -left-4 z-10 w-[72px] md:-bottom-5 md:-left-10 md:w-28" />
              </PhoneStories>
            </div>
          </div>

          {/* cartas das versões */}
          <h2 id="versoes-titulo" className="mb-5 mt-14 font-display text-[clamp(2.75rem,11vw,6rem)] uppercase leading-[0.88] tracking-tight text-balance">
            {hero.cartasLabel}
          </h2>
          <ul
            aria-labelledby="versoes-titulo"
            className="relative z-10 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:h-[420px] md:overflow-visible md:px-0 lg:h-[480px]"
          >
            {site.versoes.map((v) => {
              const carta = site.cartas[v.slug];
              return (
                <li
                  key={v.slug}
                  data-accent={v.accent}
                  className="group relative aspect-[3/4] w-[72vw] shrink-0 snap-center md:aspect-auto md:h-full md:w-auto md:flex-1 md:transition-[flex] md:duration-500 md:ease-out md:hover:flex-[1.7] md:focus-within:flex-[1.7]"
                >
                  <a
                    href={`#${v.slug}`}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-lg bg-accent text-accent-foreground ring-offset-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  >
                    {carta.tipo === "foto" && carta.foto && (
                      <>
                        <Image src={carta.foto} alt="" fill sizes="(min-width: 768px) 30vw, 72vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: carta.posicao }} />
                        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent to-transparent" />
                      </>
                    )}

                    {carta.tipo === "ensina" && (
                      <span aria-hidden className="absolute inset-x-0 bottom-28 top-10 flex flex-col items-center justify-center gap-3 p-5 font-ensina md:bottom-32">
                        <Image src={ensina.assinatura.src} alt="" width={ensina.assinatura.width} height={ensina.assinatura.height} unoptimized className="h-16 w-auto md:h-20" />
                        <span className="font-display text-[4.5rem] uppercase leading-none md:text-[5.5rem]">{carta.seguidoresGrande}</span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">{site.ui.seguidores}</span>
                        <span className="mt-2 flex gap-2">
                          {ensina.marcos.map((m) => (
                            <Image key={m.n} src={m.icone} alt="" width={40} height={40} unoptimized className="size-10 rounded-full bg-white" />
                          ))}
                        </span>
                      </span>
                    )}

                    {carta.tipo === "obra" && (
                      <span aria-hidden className="blueprint absolute inset-0">
                        <svg className="absolute inset-0 h-full w-full text-ink/50" viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="0.5">
                          <path className="cad-line" pathLength={1} d="M8 16 H52 V70 H8 Z M8 44 H52 M30 16 V70" />
                          <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "0.6s" }} d="M8 11 H52 M8 9 V13 M52 9 V13 M56 16 V70 M54 16 H58 M54 70 H58" />
                          <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "1s" }} d="M18 44 A12 12 0 0 1 30 32" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center">
                          <HardHat className="size-10 text-ink/70" />
                        </span>
                        <span className="fita-obra absolute left-1/2 top-[40%] w-[170%] -translate-x-1/2 -rotate-12 py-1.5 text-center font-display text-2xl uppercase tracking-[0.3em] text-constroi">
                          <span className="bg-ink px-3 py-0.5">{carta.fita}</span>
                        </span>
                      </span>
                    )}

                    {carta.tipo === "foto" && carta.fita && (
                      <span aria-hidden className="fita-obra absolute left-1/2 top-[64%] w-[170%] -translate-x-1/2 -rotate-6 py-1 text-center font-display text-xl uppercase tracking-[0.3em] text-constroi">
                        <span className="bg-ink px-3 py-0.5">{carta.fita}</span>
                      </span>
                    )}

                    <span className="relative z-10 flex items-start justify-between p-4">
                      <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">{carta.tag}</span>
                      <ArrowDown className="size-5 opacity-70 transition-transform group-hover:translate-y-1" aria-hidden />
                    </span>
                    <span className="relative z-10 p-4">
                      <span className="block font-display text-4xl uppercase leading-[0.9] lg:text-5xl">{v.nome}</span>
                      <span className="mt-2 block text-sm font-semibold transition-[opacity,transform] duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                        {v.handle} · {v.seguidores} {site.ui.seguidores}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </VersaoAtualProvider>
  );
}
