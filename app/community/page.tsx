"use client";
import styled from "@emotion/styled";
import { useState } from "react";
import { Icon, NavBtn, Page, TopBar } from "@/components/ui";
import PostCard from "@/components/PostCard";
import { scratch } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

const Tabs = styled.div`display: flex; gap: 22px; margin: 0 -20px; padding: 0 20px; border-bottom: 1px solid ${T.color.hairlineSoft};`;
const Tab = styled("button", { shouldForwardProp: (p) => p !== "on" })<{ on: boolean }>`
  padding: 12px 2px; font-size: 15px; font-weight: 600; margin-bottom: -1px; border-bottom: 2px solid ${(p) => (p.on ? T.color.ink : "transparent")}; color: ${(p) => (p.on ? T.color.ink : T.color.faint)};
`;
const Fab = styled.a`
  position: fixed; right: max(20px, calc(50% - 215px + 20px)); bottom: calc(76px + env(safe-area-inset-bottom)); z-index: 45; height: 48px; padding: 0 18px 0 14px; border-radius: 999px;
  display: inline-flex; align-items: center; gap: 6px; background: ${T.color.ink}; color: #fff; font-size: 14px; font-weight: 600;
`;

export default function Community() {
  const { t } = useT();
  const [tab, setTab] = useState(0);
  return (
    <Page>
      <TopBar title={t.nav.community} line={false} right={<NavBtn href="/settings" aria-label="search"><Icon name="search" size={22} weight={400} /></NavBtn>} />
      <Tabs>{t.ui.feedTabs.map((x, i) => <Tab key={x} on={tab === i} onClick={() => setTab(i)}>{x}</Tab>)}</Tabs>
      <div style={{ marginTop: 4 }}>{scratch.posts.filter((p) => tab === 0 || p.cat === tab).map((p) => <PostCard key={p.id} p={p} />)}</div>
      <Fab href="/community/new"><Icon name="edit" size={20} />{t.comm.write}</Fab>
    </Page>
  );
}
