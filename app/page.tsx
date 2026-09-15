"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";
import { HScroll, Icon, NavBtn, Page, Row, SectionTitle } from "@/components/ui";
import Carousel from "@/components/Carousel";
import HouseCard, { HouseRow, pct } from "@/components/HouseCard";
import { houses } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";
import { convert, money } from "@/lib/money";

const Grey = styled.div`background: #fff; margin: 0 -20px; padding: 0 20px;`;
const Brand = styled.header`height: 60px; display: flex; align-items: center; justify-content: space-between; margin: 0 -8px 0 0;`;
const Cats = styled.div`display: flex; justify-content: space-between; margin: 4px -8px 0;`;
const Cat = styled(Link)`
  display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 56px; padding: 6px 4px; border-radius: 12px;
  font-size: 12px; font-weight: 600; white-space: nowrap; letter-spacing: -0.01em; color: ${T.color.ink}; transition: background-color 120ms ease-out; &:active { background: ${T.color.canvasSoft}; }
`;
const SearchCard = styled.div`margin-top: 16px; background: #fff; border-radius: 18px; padding: 6px 20px 20px; border: 1px solid ${T.color.hairline}; box-shadow: 0 4px 16px rgba(20,20,20,.06);`;
const Field = styled(Link)`display: flex; align-items: center; gap: 10px; height: 56px; font-size: 16px; font-weight: 600; color: ${T.color.ink}; border-bottom: 1px solid ${T.color.hairlineSoft};`;
const Btn = styled(Link)`display: flex; align-items: center; justify-content: center; height: 50px; margin-top: 12px; border-radius: 12px; background: ${T.color.brand}; color: #fff; font-size: 15px; font-weight: 700;`;
const Surface = styled.section`background: #fff; margin: 0 -20px; padding: 28px 20px 32px; border-top: 1px solid ${T.color.hairlineSoft};`;
const Event = styled(Link)`
  position: relative; width: 300px; aspect-ratio: 16 / 8.5; border-radius: 14px; overflow: hidden; background: ${T.color.field};
  img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.78); }
  .scrim { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.66) 0%, rgba(0,0,0,.42) 55%, rgba(0,0,0,.14) 100%); }
  .copy { position: absolute; left: 20px; right: 20px; bottom: 18px; color: #fff; }
  p { margin: 0; } .k { font-size: 12px; font-weight: 600; opacity: .85; } .v { font-size: 20px; font-weight: 800; line-height: 1.25; margin-top: 4px; white-space: pre-line; letter-spacing: -0.01em; }
`;
const RegionTile = styled(Link)`
  position: relative; width: 128px; aspect-ratio: 1 / 1.05; border-radius: 12px; overflow: hidden; background: ${T.color.field};
  img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.82); }
  &::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.6) 100%); }
  span { position: absolute; left: 12px; bottom: 12px; z-index: 1; color: #fff; font-size: 15px; font-weight: 700; }
`;
const Black = styled.section`background: ${T.color.ink}; color: #fff; margin: 0 -20px; padding: 30px 20px 34px;`;
const Faq = styled.button<{ open?: boolean }>`
  width: 100%; text-align: left; padding: 16px 0; border-bottom: 1px solid ${T.color.hairlineSoft}; display: flex; flex-direction: column; gap: 10px;
  .q { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; } .q span.n { color: ${T.color.brand}; font-weight: 800; } .q .ic { margin-left: auto; color: ${T.color.faint}; }
  .a { font-size: 13px; line-height: 1.5; color: ${T.color.muted}; }
`;
const regionImgs = ["photo-1449844908441-8829872d2607", "photo-1518780664697-55e3ad937233", "photo-1494526585095-c41746248156", "photo-1583608205776-bfd35f0d9f83"];
const eventImgs = ["photo-1542640244-7e672d6cef4e", "photo-1493246507139-91e8fad9978e", "photo-1554995207-c18c203602cb"];
const catHrefs = ["/houses", "/houses/tono-03/support", "/diagnosis", "/simulate", "/community"];

