import { site } from "@/content/site";
import { StoriesProgress } from "@/components/stories-progress";
import { Noise } from "@/components/noise";
import { Marquee } from "@/components/marquee";
import { Hero } from "@/components/sections/hero";
import { Youtube } from "@/components/sections/youtube";
import { Alive } from "@/components/sections/alive";
import { Ensina } from "@/components/sections/ensina";
import { Constroi } from "@/components/sections/constroi";
import { Treina } from "@/components/sections/treina";
import { Produtos } from "@/components/sections/produtos";
import { Publicidade } from "@/components/sections/publicidade";
import { Footer } from "@/components/footer";
import { getStats } from "@/lib/data/stats";
import { getVideos } from "@/lib/data/youtube";
import { getInstagramPosts, type InstagramPost } from "@/lib/data/instagram-posts";

const m = site.marquee.itens;
const v = site.versoes[0];

/** Fallback das colunas de posts: fotos locais (em ciclo até a quantidade) linkando para o perfil. */
const { mural } = site.alive;
const muralFallback: InstagramPost[] = Array.from({ length: mural.quantidade }, (_, i) => {
  const f = mural.fallback[i % mural.fallback.length];
  return { id: `${f.src}#${i}`, tipo: "imagem", imagem: f.src, posicao: f.posicao, permalink: v.url, legenda: f.alt };
});

/** ISR: a página regera a cada 1 h (vídeos); posts do Instagram a cada 3 dias e números a cada 7 (ver src/lib/data). */
export const revalidate = 3600;

export default async function Home() {
  const [stats, videos, posts] = await Promise.all([getStats(), getVideos(), getInstagramPosts(mural.username, muralFallback, mural.quantidade)]);

  return (
    <>
      <StoriesProgress />
      <main>
        <Hero stats={stats} />
        <Marquee itens={m} className="bg-white text-youtube" tilt={2} reverse />
        <Youtube stats={stats} videos={videos} />
        <Marquee itens={m} className="bg-alive text-ink" />
        <Alive stats={stats} posts={posts} />
        <Marquee itens={m} className="bg-ink text-white" tilt={2} reverse />
        <Ensina stats={stats} />
        <Marquee itens={m} className="bg-white text-ensina" />
        <Constroi stats={stats} />
        <Marquee itens={m} className="bg-ink text-constroi" tilt={2} reverse />
        <Treina stats={stats} />
        <Marquee itens={m} className="bg-white text-treina" />
        <Produtos />
        <Publicidade stats={stats} />
      </main>
      <Footer />
      <Noise />
    </>
  );
}
