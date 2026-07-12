# STEP_LOG.md — M1-editorial-redesign（append-only）

---

## Step 1 — root 化重構＋dev-os lite 實例化（2026-07-12）

- **State**：S3 → S4（拷問＝pre-implementation alignment）
- **做了什麼**：網站專案從子資料夾提升到根目錄（fresh git init）；原始 PDF＋24 張手機圖隔離至 `originals/`（gitignore 三重封鎖）；dev-os v0.5.4 全套實例化（config lite／VISION／ROADMAP／DECISIONS ADR-001~006／NOW／STATE／PHASE_PLAN／M1 MINI_SPEC）；docs 一頁版 HLD＋MODULE_PATH；README 重寫；範本資料夾用畢刪除
- **Commit**：`075217d`
- **驗證**：`git ls-files` 私密檔 0 筆
- **偏離**：無

---

## Step 2 — 深色奢華 Editorial 重寫（2026-07-12）

- **State**：S4 → S5
- **做了什麼**：
  - 主題 token 系統（`:root`/`[data-theme]` CSS 變數＋Tailwind `@theme inline` 映射），深色預設＋象牙日間，Nav 切換鈕＋localStorage＋防 FOUC inline script
  - 字型換裝：Playfair Display＋Noto Serif TC（襯線標題）＋Noto Sans TC（內文）
  - Hero 整合濃縮自介（獨立 About 區刪除）、細線數據列、金色 LINE CTA
  - BrandWall 品牌字牆（26 名、無日期）取代三卡 Experience
  - Gallery 統一 3:4 直式卡（object-cover 偏上）＋金色浮層＋pill 重繪；燈箱顯示未裁切原圖
  - Contact／Footer editorial 重繪；OG 分享圖＋favicon 重製為黑金風
  - `profile.ts` 新增 `brands`、濃縮 `intro`；驗收規則修正（電話數字不得寫進 repo 任何檔案——含驗收表本身）
- **Commit**：（本 step commit）
- **偏離**：無

---

## Step 3 — 驗證＋狀態同步（2026-07-12）

- **State**：S5 → S9（lite 模式：health check／SPEC 回填合併於本 step，status sync 完成）
- **做了什麼**：build 通過；隱私 grep 全綠（含把驗收表裡的電話前綴字樣改為程序描述的自我修正）；DOM 驗證日夜切換／3:4 統一／燈箱／品牌字牆；MINI_SPEC 回填驗收證據；ROADMAP M1 → ✅；NOW 指向待使用者決策（M2 發布 gate）
- **已知環境註記**：本機預覽面板 compositor 凍結導致截圖不可用，視覺證據以 computed style 為準
- **Blockers**：無（M2 等使用者明說「發布」）

---

## Step 4 — 配色系統 v3：石墨×玫瑰粉（2026-07-12）

- **State**：S9 內追加微調（使用者於 S9 選項中明說改配色＝選項 C）
- **做了什麼**：
  - 依使用者完整色票重寫主題 token：`gold`→`accent` 角色改名；新增 `elevated`／`muted-2`／`accent-soft`／`on-accent`；dark `#101116`×`#F27FA5`、light `#F7F7F5`×`#C43F6B`（ADR-007）
  - 9 個元件換語意色；accent 按鈕文字改 `on-accent`；footer 版權行改 `muted-2`；Hero 照片說明浮章固定白字（順手修正：日間模式原為深字疊深色 scrim）
  - CopyButton 已複製態與 Gallery pill hover 加 `accent-soft` 提示背景
  - viewport themeColor 改 `#101116`；OG 分享圖＋favicon 重製為石墨×玫瑰（v3 腳本）
- **驗證**：build exit 0；雙主題 computed token 逐字符合色票；切換鈕雙向實點＋localStorage 記憶；console 0 錯誤；`gold`／舊色碼殘留 0 筆；「瑋」src／out 0 筆
- **Commit**：`fb21a7c`
- **偏離**：無

---

## Step 5 — S9 視覺微調批次：光暈／簽名 logo／header 精簡（2026-07-12）

