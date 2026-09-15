"use client";
import styled from "@emotion/styled";
import { useState } from "react";
import { Badge, Body, Caption, Grid2, H2, Icon, Label, Media, Page, Pill, Row, Section, Small, TopBar } from "@/components/ui";
import { houses, savedType, scratch } from "@/lib/data";
import { TYPES } from "@/lib/types";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";
import { money } from "@/lib/money";

const Range = styled.input`
  width: 100%; margin-top: 14px; appearance: none; height: 4px; border-radius: 2px; background: ${T.color.hairline};
  &::-webkit-slider-thumb { appearance: none; width: 28px; height: 28px; border-radius: 50%; background: ${T.color.ink}; border: 3px solid #fff; }
`;
const Handle = styled.div`position: absolute; top: 0; bottom: 0; width: 2px; background: #fff; pointer-events: none;`;

export default function SimResult() {
  const { t, L, locale } = useT();
  const m = (krw: number) => money(krw, "KRW", locale, { short: true });
  const src = scratch.image ?? houses[1].image;
  const after = scratch.after;
  const failed = !after && scratch.afterError;
  const code = savedType();
  const ty = code ? TYPES[code] : null;
  const [pos, setPos] = useState(50);
  // ponytail: "after" is a CSS filter on the same photo; replace with a real generation endpoint
  const cells = [
    { i: "payments", l: t.sim.cost, v: m(29_000_000), s: `${t.sim.costSub} ${m(14_500_000)}`, acc: true },
    { i: "thermostat", l: t.sim.insul, v: "B → A", s: t.sim.insulSub },
    { i: "schedule", l: t.sim.duration, v: `11 ${t.sim.weeks}` },
    { i: "wifi", l: t.sim.infra, v: "OK", s: t.sim.infraSub },
  ];
  return (
    <Page>
      <TopBar title={t.nav.simulate} back="/simulate/upload" />
      <Section gap={32}>
        <H2 data-reveal>{t.sim.resultTitle}</H2>
        {ty && <p data-reveal style={{ margin: "6px 0 0", fontSize: 13, color: T.color.muted }}><span style={{ fontWeight: 700, color: T.color.brand }}>{code}</span> {L(ty.name)} · {t.sim.styleOf}</p>}
        <Media data-reveal style={{ marginTop: 20 }}>
          <img src={src} alt="" style={after ? undefined : { filter: "grayscale(1) contrast(.85) brightness(.82) sepia(.25)" }} />
          <img src={after ?? src} alt="" style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${pos}%)`, filter: after ? undefined : "saturate(1.2) brightness(1.08) contrast(1.05)" }} />
          <Handle style={{ left: `${pos}%` }} />
          <Badge style={{ position: "absolute", left: 12, top: 12 }}>{t.sim.before}</Badge>
          <Badge style={{ position: "absolute", right: 12, top: 12 }}>{t.sim.after}</Badge>
        </Media>
        <div data-reveal>
          <Range type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} />
          <Caption style={{ marginTop: 6, textAlign: "center" }}>{t.sim.drag}</Caption>
          {failed && <Caption style={{ marginTop: 4, textAlign: "center", color: T.color.brand }}>{t.sim.genFail}</Caption>}
        </div>
        <Grid2 style={{ marginTop: 28, rowGap: 0, columnGap: 20 }}>
          {cells.map((c) => (
            <div key={c.l} data-reveal style={{ padding: "16px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
              <Row gap={6}><Icon name={c.i} size={18} weight={300} style={{ color: T.color.muted }} /><Label>{c.l}</Label></Row>
              <Body className="num" style={{ fontSize: 22, fontWeight: 700, marginTop: 6, letterSpacing: "-0.02em", color: c.acc ? T.color.brand : T.color.ink }}>{c.v}</Body>
              {c.s && <Small style={{ marginTop: 2, fontSize: 12 }}>{c.s}</Small>}
            </div>
          ))}
        </Grid2>
        <div data-reveal style={{ marginTop: 28 }}><Pill href="/houses" variant="outline" full trailing="arrow_forward">{t.sim.similar}</Pill></div>
      </Section>
    </Page>
  );
}
