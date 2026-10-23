# Lipe Alive — página geral (lipealive.com.br)

## Contexto
- Página do influenciador Lipe (Lipe Alive) na raiz de **https://lipealive.com.br** (`site.url`).
- Conceito: **"Quantas versões de você existem?"** (título de um vídeo do Lipe). A página é um "select de personagem": cada versão toma a tela com a SUA cor chapada, o Lipe recortado na frente e o handle gigante atrás.
- Repositório: **github.com/lipealive/lipealive** (remote `https://lipealive@github.com/lipealive/lipealive.git`).
- Tráfego vem do Instagram (celular, 4G): **mobile-first**, indexável, leve (só `motion` + CSS, sem three.js).
- Projeto irmão de referência: `../lipe-lp-financial`.
- Stack: Next.js 14 (App Router, `src/`, alias `@/*`), Tailwind v3, shadcn inicializado, `motion` (`import ... from "motion/react"`), `lucide-react`.
- Fontes: Bebas Neue (`font-display`), Inter (`font-sans`) e Scritture Grotesk (`font-ensina`, fonte real do site Lipe Ensina, arquivos em `src/app/fonts/`).

## Regras
1. **Conteúdo renderiza VISÍVEL no SSR; animação só melhora a página.** Nunca comece com `opacity: 0` no HTML. Use `Reveal` (esconde só depois da hidratação e só fora da viewport), `Senha` (SSR mostra o valor final) e CSS para marquee/ECG/CAD. Teste com JS desligado.
2. **Nenhum texto, link, handle ou número hardcoded**: textos e links vêm de `src/content/site.ts`. Números (seguidores, inscritos, mentorados, total) vêm de `getStats()` em `src/lib/data/stats.ts` e vídeos de `getVideos()` em `src/lib/data/youtube.ts`, buscados no servidor com ISR (`fetch` + `revalidate`, nada no cliente). Fallbacks: `site.stats` e `src/content/youtube.json` (`npm run sync:youtube`). Formatação em `src/lib/numeros.ts` (`exato`, `compacto` arredondando para baixo, `totalArredondado`).
3. Mobile-first (390px primeiro). Grids que têm filhos com scroll horizontal precisam de `grid-cols-1` (senão a coluna estoura). Sem scroll horizontal em 390px.
4. Imagens via `next/image`. Fotos em `public/fotos/`, recortes WebP sem fundo em `public/fotos/recortes/` (tipo `Recorte`, com width/height), marcas em `public/marcas/{lipe-ensina,alive-finance}/`. Fotos do Constrói: `lipe-obra-pickup.jpg` (principal) e `lipe-obra-capacete.jpg` (rosto à direita: use object-position ~78% 45%). Foto ausente = placeholder.
5. Cores por tokens em `src/app/globals.css`: dobra define `data-accent="alive|ensina|constroi|treina"` e usa `bg-accent`/`text-accent-foreground`. Cores reais: Alive `#FF5A1F`, Ensina `#0070D6` (site lipeensina), Constrói `#FFC400`, Treina `#E11D2E`; Alive Finance via `finance`, `finance-ink`.
6. `prefers-reduced-motion` respeitado em tudo (CSS e hooks). CTAs magnéticos só com ponteiro fino (`Magnetic`).
7. Sem tracking e sem deploy nesta etapa.

## Estrutura
- `src/content/site.ts` — conteúdo tipado (fonte única) + `stats` de reserva; `src/content/youtube.json` — fallback dos vídeos
- `src/lib/data/stats.ts` — números com ISR de 7 dias (tag `stats`): Instagram Graph API (Business Discovery), YouTube Data API v3, API de mentorados do Lipe Ensina (`/wp-json/lpm/v1/seguidores`). Envs em `.env.example`
- `src/lib/data/youtube.ts` — 4 vídeos longos via RSS da playlist `UULF…` (ISR 1 h, tag `youtube`)
- `src/app/api/revalidate/route.ts` — força atualizar (`x-revalidate-secret` ou `?secret=`, `?tag=stats|youtube`)
- `scripts/sync-youtube.mjs` — lê o RSS dos vídeos longos (channel_id em `CHANNEL_ID`) e grava o JSON de fallback
- `scripts/build-icons.mjs` — gera `src/app/{icon.svg,favicon.ico,apple-icon.png}` e `public/icon-{192,512,maskable-512}.png`. Abaixo de 48px usa a versão simples ("L" + barra laranja); a partir de 48px, "L" + 4 barras das versões
- `scripts/build-og.mjs` — gera `public/og.jpg` (1200x630, < 300 KB, estático de propósito por causa do WhatsApp). Headline e as 2 primeiras tiras ficam no quadrado central 630x630. Enquadramento das fotos em `STRIPS`
- `scripts/lib/brand.mjs` — cores, desenho do ícone e texto Bebas Neue como path (fonte em `scripts/fonts/`, licença OFL)
- `src/app/manifest.ts` — `/manifest.webmanifest`; `site.og` e `site.themeColor` em `site.ts`
- `src/app/` — layout (SEO, fontes, lang pt-BR), page, globals.css
- `src/components/sections/` — hero, alive, ensina, constroi, treina, produtos, publicidade
- `src/components/` — stories-progress (barra fixa), reveal, senha (contador), marquee, magnetic, noise, phone-stories, roadmap-trail, hyrox-timer, recorte, foto, cta-link, icons, footer
- `src/lib/` — `utils.ts` (cn), `assets.ts` (checagem de arquivo em /public)

## Comandos
`npm run dev` · `npm run build` · `npm run lint` · `npm run sync:youtube` · `npm run build:icons` · `npm run build:og`
