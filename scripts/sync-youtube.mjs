/**
 * Lê o RSS público do canal @LipeAlive e grava os 4 vídeos mais recentes em
 * src/content/youtube.json. Roda manualmente: `npm run sync:youtube`.
 * Nada em tempo real: a página usa o JSON commitado.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const CHANNEL_ID = "UC4tiGdOtiYrhUExdNB83Fdg"; // youtube.com/@LipeAlive
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const LIMIT = 4;
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/content/youtube.json");

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const res = await fetch(FEED, { headers: { "user-agent": "Mozilla/5.0 (sync-youtube)" } });
if (!res.ok) throw new Error(`RSS falhou: ${res.status}`);
const xml = await res.text();

const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
  const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
  const title = decode(e.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
  const published = e.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
  return { id, title, published, url: `https://www.youtube.com/watch?v=${id}`, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
});

const videos = entries.filter((v) => v.id).slice(0, LIMIT);
if (videos.length === 0) throw new Error("Nenhum vídeo encontrado no RSS");

await writeFile(OUT, JSON.stringify({ channelId: CHANNEL_ID, syncedAt: new Date().toISOString(), videos }, null, 2) + "\n");
console.log(`OK: ${videos.length} vídeos gravados em ${path.relative(process.cwd(), OUT)}`);
videos.forEach((v) => console.log(` - ${v.title}`));
