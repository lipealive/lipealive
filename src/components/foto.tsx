import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicFileExists } from "@/lib/assets";
import { site, type Foto as FotoData } from "@/content/site";

type FotoProps = {
  foto: FotoData;
  /** Proporção do contêiner (classe Tailwind). */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Foto vertical com next/image: object-cover ancorado no topo para não cortar a cabeça.
 * Se o arquivo não existir em /public, mostra um placeholder.
 */
export function Foto({ foto, aspect = "aspect-[4/5]", sizes = "(min-width: 768px) 50vw, 100vw", priority = false, className }: FotoProps) {
  const src = publicFileExists(foto.src) ? foto.src : null;

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg bg-surface", aspect, className)}>
      {src ? (
        <Image
          src={src}
          alt={foto.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-top-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={foto.alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-2 to-surface text-muted-foreground"
        >
          <ImageOff className="size-8" aria-hidden />
          <span className="text-xs font-medium uppercase tracking-widest">{site.ui.emBreveFoto}</span>
        </div>
      )}
    </div>
  );
}
