"use client";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Icon, NavBtn, Page, TopBar } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

const SIZES = [44, 36, 28, 22, 28, 36, 44];
const Item = styled("div", { shouldForwardProp: (p) => p !== "dim" })<{ dim: boolean }>`
  padding: 32px 0 30px; border-bottom: 1px solid ${T.color.hairlineSoft}; transition: opacity 200ms ease-out; opacity: ${(p) => (p.dim ? 0.38 : 1)};
  h2 { margin: 0 0 22px; font-size: 18px; font-weight: 650; line-height: 1.4; text-align: center; letter-spacing: -0.01em; }
`;
const Scale = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 6px;`;
const Dot = styled("button", { shouldForwardProp: (p) => !["sz", "tone", "on"].includes(p) })<{ sz: number; tone: string; on: boolean }>`
  width: ${(p) => p.sz}px; height: ${(p) => p.sz}px; border-radius: 50%; border: 2px solid ${(p) => p.tone}; flex: none; padding: 0;
  background: ${(p) => (p.on ? p.tone : "transparent")}; display: inline-flex; align-items: center; justify-content: center; color: #fff;
  transition: background-color 120ms ease-out, transform 120ms ease-out; &:active { transform: scale(.92); }
`;
const Hit = styled.span`display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px;`;
const Bar = styled.div`position: sticky; top: 56px; z-index: 30; margin: 0 -20px; padding: 10px 20px 12px; background: rgba(255,255,255,.94); backdrop-filter: blur(12px); border-bottom: 1px solid ${T.color.hairlineSoft};
  .track { height: 4px; border-radius: 2px; background: ${T.color.hairline}; overflow: hidden; } .fill { height: 100%; background: ${T.color.brand}; transition: width 240ms ease-out; }`;
const Submit = styled.button`
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; padding: 12px 20px calc(12px + env(safe-area-inset-bottom)); background: rgba(255,255,255,.94); backdrop-filter: blur(12px); border-top: 1px solid ${T.color.hairlineSoft};
  span { display: flex; align-items: center; justify-content: center; height: 50px; border-radius: 12px; background: ${T.color.brand}; color: #fff; font-size: 15px; font-weight: 700; }
  &:disabled span { background: ${T.color.hairline}; color: ${T.color.faint}; }
`;

export default function Quiz() {
  const { t } = useT();
  const router = useRouter();
  const n = t.quiz.items.length;
  const [ans, setAns] = useState<(number | null)[]>(Array(n).fill(null));
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const done = ans.filter((v) => v !== null).length;
  const current = ans.findIndex((v) => v === null);

  const pick = (i: number, v: number) => {
    const next = [...ans]; next[i] = v; setAns(next);
    const nxt = next.findIndex((x) => x === null);
    if (nxt !== -1 && nxt > i) setTimeout(() => refs.current[nxt]?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  };
  const submit = () => router.push(`/diagnosis/result?a=${ans.join(",")}`);
  const tone = (k: number) => (k < 3 ? T.color.brand : k > 3 ? T.color.ink : T.color.faint);

  return (
    <Page style={{ paddingBottom: 120 }}>
      <TopBar title="HMTI AI" back="/diagnosis" right={<NavBtn href="/settings" aria-label="language"><Icon name="language" size={22} weight={400} /></NavBtn>} line={false} />
      <Bar>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: T.color.muted, marginBottom: 8 }}><span>{t.quiz.progress} {Math.min(done + 1, n)} / {n}</span><span className="num">{n - done} {t.quiz.remaining}</span></div>
        <div className="track"><div className="fill" style={{ width: `${(done / n) * 100}%` }} /></div>
      </Bar>
      {t.quiz.items.map((q, i) => (
        <Item key={i} ref={(el) => { refs.current[i] = el; }} dim={ans[i] !== null || (current !== -1 && i > current)}>
          <h2>{q}</h2>
          <Scale>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.color.brand, width: 44, textAlign: "left" }}>{t.quiz.agree}</span>
            {SIZES.map((sz, k) => {
              const v = 3 - k; // left = agree(+3) … right = disagree(-3)
              return <Hit key={k}><Dot sz={sz} tone={tone(k)} on={ans[i] === v} onClick={() => pick(i, v)} aria-label={`${v}`}>{ans[i] === v && <Icon name="check" size={Math.max(12, sz - 20)} weight={700} />}</Dot></Hit>;
            })}
            <span style={{ fontSize: 13, fontWeight: 600, color: T.color.ink, width: 44, textAlign: "right" }}>{t.quiz.disagree}</span>
          </Scale>
        </Item>
      ))}
      <Submit disabled={done < n} onClick={submit}><span>{t.quiz.submit}{done < n ? ` · ${n - done}` : ""}</span></Submit>
    </Page>
  );
}
