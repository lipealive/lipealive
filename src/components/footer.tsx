import { site } from "@/content/site";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";

export function Footer() {
  const { footer } = site;
  const year = new Date().getFullYear();

  return (
    <footer data-accent="alive" className="border-t border-border/10 py-12">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-4 sm:px-6">
        <p className="font-display text-[clamp(4rem,20vw,10rem)] uppercase leading-none tracking-tight text-accent">{footer.signature}</p>
        <nav aria-label="Redes do Lipe" className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {footer.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.kind === "youtube" ? <YoutubeIcon className="size-4" /> : <InstagramIcon className="size-4" />}
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {year} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
