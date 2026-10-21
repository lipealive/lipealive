import { site } from "@/content/site";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Versao } from "@/components/sections/versao";
import { Produtos } from "@/components/sections/produtos";
import { Publicidade } from "@/components/sections/publicidade";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {site.versoes.map((v, i) => (
          <Versao key={v.slug} versao={v} index={i} />
        ))}
        <Produtos />
        <Publicidade />
      </main>
      <Footer />
    </>
  );
}
