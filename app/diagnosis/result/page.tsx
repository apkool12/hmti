"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Body, Grid2, H2, H3, Label, Lead, Page, Pill, Small, Stack, TopBar } from "@/components/ui";
import HouseCard from "@/components/HouseCard";
import { axisScores, decode, houses, resultPicks, score, scratch, typeCode } from "@/lib/data";
import { TYPES } from "@/lib/types";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";
import { money } from "@/lib/money";

function Result() {
  const { t, L, locale } = useT();
  const a = decode(useSearchParams().get("a")) ?? Array(16).fill(1);
  const p = axisScores(a);
  const k = score(a);
  const code = typeCode(p);
  const ty = TYPES[code];
  const r = t.diag.types[k];
  useEffect(() => { scratch.type = code; try { localStorage.setItem("hmti_type", code); } catch {} }, [code]);
  const m = (krw: number) => money(krw, "KRW", locale, { short: true });
  const cells = [[t.diag.initial, m(32_000_000), false], [t.diag.monthly, m(1_180_000), false], [t.diag.subsidy, "-" + m(17_000_000), true], [t.diag.payback, "2.4y", false]] as const;
  return (
    <Page>
      <TopBar title="HMTI AI" back="/diagnosis" />
      <div style={{ paddingTop: 32 }}>
        <Label data-reveal>{t.diag.resultType}</Label>
        <p data-reveal className="num" style={{ margin: "8px 0 0", fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: T.color.brand }}>{code}</p>
        <H2 data-reveal style={{ marginTop: 10 }}>{L(ty.name)}</H2>
        <Lead data-reveal style={{ marginTop: 14 }}>{L(ty.desc)}</Lead>
        <p data-reveal style={{ margin: "10px 0 0", fontSize: 13, color: T.color.muted }}>{r.name} · {r.desc}</p>
        <div data-reveal style={{ marginTop: 20 }}><Pill href="/simulate/upload" full icon="auto_fix_high">{t.diag.renoCta}</Pill></div>

        <div data-reveal style={{ marginTop: 32 }}>
          {t.quiz.axes.map(([A, B], i) => (
            <div key={A} style={{ padding: "14px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                <span style={{ color: p[i] >= 50 ? T.color.brand : T.color.muted }}>{A} <span className="num">{p[i]}%</span></span>
                <span style={{ color: p[i] < 50 ? T.color.ink : T.color.muted }}><span className="num">{100 - p[i]}%</span> {B}</span>
              </div>
              <div style={{ position: "relative", height: 8, borderRadius: 4, background: T.color.hairlineSoft, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${p[i]}%`, background: p[i] >= 50 ? T.color.brand : T.color.hairline, borderRadius: 4 }} />
                <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: `${100 - p[i]}%`, background: p[i] < 50 ? T.color.ink : "transparent", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        <div data-reveal style={{ marginTop: 28 }}>
          <Label>{t.diag.budget}</Label>
          <Grid2 style={{ marginTop: 6, rowGap: 0, columnGap: 20 }}>
            {cells.map(([lab, val, acc]) => <div key={lab} style={{ padding: "14px 0", borderBottom: `1px solid ${T.color.hairlineSoft}` }}><Small>{lab}</Small><Body className="num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: acc ? T.color.brand : T.color.ink }}>{val}</Body></div>)}
          </Grid2>
        </div>
        <H3 data-reveal style={{ marginTop: 36, fontSize: 20, fontWeight: 700 }}>{t.diag.picks}</H3>
        <Stack gap={24} style={{ marginTop: 16 }}>{resultPicks[k].map((id) => <div key={id} data-reveal><HouseCard h={houses.find((h) => h.id === id)!} compact /></div>)}</Stack>
        <div data-reveal style={{ marginTop: 24 }}><Pill href="/diagnosis/quiz" variant="outline" full icon="replay">{t.diag.retry}</Pill></div>
      </div>
    </Page>
  );
}
export default function ResultPage() { return <Suspense><Result /></Suspense>; }
