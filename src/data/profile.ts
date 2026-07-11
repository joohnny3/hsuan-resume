/**
 * 網站所有內容的單一資料來源。
 * 新增經歷或照片：只要改這個檔案（照片先壓成 WebP 丟進 public/photos/）。
 * 鐵則:電話號碼與原始 PDF 不得出現在這個 repo。
 */

export const profile = {
  stageName: "瑄瑄",
  englishName: "Hsuan",
  fullName: "張庭瑄",
  tagline: "展場活動 SG・PG",
  roles: ["展場 SG/PG", "專櫃美妝", "快閃派樣", "典禮接待"],
  stats: [
    { label: "身高", value: "165", unit: "cm" },
    { label: "體重", value: "48", unit: "kg" },
    { label: "三圍", value: "34C·24·34", unit: "" },
  ],
  lineId: "1012251",
  lineUrl: "https://line.me/ti/p/~1012251",
  /** 有公開 IG 再填帳號（不含 @），留空就不顯示。 */
  instagram: "",
  intro: [
    "哈囉，我是瑄瑄！從賣場銷售 PG 起步，一路累積到各大展場 SG/PG、快閃派樣、典禮接待與百貨美妝專櫃——科技展、車展、酒展到彩妝櫃位，什麼場子都能快速進入狀況。",
    "個性活潑開朗、親切愛笑，最喜歡與客人互動、把產品的好講進心坎裡。對工作有熱忱、守時不偷懶、不怕曬太陽，期待有機會與您合作！",
  ],
  traits: ["活潑開朗", "親切愛笑", "工作熱忱", "守時負責", "不怕曬太陽"],
} as const;

export type ExperienceItem = { name: string; date?: string };
export type ExperienceGroup = {
  title: string;
  blurb: string;
  items: ExperienceItem[];
};

export const experienceGroups: ExperienceGroup[] = [
  {
    title: "展場活動 SG・PG",
    blurb: "展覽、記者會、音樂節與品牌活動",
    items: [
      { name: "Lay's 西門樂事餅乾派樣 PG", date: "2023/03" },
      { name: "台北春酒宴會接待", date: "2023/03" },
      { name: "五股工商展覽館易口舒 PG", date: "2023/03" },
      { name: "鴿子茶飲加盟展 SG", date: "2023/02" },
      { name: "浪LIVE×富邦勇士籃球 SG", date: "2023/01" },
      { name: "ROG GAMEFORCE 電競嘉年華 SG", date: "2022/12" },
      { name: "500%×7-11 永續快閃店 PG", date: "2022/12" },
      { name: "宏佳騰智慧電車 SG", date: "2022/11" },
      { name: "太空港音樂節 BingX 推廣 SG", date: "2022/10" },
      { name: "三峽經典 90 老車×浪LIVE SG", date: "2022/10" },
      { name: "GQ 城市野營 樂事/多力多滋派樣 PG", date: "2022/10" },
      { name: "原委會原味餐車×LIMA 電商平台 SG", date: "2022/09" },
      { name: "球鞋市集 UNO PG", date: "2022/09" },
      { name: "金剛咖啡茶飲開幕活動 SG", date: "2022/07" },
      { name: "中華電信 MOD 推廣 PG" },
      { name: "IoT 創意應用大賽頒獎典禮 SG" },
      { name: "臺灣鐵路新式售票機發表 SG" },
      { name: "飯店婚宴接待" },
    ],
  },
  {
    title: "彩妝保養品專櫃",
    blurb: "百貨專櫃與品牌檔期活動",
    items: [
      { name: "LANCÔME 蘭蔻 PG" },
      { name: "M·A·C 彩妝 PG" },
      { name: "SOFINA 化妝品 PG" },
      { name: "SK-II 美肌檢測活動 PG" },
      { name: "ELEMIS 新櫃開幕 PG" },
      { name: "DRUNK ELEPHANT 醉象保養品 PG" },
    ],
  },
  {
    title: "賣場銷售",
    blurb: "通路促銷與地推活動",
    items: [
      { name: "台大醫學體驗活動" },
      { name: "瑞穗 Premium 吐司 PG" },
      { name: "Häagen-Dazs 冰淇淋 PG" },
      { name: "全聯左岸咖啡館" },
      { name: "foodpanda 地推人員" },
      { name: "7-11 麵包促動人員" },
    ],
  },
];

/** 經歷區塊下方的補充說明（等新經歷清單補齊後可拿掉）。 */
export const experienceNote =
  "2023 年之後持續接案中——近期活動請見下方照片牆，完整清單陸續更新。";

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

/** 首屏形象照（不重複出現在照片牆）。 */
export const heroPhoto: Photo = {
  file: "hero.webp",
  w: 1045,
  h: 1567,
  caption: "太陽能光電展 SG",
  category: "exhibition",
};

