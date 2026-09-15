"use client";
import Link from "next/link";
import { Icon } from "./ui";
import { useT } from "@/lib/i18n";
import { avatars, type Post } from "@/lib/data";
import { theme as T } from "@/lib/theme";

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const src = avatars[name];
  return src
    ? <img src={src} alt="" width={size} height={size} style={{ borderRadius: "50%", objectFit: "cover", flex: "none", outline: "1px solid rgba(0,0,0,.06)", outlineOffset: -1 }} />
    : <span style={{ width: size, height: size, borderRadius: "50%", background: T.color.canvasSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.4, fontWeight: 700, flex: "none" }}>{name[0]}</span>;
}

export default function PostCard({ p }: { p: Post }) {
  const { t, L } = useT();
  return (
    <Link href={`/community/${p.id}`} style={{ display: "block", padding: "18px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={p.author} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{p.author}{p.role === "local" && <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 600, color: T.color.brand }}>{t.comm.local}</span>}</p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: T.color.muted }}>{L(p.region)} · {L(p.ago)} {t.common.ago}</p>
        </div>
        <span style={{ fontSize: 12, fontWeight: 500, color: T.color.faint }}>{t.ui.feedTabs[p.cat]}</span>
      </div>
      <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{L(p.body)}</p>
      {p.image && <img src={p.image} alt="" loading="lazy" style={{ marginTop: 12, width: "100%", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 10, outline: "1px solid rgba(0,0,0,.06)", outlineOffset: -1 }} />}
      <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 13, color: T.color.muted }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="favorite" size={17} weight={300} />{p.likes}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="chat_bubble" size={16} weight={300} />{p.replies.length}</span>
      </div>
    </Link>
  );
}
