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
**狀態**：Active（推翻同日稍早的「粉嫩甜美 IG 風」決策）

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

## 待補的 ADR（rolling list）

- [ ] 自訂網域方案（觸發：使用者購買網域時）
- [ ] 成效追蹤／分析工具選擇（觸發：Stage 3）
