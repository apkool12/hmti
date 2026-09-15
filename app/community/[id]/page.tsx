"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Body, Hairline, Icon, IconBtn, Input, Label, Page, Row, Section, Stack, TopBar } from "@/components/ui";
import { Avatar } from "@/components/PostCard";
import { scratch } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, L } = useT();
  const p = scratch.posts.find((x) => String(x.id) === id) ?? scratch.posts[0];
  const [text, setText] = useState("");
  const [liked, setLiked] = useState(false);
  const [, bump] = useState(0);
  const reply = () => { const b = text.trim(); if (!b) return; p.replies.push({ author: t.comm.me, body: l(b, b, b) }); setText(""); bump((x) => x + 1); };
  return (
    <Page>
      <TopBar title={L(p.region)} back="/community" right={<span style={{ width: 40 }} />} />
      <Section gap={28}>
        <Row gap={12} data-reveal>
          <Avatar name={p.author} size={40} />
          <div><Body style={{ fontWeight: 600 }}>{p.author}</Body><Label style={{ fontWeight: 450 }}>{p.role === "mover" ? t.comm.mover : t.comm.local} · {L(p.ago)} {t.common.ago}</Label></div>
        </Row>
        <Body data-reveal style={{ marginTop: 18, fontSize: 16, lineHeight: 1.6 }}>{L(p.body)}</Body>
        {p.image && <img data-reveal src={p.image} alt="" style={{ marginTop: 14, width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 12 }} />}
        <div data-reveal style={{ display: "flex", gap: 14, marginTop: 14, fontSize: 13, color: T.color.muted }}>
          <button onClick={() => setLiked(!liked)} style={{ display: "inline-flex", alignItems: "center", gap: 4, color: liked ? T.color.brand : T.color.muted, fontSize: 13 }}><Icon name="favorite" size={17} weight={300} fill={liked} />{p.likes + (liked ? 1 : 0)}</button>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="chat_bubble" size={16} weight={300} />{p.replies.length}</span>
        </div>
        <Hairline data-reveal style={{ margin: "28px 0 20px" }} />
        <Label data-reveal>{t.comm.replies} · {p.replies.length}</Label>
        <Stack gap={0} style={{ marginTop: 4 }}>
          {p.replies.map((r, i) => (
            <div key={i} data-reveal style={{ display: "flex", gap: 10, padding: "14px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
              <Avatar name={r.author} size={30} />
              <div style={{ flex: 1 }}><Body style={{ fontSize: 13, fontWeight: 600 }}>{r.author}</Body><Body style={{ marginTop: 3 }}>{L(r.body)}</Body></div>
            </div>
          ))}
        </Stack>
        <Row gap={8} data-reveal style={{ marginTop: 20 }}>
          <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && reply()} placeholder={t.comm.replyPh} />
          <IconBtn onClick={reply} style={{ width: 52, height: 52, background: T.color.ink, color: "#fff", flex: "none" }}><Icon name="send" size={20} weight={300} /></IconBtn>
        </Row>
      </Section>
    </Page>
  );
}
