# MINI_SPEC.md — M1-editorial-redesign：Editorial 視覺與資訊架構改版

> Lite 模式。內容為 2026-07-12 與使用者逐題拷問的定案（ADR-004／ADR-005）。

---

## 任務

- **模組 ID**：M1-editorial-redesign
- **名稱**：Editorial 視覺與資訊架構改版
- **模式**：Lite
- **module_kind**：implementation
- **預估工時**：半天

---

## 為什麼要做

初版粉嫩 IG 風不符合使用者要的精品質感；獨立自介區、三卡經歷與瀑布流照片牆讓頁面顯得雜。目標：對齊 TypeUI「refined」的深色奢華 editorial，資訊架構收斂成一條掃視動線。

---

## 要改什麼

包含：
- 主題系統：CSS 變數 token＋`data-theme`，深色（近黑底、暖金、襯線標題）預設，象牙日間主題，Nav 切換鈕＋localStorage 記憶＋防 FOUC inline script
- 字型：Playfair Display（拉丁襯線）＋ Noto Serif TC（中文襯線標題）＋ Noto Sans TC（內文）
- Hero：金色 eyebrow → 襯線大字「瑄瑄」＋HSUAN → 濃縮自介 2–3 行 → 細線分隔數據列（165cm／48kg／34C·24·34）→ 金色 LINE 邀約鈕＋外框「查看作品」；右側形象照 editorial 框
- 刪除獨立自介區（About）與三卡經歷（Experience）
- 新增品牌字牆（BrandWall）：「30+ 場」導言＋合作品牌襯線字牆、hover 泛金、無日期
- Gallery：統一 3:4 直式卡（object-cover 偏上）、2/3/4 欄、hover 金色說明浮層、pill 篩選重繪、燈箱看完整原圖
- Contact／Nav／Footer 重繪為同語言
- OG 分享圖與 favicon 重製為深色金風格
- `src/data/profile.ts` 增加 `brands` 清單與濃縮自介欄位

不包含：
- 發布（M2）、新經歷內容（M3）、照片重選

---

## 風險檢查

- [ ] 認證／權限／金流／個資 —— 無（個資白名單不變，ADR-001 驗收把關）
- [ ] database schema / migration —— 無
- [ ] 多模組共用核心邏輯 —— 無

Lite 合規：範圍小 ✅、一天內 ✅、可回滾（git）✅

---

## 驗收

| Criterion | 測試方式 | 預期結果 | 證據 |
|-----------|----------|----------|------|
| 建置通過 | `npm run build` | exit 0、靜態輸出 out/ | 終端輸出 |
| 隱私 grep | 手機號碼字串（以 `originals/` 內 PDF 記載為準，**數字不得寫進任何 repo 檔案，包括本表**）grep 全 repo；錯字「瑋」grep 網站呈現面（src、public、out） | 兩者皆 0 結果 | 終端輸出 |
| 日夜切換 | 瀏覽器點擊切換鈕 | `data-theme` 切換、重整後記住 | DOM 檢測 |
| 照片牆統一 | 檢查卡片 aspect-ratio | 全部 3:4、無瀑布流高低差 | DOM 檢測 |
| 燈箱原圖 | 點卡片開燈箱 | 顯示未裁切原圖＋說明 | DOM 檢測 |
| 品牌字牆 | 檢查經歷區 | 無日期、無三卡、品牌名齊全 | 頁面文字 |

---

## 完成紀錄

- **完成日期**：2026-07-12
- **主要 commit**：step 1 `075217d`（root 化＋dev-os）、step 2（editorial 重寫）、step 3（驗證＋狀態同步）——hash 見 git log
- **是否需要回填 ROADMAP**：是（已回填 ✅）
- **是否產生後續工作**：M2 發布待使用者明說；M3 內容補全待素材（IG／新經歷／競選照決定）

### 驗收證據（2026-07-12）

| Criterion | 結果 |
|-----------|------|
| 建置通過 | ✅ `npm run build` exit 0，out/ 靜態輸出四路由 |
| 隱私 grep | ✅ 手機號碼字串全 repo 0 筆（含前綴檢查）；「瑋」src／public／out 0 筆；`git ls-files` 無 originals／PDF／原圖 |
| 日夜切換 | ✅ 切換鈕使 `--canvas/--ink/--gold` 三 token 正確翻轉（#0e0d0b↔#f6f3ec 等），localStorage 記憶，預設深色 |
| 照片牆統一 | ✅ 37 張卡片實測比例全部 0.75（3:4），無瀑布流高低差 |
| 燈箱原圖 | ✅ 點卡開燈箱（原始寬高未裁切）、說明＋計數、Esc／背景關閉 |
| 品牌字牆 | ✅ 26 個品牌名、無日期（`20\d\d` 0 筆）、About／Experience 區塊已移除 |
| 其他 | ✅ 無橫向溢出、LINE 連結×3、Playfair Display 生效於 h1、IG 未填不顯示 |

註：本機預覽面板截圖管線故障（compositor 凍結），視覺驗證以 DOM／computed style 為證據；實機瀏覽器不受影響。
