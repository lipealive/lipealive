# Lipe Alive — página geral (lipealive.com.br)

## Contexto
- Página do influenciador Lipe (Lipe Alive) na raiz do domínio **https://lipealive.com.br** (`site.url`).
- Objetivo: apresentar as 4 versões do Lipe (Alive, Ensina, Constrói, Treina), os produtos e o contato comercial. Tráfego vem do Instagram: **mobile-first**, página indexável.
- Projeto irmão de referência: `../lipe-lp-financial` (padrões de componentes, motion e config).
- Stack: Next.js 14 (App Router, `src/`, alias `@/*`), Tailwind v3, shadcn inicializado, `motion` (`import ... from "motion/react"`), `lucide-react`.
- Fontes: Bebas Neue (`--font-display` → `font-display`) e Inter (`--font-inter` → `font-sans`).

## Regras
1. **Nenhum texto, link, handle ou número hardcoded**: tudo vem de `src/content/site.ts`.
2. Mobile-first (escreva para 390px, depois `sm:`/`md:`). Fotos são verticais: `object-cover` ancorado no topo (`.object-top-cover`).
3. Todas as imagens via `next/image`. Fotos em `public/fotos/`, capas dos posts em `public/posts/<slug>/01.jpg…04.jpg`. Arquivo ausente = placeholder automático (`publicFileExists`).
4. Tema escuro por tokens em `src/app/globals.css`. Uma cor de acento por versão via `data-accent="alive|ensina|constroi|treina"`; nos componentes use `bg-accent`/`text-accent`, nunca hex solto.
5. Animações leves pelos wrappers de `src/components/motion/` (`FadeIn`, `Stagger`); respeitam `prefers-reduced-motion`.
6. Sem tracking e sem deploy nesta etapa.

## Estrutura
- `src/content/site.ts` — conteúdo tipado (fonte única)
- `src/app/` — layout (SEO, fontes, lang pt-BR), page, globals.css
- `src/components/sections/` — hero, versao (uma dobra por versão), produtos, publicidade
- `src/components/` — header (fixo, atalhos), footer, foto, post-grid, cta-link, icons
- `src/lib/` — `utils.ts` (cn), `assets.ts` (checagem de arquivo em /public)

## Comandos
`npm run dev` · `npm run build` · `npm run lint`
