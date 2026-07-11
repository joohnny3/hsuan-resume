# NOW.md — 現在該做的事

> 「下一個該動工的任務」入口（模組級）。step 級即時狀態看 `.dev-os/STATE.md`。

---

## 當前任務

**ID**：M1-editorial-redesign
**名稱**：Editorial 視覺與資訊架構改版
**Phase**：Phase 1 — Editorial 改版
**SPEC 路徑**：`.dev-os/specs/M1-editorial-redesign/MINI_SPEC.md`（Lite 模式，單檔）

**為什麼是這一個**：
- 使用者看過初版粉嫩風後明確要求改為高級感 editorial（拷問已定案，見 ADR-004／ADR-005）
- 視覺是廠商第一印象，擋在發布（M2）前面
- 照片資產與資料檔可沿用，改版範圍侷限在前端層

---

## 開工前確認清單

- [x] 讀過 `.dev-os/DECISIONS.md`（ADR-001〜006）
- [x] SPEC 已寫好並經使用者逐題確認（拷問流程即對齊）
- [x] 風險檢查通過（無 schema／權限／金流）

---

## 平行進行的工作（等使用者提供，不擋 M1）

- [ ] IG 帳號（給了就填 `src/data/profile.ts` 的 `instagram`）
- [ ] 2023 後新經歷清單（活動名即可，無需日期——品牌字牆用）
- [ ] 決定「競選總會PG」照片是否要加回照片牆（預設不放）

---

## M1 完成後

M2-deploy-pages 需要**使用者明說「發布／push」**才啟動（ADR-002）。
