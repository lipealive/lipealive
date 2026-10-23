import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { STATS_TAG } from "@/lib/data/stats";
import { YOUTUBE_TAG } from "@/lib/data/youtube";

export const dynamic = "force-dynamic";

const TAGS = [STATS_TAG, YOUTUBE_TAG];

/** Segredo no header `x-revalidate-secret` ou em `?secret=`. Sem REVALIDATE_SECRET a rota fica fechada. */
function autorizado(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;
  const a = Buffer.from(req.headers.get("x-revalidate-secret") ?? req.nextUrl.searchParams.get("secret") ?? "");
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Força a atualização dos dados na hora: invalida as tags `stats` e `youtube` (ou só `?tag=`),
 * e a página é regerada na próxima visita.
 *   curl -X POST -H "x-revalidate-secret: $REVALIDATE_SECRET" https://lipealive.com.br/api/revalidate
 */
async function handler(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const tag = req.nextUrl.searchParams.get("tag");
  const tags = tag ? TAGS.filter((t) => t === tag) : TAGS;
  if (tags.length === 0) return NextResponse.json({ ok: false, error: `tag inválida (use ${TAGS.join(" ou ")})` }, { status: 400 });
  tags.forEach((t) => revalidateTag(t));
  return NextResponse.json({ ok: true, revalidated: tags, now: new Date().toISOString() });
}

export { handler as GET, handler as POST };
