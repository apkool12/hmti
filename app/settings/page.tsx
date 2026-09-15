"use client";
import styled from "@emotion/styled";
import { H2, Icon, Lead, Page, Section, Stack, TopBar, dom } from "@/components/ui";
import { useT, type Locale } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

const RowBtn = styled("button", dom)<{ active: boolean }>`
  display: flex; align-items: center; justify-content: space-between; width: 100%; height: 56px; text-align: left;
  font-size: 16px; font-weight: ${(p) => (p.active ? 700 : 500)}; color: ${(p) => (p.active ? T.color.brand : T.color.ink)}; border-bottom: 1px solid ${T.color.hairlineSoft};
`;

export default function Settings() {
  const { t, locale, setLocale } = useT();
  const opts: { k: Locale; label: string }[] = [{ k: "ko", label: t.settings.ko }, { k: "en", label: t.settings.en }, { k: "ja", label: t.settings.ja }];
  return (
    <Page>
      <TopBar back="/" title="" right={<span style={{ width: 40 }} />} />
      <Section gap={24}>
        <H2 data-reveal>{t.settings.title}</H2>
        <Lead data-reveal style={{ marginTop: 12 }}>{t.settings.lead}</Lead>
        <Stack gap={0} style={{ marginTop: 20 }}>
          {opts.map((o) => (
            <div key={o.k} data-reveal>
              <RowBtn active={locale === o.k} onClick={() => setLocale(o.k)}>{o.label}{locale === o.k && <Icon name="check" size={22} />}</RowBtn>
            </div>
          ))}
        </Stack>
      </Section>
    </Page>
  );
}
