import { site } from "@/content/site";
import { ler } from "@/lib/data/fetch";
import { PODCAST_TAG } from "@/lib/data/tags";

export type Episodio = {
  numero: number | null;
  titulo: string;
  /** ISO; ausente no fallback. */
  data?: string;
  /** Segundos. */
  duracao: number;
  descricao?: string;
  /** ID do episódio no Spotify; sem ele o play abre o show. */
  spotifyId?: string;
  link: string;
};

const REVALIDATE = 259200; // 3 dias
const LIMITE = 5;
const cache = { revalidate: REVALIDATE, tags: [PODCAST_TAG] };

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/** "Título |EP.66|" → { numero: 66, titulo: "Título" }. */
export function separarNumero(bruto: string) {
  const m = bruto.match(/\|?\s*EP\.?\s*(\d+)\s*\|?/i);
  return { numero: m ? Number(m[1]) : null, titulo: (m ? bruto.replace(m[0], "") : bruto).trim() };
}

/** "00:09:24", "9:24" ou "564" → segundos. */
function segundos(t: string) {
  return t.split(":").reduce((acc, p) => acc * 60 + Number(p), 0) || 0;
}

/** a) Feed RSS público (Spotify for Creators/anchor.fm), quando houver `site.spotify.rss`. */
async function doRss(url: string): Promise<Episodio[]> {
  const r = await ler<string>("[podcast] rss", url, cache, "text");
  if (!r) return [];
  return Array.from(r.data.matchAll(/<item>([\s\S]*?)<\/item>/g)).flatMap(([, it]) => {
    const tag = (n: string) => decode(it.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)</${n}>`))?.[1] ?? "").trim();
    const { numero, titulo } = separarNumero(tag("title"));
    if (!titulo) return [];
    const data = Date.parse(tag("pubDate"));
    const descricao = tag("description").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return [
      {
        numero,
        titulo,
        data: Number.isFinite(data) ? new Date(data).toISOString() : undefined,
        duracao: segundos(tag("itunes:duration")),
        descricao: descricao ? descricao.slice(0, 160) : undefined,
        link: tag("link") || site.spotify.url,
      },
    ];
  });
}

type EmbedEntidade = { id?: string; name?: string; title?: string; duration?: number; releaseDate?: { isoString?: string } };

/** b) Página de embed do show: traz o episódio mais recente (com ID do Spotify). */
async function doEmbed(): Promise<Episodio | null> {
  const r = await ler<string>("[podcast] embed", `https://open.spotify.com/embed/show/${site.spotify.showId}`, cache, "text");
  const json = r?.data.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  if (!json) {
    if (r) console.error("[podcast] embed: __NEXT_DATA__ não encontrado");
    return null;
  }
  try {
    const e = (JSON.parse(json) as { props?: { pageProps?: { state?: { data?: { entity?: EmbedEntidade } } } } }).props?.pageProps?.state?.data?.entity;
    if (!e?.id || !(e.title ?? e.name)) throw new Error("episódio sem id/título");
    const { numero, titulo } = separarNumero(e.title ?? e.name ?? "");
    return {
      numero,
      titulo,
      data: e.releaseDate?.isoString,
      duracao: Math.round((e.duration ?? 0) / 1000),
      spotifyId: e.id,
      link: `https://open.spotify.com/episode/${e.id}`,
    };
  } catch (err) {
    console.error(`[podcast] embed: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

/** c) Episódios fixos do site.ts (sem ID: o play abre o show). */
const fallback: Episodio[] = site.spotify.episodios.map((e) => ({ ...e, link: site.spotify.url }));

/**
 * Os 5 episódios mais recentes, ISR de 3 dias (tag `podcast`). Ordem: (a) RSS público, se existir;
 * (b) embed do show (episódio mais recente, com ID) completado pelo fallback; (c) fallback.
 * Nunca quebra a página: erro vai para o log.
 */
export async function getEpisodios(): Promise<Episodio[]> {
  if (site.spotify.rss) {
    const rss = await doRss(site.spotify.rss);
    if (rss.length) return rss.slice(0, LIMITE);
  }
  const recente = await doEmbed();
  const resto = fallback.filter((e) => !recente || e.numero !== recente.numero);
  return (recente ? [recente, ...resto] : fallback).slice(0, LIMITE);
}
