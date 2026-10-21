import { cn } from "@/lib/utils";

const R = 38; // raio do texto no viewBox 100x100
const VOLTA = 2 * Math.PI * R;

/**
 * Selo circular com texto em volta (SVG textPath) girando devagar; o centro usa a cor
 * do `data-accent` mais próximo (dentro do celular, a versão do story atual).
 * Estático com reduced-motion.
 */
export function Selo({ texto, className }: { texto: string; className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none block aspect-square rounded-full bg-ink shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] ring-1 ring-white/15", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="selo-volta" d={`M50 ${50 - R} a${R} ${R} 0 1 1 0 ${2 * R} a${R} ${R} 0 1 1 0 ${-2 * R}`} />
        </defs>
        <g className="selo-gira">
          <text className="fill-white font-display text-[13px] uppercase">
            <textPath href="#selo-volta" textLength={VOLTA - 1} lengthAdjust="spacing">
              {texto}
            </textPath>
          </text>
        </g>
        <circle cx="50" cy="50" r="24" className="fill-accent transition-[fill] duration-500" />
      </svg>
    </span>
  );
}
