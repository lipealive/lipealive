import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Verifica no build se um arquivo existe em /public.
 * Usado para trocar fotos/capas ausentes por placeholder sem quebrar o next/image.
 */
export function publicFileExists(src: string | null | undefined): src is string {
  if (!src) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
