"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FloatAction, FloatBtn, Icon, Row } from "./ui";
import { condLabel } from "./HouseCard";
import { useT } from "@/lib/i18n";
import type { House } from "@/lib/data";
import { theme as T } from "@/lib/theme";
import { money } from "@/lib/money";

const Photo = styled.div`
  position: relative; margin: 0 -20px; aspect-ratio: 4 / 5; background: ${T.color.field}; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;
const Bar = styled.div`position: absolute; top: calc(10px + env(safe-area-inset-top)); left: 12px; right: 12px; display: flex; justify-content: space-between; z-index: 2;`;
const Count = styled.span`position: absolute; right: 14px; bottom: 14px; height: 24px; padding: 0 9px; border-radius: 12px; display: inline-flex; align-items: center; background: rgba(20,20,20,.62); color: #fff; font-size: 12px; font-weight: 600;`;
const Tabs = styled.div`display: flex; gap: 24px; margin: 8px -20px 0; padding: 0 20px; border-bottom: 1px solid ${T.color.hairlineSoft};`;
const Tab = styled(Link, { shouldForwardProp: (p) => p !== "active" })<{ active: boolean }>`
  padding: 0 2px 12px; font-size: 15px; font-weight: 600; margin-bottom: -1px; border-bottom: 2px solid ${(p) => (p.active ? T.color.ink : "transparent")}; color: ${(p) => (p.active ? T.color.ink : T.color.faint)};
`;

export default function HouseHeader({ h }: { h: House }) {
  const { t, L } = useT();
  const path = usePathname();
  const base = `/houses/${h.id}`;
  return (
    <>
      <Photo>
        <img src={h.image} alt="" />
        <Bar>
          <FloatBtn href="/houses" aria-label="back"><Icon name="arrow_back_ios_new" size={18} /></FloatBtn>
          <Row gap={8}><FloatAction aria-label="share"><Icon name="ios_share" size={18} /></FloatAction><FloatAction aria-label="save"><Icon name="favorite" size={18} /></FloatAction></Row>
        </Bar>
        <Count>1 / {h.photos}</Count>
      </Photo>
      <div style={{ paddingTop: 20 }}>
        <Row gap={6} style={{ fontSize: 13, color: T.color.muted }}><Icon name="verified" size={16} fill style={{ color: T.color.brand }} />{t.ui.verified} · {h.country === "JP" ? t.common.jp : t.common.kr}</Row>
        <h1 style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em" }}>{L(h.name)}</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: T.color.muted }}>{L(h.region)}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: 24, padding: "16px 0", borderTop: `1px solid ${T.color.hairlineSoft}`, borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
        {[["square_foot", t.ui.area, L(h.size).split(" · ")[0]], ["door_front", t.ui.rooms, L(h.size).split(" · ")[1] ?? "-"], ["calendar_today", t.ui.built, String(h.built)], ["construction", t.ui.cond, condLabel(t, h.condition)]].map(([i, l, v], k) => (
          <div key={l} style={{ textAlign: "center", borderLeft: k ? `1px solid ${T.color.hairlineSoft}` : "none" }}>
            <Icon name={i} size={20} weight={300} />
            <p style={{ margin: "6px 0 0", fontSize: 11, color: T.color.muted }}>{l}</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</p>
          </div>
        ))}
      </div>
      <Tabs>
        {[["", t.houses.overview], ["/area", t.houses.area], ["/support", t.houses.support]].map(([s, v]) => <Tab key={s} href={base + s} active={path === base + s}>{v}</Tab>)}
      </Tabs>
    </>
  );
}

export function HouseBottomBar({ h }: { h: House }) {
  const { t, locale } = useT();
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 50, width: "100%", maxWidth: 430, display: "flex", alignItems: "center", gap: 12, padding: "12px 20px calc(12px + env(safe-area-inset-bottom))", background: "rgba(255,255,255,.94)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderTop: `1px solid ${T.color.hairlineSoft}` }}>
      <div style={{ flex: 1 }}>
        <p className="num" style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{money(h.price, h.cur, locale)}</p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: T.color.muted }}>{t.ui.monthly} {money(h.monthly, h.cur, locale)}</p>
      </div>
      <Link href={`/simulate/upload?house=${h.id}`} style={{ height: 48, width: 48, borderRadius: 999, border: `1px solid ${T.color.hairline}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-label="simulate"><Icon name="auto_fix_high" size={22} /></Link>
      <Link href="/community/new" style={{ height: 48, padding: "0 24px", borderRadius: 999, background: T.color.ink, color: "#fff", fontSize: 15, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>{t.ui.contact}</Link>
    </div>
  );
}
