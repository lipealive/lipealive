import { site, type VersaoSlug } from "@/content/site";
import { CHANNEL_ID } from "@/lib/data/youtube";
import { ler } from "@/lib/data/fetch";
import { contasInstagram } from "@/lib/data/meta";
import { STATS_TAG } from "@/lib/data/tags";

export type Stats = {
  aliveSeguidores: number;
  ensinaSeguidores: number;
  constroiSeguidores: number;
  treinaSeguidores: number;
  ytInscritos: number;
  ytVideos: number;
  mentoradosSeguidores: number;
  /** Soma dos 4 Instagrams + inscritos do YouTube. */
  total: number;
  /** Data (ISO) da resposta mais recente entre as fontes que responderam; `null` = tudo no fallback. */
  atualizadoEm: string | null;
};

export type StatKey = Exclude<keyof Stats, "atualizadoEm">;

export { STATS_TAG };
const REVALIDATE = 604800; // 7 dias

/** Campo de seguidores de cada versão; o username do Instagram sai do `handle`. */
const SEGUIDORES_POR_SLUG = {
  "lipe-alive": "aliveSeguidores",
  "lipe-ensina": "ensinaSeguidores",
  "lipe-constroi": "constroiSeguidores",
  "lipe-treina": "treinaSeguidores",
} as const satisfies Record<VersaoSlug, StatKey>;

export function seguidoresDe(stats: Stats, slug: VersaoSlug) {
  return stats[SEGUIDORES_POR_SLUG[slug]];
}

/** GET com cache de 7 dias e tag `stats`. */
function lerStats<T>(fonte: string, url: string, tipo: "json" | "text" = "json") {
  return ler<T>(`[stats] ${fonte}`, url, { revalidate: REVALIDATE, tags: [STATS_TAG] }, tipo);
}

/** Inteiro positivo ou `null` (loga quando a fonte respondeu algo inválido). */
function inteiro(fonte: string, v: unknown): number | null {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
  if (typeof n === "number" && Number.isFinite(n) && n > 0) return Math.floor(n);
  console.error(`[stats] ${fonte}: valor inválido (${JSON.stringify(v)})`);
  return null;
}

type Medida = { valor: number | null; em: string | null };
const vazio: Medida = { valor: null, em: null };

/**
 * Seguidores dos perfis do portfólio (uma chamada em me/accounts, ver meta.ts), por username.
 * Perfil que não aparece fica na reserva sem erro e passa a valer sozinho quando entrar.
 */
async function instagram(): Promise<Map<string, Medida>> {
  const perfis = new Map<string, Medida>();
  const r = await contasInstagram();
  r?.contas.forEach((conta, username) => {
    perfis.set(username, { valor: inteiro(`instagram @${conta.username}`, conta.followers_count), em: r.em });
  });
  return perfis;
}

/** YouTube Data API v3. Sem YOUTUBE_API_KEY: fallback, sem erro. */
async function youtube(): Promise<{ inscritos: Medida; videos: Medida }> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return { inscritos: vazio, videos: vazio };
  const params = new URLSearchParams({ part: "statistics", id: CHANNEL_ID, key });
  const r = await lerStats<{ items?: { statistics?: { subscriberCount?: unknown; videoCount?: unknown } }[] }>("youtube", `https://www.googleapis.com/youtube/v3/channels?${params}`);
  if (!r) return { inscritos: vazio, videos: vazio };
  const st = r.data.items?.[0]?.statistics;
  return {
    inscritos: { valor: inteiro("youtube inscritos", st?.subscriberCount), em: r.em },
    videos: { valor: inteiro("youtube vídeos", st?.videoCount), em: r.em },
  };
}

/**
 * Seguidores gerados para mentorados (lp.lipeensina.com.br/depoimentos/).
 * O placar de lá parte do total real da API `/wp-json/lpm/v1/seguidores` (atualizado 1x por dia) e
 * simula o crescimento pelo relógio. Aqui usamos só o total real; se a API cair, o `base` do
 * JSON `#lpm-cfg` embutido na página.
 */
async function mentorados(): Promise<Medida> {
  const api = await lerStats<{ total?: unknown }>("mentorados api", "https://lp.lipeensina.com.br/wp-json/lpm/v1/seguidores");
  const total = api && inteiro("mentorados api", api.data.total);
  if (api && total) return { valor: total, em: api.em };

  const pagina = await lerStats<string>("mentorados página", "https://lp.lipeensina.com.br/depoimentos/", "text");
  const cfg = pagina?.data.match(/<script[^>]*id="lpm-cfg"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  if (!pagina || !cfg) {
    if (pagina) console.error("[stats] mentorados página: #lpm-cfg não encontrado");
    return vazio;
  }
  try {
    return { valor: inteiro("mentorados página", (JSON.parse(cfg) as { base?: unknown }).base), em: pagina.em };
  } catch {
    console.error("[stats] mentorados página: #lpm-cfg inválido");
    return vazio;
  }
}

/**
 * Números do site, cada um da sua fonte (ISR de 7 dias, tag `stats`).
 * Campo cuja fonte falha usa `site.stats`: nunca 0, nunca NaN. Roda só no servidor.
 */
export async function getStats(): Promise<Stats> {
  const fb = site.stats;
  const [contas, yt, ment] = await Promise.all([instagram(), youtube(), mentorados()]);
  const ig = site.versoes.map((v) => ({ chave: SEGUIDORES_POR_SLUG[v.slug], ...(contas.get(v.handle.replace(/^@/, "").toLowerCase()) ?? vazio) }));
  const seguidores = (chave: (typeof ig)[number]["chave"]) => ig.find((m) => m.chave === chave)?.valor ?? fb[chave];

  const stats = {
    aliveSeguidores: seguidores("aliveSeguidores"),
    ensinaSeguidores: seguidores("ensinaSeguidores"),
    constroiSeguidores: seguidores("constroiSeguidores"),
    treinaSeguidores: seguidores("treinaSeguidores"),
    ytInscritos: yt.inscritos.valor ?? fb.ytInscritos,
    ytVideos: yt.videos.valor ?? fb.ytVideos,
    mentoradosSeguidores: ment.valor ?? fb.mentoradosSeguidores,
  };

  const datas = [...ig, yt.inscritos, yt.videos, ment]
    .filter((m) => m.valor !== null && m.em)
    .map((m) => Date.parse(m.em!))
    .filter(Number.isFinite);

  return {
    ...stats,
    total: stats.aliveSeguidores + stats.ensinaSeguidores + stats.constroiSeguidores + stats.treinaSeguidores + stats.ytInscritos,
    atualizadoEm: datas.length ? new Date(Math.max(...datas)).toISOString() : null,
  };
}