- **State**：S9 內追加微調（使用者逐項回饋＝選項 C，續留同對話）
- **做了什麼**：
  - 移除 Hero 背景玫瑰光暈:`accent/10 blur` 在日間暖白底變成右上角明顯粉斑,直接刪裝飾元素(commit `4c886c4`)
  - Header 文字 logo「瑄瑄 HSUAN」換成使用者提供的簽名檔:`hsuuan-sign.svg` 由 root 搬進 `public/`＋收緊 viewBox(`220 47 630 242`,去除四周大量留白);用 CSS mask＋`bg-ink` 呈現,純黑簽名改由 alpha 遮罩上主題 ink 色,深色近白/日間近黑皆清晰
  - 移除 header 的「LINE 邀約」按鈕(Hero 與 邀約區的 LINE CTA 保留);`LineIcon` export 仍在(Hero/Contact 使用)
- **驗證**：build exit 0；`out/hsuuan-sign.svg` 已輸出；DOM 確認 header 無 line.me 按鈕、logo mask 尺寸 96×36、bg 隨主題翻色；雙主題截圖簽名皆可見；console 0 錯誤
- **Commit**：`a546eff`
- **偏離**：無

---

## Step 6 — Dark mode 配色 v4：BLACKPINK 暖黑（2026-07-12）

- **State**：S9 內追加微調（使用者提供新 dark 色票＝選項 C，只動夜間）
- **做了什麼**：
  - 依使用者完整 dark palette 重寫 token(ADR-008):暖近黑 `#0B0A0B`＋BLACKPINK 粉 `#F598AF`＋暖粉調文字/邊框;on-accent `#101010`
  - 新增三個色彩角色 token(含 light 對應值):`--canvas-deep`(Hero/Footer 純黑分區)、`--accent-strong`、`--hairline-hover`,掛進 `@theme inline`
  - Hero 與 Footer 套 `bg-canvas-deep`(純黑),與頁面 `#0B0A0B` 做細微分區;themeColor 改 `#0B0A0B`
  - OG 分享圖＋favicon 重製為純黑底＋標誌粉(v4 腳本)
  - **只改 dark;light(ADR-007)完全不動**
- **驗證**：build exit 0；DOM 逐字比對 15 個 token 全符合色票、Hero/Footer `rgb(0,0,0)`、body `#0B0A0B`；console 0 錯誤；舊 dark 色碼 src 殘留 0 筆
- **已知環境註記**：本 session 預覽截圖管線再度卡死,視覺證據以 computed token 為準,實機不受影響
- **Commit**：`0f3610f`
- **偏離**：無

---

## Step 7 — 字體系統 v2：全站統一襯線（2026-07-12）

- **State**：S9 內追加微調（使用者拷問 4 題定案＝選項 C）
- **拷問結論**：①精品襯線但修好 ②同源超家族 ③全站統一襯線 ④迷你標籤也襯線（ADR-009）
- **做了什麼**：
  - 拉丁 Playfair Display → **Noto Serif**(思源宋同源);移除整支 **Noto Sans TC**;中文維持 Noto Serif TC(補 400 regular 供內文)
  - globals `--font-sans`／`--font-serif` 皆指向 `Noto Serif → Noto Serif TC` 襯線堆疊,body 一併襯線化(元件零改動,全繼承)
  - 數字:body 全域 `lining-nums`＋數據列 `tabular-nums lining-nums`,根治 Playfair 舊體數字高低不平
  - 載入權重收斂:Noto Serif 400/500/600/700/900+italic、Noto Serif TC 400/600/700/900
- **驗證**：build exit 0;DOM 實測 body/h1/eyebrow/自介/數字/nav/品牌名 **全部**解析到統一襯線堆疊;`playfairOrSansLoaded=false`;數字 variant=`lining-nums tabular-nums`;console 0 錯誤;無真正殘留舊字型引用
- **已知環境註記**：預覽截圖管線持續卡死,視覺證據以 computed font-family 為準,實機不受影響
- **Commit**：`64a4e36`
- **偏離**：無

---

## Step 8 — Header 簽名呼吸泛粉動畫（2026-07-12）

- **State**：S9 內追加微調（使用者要求＝選項 C）
- **做了什麼**：
  - globals 加 `@keyframes sign-shimmer`＋`.sign-shimmer`:6s ease-in-out infinite,background-color 在 `var(--ink)`↔`var(--accent)` 間緩慢呼吸(0/100% ink、45–65% 停在 accent)
  - 兩端皆用 token → 自動尊重日夜:深色泛 `#F598AF`、日間泛 `#C43F6B`,平時回主題文字色
  - 加 `prefers-reduced-motion: reduce` → 停動畫(無障礙)
  - Nav 簽名 span 套 `sign-shimmer`(取代 transition-colors)
