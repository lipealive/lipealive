/**
 * Utilitários de marca para os scripts de imagem (ícones e og.jpg).
 * Texto em Bebas Neue vira <path> via opentype.js: o SVG não depende de fonte instalada.
 */
import opentype from "opentype.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(here, "../..");
export const bebas = opentype.loadSync(path.join(here, "../fonts/BebasNeue-Regular.ttf"));

/** Cores (iguais a src/app/globals.css). */
export const COLORS = {
  bg: "#0b0b0b",
  white: "#ffffff",
  muted: "#a3a3a3",
  alive: "#FF5A1F",
  ensina: "#0070D6",
  constroi: "#FFC400",
  treina: "#E11D2E",
};
export const VERSION_COLORS = [COLORS.alive, COLORS.ensina, COLORS.constroi, COLORS.treina];

/** Largura de um texto em px (com kerning e tracking em px). */
export function measure(text, size, tracking = 0) {
  const scale = size / bebas.unitsPerEm;
  const glyphs = bebas.stringToGlyphs(text);
  let w = 0;
  glyphs.forEach((g, i) => {
    w += g.advanceWidth * scale;
    if (i < glyphs.length - 1) w += bebas.getKerningValue(g, glyphs[i + 1]) * scale + tracking;
  });
  return w;
}

/** Path SVG ("d") de um texto com baseline em (x, y). */
export function textPath(text, x, y, size, tracking = 0) {
  const scale = size / bebas.unitsPerEm;
  const glyphs = bebas.stringToGlyphs(text);
  let cx = x;
  let d = "";
  glyphs.forEach((g, i) => {
    d += g.getPath(cx, y, size).toPathData(2);
    cx += g.advanceWidth * scale;
    if (i < glyphs.length - 1) cx += bebas.getKerningValue(g, glyphs[i + 1]) * scale + tracking;
  });
  return d;
}

/** Garante que todos os caracteres existem na fonte (sem .notdef). */
export function assertGlyphs(text) {
  for (const g of bebas.stringToGlyphs(text)) {
    if (g.index === 0) throw new Error(`Bebas Neue não tem glifo para algum caractere de "${text}"`);
  }
}

/** Altura de maiúscula da Bebas em px. */
export function capHeight(size) {
  const os2 = bebas.tables.os2;
  return ((os2 && os2.sCapHeight) || 700) * (size / bebas.unitsPerEm);
}

/**
 * Ícone da marca em SVG (viewBox 512).
 * - variant "full": "L" + 4 barrinhas nas cores das versões (barra de stories).
 * - variant "simple": "L" mais grosso + 1 barra laranja (legível em 16/32px).
 * - shape "rounded": quadrado preto arredondado; "square": fundo cheio (apple/maskable, o SO arredonda).
 * - scale: encolhe o conteúdo em torno do centro (safe zone do maskable).
 */
export function iconSvg({ variant = "full", shape = "rounded", scale = 1 } = {}) {
  const S = 512;
  const simple = variant === "simple";
  // "L" ocupa uma caixa de altura fixa
  const lTop = simple ? 64 : 76;
  const lHeight = simple ? 300 : 276;
  const fontSize = lHeight / (capHeight(1000) / 1000);
  const glyph = bebas.charToGlyph("L");
  const p0 = glyph.getPath(0, 0, fontSize);
  const bb = p0.getBoundingBox();
  const lW = bb.x2 - bb.x1;
  const gx = S / 2 - lW / 2 - bb.x1;
  const gy = lTop - bb.y1; // y1 é negativo (acima da baseline)
  const lPath = glyph.getPath(gx, gy, fontSize).toPathData(2);
  // traço engrossa a Bebas (fina em tamanho de ícone)
  const stroke = ` stroke="${COLORS.white}" stroke-width="${simple ? 22 : 10}" stroke-linejoin="miter"`;

  const barsTop = lTop + lHeight + (simple ? 40 : 36);
  const barH = simple ? 60 : 44;
  let bars = "";
  if (simple) {
    bars = `<rect x="96" y="${barsTop}" width="320" height="${barH}" rx="${barH / 2}" fill="${COLORS.alive}"/>`;
  } else {
    const total = 336, gap = 16, w = (total - gap * 3) / 4, x0 = (S - total) / 2;
    bars = VERSION_COLORS.map((c, i) => `<rect x="${x0 + i * (w + gap)}" y="${barsTop}" width="${w}" height="${barH}" rx="${barH / 2}" fill="${c}"/>`).join("");
  }

  const bg = shape === "rounded"
    ? `<rect width="${S}" height="${S}" rx="112" fill="${COLORS.bg}"/>`
    : `<rect width="${S}" height="${S}" fill="${COLORS.bg}"/>`;
  const t = scale === 1 ? "" : ` transform="translate(${(S * (1 - scale)) / 2} ${(S * (1 - scale)) / 2}) scale(${scale})"`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">${bg}<g${t}><path d="${lPath}" fill="${COLORS.white}"${stroke}/>${bars}</g></svg>`;
}
