"use client";
import { Caption, H2, H3, Label, Lead, Page, Section, Small, Stack, Stat, TopBar, Pill } from "@/components/ui";
import CountUp from "@/components/CountUp";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

export default function About() {
  const { t, locale } = useT();
  const jp = locale === "en" ? <CountUp to={8.99} decimals={2} suffix="M" /> : <CountUp to={899} suffix={locale === "ko" ? "만" : "万"} />;
  const kr = locale === "en" ? <CountUp to={134} suffix="K" /> : <CountUp to={13.4} decimals={1} suffix={locale === "ko" ? "만" : "万"} />;
  return (
    <Page>
      <TopBar back="/" title={t.home.about} />
      <Section gap={24}>
        <H2 data-reveal>{t.about.title}</H2>
        <Lead data-reveal style={{ marginTop: 12 }}>{t.about.lead}</Lead>
      </Section>
      <Section gap={24}>
        <Stack gap={28}>
          <div data-reveal><Stat value={jp} label={t.about.jp} sub={t.about.jpSub} /></div>
          <div data-reveal><Stat value={kr} label={t.about.kr} sub={t.about.krSub} /></div>
          <div data-reveal><Stat value={t.about.aw} label={t.about.awSub} /></div>
        </Stack>
        <Lead data-reveal style={{ marginTop: 32, color: T.color.ink, fontWeight: 450 }}>{t.about.gap}</Lead>
      </Section>
      <Section gap={56}>
        <H2 data-reveal>{t.about.proof}</H2>
        <div style={{ marginTop: 8 }}>
          {[{ T: t.about.c1T, M: t.about.c1M, D: t.about.c1D }, { T: t.about.c2T, M: t.about.c2M, D: t.about.c2D }].map((c) => (
            <div key={c.T} data-reveal style={{ padding: "18px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
              <H3 style={{ fontSize: 20 }}>{c.T}</H3><Label style={{ marginTop: 2 }}>{c.M}</Label>
              <Small style={{ marginTop: 10, color: T.color.ink }}>{c.D}</Small>
            </div>
          ))}
        </div>
        <Lead data-reveal style={{ marginTop: 28, color: T.color.ink, fontWeight: 450 }}>{t.about.conclusion}</Lead>
        <Caption data-reveal style={{ marginTop: 24 }}>{t.about.source}</Caption>
        <div data-reveal style={{ marginTop: 32 }}><Pill href="/houses" full trailing="arrow_forward">{t.home.browse}</Pill></div>
      </Section>
    </Page>
  );
}
