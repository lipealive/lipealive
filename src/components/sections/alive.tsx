import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { InstagramPerfil } from "@/components/instagram-perfil";
import { InstagramIcon } from "@/components/icons";
import { seguidoresDe, type Stats } from "@/lib/data/stats";
import { compacto, valorDaProva } from "@/lib/numeros";

const v = site.versoes[0];

/** Dobra Lipe Alive (só Instagram): laranja chapado e mockup do perfil do app na coluna direita. */
export function Alive({ stats }: { stats: Stats }) {
  const { ui } = site;
  const seguidores = seguidoresDe(stats, v.slug);

  return (
    <section id={v.slug} data-accent={v.accent} aria-labelledby={`${v.slug}-titulo`} className="scroll-mt-12 relative overflow-clip bg-accent text-accent-foreground">
      <span aria-hidden className="pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[26vw] leading-none text-outline opacity-25 md:top-0">
        {v.handle}
      </span>

      <div className="relative mx-auto w-full max-w-page px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-16">
          {/* desktop: acompanha a rolagem do mockup, que é mais alto */}
          <div className="md:sticky md:top-28">
            <p className="flex flex-wrap items-center gap-x-3 text-sm font-semibold">
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                <InstagramIcon className="size-4" />
                {v.handle}
              </a>
              <span className="opacity-70">
                {compacto(seguidores)} {ui.seguidores}
              </span>
            </p>
            <h2 id={`${v.slug}-titulo`} className="mt-3 font-display text-[clamp(3.5rem,14.5vw,10rem)] uppercase leading-[0.86] tracking-tight">
              {v.nome}
            </h2>
            <p className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{v.headline}</p>
            <p className="mt-3 max-w-prose text-base leading-relaxed opacity-80">{v.descricao}</p>

            {v.provas && (
              <p className="mt-6 flex flex-col">
                <Senha value={valorDaProva(v.provas[0], stats)} className="font-display text-[clamp(3rem,10vw,6rem)]" />
                <span className="text-sm font-semibold uppercase tracking-[0.18em] opacity-70">{v.provas[0].label}</span>
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <CtaLink href={v.url} className="bg-ink text-white hover:bg-ink/90">
                  <InstagramIcon className="size-5" />
                  {ui.seguir}
                </CtaLink>
              </Magnetic>
            </div>
          </div>

          <Reveal className="mx-auto w-full max-w-[440px] md:mr-0">
            <InstagramPerfil versao={v} seguidores={seguidores} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
