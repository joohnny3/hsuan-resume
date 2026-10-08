/**
 * 網站所有內容的單一資料來源(ADR-003/ADR-005)。
 * 新增品牌:brands 加一筆 { name, url }。新增照片:壓 WebP 進 public/photos/ 後在 photos 加一筆。
 * 鐵則:電話號碼與原始 PDF 不得出現在這個 repo(ADR-001)。
 */

export const profile = {
  stageName: "瑄瑄",
  englishName: "Hsuan",
  fullName: "張庭瑄",
  tagline: "展場活動 SG・PG",
  /** 職稱(首屏 eyebrow) */
  eyebrow: "展場模特兒・品牌推廣",
  /** 首屏自我介紹(ADR-005:獨立自介區已整合進首屏) */
  intro: [
    "您好，我是瑄瑄，具備各式專業展、百貨彩妝、車展等多元派樣活動經驗。",
    "熟悉產品介紹、品牌推廣、顧客互動與現場活動支援，能依照不同品牌定位與活動情境，快速掌握產品特色，自然的向顧客傳達品牌價值。",
    "個性活潑親切，擁有良好的時間觀念與責任感；面對高人流、長時間站立及戶外活動，也能維持穩定狀態與專業形象。",
  ],
  traits: ["活潑開朗", "親切愛笑", "守時負責", "不怕曬太陽"],
  stats: [
    { label: "身高", value: "165", unit: "cm" },
    { label: "體重", value: "48", unit: "kg" },
    { label: "三圍", value: "34C·24·34", unit: "" },
  ],
  /** 公開聯絡管道(使用者授權公開);電話號碼永不進 repo(ADR-001)。 */
  email: "aso86012000@yahoo.com",
  lineId: "1012251",
  lineUrl: "https://line.me/ti/p/~1012251",
  /** IG 帳號(不含 @),留空就不顯示。 */
  instagram: "__h_s_u_a_n__",
  /** 自我介紹影片(YouTube Shorts;不帶 ?si= 分享追蹤碼),留空就不顯示按鈕。 */
  introVideoUrl: "https://www.youtube.com/shorts/1V81L4yEwTI",
} as const;

/**
 * 品牌字牆(ADR-005):合作過的品牌與活動主辦,無日期。
 * url = 台灣官方網站／官方品牌頁／官方社群(來源:taiwan-brand-official-links.md)。
 * 點擊於新分頁開啟。金剛咖啡無官網,以官方 FB 為主要管道。
 */
export const brands: { name: string; url: string }[] = [
  { name: "LANCÔME 蘭蔻", url: "https://www.lancome.com.tw/" },
  { name: "M·A·C", url: "https://www.maccosmetics.com.tw/" },
  { name: "SK-II", url: "https://sk-ii.com.tw/" },
  { name: "SOFINA", url: "https://web.sofina.com/tw/" },
  { name: "ELEMIS", url: "https://www.elemis.com.tw/" },
  { name: "DRUNK ELEPHANT", url: "https://www.beautystage.com.tw/brand/3541" },
  { name: "ROG 玩家共和國", url: "https://rog.asus.com/tw/" },
  { name: "中華電信", url: "https://www.cht.com.tw/home/consumer" },
  { name: "臺灣鐵路", url: "https://www.railway.gov.tw/" },
  { name: "捷元 GENUINE", url: "https://www.genuine.com.tw/" },
  { name: "宏佳騰 Ai-2", url: "https://www.aeontek-motor.com.tw/pages/ai2-gather" },
  { name: "浪 LIVE", url: "https://www.lang.live/" },
  { name: "富邦勇士", url: "https://www.fubonbraves.com/" },
  { name: "GQ TAIWAN", url: "https://www.gq.com.tw/" },
  { name: "Lay's 樂事", url: "https://www.lays.com.tw/" },
  { name: "黑松", url: "https://www.heysong.com.tw/" },
  { name: "易口舒", url: "https://www.eclipse.com.tw/" },
  { name: "7-ELEVEN", url: "https://www.7-11.com.tw/" },
  { name: "全家便利商店", url: "https://www.family.com.tw/Marketing/zh" },
  { name: "全聯福利中心", url: "https://www.pxmart.com.tw/" },
  { name: "Häagen-Dazs", url: "https://www.haagen-dazs.com.tw/" },
  { name: "foodpanda", url: "https://www.foodpanda.com.tw/" },
  { name: "金剛咖啡", url: "https://www.facebook.com/kingkongcoffeetea/" },
  { name: "台大醫學院", url: "https://www.mc.ntu.edu.tw/" },
];

