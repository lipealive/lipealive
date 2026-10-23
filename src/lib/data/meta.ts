import { ler } from "@/lib/data/fetch";
import { STATS_TAG } from "@/lib/data/tags";

export const GRAPH = "https://graph.facebook.com/v21.0";

export type ContaInstagram = { id: string; username: string; followers_count?: unknown };

/**
 * Contas do Instagram ligadas às páginas do portfólio, numa única chamada a me/accounts
 * (cache de 7 dias, tag `stats`), mapeadas por username em minúsculas. Usada pelos números
 * (seguidores) e pelo mural de posts (id da conta). Sem META_TOKEN: `null`, sem erro.
 */
export async function contasInstagram(): Promise<{ contas: Map<string, ContaInstagram>; em: string | null } | null> {
  const token = process.env.META_TOKEN;
  if (!token) return null;
  const params = new URLSearchParams({ fields: "instagram_business_account{id,username,followers_count,media_count}", limit: "100", access_token: token });
  const r = await ler<{ data?: { instagram_business_account?: Partial<ContaInstagram> }[] }>("[stats] instagram", `${GRAPH}/me/accounts?${params}`, {
    revalidate: 604800,
    tags: [STATS_TAG],
  });
  if (!r) return null;
  const contas = new Map<string, ContaInstagram>();
  for (const { instagram_business_account: ig } of r.data.data ?? []) {
    if (ig?.id && ig.username) contas.set(ig.username.toLowerCase(), { id: ig.id, username: ig.username, followers_count: ig.followers_count });
  }
  return { contas, em: r.em };
}
