# DECISIONS.md — 重大架構決定記錄（ADR）

> 已對焦、不應隨意更動的高層級決策。新增決定時在文件最後新增，**不要修改舊的**。
> 推翻舊決定：寫新 ADR 標 `Supersedes ADR-XXX`，舊 ADR 標 `Superseded by ADR-YYY`。
> Claude Code 開發前必讀。

---

## ADR-001：隱私鐵則——電話與原始履歷永不進公開 repo

**日期**：2026-07-12
**狀態**：Active

**脈絡**：
GitHub Pages 免費方案要求 repo 公開；任何內容進了 git 歷史即永久可挖。瑄瑄的原始履歷 PDF 內含手機號碼；手機原圖（`S__*.jpg`）為未壓縮個人照片。

**決定**：
1. 手機號碼不得出現在 repo 任何檔案；對外聯絡管道只有 LINE ID。
2. 原始 PDF 與手機原圖集中在 `originals/`，由 `.gitignore`（`/originals/`、`*.pdf`、`S__*.jpg`）三重封鎖。
3. 照片一律壓縮成 WebP 後才進 `public/photos/`。
4. 公開資訊白名單：本名張庭瑄、藝名瑄瑄、LINE ID、身高體重三圍。

**理由**：
- git 歷史不可逆，事後補救成本無限大
- 公開電話會被爬蟲收錄導致騷擾

**Trade-off**：
- 廠商少一個直撥管道（可接受，業界以 LINE 為主）

**影響的模組**：全部

---

## ADR-002：部署形態——GitHub Pages 專案 repo＋靜態輸出，發布需明確同意

**日期**：2026-07-12
**狀態**：Active

**脈絡**：
需求為免費託管。使用者 GitHub 帳號實為 `joohnny3`（gh CLI 驗證，勿再用 email 猜 johnny31258）。

**決定**：
- Repo：`joohnny3/hsuan-resume`（公開），網址 `https://joohnny3.github.io/hsuan-resume`
- Next.js `output: 'export'`＋`basePath: '/hsuan-resume'`（單一事實來源 `src/lib/site.ts`）
- GitHub Actions 建置部署（`.github/workflows/deploy.yml`）
- **push＝公開發布個人資料，必須使用者明說才執行**（config `auto_push: false`）

**理由**：
- 免費、無伺服器維護
- basePath 集中管理，未來換自訂網域只改一處

**Trade-off**：
- repo 必須公開（由 ADR-001 緩解）
- 無 next/image 即時最佳化（改預壓 WebP）

**影響的模組**：M2、M4

---

## ADR-003：技術棧——Next.js App Router＋TypeScript＋Tailwind v4

**日期**：2026-07-12
**狀態**：Active

**脈絡**：
使用者指定（推翻原本「純 HTML/CSS/JS」建議）。Next.js 16.2.10 有 breaking changes，寫碼前先讀 `node_modules/next/dist/docs/`。

**決定**：
Next.js（App Router）＋ TypeScript ＋ Tailwind CSS v4；內容集中於 `src/data/profile.ts` 單一資料檔；照片預壓 WebP 進 `public/photos/`。

**理由**：
- 使用者熟悉的棧，之後自己維護
- 資料與版面分離，新增經歷＝改一行資料

**Trade-off**：
- 對單頁站偏重（build 依賴 Node 環境）
- next/image 不自動加 basePath——一律用 `asset()` helper（`src/lib/site.ts`）

**影響的模組**：全部前端

---

## ADR-004：視覺系統 v2——深色奢華 Editorial，預設深色＋象牙日間主題

**日期**：2026-07-12
**狀態**：Active（推翻同日稍早的「粉嫩甜美 IG 風」決策；暖金色票部分 Superseded by ADR-007，主題機制與字型仍有效）

**脈絡**：
初版粉嫩風上線預覽後，使用者參考 TypeUI「refined」風格要求改為高級感 editorial，並要求日夜雙主題。

**決定**：
- 深色為預設：近黑底＋暖金點綴＋襯線標題（英文 Playfair Display、中文 Noto Serif TC）＋pill 控件＋大留白
- 日間主題為象牙白同套 editorial（不回粉色）；右上切換鈕，localStorage 記憶，防 FOUC inline script
- 主題以 CSS 變數 token 實作（`data-theme` 屬性切換），Tailwind 語意色引用 token

**理由**：
- 對齊參考稿的精品質感，照片在深底上更突出
- token 化讓日夜共用同一套元件

**Trade-off**：
- 比單主題多一層 token 抽象
- 金色在淺底需另調（對比度）

**影響的模組**：M1 全部元件

---

## ADR-005：資訊架構 v2——首屏整合自介、品牌字牆、照片牆統一 3:4

**日期**：2026-07-12
**狀態**：Active

