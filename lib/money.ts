import type { Locale } from "./i18n";

export type Cur = "KRW" | "JPY" | "USD";
// ponytail: fixed rates for the prototype; swap for a live FX fetch when prices need to be exact
const toKRW: Record<Cur, number> = { KRW: 1, JPY: 9.2, USD: 1380 };
const target: Record<Locale, Cur> = { ko: "KRW", en: "USD", ja: "JPY" };

export function convert(amount: number, cur: Cur, locale: Locale) {
  return (amount * toKRW[cur]) / toKRW[target[locale]];
}

/** Format an amount in the viewer's currency: ko → ₩, en → $, ja → ¥. `short` renders KRW as 만원 units. */
export function money(amount: number, cur: Cur, locale: Locale, opts?: { short?: boolean }) {
  const t = target[locale];
  let v = convert(amount, cur, locale);
  if (t === "KRW") {
    v = v >= 1_000_000 ? Math.round(v / 10_000) * 10_000 : Math.round(v / 1_000) * 1_000;
    if (opts?.short && v >= 10_000) return `${(v / 10_000).toLocaleString()}만원`;
    return `₩${v.toLocaleString()}`;
  }
  if (t === "JPY") {
    v = v >= 100_000 ? Math.round(v / 10_000) * 10_000 : Math.round(v / 1_000) * 1_000;
    return `¥${v.toLocaleString()}`;
  }
  v = v >= 10_000 ? Math.round(v / 100) * 100 : Math.round(v / 10) * 10;
  return `$${v.toLocaleString()}`;
}
