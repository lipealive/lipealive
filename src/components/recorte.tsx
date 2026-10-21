import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Recorte as RecorteData } from "@/content/site";

type RecorteProps = {
  recorte: RecorteData;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Recorte sem fundo (WebP) com dimensões reais: sem layout shift. */
export function Recorte({ recorte, className, sizes = "(min-width: 768px) 40vw, 80vw", priority = false }: RecorteProps) {
  return (
    <Image
      src={recorte.src}
      alt={recorte.alt}
      width={recorte.width}
      height={recorte.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("h-auto w-full select-none", className)}
      draggable={false}
    />
  );
}
