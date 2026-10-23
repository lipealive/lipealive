import type { SVGProps } from "react";

/** Ícones de marca (lucide não traz logos). */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

/** Logo de play do YouTube: caixa em `currentColor`, triângulo vazado na cor do fundo (`fill-accent`). */
export function YoutubeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 20" aria-hidden {...props}>
      <rect width="28" height="20" rx="5.5" fill="currentColor" />
      <path d="M11.2 5.8v8.4l7.2-4.2-7.2-4.2Z" className="fill-accent" />
    </svg>
  );
}

/** Selo de verificado do Instagram (azul #0095F6, check branco). */
export function VerificadoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden {...props}>
      <path
        fill="#0095F6"
        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Z"
      />
      <path fill="#fff" d="m17.204 27.822-6.5-6.501 2.122-2.121 4.378 4.378 9.17-9.17 2.122 2.12-11.292 11.294Z" />
    </svg>
  );
}