/**
 * 活動經歷(ADR-005):展場、快閃、遊戲、路跑與典禮等活動推廣。
 * 排序:SG 在前、PG 在後(與精選活動一致),組內依時間新→舊;不顯示日期(使用者要求移除)。
 * 同一場活動的寫法與照片說明一致(「活動×品牌 SG/PG」)。新增經歷加一行字串即可。
 */
export const experiences: string[] = [
  "加盟展×移花宮 SG",
  "國際半導體展 SG",
  "捷元 AI 研討會 SG",
  "苗栗佳餚音樂祭 SG",
  "國際智慧能源展×捷星科技 SG",
  "長榮航太交機儀式 SG",
  "漫畫博覽會×新北市政府－無名之詩 SG",
  "加盟展×慶三號 SG",
  "新北戰酒黑金龍冬季巡迴車 SG",
  "ULTRA TAIWAN 音樂祭 SG",
  "浪LIVE×富邦勇士籃球 SG",
  "加盟展×鴿子茶飲 SG",
  "金剛咖啡開幕活動 SG",
  "原委會原味餐車×LIMA 電商平台活動 SG",
  "太空港音樂節×BingX 平台推廣 SG",
  "三峽經典 90 老車×浪LIVE SG",
  "宏佳騰智慧電車 SG",
  "電競嘉年華×ROG SG",
  "Mortlach 慕赫威士忌 SG",
  "HARPAZO 香水 PG",
  "劍與遠征遊戲推廣 PG",
  "中職明星賽×中華電信 PG",
  "夏季旅展×愛玩苗栗 PG",
  "籃球瓊斯盃遊戲 PG",
  "奇動能量飲派樣 PG",
  "Lay's 西門樂事餅乾派樣 PG",
  "全家展×易口舒 PG",
  "球鞋市集×UNO PG",
  "GQ 城市野營×樂事多力多滋派樣 PG",
  "500%×7-11 永續快閃 PG",
  // 以下未標 SG/PG(使用者決定不標),排在最後
  "保護貼推廣",
  "ITF 旅展",
  "Bose 體驗會（大佳河濱）",
  "昊緣遊戲（黑松沙士）",
  "Fin 路跑",
  "台中加盟展（Xpower）",
  "新莊體育館（曼陀珠）",
  "台北春酒宴會接待",
];

