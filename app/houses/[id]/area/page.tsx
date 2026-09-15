"use client";
import { useParams } from "next/navigation";
import { Body, H3, Icon, Label, Page, Row, Section, Stack } from "@/components/ui";
import HouseHeader, { HouseBottomBar } from "@/components/HouseHeader";
import { houses } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

export default function HouseArea() {
  const { id } = useParams<{ id: string }>();
  const h = houses.find((x) => x.id === id) ?? houses[0];
  const { t, L } = useT();
  return (
    <Page>
      <HouseHeader h={h} />
      <Section gap={28}>
        <H3>{t.houses.areaTitle}</H3>
        <div style={{ marginTop: 8 }}>
          <div style={{ padding: "16px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
            <Label>{t.houses.jobs}</Label>
            <Stack gap={8} style={{ marginTop: 10 }}>{h.jobs.map((j) => <Row key={j.en} gap={10}><Icon name="check" size={18} style={{ color: T.color.brand }} /><Body>{L(j)}</Body></Row>)}</Stack>
          </div>
          <div style={{ padding: "16px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
            <Label>{t.houses.transport}</Label>
            <Body style={{ marginTop: 10 }}>{L(h.transport)}</Body>
          </div>
        </div>
      </Section>
      <HouseBottomBar h={h} />
    </Page>
  );
}
