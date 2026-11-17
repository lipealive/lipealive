import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { publicFileExists } from "@/lib/assets";

/** Barras do equalizador: altura, duração e atraso diferentes para cada uma. */
const EQ = [
  { h: "55%", d: "0.9s", a: "0s" },
  { h: "85%", d: "1.15s", a: "-0.3s" },
  { h: "40%", d: "0.75s", a: "-0.5s" },
  { h: "100%", d: "1.3s", a: "-0.1s" },
  { h: "65%", d: "0.85s", a: "-0.7s" },
  { h: "90%", d: "1.05s", a: "-0.2s" },
];

function Equalizador({ inverter = false }: { inverter?: boolean }) {
  const barras = inverter ? [...EQ].reverse() : EQ;
  return (
    <span aria-hidden className="mb-6 flex h-20 items-end gap-1 sm:h-28 sm:gap-1.5">
      {barras.map((b, i) => (
        <span key={i} className="eq-barra block w-1.5 rounded-full bg-ink sm:w-2.5" style={{ height: b.h, "--eq-dur": b.d, "--eq-delay": b.a } as CSSProperties} />
      ))}
    </span>
  );
}

/* Geometria do fone no viewBox 240x150: (120, 116) é o centro da cabeça; as conchas ficam
   centradas em x=44 e x=196, um pouco para fora da borda da cabeça. */
const VB = { w: 240, h: 150, cx: 120, cy: 116, entreConchas: 152 };

/**
 * Bonecos palito sobre um cartão creme levemente torto (o PNG tem halo claro e não vai direto
 * no verde), com um fone de ouvido em traço de marcador na cabeça do boneco maior, ondas de som
 * saindo das conchas e equalizador em volta. Encaixe em `site.spotify.fone`. Sem o PNG, placeholder.
 */
export function BonecoFone() {
  const { boneco, fone } = site.spotify;
  const temBoneco = publicFileExists(boneco.src);
  // % da largura da imagem por unidade do viewBox: a distância entre as conchas ≈ 1,15 × diâmetro da cabeça
  const k = (2 * fone.raio * 1.15) / VB.entreConchas;

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-8">
      <Equalizador />

      <div className="rotate-[1.5deg] bg-creme p-3 shadow-[0_22px_40px_-18px_rgba(0,0,0,0.55)] sm:p-5">
        <div className="relative w-[200px] sm:w-[340px]" style={{ aspectRatio: `${boneco.width} / ${boneco.height}` }}>
          {temBoneco ? (
            <Image src={boneco.src} alt={boneco.alt} fill sizes="(min-width: 640px) 340px, 200px" className="object-contain" />
          ) : (
            <span className="absolute inset-[10%] flex items-center justify-center rounded-full border-[3px] border-dashed border-ink/60 text-center font-display text-xl uppercase text-ink/70">
              {boneco.placeholder}
            </span>
          )}

          {/* fone de ouvido em traço de marcador + ondas de som (margens em % usam a largura) */}
          <svg
            aria-hidden
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="absolute overflow-visible"
            style={{
              left: `${fone.x}%`,
              top: `${fone.y}%`,
              width: `${VB.w * k}%`,
              marginLeft: `-${VB.cx * k}%`,
              marginTop: `-${VB.cy * k}%`,
              transform: `scale(${fone.escala})`,
              transformOrigin: `${(VB.cx / VB.w) * 100}% ${(VB.cy / VB.h) * 100}%`,
            }}
            fill="none"
            stroke="#0b0b0c"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M42 104 C 36 62, 68 34, 120 33 C 172 32, 204 62, 198 104" strokeWidth="9" />
            <path d="M52 96 C 50 66, 78 44, 118 43" strokeWidth="2.5" opacity="0.45" />
            <rect x="26" y="86" width="36" height="58" rx="13" fill="#0b0b0c" strokeWidth="4" transform="rotate(-6 44 115)" />
            <rect x="178" y="86" width="36" height="58" rx="13" fill="#0b0b0c" strokeWidth="4" transform="rotate(6 196 115)" />
            {[0, 1, 2].map((i) => (
              <g key={i} strokeWidth="5">
                <path className="onda" style={{ "--onda-delay": `${i * 0.35}s`, "--onda-origem": "right center" } as CSSProperties} d={`M${14 - i * 12} ${98 - i * 6} q ${-10 - i * 4} ${16 + i * 6} 0 ${32 + i * 12}`} />
                <path className="onda" style={{ "--onda-delay": `${i * 0.35}s`, "--onda-origem": "left center" } as CSSProperties} d={`M${226 + i * 12} ${98 - i * 6} q ${10 + i * 4} ${16 + i * 6} 0 ${32 + i * 12}`} />
              </g>
            ))}
          </svg>
        </div>
      </div>

      <Equalizador inverter />
    </div>
  );
}
