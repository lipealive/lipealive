import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { Recorte } from "@/components/recorte";

/**
 * Hero: "QUANTAS VERSÕES DE VOCÊ EXISTEM?" + 4 cartas de personagem.
 * Hover (desktop) expande a carta; no mobile é uma pilha com swipe (snap).
 * Tudo visível no SSR; o contador rola ao carregar.
 */
export function Hero() {
  const { hero } = site;

  return (
    <section id="top" data-accent="alive" className="relative overflow-hidden bg-ink text-white">
      {/* brilho laranja */}
      <div aria-hidden className="pointer-events-none absolute -right-[20%] -top-[10%] h-[70vw] w-[70vw] rounded-full bg-accent/30 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-page px-4 pb-10 pt-8 sm:px-6 md:pt-12">
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="relative z-10">
            <p className="font-display text-xl uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
            <h1 className="mt-3 font-display text-[clamp(3.6rem,13.5vw,10rem)] uppercase leading-[0.86] tracking-tight text-balance">
              {hero.title}
            </h1>
            <p className="mt-5 text-lg text-white/80 sm:text-xl">{hero.subtitle}</p>
            <p className="mt-6 flex flex-col gap-1">
              <Senha value={hero.prova.value} onMount className="font-display text-[clamp(2.75rem,9vw,5.5rem)] text-accent" />
              <span className="max-w-xs text-sm text-white/70 sm:text-base">{hero.prova.label}</span>
            </p>
          </div>

          {/* recorte grande saindo da composição */}
          <div className="relative -mb-10 -mr-8 w-[82%] justify-self-end sm:-mr-12 md:-mb-16 md:w-full">
            <Recorte recorte={hero.recorte} priority sizes="(min-width: 768px) 38vw, 80vw" className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
          </div>
        </div>

        {/* cartas de personagem */}
        <p className="mt-10 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/60">{hero.cartasLabel}</p>
        <ul
          aria-label={hero.cartasLabel}
          className="relative z-10 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:h-[420px] md:gap-3 md:overflow-visible md:px-0 lg:h-[480px]"
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
                  {/* handle gigante atrás */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-2 top-1/2 origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap font-display text-[5rem] leading-none text-outline opacity-40 md:text-[6rem]"
                  >
                    {v.handle}
                  </span>

                  {/* imagem */}
                  {carta.foto && (
                    <Image src={carta.foto} alt="" fill sizes="(min-width: 768px) 30vw, 72vw" className="object-top-cover" />
                  )}
                  {carta.recorte && (
                    <Image
                      src={carta.recorte.src}
                      alt=""
                      width={carta.recorte.width}
                      height={carta.recorte.height}
                      sizes="(min-width: 768px) 30vw, 72vw"
                      className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                  {carta.fita && (
                    <span className="fita-obra absolute left-1/2 top-[52%] w-[160%] -translate-x-1/2 -rotate-12 py-1.5 text-center font-display text-2xl uppercase tracking-[0.3em] text-constroi">
                      <span className="bg-ink px-3 py-0.5">{carta.fita}</span>
                    </span>
                  )}

                  {/* gradiente de leitura */}
                  {carta.foto && <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent to-transparent" />}

                  <span className="relative z-10 flex items-start justify-between p-4">
                    <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">{carta.tag}</span>
                    <ArrowDown className="size-5 opacity-70 transition-transform group-hover:translate-y-1" aria-hidden />
                  </span>
                  <span className="relative z-10 p-4">
                    <span className="block font-display text-4xl uppercase leading-[0.9] lg:text-5xl">{v.nome}</span>
                    <span
                      className={cn(
                        "mt-2 block text-sm font-semibold transition-[opacity,transform] duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100",
                      )}
                    >
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
  );
}
