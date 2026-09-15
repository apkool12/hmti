"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const o = { v: 0 };
    const tw = gsap.to(o, { v: to, duration: 1.6, ease: "power3.out", onUpdate: () => { if (ref.current) ref.current.textContent = o.v.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix; } });
    return () => { tw.kill(); };
  }, [to, suffix, decimals]);
  return <span ref={ref}>0{suffix}</span>;
}
