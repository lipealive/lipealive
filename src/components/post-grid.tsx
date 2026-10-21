import Image from "next/image";
import { Clapperboard, Image as ImageIcon } from "lucide-react";
import { publicFileExists } from "@/lib/assets";
import { site, type Post } from "@/content/site";

type PostGridProps = { posts: readonly Post[]; nome: string };

/**
 * Grade de 4 posts curados. Mobile: carrossel horizontal com snap.
 * Desktop: 4 colunas. Cada card abre o post em nova aba.
 */
export function PostGrid({ posts, nome }: PostGridProps) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 no-scrollbar md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
      {posts.map((post, i) => (
        <PostCard key={`${post.url}-${i}`} post={post} label={`${site.ui.verPost}: ${nome}, ${post.tipo} ${i + 1}`} />
      ))}
    </div>
  );
}

function PostCard({ post, label }: { post: Post; label: string }) {
  const hasCapa = publicFileExists(post.capa);
  const Icon = post.tipo === "reel" ? Clapperboard : ImageIcon;

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative aspect-[4/5] w-[62vw] shrink-0 snap-start overflow-hidden rounded-md bg-surface-2 transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-[44vw] md:w-auto"
    >
      {hasCapa ? (
        <Image
          src={post.capa}
          alt=""
          fill
          sizes="(min-width: 768px) 18vw, 62vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-surface-2 to-surface text-muted-foreground/60">
          <Icon className="size-10" aria-hidden strokeWidth={1.5} />
        </div>
      )}
      <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
        <Icon className="size-3" aria-hidden />
        {post.tipo === "reel" ? site.ui.reel : site.ui.post}
      </span>
    </a>
  );
}
