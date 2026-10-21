/**
 * Gera favicon e ícones da página a partir de scripts/lib/brand.mjs.
 * Rode com `npm run build:icons`. Saídas:
 *   src/app/icon.svg          versão simples ("L" + barra laranja), usada na aba
 *   src/app/favicon.ico       16 e 32 (simples) + 48 (4 barras)
 *   src/app/apple-icon.png    180x180, fundo preto opaco
 *   public/icon-192.png, public/icon-512.png
 *   public/icon-maskable-512.png (conteúdo dentro da safe zone de 80%)
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { ROOT, COLORS, iconSvg } from "./lib/brand.mjs";

const out = (...p) => path.join(ROOT, ...p);

async function png(svg, size, { opaque = false } = {}) {
  let img = sharp(Buffer.from(svg), { density: 384 }).resize(size, size);
  if (opaque) img = img.flatten({ background: COLORS.bg });
  return img.png({ compressionLevel: 9 }).toBuffer();
}

/** ICO com entradas PNG (aceito por todos os navegadores atuais). */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}

const simple = iconSvg({ variant: "simple" });
const full = iconSvg({ variant: "full" });

await writeFile(out("src/app/icon.svg"), simple + "\n");

await writeFile(
  out("src/app/favicon.ico"),
  ico([
    { size: 16, data: await png(simple, 16) },
    { size: 32, data: await png(simple, 32) },
    { size: 48, data: await png(full, 48) },
  ]),
);

// Apple: fundo cheio e opaco (o iOS arredonda), conteúdo um pouco menor
await writeFile(out("src/app/apple-icon.png"), await png(iconSvg({ variant: "full", shape: "square", scale: 0.9 }), 180, { opaque: true }));

await writeFile(out("public/icon-192.png"), await png(full, 192));
await writeFile(out("public/icon-512.png"), await png(full, 512));
// Maskable: fundo cheio; conteúdo cabe no círculo de raio 40% (safe zone)
await writeFile(out("public/icon-maskable-512.png"), await png(iconSvg({ variant: "full", shape: "square", scale: 0.78 }), 512, { opaque: true }));

console.log("OK: ícones gerados");
