"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";
import { Icon, MediaBox as Media } from "./ui";
import { useT } from "@/lib/i18n";
import type { House } from "@/lib/data";
import { theme as T } from "@/lib/theme";
import { money } from "@/lib/money";

export const condLabel = (t: ReturnType<typeof useT>["t"], c: House["condition"]) => ({ good: t.houses.condGood, fix: t.houses.condFix, major: t.houses.condMajor }[c]);
export const pct = (h: House) => Math.round((h.subsidyMax / h.price) * 100);

const Fav = styled("button", { shouldForwardProp: (p) => p !== "on" })<{ on: boolean }>`
  position: absolute; right: 8px; top: 8px; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.94); color: ${(p) => (p.on ? T.color.brand : T.color.muted)}; &:active { transform: scale(.9); }
`;
const Tag = styled("span", { shouldForwardProp: (p) => p !== "solid" })<{ solid?: boolean }>`
  display: inline-flex; align-items: center; height: 20px; padding: 0 6px; border-radius: 4px; font-size: 11px; font-weight: 600; line-height: 1;
  ${(p) => (p.solid ? `background: ${T.color.ink}; color: #fff;` : `padding: 0; color: ${T.color.muted}; font-weight: 500;`)}
`;
export function FavButton() {
  const [on, setOn] = useState(false);
  return <Fav on={on} onClick={(e) => { e.preventDefault(); setOn(!on); }} aria-label="save"><Icon name="favorite" size={18} fill={on} /></Fav>;
}
const Wrap = styled(Link, { shouldForwardProp: (p) => p !== "w" })<{ w?: number }>`display: block; width: ${(p) => (p.w ? `${p.w}px` : "auto")};`;

export function PriceBlock({ h, size = 16 }: { h: House; size?: number }) {
  const { t, locale } = useT();
  return (
    <div>
      <p className="num" style={{ margin: 0, fontSize: 12, color: T.color.faint, textDecoration: "line-through" }}>{money(h.price, h.cur, locale)}</p>
      <p className="num" style={{ margin: "3px 0 0", display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: size - 2, fontWeight: 800, color: T.color.brand }}>{pct(h)}%</span>
        <span style={{ fontSize: size, fontWeight: 800 }}>{money(h.price - h.subsidyMax, h.cur, locale)}</span>
      </p>
      <p className="num" style={{ margin: "4px 0 0", fontSize: 11, color: T.color.muted }}>{t.yg.finalPrice} · {t.ui.monthly} {money(h.monthly, h.cur, locale)}</p>
    </div>
  );
}

export default function HouseCard({ h, w, compact }: { h: House; w?: number; compact?: boolean }) {
  const { t, L } = useT();
  return (
    <Wrap href={`/houses/${h.id}`} w={w}>
      <Media ratio={compact ? "4 / 3" : "1 / 1"} radius={T.radius.xs}>
        <img src={h.image} alt="" loading="lazy" />
        <FavButton />
      </Media>
      <div style={{ padding: "12px 2px 0" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {h.condition === "good" && <Tag solid>{t.houses.condGood}</Tag>}
          <Tag>{L(h.tags[0])}</Tag>
        </div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{L(h.name)}</p>
        <p style={{ margin: "3px 0 10px", fontSize: 12, color: T.color.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{L(h.region)} · {L(h.size)}</p>
        <PriceBlock h={h} />
      </div>
    </Wrap>
  );
}

export function HouseRow({ h }: { h: House }) {
  const { t, L } = useT();
  return (
    <Link href={`/houses/${h.id}`} style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
      <Media ratio="1 / 1" radius={10} style={{ width: 88, flex: "none" }}><img src={h.image} alt="" loading="lazy" /></Media>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{L(h.name)}</p>
        <p style={{ margin: "3px 0 8px", fontSize: 12, color: T.color.muted }}>{L(h.region)} · {condLabel(t, h.condition)}</p>
        <PriceBlock h={h} size={15} />
      </div>
    </Link>
  );
}
