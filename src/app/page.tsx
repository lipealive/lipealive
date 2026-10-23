import { site } from "@/content/site";
import { StoriesProgress } from "@/components/stories-progress";
import { Noise } from "@/components/noise";
import { Marquee } from "@/components/marquee";
import { Hero } from "@/components/sections/hero";
import { Alive } from "@/components/sections/alive";
import { Ensina } from "@/components/sections/ensina";
import { Constroi } from "@/components/sections/constroi";
import { Treina } from "@/components/sections/treina";
import { Produtos } from "@/components/sections/produtos";
import { Publicidade } from "@/components/sections/publicidade";
import { Footer } from "@/components/footer";
import { getStats } from "@/lib/data/stats";
import { getVideos } from "@/lib/data/youtube";

const m = site.marquee.itens;

/** ISR: vídeos revalidam a cada 1 h, números a cada 7 dias (ver src/lib/data). */
export const revalidate = 3600;

export default async function Home() {
  const [stats, videos] = await Promise.all([getStats(), getVideos()]);

  return (
    <>
      <StoriesProgress />
      <main>
        <Hero stats={stats} />
        <Marquee itens={m} className="bg-alive text-ink" />
        <Alive stats={stats} videos={videos} />
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
