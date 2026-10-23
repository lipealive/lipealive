import type { Prova } from "@/content/site";
import type { Stats } from "@/lib/data/stats";

const exatoFmt = new Intl.NumberFormat("pt-BR", { useGrouping: "always" } as Intl.NumberFormatOptions);
const compactoFmt = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });

/** Número exato para contadores grandes: 1700000 → "1.700.000". */
export function exato(n: number) {
  return exatoFmt.format(n);
}

/**
 * Formato curto pt-BR arredondando para baixo (o Intl arredonda para cima):
 * 1749999 → "1,7 mi", 39680 → "39,6 mil", 999999 → "999,9 mil".
 */
export function compacto(n: number) {
  const passo = n >= 1e6 ? 1e5 : n >= 1e3 ? 100 : 1;
  return compactoFmt.format(Math.floor(n / passo) * passo);
}

/** Total arredondado para baixo na centena de mil, para nunca parecer inflado: 2143900 → "2.100.000". */
export function totalArredondado(n: number) {
  return exato(Math.floor(n / 1e5) * 1e5);
}

/** Texto final de uma prova: fixo (`value`) ou do stats (o `total` sai sempre arredondado). */
export function valorDaProva(p: Prova, stats: Stats) {
  if ("value" in p) return p.value;
  return p.stat === "total" ? totalArredondado(stats.total) : exato(stats[p.stat]);
}
