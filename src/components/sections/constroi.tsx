import { ArrowUpRight, Clapperboard, HardHat } from "lucide-react";
import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { InstagramIcon } from "@/components/icons";

const v = site.versoes[2];

/** Dobra Lipe Constrói: amarelo obra, planta baixa com linhas de CAD se desenhando, fita zebrada. */
export function Constroi() {
  const { constroi, ui } = site;

  return (
    <section id={v.slug} data-accent={v.accent} aria-labelledby={`${v.slug}-titulo`} className="blueprint relative overflow-hidden text-ink">
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
          {/* placeholder "EM OBRA" */}
          <Reveal className="relative order-2 md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-dashed border-ink/60 bg-ink/5">
              <svg aria-hidden className="absolute inset-0 h-full w-full text-ink/50" viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="0.6">
                <path className="cad-line" pathLength={1} d="M8 20 H72 V92 H8 Z M8 56 H72 M40 20 V92" />
                <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "0.6s" }} d="M8 14 H72 M8 12 V16 M72 12 V16 M76 20 V92 M74 20 H78 M74 92 H78" />
                <path className="cad-line" pathLength={1} style={{ ["--draw-delay" as string]: "1s" }} d="M24 56 A16 16 0 0 1 40 40" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <HardHat className="size-10" aria-hidden />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]">{constroi.fitaFoto}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{constroi.plantaLabel} · {v.fotos.principal.alt}</span>
              </div>
              <span className="fita-obra absolute left-1/2 top-[18%] w-[160%] -translate-x-1/2 -rotate-12 py-2 text-center font-display text-3xl uppercase tracking-[0.3em] text-constroi">
                <span className="bg-ink px-4 py-1">{constroi.fita}</span>
              </span>
            </div>
          </Reveal>

          <div className="order-1 md:order-2">
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
            <p className="mt-6 flex flex-col">
              <Senha value="39.600" className="font-display text-[clamp(3rem,10vw,6rem)]" />
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
