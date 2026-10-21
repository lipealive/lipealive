import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, type Cta } from "@/content/site";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import { Recorte } from "@/components/recorte";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { RoadmapTrail } from "@/components/roadmap-trail";
import { InstagramIcon } from "@/components/icons";

const v = site.versoes[1];

/** Dobra Lipe Ensina: azul e tipografia do site lipeensina.com.br, trilha do Roadmap, muro de mentorados. */
export function Ensina() {
  const { ensina, ui } = site;
  const ctas: readonly Cta[] = v.ctas;
  const cards = ctas.filter((c) => c.description);
  const geral = ctas.find((c) => !c.description);

  return (
    <section id={v.slug} data-accent={v.accent} aria-labelledby={`${v.slug}-titulo`} className="relative overflow-hidden bg-accent font-ensina text-white">
      <span aria-hidden className="pointer-events-none absolute right-0 top-8 whitespace-nowrap font-display text-[24vw] leading-none text-outline opacity-20">
        {v.handle}
      </span>

      <div className="relative mx-auto w-full max-w-page px-4 pb-16 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <div className="flex items-center gap-4">
              <Image src={ensina.assinatura.src} alt={ensina.assinatura.alt} width={ensina.assinatura.width} height={ensina.assinatura.height} unoptimized className="h-12 w-auto" />
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
            <h2 id={`${v.slug}-titulo`} className="mt-5 font-display text-[clamp(3.5rem,14.5vw,10rem)] uppercase leading-[0.86] tracking-tight">
              {v.nome}
            </h2>
            <p className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{v.headline}</p>
            <p className="mt-3 max-w-prose text-base leading-relaxed opacity-85">{v.descricao}</p>
          </div>

          {v.recorte && (
            <div className="relative -mb-16 w-[70%] justify-self-end md:-mb-28 md:w-[85%]">
              <Recorte recorte={v.recorte} sizes="(min-width: 768px) 32vw, 70vw" className="drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]" />
            </div>
          )}
        </div>

        {/* provas */}
        {v.provas && (
          <Reveal className="relative z-10 mt-10 grid grid-cols-1 grid-cols-2 gap-x-6 gap-y-6 rounded-lg bg-white/10 p-5 backdrop-blur md:grid-cols-4">
            {v.provas.map((p) => (
              <div key={p.label}>
                <Senha value={`+${p.value}`} className="font-display text-[clamp(2rem,6vw,3.5rem)]" />
                <p className="mt-1 text-xs leading-snug opacity-85 sm:text-sm">{p.label}</p>
              </div>
            ))}
          </Reveal>
        )}

        {/* Roadmap */}
        <Reveal className="mt-16 md:mt-24">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Image src={ensina.roadmapLogo.src} alt={ensina.roadmapLogo.alt} width={ensina.roadmapLogo.width} height={ensina.roadmapLogo.height} unoptimized className="h-10 w-auto" />
            <h3 className="text-xl font-bold sm:text-2xl">{ensina.roadmapTitle}</h3>
          </div>
          <div className="mt-8">
            <RoadmapTrail marcos={ensina.marcos} />
          </div>
        </Reveal>

        {/* muro de mentorados */}
        <Reveal className="mt-16 md:mt-24">
          <h3 className="text-xl font-bold sm:text-2xl">{ensina.muroTitle}</h3>
        </Reveal>
      </div>

      <div className="relative space-y-3 overflow-hidden">
        {/* prints reais dos perfis (540x388) */}
        <div className="marquee-track flex w-max gap-3" style={{ ["--marquee-duration" as string]: "60s" }}>
          {[...ensina.mentorados, ...ensina.mentorados].map((m, i) => (
            <a
              key={`${m.handle}-${i}`}
              href={`https://instagram.com/${m.handle.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.handle}, ${m.seguidores} ${ui.seguidores}`}
              className="relative block w-56 shrink-0 overflow-hidden rounded-md bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] sm:w-64"
            >
              <Image src={m.foto} alt="" width={540} height={388} loading="lazy" className="h-auto w-full" />
              <span className="absolute bottom-2 left-2 rounded-full bg-ink px-2 py-0.5 text-[11px] font-bold text-white">
                {m.seguidores} {ui.seguidores}
              </span>
            </a>
          ))}
        </div>
        {/* chips com avatar */}
        <div className="marquee-track flex w-max gap-3" data-reverse="" style={{ ["--marquee-duration" as string]: "36s" }}>
          {[...ensina.avatares, ...ensina.avatares, ...ensina.avatares].map((m, i) => (
            <span key={`${m.handle}-${i}`} className="flex shrink-0 items-center gap-3 rounded-full bg-ink py-1.5 pl-1.5 pr-5 text-white">
              <Image src={m.foto} alt="" width={40} height={40} loading="lazy" className="size-10 rounded-full object-cover" />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold">{m.handle}</span>
                {m.seguidores && (
                  <span className="text-xs opacity-70">
                    {m.seguidores} {ui.seguidores}
                  </span>
                )}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-page px-4 pb-20 pt-14 sm:px-6 md:pb-28">
        <Reveal>
          <p className="flex flex-col items-start">
            <Senha value={`+${ensina.contador.value}`} className="font-display text-[clamp(3.5rem,13vw,9rem)]" />
            <span className="text-base font-semibold uppercase tracking-[0.18em] opacity-85 sm:text-lg">{ensina.contador.label}</span>
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="text-xl font-bold sm:text-2xl">{ensina.produtosTitle}</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {cards.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex h-full flex-col justify-between gap-6 rounded-lg p-5 transition-transform duration-300 hover:-translate-y-1",
                    c.primary ? "bg-white text-ink" : "bg-ink text-white",
                  )}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display text-4xl uppercase leading-none">{c.label}</span>
                    <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                  <span className="text-sm leading-snug opacity-80">{c.description}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {geral && (
              <Magnetic>
                <CtaLink href={geral.href} variant="outline" className="border-white/40 text-white hover:border-white hover:text-white">
                  {geral.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </CtaLink>
              </Magnetic>
            )}
            <Magnetic>
              <CtaLink href={v.url} className="bg-white text-ink hover:bg-white/90">
                <InstagramIcon className="size-5" />
                {ui.seguir}
              </CtaLink>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
