"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { site } from "@/content/site";

type Ctx = { slug: string; setSlug: (slug: string) => void };

const VersaoAtualContext = createContext<Ctx | null>(null);

/**
 * Versão mostrada agora no celular de stories, compartilhada com o painel de senha e o selo.
 * Começa na 1ª versão, então o SSR já sai com "01 Lipe Alive".
 */
export function VersaoAtualProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string>(site.versoes[0].slug);
  return <VersaoAtualContext.Provider value={{ slug, setSlug }}>{children}</VersaoAtualContext.Provider>;
}

/** `null` fora do provider (o celular continua funcionando sozinho). */
export function useVersaoAtual() {
  return useContext(VersaoAtualContext);
}
