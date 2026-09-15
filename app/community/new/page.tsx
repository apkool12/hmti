"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { H2, Page, Pill, Section, Textarea, TopBar } from "@/components/ui";
import { scratch } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

export default function NewPost() {
  const { t } = useT();
  const router = useRouter();
  const [text, setText] = useState("");
  const [cat, setCat] = useState<1 | 2 | 3>(1);
  const submit = () => {
    const body = text.trim(); if (!body) return;
    scratch.posts = [{ id: Date.now(), author: t.comm.me, role: "mover", cat, region: l(t.comm.region, t.comm.region, t.comm.region), body: l(body, body, body), likes: 0, ago: l(t.comm.now, t.comm.now, t.comm.now), replies: [] }, ...scratch.posts];
    router.push("/community");
  };
  return (
    <Page>
      <TopBar title={t.comm.write} back="/community" right={<span style={{ width: 40 }} />} />
      <Section gap={32}>
        <H2 data-reveal>{t.comm.newTitle}</H2>
        <div data-reveal style={{ display: "flex", gap: 8, marginTop: 20 }}>{([1, 2, 3] as const).map((c) => <button key={c} onClick={() => setCat(c)} style={{ height: 34, padding: "0 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, border: `1px solid ${cat === c ? T.color.ink : T.color.hairline}`, background: cat === c ? T.color.ink : "#fff", color: cat === c ? "#fff" : T.color.ink }}>{t.ui.feedTabs[c]}</button>)}</div>
        <div data-reveal style={{ marginTop: 12 }}><Textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder={t.comm.placeholder} /></div>
        <div data-reveal style={{ marginTop: 16 }}><Pill full disabled={!text.trim()} onClick={submit} icon="send">{t.comm.submit}</Pill></div>
      </Section>
    </Page>
  );
}
