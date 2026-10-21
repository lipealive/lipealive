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

const m = site.marquee.itens;

export default function Home() {
  return (
    <>
      <StoriesProgress />
      <main>
        <Hero />
        <Marquee itens={m} className="bg-alive text-ink" />
        <Alive />
        <Marquee itens={m} className="bg-ink text-white" tilt={2} reverse />
        <Ensina />
        <Marquee itens={m} className="bg-white text-ensina" />
        <Constroi />
        <Marquee itens={m} className="bg-ink text-constroi" tilt={2} reverse />
        <Treina />
        <Marquee itens={m} className="bg-white text-treina" />
        <Produtos />
        <Publicidade />
      </main>
      <Footer />
      <Noise />
    </>
  );
}
