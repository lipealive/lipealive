/**
 * Gera a imagem de compartilhamento estática public/og.jpg (1200x630, < 300 KB).
 * Rode com `npm run build:og`. Estática de propósito: o WhatsApp ignora imagens
 * pesadas e às vezes falha com rotas dinâmicas.
 *
 * Composição: fundo preto; texto à esquerda; 4 tiras verticais à direita
 * (Alive, Ensina, Constrói, Treina), cada uma com a foto, a cor e o nome da versão.
 * Zona segura: headline e as duas primeiras tiras ficam dentro do quadrado
 * central de 630x630 (x 285 a 915), para plataformas que cortam em quadrado.
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";
import { ROOT, COLORS, measure, textPath, capHeight, assertGlyphs, iconSvg } from "./lib/brand.mjs";

const W = 1200;
const H = 630;
const MAX_BYTES = 300 * 1024;
const OUT = path.join(ROOT, "public/og.jpg");

const TEXT = {
  headline: ["QUANTAS", "VERSÕES", "DE VOCÊ", "EXISTEM?"],
  prova: "+2 MILHÕES DE SEGUIDORES",
  dominio: "LIPEALIVE.COM.BR",
};

/** Tiras: foto, cor, rótulo e enquadramento (foco no rosto, em fração da foto; zoom sobre "altura = 630"). */
const STRIPS = [
  { file: "lipe-marina.jpg", color: COLORS.alive, label: "ALIVE", fx: 0.48, fy: 0.33, zoom: 1.9, faceAt: 0.3, ink: true },
  { file: "lipe-close.jpg", color: COLORS.ensina, label: "ENSINA", fx: 0.6, fy: 0.27, zoom: 1.15, faceAt: 0.3 },
  { file: "lipe-obra-capacete.jpg", color: COLORS.constroi, label: "CONSTRÓI", fx: 0.79, fy: 0.55, zoom: 1.05, faceAt: 0.42, ink: true },
  { file: "lipe-treino.jpg", color: COLORS.treina, label: "TREINA", fx: 0.5, fy: 0.2, zoom: 1.45, faceAt: 0.24 },
];

// ---- layout ----
const SAFE_X0 = (W - H) / 2; // 285
const TEXT_X = SAFE_X0 + 16; // texto começa dentro da zona segura
const STRIPS_X = 640;
const GAP = 6;
const STRIP_W = Math.floor((W - STRIPS_X - GAP * 3) / 4);
const BAND_H = 92; // faixa de cor com o nome da versão

async function strip({ file, color, label, fx, fy, zoom, faceAt, ink }) {
  const src = sharp(path.join(ROOT, "public/fotos", file));
  const meta = await src.metadata();
  const h = Math.round(H * zoom);
  const w = Math.round((meta.width / meta.height) * h);
  const left = Math.min(Math.max(0, Math.round(fx * w - STRIP_W / 2)), w - STRIP_W);
  const top = Math.min(Math.max(0, Math.round(fy * h - faceAt * H)), h - H);
  const photo = await src.resize(w, h).extract({ left, top, width: STRIP_W, height: H }).toBuffer();

  // rótulo: até 40px, sempre com respiro lateral
  let size = 40;
  while (measure(label, size, 1.5) > STRIP_W - 28) size -= 1;
  const tw = measure(label, size, 1.5);
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${STRIP_W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.45" stop-color="${color}" stop-opacity="0"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0.55"/>
    </linearGradient></defs>
    <rect width="${STRIP_W}" height="${H}" fill="url(#g)"/>
    <rect y="0" width="${STRIP_W}" height="8" fill="${color}"/>
    <rect y="${H - BAND_H}" width="${STRIP_W}" height="${BAND_H}" fill="${color}"/>
    <path d="${textPath(label, (STRIP_W - tw) / 2, H - BAND_H / 2 + capHeight(size) / 2, size, 1.5)}" fill="${ink ? COLORS.bg : COLORS.white}"/>
  </svg>`;
  return sharp(photo).composite([{ input: Buffer.from(overlay) }]).toBuffer();
}

function textBlock() {
  Object.values(TEXT).flat().forEach(assertGlyphs);
  const maxW = STRIPS_X - 40 - TEXT_X;

  // headline: maior tamanho que cabe na coluna
  let hs = 120;
  while (Math.max(...TEXT.headline.map((l) => measure(l, hs))) > maxW) hs -= 1;
  const step = hs * 0.9;
  const cap = capHeight(hs);

  let ps = 46;
  while (measure(TEXT.prova, ps, 0.5) > maxW) ps -= 1;
  const ds = 24;

  const blockH = cap + step * (TEXT.headline.length - 1) + 30 + capHeight(ps) + 22 + capHeight(ds);
  let y = (H - blockH) / 2 + cap;
  let paths = "";
  TEXT.headline.forEach((l, i) => {
    paths += `<path d="${textPath(l, TEXT_X, y + i * step, hs)}" fill="${COLORS.white}"/>`;
  });
  y += step * (TEXT.headline.length - 1) + 30 + capHeight(ps);
  paths += `<path d="${textPath(TEXT.prova, TEXT_X, y, ps, 0.5)}" fill="${COLORS.alive}"/>`;
  y += 22 + capHeight(ds);
  paths += `<path d="${textPath(TEXT.dominio, TEXT_X, y, ds, 3)}" fill="${COLORS.muted}"/>`;
  return { paths, hs, ps };
}

// ---- monta ----
const { paths, hs, ps } = textBlock();

// marca (ícone) na margem esquerda, fora da zona segura
const MARK = 132;
const mark = await sharp(Buffer.from(iconSvg({ variant: "full" })), { density: 200 }).resize(MARK, MARK).png().toBuffer();

const base = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${COLORS.bg}"/>
  ${paths}
</svg>`;

const strips = await Promise.all(STRIPS.map(strip));
const img = sharp(Buffer.from(base)).composite([
  { input: mark, left: Math.round((SAFE_X0 - MARK) / 2), top: Math.round((H - MARK) / 2) },
  ...strips.map((s, i) => ({ input: s, left: STRIPS_X + i * (STRIP_W + GAP), top: 0 })),
]);

let quality = 84;
let buf;
do {
  buf = await img.clone().jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" }).toBuffer();
  quality -= 4;
} while (buf.length > MAX_BYTES && quality > 50);
await sharp(buf).toFile(OUT);

const { size } = await stat(OUT);
console.log(`OK: public/og.jpg ${W}x${H}, ${(size / 1024).toFixed(0)} KB (headline ${hs}px, prova ${ps}px)`);
if (size > MAX_BYTES) throw new Error("og.jpg passou de 300 KB");
