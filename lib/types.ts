// standalone: no "use client" imports so this file is safe inside the API route
export type L = { ko: string; en: string; ja: string };
const l = (ko: string, en: string, ja: string): L => ({ ko, en, ja });

// 16 settler types = work(H/R) × people(C/S) × house(B/M) × money(L/I)
export const TYPES: Record<string, { name: L; desc: L }> = {
  HCBL: { name: l("마을 텃밭지기", "Village Gardener", "村の菜園番"), desc: l("직접 고친 농가에서 이웃과 수확을 나누는 사람. 보조금을 알뜰히 챙기며 마을에 뿌리내립니다.", "Fixes up a farmhouse by hand and shares the harvest with neighbors. Stretches every subsidy and puts down roots.", "自分で直した農家で収穫を隣人と分かち合う人。補助金を賢く使い、村に根を下ろします。") },
  HCBI: { name: l("고민가 호스트", "Farmhouse Host", "古民家ホスト"), desc: l("오래된 집을 정성껏 되살려 사람들을 맞이하는 사람. 좋은 재료에 아낌없이 투자합니다.", "Restores an old house with care and opens it to guests. Invests without hesitation in good materials.", "古い家を丁寧に蘇らせ、人をもてなす人。良い素材に惜しみなく投資します。") },
  HCML: { name: l("동네 새 이웃", "New Neighbor", "ご近所さん"), desc: l("바로 살 수 있는 집에 들어가 몸으로 부딪히며 마을 일에 뛰어드는 사람. 실속이 먼저입니다.", "Moves into a ready home and jumps into village life with both hands. Practical first.", "すぐ住める家に入り、体を動かして村の仕事に飛び込む人。実利が第一。") },
  HCMI: { name: l("마을 살롱 주인", "Village Salon Keeper", "村のサロン主"), desc: l("깔끔하게 단장한 집을 마을의 사랑방으로 여는 사람. 공간에 돈을 쓸 줄 압니다.", "Turns a polished home into the village living room. Knows how to spend on space.", "きれいに整えた家を村の集いの場にする人。空間にお金をかけられます。") },
  HSBL: { name: l("손수 짓는 은둔가", "Quiet Builder", "静かな造り手"), desc: l("조용한 곳에서 내 손으로 천천히 집을 완성해 가는 사람. 큰돈 없이도 꾸준합니다.", "Slowly completes a home with their own hands somewhere quiet. Steady, on a small budget.", "静かな場所で自分の手でゆっくり家を仕上げる人。大金がなくても続けます。") },
  HSBI: { name: l("숲속 공방장", "Forest Craftsman", "森の工房主"), desc: l("혼자만의 작업실을 위해 집을 제대로 뜯어고치는 사람. 재료와 도구를 아끼지 않습니다.", "Guts and rebuilds a house to make a private workshop. Never skimps on materials or tools.", "自分だけの工房のために家を本格的に作り替える人。素材と道具を惜しみません。") },
  HSML: { name: l("조용한 농부", "Quiet Farmer", "静かな農夫"), desc: l("손질된 집에 조용히 들어가 땅을 일구는 사람. 집보다 밭에 마음이 갑니다.", "Quietly settles into a tidy house and works the land. The field matters more than the house.", "手入れ済みの家に静かに入り、土を耕す人。家より畑に心が向きます。") },
  HSMI: { name: l("산장 오너", "Lodge Owner", "山荘オーナー"), desc: l("완성도 높은 집에서 자연을 누리며 몸 쓰는 일을 즐기는 사람. 품질에 투자합니다.", "Enjoys physical work and nature from a well-finished home. Pays for quality.", "完成度の高い家で自然を楽しみ、体を動かす人。品質に投資します。") },
  RCBL: { name: l("코워킹 이장", "Coworking Mayor", "コワーキング村長"), desc: l("원격으로 일하며 고쳐 쓴 집을 동네 작업 공간으로 여는 사람. 알뜰하게 판을 키웁니다.", "Works remotely and opens a fixed-up house as the neighborhood workspace. Grows it frugally.", "リモートで働き、直した家をご近所の作業場として開く人。堅実に広げます。") },
  RCBI: { name: l("리노베 크리에이터", "Reno Creator", "リノベクリエイター"), desc: l("리노베 과정 자체를 콘텐츠로 만드는 사람. 사람도 돈도 집으로 모입니다.", "Turns the renovation itself into content. People and money gather at the house.", "リノベの過程そのものをコンテンツにする人。人もお金も家に集まります。") },
  RCML: { name: l("동네 노트북러", "Café Remote", "ご近所ノマド"), desc: l("바로 살 수 있는 집에서 일하고, 저녁엔 동네 사람들과 어울리는 사람. 가볍게 시작합니다.", "Works from a move-in-ready home and hangs out with locals in the evening. Starts light.", "すぐ住める家で働き、夜はご近所と過ごす人。軽やかに始めます。") },
  RCMI: { name: l("게스트하우스 CEO", "Guesthouse CEO", "ゲストハウスCEO"), desc: l("일은 원격으로, 집은 숙소로 운영하는 사람. 깔끔한 공간에 투자해 사람을 부릅니다.", "Works remotely and runs the house as a guesthouse. Invests in a clean space that draws people.", "仕事はリモート、家は宿として運営する人。きれいな空間に投資して人を呼びます。") },
  RSBL: { name: l("은둔 개발자", "Cabin Coder", "隠れ家コーダー"), desc: l("조용한 집을 천천히 고치며 노트북으로 일하는 사람. 인터넷만 되면 충분합니다.", "Slowly fixes up a quiet house and works from a laptop. Fiber is all that's needed.", "静かな家をゆっくり直しながらノートPCで働く人。ネットさえあれば十分。") },
  RSBI: { name: l("스튜디오 장인", "Studio Artisan", "スタジオ職人"), desc: l("혼자 집중할 스튜디오를 위해 집을 제대로 만드는 사람. 마감과 빛에 돈을 씁니다.", "Builds the house properly around a studio for deep focus. Spends on finishes and light.", "集中できるスタジオのために家をきちんと作る人。仕上げと光にお金をかけます。") },
  RSML: { name: l("미니멀 원격러", "Minimal Remote", "ミニマルリモート"), desc: l("손 안 대도 되는 집에 들어가 조용히 일하는 사람. 짐도 비용도 최소로.", "Moves into a house that needs nothing and works quietly. Minimal stuff, minimal cost.", "手を入れなくていい家に入り、静かに働く人。荷物も費用も最小限。") },
  RSMI: { name: l("프라이빗 리트리터", "Private Retreater", "プライベート隠居"), desc: l("완성된 집에서 세상과 거리를 두고 일하는 사람. 편안함에는 값을 치릅니다.", "Works at a distance from the world in a finished home. Pays for comfort.", "完成した家で世間と距離を置いて働く人。快適さには対価を払います。") },
};

