"use client";
import { useParams } from "next/navigation";
import { Chip, ListRow, Page, Row } from "@/components/ui";
import HouseHeader, { HouseBottomBar } from "@/components/HouseHeader";
import { houses } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";
import { money } from "@/lib/money";

export default function HouseOverview() {
  const { id } = useParams<{ id: string }>();
  const h = houses.find((x) => x.id === id) ?? houses[0];
  const { t, L, locale } = useT();
  return (
    <Page>
      <HouseHeader h={h} />
      <Row gap={6} style={{ marginTop: 24, flexWrap: "wrap" }}>{h.tags.map((x) => <Chip key={x.en}>{L(x)}</Chip>)}</Row>
      <div style={{ marginTop: 24, paddingBottom: 20, borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: T.color.muted }}>{t.houses.supportTitle}</span>
        <p className="num" style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: T.color.brand }}>{t.ui.subsidyUp} {money(h.subsidyMax, h.cur, locale)}</p>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: T.color.muted }}>{L(h.support[0])}{h.support.length > 1 ? ` +${h.support.length - 1}` : ""}</p>
      </div>
      <div style={{ marginTop: 4 }}>
        <ListRow href={`/houses/${h.id}/area`} icon="location_city" title={t.houses.ctaArea} desc={L(h.transport)} />
        <ListRow href={`/houses/${h.id}/support`} icon="savings" title={t.houses.ctaSupport} desc={`${h.support.length}`} />
        <ListRow href="/community" icon="forum" title={t.houses.ctaAsk} desc={t.comm.lead} />
      </div>
      <div style={{ height: 24 }} />
      <HouseBottomBar h={h} />
    </Page>
  );
}