**脈絡**：
使用者回饋：獨立自介區冗餘、經歷三卡＋日期太履歷感、照片牆瀑布流長短不一難看。

**決定**：
1. 首屏＝名字襯線主標（瑄瑄＋HSUAN）＋濃縮自介 2–3 行＋細線數據列＋金色 LINE CTA；獨立自介區刪除
2. 經歷＝品牌字牆：「30+ 場」導言＋合作品牌／活動名襯線字牆，**無日期、無三分類卡**（分類資料保留在 data 檔供照片篩選用）
3. 照片牆＝統一 3:4 直式卡（object-cover 偏上）、2/3/4 欄、hover 金色說明浮層、燈箱看完整原圖、保留 pill 篩選
4. 頁面流：Hero → 品牌字牆 → 照片牆 → 邀約 → Footer

**理由**：
- 廠商掃視效率：名字→人→品牌背書→照片→邀約，一條直線
- 統一比例消除視覺雜訊

**Trade-off**：
- 日期資訊不再展示（資料檔仍保留，可隨時恢復）
- 3:4 裁切犧牲部分構圖（燈箱可看原圖補償）

**影響的模組**：M1

---

## ADR-006：工作流——dev-os lite、root 即 repo、template/ 用畢即刪

**日期**：2026-07-12
**狀態**：Active

**脈絡**：
初版把網站藏在 `site/` 子資料夾以隔離原始檔；使用者要求「正常 repo 應該是根目錄」並導入自己的 dev-os 工作流（v0.5.4）。

**決定**：
- 專案根目錄即 git repo（fresh init，捨棄 create-next-app 的腳手架 commit）
- dev-os 全套結構實例化，`workflow_mode: lite`（MINI_SPEC，免三收尾 prompt）
- git：main-direct、每步 auto-commit、**絕不 auto-push**
- 原始檔隔離改用 `originals/`＋gitignore 三重規則（取代資料夾邊界）
- `template/` 實例化後刪除（使用者確認 starter 另有原版）

**理由**：
- 符合使用者跨專案的一致工作流
- lite 儀式量與單頁站規模相稱

**Trade-off**：
- 原始檔與 repo 同層，誤 commit 風險上升（由 gitignore 三重規則＋ADR-001 驗收 grep 緩解）

**影響的模組**：全部

---

## ADR-007：配色系統 v3——石墨×玫瑰粉，雙主題各自色碼

**日期**：2026-07-12
**狀態**：Active（Supersedes ADR-004 的暖金色票；主題機制、字型、版面不變）

**脈絡**：
使用者提供完整雙主題色票規格（含 WCAG 對比度依據），要求把暖金識別換成玫瑰粉；並依 Material Design 建議，同一「色彩角色」跨明暗主題使用不同色碼，不強制同色。

**決定**：
1. Token 角色改名：`gold`→`accent`、`gold-strong`→`accent-hover`；新增 `elevated`（modal／浮動元件）、`muted-2`（非關鍵 metadata）、`accent-soft`（提示背景）、`on-accent`（accent 底上的文字）
2. Light：canvas `#F7F7F5`／surface `#FFFFFF`／surface-2 `#F0EEEF`／ink `#17171A`／muted `#625D66`／muted-2 `#756E78`／border `#DED9DF`／accent `#C43F6B`（對比 4.58:1，可當一般文字）／hover `#A93259`／soft `#F8E7ED`／on-accent `#FFFFFF`
3. Dark：canvas `#101116`／surface `#171920`／surface-2 `#20222A`／elevated `#282A33`／ink `#F5F2F4`／muted `#AAA4AC`／muted-2 `#85808A`／border `#31343D`／accent `#F27FA5`（對比約 7.5:1）／hover `#FF9ABB`／soft `#2C1821`／on-accent `#101116`
4. OG 分享圖與 favicon 同步重製為石墨×玫瑰
5. 深色仍為預設（ADR-004 的主題機制不變）

**理由**：
- 玫瑰粉承接品牌識別（Round 1 粉色系）同時保住 editorial 質感
- 色票已算好對比度：accent 兩主題皆可直接當文字色

**Trade-off**：
- accent 依主題換色碼，設計稿／截圖需標明所在主題

**影響的模組**：M1 全部元件、OG／favicon

---

## ADR-008：Dark mode 配色 v4——BLACKPINK 暖黑×標誌粉

**日期**：2026-07-12
**狀態**：Active（Supersedes ADR-007 的 **dark** 色票；light 色票不變、主題機制與字型不變）

**脈絡**：
使用者提供一套更完整的 dark palette(暖近黑＋BLACKPINK 標誌粉)，並補齊三個先前沒有的色彩角色：Pure Black 分區背景、Accent Strong、Border Hover。只調整夜間,日間維持 ADR-007。

