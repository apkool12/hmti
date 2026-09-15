"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "ko" | "en" | "ja";
export type L = Record<Locale, string>;
export const l = (ko: string, en: string, ja: string): L => ({ ko, en, ja });

const ko = {
  app: "HMTI",
  nav: { home: "홈", houses: "빈집", diagnosis: "진단", simulate: "시뮬", community: "커뮤니티" },
  common: { back: "뒤로", viewAll: "전체 보기", more: "더 보기", jp: "일본", kr: "한국", ago: "전" },
  home: {
    hero1: "빈집이 아니라,", hero2: "다음 삶이 시작되는 곳",
    lead: "일본과 한국의 농촌 빈집을 청년의 눈으로 다시 봅니다. 관심이 생긴 순간부터 이주까지 한 곳에서.",
    browse: "빈집 둘러보기", about: "왜 빈집인가",
    entries: "시작하기",
    diagnosisT: "나에게 맞는 집 찾기", diagnosisD: "16문항 5분, 4축 성향 분석",
    simulateT: "AI 리노베 미리보기", simulateD: "사진 한 장으로 비포 애프터까지",
    communityT: "먼저 온 사람에게 묻기", communityD: "이주민과 주민이 한 피드에 모여요",
    featured: "이번 주 매물",
    footerTag: "Hanbat National University × Iwate University · Team D",
  },
  about: {
    title: "빈집 문제 한눈에", lead: "전략 이야기는 잠시 미루고, 왜 이게 중요한지부터 봅니다.",
    jp: "일본 빈집", jpSub: "2023년 기준 전체 주택의 13.8%",
    kr: "한국 빈집", krSub: "2024년 기준 전체 주택의 0.7%",
    aw: "낮음", awSub: "청년 인지도, 이런 선택지가 있는 줄도 모릅니다",
    gap: "문제는 공급이 아닙니다. 기존 플랫폼은 이미 찾고 있는 사람만 만납니다. 저희는 관심이 생기기 전부터 시작합니다.",
    proof: "이미 TV에서 통했다",
    c1T: "효리네 민박", c1M: "JTBC · 2017–2018", c1D: "가수 이효리 부부가 제주 소길리 자택에서 무료 민박을 운영한 프로그램. 전국에 농촌살이와 게스트하우스 붐을 일으켰다.",
    c2T: "대개조!! 극적 비포애프터", c2M: "ABC TV / TV아사히 · 2002–", c2D: "낡은 집을 극적으로 뜯어고치는 장수 다큐. 지금도 특집으로 방영되는 리노베의 대명사다.",
    conclusion: "관심은 이미 있다. 없는 건 그 관심을 실제 이주로 잇는 길이다.",
    source: "출처: 일본 총무성 통계국 (2023 주택·토지 조사) · KRIHS 정책 브리프 No.1042 (2025.12)",
  },
  houses: {
    title: "실제 매물, 실제 상태", lead: "위치부터 상태, 지원 제도까지 한 번에 봅니다.",
    all: "전체", count: "개 매물", map: "지도로 보기",
    mapTitle: "지도", mapNote: "지도 영역(프로토타입)", list: "목록으로",
    built: "년 준공", overview: "개요", area: "지역", support: "지원",
    areaTitle: "지역 정보", jobs: "일자리", transport: "교통",
    supportTitle: "지원 제도", supportLead: "이 집에 쓸 수 있는 제도만 모았어요.",
    ctaSim: "이 집 AI 시뮬레이션", ctaAsk: "이 지역 이주민에게 묻기", ctaArea: "지역 정보 보기", ctaSupport: "지원 제도 보기",
    condGood: "양호", condFix: "수리 필요", condMajor: "대수선",
  },
  diag: {
    title: "나에게 맞는 집은?", lead: "16개 문장에 얼마나 동의하는지만 고르면 일, 관계, 집, 예산 네 축으로 정착 유형을 찾아드려요.",
    s1: "16문항 5분", s2: "성향과 예산, 일하는 방식 분석", s3: "정착 유형과 추천 매물까지",
    start: "진단 시작", analyzing: "답변을 분석하고 있어요.",
    resultType: "나의 정착 유형", budget: "예산 시뮬레이션",
    initial: "초기 비용", monthly: "월 생활비", subsidy: "보조금 적용", payback: "회수 기간",
    picks: "추천 매물", retry: "다시 진단하기",
    q: [
      { q: "주말 아침, 나는?", a: ["텃밭에 나가 흙을 만진다", "카페에서 노트북을 편다"] },
      { q: "이웃과는 어느 정도 거리가 좋나요?", a: ["매일 인사하고 반찬도 나누는", "적당히 인사만 하는"] },
      { q: "집은 어떤 상태가 좋나요?", a: ["손보면서 내 것으로 만드는 재미", "바로 들어가 살 수 있는 깔끔함"] },
      { q: "예산은 어느 정도 생각하세요?", a: ["최대한 아끼고 보조금 활용", "리노베에 투자할 여유 있음"] },
      { q: "일은 어떻게 할 생각인가요?", a: ["지역에서 새 일을 찾고 싶다", "지금 하는 원격근무를 이어간다"] },
    ],
    types: {
      farmer: { name: "성장하는 정착러", desc: "손으로 만들고 이웃과 나누는 삶. 농지 딸린 고민가, 커뮤니티가 활발한 마을이 잘 맞아요." },
      remote: { name: "조용한 원격러", desc: "일은 그대로, 풍경만 바꾸는 이주. 역과 인터넷이 가까운 소도시 외곽 주택이 잘 맞아요." },
      host: { name: "환대하는 호스트", desc: "사람이 오가는 집을 꿈꾸는 타입. 관광객이 찾는 지역의 게스트하우스 전환 매물이 잘 맞아요." },
    },
  },
  sim: {
    title: "고치기 전에, 먼저 봅니다.", lead: "빈집 사진을 올리면 리노베 후 모습은 물론 비용과 단열, 인프라까지 한 번에 보여드려요.",
    s1: "사진 촬영 또는 업로드", s2: "AI가 리노베와 재건축 미리보기 생성", s3: "비용, 단열, 인프라 한 화면에",
    start: "사진 올리기",
    uploadTitle: "사진 한 장이면 됩니다.", uploadHint: "촬영 또는 업로드", uploadSub: "오래된 집일수록 좋아요",
    generate: "리노베 미리보기 생성", generating: "생성 중", another: "다른 사진",
    resultTitle: "예상 결과", before: "Before", after: "After",
    cost: "리노베 비용", costSub: "보조금 후", insul: "단열 성능", insulSub: "난방비 -38%", duration: "공사 기간", weeks: "주",
    infra: "인프라", infraSub: "광랜, 상수도, 도시가스",
    similar: "비슷한 매물 보기", drag: "슬라이더를 움직여 비교해 보세요", genFail: "AI 생성에 실패해 예시 미리보기를 보여드려요",
  },
  comm: {
    title: "먼저 온 사람에게 묻기", lead: "이주민과 지역 주민이 한 피드에서 이야기해요.",
    write: "질문 올리기", newTitle: "무엇이 궁금한가요?", placeholder: "예: 겨울 난방비는 실제로 얼마나 드나요?",
    submit: "올리기", mover: "이주민", local: "주민", replies: "답글", replyPh: "답글 남기기", me: "나", region: "관심 지역", now: "방금",
  },
  ui: {
    search: "지역, 역, 조건으로 검색", chips: ["이와테", "충북", "강원", "경남", "온천 근처", "농지 포함", "즉시 입주"],
    heroCta: "빈집 둘러보기", recommended: "이번 주 추천", subsidyTop: "보조금이 큰 집", aiTitle: "AI로 먼저 보기", stories: "먼저 온 사람들",
    monthly: "월 예상", subsidyUp: "보조금 최대", contact: "문의하기", photos: "장", sort: "추천순", results: "개",
    area: "면적", rooms: "구성", built: "준공", cond: "상태", verified: "현장 확인 완료", saved: "관심", share: "공유",
    filterAll: "전체", feedTabs: ["전체", "질문", "소식", "후기"], greeting: "어디로 이주해 볼까요?",
  },
  yg: {
    cats: [["location", "빈집 찾기"], ["money-bag", "지원 제도"], ["bulb", "AI 진단"], ["magic-trick", "AI 시뮬"], ["chat-bubble", "커뮤니티"]],
    searchPh: "지역, 역, 조건으로 검색", budget: "예산 전체", moveIn: "입주 시기 무관", searchBtn: "빈집 찾기",
    events: "이벤트", eventsMore: "더보기",
    eventList: [["이와테현 이주 지원금", "최대 920만원\n지금 신청 가능"], ["청년 귀촌 정착금", "월 50만원\n최대 3년 지급"], ["AI 리노베 미리보기", "사진 한 장이면\n무료로 바로"]],
    regions: "인기 지역", regionList: ["이와테", "괴산", "영월", "남해"],
    picks: "이번 주 추천 매물", deals: "이번 달 마감 지원 제도", black: "HMTI Pick", blackSub: "현장 확인을 거친 이달의 집 두 채.",
    listPrice: "정가", finalPrice: "보조금 적용가", off: "보조금",
    faq: "자주 묻는 질문", faqList: [["빈집은 정말 이 가격에 살 수 있나요?", "표시 가격은 지자체 빈집뱅크 등록가 기준이며, 보조금 적용가는 신청 조건을 충족했을 때의 예상 금액입니다."], ["외국인도 일본 빈집을 살 수 있나요?", "살 수 있습니다. 다만 이주 지원금은 주민등록 이전 같은 조건이 붙으니 지원 제도 탭에서 확인해 주세요."], ["리노베 비용은 어떻게 계산하나요?", "AI 시뮬레이션은 사진을 바탕으로 한 추정치입니다. 실제 견적은 지역 시공사 2곳 이상 비교해 보세요."], ["커뮤니티 답변은 누가 하나요?", "실제 이주민과 그 지역 주민이 답해요. 프로필의 인증 배지로 구분할 수 있어요."]],
    support: "고객센터", supportHours: "평일 10:00 – 18:00 (점심 12:30 – 13:30)", supportMail: "hello@hmti.app",
  },
  quiz: {
    agree: "그렇다", disagree: "아니다", progress: "문항", submit: "결과 보기", remaining: "개 남음",
    axes: [["손으로 일하기", "원격으로 일하기"], ["함께 어울리기", "혼자 지내기"], ["고쳐서 살기", "바로 살기"], ["아끼며 정착", "투자하며 정착"]],
    items: [
      "몸을 쓰는 일에서 보람을 느낀다.", "지금 하는 일을 어디서든 노트북으로 이어갈 수 있다.", "새 지역에서 새 일을 시작하는 게 두렵지 않다.", "일하는 곳과 사는 곳은 떨어져 있는 편이 좋다.",
      "이웃과 음식을 나누는 일이 자연스럽다.", "혼자 있는 시간이 있어야 충전이 된다.", "마을 행사에 기꺼이 참여한다.", "낯선 사람이 집에 드나드는 건 부담스럽다.",
      "집을 직접 손보는 과정이 즐겁다.", "이사 첫날부터 바로 살 수 있어야 한다.", "세월의 흔적이 남아 있는 집이 좋다.", "수리에 시간을 쓰고 싶지 않다.",
      "보조금과 지원 제도를 꼼꼼히 챙기는 편이다.", "마음에 들면 예산을 넘겨서라도 투자한다.", "초기 비용은 최대한 낮추고 싶다.", "좋은 재료와 시공에는 돈을 아끼지 않는다.",
    ],
  },
  cam: { guide: "집 전체가 프레임 안에 들어오게 찍어주세요", retake: "다시 찍기", use: "이 사진으로 분석", gallery: "앨범", flip: "전환", denied: "카메라를 사용할 수 없어요. 앨범에서 사진을 골라주세요.", analyzing: "집 상태를 분석하고 있어요", tips: ["낮에, 정면에서", "지붕과 외벽이 보이게", "너무 가까이 가지 않기"] },
  settings: { title: "언어", lead: "앱에서 쓸 언어를 골라주세요.", ko: "한국어", en: "English", ja: "日本語" },
};

