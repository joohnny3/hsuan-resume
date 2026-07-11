# NOW.md — 現在該做的事

> 「下一個該動工的任務」入口（模組級）。step 級即時狀態看 `.dev-os/STATE.md`。

---

## 當前狀態：S9 — M1 已完成，等待使用者選擇下一個模組

M1-editorial-redesign 已於 2026-07-12 完成並通過驗收（證據見 `specs/M1-editorial-redesign/MINI_SPEC.md`）。

依 v0.5.2 規則，S9 且未指定下一模組時**不可自動選**。請使用者從以下選項明說：

### 選項 A：M2-deploy-pages — 發布上線
把網站推上 GitHub（建 repo `joohnny3/hsuan-resume` → push → 開 Pages）。
**Gate（ADR-002）：需使用者明說「發布」或「push」**。約 5 分鐘上線。

### 選項 B：M3-content-refresh — 先補內容再發布
提供素材即可動工：
- [ ] IG 帳號（填 `src/data/profile.ts` 的 `instagram`）
- [ ] 2023 後新經歷（活動／品牌名即可，無需日期——併入品牌字牆）
- [ ] 決定「競選總會PG」照片是否加回照片牆（預設不放）

### 選項 C：M1 視覺微調
看過本機預覽（`npm run dev` → http://localhost:3000/hsuan-resume）後想調整任何細節。

---

## 開工前確認清單（下個模組適用）

- [ ] 讀過 `.dev-os/DECISIONS.md`（ADR-001〜006）
- [ ] M2 屬發布行為，執行前再次確認使用者同意
