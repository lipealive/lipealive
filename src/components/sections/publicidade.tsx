import { Mail } from "lucide-react";
import { mailto, site } from "@/content/site";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import { Recorte } from "@/components/recorte";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";

/** Mídia kit: fundo claro, recorte de terno e números para marcas. */
export function Publicidade() {
  const { publicidade } = site;

  return (
    <section id="publicidade" data-accent="alive" aria-labelledby="publicidade-titulo" className="relative overflow-hidden bg-paper text-ink">
      <div className="mx-auto grid grid-cols-1 w-full max-w-page gap-8 px-4 pt-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-12 md:pt-24">
        <div className="pb-16 md:pb-24">
          <Reveal>
            <p className="font-display text-xl uppercase tracking-[0.2em] text-accent">{publicidade.eyebrow}</p>
            <h2 id="publicidade-titulo" className="mt-2 font-display text-[clamp(3.5rem,13vw,8rem)] uppercase leading-[0.88] tracking-tight text-balance">
              {publicidade.title}
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/75">{publicidade.text}</p>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-y-2 border-ink py-5">
            {publicidade.numeros.map((n) => (
              <div key={n.label}>
                <Senha value={n.value} className="font-display text-[clamp(1.6rem,5.5vw,3.5rem)]" />
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/70 sm:text-xs">{n.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-8">
            <p className="break-all text-lg font-bold">{publicidade.email}</p>
            <Magnetic className="mt-4 inline-block w-full sm:w-auto">
              <CtaLink href={mailto(publicidade.email)} external={false} className="w-full bg-ink text-paper hover:bg-ink/90 sm:w-auto">
                <Mail className="size-5" aria-hidden />
                {publicidade.ctaLabel}
              </CtaLink>
            </Magnetic>
          </Reveal>
        </div>

        <div className="relative mx-auto w-[70%] md:w-full">
          <span aria-hidden className="absolute inset-x-[10%] bottom-0 top-[25%] rounded-t-full bg-accent" />
          <Recorte recorte={publicidade.recorte} sizes="(min-width: 768px) 36vw, 70vw" className="relative" />
        </div>
      </div>
    </section>
  );
}
