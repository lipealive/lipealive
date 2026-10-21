import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { Foto } from "@/components/foto";
import { Stagger, StaggerItem } from "@/components/motion";

/** Primeira dobra: título, prova social e atalhos que rolam até cada versão. Foto com prioridade (LCP). */
export function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="relative overflow-hidden pt-14">
      <div className="mx-auto grid w-full max-w-page grid-cols-1 gap-8 px-4 pb-12 pt-6 sm:px-6 md:min-h-[calc(100svh-3.5rem)] md:grid-cols-2 md:items-center md:gap-12 md:py-12">
        <Stagger inView={false} className="order-2 flex flex-col gap-6 md:order-1">
          <StaggerItem>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-[clamp(3.25rem,13vw,7.5rem)] uppercase leading-[0.88] tracking-tight text-balance">
              {hero.title}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-4xl leading-none text-accent sm:text-5xl">{hero.prova.value}</span>
              <span className="text-lg text-foreground">{hero.prova.label}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{hero.provaNota}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="mb-3 text-sm text-muted-foreground">{hero.chipsLabel}</p>
            <nav aria-label={site.nav.label} className="flex flex-wrap gap-2">
              {site.versoes.map((v) => (
                <a
                  key={v.slug}
                  href={`#${v.slug}`}
                  data-accent={v.accent}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/15 px-4 text-sm font-semibold transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="size-2 rounded-full bg-accent" aria-hidden />
                  {v.nome}
                  <ArrowDown className="size-3.5 opacity-60" aria-hidden />
                </a>
              ))}
            </nav>
          </StaggerItem>
        </Stagger>

        <div className="order-1 md:order-2">
          <Foto foto={hero.foto} priority aspect="aspect-[4/5] sm:aspect-[3/4]" sizes="(min-width: 768px) 45vw, 100vw" className="max-h-[70svh] md:max-h-none" />
        </div>
      </div>
    </section>
  );
}