export const photos: Photo[] = [
  { file: "expo-solar.webp", w: 794, h: 1200, caption: "太陽能光電展 SG", category: "exhibition" },
  { file: "seminar-ai.webp", w: 900, h: 1200, caption: "捷元 AI 研討會接待", category: "ceremony" },
  { file: "expo-car.webp", w: 900, h: 1200, caption: "車展活動 SG", category: "exhibition" },
  { file: "expo-anime.webp", w: 800, h: 1200, caption: "動漫 IP 聯名活動 SG", category: "exhibition" },
  { file: "expo-beverage.webp", w: 900, h: 1200, caption: "飲品展銷活動 PG", category: "exhibition" },
  { file: "event-heysong.webp", w: 900, h: 1200, caption: "黑松品牌活動 PG", category: "retail" },
  { file: "expo-audio.webp", w: 800, h: 1200, caption: "音響品牌活動 SG", category: "exhibition" },
  { file: "ceremony-aero.webp", w: 675, h: 1200, caption: "航太設備交機儀式接待", category: "ceremony" },
  { file: "expo-sake.webp", w: 800, h: 1200, caption: "日本酒展 PG", category: "exhibition" },
  { file: "expo-fire.webp", w: 800, h: 1200, caption: "消防設備展 SG", category: "exhibition" },
  { file: "expo-jtar.webp", w: 800, h: 1200, caption: "科技展 SG", category: "exhibition" },
  { file: "expo-water.webp", w: 900, h: 1200, caption: "環保水處理展 SG", category: "exhibition" },
  { file: "event-sampling.webp", w: 900, h: 1200, caption: "品牌快閃派樣 PG", category: "retail" },
  { file: "event-liquor.webp", w: 960, h: 1200, caption: "酒類品牌禮賓", category: "ceremony" },
  { file: "event-cheer.webp", w: 798, h: 1200, caption: "運動賽事應援活動", category: "exhibition" },
  { file: "event-festival.webp", w: 799, h: 1200, caption: "節慶主題活動 PG", category: "exhibition" },
  { file: "expo-langlive.webp", w: 798, h: 1200, caption: "浪LIVE APP 推廣 PG", category: "exhibition" },
  { file: "expo-franchise.webp", w: 900, h: 1200, caption: "加盟展 SG", category: "exhibition" },
  { file: "expo-aeonmoto.webp", w: 900, h: 1200, caption: "宏佳騰智慧電車 SG", category: "exhibition" },
  { file: "expo-sneaker.webp", w: 900, h: 1200, caption: "球鞋市集 UNO PG", category: "exhibition" },
  { file: "expo-rog.webp", w: 419, h: 627, caption: "ROG 電競嘉年華 SG", category: "exhibition" },
  { file: "event-fubon.webp", w: 444, h: 592, caption: "浪LIVE×富邦勇士籃球 SG", category: "exhibition" },
  { file: "cht-mod.webp", w: 444, h: 592, caption: "中華電信 MOD 推廣 PG", category: "exhibition" },
  { file: "event-spaceport.webp", w: 444, h: 592, caption: "太空港音樂節 SG", category: "exhibition" },
  { file: "event-oldcar.webp", w: 444, h: 592, caption: "三峽經典老車×浪LIVE SG", category: "exhibition" },
  { file: "beauty-lancome.webp", w: 444, h: 592, caption: "LANCÔME 蘭蔻 PG", category: "beauty" },
  { file: "beauty-mac.webp", w: 444, h: 592, caption: "M·A·C 彩妝 PG", category: "beauty" },
  { file: "beauty-drunkele.webp", w: 444, h: 592, caption: "DRUNK ELEPHANT 新櫃開幕 PG", category: "beauty" },
  { file: "beauty-zuixiang.webp", w: 444, h: 592, caption: "醉象保養品 PG", category: "beauty" },
  { file: "popup-711.webp", w: 444, h: 592, caption: "500%×7-11 永續快閃 PG", category: "retail" },
  { file: "event-gq-lays.webp", w: 444, h: 592, caption: "GQ 城市野營 Lay's PG", category: "retail" },
  { file: "retail-eclipse.webp", w: 444, h: 592, caption: "全家展易口舒 PG", category: "retail" },
  { file: "sampling-doritos.webp", w: 444, h: 592, caption: "多力多滋派樣 PG", category: "retail" },
  { file: "event-kingkong.webp", w: 419, h: 628, caption: "金剛咖啡開幕活動 SG", category: "retail" },
  { file: "retail-711bread.webp", w: 444, h: 592, caption: "7-11 麵包推廣 PG", category: "retail" },
  { file: "ceremony-award.webp", w: 444, h: 592, caption: "IoT 創意應用大賽頒獎典禮 SG", category: "ceremony" },
  { file: "ceremony-tra.webp", w: 441, h: 595, caption: "臺灣鐵路新式售票機發表 SG", category: "ceremony" },
];