**決定**：
1. 新增三個 token 角色(含 light 對應值,使兩主題皆可用)：
   - `--canvas-deep`(Pure Black,dark `#000000`／light `#f7f7f5`)：套用於 Hero 與 Footer,與 `--canvas` 頁面底做分區
   - `--accent-strong`(dark `#EE6F91`／light `#A93259`)：小範圍高強度狀態備用
   - `--hairline-hover`(dark `#835062`／light `#c4a7b0`)：邊框 hover 備用
2. Dark 既有 token 全面改值：canvas `#0B0A0B`／surface `#161216`／surface-2 `#211A1E`／elevated `#2A2025`／ink `#F8F3F5`／muted `#D6C9CE`／muted-2 `#A78F99`／hairline `#3A2930`／accent `#F598AF`／accent-hover `#FFB0C1`／accent-soft `#321A22`／on-accent `#101010`／overlay `rgba(0,0,0,.6)`
3. `viewport.themeColor` 改 `#0B0A0B`；OG 分享圖＋favicon 重製為純黑底＋標誌粉(v4 腳本)
4. `--accent-strong`／`--hairline-hover` 已定義並掛進 `@theme inline`(可用 `bg-accent-strong`／`border-hairline-hover`),目前保留備用、未強制套用到既有 hover(既有 hover 仍走 accent,視覺較醒目)

**理由**：
- 暖黑(帶紅微量)比冷石墨更貼合粉色品牌、照片在純黑 Hero 上更跳
- 補齊角色讓 token 系統與使用者規格對齊,日後可直接引用

**Trade-off**：
- Hero/Footer 純黑與頁面 `#0B0A0B` 差異極細微(刻意的分區,肉眼近乎一致)
- 兩個備用 token 目前未被消費(有意保留)

**影響的模組**：M1 dark 呈現、OG／favicon

---

## ADR-009：字體系統 v2——全站統一襯線(Noto Serif 同源超家族)

**日期**：2026-07-12
**狀態**：Active（Supersedes ADR-004 的字型部分：Playfair Display＋Noto Sans TC 混搭作廢）

**脈絡**：
使用者回饋三點:①數據列數字高低不平 ②中英字體不統一 ③覺得現在字體醜。逐題拷問(4 題)後定案。根因:原本混用 Playfair Display(拉丁)＋思源宋(中文標題)＋思源黑(內文)三套;數字不平來自 Playfair 的舊體數字(old-style figures,升降部)＋數字襯線/單位無襯線基線不一。中文網頁襯線高品質免費字幾乎只有思源宋,故拉丁側改用其同源家族。

**決定**：
1. 全站統一襯線:拉丁 **Noto Serif** ＋ 中文 **Noto Serif TC**(思源宋)——兩者同源設計,筆形/粗細/基線對齊,中英視覺如同一支字
2. 範圍=全站:標題、內文段落、品牌名、eyebrow、迷你標籤、數字全部襯線;**整支 Noto Sans TC 移除**
3. 機制:`--font-serif-latin`＋`--font-serif-tc` 兩變數;globals 的 `--font-sans` 與 `--font-serif` 皆指向同一襯線堆疊,body 一併襯線化(元件免大改)
4. 數字:`font-variant-numeric: lining-nums`(body 全域)＋數據列加 `tabular-nums`,根治高低不平並讓三欄等寬
5. 載入權重:Noto Serif 400/500/600/700/900(含 italic)、Noto Serif TC 400/600/700/900

**理由**：
- 同源家族是「統一」最徹底解;移除整支 sans 反而減少字型負載
- lining/tabular 數字是數據列不平的根治,非表層微調

**Trade-off**：
- 中文長段落用宋體易讀性略低於黑體,但本站內文極短(自介 2-3 行),影響可忽略
- 極小 eyebrow 用襯線較不「銳利」,以字重/字距補償(使用者明確選擇徹底統一)

**影響的模組**：M1 全部文字呈現

**追記（2026-10-09，使用者指定的例外）**：
首屏姓名 `<h1>` 的中文「張庭瑄」改用 **Shippori Mincho SemiBold 600**（築地體系的古典明體）；英文「Hsuan」維持 Noto Serif 500 正體（不斜）。僅此一處例外，其餘文字仍依本 ADR 全站襯線。
- 經過（同一天三次迭代）：① 使用者指定 Noto Sans TC → 看後覺得不好看；② 改選霞鶩文楷 Bold → 使用者不喜歡手寫感；③ 使用者要「高級典雅、類似蘭陽明體」。蘭陽明體是 justfont 的付費字型，未購買網頁授權不能嵌入，故以無頭瀏覽器實排明體候選（思源宋 400–700、仙人掌明體、昭源宋體、Shippori／Zen Old／Hina／Kaisei 等日系明朝）後選 Shippori Mincho：同為築地體脈絡、古典感最接近。
- **缺字陷阱**：日系明朝多半沒有「瑄」（U+7444）。Google Fonts 的 unicode-range 與 `document.fonts.load` 都會誤報「有字」，必須下載子集檢查 cmap，或用 CDP `CSS.getPlatformFontsForNode` 看實際用到的字型。Shippori Mincho 已用兩種方式確認三字皆有；Zen Old Mincho／Hina Mincho／Kaisei Tokumin 的「瑄」會退回系統字，不可用。
- 機制：`layout.tsx` 另載 `Shippori_Mincho`（僅 600、`preload: false`，變數 `--font-mincho-name`）→ globals `--font-display`（Noto Serif 排前吃拉丁字 → Shippori → 退回思源宋）→ Hero h1 用 `font-display font-semibold tracking-wider`。
- 若使用者日後購買蘭陽明體網頁授權，可改為自架字檔並只子集「張庭瑄」三字。

