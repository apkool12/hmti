"use client";
import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import Link from "next/link";
import { theme as T } from "@/lib/theme";
import type { ReactNode, CSSProperties } from "react";
import React from "react";

/* ---------- prop filtering: style-only props never reach the DOM or next/link ---------- */
const custom = new Set(["brand", "on", "active", "v", "full", "small", "soft", "pad", "radius", "dark", "size", "ratio", "gap", "between", "end", "accent"]);
export const dom = { shouldForwardProp: (p: string) => !custom.has(p) && isPropValid(p) };
export const comp = { shouldForwardProp: (p: string) => !custom.has(p) };

/* ---------- Icon (Material Symbols Rounded) ---------- */
export const Icon = ({ name, size = 24, fill = false, weight = 500, style }: { name: string; size?: number; fill?: boolean; weight?: number; style?: CSSProperties }) => (
  <span className="msr" aria-hidden style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size <= 24 ? 24 : 48}`, ...style }}>{name}</span>
);

/* ---------- Type ---------- */
export const Display = styled.h1`font-size: 56px; font-weight: 800; line-height: 1; margin: 0; letter-spacing: -0.03em;`;
export const H1 = styled.h1`font-size: 32px; font-weight: 700; line-height: 1.15; margin: 0; letter-spacing: -0.025em;`;
export const H2 = styled.h2`font-size: 24px; font-weight: 700; line-height: 1.25; margin: 0; letter-spacing: -0.02em;`;
export const H3 = styled.h3`font-size: 20px; font-weight: 700; line-height: 1.3; margin: 0; letter-spacing: -0.02em;`;
export const H4 = styled.h4`font-size: 17px; font-weight: 600; line-height: 1.35; margin: 0; letter-spacing: -0.015em;`;
export const Lead = styled.p`font-size: 16px; font-weight: 400; line-height: 1.55; margin: 0; color: ${T.color.muted}; letter-spacing: -0.01em;`;
export const Body = styled.p`font-size: 15px; line-height: 1.5; margin: 0;`;
export const Small = styled.p`font-size: 13px; line-height: 1.5; margin: 0; color: ${T.color.muted};`;
export const Label = styled.p`font-size: 12px; font-weight: 600; line-height: 1.4; margin: 0; color: ${T.color.muted}; letter-spacing: 0;`;
export const Caption = styled.p`font-size: 12px; line-height: 1.5; margin: 0; color: ${T.color.faint}; letter-spacing: 0;`;

/* ---------- Layout ---------- */
export const Page = styled.main`padding: 0 20px calc(96px + env(safe-area-inset-bottom)); background: ${T.color.canvas}; min-height: 100dvh;`;
export const Surface = styled.section`background: ${T.color.canvas}; margin: 0 -20px; padding: 24px 20px;`;
export const Section = styled("section", dom)<{ gap?: number }>`padding-top: ${(p) => p.gap ?? 40}px;`;
export const Stack = styled("div", dom)<{ gap?: number }>`display: grid; gap: ${(p) => p.gap ?? 12}px;`;
export const Row = styled("div", dom)<{ gap?: number; between?: boolean; end?: boolean }>`
  display: flex; align-items: ${(p) => (p.end ? "flex-end" : "center")}; gap: ${(p) => p.gap ?? 8}px;
  ${(p) => p.between && "justify-content: space-between;"}
`;
export const Grid2 = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 12px;`;
export const Hairline = styled.div`height: 1px; background: ${T.color.hairline};`;

/* ---------- Pill button ---------- */
const pillBase = `
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: 48px; padding: 0 20px; border-radius: 12px;
  font-size: 15px; font-weight: 700; line-height: 1; white-space: nowrap;
  transition: transform .12s ease, background .15s ease; user-select: none;
  &:active { transform: scale(.97); }
  &:disabled { opacity: .35; pointer-events: none; }
`;
const variants = {
  primary: `background: ${T.color.ink}; color: #fff;`,
  outline: `background: ${T.color.canvas}; color: ${T.color.ink}; border: 1px solid ${T.color.hairline};`,
  soft: `background: ${T.color.canvasSoft}; color: ${T.color.ink};`,
};
const PillBtn = styled("button", dom)<{ v: keyof typeof variants; full?: boolean; small?: boolean }>`
  ${pillBase} ${(p) => variants[p.v]} ${(p) => p.full && "width: 100%;"} ${(p) => p.small && "height: 40px; padding: 0 16px; font-size: 14px;"}
`;
const PillLink = styled(Link, comp)<{ v: keyof typeof variants; full?: boolean; small?: boolean }>`
  ${pillBase} ${(p) => variants[p.v]} ${(p) => p.full && "width: 100%;"} ${(p) => p.small && "height: 40px; padding: 0 16px; font-size: 14px;"}
`;
export function Pill({ href, variant = "primary", children, icon, trailing, ...rest }: {
  href?: string; variant?: keyof typeof variants; children: ReactNode; icon?: string; trailing?: string; full?: boolean; small?: boolean; onClick?: () => void; disabled?: boolean;
}) {
  const inner = <>{icon && <Icon name={icon} size={20} />}{children}{trailing && <Icon name={trailing} size={18} />}</>;
  if (href) return <PillLink href={href} v={variant} {...rest}>{inner}</PillLink>;
  return <PillBtn v={variant} {...rest}>{inner}</PillBtn>;
}

