"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Senha } from "@/components/senha";
import { useVersaoAtual } from "@/components/versao-atual";

/**
 * Display de senha de atendimento: "SENHA 01 LIPE ALIVE" na cor da versão do story atual.
 * A cada troca os dígitos rolam, o nome sobe e o painel dá um "ding" de brilho (sem som).
 * SSR mostra a 1ª versão; reduced-motion troca sem animação. Clique rola até a dobra.
 */
export function PainelSenha({ className }: { className?: string }) {
  const { painel } = site.hero;
  const slug = useVersaoAtual()?.slug ?? site.versoes[0].slug;
  const n = Math.max(0, site.versoes.findIndex((v) => v.slug === slug));
  const versao = site.versoes[n];
  const numero = String(n + 1).padStart(2, "0");

  // conta as trocas depois da hidratação: só aí entram ding e animação do nome
  const [trocas, setTrocas] = useState(0);
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    setTrocas((t) => t + 1);
  }, [slug]);

  return (
    <a
      href={`#${versao.slug}`}
      data-accent={versao.accent}
      aria-label={`${painel.label} ${numero}, ${versao.nome}. ${painel.irPara}`}
      className={cn(
        "painel-senha group relative flex w-full max-w-md items-stretch overflow-hidden rounded-md border border-white/15 bg-black text-accent transition-colors duration-300 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        className,
      )}
    >
      {trocas > 0 && <span key={trocas} aria-hidden className="painel-ding pointer-events-none absolute inset-0" />}

      <span aria-hidden className="flex flex-col justify-center gap-1 border-r border-white/10 px-4 py-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{painel.label}</span>
        <span className="relative font-mono text-5xl font-bold leading-none sm:text-6xl">
          {/* segmentos apagados atrás, como num display de LED */}
          <span className="absolute inset-0 text-accent/10">88</span>
          <Senha value={numero} intro={false} duration={0.7} className="led-glow relative" />
        </span>
      </span>

      <span aria-hidden className="relative flex min-w-0 flex-1 items-center justify-between gap-3 overflow-hidden px-4">
        <span key={versao.slug} className={cn("led-glow truncate font-mono text-lg font-bold uppercase tracking-[0.12em] sm:text-xl", trocas > 0 && "painel-nome")}>
          {versao.nome}
        </span>
        <ArrowDown className="size-4 shrink-0 text-white/40 transition-transform group-hover:translate-y-0.5 group-hover:text-accent" />
      </span>

      {/* matriz de pontos por cima de tudo */}
      <span aria-hidden className="led-matriz pointer-events-none absolute inset-0" />
    </a>
  );
}
