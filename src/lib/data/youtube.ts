import fallback from "@/content/youtube.json";

export type Video = (typeof fallback.videos)[number];

import { YOUTUBE_TAG } from "@/lib/data/tags";

export { YOUTUBE_TAG };
/** Mesmo canal do scripts/sync-youtube.mjs (que grava o id no JSON). */
export const CHANNEL_ID = fallback.channelId;

const LIMITE = 4;
const REVALIDATE = 3600; // 1 h
const FEEDS = [
  // playlist "UULF…": só vídeos longos do canal (sem Shorts)
  `https://www.youtube.com/feeds/videos.xml?playlist_id=UULF${CHANNEL_ID.slice(2)}`,
  // canal inteiro, filtrando os links /shorts/
  `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
];

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function lerFeed(xml: string): Video[] {
  return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)).flatMap(([, e]) => {
    const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const link = e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
    if (!id || link.includes("/shorts/")) return [];
    return [
      {
        id,
        title: decode(e.match(/<title>([^<]+)<\/title>/)?.[1] ?? ""),
        published: e.match(/<published>([^<]+)<\/published>/)?.[1] ?? "",
        url: `https://www.youtube.com/watch?v=${id}`,
        thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      },
    ];
  });
}

/**
 * Os 4 vídeos mais recentes do canal (sem Shorts), via RSS público com ISR de 1 h.
 * Se o RSS falhar ou vier vazio, usa src/content/youtube.json (completa até 4 com ele).
 */
export async function getVideos(): Promise<Video[]> {
  let videos: Video[] = [];
  for (const url of FEEDS) {
    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE, tags: [YOUTUBE_TAG] } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      videos = lerFeed(await res.text());
      if (videos.length > 0) break;
      console.error(`[youtube] feed sem vídeos: ${url}`);
    } catch (e) {
      console.error(`[youtube] ${url}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  const ids = new Set(videos.map((v) => v.id));
  return [...videos, ...fallback.videos.filter((v) => !ids.has(v.id))].slice(0, LIMITE);
}
