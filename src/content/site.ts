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

export type Cta = {
  label: string;
  /** Linha de apoio abaixo do label (cards do Ensina). */
  description?: string;
  href: string;
  /** Destaque visual (preenchido com a cor de acento). */
  primary?: boolean;
};

export type Post = {
  url: string;
  /** Capa em /public/posts/<slug>/NN.jpg. Se o arquivo não existir, vira placeholder. */
  capa: string;
  tipo: "reel" | "post";
};

export type Prova = { value: string; label: string };

export type Versao = {
  slug: string;
  nome: string;
  handle: string;
  url: string;
  seguidores: string;
  /** Frase curta que resume a versão (headline da dobra). */
  headline: string;
  descricao: string;
  accent: Accent;
  /** Destaques do perfil (chips). */
  destaques?: readonly string[];
  /** Números de prova social (Ensina). */
  provas?: readonly Prova[];
  youtube?: { url: string; inscritos: string; videos: string };
  fotos: { principal: Foto; secundaria?: Foto };
  ctas: readonly Cta[];
  posts: readonly Post[];
};

function posts(slug: string, urls: readonly [string, string, string, string]): Post[] {
  return urls.map((url, i) => ({
    url,
    capa: `/posts/${slug}/0${i + 1}.jpg`,
    tipo: "reel" as const,
  }));
}

