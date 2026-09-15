"use client";
import styled from "@emotion/styled";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui";
import { houses, scratch } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { theme as T } from "@/lib/theme";

const Screen = styled.main`position: fixed; inset: 0; margin: 0 auto; max-width: 430px; background: #000; color: #fff; display: flex; flex-direction: column;`;
const Top = styled.div`position: absolute; top: calc(12px + env(safe-area-inset-top)); left: 12px; right: 12px; z-index: 3; display: flex; justify-content: space-between; align-items: center;`;
const Round = styled.button`width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,.45); color: #fff; display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); &:active { transform: scale(.94); }`;
const View = styled.div`position: relative; flex: 1; overflow: hidden; background: #111; video, img, canvas { width: 100%; height: 100%; object-fit: cover; display: block; }`;
const Guide = styled.div`
  position: absolute; inset: 0; pointer-events: none; display: flex; align-items: center; justify-content: center;
  .frame { width: 82%; aspect-ratio: 4 / 3; border-radius: 16px; box-shadow: 0 0 0 9999px rgba(0,0,0,.35); outline: 1.5px solid rgba(255,255,255,.75); }
  .hint { position: absolute; bottom: 20px; left: 20px; right: 20px; text-align: center; font-size: 13px; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,.6); }
`;
const Controls = styled.div`height: 150px; padding-bottom: env(safe-area-inset-bottom); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; justify-items: center; background: #000;`;
const Side = styled.label`display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,.85); cursor: pointer; input { position: absolute; opacity: 0; width: 0; height: 0; }
  span.i { width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,.12); display: inline-flex; align-items: center; justify-content: center; }`;
const Shutter = styled.button`width: 76px; height: 76px; border-radius: 50%; border: 4px solid #fff; padding: 4px; background: transparent; span { display: block; width: 100%; height: 100%; border-radius: 50%; background: #fff; transition: transform 100ms ease-out; } &:active span { transform: scale(.88); }`;
const Bar = styled.div`display: flex; gap: 10px; padding: 14px 20px calc(14px + env(safe-area-inset-bottom)); background: #000;
  button, label { flex: 1; height: 50px; border-radius: 12px; font-size: 15px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; }
  .ghost { background: rgba(255,255,255,.12); color: #fff; } .go { background: ${T.color.brand}; color: #fff; }`;
const Busy = styled.div`position: absolute; inset: 0; z-index: 4; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; background: rgba(0,0,0,.6); backdrop-filter: blur(6px);
  .ring { width: 56px; height: 56px; border-radius: 50%; border: 3px solid rgba(255,255,255,.25); border-top-color: #fff; animation: spin .9s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`;
const Fallback = styled.div`position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 32px; text-align: center; color: rgba(255,255,255,.8); font-size: 14px; line-height: 1.5;`;

function Camera() {
  const { t } = useT();
  const router = useRouter();
  const preset = houses.find((h) => h.id === useSearchParams().get("house"));
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [shot, setShot] = useState<string | null>(preset?.image ?? null);
  const [denied, setDenied] = useState(false);
  const [busy, setBusy] = useState(false);

  const stop = () => { stream.current?.getTracks().forEach((x) => x.stop()); stream.current = null; };
  const start = useCallback(async () => {
    stop();
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 } }, audio: false });
      stream.current = s; if (video.current) { video.current.srcObject = s; await video.current.play(); } setDenied(false);
    } catch { setDenied(true); }
  }, [facing]);

  useEffect(() => { if (!shot) start(); return stop; }, [shot, start]);

  const capture = () => {
    const v = video.current; if (!v || !v.videoWidth) return;
    const c = document.createElement("canvas"); c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    setShot(c.toDataURL("image/jpeg", 0.88)); stop();
  };
  const onFile = (f?: File) => { if (f) { setShot(URL.createObjectURL(f)); stop(); } };
  const [, setErr] = useState(false);
  // downscale to ≤1280px JPEG so the request stays under the 4.5MB function body limit
  const shrink = (src: string) => new Promise<string>((res) => { const im = new Image(); im.crossOrigin = "anonymous"; im.onload = () => { const k = Math.min(1, 1280 / Math.max(im.width, im.height)); const c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL("image/jpeg", 0.86)); }; im.onerror = () => res(src); im.src = src; });
  const analyze = async () => {
    if (!shot) return; setBusy(true); setErr(false);
    try {
      const image = await shrink(shot);
      scratch.image = image; scratch.after = null; scratch.afterError = null;
      const r = await fetch("/api/renovate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image }) });
      const j = await r.json();
      if (r.ok && j.image) scratch.after = j.image; else { scratch.afterError = String(j.error ?? r.status); setErr(true); }
    } catch (e) { scratch.afterError = String(e); setErr(true); }
    router.push("/simulate/result");
  };

  return (
    <Screen>
      <Top>
        <Round onClick={() => router.push(preset ? `/houses/${preset.id}` : "/simulate")} aria-label="back"><Icon name="close" size={22} /></Round>
        {!shot && !denied && <Round onClick={() => setFacing((f) => (f === "environment" ? "user" : "environment"))} aria-label={t.cam.flip}><Icon name="cameraswitch" size={22} /></Round>}
      </Top>

      <View>
        {shot ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={shot} alt="" />
        ) : (
          <>
            <video ref={video} playsInline muted autoPlay />
            {denied ? (
              <Fallback><Icon name="no_photography" size={40} weight={300} />{t.cam.denied}</Fallback>
            ) : (
              <Guide><div className="frame" /><div className="hint">{t.cam.guide}</div></Guide>
            )}
          </>
        )}
        {busy && <Busy><div className="ring" /><span style={{ fontSize: 14, fontWeight: 600 }}>{t.cam.analyzing}</span></Busy>}
      </View>

      {shot ? (
        <Bar>
          <button className="ghost" onClick={() => setShot(null)}><Icon name="refresh" size={20} />{t.cam.retake}</button>
          <button className="go" onClick={analyze} disabled={busy}><Icon name="auto_awesome" size={20} />{t.cam.use}</button>
        </Bar>
      ) : (
        <Controls>
          <Side><input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} /><span className="i"><Icon name="photo_library" size={24} weight={300} /></span>{t.cam.gallery}</Side>
          <Shutter onClick={capture} disabled={denied} aria-label="shutter"><span /></Shutter>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, color: "rgba(255,255,255,.55)", lineHeight: 1.4 }}>{t.cam.tips.map((x) => <span key={x}>· {x}</span>)}</div>
        </Controls>
      )}
    </Screen>
  );
}
export default function UploadPage() { return <Suspense><Camera /></Suspense>; }
