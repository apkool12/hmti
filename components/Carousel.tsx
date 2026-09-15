"use client";
import styled from "@emotion/styled";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { theme as T } from "@/lib/theme";

const Scroller = styled.div`
  display: flex; gap: 14px; overflow-x: auto; margin: 0 -20px; padding: 0 20px 4px; scroll-snap-type: x mandatory; scroll-padding-inline: 20px;
  overscroll-behavior-x: contain; scrollbar-width: none; &::-webkit-scrollbar { display: none; } > * { scroll-snap-align: start; flex: none; }
`;
const Dots = styled.div`display: flex; justify-content: center; gap: 6px; margin-top: 16px;
  i { width: 6px; height: 6px; border-radius: 3px; background: ${T.color.hairline}; transition: width 180ms ease-out, background-color 180ms ease-out; } i.on { width: 18px; background: ${T.color.brand}; }`;

// Dots follow real scroll position: index = nearest child whose left edge is closest to the padding edge.
export default function Carousel({ children, dots = true }: { children: ReactNode; dots?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const items = () => Array.from(el.children) as HTMLElement[];
    setCount(items().length);
    let raf = 0;
    const update = () => {
      raf = 0;
      const left = el.scrollLeft + 20; const max = el.scrollWidth - el.clientWidth;
      if (max > 0 && el.scrollLeft >= max - 2) return setIdx(items().length - 1);
      let best = 0, dist = Infinity;
      items().forEach((c, i) => { const d = Math.abs(c.offsetLeft - left); if (d < dist) { dist = d; best = i; } });
      setIdx(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true }); update();
    return () => { el.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [children]);
  const go = (i: number) => { const el = ref.current; const c = el?.children[i] as HTMLElement | undefined; if (el && c) el.scrollTo({ left: c.offsetLeft - 20, behavior: "smooth" }); };
  return (
    <div>
      <Scroller ref={ref}>{children}</Scroller>
      {dots && count > 1 && <Dots>{Array.from({ length: count }).map((_, i) => <i key={i} className={i === idx ? "on" : ""} onClick={() => go(i)} role="button" aria-label={`${i + 1}`} />)}</Dots>}
    </div>
  );
}