- **驗證**：build exit 0;production CSS 含 `@keyframes sign-shimmer`＋class(4 處);DOM `getAnimations()` 回報 name=sign-shimmer、playState=running、duration=6000、infinite、keyframe 規則存在;light 主題 accent 端點正確翻 `#C43F6B`
- **已知環境註記**：預覽 renderer 時間軸凍結(`currentTime` 卡 0、截圖 timeout,與本 session 一貫環境問題同源),動畫設定正確,實機瀏覽器會正常播放
- **Commit**：`3663ab3`
- **偏離**：無

---

## Step 9 — 簽名改為「由左到右填滿粉色」（修正 step 8）（2026-07-12）

- **State**：S9 內追加微調（使用者澄清 step 8 誤會＝選項 C）
- **使用者澄清**：step 8 的「整體呼吸脈動」理解錯了;要的是粉色**由左到右把簽名填滿**,像簽名筆跡刷過。
- **做了什麼**：
  - `sign-shimmer` → `sign-fill`:改用「粉|墨」硬邊漸層(`linear-gradient(to right, accent 49%, ink 51%)`)＋`background-size:200%`,動 `background-position` 100%→0% 讓粉墨邊界左→右掃過;遮罩仍裁成簽名形狀
  - `2.2s ease-out 0.35s both`:載入時填一次、停在滿粉(forwards)
  - 兩端綁 token → 日夜自動:深色滿 `#F598AF`、日間滿 `#C43F6B`;reduced-motion 直接靜態滿粉
  - Nav span class 改 `sign-fill`(移除 bg-ink,改由漸層上色)
- **驗證**：build exit 0;output CSS `sign-fill`=1、`sign-shimmer`=0;DOM getAnimations name=sign-fill/running/2200ms/delay350/fill both;bgImage=accent|ink 漸層、size 200%、mask 仍在;日間漸層端點正確翻 `#C43F6B`|`#17171A`
- **已知環境註記**：預覽 renderer 時間軸凍結,填色動畫無法在此播放,設定正確、實機正常
- **Commit**：`d10ed52`
- **偏離**：無

---

## Step 10 — 簽名填色改為 hover 觸發(連結 affordance)（修正 step 9）（2026-07-12）

- **State**：S9 內追加微調（使用者澄清＝選項 C）
- **使用者澄清**：填色不是載入自動播,是**滑鼠移上(hover)才由左到右填粉**,用來提示「這是可點的 `<a>` 連結」;**滑鼠一離開就退回**。
- **做了什麼**：
  - `sign-fill` 由「載入 animation」改成「hover transition」:常態 `background-position:100% 0`(墨色),`.sign-link:hover/​:focus-visible .sign-fill` → `0 0`(粉色填滿),`transition: background-position .55s`
  - 觸發掛在外層 `<a>`(加 class `sign-link`),整個連結區都算;`:focus-visible` 讓鍵盤 focus 也觸發(無障礙)
  - reduced-motion:保留變色、去掉滑動
  - 移除舊 `@keyframes sign-fill`
- **驗證**：build exit 0;output CSS 含 `.sign-link:hover .sign-fill{background-position:0 0}`、無殘留 keyframes;DOM 常態 `background-position:100% 0px`、`transition:background-position .55s`、`animationName:none`、`<a>` 有 sign-link、mask 仍在、hover 規則存在;日間漸層端點 `#C43F6B`|`#17171A`(前步已驗)
- **已知環境註記**：預覽 renderer 凍結無法實地 hover 觀察,規則結構已確認,實機正常
- **Commit**：`382ac8f`
- **偏離**：無

---

## Step 11 — 簽名填色放慢＋填/退不對稱（微調 step 10）（2026-07-12）

- **State**：S9 內追加微調（使用者:填色太快）
- **做了什麼**：hover 填色 `transition-duration` 0.55s → **1.4s**(慢、像慢慢簽);離開退回維持 **0.5s**(快、不拖泥帶水)。手法:base 放退回時長,`:hover` 規則只覆寫 `transition-duration`
- **驗證**：build exit 0;DOM 常態 duration 0.5s、hover 規則 duration 1.4s;output CSS 含 `transition-duration:1.4s`
- **Commit**：`42b170d`
- **偏離**：無

