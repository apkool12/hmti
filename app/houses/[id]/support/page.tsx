"use client";
import { useParams } from "next/navigation";
import { Body, H3, Icon, Lead, Page, Row, Section } from "@/components/ui";
import HouseHeader, { HouseBottomBar } from "@/components/HouseHeader";
import { houses } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

export default function HouseSupport() {
  const { id } = useParams<{ id: string }>();
  const h = houses.find((x) => x.id === id) ?? houses[0];
  const { t, L } = useT();
  return (
    <Page>
      <HouseHeader h={h} />
      <Section gap={28}>
        <H3>{t.houses.supportTitle}</H3>
        <Lead style={{ marginTop: 8, fontSize: 16 }}>{t.houses.supportLead}</Lead>
        <div style={{ marginTop: 12 }}>
          {h.support.map((s) => (
            <Row key={s.en} gap={12} style={{ padding: "14px 0", borderBottom: `1px solid ${T.color.hairlineSoft}`, alignItems: "flex-start" }}>
              <Icon name="check" size={20} style={{ color: T.color.brand, marginTop: 1 }} />
              <Body style={{ flex: 1 }}>{L(s)}</Body>
            </Row>
          ))}
        </div>
      </Section>
      <HouseBottomBar h={h} />
    </Page>
  );
}