// prompt fragments per pole, assembled by code letters
const FRAG: Record<string, string> = {
  H: "a hands-on working countryside home: practical durable materials, a vegetable garden and a small tool shed, a sturdy wooden porch",
  R: "a calm work-from-home retreat: large windows, a visible quiet study nook, clean minimal facade, subtle modern touches",
  C: "welcoming and open to neighbors: a wide front porch with a bench, warm exterior lights, an open gate, a shared garden",
  S: "private and serene: hedges and trees for privacy, subdued lighting, a single quiet entrance",
  B: "renovated with visible character: original timber and stone preserved and restored, new roof and windows, aged materials kept",
  M: "fully modernized and turnkey: fresh render or siding, new roof, new windows, crisp clean finish",
  L: "budget-conscious: simple paint, repaired existing elements, no luxury additions, modest and tidy",
  I: "premium finishes: high-quality natural wood and stone, designer lighting, professionally landscaped garden",
};

export function renovationPrompt(code?: string | null) {
  const c = code && TYPES[code] ? code : "HCBL";
  const style = c.split("").map((k) => FRAG[k]).join("; ");
  return (
    "Photorealistic renovation of this exact house, as an after photo for a real-estate listing. Keep the same camera angle, framing, building shape, window positions and surroundings. " +
    `Renovation style: ${style}. ` +
    "Repair anything damaged or overgrown, soft warm evening light. No text, no people, no watermarks, no added buildings."
  );
}
