import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Foto } from "@/components/foto";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";

/** Produtos: Alive Finance com a marca real (logo + Pulse) e o boné Stay Alive em breve. */
export function Produtos() {
  const { produtos } = site;
  const af = produtos.aliveFinance;

  return (
    <section id="produtos" data-accent="alive" aria-labelledby="produtos-titulo" className="scroll-mt-12 relative bg-ink py-16 text-white md:py-24">
      <div className="mx-auto w-full max-w-page px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xl uppercase tracking-[0.2em] text-accent">{produtos.eyebrow}</p>
          <h2 id="produtos-titulo" className="mt-2 font-display text-[clamp(3.5rem,12vw,7rem)] uppercase leading-[0.88] tracking-tight">
            {produtos.title}
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Alive Finance */}
          <Reveal className="relative overflow-hidden rounded-lg bg-finance-ink p-6 ring-1 ring-white/10 sm:p-8">
            <Image src={af.simbolo.src} alt="" width={af.simbolo.width} height={af.simbolo.height} unoptimized aria-hidden className="pointer-events-none absolute -right-6 -top-4 w-[70%] opacity-20" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <Image src={af.logo.src} alt={`${af.nome} ${af.byline}`} width={af.logo.width} height={af.logo.height} unoptimized className="h-12 w-auto" />
              <div>
                <p className="font-display text-4xl uppercase leading-none sm:text-5xl">{af.nome}</p>
                <p className="mt-2 text-base text-white/75">{af.descricao}</p>
                <Magnetic className="mt-6 inline-block">
                  <CtaLink href={af.href} className="bg-finance text-white hover:bg-finance/90">
                    {af.ctaLabel}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </CtaLink>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          {/* Boné */}
          <Reveal className="relative overflow-hidden rounded-lg bg-surface" delay={0.1}>
            <Foto foto={produtos.bone.foto} aspect="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[360px]" sizes="(min-width: 768px) 50vw, 100vw" className="rounded-none" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6 pt-20 sm:p-8">
              <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink">{produtos.bone.badge}</span>
              <p className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">{produtos.bone.nome}</p>
              <p className="mt-2 text-base text-white/75">{produtos.bone.descricao}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
