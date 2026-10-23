import Image from "next/image";
import { Fragment } from "react";
import { Grid3x3, HardHat, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, type Versao } from "@/content/site";
import { VerificadoIcon } from "@/components/icons";
import { compacto, exato } from "@/lib/numeros";

const slugPorHandle = Object.fromEntries(site.versoes.map((v) => [v.handle, v.slug]));

/** Bio com as @menções em azul, linkando para a dobra da versão. */
function Bio({ linha }: { linha: string }) {
  return (
    <>
      {linha.split(/(@[\w.]+)/).map((parte, i) => {
        const slug = slugPorHandle[parte];
        return slug ? (
          <a key={i} href={`#${slug}`} className="text-[#e0f1ff] hover:underline">
            {parte}
          </a>
        ) : (
          <Fragment key={i}>{parte}</Fragment>
        );
      })}
    </>
  );
}

/**
 * Mockup do perfil do Instagram (tema escuro do app): avatar com anel de stories, números,
 * bio, botão Seguir, destaques e grade 3x3 com as fotos do Lipe.
 */
export function InstagramPerfil({ versao, seguidores, className }: { versao: Versao; seguidores: number; className?: string }) {
  const { alive } = site;
  const { perfil } = alive;
  const numeros = [
    { n: exato(perfil.posts), label: perfil.labels.posts },
    { n: compacto(seguidores), label: perfil.labels.seguidores },
    { n: exato(perfil.seguindo), label: perfil.labels.seguindo },
  ];

  return (
    <div className={cn("overflow-hidden rounded-[1.75rem] border-2 border-ink bg-black text-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)]", className)}>
      {/* barra do app */}
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <a href={versao.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-lg font-bold tracking-tight hover:underline">
          {perfil.username}
          <VerificadoIcon className="size-[18px]" />
          <span className="sr-only">{perfil.labels.verificado}</span>
        </a>
        <MoreHorizontal className="size-6" aria-hidden />
      </div>

      {/* avatar + números */}
      <div className="flex items-center gap-5 px-4 pt-2">
        <span className="shrink-0 rounded-full bg-[conic-gradient(from_210deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)] p-[3px]">
          <span className="block rounded-full bg-black p-[3px]">
            <span className="relative block size-[76px] overflow-hidden rounded-full sm:size-[86px]">
              <Image src="/fotos/lipe-close.jpg" alt="" fill sizes="86px" className="object-top-cover" />
            </span>
          </span>
        </span>
        <ul className="grid flex-1 grid-cols-3 text-center">
          {numeros.map((x) => (
            <li key={x.label} className="flex flex-col leading-tight">
              <span className="text-base font-bold sm:text-lg">{x.n}</span>
              <span className="text-[13px] text-white/80">{x.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* bio */}
      <div className="px-4 pt-3 text-sm leading-snug">
        <p className="font-semibold">{versao.nome}</p>
        {perfil.bio.map((linha) => (
          <p key={linha}>
            <Bio linha={linha} />
          </p>
        ))}
      </div>

      <div className="px-4 pt-3">
        <a
          href={versao.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-full items-center justify-center rounded-lg bg-[#0095F6] text-sm font-semibold transition-colors hover:bg-[#1877F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {perfil.labels.seguir}
        </a>
      </div>

      {/* destaques */}
      <ul aria-label={alive.destaquesLabel} className="flex gap-4 overflow-x-auto px-4 pb-1 pt-4 no-scrollbar">
        {versao.destaques?.map((d) => {
          const foto = alive.destaquesFotos[d];
          return (
            <li key={d} className="flex w-16 shrink-0 flex-col items-center gap-1.5 text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-white/25 p-[3px]">
                <span className={cn("relative size-full overflow-hidden rounded-full", !foto && "flex items-center justify-center bg-constroi text-ink")}>
                  {foto ? <Image src={foto} alt="" fill sizes="64px" loading="lazy" className="object-top-cover" style={{ objectPosition: alive.destaquesPosicao[d] }} /> : <HardHat className="size-6" aria-hidden />}
                </span>
              </span>
              <span className="w-full truncate text-xs">{d}</span>
            </li>
          );
        })}
      </ul>

      {/* aba da grade */}
      <div className="mt-3 flex justify-center border-t border-white/15">
        <span className="-mt-px flex items-center gap-1.5 border-t border-white py-2.5 text-xs font-semibold uppercase tracking-widest">
          <Grid3x3 className="size-4" aria-hidden />
          {perfil.labels.grade}
        </span>
      </div>

      <ul className="grid grid-cols-3 gap-0.5">
        {perfil.grade.map((f) => (
          <li key={f.src} className="relative aspect-square overflow-hidden bg-ink">
            <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 160px, 33vw" loading="lazy" className="object-cover" style={{ objectPosition: f.posicao ?? "50% 20%" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
