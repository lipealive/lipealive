"use client";

import { useEffect, useRef } from "react";

function format(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const c = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(c).padStart(2, "0")}`;
}

/** Cronômetro estilo Hyrox rodando desde que a dobra entra em vista. SSR: 00:00.00. */
export function HyroxTimer({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let start = 0;
    let raf = 0;
    let running = false;
    const tick = (t: number) => {
      if (!start) start = t;
      el.textContent = format(t - start);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span className="inline-flex flex-col">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">{label}</span>
      <span ref={ref} className="font-mono text-4xl font-bold tabular-nums leading-none sm:text-5xl" aria-live="off">
        00:00.00
      </span>
    </span>
  );
}