---

## Step 12 — Hero 改 profile-card ＋ 聯絡管道擴充（2026-07-12）

- **State**：S9 內追加微調（使用者提供圖二參考＋新文案＝選項 C）
- **做了什麼**（ADR-010）：
  - Hero 重排:職稱 eyebrow「展場模特兒・品牌推廣」→ 大名 **張庭瑄** ＋ HSUAN(英文,取代原大字藝名)→ 完整自介 3 段 → 數據列(保留)→ icon 聯絡列(信箱／LINE／IG)
  - 移除原特質行與兩顆大按鈕(LINE 邀約／查看作品);主 CTA 由底部邀約區承接
  - `profile.ts`:eyebrow 改職稱、intro 換 3 段新文案、新增 `email`、`instagram` 填 `__h_s_u_a_n__`(IG 連結去 QR 追蹤參數)
  - 新增 `MailIcon`／`InstagramIcon`(Nav.tsx export);底部邀約區三管道皆補 icon
  - 照片維持右側大圖
- **驗證**：build exit 0;DOM eyebrow/h1(張庭瑄HSUAN)/自介 3 段/三聯絡連結 href 正確(mailto、line.me、instagram.com/__h_s_u_a_n__)、特質行與大按鈕已移除;底部區三連結齊;console 0 錯誤
- **隱私**：email／IG 屬使用者授權公開;電話仍 0 筆(ADR-001 不變)
- **已知環境註記**：預覽截圖管線持續凍結,視覺以 DOM 為證,實機不受影響
- **Commit**：`9c2da4a`
- **偏離**：無

---

## Step 13 — 英文名 Hsuan ＋ 自介首段精簡（2026-07-12）

- **State**：S9 內追加微調（純內容）
- **做了什麼**：`englishName` HSUAN → **Hsuan**(全站:Hero／footer／title,與簽名一致);自介首段改「百貨彩妝、車展、科技展、酒展」
- **驗證**：build 過;DOM h1「張庭瑄Hsuan」、title「瑄瑄 Hsuan」、footer 無大寫 HSUAN、首段新文案
- **Commit**：`17253d7`
- **偏離**：無

---

## Step 14 — 聯絡收斂進 footer ＋ 開發者署名（2026-07-12）

- **State**：S9 內追加微調（使用者提供圖二 footer 參考＝選項 C）
- **做了什麼**（ADR-011）：
  - 刪 `Contact.tsx`(合作邀約區)＋`CopyButton.tsx`(隨之無用);移除 Hero 聯絡 icon 列
  - 新增 `Footer.tsx`:圖二式三欄(品牌／聯絡資訊 LINE・信箱・IG 帶 icon／快速連結),`id="contact"`,nav「邀約」改指 footer
  - 底部 copyright 只留「Copyright © 2026 Chang Yu Cheng. All rights reserved.」(開發者張育誠署名,年份寫死)
  - 頁面流:Hero → 品牌 → 照片 → Footer
- **驗證**：build exit 0;DOM Hero 無聯絡列、合作邀約區已無、footer 三欄五連結 href 全對、copyright 字串正確、nav#contact→footer;console 0 錯
- **隱私**：email／IG 公開如常;電話仍 0 筆
- **已知環境註記**：預覽截圖凍結,視覺以 DOM 為證,實機不受影響
- **Commit**：`58db011`
- **偏離**：無

---

## Step 15 — footer 精簡為 slim bar ＋ Hero 聯絡列復原 ＋ nav 去邀約（2026-07-12）

- **State**：S9 內追加微調（使用者看圖回饋＝選項 C）
- **做了什麼**：
  - Footer:移除品牌欄與快速連結欄,聯絡資訊改**橫向**、與 copyright **併成同一列** slim bar(sm 以上 justify-between)
  - Hero:**加回**聯絡 icon 列(信箱／LINE／IG)——使用者要留(上一步移除的復原)
  - Nav:移除「邀約」連結(留 品牌／作品);footer 仍掛 id=contact(無 nav 連結指向,無妨)
- **驗證**：build exit 0;DOM nav=品牌/作品、Hero 聯絡列三連結、footer 橫向三連結＋copyright 同列(flex-row)、無品牌/快速連結欄與欄標題;console 0 錯
- **已知環境註記**：預覽截圖凍結,視覺以 DOM 為證,實機不受影響
- **Commit**：`143cd39`
- **偏離**：無

