import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, type Versao as VersaoData } from "@/content/site";
import { Foto } from "@/components/foto";
import { PostGrid } from "@/components/post-grid";
import { CtaLink } from "@/components/cta-link";
import { FadeIn } from "@/components/motion";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";

type VersaoProps = { versao: VersaoData; index: number };

/**
 * Uma dobra por versão. Foto alterna de lado no desktop (par: esquerda, ímpar: direita)
 * e empilha no mobile. A cor de acento vem do atributo data-accent (ver globals.css).
 */
export function Versao({ versao, index }: VersaoProps) {
  const fotoDireita = index % 2 === 1;
  const { ui } = site;

  return (
    <section
      id={versao.slug}
      data-accent={versao.accent}
      aria-labelledby={`${versao.slug}-titulo`}
      className="scroll-mt-14 border-t border-border/10 py-14 md:py-24"
    >
      <div className="mx-auto w-full max-w-page px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-12">
          {/* Foto(s) */}
          <FadeIn direction={fotoDireita ? "left" : "right"} className={cn("md:sticky md:top-20", fotoDireita && "md:order-2")}>
            <div className="relative">
              <Foto foto={versao.fotos.principal} aspect="aspect-[4/5]" sizes="(min-width: 768px) 45vw, 100vw" />
              {versao.fotos.secundaria && (
                <div className="absolute -bottom-4 right-4 w-[34%] rotate-2 drop-shadow-2xl md:-right-6 md:w-[38%]">
                  <Foto foto={versao.fotos.secundaria} aspect="aspect-[4/5]" sizes="(min-width: 768px) 18vw, 34vw" className="ring-4 ring-background" />
                </div>
              )}
            </div>
          </FadeIn>

          {/* Texto */}
          <div className={cn("flex min-w-0 flex-col gap-6 pt-4 md:pt-0", fotoDireita && "md:order-1")}>
            <FadeIn>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <a href={versao.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-accent">
                  <InstagramIcon className="size-4" />
                  {versao.handle}
                </a>
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{versao.seguidores}</span> {ui.seguidores}
                </span>
              </p>
              <h2 id={`${versao.slug}-titulo`} className="mt-3 font-display text-[clamp(3.5rem,15vw,8rem)] uppercase leading-[0.88] tracking-tight">
                {versao.nome}
              </h2>
              <p className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl">{versao.headline}</p>
              <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">{versao.descricao}</p>
            </FadeIn>

            {versao.destaques && (
              <FadeIn>
                <ul className="flex flex-wrap gap-2">
                  {versao.destaques.map((d) => (
                    <li key={d} className="rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                      {d}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}

            {versao.provas && (
              <FadeIn>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-lg border border-border/10 bg-surface p-5">
                  {versao.provas.map((p) => (
                    <div key={p.label}>
                      <dt className="order-2 text-xs leading-snug text-muted-foreground">{p.label}</dt>
                      <dd className="font-display text-3xl leading-none text-accent sm:text-4xl">{p.value}</dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            )}

            {versao.youtube && (
              <FadeIn>
                <a
                  href={versao.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border/10 bg-surface p-4 transition-colors hover:border-accent/50"
                >
                  <YoutubeIcon className="size-7 shrink-0 text-accent" />
                  <span className="flex flex-col text-sm">
                    <span className="font-semibold">YouTube</span>
                    <span className="text-muted-foreground">
                      {versao.youtube.inscritos} · {versao.youtube.videos}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto size-4 text-muted-foreground" aria-hidden />
                </a>
              </FadeIn>
            )}

            {versao.ctas.length > 0 && (
              <FadeIn>
                <ul className="flex flex-col gap-3">
                  {versao.ctas.map((cta) =>
                    cta.description ? (
                      <li key={cta.href}>
                        <a
                          href={cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "group flex items-center gap-4 rounded-lg border p-4 transition-colors",
                            cta.primary ? "border-accent bg-accent text-accent-foreground" : "border-border/10 bg-surface hover:border-accent/60",
                          )}
                        >
                          <span className="flex flex-col gap-0.5">
                            <span className="font-display text-2xl uppercase leading-none tracking-wide">{cta.label}</span>
                            <span className={cn("text-sm leading-snug", cta.primary ? "text-accent-foreground/80" : "text-muted-foreground")}>
                              {cta.description}
                            </span>
                          </span>
                          <ArrowUpRight className="ml-auto size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </a>
                      </li>
                    ) : (
                      <li key={cta.href}>
                        <CtaLink href={cta.href} variant={cta.primary ? "primary" : "outline"} className="w-full sm:w-auto">
                          {cta.label}
                          <ArrowUpRight className="size-4" aria-hidden />
                        </CtaLink>
                      </li>
                    ),
                  )}
                </ul>
              </FadeIn>
            )}

            <FadeIn>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{ui.postsTitle}</p>
              <PostGrid posts={versao.posts} nome={versao.nome} />
            </FadeIn>

            <FadeIn>
              <CtaLink href={versao.url} variant="primary" className="w-full sm:w-auto">
                <InstagramIcon className="size-5" />
                {ui.seguir}
              </CtaLink>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
