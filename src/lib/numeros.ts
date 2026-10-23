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

const relativoFmt = new Intl.RelativeTimeFormat("pt-BR", { numeric: "always" });
const UNIDADES: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

/** Data relativa pt-BR, sempre para baixo: "há 2 dias", "há 3 semanas" (menos de 1 min: "há 1 minuto"). */
export function haQuanto(iso: string, agora = Date.now()) {
  const s = Math.max(0, (agora - Date.parse(iso)) / 1000);
  for (const [unidade, seg] of UNIDADES) if (s >= seg) return relativoFmt.format(-Math.floor(s / seg), unidade);
  return relativoFmt.format(-1, "minute");
}

/** Texto final de uma prova: fixo (`value`) ou do stats (o `total` sai sempre arredondado). */
export function valorDaProva(p: Prova, stats: Stats) {
  if ("value" in p) return p.value;
  return p.stat === "total" ? totalArredondado(stats.total) : exato(stats[p.stat]);
}
