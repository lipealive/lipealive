"use client";

import Image from "next/image";
import { useState } from "react";

type Foto = { src: string; posicao?: string };

/**
 * Foto do mural com rede de segurança: se a URL do CDN do Instagram expirou (ou falhou),
 * troca pela foto local de reserva. O tamanho vem da moldura (fill), então o layout não muda.
 */
export function MuralImagem({ foto, reserva, alt, sizes }: { foto: Foto; reserva: Foto; alt: string; sizes: string }) {
  const [falhou, setFalhou] = useState(false);
  const atual = falhou ? reserva : foto;
  return (
    <Image
      key={atual.src}
      src={atual.src}
      alt={alt}
      fill
      sizes={sizes}
      loading="lazy"
      className="object-cover"
      style={{ objectPosition: atual.posicao }}
      onError={falhou ? undefined : () => setFalhou(true)}
    />
  );
}
