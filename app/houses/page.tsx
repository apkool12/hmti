"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";
import { Icon, NavBtn, Page, Row, Search, TopBar } from "@/components/ui";
import HouseCard from "@/components/HouseCard";
import { houses } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

const Chips = styled.div`display: flex; gap: 8px; overflow-x: auto; margin: 12px -20px 0; padding: 0 20px; scrollbar-width: none; &::-webkit-scrollbar { display: none; }`;
const Chip = styled("button", { shouldForwardProp: (p) => p !== "on" })<{ on?: boolean }>`
  height: 36px; padding: 0 14px; border-radius: ${T.radius.full}px; font-size: 13px; font-weight: 600; white-space: nowrap; flex: none;
  border: 1px solid ${(p) => (p.on ? T.color.ink : T.color.hairline)}; background: ${(p) => (p.on ? T.color.ink : "#fff")}; color: ${(p) => (p.on ? "#fff" : T.color.ink)};
`;

export default function Houses() {
  const { t } = useT();
  const [f, setF] = useState<"all" | "JP" | "KR">("all");
  const list = houses.filter((h) => f === "all" || h.country === f);
  return (
    <Page>
      <TopBar title={t.nav.houses} line={false} right={<NavBtn href="/map" aria-label="map"><Icon name="map" size={22} weight={400} /></NavBtn>} />
      <Link href="/houses"><Search><Icon name="search" size={22} /><span className="ph">{t.ui.search}</span><Icon name="tune" size={20} /></Search></Link>
      <Chips>
        {([["all", t.ui.filterAll], ["JP", t.common.jp], ["KR", t.common.kr]] as const).map(([k, v]) => <Chip key={k} on={f === k} onClick={() => setF(k)}>{v}</Chip>)}
        {t.ui.chips.slice(4).map((c) => <Chip key={c}>{c}</Chip>)}
      </Chips>
      <Row between style={{ marginTop: 20 }}>
        <span style={{ fontSize: 14, color: T.color.muted }}>{list.length}{t.ui.results}</span>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600 }}>{t.ui.sort}<Icon name="expand_more" size={18} /></button>
      </Row>
      <div style={{ display: "grid", gap: 24, marginTop: 12 }}>{list.map((h) => <HouseCard key={h.id} h={h} compact />)}</div>
    </Page>
  );
}