export const galleryCategories = [
  { key: "all", label: "全部" },
  { key: "exhibition", label: "展場活動" },
  { key: "beauty", label: "彩妝專櫃" },
  { key: "retail", label: "快閃促銷" },
  { key: "ceremony", label: "典禮接待" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["key"];

export type Photo = {
  file: string;
  w: number;
  h: number;
  caption: string;
  category: Exclude<GalleryCategory, "all">;
};

/** 首屏形象照:四場活動的組圖(不重複出現在照片牆),因此不掛單一活動標籤。 */
export const heroPhoto: Pick<Photo, "file" | "w" | "h"> = {
  file: "hero-collage.webp",
  w: 823,
  h: 1200,
};

export const photos: Photo[] = [
  { file: "expo-yihuagong.webp", w: 800, h: 1200, caption: "加盟展×移花宮 SG", category: "exhibition" },
  { file: "expo-semicon.webp", w: 800, h: 1200, caption: "國際半導體展 SG", category: "exhibition" },
  { file: "expo-solar.webp", w: 794, h: 1200, caption: "國際智慧能源展 SG", category: "exhibition" },
  { file: "seminar-ai.webp", w: 900, h: 1200, caption: "捷元 AI 研討會 SG", category: "ceremony" },
  { file: "expo-car.webp", w: 900, h: 1200, caption: "車展活動 SG", category: "exhibition" },
  { file: "expo-anime.webp", w: 800, h: 1200, caption: "漫畫博覽會 SG", category: "exhibition" },
  { file: "expo-audio.webp", w: 800, h: 1200, caption: "音響品牌活動 SG", category: "exhibition" },
  { file: "ceremony-aero.webp", w: 675, h: 1200, caption: "航太設備交機儀式 SG", category: "ceremony" },
  { file: "expo-fire.webp", w: 800, h: 1200, caption: "國際半導體展 SG", category: "exhibition" },
  { file: "expo-water.webp", w: 900, h: 1200, caption: "國際半導體展 SG", category: "exhibition" },
  { file: "event-liquor.webp", w: 960, h: 1200, caption: "加盟展×慶三號 SG", category: "ceremony" },
  { file: "expo-franchise.webp", w: 900, h: 1200, caption: "加盟展×鴿子茶飲 SG", category: "exhibition" },
  { file: "expo-aeonmoto.webp", w: 900, h: 1200, caption: "宏佳騰智慧電車 SG", category: "exhibition" },
  { file: "expo-rog.webp", w: 419, h: 627, caption: "電競嘉年華×ROG SG", category: "exhibition" },
  { file: "event-fubon.webp", w: 444, h: 592, caption: "浪LIVE×富邦勇士籃球 SG", category: "exhibition" },
  { file: "event-spaceport.webp", w: 444, h: 592, caption: "太空港音樂節 SG", category: "exhibition" },
  { file: "event-kingkong.webp", w: 419, h: 628, caption: "金剛咖啡開幕活動 SG", category: "retail" },
  { file: "ceremony-award.webp", w: 444, h: 592, caption: "IoT 創意應用大賽頒獎典禮 SG", category: "ceremony" },
  { file: "ceremony-tra.webp", w: 441, h: 595, caption: "新式發表會 SG", category: "ceremony" },
  { file: "event-mortlach.webp", w: 878, h: 1200, caption: "Mortlach 慕赫威士忌 SG", category: "ceremony" },
  { file: "beauty-harpazo.webp", w: 800, h: 1200, caption: "HARPAZO 香水 PG", category: "beauty" },
  { file: "expo-beverage.webp", w: 900, h: 1200, caption: "商品展×冰結 PG", category: "exhibition" },
  { file: "event-heysong.webp", w: 900, h: 1200, caption: "黑松品牌活動 PG", category: "retail" },
  { file: "expo-sake.webp", w: 800, h: 1200, caption: "台北國際酒展 PG", category: "exhibition" },
  { file: "event-sampling.webp", w: 900, h: 1200, caption: "奇動能量飲派樣 PG", category: "retail" },
  { file: "event-cheer.webp", w: 798, h: 1200, caption: "中職明星賽×中華電信 PG", category: "exhibition" },
  { file: "event-festival.webp", w: 799, h: 1200, caption: "夏季旅展×愛玩苗栗 PG", category: "exhibition" },
  { file: "expo-langlive.webp", w: 798, h: 1200, caption: "浪LIVE APP 推廣 PG", category: "exhibition" },
  { file: "expo-sneaker.webp", w: 900, h: 1200, caption: "球鞋市集×UNO PG", category: "exhibition" },
  { file: "cht-mod.webp", w: 444, h: 592, caption: "中華電信 MOD 推廣 PG", category: "exhibition" },
  { file: "beauty-lancome.webp", w: 444, h: 592, caption: "LANCÔME 蘭蔻 PG", category: "beauty" },
  { file: "beauty-drunkele.webp", w: 444, h: 592, caption: "DRUNK ELEPHANT 新櫃開幕 PG", category: "beauty" },
  { file: "beauty-zuixiang.webp", w: 444, h: 592, caption: "醉象保養品 PG", category: "beauty" },
  { file: "popup-711.webp", w: 444, h: 592, caption: "500%×7-11 永續快閃 PG", category: "retail" },
  { file: "event-gq-lays.webp", w: 444, h: 592, caption: "GQ 城市野營×Lay's PG", category: "retail" },
  { file: "retail-eclipse.webp", w: 444, h: 592, caption: "全家展×易口舒 PG", category: "retail" },
];
