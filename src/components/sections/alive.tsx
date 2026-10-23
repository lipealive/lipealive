import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { CtaLink } from "@/components/cta-link";
import { Magnetic } from "@/components/magnetic";
import { EsteiraPosts } from "@/components/esteira-posts";
import { Polaroid } from "@/components/polaroid";
import { InstagramIcon } from "@/components/icons";
import { seguidoresDe, type Stats } from "@/lib/data/stats";
import type { InstagramPost } from "@/lib/data/instagram-posts";
import { compacto, valorDaProva } from "@/lib/numeros";

const v = site.versoes[0];
/** Cópias da lista em cada esteira (o CSS anda 1/3 do trilho por volta). */
const COPIAS = 3;

type Item = { post: InstagramPost; indice: number };

/** As COPIAS listas de uma esteira: a 1ª é a real; as outras ficam fora do leitor de tela e do teclado. */
function copias(itens: Item[], eixo: "x" | "y", agora: number) {
  const g = eixo === "y";
  return Array.from({ length: COPIAS }, (_, c) => (
    <ul key={c} aria-hidden={c > 0 || undefined} className={cn("flex shrink-0", g ? "flex-col items-center gap-10 pb-10" : "items-start gap-5 py-4 pr-5")}>
      {itens.map(({ post, indice }, posicao) => (
        <Polaroid key={post.id} post={post} indice={indice} posicao={posicao} copia={c > 0} tamanho={g ? "g" : "p"} agora={agora} />
      ))}
    </ul>
  ));
}

/**
 * Dobra Lipe Alive (só Instagram): texto centralizado entre duas colunas de posts reais em movimento
 * (esquerda sobe, direita desce; no mobile, duas faixas horizontais em sentidos opostos).
 */
export function Alive({ stats, posts }: { stats: Stats; posts: readonly InstagramPost[] }) {
  const { ui, alive } = site;
  const seguidores = seguidoresDe(stats, v.slug);
  const agora = Date.now();
  const itens = posts.map((post, indice) => ({ post, indice }));
  const pares = itens.filter((i) => i.indice % 2 === 0);
  const impares = itens.filter((i) => i.indice % 2 === 1);

  return (
    <section id={v.slug} data-accent={v.accent} aria-labelledby={`${v.slug}-titulo`} className="scroll-mt-12 relative overflow-clip bg-accent text-accent-foreground lg:h-[100svh] lg:min-h-[720px]">
      <span aria-hidden className="pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[26vw] leading-none text-outline opacity-25 lg:top-1/2 lg:-translate-y-1/2">
        {v.handle}
      </span>

      {/* mobile: faixa de cima, vai para a esquerda */}
      <EsteiraPosts eixo="x" className="relative pt-14 lg:hidden">
        {copias(pares, "x", agora)}
      </EsteiraPosts>

      <div className="relative mx-auto w-full max-w-page px-4 sm:px-6 lg:grid lg:h-full lg:grid-cols-[1fr_minmax(0,560px)_1fr] lg:gap-6">
        {/* desktop: coluna esquerda sobe */}
        <EsteiraPosts eixo="y" className="hidden h-full px-6 lg:block">
          {copias(pares, "y", agora)}
        </EsteiraPosts>

        <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center py-8 text-center lg:h-full lg:justify-center lg:py-16">
          <p className="flex flex-wrap items-center justify-center gap-x-2 text-sm font-semibold">
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
              <InstagramIcon className="size-4" />
              {v.handle}
            </a>
            <span aria-hidden className="opacity-50">·</span>
            <span className="opacity-70">
              {compacto(seguidores)} {ui.seguidores}
            </span>
          </p>
          <h2 id={`${v.slug}-titulo`} className="mt-3 font-display text-[clamp(4rem,19vw,8.5rem)] uppercase leading-[0.86] tracking-tight">
            {v.nome}
          </h2>
          <p className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{v.headline}</p>
          <p className="mt-3 max-w-prose text-base leading-relaxed opacity-80 text-balance">{v.descricao}</p>

          {v.provas && (
            <p className="mt-6 flex flex-col items-center">
              <Senha value={valorDaProva(v.provas[0], stats)} className="font-display text-[clamp(3rem,13vw,6rem)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] opacity-70">{v.provas[0].label}</span>
            </p>
          )}

          <Magnetic className="mt-8">
            <CtaLink href={v.url} className="bg-ink text-white hover:bg-ink/90">
              <InstagramIcon className="size-5" />
              {ui.seguir}
            </CtaLink>
          </Magnetic>
          <a href={v.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
            {alive.mural.verTudo} {v.handle}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        {/* desktop: coluna direita desce */}
        <EsteiraPosts eixo="y" reverso className="hidden h-full px-6 lg:block">
          {copias(impares, "y", agora)}
        </EsteiraPosts>
      </div>

      {/* mobile: faixa de baixo, vai para a direita */}
      <EsteiraPosts eixo="x" reverso className="relative pb-14 lg:hidden">
        {copias(impares, "x", agora)}
      </EsteiraPosts>
    </section>
  );
}