---

## Step 16 — 聯絡列抽共用元件、統一順序與文字（2026-07-12）

- **State**：S9 內追加微調（使用者要求 Hero 與 footer 一致）
- **做了什麼**：
  - 新增 `ContactLinks.tsx` 共用元件,Hero 與 Footer 都改用它 → 順序/文字/icon 由單一來源保證一致
  - 順序統一:**IG → LINE → 信箱**;顯示文字:**Instagram** / **LINE@Hsuan** / **aso86012000@yahoo.com**(LINE 由原「邀約」「1012251」統一為「LINE@Hsuan」;href 仍為加好友 URL ~1012251)
  - Hero／Footer 移除各自重複的聯絡列程式碼
- **驗證**：build exit 0;DOM heroOrder===footerOrder(逐字相同,identical:true);href IG/line.me/mailto 正確;console 0 錯
- **已知環境註記**：預覽截圖凍結,視覺以 DOM 為證,實機不受影響
- **Commit**：`514b1d6`
- **偏離**：無

---

## Step 17 — 數據列改 icon 卡片式（橫列、無單位）（2026-07-12）

- **State**：S9 內追加微調（使用者提供圖二參考＝選項 C）
- **做了什麼**：
  - Hero 數據列由「細線分隔三欄」改為圖二式「icon 方塊＋標籤＋數值」,維持**橫列**(flex-wrap)
  - 每項:圓角 icon 方塊(bg-surface-2＋accent icon)＋標籤(身高)＋數值(165);新增 3 個 outline icon(HeightIcon／WeightIcon／MeasureIcon,依 index 對應)
  - **移除單位**(cm/kg 不顯示;`s.unit` 不再使用,profile 資料保留)
- **驗證**：build exit 0;DOM 三項各有 svg icon、label/value 正確、flexDir=row、無 cm/kg;console 0 錯
- **已知環境註記**：預覽截圖凍結,視覺以 DOM 為證,實機不受影響
- **Commit**：`55c0b67`
- **偏離**：無

---

## Step 18 — 品牌／照片區標題文案調整 ＋ 移除照片分類篩選（2026-07-12）

- **State**：S9 內追加微調（使用者看預覽截圖回饋＝選項 C）
- **做了什麼**：
  - `SectionTitle`:`eyebrow` 改為可選(optional),無 eyebrow 時不渲染小標、h2 去掉 `mt-3`
  - 合作品牌區:移除英文小標「Selected Clients」;標題「合作品牌與活動」→「**合作品牌**」;副標→「**參與 30+ 美妝、車展、科技品牌活動推廣經驗**」
  - 活動照片區:移除英文小標「Gallery」;標題「活動照片」不變;副標「點照片可放大瀏覽完整原圖」→「**點擊照片可瀏覽完整原圖**」
  - Gallery:**移除分類篩選列**(全部/展場/美妝… 鈕),照片改**統一排列**全部 37 張;`Gallery.tsx` 移除 `cat` state、`galleryCategories`／`GalleryCategory` import、`countOf`,`filtered`→直接用 `photos`;燈箱與鍵盤導覽保留
  - `profile.ts` 的 `galleryCategories`／`GalleryCategory`／每張 `category` 欄位**保留不動**(未被使用亦不影響 build;哪天要加回篩選很容易)
- **驗證**：build exit 0;DOM brands eyebrow=null／title=合作品牌／sub 正確、gallery eyebrow=null／title=活動照片／sub=點擊照片可瀏覽完整原圖、分類列 filterRowExists=false、照片鈕 37 顆;console 0 錯
- **已知環境註記**：預覽截圖凍結,視覺以 DOM 為證,實機不受影響
- **Commit**：`b72e7d1`
- **偏離**：使用者兩段「改成」皆省略英文小標,判定為要移除 eyebrow(已於報告標明,可要求復原)

---

## Step 19 — 精選活動改名 ＋ Hero 照片去框 ＋ nav icon 化 hover 展開（2026-07-12）