const en: typeof ko = {
  app: "HMTI",
  nav: { home: "Home", houses: "Houses", diagnosis: "Match", simulate: "Preview", community: "Community" },
  common: { back: "Back", viewAll: "View all", more: "More", jp: "Japan", kr: "Korea", ago: "ago" },
  home: {
    hero1: "Not a vacant house.", hero2: "A place to begin.",
    lead: "Rural homes in Japan and Korea, seen through young eyes. From curiosity to moving in, in one flow.",
    browse: "Browse houses", about: "Why vacant houses",
    entries: "Get started.",
    diagnosisT: "Find your kind of home", diagnosisD: "16 statements · 5 min · 4-axis profile",
    simulateT: "AI renovation preview", simulateD: "Before and after from one photo",
    communityT: "Ask someone who moved", communityD: "Newcomers and locals, one feed",
    featured: "This week's listings.",
    footerTag: "Hanbat National University × Iwate University · Team D",
  },
  about: {
    title: "The vacant house problem, in brief.", lead: "Why this matters, before we get into strategy.",
    jp: "Vacant houses in Japan", jpSub: "13.8% of all housing · 2023",
    kr: "Vacant houses in Korea", krSub: "0.7% of all housing · 2024",
    aw: "Low", awSub: "Youth awareness · most don't know these options exist",
    gap: "The problem isn't only supply. Existing platforms rely on people who are already searching. We start before the interest exists.",
    proof: "It already works on TV.",
    c1T: "Hyori's Homestay", c1M: "JTBC · 2017–2018", c1D: "Singer Lee Hyori and her husband ran a free guesthouse at their Jeju home. It sparked a nationwide rural-life and guesthouse boom.",
    c2T: "Before After", c2M: "ABC TV / TV Asahi · since 2002", c2D: "A long-running renovation documentary that dramatically rebuilds aging houses. Still airing as specials today.",
    conclusion: "Interest already exists. What's missing is a path that connects it to actually moving in.",
    source: "Source: Statistics Bureau of Japan (2023 Housing and Land Survey) · KRIHS Policy Brief No.1042 (Dec 2025)",
  },
  houses: {
    title: "Real listings, real condition.", lead: "Location, condition and subsidies, together.",
    all: "All", count: "listings", map: "Map view",
    mapTitle: "Map.", mapNote: "Map area · prototype", list: "Back to list",
    built: "built", overview: "Overview", area: "Area", support: "Support",
    areaTitle: "About the area.", jobs: "Jobs", transport: "Transport",
    supportTitle: "Support programs.", supportLead: "Only the programs that apply to this listing.",
    ctaSim: "AI preview for this house", ctaAsk: "Ask people who moved here", ctaArea: "See the area", ctaSupport: "See support",
    condGood: "Good", condFix: "Needs repair", condMajor: "Major work",
  },
  diag: {
    title: "Which home fits you?", lead: "Rate 16 statements and we map you on four axes: work, people, house and budget.",
    s1: "16 statements · 5 minutes", s2: "Lifestyle, budget and work style", s3: "Your settler type and picks",
    start: "Start", analyzing: "Analyzing your answers.",
    resultType: "Your settler type", budget: "Budget simulation",
    initial: "Upfront", monthly: "Monthly", subsidy: "With subsidies", payback: "Payback",
    picks: "Recommended.", retry: "Try again",
    q: [
      { q: "Weekend morning. You are…", a: ["In the garden, hands in the soil", "At a café, laptop open"] },
      { q: "Distance from neighbors?", a: ["Daily hellos and shared meals", "A polite nod is enough"] },
      { q: "What kind of house?", a: ["One I fix up and make mine", "Move-in ready and clean"] },
      { q: "Budget?", a: ["Keep it minimal, use subsidies", "Room to invest in renovation"] },
      { q: "Work?", a: ["Find something new locally", "Keep my remote job"] },
    ],
    types: {
      farmer: { name: "The Grower", desc: "Making things by hand and sharing with neighbors. Farmhouses with land in villages with an active community." },
      remote: { name: "The Quiet Remote", desc: "Same job, new scenery. Homes on the edge of small cities with good rail and internet." },
      host: { name: "The Host", desc: "A house people pass through. Guesthouse-ready listings in areas with tourist demand." },
    },
  },
  sim: {
    title: "See it before you fix it.", lead: "Upload a photo of a vacant house and see the renovation, cost, insulation and infrastructure at once.",
    s1: "Snap or upload a photo", s2: "AI generates a renovation preview", s3: "Cost, insulation and infrastructure together",
    start: "Upload a photo",
    uploadTitle: "One photo is enough.", uploadHint: "Take or upload", uploadSub: "The older the house, the better",
    generate: "Generate preview", generating: "Generating", another: "Another photo",
    resultTitle: "Expected result.", before: "Before", after: "After",
    cost: "Renovation cost", costSub: "after subsidies", insul: "Insulation", insulSub: "Heating -38%", duration: "Duration", weeks: "weeks",
    infra: "Infrastructure", infraSub: "Fiber · water · gas",
    similar: "See similar houses", drag: "Drag to compare", genFail: "AI generation failed, showing a sample preview",
  },
  comm: {
    title: "Ask someone who came first.", lead: "Newcomers and locals talk in the same feed.",
    write: "Ask a question", newTitle: "What do you want to know?", placeholder: "e.g. How much is winter heating, really?",
    submit: "Post", mover: "Newcomer", local: "Local", replies: "Replies", replyPh: "Write a reply", me: "Me", region: "Interested area", now: "just now",
  },
  ui: {
    search: "Search by region, station or feature", chips: ["Iwate", "Chungbuk", "Gangwon", "Gyeongnam", "Near onsen", "With farmland", "Move-in ready"],
    heroCta: "Browse houses", recommended: "This week's picks", subsidyTop: "Biggest subsidies", aiTitle: "See it with AI first", stories: "From people who moved",
    monthly: "Est. monthly", subsidyUp: "Subsidy up to", contact: "Contact", photos: "photos", sort: "Recommended", results: " results",
    area: "Area", rooms: "Layout", built: "Built", cond: "Condition", verified: "Verified on site", saved: "Save", share: "Share",
    filterAll: "All", feedTabs: ["All", "Questions", "News", "Reviews"], greeting: "Where would you move?",
  },
  yg: {
    cats: [["location", "Houses"], ["money-bag", "Subsidies"], ["bulb", "AI match"], ["magic-trick", "AI preview"], ["chat-bubble", "Community"]],
    searchPh: "Search by region, station or feature", budget: "Any budget", moveIn: "Any move-in date", searchBtn: "Find houses",
    events: "Events", eventsMore: "More",
    eventList: [["Iwate relocation grant", "Up to $6,700\nOpen now"], ["Youth settlement stipend", "$360 / month\nUp to 3 years"], ["AI renovation preview", "One photo\nFree, instantly"]],
    regions: "Popular regions", regionList: ["Iwate", "Goesan", "Yeongwol", "Namhae"],
    picks: "This week's picks", deals: "Subsidies closing this month", black: "HMTI Pick", blackSub: "Two homes this month, verified on site.",
    listPrice: "List price", finalPrice: "After subsidies", off: "subsidy",
    faq: "FAQ", faqList: [["Can I really buy at this price?", "Prices follow the municipal vacant-house bank listing. The after-subsidy figure is an estimate assuming you qualify."], ["Can foreigners buy in Japan?", "Yes. Relocation grants have conditions such as resident registration; check the Support tab."], ["How is renovation cost estimated?", "The AI preview is a photo-based estimate. Compare quotes from at least two local builders."], ["Who answers in the community?", "Real newcomers and local residents. Verified badges on profiles tell them apart."]],
    support: "Customer support", supportHours: "Weekdays 10:00 – 18:00 · Lunch 12:30 – 13:30", supportMail: "hello@hmti.app",
  },
  quiz: {
    agree: "Agree", disagree: "Disagree", progress: "Question", submit: "See my result", remaining: "left",
    axes: [["Work with my hands", "Work remotely"], ["Live with neighbors", "Keep to myself"], ["Fix it up", "Move right in"], ["Settle frugally", "Settle by investing"]],
    items: [
      "I find physical work rewarding.", "I can do my current job from anywhere with a laptop.", "Starting a new job in a new region doesn't scare me.", "I prefer to keep where I work separate from where I live.",
      "Sharing food with neighbors feels natural to me.", "I need time alone to recharge.", "I gladly join village events.", "Strangers coming and going in my home would stress me.",
      "I enjoy fixing up a house myself.", "The house must be livable from day one.", "I like homes that keep traces of their age.", "I don't want to spend time on repair problems.",
      "I keep careful track of subsidies and support programs.", "If I love it, I'll go over budget.", "I want to keep upfront costs as low as possible.", "I don't skimp on good materials and builders.",
    ],
  },
  cam: { guide: "Fit the whole house inside the frame", retake: "Retake", use: "Analyze this photo", gallery: "Album", flip: "Flip", denied: "Camera isn't available. Pick a photo from your album.", analyzing: "Analyzing the house", tips: ["Daylight, straight on", "Roof and walls visible", "Don't get too close"] },
  settings: { title: "Language.", lead: "Choose the interface language.", ko: "한국어", en: "English", ja: "日本語" },
};

