import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Foto } from "@/components/foto";
import { FadeIn } from "@/components/motion";

/** Produtos do Lipe: Alive Finance (link) e Boné Stay Alive (em breve, sem link). */
export function Produtos() {
  const { produtos } = site;

  return (
    <section id="produtos" data-accent="alive" aria-labelledby="produtos-titulo" className="scroll-mt-14 border-t border-border/10 py-14 md:py-24">
      <div className="mx-auto w-full max-w-page px-4 sm:px-6">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{produtos.eyebrow}</p>
          <h2 id="produtos-titulo" className="mt-2 font-display text-5xl uppercase leading-none tracking-tight sm:text-6xl">
            {produtos.title}
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {produtos.items.map((item, i) => {
            const content = (
              <>
                {item.foto.src ? (
                  <Foto foto={item.foto} aspect="aspect-[4/5]" sizes="(min-width: 640px) 50vw, 100vw" className="rounded-none" />
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-accent/30 via-surface to-surface p-6">
                    <span className="font-display text-5xl uppercase leading-none text-foreground sm:text-6xl">{item.nome}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-16">
                  <div>
                    {"badge" in item && item.badge && (
                      <span className="mb-2 inline-block rounded-full bg-foreground px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-background">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="font-display text-3xl uppercase leading-none">{item.nome}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.descricao}</p>
                  </div>
                  {item.href && <ArrowUpRight className="size-6 shrink-0 text-accent" aria-hidden />}
                </div>
              </>
            );
            const className = "group relative block overflow-hidden rounded-lg bg-surface";

            return (
              <FadeIn key={item.slug} delay={i * 0.08}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {content}
                  </a>
                ) : (
                  <div className={className}>{content}</div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