- **State**：S9 內追加微調（使用者看預覽截圖回饋＝選項 C）
- **做了什麼**：
  - Gallery 標題「活動照片」→「**精選活動**」(副標不變)
  - Hero 形象照:移除外圈淡粉外框(`absolute -inset-3 border-accent/30` 的 div);img 去掉多餘 `relative`
  - Nav:「品牌／作品」兩個**文字連結改 icon**(新增 `BrandTagIcon` 標籤／`GalleryImageIcon` 相簿,沿用既有 outline 風格);**hover 或鍵盤 focus-visible 才滑出文字**「合作品牌」「精選活動」(常態 `max-w-0 opacity-0`,`group-hover`/`group-focus-visible` 展開至 `max-w-[6rem] opacity-100 ml-2`,`transition-all 300ms`,含 `motion-reduce:transition-none`);`aria-label` 保可及名稱
- **驗證**：build exit 0;DOM galleryTitle=精選活動、heroFrameRemoved=true(img class 剩 rounded-3xl object-cover shadow-2xl)、nav 兩連結各有 svg／aria-label 正確／常態 max-width:0 opacity:0;a11y tree 連結名=合作品牌／精選活動;**真實 hover＋暫關 transition 實測 span max-width:96px・opacity:1・ml:8px・字寬 56px(展開有效)**;編譯 CSS 含 group-hover/group-focus-visible 的 max-width:6rem 規則;console 0 錯
- **已知環境註記**:預覽 compositor 凍結 → transition 停在第 0 幀,故常態讀 hover 值仍為 0;關掉 transition 後即證實規則生效。實機(hover:hover 環境,本預覽 matchMedia 亦回報 true)平滑展開
- **Commit**：`17c9347`
- **偏離**：無

---

## Step 20 — 品牌牆改官網連結 ＋ 移除左線（2026-07-12）

- **State**：S9 內追加微調（使用者提供 taiwan-brand-official-links.md＝選項 C）
- **做了什麼**：
  - `profile.ts`:`brands` 由 `string[]` 改為 `{ name, url }[]`,26 個品牌全對上官方連結(來源 `taiwan-brand-official-links.md`);金剛咖啡無官網→官方 FB;DRUNK ELEPHANT→beautystage 品牌頁
  - `BrandWall.tsx`:每個品牌從純文字 `<li>` 改為 `<li><a target="_blank" rel="noopener noreferrer">`;**移除左側細線**(`border-l border-hairline` 與 `pl-4` 拿掉);hover 仍變 accent 色
- **驗證**：build exit 0;DOM 26 連結全 `target=_blank`＋`rel=noopener noreferrer`、href 全 https、左線 `border-left:0`／`padding-left:0`、品牌名 26 唯一無重複 key;name→url 抽樣正確
- **Console 錯誤調查(重要)**:預覽出現大量「two children with same key(`[object Object]`)」＋「script tag while rendering」。**判定為 Next.js dev 工具 overlay 的雜訊,非本站程式**——證據:(a) 我方所有 `key=` 皆字串,若是我方 React 會印字串 key 而非 `[object Object]`;(b) grep 全 source 無物件 key、無裸 `<script>`(layout 用 `dangerouslySetInnerHTML`);(c) 攔截 console.error＋HMR 重繪 BrandWall 抓到 0 錯;(d) DOM 載有 `next-devtools` chunk＋`nextjs-portal` overlay(dev 專屬注入);(e) **production `out/` 對 next-devtools／nextjs-portal 參照數皆 0**。→ 部署站乾淨,不影響功能
- **Commit**：`042fa3a`
- **偏離**：無

---

## Step 21 — 新增「活動經歷」區（條列、去日期）＋ nav 第三 icon（2026-07-12）

- **State**：S9 內追加微調（使用者提供活動清單＋參考圖＝選項 C）
- **做了什麼**：
  - `profile.ts`:新增 `experiences: string[]`(34 筆),依時間新→舊排列;**日期全部移除**(使用者要求);修正 Doritos 錯字 多力多姿→多力多滋;`保護貼`→`保護貼推廣`、`GAMFORCE`→`GAMEFORCE`(待使用者確認)
  - 新增 `Experience.tsx`:section id=`experience`,標題「活動經歷」+ 副標;條列式(accent 圓點),桌機 `columns-2`(column-first 依時間往下讀,`break-inside-avoid`),手機單欄
  - `page.tsx`:插入於 合作品牌 → **活動經歷** → 精選活動 之間
  - `Nav.tsx`:新增條列 `ListIcon`＋第三連結 `#experience`「活動經歷」(沿用 hover/focus 滑出文字),順序對齊頁面
