/**
 * Fonte única de conteúdo da página.
 * Nenhum texto, link, handle ou número pode aparecer hardcoded nos componentes.
 */

export type Accent = "alive" | "ensina" | "constroi" | "treina";

export type Foto = {
  /** Caminho em /public. `null` = ainda não temos a foto (mostra placeholder). */
  src: string | null;
  alt: string;
};

/** Recorte sem fundo (WebP) com dimensões reais, para next/image sem layout shift. */
export type Recorte = { src: string; alt: string; width: number; height: number };

export type Cta = {
  label: string;
  description?: string;
  href: string;
  primary?: boolean;
};

export type Post = {
  url: string;
  capa: string;
  tipo: "reel" | "post";
};

/** Número exibido com o contador "pega a senha". `value` é o texto final (ex.: "+2.000.000"). */
export type Prova = { value: string; label: string };

export type Versao = {
  slug: string;
  nome: string;
  handle: string;
  url: string;
  seguidores: string;
  /** Rótulo curto (barra de progresso e cartas). */
  atalho: string;
  headline: string;
  descricao: string;
  accent: Accent;
  destaques?: readonly string[];
  provas?: readonly Prova[];
  youtube?: { url: string; inscritos: string; videos: string };
  fotos: { principal: Foto; secundaria?: Foto };
  recorte?: Recorte;
  ctas: readonly Cta[];
  posts: readonly Post[];
};

function posts(slug: string, urls: readonly [string, string, string, string]): Post[] {
  return urls.map((url, i) => ({ url, capa: `/posts/${slug}/0${i + 1}.jpg`, tipo: "reel" as const }));
}

export const recortes = {
  apontando: { src: "/fotos/recortes/lipe-apontando-recorte.webp", alt: "Lipe apontando para você", width: 840, height: 1239 },
  banco: { src: "/fotos/recortes/lipe-banco-recorte.webp", alt: "Lipe sentado em um banco", width: 991, height: 1483 },
  close: { src: "/fotos/recortes/lipe-close-recorte.webp", alt: "Lipe em close", width: 1060, height: 1562 },
  terno: { src: "/fotos/recortes/lipe-terno-recorte.webp", alt: "Lipe de terno", width: 909, height: 1515 },
  treino: { src: "/fotos/recortes/lipe-treino-recorte.webp", alt: "Lipe de boné e camisa de treino", width: 607, height: 1485 },
} as const satisfies Record<string, Recorte>;