---

## ADR-010：首屏改 profile-card ＋ 公開聯絡管道擴充(email／IG)

**日期**：2026-07-12
**狀態**：Active（延伸 ADR-005 資訊架構;擴充 ADR-001 公開白名單）

**脈絡**：
使用者提供自己的開發者 profile 卡當參考(圖二),要求 Hero 自介區照該結構重排,並給出新職稱、完整自介文案、以及信箱與 IG 帳號(都要帶 icon)。

**決定**：
1. Hero 版面:職稱 eyebrow(展場模特兒・品牌推廣)→ 大名 **張庭瑄** ＋ 英文 HSUAN(取代原本大字藝名「瑄瑄」;藝名仍在自介與 nav 簽名)→ 完整自介(3 段)→ 數據列(保留)→ **icon 聯絡列**(信箱／LINE／IG)
2. 移除:原特質行(活潑開朗…,已併入自介)、Hero 兩顆大按鈕(LINE 邀約／查看作品);主要 LINE CTA 由底部「合作邀約」區承接
3. 照片維持右側大圖(全身形象照,不縮成圖二式方形頭像)
4. **公開白名單擴充**(ADR-001):新增 email `aso86012000@yahoo.com`、IG `__h_s_u_a_n__`;IG 連結去除 QR 追蹤參數(igsh／utm_source);**電話仍永不進 repo**
5. 底部聯絡區同步:LINE／信箱／IG 三管道皆帶 icon;新增 MailIcon、InstagramIcon(outline 風,與既有 filled LineIcon 並用)

**理由**：
- 對齊使用者偏好的 profile-card 敘事,職稱＋完整自介更能對廠商說清楚能力
- 多一個 email 管道與 IG 作品延伸,降低邀約門檻

**Trade-off**：
- Hero 少了大粉色 CTA 按鈕(以底部區補);email/IG 公開會被爬蟲收錄(使用者授權、可接受;電話仍不公開)

**影響的模組**：M1（Hero／Contact／profile 資料）

---

## ADR-011：聯絡資訊收斂進頁尾 footer ＋ 開發者署名

**日期**：2026-07-12
**狀態**：Active（延伸 ADR-010;調整 ADR-005 頁面流的「邀約」段）

**脈絡**：
使用者提供參考頁尾(圖二:多欄 footer＋帶 icon 聯絡欄＋底部 copyright),要求把聯絡資訊統一收進 footer,移除獨立「合作邀約」區與 Hero 的聯絡 icon 列。

**決定**：
1. 移除 `Contact.tsx`(合作邀約區)與 `CopyButton.tsx`(隨之無用),刪檔
2. 移除 Hero 的聯絡 icon 列(Hero 回歸純自介:職稱／姓名／自介／數據列)
3. 新增 `Footer.tsx`(圖二式三欄):品牌(瑄瑄 Hsuan＋職稱＋tagline)／聯絡資訊(LINE 1012251・信箱・IG,皆帶 icon)／快速連結(合作品牌・活動照片);footer 掛 `id="contact"`,nav「邀約」改指向 footer
4. 頁面流變為:Hero → 品牌字牆 → 照片牆 → Footer(含聯絡)
5. 底部 copyright 只留 **「Copyright © 2026 Chang Yu Cheng. All rights reserved.」**——即開發者張育誠署名(非主角瑄瑄);年份依使用者指定寫死 2026

**理由**：
- 聯絡管道單一入口(footer),版面更乾淨;對齊使用者偏好的 footer 參考
- 網站由張育誠開發,footer 署名開發者

**Trade-off**：
- 少了 Hero 與獨立區的醒目 LINE CTA(改由 footer 承接;若需轉換可再加回)
- copyright 年份寫死,跨年需手改

**影響的模組**：M1（Hero／新 Footer／page；刪 Contact／CopyButton）

---

## 待補的 ADR（rolling list）

- [ ] 自訂網域方案（觸發：使用者購買網域時）
- [ ] 成效追蹤／分析工具選擇（觸發：Stage 3）