/* ---------- Icon button (round) ---------- */
export const IconBtn = styled.button`
  width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  background: ${T.color.canvas}; color: ${T.color.ink}; transition: transform .12s ease; &:active { transform: scale(.94); }
`;
export const IconLink = IconBtn.withComponent(Link);

/* ---------- Surfaces ---------- */
export const Card = styled("div", dom)<{ soft?: boolean; pad?: number; radius?: number }>`
  border-radius: ${(p) => p.radius ?? T.radius.md}px; padding: ${(p) => p.pad ?? 24}px;
  ${(p) => (p.soft ? `background: ${T.color.canvasSoft};` : `background: ${T.color.canvas}; border: 1px solid ${T.color.hairlineSoft};`)}
`;
export const CardLink = styled(Link, comp)<{ soft?: boolean; pad?: number; radius?: number }>`
  display: block; border-radius: ${(p) => p.radius ?? T.radius.md}px; padding: ${(p) => p.pad ?? 24}px; transition: transform .12s ease; &:active { transform: scale(.985); }
  ${(p) => (p.soft ? `background: ${T.color.canvasSoft};` : `background: ${T.color.canvas}; border: 1px solid ${T.color.hairlineSoft};`)}
`;

export const Chip = styled.span`
  display: inline-flex; align-items: center; height: 26px; padding: 0 10px; border-radius: ${T.radius.full}px;
  background: ${T.color.canvasSoft}; font-size: 12px; font-weight: 500; white-space: nowrap;
`;
export const Badge = styled("span", dom)<{ accent?: boolean }>`
  display: inline-flex; align-items: center; gap: 4px; height: 24px; padding: 0 10px; border-radius: ${T.radius.full}px;
  background: ${(p) => (p.accent ? T.color.brand : T.color.overlay)}; color: #fff; font-size: 12px; font-weight: ${T.weight.semi};
  backdrop-filter: blur(6px);
`;
export const Squircle = styled("div", dom)<{ size?: number; dark?: boolean; brand?: boolean }>`
  width: ${(p) => p.size ?? 56}px; height: ${(p) => p.size ?? 56}px; border-radius: 30%; flex: none;
  display: flex; align-items: center; justify-content: center;
  background: ${(p) => (p.brand ? T.color.brandSoft : p.dark ? T.color.ink : T.color.canvasSoft)}; color: ${(p) => (p.brand ? T.color.brand : p.dark ? "#fff" : T.color.ink)};
`;