export default function Home() {
  const { t, L, locale } = useT();
  const [faq, setFaq] = useState(-1);
  const deals = [...houses].sort((a, b) => convert(b.subsidyMax, b.cur, "ko") - convert(a.subsidyMax, a.cur, "ko"));
  return (
    <Page>
      <Grey>
        <Brand>
          <span style={{ fontSize: 22, fontWeight: 800, color: T.color.brand, letterSpacing: "-0.02em" }}>{t.app}</span>
          <Row gap={0}>
            <NavBtn href="/settings" aria-label="language"><Icon name="language" size={22} weight={400} /></NavBtn>
            <NavBtn href="/community" aria-label="menu"><Icon name="menu" size={24} weight={400} /></NavBtn>
          </Row>
        </Brand>
        <Cats>{t.yg.cats.map(([ic, label], i) => <Cat key={label} href={catHrefs[i]}><img src={`/3d/${ic}.png`} alt="" width={48} height={48} style={{ display: "block", filter: "drop-shadow(0 4px 8px rgba(20,20,20,.12))" }} />{label}</Cat>)}</Cats>
        <SearchCard>
          <Field href="/houses"><Icon name="search" size={22} /><span style={{ flex: 1, color: T.color.muted, fontWeight: 500 }}>{t.yg.searchPh}</span></Field>
          <Row between style={{ height: 54 }}>
            <Row gap={8} style={{ fontSize: 15, fontWeight: 600 }}><Icon name="payments" size={20} weight={400} />{t.yg.budget}</Row>
            <Row gap={8} style={{ fontSize: 15, fontWeight: 600 }}><Icon name="calendar_today" size={18} weight={400} />{t.yg.moveIn}</Row>
          </Row>
          <Btn href="/houses">{t.yg.searchBtn}</Btn>
        </SearchCard>
        <div style={{ height: 28 }} />
      </Grey>

      <Surface>
        <SectionTitle title={t.yg.events} href="/about" more={t.yg.eventsMore} />
        <Carousel>
          {t.yg.eventList.map(([k, v], i) => (
            <Event key={k} href={i === 2 ? "/simulate" : "/houses"}>
              <img src={`https://images.unsplash.com/${eventImgs[i]}?auto=format&fit=crop&w=800&q=70`} alt="" loading="lazy" />
              <div className="scrim" />
              <div className="copy"><p className="k">{k}</p><p className="v">{v}</p></div>
            </Event>
          ))}
        </Carousel>
      </Surface>

      <Surface>
        <SectionTitle title={t.yg.regions} />
        <HScroll>{t.yg.regionList.map((r, i) => <RegionTile key={r} href="/houses"><img src={`https://images.unsplash.com/${regionImgs[i]}?auto=format&fit=crop&w=400&q=70`} alt="" loading="lazy" /><span>{r}</span></RegionTile>)}</HScroll>
      </Surface>

      <Surface>
        <SectionTitle title={t.yg.picks} href="/houses" more={t.common.viewAll} />
        <HScroll>{houses.slice(0, 4).map((h) => <HouseCard key={h.id} h={h} w={176} />)}</HScroll>
      </Surface>

      <Surface>
        <SectionTitle title={t.yg.deals} href="/houses" more={t.common.viewAll} />
        <div>{deals.slice(0, 3).map((h) => <HouseRow key={h.id} h={h} />)}</div>
      </Surface>

      <Black>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>{t.yg.black}</p>
        <p style={{ margin: "6px 0 22px", fontSize: 13, color: "rgba(255,255,255,.6)" }}>{t.yg.blackSub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[houses[1], houses[5]].map((h) => (
            <Link key={h.id} href={`/houses/${h.id}`} style={{ minWidth: 0 }}>
              <div style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: 12, overflow: "hidden" }}>
                <img src={h.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                <span style={{ position: "absolute", left: 10, top: 10, height: 22, padding: "0 8px", borderRadius: 4, background: T.color.brand, color: "#fff", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center" }}>PICK</span>
              </div>
              <p style={{ margin: "12px 0 0", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{L(h.name)}</p>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{L(h.region)} · {L(h.tags[0])}</p>
              <p className="num" style={{ margin: "8px 0 0", fontSize: 15, fontWeight: 800 }}><span style={{ color: T.color.brandTint, marginRight: 6 }}>{pct(h)}%</span>{money(h.price, h.cur, locale)}</p>
            </Link>
          ))}
        </div>
      </Black>

      <Surface>
        <SectionTitle title={t.yg.faq} />
        {t.yg.faqList.map(([q, a], i) => (
          <Faq key={q} open={faq === i} onClick={() => setFaq(faq === i ? -1 : i)}>
            <span className="q"><span className="n">Q</span>{q}<Icon name={faq === i ? "expand_less" : "expand_more"} size={20} style={{ marginLeft: "auto", color: T.color.faint }} /></span>
            {faq === i && <span className="a">{a}</span>}
          </Faq>
        ))}
      </Surface>

      <div style={{ padding: "28px 0 12px", fontSize: 12, color: T.color.muted, lineHeight: 1.8 }}>
        <p style={{ margin: 0, fontWeight: 700, color: T.color.ink }}>{t.yg.support}</p>
        <p style={{ margin: 0 }}>{t.yg.supportHours}</p>
        <p style={{ margin: 0 }}>{t.yg.supportMail}</p>
        <p style={{ margin: "12px 0 0", fontSize: 11, color: T.color.faint }}>{t.home.footerTag}</p>
      </div>
    </Page>
  );
}