export const site = {
  name: "Lipe Alive",
  shortName: "Lipe",
  url: "https://lipealive.com.br",
  locale: "pt-BR",
  title: "Lipe Alive — O irmão mais velho que você não teve",
  description:
    "Lipe Alive: vida, rotina e vlog no @lipe.alive, carisma e conteúdo no @llipe.ensina, obra no @lipe.constroi e treino no @llipe.treina. Mais de 2 milhões de seguidores. Stay Alive.",
  ogImage: "/fotos/lipe-apontando.jpg",

  nav: {
    label: "Versões do Lipe",
    /** Rótulo curto de cada atalho (chip do hero e do header), por slug. */
    atalhos: {
      "lipe-alive": "Alive",
      "lipe-ensina": "Ensina",
      "lipe-constroi": "Constrói",
      "lipe-treina": "Treina",
    } as Record<string, string>,
  },

  hero: {
    eyebrow: "Lipe Alive",
    title: "O irmão mais velho que você não teve",
    prova: { value: "+2 milhões", label: "de seguidores" },
    provaNota: "Somando os 4 Instagrams e o YouTube",
    chipsLabel: "Escolhe por onde começar:",
    foto: { src: "/fotos/lipe-apontando.jpg", alt: "Lipe apontando para a câmera" } as Foto,
  },

  versoes: [
    {
      slug: "lipe-alive",
      nome: "Lipe Alive",
      handle: "@lipe.alive",
      url: "https://instagram.com/lipe.alive",
      seguidores: "1,7 mi",
      headline: "Vida, rotina e vlog.",
      descricao:
        "O perfil principal. Diário de obra, treino, rango e a vida como ela é, sem roteiro. É aqui que tudo começa.",
      accent: "alive",
      destaques: ["Diário de obra", "Treino", "Redbull", "Rango", "Eng."],
      youtube: {
        url: "https://www.youtube.com/@LipeAlive",
        inscritos: "48,6 mil inscritos",
        videos: "249 vídeos",
      },
      fotos: {
        principal: { src: "/fotos/lipe-marina.jpg", alt: "Lipe na marina" },
        secundaria: { src: "/fotos/lipe-carro.jpg", alt: "Lipe no carro" },
      },
      ctas: [
        { label: "Inscrever no YouTube", href: "https://www.youtube.com/@LipeAlive" },
      ],
      posts: posts("lipe-alive", [
        "https://instagram.com/lipe.alive",
        "https://instagram.com/lipe.alive",
        "https://instagram.com/lipe.alive",
        "https://instagram.com/lipe.alive",
      ]),
    },
    {
      slug: "lipe-ensina",
      nome: "Lipe Ensina",
      handle: "@llipe.ensina",
      url: "https://instagram.com/llipe.ensina",
      seguidores: "250 mil",
      headline: "Carisma é uma habilidade treinável.",
      descricao:
        "Como gravar, falar e crescer no Instagram do jeito que o Lipe cresceu. Método, não sorte.",
      accent: "ensina",
      provas: [
        { value: "+1,7 mi", label: "seguidores" },
        { value: "+120 mi", label: "de alcance orgânico mensal" },
        { value: "+5 mil", label: "pessoas ensinadas" },
        { value: "+695 mil", label: "seguidores gerados para mentorados" },
      ],
      fotos: {
        principal: { src: "/fotos/lipe-banco.jpg", alt: "Lipe sentado em um banco" },
        secundaria: { src: "/fotos/lipe-close.jpg", alt: "Lipe em close" },
      },
      ctas: [
        {
          label: "Roadmap",
          description: "Os primeiros passos para sair do zero e produzir com direção",
          href: "https://lp.lipeensina.com.br/roadmap-b1",
          primary: true,
        },
        {
          label: "A Senha em 21 Dias",
          description: "Transforme o que você sabe em conteúdo, mesmo sem nunca ter gravado",
          href: "https://lp.lipeensina.com.br/s21-a1",
        },
        {
          label: "Depoimentos",
          description: "Quanto os mentorados já cresceram",
          href: "https://lp.lipeensina.com.br/depoimentos/",
        },
        { label: "Conhecer o Lipe Ensina", href: "https://lp.lipeensina.com.br/" },
      ],
      posts: posts("lipe-ensina", [
        "https://instagram.com/llipe.ensina",
        "https://instagram.com/llipe.ensina",
        "https://instagram.com/llipe.ensina",
        "https://instagram.com/llipe.ensina",
      ]),
    },
    {
      slug: "lipe-constroi",
      nome: "Lipe Constrói",
      handle: "@lipe.constroi",
      url: "https://instagram.com/lipe.constroi",
      seguidores: "39,6 mil",
      headline: "A rotina de obra de um engenheiro civil.",
      descricao:
        "Canteiro, projeto, gestão e os perrengues de quem toca obra de verdade. Para quem constrói ou quer construir.",
      accent: "constroi",
      fotos: {
        principal: { src: null, alt: "Lipe na obra" },
      },
      ctas: [
        { label: "Entrar no ConstruSenha", href: "https://construsenha.systeme.io/cadastro", primary: true },
      ],
      posts: posts("lipe-constroi", [
        "https://instagram.com/lipe.constroi",
        "https://instagram.com/lipe.constroi",
        "https://instagram.com/lipe.constroi",
        "https://instagram.com/lipe.constroi",
      ]),
    },
    {
      slug: "lipe-treina",
      nome: "Lipe Treina",
      handle: "@llipe.treina",
      url: "https://instagram.com/llipe.treina",
      seguidores: "44,3 mil",
      headline: "Hyrox, boxe e nutrição.",
      descricao:
        "Treino de verdade, sem fórmula mágica. O que o Lipe faz para aguentar a rotina, e o que ele come para isso.",
      accent: "treina",
      destaques: ["Hyrox", "Boxe", "Nutrição"],
      fotos: {
        principal: { src: "/fotos/lipe-treino.jpg", alt: "Lipe treinando" },
      },
      ctas: [],
      posts: posts("lipe-treina", [
        "https://instagram.com/llipe.treina",
        "https://instagram.com/llipe.treina",
        "https://instagram.com/llipe.treina",
        "https://instagram.com/llipe.treina",
      ]),
    },
  ] as const satisfies readonly Versao[],

  produtos: {
    eyebrow: "Produtos",
    title: "Feito pelo Lipe",
    items: [
      {
        slug: "alive-finance",
        nome: "Alive Finance",
        descricao: "O jeito do Lipe de organizar o dinheiro.",
        href: "https://finance.lipealive.com.br",
        ctaLabel: "Conhecer",
        foto: { src: null, alt: "Alive Finance" } as Foto,
      },
      {
        slug: "bone-stay-alive",
        nome: "Boné Stay Alive",
        descricao: "O boné da frase que virou lema.",
        href: null,
        badge: "Em breve",
        foto: { src: "/fotos/lipe-banco-treino.jpg", alt: "Lipe de boné" } as Foto,
      },
    ],
  },

  publicidade: {
    eyebrow: "Publicidade",
    title: "Quer anunciar com o Lipe?",
    text: "Marcas que querem falar com mais de 2 milhões de pessoas, do jeito do Lipe. Fala com a equipe:",
    email: "lipealive@play9.com.br",
    ctaLabel: "Enviar e-mail",
    foto: { src: "/fotos/lipe-terno.jpg", alt: "Lipe de terno" } as Foto,
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

  /** Textos de interface reutilizados. */
  ui: {
    seguidores: "seguidores",
    seguir: "Seguir no Instagram",
    verPost: "Ver no Instagram",
    reel: "Reel",
    post: "Post",
    postsTitle: "Últimos posts",
    emBreveFoto: "Foto em breve",
  },
} as const;

export type Site = typeof site;
export type VersaoSlug = (typeof site.versoes)[number]["slug"];

export function mailto(email: string, subject?: string) {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}