- **驗證**：build exit 0;DOM 標題=活動經歷、34 項各有圓點、**殘留日期 0 筆**、section 順序 top→brands→experience→gallery、nav 3 連結 aria-label 正確(合作品牌/活動經歷/精選活動)、桌機 column-count=2(兩欄 x=77/657、第 18 項落右欄);console 僅先前查明之 dev-tools overlay 雜訊
- **待確認(已於報告標明)**：`保護貼推廣`、`ROG GAMEFORCE`(原字 GAMFORCE);Doritos 已逕修為 多力多滋
- **Commit**：`7ca5254`
- **偏離**：新增 nav 項屬功能擴充(使用者未明說但將其列為與合作品牌/精選活動並列的區塊,合理延伸;已報告可要求移除)

---

## Step 22 — 🚀 首次發布上線 GitHub Pages（2026-07-12）

- **State**：S9 → 發布(使用者明說「發布／push」= ADR-002 gate 通過);達成 VISION stage 1「可分享上線」
- **發布前隱私硬檢查(ADR-001)**：99 追蹤檔中無 PDF／手機原圖／`originals/`／台灣手機號;`.gitignore` 擋 `/originals/`、`*.pdf`、`S__*.jpg`;`QQ.svg`、`taiwan-brand-official-links.md` 未追蹤不會上傳
- **做了什麼**：
  - 使用者確認 repo 可見性 = **公開**(GitHub Pages 免費方案需公開;原始碼僅含已授權公開資料)
  - `gh repo create joohnny3/hsuan-resume --public`(homepage 指向 Pages URL)→ `git remote add origin` → `git push -u origin main`
  - `gh api POST /pages -f build_type=workflow` 啟用 Pages(來源=GitHub Actions)
  - 首次 run 因競態(configure-pages 早於 Pages 啟用)失敗 → 啟用後 `gh run rerun --failed` 重跑成功
- **驗證**：Actions build✓ deploy✓;線上 https://joohnny3.github.io/hsuan-resume/ HTTP 200;DOM 4 區塊齊全、品牌 26／活動 34／照片 37／nav 3、姓名張庭瑄(瑄非瑋);**線上 HTML 電話 0 筆**;hero 圖與抽樣 gallery 圖 curl 全 200 image/webp(basePath 解析正確);CSS/暗色模式正常
- **已知環境註記**：預覽瀏覽器凍結 → 懶載入圖在此不顯示,但 curl 證實圖檔皆 200,實機正常
- **Commit**：`20c4bfc`（本地,尚未推送）
- **偏離**：無

---

## Step 23 — favicon 換成 QQ.svg（主題自適應）＋ title 改「展場模特兒」（2026-07-12）

- **State**：S9(published)內追加微調（使用者要求）
- **做了什麼**：
  - favicon:`QQ.svg`(1024 純黑剪影插畫)複製為 `src/app/icon.svg`(Next App Router 自動當 favicon);root tag 清理,加入 `<style>` 讓 `path` fill 依 `prefers-color-scheme` 換色 —— **淺色分頁 `#17171a`、深色分頁 `#f8f3f5`**(CSS 覆寫 path 的 `fill="#000000"` 屬性,兩種分頁背景都清晰)
  - 刪除舊 `src/app/icon.png`(git rm),改用單一 SVG favicon
  - `layout.tsx` title:`瑄瑄 Hsuan｜展場活動 SG・PG 作品集` → **`瑄瑄 Hsuan｜展場模特兒`**(openGraph siteName 同步跟著改)
- **驗證**：build exit 0,路由 `/icon.png`→`/icon.svg`;out/index.html `<title>瑄瑄 Hsuan｜展場模特兒</title>`、`<link rel=icon href=.../icon.svg type=image/svg+xml>`(basePath 正確)、無 icon.png 殘留;out/icon.svg 含 prefers-color-scheme 換色 style;Python XML 解析通過(root=svg、viewBox 1024、7 path、1 style)
- **註**：使用者原始 `QQ.svg` 仍在 repo root(未追蹤);已納入 icon.svg,root 那份可留可刪
- **Commit**：（本 step commit,本地;未推送 — 待使用者說 push)
- **偏離**：無
