"use client";
import { Badge, H2, Lead, Page, Pill, Section, Step, TopBar } from "@/components/ui";
import { demoImage } from "@/lib/data";
import { useT } from "@/lib/i18n";

export default function SimIntro() {
  const { t } = useT();
  return (
    <Page>
      <TopBar title={t.nav.simulate} />
      <Section gap={16}>
        <div data-reveal style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 24, overflow: "hidden", background: "#f0f0f0" }}>
          <img src={demoImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(.85) brightness(.8)" }} />
          <img src={demoImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", clipPath: "inset(0 0 0 52%)", filter: "saturate(1.15) brightness(1.05)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "52%", width: 2, background: "#fff" }} />
          <Badge style={{ position: "absolute", left: 12, top: 12 }}>{t.sim.before}</Badge>
          <Badge style={{ position: "absolute", right: 12, top: 12 }}>{t.sim.after}</Badge>
        </div>
        <H2 data-reveal style={{ marginTop: 24 }}>{t.sim.title}</H2>
        <Lead data-reveal style={{ marginTop: 12 }}>{t.sim.lead}</Lead>
        <div style={{ marginTop: 28 }}>
          <div data-reveal><Step n={1} text={t.sim.s1} /></div>
          <div data-reveal><Step n={2} text={t.sim.s2} /></div>
          <div data-reveal><Step n={3} text={t.sim.s3} /></div>
        </div>
        <div data-reveal style={{ marginTop: 32 }}><Pill href="/simulate/upload" full>{t.sim.start}</Pill></div>
      </Section>
    </Page>
  );
}
