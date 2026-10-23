import Image from "next/image";
import { ArrowUpRight, Clapperboard } from "lucide-react";
import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { InstagramIcon } from "@/components/icons";
import { seguidoresDe, type Stats } from "@/lib/data/stats";
import { compacto, exato } from "@/lib/numeros";

const v = site.versoes[2];

/** Dobra Lipe Constrói: amarelo obra, planta baixa com linhas de CAD se desenhando, fita zebrada. */
export function Constroi({ stats }: { stats: Stats }) {
  const { constroi, ui } = site;

  return (
    <section id={v.slug} data-accent={v.accent} aria-labelledby={`${v.slug}-titulo`} className="scroll-mt-12 blueprint relative overflow-hidden text-ink">
      <div aria-hidden className="fita-obra h-4" />
      <span aria-hidden className="pointer-events-none absolute left-0 top-16 whitespace-nowrap font-display text-[24vw] leading-none text-outline opacity-20">
        {v.handle}
      </span>

      {/* linhas de CAD de fundo */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full text-ink/35" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.15" vectorEffect="non-scaling-stroke">
        <path className="cad-line" pathLength={1} d="M6 12 H60 V54 H6 Z" />
        <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "0.4s" }} d="M60 30 H94 V88 H40 V54" />
        <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "0.8s" }} d="M6 8 H60 M6 7 V9 M60 7 V9" />
        <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "1.1s" }} d="M97 30 V88 M96 30 H98 M96 88 H98" />
        <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "1.4s" }} d="M20 54 A14 14 0 0 1 34 40" />
        <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "1.7s" }} d="M70 54 A10 10 0 0 0 60 64" />
      </svg>

      <div className="relative mx-auto w-full max-w-page px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          {/* prancheta: foto principal com cotas de CAD, secundária sobreposta */}
          <Reveal className="relative order-2 md:order-1">
            <figure className="relative pb-10 pr-8 pt-8">
              {/* cota horizontal (topo) */}
              <span aria-hidden className="absolute left-0 right-8 top-0 flex items-center font-mono text-[10px] font-bold tracking-widest text-ink/80">
                <span className="h-3 w-px bg-ink" />
                <span className="h-px flex-1 bg-ink" />
                <span className="bg-constroi px-1.5">{constroi.cotas.largura}</span>
                <span className="h-px flex-1 bg-ink" />
                <span className="h-3 w-px bg-ink" />
              </span>
              {/* cota vertical (direita) */}
              <span aria-hidden className="absolute bottom-10 right-0 top-8 flex flex-col items-center font-mono text-[10px] font-bold tracking-widest text-ink/80">
                <span className="h-px w-3 bg-ink" />
                <span className="w-px flex-1 bg-ink" />
                <span className="bg-constroi py-1.5 [writing-mode:vertical-rl]">{constroi.cotas.altura}</span>
                <span className="w-px flex-1 bg-ink" />
                <span className="h-px w-3 bg-ink" />
              </span>

              <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink bg-ink shadow-[8px_8px_0_0_#0b0b0c]">
                <Image src={v.fotos.principal.src!} alt={v.fotos.principal.alt} fill sizes="(min-width: 768px) 45vw, 100vw" loading="lazy" className="object-cover" style={{ objectPosition: "45% 70%" }} />
                <span className="fita-obra absolute -left-[10%] top-[6%] w-[120%] -rotate-6 py-1.5 text-center font-display text-2xl uppercase tracking-[0.3em] text-constroi">
                  <span className="bg-ink px-4 py-0.5">{constroi.fita}</span>
                </span>
              </div>

              {/* foto secundária sobreposta */}
              {v.fotos.secundaria && (
                <div className="absolute -bottom-2 -left-2 w-[38%] rotate-[-4deg] border-2 border-ink bg-ink shadow-[6px_6px_0_0_#0b0b0c] md:-left-6">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={v.fotos.secundaria.src!} alt={v.fotos.secundaria.alt} fill sizes="(min-width: 768px) 18vw, 38vw" loading="lazy" className="object-cover" style={{ objectPosition: "78% 45%" }} />
                  </div>
                </div>
              )}

              {/* carimbo da prancha */}
              <figcaption className="absolute bottom-0 right-8 flex gap-3 border-2 border-ink bg-constroi px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
                <span>{constroi.cotas.prancha}</span>
                <span>{constroi.cotas.escala}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="order-1 md:order-2">
            <p className="flex flex-wrap items-center gap-x-3 text-sm font-semibold">
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                <InstagramIcon className="size-4" />
                {v.handle}
              </a>
              <span className="opacity-70">
                {compacto(seguidoresDe(stats, v.slug))} {ui.seguidores}
              </span>
            </p>
            <h2 id={`${v.slug}-titulo`} className="mt-3 font-display text-[clamp(3.5rem,14.5vw,10rem)] uppercase leading-[0.86] tracking-tight">
              {v.nome}
            </h2>
            <p className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{v.headline}</p>
            <p className="mt-3 max-w-prose text-base leading-relaxed opacity-80">{v.descricao}</p>
            <p className="mt-6 flex flex-col">
              <Senha value={exato(seguidoresDe(stats, v.slug))} className="font-display text-[clamp(3rem,10vw,6rem)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] opacity-70">{ui.seguidores}</span>
            </p>

            <Reveal className="mt-8">
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em]">{constroi.temasTitle}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {constroi.temas.map((t, i) => (
                  <li key={t}>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-start gap-3 border-2 border-ink bg-constroi p-4 shadow-[4px_4px_0_0_#0b0b0c] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      <span className="font-mono text-xs font-bold">0{i + 1}</span>
                      <span className="flex-1 text-sm font-semibold leading-snug">{t}</span>
                      <Clapperboard className="size-4 shrink-0 opacity-60" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-3">
              {v.ctas.map((c) => (
                <Magnetic key={c.href}>
                  <CtaLink href={c.href} className="rounded-none bg-ink text-constroi shadow-[4px_4px_0_0_rgba(11,11,12,0.35)] hover:bg-ink/90">
                    {c.label}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </CtaLink>
                </Magnetic>
              ))}
              <Magnetic>
                <CtaLink href={v.url} variant="outline" className="rounded-none border-2 border-ink text-ink hover:bg-ink hover:text-constroi">
                  <InstagramIcon className="size-5" />
                  {ui.seguir}
                </CtaLink>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="fita-obra h-4" />
    </section>
  );
}
