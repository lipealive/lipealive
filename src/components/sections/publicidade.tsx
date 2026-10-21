import { Mail } from "lucide-react";
import { mailto, site } from "@/content/site";
import { Foto } from "@/components/foto";
import { CtaLink } from "@/components/cta-link";
import { FadeIn } from "@/components/motion";

/** Contato comercial: e-mail da agência (mailto). */
export function Publicidade() {
  const { publicidade } = site;

  return (
    <section id="publicidade" data-accent="alive" aria-labelledby="publicidade-titulo" className="scroll-mt-14 border-t border-border/10 py-14 md:py-24">
      <div className="mx-auto grid w-full max-w-page grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-12">
        <FadeIn direction="right" className="md:order-2">
          <Foto foto={publicidade.foto} aspect="aspect-[4/5]" sizes="(min-width: 768px) 45vw, 100vw" />
        </FadeIn>
        <FadeIn className="md:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{publicidade.eyebrow}</p>
          <h2 id="publicidade-titulo" className="mt-2 font-display text-[clamp(3rem,12vw,6rem)] uppercase leading-[0.9] tracking-tight text-balance">
            {publicidade.title}
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">{publicidade.text}</p>
          <p className="mt-2 break-all text-lg font-semibold">{publicidade.email}</p>
          <CtaLink href={mailto(publicidade.email)} external={false} className="mt-6 w-full sm:w-auto">
            <Mail className="size-5" aria-hidden />
            {publicidade.ctaLabel}
          </CtaLink>
        </FadeIn>
      </div>
    </section>
  );
}
