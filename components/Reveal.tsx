"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

// Route transition: every navigation remounts app/template.tsx, so this runs per page.
// Whole page fades up briefly; any [data-reveal] descendants stagger in after.
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { gsap.set(el, { opacity: 1 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", clearProps: "transform" });
      if (el.querySelector("[data-reveal]")) gsap.fromTo("[data-reveal]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.06, delay: 0.08, clearProps: "transform,opacity" });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>;
}
