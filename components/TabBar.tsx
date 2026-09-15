"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./ui";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

const Nav = styled.nav`
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); z-index: 50; width: 100%; max-width: 430px;
  display: flex; padding: 6px 8px calc(6px + env(safe-area-inset-bottom)); background: rgba(255,255,255,.94);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-top: 1px solid ${T.color.hairlineSoft};
`;
const Tab = styled(Link, { shouldForwardProp: (p) => p !== "active" })<{ active: boolean }>`
  flex: 1; height: 50px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  font-size: 10px; font-weight: ${(p) => (p.active ? 700 : 400)}; letter-spacing: 0; color: ${(p) => (p.active ? T.color.brand : T.color.muted)}; transition: color .15s ease;
`;
// sub-flows hide the tab bar and use their own bottom action bar
const hidden = [/^\/houses\/[^/]+/, /^\/diagnosis\/(quiz|result)/, /^\/simulate\/(upload|result)/, /^\/community\/(new|\d+)/, /^\/settings/, /^\/about/, /^\/map/];

export default function TabBar() {
  const path = usePathname();
  const { t } = useT();
  if (hidden.some((r) => r.test(path))) return null;
  const tabs = [
    { href: "/", icon: "home", label: t.nav.home },
    { href: "/houses", icon: "map", label: t.nav.houses },
    { href: "/diagnosis", icon: "psychology", label: t.nav.diagnosis },
    { href: "/simulate", icon: "auto_fix_high", label: t.nav.simulate },
    { href: "/community", icon: "forum", label: t.nav.community },
  ];
  return (
    <Nav>
      {tabs.map((x) => {
        const active = x.href === "/" ? path === "/" : path.startsWith(x.href);
        return <Tab key={x.href} href={x.href} active={active}><Icon name={x.icon} size={24} fill={active} weight={active ? 500 : 200} />{x.label}</Tab>;
      })}
    </Nav>
  );
}