const ja: typeof ko = {
  app: "HMTI",
  nav: { home: "ホーム", houses: "空き家", diagnosis: "診断", simulate: "シミュ", community: "コミュニティ" },
  common: { back: "戻る", viewAll: "すべて見る", more: "もっと見る", jp: "日本", kr: "韓国", ago: "前" },
  home: {
    hero1: "空き家ではなく、", hero2: "次の暮らしの始まり。",
    lead: "日本と韓国の農村の空き家を、若者の目で見直す。興味から移住まで、ひとつの流れで。",
    browse: "空き家を見る", about: "なぜ空き家か",
    entries: "はじめる。",
    diagnosisT: "自分に合う家を探す", diagnosisD: "16問 · 5分 · 4軸診断",
    simulateT: "AIリノベ・プレビュー", simulateD: "写真1枚でビフォー・アフター",
    communityT: "先に来た人に聞く", communityD: "移住者と住民が同じフィードで",
    featured: "今週の物件。",
    footerTag: "Hanbat National University × Iwate University · Team D",
  },
  about: {
    title: "空き家問題を、短く。", lead: "戦略の前に、なぜこれが重要なのか。",
    jp: "日本の空き家", jpSub: "住宅全体の13.8% · 2023",
    kr: "韓国の空き家", krSub: "住宅全体の0.7% · 2024",
    aw: "低い", awSub: "若者の認知度 · 選択肢の存在すら知らない",
    gap: "問題は供給だけではありません。既存のプラットフォームは、すでに探している人しか捉えられない。私たちは興味が生まれる前の段階から始めます。",
    proof: "テレビではすでに実証済み。",
    c1T: "ヒョリの民宿", c1M: "JTBC · 2017–2018", c1D: "歌手イ・ヒョリ夫妻が済州の自宅で無料民宿を運営。全国的な田舎暮らし・ゲストハウスブームを起こした。",
    c2T: "大改造!!劇的ビフォーアフター", c2M: "ABCテレビ / テレビ朝日 · 2002–", c2D: "老朽化した家を劇的にリノベーションする長寿ドキュメンタリー。今も特番として放送されるリノベの代名詞。",
    conclusion: "興味はすでにある。足りないのは、その興味を実際の移住につなぐ経路だ。",
    source: "出典: 総務省統計局（2023年 住宅・土地統計調査）· KRIHS Policy Brief No.1042（2025年12月）",
  },
  houses: {
    title: "実際の物件、実際の状態。", lead: "場所、状態、支援制度まで一度に。",
    all: "すべて", count: "件", map: "地図で見る",
    mapTitle: "地図。", mapNote: "地図エリア · プロトタイプ", list: "一覧へ",
    built: "年築", overview: "概要", area: "地域", support: "支援",
    areaTitle: "地域情報。", jobs: "仕事", transport: "交通",
    supportTitle: "支援制度。", supportLead: "この物件に適用できる制度だけを集めました。",
    ctaSim: "この家をAIでシミュレーション", ctaAsk: "この地域の移住者に聞く", ctaArea: "地域情報を見る", ctaSupport: "支援制度を見る",
    condGood: "良好", condFix: "要修繕", condMajor: "大規模修繕",
  },
  diag: {
    title: "自分に合う家は？", lead: "16の文にどれだけ同意するかを選ぶだけで、仕事 · 人 · 家 · 予算の4軸から定住タイプを見つけます。",
    s1: "16問 · 5分", s2: "性格 · 予算 · 働き方を分析", s3: "定住タイプとおすすめ物件まで",
    start: "診断をはじめる", analyzing: "回答を分析しています。",
    resultType: "あなたの定住タイプ", budget: "予算シミュレーション",
    initial: "初期費用", monthly: "月の生活費", subsidy: "補助金適用", payback: "回収期間",
    picks: "おすすめ物件。", retry: "もう一度診断",
    q: [
      { q: "週末の朝、あなたは？", a: ["畑に出て土に触れる", "カフェでノートPCを開く"] },
      { q: "ご近所との距離感は？", a: ["毎日挨拶しておかずも分け合う", "軽く挨拶する程度"] },
      { q: "家はどんな状態がいい？", a: ["手を入れて自分のものにする楽しさ", "すぐ住める清潔さ"] },
      { q: "予算は？", a: ["できるだけ抑えて補助金を活用", "リノベに投資する余裕あり"] },
      { q: "仕事は？", a: ["地域で新しい仕事を探したい", "今のリモートワークを続ける"] },
    ],
    types: {
      farmer: { name: "育てる定住者", desc: "手で作り、隣人と分かち合う暮らし。農地付きの古民家と、コミュニティが活発な村が合います。" },
      remote: { name: "静かなリモートワーカー", desc: "仕事はそのまま、風景だけ変える移住。駅・ネット環境の良い小都市郊外の家が合います。" },
      host: { name: "もてなすホスト", desc: "人が行き交う家を夢見るタイプ。観光需要のある地域のゲストハウス転用物件が合います。" },
    },
  },
  sim: {
    title: "直す前に、まず見る。", lead: "空き家の写真をアップすると、リノベ後の姿と費用 · 断熱 · インフラを一度に表示します。",
    s1: "写真を撮る、またはアップロード", s2: "AIがリノベ · 建替えプレビューを生成", s3: "費用 · 断熱 · インフラを同時表示",
    start: "写真をアップ",
    uploadTitle: "写真1枚で十分です。", uploadHint: "撮影またはアップロード", uploadSub: "古い家ほど効果的",
    generate: "プレビューを生成", generating: "生成中", another: "別の写真",
    resultTitle: "予想結果。", before: "Before", after: "After",
    cost: "リノベ費用", costSub: "補助金後", insul: "断熱性能", insulSub: "暖房費 -38%", duration: "工期", weeks: "週",
    infra: "インフラ", infraSub: "光回線 · 上水道 · 都市ガス",
    similar: "似た物件を見る", drag: "スライダーで比較", genFail: "AI生成に失敗したためサンプルを表示しています",
  },
  comm: {
    title: "先に来た人に聞く。", lead: "移住者と地元の人が同じフィードで話します。",
    write: "質問する", newTitle: "何が知りたいですか？", placeholder: "例: 冬の暖房費は実際どれくらい？",
    submit: "投稿", mover: "移住者", local: "住民", replies: "返信", replyPh: "返信を書く", me: "自分", region: "関心地域", now: "たった今",
  },
  ui: {
    search: "地域・駅・条件で検索", chips: ["岩手", "忠清北道", "江原", "慶尚南道", "温泉近く", "農地付き", "即入居"],
    heroCta: "空き家を見る", recommended: "今週のおすすめ", subsidyTop: "補助金が大きい家", aiTitle: "まずAIで見る", stories: "先に来た人たち",
    monthly: "月の目安", subsidyUp: "補助金 最大", contact: "問い合わせ", photos: "枚", sort: "おすすめ順", results: "件",
    area: "面積", rooms: "間取り", built: "築年", cond: "状態", verified: "現地確認済み", saved: "保存", share: "共有",
    filterAll: "すべて", feedTabs: ["すべて", "質問", "お知らせ", "レビュー"], greeting: "どこへ移住しますか？",
  },
  yg: {
    cats: [["location", "空き家"], ["money-bag", "支援制度"], ["bulb", "AI診断"], ["magic-trick", "AIシミュ"], ["chat-bubble", "コミュニティ"]],
    searchPh: "地域・駅・条件で検索", budget: "予算指定なし", moveIn: "入居時期指定なし", searchBtn: "空き家を探す",
    events: "イベント", eventsMore: "もっと見る",
    eventList: [["岩手県 移住支援金", "最大100万円\n今すぐ申請可"], ["若者 帰村定着金", "月50万ウォン\n最長3年支給"], ["AIリノベ・プレビュー", "写真1枚で\n無料ですぐに"]],
    regions: "人気の地域", regionList: ["岩手", "槐山", "寧越", "南海"],
    picks: "今週のおすすめ物件", deals: "今月締切の支援制度", black: "HMTI Pick", blackSub: "現地確認済み、今月の2軒。",
    listPrice: "定価", finalPrice: "補助金適用後", off: "補助金",
    faq: "よくある質問", faqList: [["本当にこの価格で買えますか？", "表示価格は自治体の空き家バンク登録価格です。補助金適用後は条件を満たした場合の目安です。"], ["外国人も日本の空き家を買えますか？", "可能です。ただし移住支援金には住民登録などの条件があり、支援タブで確認してください。"], ["リノベ費用はどう計算しますか？", "AIシミュは写真ベースの推定です。実際は地元の工務店2社以上の見積もり比較をおすすめします。"], ["コミュニティは誰が答えますか？", "実際の移住者と地域住民です。プロフィールの認証バッジで区別できます。"]],
    support: "カスタマーサポート", supportHours: "平日 10:00 – 18:00 · 昼休み 12:30 – 13:30", supportMail: "hello@hmti.app",
  },
  quiz: {
    agree: "そう思う", disagree: "思わない", progress: "設問", submit: "結果を見る", remaining: "問残り",
    axes: [["手を動かして働く", "リモートで働く"], ["みんなと過ごす", "ひとりで過ごす"], ["直して住む", "すぐ住む"], ["節約して定住", "投資して定住"]],
    items: [
      "体を使う仕事にやりがいを感じる。", "今の仕事はどこでもノートPCで続けられる。", "新しい地域で新しい仕事を始めることは怖くない。", "働く場所と住む場所は分けたい。",
      "隣人と食べ物を分け合うのは自然なことだ。", "ひとりの時間が充電に欠かせない。", "村の行事には喜んで参加する。", "知らない人が家に出入りするのは負担だ。",
      "家を自分で手入れする過程が楽しい。", "引っ越し初日から住める家でなければならない。", "古さの跡が残る家が好きだ。", "修繕の問題に時間を使いたくない。",
      "補助金や支援制度をきちんと調べるほうだ。", "気に入れば予算を超えても投資する。", "初期費用はできるだけ抑えたい。", "良い材料と施工にはお金を惜しまない。",
    ],
  },
  cam: { guide: "家全体がフレームに入るように撮ってください", retake: "撮り直す", use: "この写真で分析", gallery: "アルバム", flip: "切替", denied: "カメラを使用できません。アルバムから写真を選んでください。", analyzing: "家の状態を分析しています", tips: ["昼間に正面から", "屋根と外壁が見えるように", "近づきすぎない"] },
  settings: { title: "言語。", lead: "表示言語を選んでください。", ko: "한국어", en: "English", ja: "日本語" },
};

export const dict: Record<Locale, typeof ko> = { ko, en, ja };

const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({ locale: "ko", setLocale: () => {} });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, set] = useState<Locale>("ko");
  useEffect(() => { try { const s = localStorage.getItem("locale") as Locale | null; if (s && dict[s]) set(s); } catch {} }, []);
  const setLocale = (x: Locale) => { set(x); document.documentElement.lang = x; try { localStorage.setItem("locale", x); } catch {} };
  return <Ctx.Provider value={{ locale, setLocale }}>{children}</Ctx.Provider>;
}

export function useT() {
  const { locale, setLocale } = useContext(Ctx);
  return { t: dict[locale], locale, setLocale, L: (x: L) => x[locale] };
}
