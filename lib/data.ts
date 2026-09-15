import { l, type L } from "./i18n";
import type { Cur } from "./money";

export type Condition = "good" | "fix" | "major";
export type House = {
  id: string; name: L; region: L; country: "JP" | "KR"; price: number; size: L; built: number;
  condition: Condition; tags: L[]; image: string; lat: number; lng: number; photos: number; cur: Cur; monthly: number; subsidyMax: number; jobs: L[]; transport: L; support: L[];
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=72`;

export const houses: House[] = [
  {
    id: "morioka-01", country: "JP", cur: "JPY", price: 2800000, built: 1978, condition: "fix",
    lat: 39.7, lng: 141.15,
    photos: 6, monthly: 38000, subsidyMax: 1000000,
    name: l("모리오카 외곽 목조 단독", "Wooden house, Morioka outskirts", "盛岡郊外の木造一戸建て"),
    region: l("이와테현 모리오카시", "Morioka, Iwate", "岩手県盛岡市"),
    size: l("112㎡ · 4LDK", "112㎡ · 4LDK", "112㎡ · 4LDK"),
    tags: [l("텃밭", "Garden", "家庭菜園"), l("역 도보 15분", "15 min to station", "駅徒歩15分"), l("리노베 보조금", "Reno subsidy", "リノベ補助")],
    image: img("photo-1568605114967-8130f3a36994"),
    jobs: [l("IT 원격근무 허브", "Remote-work hub", "ITリモートワーク拠点"), l("지역 농협", "Local agricultural co-op", "地元農協"), l("관광 가이드", "Tour guide", "観光ガイド")],
    transport: l("JR 모리오카역 버스 25분 · 신칸센 도쿄 2시간 20분", "25 min by bus to JR Morioka · 2h20 to Tokyo by Shinkansen", "JR盛岡駅バス25分 · 新幹線で東京2時間20分"),
    support: [l("이주 지원금 최대 920만원", "Relocation grant up to $6,700", "移住支援金 最大100万円"), l("리노베이션 보조 50%", "50% renovation subsidy", "リノベ補助 50%"), l("청년 창업 임대료 감면", "Rent relief for young founders", "若者起業の家賃減免")],
  },
  {
    id: "hanamaki-02", country: "JP", cur: "JPY", price: 1500000, built: 1965, condition: "major",
    lat: 39.39, lng: 141.12,
    photos: 9, monthly: 29000, subsidyMax: 500000,
    name: l("하나마키 온천마을 고민가", "Old folk house, Hanamaki hot springs", "花巻温泉郷の古民家"),
    region: l("이와테현 하나마키시", "Hanamaki, Iwate", "岩手県花巻市"),
    size: l("150㎡ · 5DK", "150㎡ · 5DK", "150㎡ · 5DK"),
    tags: [l("온천 도보권", "Walk to onsen", "温泉徒歩圏"), l("정원", "Garden", "庭付き"), l("게스트하우스 적합", "Guesthouse-ready", "ゲストハウス向き")],
    image: img("photo-1533779283484-8ad4940aa3a8"),
    jobs: [l("온천 리조트", "Onsen resort", "温泉リゾート"), l("관광 스타트업", "Tourism startup", "観光スタートアップ"), l("농산물 가공", "Food processing", "農産物加工")],
    transport: l("하나마키 공항 20분 · JR 하나마키역 12분", "20 min to Hanamaki Airport · 12 min to JR Hanamaki", "花巻空港20分 · JR花巻駅12分"),
    support: [l("빈집 취득 보조 460만원", "Acquisition grant $3,300", "空き家取得補助 50万円"), l("게스트하우스 전환 컨설팅", "Guesthouse conversion consulting", "ゲストハウス転用コンサル")],
  },
  {
    id: "tono-03", country: "JP", cur: "JPY", price: 900000, built: 1958, condition: "major",
    lat: 39.33, lng: 141.53,
    photos: 7, monthly: 21000, subsidyMax: 450000,
    name: l("도노 민화마을 농가", "Farmhouse, Tono folklore village", "遠野 民話の里の農家"),
    region: l("이와테현 도노시", "Tono, Iwate", "岩手県遠野市"),
    size: l("180㎡ · 창고 별채", "180㎡ · barn annex", "180㎡ · 蔵付き"),
    tags: [l("농지 포함", "With farmland", "農地付き"), l("전통가옥", "Traditional", "伝統家屋"), l("커뮤니티 활발", "Active community", "コミュニティ活発")],
    image: img("photo-1518780664697-55e3ad937233"),
    jobs: [l("홉 농장", "Hop farm", "ホップ農場"), l("크래프트 맥주 양조", "Craft brewery", "クラフトビール醸造"), l("지역 관광", "Local tourism", "地域観光")],
    transport: l("JR 도노역 차량 10분", "10 min by car to JR Tono", "JR遠野駅 車10分"),
    support: [l("영농 정착 지원 3년", "3-year farming settlement support", "就農定着支援 3年"), l("주택 무상 임대 후 양도", "Free lease, then transfer", "住宅無償貸与後に譲渡")],
  },
  {
    id: "goesan-04", country: "KR", cur: "KRW", price: 38000000, built: 1989, condition: "good",
    lat: 36.82, lng: 127.79,
    photos: 5, monthly: 410000, subsidyMax: 12000000,
    name: l("괴산 산막이 마을 주택", "Village house, Goesan Sanmagi", "槐山サンマギ村の住宅"),
    region: l("충북 괴산군", "Goesan, Chungbuk", "忠清北道 槐山郡"),
    size: l("89㎡ · 방 3", "89㎡ · 3 rooms", "89㎡ · 3室"),
    tags: [l("즉시 입주", "Move-in ready", "即入居可"), l("청년 임대 우선", "Youth priority", "若者優先"), l("대전 1시간", "1h to Daejeon", "大田1時間")],
    image: img("photo-1502005229762-cf1b2da7c5d6"),
    jobs: [l("유기농 스마트팜", "Organic smart farm", "有機スマートファーム"), l("지역 디자인 스튜디오", "Local design studio", "地域デザインスタジオ"), l("원격근무", "Remote work", "リモートワーク")],
    transport: l("청주 IC 35분 · 대전 KTX 1시간 10분", "35 min to Cheongju IC · 1h10 to Daejeon KTX", "清州IC 35分 · 大田KTX 1時間10分"),
    support: [l("청년 귀촌 정착금 월 50만원", "Youth settlement $360/month", "若者帰村定着金 月50万ウォン"), l("빈집 리모델링 지원 1,200만원", "Remodeling grant $8,700", "空き家改修支援 1,200万ウォン")],
  },
  {
    id: "yeongwol-05", country: "KR", cur: "KRW", price: 24000000, built: 1982, condition: "fix",
    lat: 37.18, lng: 128.46,
    photos: 8, monthly: 330000, subsidyMax: 8000000,
    name: l("영월 동강 인근 벽돌집", "Brick house by the Donggang, Yeongwol", "寧越 東江近くのレンガ造り"),
    region: l("강원 영월군", "Yeongwol, Gangwon", "江原道 寧越郡"),
    size: l("72㎡ · 방 2", "72㎡ · 2 rooms", "72㎡ · 2室"),
    tags: [l("강 조망", "River view", "川の眺望"), l("작업실", "Studio", "アトリエ"), l("레저 관광", "Leisure tourism", "レジャー観光")],
    image: img("photo-1494526585095-c41746248156"),
    jobs: [l("래프팅·레저 운영", "Rafting and leisure", "ラフティング · レジャー運営"), l("농촌 콘텐츠 크리에이터", "Rural content creator", "農村コンテンツ制作"), l("지역 카페", "Local café", "地域カフェ")],
    transport: l("영월역 차량 15분 · 서울 2시간 30분", "15 min by car to Yeongwol Station · 2h30 to Seoul", "寧越駅 車15分 · ソウル2時間30分"),
    support: [l("빈집 무상 임대 5년", "5-year free lease", "空き家無償賃貸 5年"), l("창업 공간 지원", "Startup space support", "起業スペース支援")],
  },
  {
    id: "namhae-06", country: "KR", cur: "KRW", price: 55000000, built: 1975, condition: "fix",
    lat: 34.84, lng: 127.89,
    photos: 11, monthly: 520000, subsidyMax: 20000000,
    name: l("남해 독일마을 옆 한옥", "Hanok near German Village, Namhae", "南海 ドイツ村隣の韓屋"),
    region: l("경남 남해군", "Namhae, Gyeongnam", "慶尚南道 南海郡"),
    size: l("96㎡ · 마당", "96㎡ · courtyard", "96㎡ · 中庭"),
    tags: [l("바다 5분", "5 min to sea", "海まで5分"), l("한옥", "Hanok", "韓屋"), l("관광 수요", "Tourist demand", "観光需要")],
    image: img("photo-1583608205776-bfd35f0d9f83"),
    jobs: [l("숙박업", "Hospitality", "宿泊業"), l("해산물 가공", "Seafood processing", "海産物加工"), l("관광 콘텐츠", "Tourism content", "観光コンテンツ")],
    transport: l("남해 IC 20분 · 부산 2시간", "20 min to Namhae IC · 2h to Busan", "南海IC 20分 · 釜山2時間"),
    support: [l("관광형 빈집 리모델링 2,000만원", "Tourism remodeling grant $14,500", "観光型空き家改修 2,000万ウォン"), l("청년 창업 융자", "Youth startup loan", "若者起業融資")],
  },
];

export type Post = { id: number; author: string; role: "mover" | "local"; region: L; body: L; likes: number; ago: L; replies: { author: string; body: L }[]; cat: 1 | 2 | 3; image?: string; avatar?: string };
const face = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2.5&w=120&h=120&q=70`;
export const avatars: Record<string, string> = {
  Ayano: "/avatars/ayano.jpg", Eunsik: "/avatars/eunsik.jpg", Kotomi: "/avatars/kotomi.jpg",
  Jaseong: "/avatars/jaseong.jpg", Mina: face("photo-1544005313-94ddf0286df2"), Ken: face("photo-1506794778202-cad84cf45f1d"),
};

export const posts: Post[] = [
  { id: 1, author: "Ayano", role: "mover", cat: 3, image: img("photo-1554995207-c18c203602cb"), region: l("모리오카", "Morioka", "盛岡"), likes: 42, ago: l("2시간", "2h", "2時間"),
    body: l("리노베 3개월차. 바닥 뜯어보니 생각보다 상태가 괜찮았어요. 보조금 서류는 시청 이주과에 직접 가는 게 빠릅니다.", "Month 3 of renovation. The floor was in better shape than expected. For subsidy paperwork, going to the city relocation desk in person is fastest.", "リノベ3か月目。床を剥がしたら思ったより状態が良かった。補助金の書類は市役所の移住課に直接行くのが早いです。"),
    replies: [{ author: "Kotomi", body: l("이주과 담당자분 친절하셨어요. 목요일 오전 추천.", "The relocation desk staff were kind. Thursday mornings are quiet.", "移住課の担当の方、親切でした。木曜午前がおすすめ。") }] },
  { id: 2, author: "Eunsik", role: "local", cat: 2, region: l("괴산", "Goesan", "槐山"), likes: 18, ago: l("5시간", "5h", "5時間"),
    body: l("이번 주 토요일 마을 장터에 새로 오신 분들 소개 자리 있어요. 청년 텃밭 분양도 같이 접수합니다.", "This Saturday's village market has a welcome slot for newcomers. Youth garden plots are open for sign-up too.", "今週土曜の村の市場で新しく来た方の紹介の場があります。若者向け菜園の申込も同時受付。"),
    replies: [] },
  { id: 3, author: "Kotomi", role: "mover", cat: 3, image: img("photo-1533779283484-8ad4940aa3a8"), region: l("하나마키", "Hanamaki", "花巻"), likes: 67, ago: l("1일", "1d", "1日"),
    body: l("겨울 난방비가 걱정이었는데 단열 시뮬 결과랑 실제가 거의 비슷했어요. 창호 교체가 제일 효과 큼.", "I worried about winter heating, but the insulation simulation matched reality closely. Replacing windows made the biggest difference.", "冬の暖房費が心配でしたが、断熱シミュの結果と実際がほぼ同じでした。窓の交換が一番効果大。"),
    replies: [{ author: "Jaseong", body: l("창호 견적 어디서 받으셨어요?", "Where did you get the window quote?", "窓の見積もりはどこで？") }, { author: "Kotomi", body: l("시내 목공소 두 곳 비교했어요. DM 드릴게요.", "Compared two local carpentry shops. I'll DM you.", "市内の工務店2社を比較しました。DMしますね。") }] },
  { id: 4, author: "Jaseong", role: "mover", cat: 2, region: l("영월", "Yeongwol", "寧越"), likes: 31, ago: l("2일", "2d", "2日"),
    body: l("원격근무 하시는 분들, 영월역 근처 코워킹 생겼습니다. 광랜 잘 나와요.", "Remote workers: a coworking space opened near Yeongwol Station. Fiber is solid.", "リモートワークの方、寧越駅近くにコワーキングができました。光回線が快適です。"),
    replies: [] },
  { id: 5, author: "Mina", role: "mover", cat: 1, region: l("남해", "Namhae", "南海"), likes: 9, ago: l("3일", "3d", "3日"),
    body: l("남해 쪽 빈집 보고 있는데 태풍철 지붕 관리가 걱정이에요. 실제로 사시는 분들 어떠세요?", "Looking at houses in Namhae. Worried about roof upkeep in typhoon season. How is it for those living there?", "南海の空き家を見ていますが、台風シーズンの屋根管理が心配です。実際に住んでいる方はどうですか？"),
    replies: [{ author: "Ken", body: l("기와 고정 상태만 미리 확인하면 큰 문제 없어요. 매년 9월 전에 점검 한 번.", "If the tiles are fastened properly it's fine. One check before September each year.", "瓦の固定さえ確認しておけば大丈夫。毎年9月前に一度点検を。") }] },
  { id: 6, author: "Ken", role: "local", cat: 1, region: l("도노", "Tono", "遠野"), likes: 14, ago: l("4일", "4d", "4日"),
    body: l("도노 홉 농장에서 다음 시즌 같이 일할 청년 구합니다. 숙소 제공, 경험 없어도 괜찮아요.", "Tono hop farm is looking for young people for next season. Housing provided, no experience needed.", "遠野のホップ農場で来シーズン一緒に働く若者を募集。住居提供、未経験OK。"),
    replies: [] },
];

export const heroImage = img("photo-1449844908441-8829872d2607");
export const demoImage = img("photo-1568605114967-8130f3a36994");
export const storyImages = [img("photo-1554995207-c18c203602cb"), img("photo-1505873242700-f289a29e1e0f"), img("photo-1542640244-7e672d6cef4e")];

export const resultPicks = { farmer: ["tono-03", "goesan-04"], remote: ["morioka-01", "yeongwol-05"], host: ["hanamaki-02", "namhae-06"] } as const;
export type ResultKey = keyof typeof resultPicks;

// Likert scoring: 16 items, 4 per axis, answers -3..3. Odd-indexed items lean to pole B (reversed).
export const AXES = 4;
export function axisScores(a: number[]) {
  return [0, 1, 2, 3].map((ax) => {
    const items = a.slice(ax * 4, ax * 4 + 4);
    const sum = items.reduce((acc, v, i) => acc + (i % 2 === 0 ? v : -v), 0); // + = pole A
    return Math.round(((sum + 12) / 24) * 100); // % toward pole A
  });
}
export const codeLetters = [["H", "R"], ["C", "S"], ["B", "M"], ["L", "I"]] as const;
export function typeCode(p: number[]) { return p.map((v, i) => codeLetters[i][v >= 50 ? 0 : 1]).join(""); }
export function score(a: number[]): ResultKey {
  const [work, people, , money] = axisScores(a);
  if (work < 50) return "remote";
  if (people >= 50 && money < 50) return "host";
  return "farmer";
}
export function decode(s: string | null): number[] | null {
  if (!s) return null; const a = s.split(",").map(Number); return a.length === 16 && a.every((v) => v >= -3 && v <= 3) ? a : null;
}

// module-level scratch state that survives client-side navigation (no store needed for a prototype)
export const scratch: { image: string | null; after: string | null; afterError: string | null; posts: Post[] } = { image: null, after: null, afterError: null, posts };
