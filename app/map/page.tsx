"use client";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Caption, Page, TopBar, Pill } from "@/components/ui";
import HouseCard from "@/components/HouseCard";
import { houses } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";
import { money } from "@/lib/money";

const CLUSTER = 48; // px at current zoom: closer pins collapse into a count pill

export default function MapPage() {
  const { t, locale } = useT();
  const [sel, setSel] = useState(0);
  const selRef = useRef(0); selRef.current = sel;
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !box.current) return;
      map = L.map(box.current, { zoomControl: false, attributionControl: false, tap: true } as import("leaflet").MapOptions);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, className: "osm" }).addTo(map);
      map.fitBounds(L.latLngBounds(houses.map((h) => [h.lat, h.lng] as [number, number])), { padding: [40, 40] });
      const layer = L.layerGroup().addTo(map);

      // ponytail: greedy O(n²) clustering per view; swap for supercluster when listings grow
      const render = () => {
        if (!map) return;
        layer.clearLayers();
        const pts = houses.map((h, i) => ({ i, p: map!.latLngToLayerPoint([h.lat, h.lng]) }));
        const groups: { x: number; y: number; ids: number[] }[] = [];
        pts.forEach(({ i, p }) => {
          const g = groups.find((g) => Math.hypot(g.x - p.x, g.y - p.y) < CLUSTER);
          if (g) { g.ids.push(i); g.x += (p.x - g.x) / g.ids.length; g.y += (p.y - g.y) / g.ids.length; } else groups.push({ x: p.x, y: p.y, ids: [i] });
        });
        groups.forEach((g) => {
          const on = g.ids.includes(selRef.current);
          const label = g.ids.length > 1 ? String(g.ids.length) : money(houses[g.ids[0]].price, houses[g.ids[0]].cur, locale);
          const icon = L.divIcon({ className: "", html: `<span class="pin num${on ? " on" : ""}">${label}</span>`, iconSize: [0, 0], iconAnchor: [0, 0] });
          const m = L.marker(map!.layerPointToLatLng(L.point(g.x, g.y)), { icon }).addTo(layer);
          m.on("click", () => {
            if (g.ids.length > 1 && map!.getZoom() < 11) { map!.flyTo(m.getLatLng(), map!.getZoom() + 2, { duration: 0.5 }); return; }
            const next = g.ids[(g.ids.indexOf(selRef.current) + 1) % g.ids.length] ?? g.ids[0];
            setSel(next); render();
          });
        });
      };
      map.on("moveend zoomend", render); render();
    })();
    return () => { cancelled = true; map?.remove(); };
  }, [locale]);

  return (
    <Page>
      <TopBar back="/houses" title={t.houses.map} right={<span style={{ width: 44 }} />} />
      <div style={{ position: "relative", margin: "16px -20px 0" }}>
        <div ref={box} style={{ height: 360, background: "#e9eef2" }} />
        <Caption style={{ position: "absolute", right: 8, bottom: 6, zIndex: 500, fontSize: 10, background: "rgba(255,255,255,.7)", padding: "1px 5px", borderRadius: 3 }}>© OpenStreetMap</Caption>
      </div>
      <style>{`
        .leaflet-container { font-family: inherit; }
        .leaflet-tile.osm { filter: saturate(.55) contrast(.95); }
        .pin { position: absolute; transform: translate(-50%, -100%); height: 30px; padding: 0 10px; border-radius: 15px; white-space: nowrap; display: inline-flex; align-items: center;
          font-size: 12px; font-weight: 700; letter-spacing: -0.01em; background: #fff; color: ${T.color.ink}; box-shadow: 0 1px 3px rgba(0,0,0,.18); cursor: pointer; }
        .pin::after { content: ""; position: absolute; left: 50%; bottom: -5px; width: 10px; height: 10px; background: inherit; transform: translateX(-50%) rotate(45deg); border-radius: 2px; }
        .pin.on { background: ${T.color.ink}; color: #fff; transform: translate(-50%, -100%) scale(1.06); z-index: 2; }
      `}</style>
      <div style={{ marginTop: 20 }}><HouseCard h={houses[sel]} compact /></div>
      <div style={{ marginTop: 20 }}><Pill href="/houses" variant="outline" full icon="list">{t.houses.list}</Pill></div>
    </Page>
  );
}
