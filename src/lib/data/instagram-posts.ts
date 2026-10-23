import { ler } from "@/lib/data/fetch";
import { contasInstagram, GRAPH } from "@/lib/data/meta";
import { INSTAGRAM_TAG } from "@/lib/data/tags";

export type InstagramPost = {
  id: string;
  tipo: "imagem" | "reel" | "carrossel";
  /** URL da imagem (CDN do Instagram, assinada) ou foto local no fallback. */
  imagem: string;
  /** object-position da foto (só no fallback). */
  posicao?: string;
  permalink: string;
  legenda: string;
  /** ISO; ausente no fallback. */
  timestamp?: string;
  /** Ausente quando as curtidas estão ocultas. */
  curtidas?: number;
  comentarios?: number;
};

type Midia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  caption?: string;
  timestamp?: string;
  like_count?: number;
  comments_count?: number;
  children?: { data?: { media_type?: string; media_url?: string; thumbnail_url?: string }[] };
};

/**
 * 3 dias: o Lipe posta pouco no feed. As URLs do CDN são assinadas e expiram (parâmetro `oe`,
 * unix em hex); em 23/10/2026 vinham com ~4,3 a 4,5 dias de validade, acima dos 3 dias.
 * Se alguma vencer antes, o mural troca pela foto local (MuralImagem, onError).
 */
const REVALIDATE = 259200;
const BUSCAR = 12;

/** "2026-10-15T02:43:34+0000" → ISO; inválido vira `undefined` (sem data no mural). */
const iso = (t?: string) => (t && Number.isFinite(Date.parse(t)) ? new Date(t).toISOString() : undefined);
const conta = (n: unknown) => (typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : undefined);

/** Imagem de capa: IMAGE → media_url; VIDEO/Reel → thumbnail_url; carrossel → 1º item (thumb se for vídeo). */
function capa(m: Midia) {
  if (m.media_type === "VIDEO") return m.thumbnail_url;
  if (m.media_type === "CAROUSEL_ALBUM") {
    const primeiro = m.children?.data?.[0];
    if (primeiro) return primeiro.media_type === "VIDEO" ? primeiro.thumbnail_url : primeiro.media_url;
  }
  return m.media_url;
}

/**
 * Posts mais recentes de um perfil do portfólio (`username` sem @), via Instagram Graph API
 * com ISR de 3 dias (tag `instagram`). O id da conta vem de me/accounts (cache de 7 dias).
 * Sem META_TOKEN, perfil fora do portfólio ou erro: devolve `fallback` (erro vai para o log).
 */
export async function getInstagramPosts(username: string, fallback: readonly InstagramPost[], limite = 6): Promise<InstagramPost[]> {
  const token = process.env.META_TOKEN;
  if (!token) return fallback.slice(0, limite);

  const id = (await contasInstagram())?.contas.get(username.toLowerCase())?.id;
  if (!id) return fallback.slice(0, limite);

  const params = new URLSearchParams({
    fields: "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,like_count,comments_count,children{media_type,media_url,thumbnail_url}",
    limit: String(BUSCAR),
    access_token: token,
  });
  const r = await ler<{ data?: Midia[] }>(`[instagram] @${username}`, `${GRAPH}/${id}/media?${params}`, { revalidate: REVALIDATE, tags: [INSTAGRAM_TAG] });

  const posts = (r?.data.data ?? []).flatMap((m): InstagramPost[] => {
    const imagem = capa(m);
    if (!imagem || !m.permalink) return [];
    return [
      {
        id: m.id,
        tipo: m.media_type === "VIDEO" ? "reel" : m.media_type === "CAROUSEL_ALBUM" ? "carrossel" : "imagem",
        imagem,
        permalink: m.permalink,
        legenda: m.caption ?? "",
        timestamp: iso(m.timestamp),
        curtidas: conta(m.like_count),
        comentarios: conta(m.comments_count),
      },
    ];
  });

  if (posts.length === 0) {
    if (r) console.error(`[instagram] @${username}: nenhum post com imagem`);
    return fallback.slice(0, limite);
  }
  // menos posts que o pedido: completa com o fallback para o mural não ficar furado
  return [...posts, ...fallback].slice(0, limite);
}
