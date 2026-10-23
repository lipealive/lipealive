export type Lido<T> = { data: T; em: string | null };

/**
 * GET com cache do Next (`revalidate` + `tags`). Erro vira log no servidor (`rotulo: mensagem`)
 * e `null`, nunca derruba a página. `em` é o header `date` da resposta (preservado no cache).
 */
export async function ler<T>(rotulo: string, url: string, cache: { revalidate: number; tags: string[] }, tipo: "json" | "text" = "json"): Promise<Lido<T> | null> {
  try {
    const res = await fetch(url, { next: cache });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).replace(/\s+/g, " ").slice(0, 200)}`);
    const data = (tipo === "json" ? await res.json() : await res.text()) as T;
    return { data, em: res.headers.get("date") };
  } catch (e) {
    console.error(`${rotulo}: ${e instanceof Error ? e.message : String(e)}`);
    return null;
  }
}
