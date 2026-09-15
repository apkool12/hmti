"use client";
import { H2, Lead, Page, Pill, Section, Step, TopBar } from "@/components/ui";
import { useT } from "@/lib/i18n";

export default function DiagnosisIntro() {
  const { t } = useT();
  return (
    <Page>
      <TopBar title="HMTI AI" />
      <Section gap={16}>
        <div data-reveal style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 24, overflow: "hidden", background: "#f0f0f0" }}><img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=72" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        <H2 data-reveal style={{ marginTop: 24 }}>{t.diag.title}</H2>
        <Lead data-reveal style={{ marginTop: 12 }}>{t.diag.lead}</Lead>
        <div style={{ marginTop: 28 }}>
          <div data-reveal><Step n={1} text={t.diag.s1} /></div>
          <div data-reveal><Step n={2} text={t.diag.s2} /></div>
          <div data-reveal><Step n={3} text={t.diag.s3} /></div>
        </div>
        <div data-reveal style={{ marginTop: 32 }}><Pill href="/diagnosis/quiz" full trailing="arrow_forward">{t.diag.start}</Pill></div>
      </Section>
    </Page>
  );
}