/* ---------- List row: plain text row with hairline, no tiles ---------- */
const RowBase = styled(Link)`
  display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1px solid ${T.color.hairlineSoft};
  &:active { opacity: .6; }
`;
export function ListRow({ href, icon, title, desc }: { href: string; icon: string; title: string; desc?: string; dark?: boolean }) {
  return (
    <RowBase href={href}>
      <Icon name={icon} size={22} weight={400} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{title}</p>
        {desc && <p style={{ margin: "2px 0 0", fontSize: 13, color: T.color.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{desc}</p>}
      </div>
      <Icon name="chevron_right" size={20} style={{ color: T.color.faint }} />
    </RowBase>
  );
}

/* ---------- Segmented control ---------- */
export const SegTrack = styled.div`display: inline-flex; padding: 4px; border-radius: ${T.radius.full}px; background: ${T.color.canvasSoft};`;
export const SegItem = styled("button", dom)<{ active?: boolean }>`
  height: 36px; padding: 0 16px; border-radius: ${T.radius.full}px; font-size: 14px; font-weight: ${T.weight.semi};
  background: ${(p) => (p.active ? T.color.canvas : "transparent")}; color: ${(p) => (p.active ? T.color.ink : T.color.muted)};
  transition: background .15s ease;
`;

/* ---------- Inputs ---------- */
export const Input = styled.input`
  width: 100%; height: 52px; padding: 0 18px; border: 0; border-radius: ${T.radius.sm}px; background: ${T.color.field};
  font-size: 16px; outline: none; &::placeholder { color: ${T.color.faint}; } &:focus { box-shadow: 0 0 0 1.5px ${T.color.brand} inset; }
`;
export const Textarea = styled.textarea`
  width: 100%; min-height: 160px; padding: 16px 18px; border: 0; border-radius: ${T.radius.sm}px; background: ${T.color.field};
  font-size: 16px; line-height: 1.5; outline: none; resize: none; &::placeholder { color: ${T.color.faint}; } &:focus { box-shadow: 0 0 0 1.5px ${T.color.brand} inset; }
`;

/* ---------- App headers ---------- */
const HeaderBar = styled("header", dom)<{ line?: boolean }>`
  position: sticky; top: 0; z-index: 40; height: 56px; padding: 0 12px; margin: 0 -20px;
  display: grid; grid-template-columns: 44px 1fr 44px; align-items: center;
  background: rgba(255,255,255,.92); backdrop-filter: saturate(180%) blur(16px); -webkit-backdrop-filter: saturate(180%) blur(16px);
  ${(p) => p.line && `border-bottom: 1px solid ${T.color.hairlineSoft};`}
`;
export const NavBtn = styled(Link)`
  width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: ${T.color.ink};
  &:active { background: ${T.color.canvasSoft}; }
`;
export const NavAction = styled.button`
  width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: ${T.color.ink};
  &:active { background: ${T.color.canvasSoft}; }
`;
export function TopBar({ title, back, right, line = true }: { title?: string; back?: string; right?: ReactNode; line?: boolean }) {
  return (
    <HeaderBar line={line}>
      {back ? <NavBtn href={back} aria-label="back"><Icon name="arrow_back_ios_new" size={20} /></NavBtn> : <span />}
      <span style={{ textAlign: "center", fontSize: 16, fontWeight: T.weight.semi, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
      <span style={{ display: "flex", justifyContent: "flex-end" }}>{right}</span>
    </HeaderBar>
  );
}

/* transparent header over photography */
export const FloatBtn = styled(Link)`
  width: 36px; height: 36px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.94); color: ${T.color.ink}; &:active { transform: scale(.94); }
`;
export const FloatAction = styled.button`
  width: 36px; height: 36px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.94); color: ${T.color.ink}; &:active { transform: scale(.94); }
`;

/* ---------- Search field ---------- */
export const Search = styled.div`
  display: flex; align-items: center; gap: 10px; height: 48px; padding: 0 16px; border-radius: ${T.radius.full}px;
  background: ${T.color.canvasSoft}; color: ${T.color.muted}; font-size: 15px;
  span.ph { flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
`;

/* ---------- Horizontal scroller ---------- */
export const HScroll = styled.div`
  display: flex; gap: 14px; overflow-x: auto; margin: 0 -20px; padding: 0 20px 4px; scroll-snap-type: x mandatory; scroll-padding-inline: 20px; overscroll-behavior-x: contain; scrollbar-width: none;
  &::-webkit-scrollbar { display: none; } > * { scroll-snap-align: start; flex: none; }
`;

/* ---------- Sticky bottom action bar ---------- */
export const BottomBar = styled.div`
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); z-index: 50; width: 100%; max-width: 430px;
  display: flex; align-items: center; gap: 12px; padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
  background: rgba(255,255,255,.94); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-top: 1px solid ${T.color.hairlineSoft};
`;

/* ---------- Media ---------- */
export const Media = styled("div", dom)<{ ratio?: string; radius?: number }>`
  &.media {}
  position: relative; aspect-ratio: ${(p) => p.ratio ?? "4 / 3"}; overflow: hidden; border-radius: ${(p) => p.radius ?? T.radius.md}px; background: ${T.color.field};
  img { width: 100%; height: 100%; object-fit: cover; }
`;
export const Overlay = styled.div`position: absolute; left: 12px; top: 12px; display: flex; gap: 6px;`;

/* ---------- Section title row ---------- */
export function SectionTitle({ title, href, more }: { title: string; href?: string; more?: string }) {
  return (
    <Row between style={{ marginBottom: 18 }}>
      <H3 style={{ fontSize: 20, fontWeight: 700 }}>{title}</H3>
      {href && <Link href={href} style={{ fontSize: 14, fontWeight: T.weight.semi, color: T.color.muted, display: "inline-flex", alignItems: "center", gap: 2 }}>{more}<Icon name="chevron_right" size={18} /></Link>}
    </Row>
  );
}

/* ---------- Stat ---------- */
export const MediaBox = (props: React.ComponentProps<typeof Media>) => <Media {...props} className={`media ${props.className ?? ""}`} />;

export function Stat({ value, label, sub }: { value: ReactNode; label: string; sub?: string }) {
  return (
    <div>
      <Display as="p" style={{ fontSize: 44 }}>{value}</Display>
      <Body style={{ marginTop: 8, fontWeight: T.weight.semi }}>{label}</Body>
      {sub && <Small style={{ marginTop: 2 }}>{sub}</Small>}
    </div>
  );
}

/* ---------- Step: plain numbered row ---------- */
export function Step({ n, text }: { n: number; icon?: string; text: string }) {
  return (
    <Row gap={16} style={{ padding: "14px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
      <span style={{ width: 20, fontSize: 13, fontWeight: 600, color: T.color.faint }}>{n}</span>
      <Body style={{ flex: 1 }}>{text}</Body>
    </Row>
  );
}

