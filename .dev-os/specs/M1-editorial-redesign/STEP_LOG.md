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