export const site = {
  name: "Lipe Alive",
  shortName: "Lipe",
  url: "https://lipealive.com.br",
  locale: "pt-BR",
  title: "Lipe Alive — Quantas versões de você existem?",
  description:
    "Lipe Alive: vida e rotina no @lipe.alive, carisma e conteúdo no @llipe.ensina, obra no @lipe.constroi e treino no @llipe.treina. Mais de 2 milhões de seguidores. Stay Alive.",
  ogImage: "/fotos/lipe-apontando.jpg",

  /** Faixas marquee entre as dobras. */
  marquee: {
    itens: ["Stay Alive", "Pega a senha", "@lipe.alive", "Quantas versões de você existem?", "@llipe.ensina", "@lipe.constroi", "@llipe.treina"],
  },

  hero: {
    /** Título de um vídeo do Lipe no YouTube. */
    title: "Quantas versões de você existem?",
    subtitle: "Engenheiro civil, criador de conteúdo e atleta. O mesmo cara em todas.",
    storiesLabel: "Stories do Lipe",
    /** Sequência que conta as versões. `slug` liga avatar/handle/cor à dobra. `src: null` = tela de obra. */
    stories: [
      { slug: "lipe-alive", src: "/fotos/lipe-marina.jpg", alt: "Lipe na marina" },
      { slug: "lipe-alive", src: "/fotos/lipe-carro.jpg", alt: "Lipe no carro" },
      { slug: "lipe-ensina", src: "/fotos/lipe-close.jpg", alt: "Lipe em close" },
      { slug: "lipe-ensina", src: "/fotos/lipe-banco.jpg", alt: "Lipe sentado em um banco" },
      { slug: "lipe-constroi", src: "/fotos/lipe-obra-pickup.jpg", alt: "Lipe na frente da pickup, com prédio em obra atrás", posicao: "45% 70%" },
      { slug: "lipe-treina", src: "/fotos/lipe-treino.jpg", alt: "Lipe treinando" },
      { slug: "lipe-treina", src: "/fotos/lipe-banco-treino.jpg", alt: "Lipe no banco da academia" },
      { slug: "lipe-alive", src: "/fotos/lipe-apontando.jpg", alt: "Lipe apontando", overlay: "Pega a senha." },
    ] as readonly { slug: string; src: string | null; alt: string; posicao?: string; fita?: string; overlay?: string }[],
    prova: { value: "+2.000.000", label: "seguidores somando os 4 Instagrams e o YouTube" },
    cartasLabel: "Versões do Lipe",
    recorte: recortes.apontando,
  },

  versoes: [
    {
      slug: "lipe-alive",
      nome: "Lipe Alive",
      handle: "@lipe.alive",
      url: "https://instagram.com/lipe.alive",
      seguidores: "1,7 mi",
      atalho: "Alive",
      headline: "Vida, rotina e vlog.",
      descricao: "O perfil principal. Diário de obra, treino, rango e a vida como ela é, sem roteiro. É aqui que tudo começa.",
      accent: "alive",
      destaques: ["Diário de obra", "Treino", "Redbull", "Rango", "Eng."],
      provas: [{ value: "1.700.000", label: "seguidores no Instagram" }],
      youtube: { url: "https://www.youtube.com/@LipeAlive", inscritos: "48,6 mil inscritos", videos: "249 vídeos" },
      fotos: {
        principal: { src: "/fotos/lipe-marina.jpg", alt: "Lipe na marina" },
        secundaria: { src: "/fotos/lipe-carro.jpg", alt: "Lipe no carro" },
      },
      ctas: [{ label: "Inscrever no YouTube", href: "https://www.youtube.com/@LipeAlive" }],
      posts: posts("lipe-alive", ["https://instagram.com/lipe.alive", "https://instagram.com/lipe.alive", "https://instagram.com/lipe.alive", "https://instagram.com/lipe.alive"]),
    },
    {
      slug: "lipe-ensina",
      nome: "Lipe Ensina",
      handle: "@llipe.ensina",
      url: "https://instagram.com/llipe.ensina",
      seguidores: "250 mil",
      atalho: "Ensina",
      headline: "Carisma é uma habilidade treinável.",
      descricao: "Como gravar, falar e crescer no Instagram do jeito que o Lipe cresceu. Método, não sorte.",
      accent: "ensina",
      provas: [
        { value: "1.700.000", label: "seguidores" },
        { value: "120.000.000", label: "de alcance orgânico mensal" },
        { value: "5.000", label: "pessoas ensinadas" },
        { value: "695.434", label: "seguidores gerados para mentorados" },
      ],
      fotos: {
        principal: { src: "/fotos/lipe-banco.jpg", alt: "Lipe sentado em um banco" },
        secundaria: { src: "/fotos/lipe-close.jpg", alt: "Lipe em close" },
      },
      recorte: recortes.banco,
      ctas: [
        { label: "Roadmap", description: "Os primeiros passos para sair do zero e produzir com direção", href: "https://lp.lipeensina.com.br/roadmap-b1", primary: true },
        { label: "A Senha em 21 Dias", description: "Transforme o que você sabe em conteúdo, mesmo sem nunca ter gravado", href: "https://lp.lipeensina.com.br/s21-a1" },
        { label: "Depoimentos", description: "Quanto os mentorados já cresceram", href: "https://lp.lipeensina.com.br/depoimentos/" },
        { label: "Conhecer o Lipe Ensina", href: "https://lp.lipeensina.com.br/" },
      ],
      posts: posts("lipe-ensina", ["https://instagram.com/llipe.ensina", "https://instagram.com/llipe.ensina", "https://instagram.com/llipe.ensina", "https://instagram.com/llipe.ensina"]),
    },
    {
      slug: "lipe-constroi",
      nome: "Lipe Constrói",
      handle: "@lipe.constroi",
      url: "https://instagram.com/lipe.constroi",
      seguidores: "39,6 mil",
      atalho: "Constrói",
      headline: "A rotina de obra de um engenheiro civil.",
      descricao: "Canteiro, projeto, gestão e os perrengues de quem toca obra de verdade. Para quem constrói ou quer construir.",
      accent: "constroi",
      fotos: {
        principal: { src: "/fotos/lipe-obra-pickup.jpg", alt: "Lipe na frente da pickup, com prédio em obra atrás" },
        secundaria: { src: "/fotos/lipe-obra-capacete.jpg", alt: "Lipe de capacete na rua sendo asfaltada" },
      },
      ctas: [{ label: "Entrar no ConstruSenha", href: "https://construsenha.systeme.io/cadastro", primary: true }],
      posts: posts("lipe-constroi", ["https://instagram.com/lipe.constroi", "https://instagram.com/lipe.constroi", "https://instagram.com/lipe.constroi", "https://instagram.com/lipe.constroi"]),
    },
    {
      slug: "lipe-treina",
      nome: "Lipe Treina",
      handle: "@llipe.treina",
      url: "https://instagram.com/llipe.treina",
      seguidores: "44,3 mil",
      atalho: "Treina",
      headline: "Hyrox, boxe e nutrição.",
      descricao: "Treino de verdade, sem fórmula mágica. O que o Lipe faz para aguentar a rotina, e o que ele come para isso.",
      accent: "treina",
      destaques: ["Hyrox", "Boxe", "Nutrição"],
      fotos: { principal: { src: "/fotos/lipe-treino.jpg", alt: "Lipe treinando" } },
      recorte: recortes.treino,
      ctas: [],
      posts: posts("lipe-treina", ["https://instagram.com/llipe.treina", "https://instagram.com/llipe.treina", "https://instagram.com/llipe.treina", "https://instagram.com/llipe.treina"]),
    },
  ] as const satisfies readonly Versao[],

  /** Cartas de personagem do hero (uma por versão, na mesma ordem). */
  cartas: {
    "lipe-alive": { tipo: "foto", foto: "/fotos/lipe-marina.jpg", posicao: "50% 12%", tag: "Vida e rotina" },
    /** Carta tipográfica: assinatura + seguidores + ícones do Roadmap. */
    "lipe-ensina": { tipo: "ensina", foto: null, tag: "Carisma e conteúdo", seguidoresGrande: "250 mil" },
    /** Selfie de capacete (rosto à direita); a fita "Em obra" fica embaixo, como detalhe. */
    "lipe-constroi": { tipo: "foto", foto: "/fotos/lipe-obra-capacete.jpg", posicao: "78% 45%", tag: "Obra e engenharia", fita: "Em obra" },
    /** Foco no boné e no tênis. */
    "lipe-treina": { tipo: "foto", foto: "/fotos/lipe-banco-treino.jpg", posicao: "50% 40%", tag: "Hyrox, boxe e nutrição" },
  } as Record<string, { tipo: "foto" | "ensina" | "obra"; foto: string | null; posicao?: string; tag: string; fita?: string; seguidoresGrande?: string }>,

  /** Dobra Lipe Alive */
  alive: {
    destaquesLabel: "Destaques",
    /** Foto de cada destaque (crop redondo). `null` = placeholder amarelo com capacete. */
    destaquesFotos: {
      "Diário de obra": "/fotos/lipe-obra-capacete.jpg",
      Treino: "/fotos/lipe-banco-treino.jpg",
      Redbull: "/fotos/lipe-carro.jpg",
      Rango: "/fotos/lipe-marina.jpg",
      "Eng.": "/fotos/lipe-close.jpg",
    } as Record<string, string | null>,
    /** object-position por destaque (padrão: topo). */
    destaquesPosicao: { "Diário de obra": "80% 45%" } as Record<string, string>,
    youtubeTitle: "Últimos vídeos",
    youtubeNota: "Atualizado manualmente com npm run sync:youtube",
  },

  /** Dobra Lipe Ensina (identidade do site lipeensina.com.br) */
  ensina: {
    assinatura: { src: "/marcas/lipe-ensina/assinatura-lipe-ensina-branca.svg", alt: "Lipe Ensina", width: 84, height: 61 },
    roadmapLogo: { src: "/marcas/lipe-ensina/logo-roadmap-branco.svg", alt: "Roadmap", width: 330, height: 81 },
    roadmapTitle: "O caminho do zero ao primeiro real",
    marcos: [
      { n: "01", titulo: "Começar", texto: "Sair do zero com direção, sem travar na primeira gravação.", icone: "/marcas/lipe-ensina/no-comecar.svg" },
      { n: "02", titulo: "Ter ideias", texto: "Nunca mais ficar sem o que postar.", icone: "/marcas/lipe-ensina/no-ter-ideias.svg" },
      { n: "03", titulo: "Conquistar atenção", texto: "Gancho, carisma e ritmo pra segurar quem assiste.", icone: "/marcas/lipe-ensina/no-conquistar-atencao.svg" },
      { n: "04", titulo: "Monetizar", texto: "Transformar audiência em negócio.", icone: "/marcas/lipe-ensina/no-monetizar.svg" },
    ],
    muroTitle: "Quem já pegou a senha",
    /** Perfis reais exibidos no site do Lipe Ensina. */
    mentorados: [
      { handle: "@bernardorocha_01", seguidores: "266 mil", foto: "/marcas/lipe-ensina/perfil-1b.webp" },
      { handle: "@nandassnascimento", seguidores: "264 mil", foto: "/marcas/lipe-ensina/perfil-2b.webp" },
      { handle: "@henriquelogico", seguidores: "619 mil", foto: "/marcas/lipe-ensina/perfil-3c.webp" },
      { handle: "@pedro_tozzi", seguidores: "532 mil", foto: "/marcas/lipe-ensina/perfil-4b.webp" },
      { handle: "@thaleswdias", seguidores: "349 mil", foto: "/marcas/lipe-ensina/perfil-5b.webp" },
      { handle: "@artthurm", seguidores: "171 mil", foto: "/marcas/lipe-ensina/perfil-6b.webp" },
      { handle: "@leticiaimbassahy", seguidores: "92,2 mil", foto: "/marcas/lipe-ensina/perfil-7b.webp" },
      { handle: "@canal.jota", seguidores: "1 mi", foto: "/marcas/lipe-ensina/perfil-8b.webp" },
    ],
    /** Avatares pequenos (150px) de mentorados, do site do Lipe Ensina. Sem número = só o handle. */
    avatares: [
      { handle: "@artthurm", seguidores: "171 mil", foto: "/marcas/lipe-ensina/mentorados/artthurm.webp" },
      { handle: "@henriquelogico", seguidores: "619 mil", foto: "/marcas/lipe-ensina/mentorados/henriquelogico.webp" },
      { handle: "@nandassnascimento", seguidores: "264 mil", foto: "/marcas/lipe-ensina/mentorados/nandassnascimento.webp" },
      { handle: "@thaleswdias", seguidores: "349 mil", foto: "/marcas/lipe-ensina/mentorados/thaleswdias.webp" },
      { handle: "@euribeiroleo", seguidores: null, foto: "/marcas/lipe-ensina/mentorados/euribeiroleo.webp" },
      { handle: "@marceloelzoc", seguidores: null, foto: "/marcas/lipe-ensina/mentorados/marceloelzoc.webp" },
      { handle: "@rodrigoarraisb", seguidores: null, foto: "/marcas/lipe-ensina/mentorados/rodrigoarraisb.webp" },
    ] as readonly { handle: string; seguidores: string | null; foto: string }[],
    contador: { value: "695.434", label: "seguidores gerados para mentorados" },
    produtosTitle: "Por onde começar",
  },

  /** Dobra Lipe Constrói */
  constroi: {
    fita: "Em obra",
    /** Cotas de CAD em volta da prancheta. */
    cotas: { largura: "12,38 m", altura: "17,12 m", escala: "ESC 1:50", prancha: "PR-01" },
    temasTitle: "Nos reels",
    temas: [
      "Como é separada a energia que entra no apartamento?",
      "Como é colocado o piso da sua casa?",
      "Por que é importante compatibilizar projeto?",
      "Como funciona o sistema de incêndio?",
    ],
    plantaLabel: "Planta baixa",
  },

  /** Dobra Lipe Treina */
  treina: {
    cronometroLabel: "Tempo de treino",
    palavras: ["Hyrox", "Boxe", "Nutrição"],
    frase: "Comfort kills dreams",
    fraseTraducao: "O conforto mata os sonhos.",
  },

  produtos: {
    eyebrow: "Produtos",
    title: "Feito pelo Lipe",
    aliveFinance: {
      nome: "Alive Finance",
      byline: "by MultiCap",
      descricao: "O jeito do Lipe de organizar o dinheiro.",
      href: "https://finance.lipealive.com.br",
      ctaLabel: "Conhecer a Alive Finance",
      logo: { src: "/marcas/alive-finance/logo-horizontal-dark.svg", width: 405, height: 96 },
      simbolo: { src: "/marcas/alive-finance/symbol-white.svg", width: 128, height: 68 },
      cores: { verde: "#1EA076", magenta: "#E6338A", fundo: "#0B1210" },
    },
    bone: {
      nome: "Boné Stay Alive",
      descricao: "O boné da frase que virou lema.",
      badge: "Em breve",
      foto: { src: "/fotos/lipe-banco-treino.jpg", alt: "Lipe de boné Stay Alive" } as Foto,
    },
  },

  publicidade: {
    eyebrow: "Mídia kit",
    title: "Quer anunciar com o Lipe?",
    text: "Marcas que querem falar com mais de 2 milhões de pessoas, do jeito do Lipe. Fala com a equipe:",
    numeros: [
      { value: "2.000.000", label: "seguidores" },
      { value: "120.000.000", label: "de alcance mensal" },
      { value: "4", label: "perfis + YouTube" },
    ],
    email: "lipealive@play9.com.br",
    ctaLabel: "Enviar e-mail",
    recorte: recortes.terno,
  },

  footer: {
    signature: "Stay Alive.",
    links: [
      { label: "@lipe.alive", href: "https://instagram.com/lipe.alive", kind: "instagram" },
      { label: "@llipe.ensina", href: "https://instagram.com/llipe.ensina", kind: "instagram" },
      { label: "@lipe.constroi", href: "https://instagram.com/lipe.constroi", kind: "instagram" },
      { label: "@llipe.treina", href: "https://instagram.com/llipe.treina", kind: "instagram" },
      { label: "YouTube", href: "https://www.youtube.com/@LipeAlive", kind: "youtube" },
    ] as readonly { label: string; href: string; kind: "instagram" | "youtube" }[],
    copyright: "Lipe Alive. Todos os direitos reservados.",
  },

  ui: {
    seguidores: "seguidores",
    seguir: "Seguir no Instagram",
    verPost: "Ver no Instagram",
    verVideo: "Assistir no YouTube",
    reel: "Reel",
    post: "Post",
    postsTitle: "Últimos posts",
    emBreveFoto: "Foto em breve",
    progressoLabel: "Versões do Lipe",
    irPara: "Ir para",
  },
} as const;

export type Site = typeof site;
export type VersaoSlug = (typeof site.versoes)[number]["slug"];

export function mailto(email: string, subject?: string) {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}
