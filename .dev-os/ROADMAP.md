# ROADMAP.md — 全模組路線圖

> **這份文件是專案的單一進度真相來源**。每完成一個模組就更新這裡的狀態。
> 詳細設計脈絡請看 `docs/MODULE_PATH.md`。

---

## 狀態圖示說明

- ⬜ **planned** — 已規劃，還沒寫 SPEC
- 📝 **specced** — SPEC 已寫好，可開工
- 🔨 **in-progress** — 開發中
- ✅ **done** — 已完成並通過驗收
- 🅿️ **parked** — 已寫但暫停
- ❌ **dropped** — 決定不做
- 📊 **data-eng** — 內容/資料工程任務

---

## 當前焦點

**Phase**：Phase 1 — Editorial 改版
**現在做**：見 `NOW.md`（M1-editorial-redesign）

---

## Phase 0：初版網站（已完成，2026-07-12）

> 目的：把 PDF 履歷變成可分享的單頁作品集網站（當時為粉嫩 IG 風）。

| ID | 模組 | 種類 | 狀態 | 依賴 | 備註 |
|----|------|------|------|------|------|
| M0.1-mvp-site | 初版單頁網站（照片處理＋五區塊＋Pages workflow） | implementation | ✅ | — | 視覺已被 M1 取代，照片資產與資料檔沿用 |

---

## Phase 1：Editorial 改版（進行中）

> 目的：高級感深色奢華視覺＋日夜模式、結構 root 化＋dev-os 導入、首屏整合、品牌字牆、照片牆統一 3:4。

| ID | 模組 | 種類 | 狀態 | 依賴 | 備註 |
|----|------|------|------|------|------|
| M1-editorial-redesign | Editorial 視覺與資訊架構改版 | implementation | 🔨 | M0.1 | 規格＝`.dev-os/specs/M1-editorial-redesign/MINI_SPEC.md`（拷問定案） |
| M2-deploy-pages | 建 GitHub repo、push、開 Pages | implementation | ⬜ | M1、**使用者明確同意發布** | 絕不自動 push（ADR-002） |

---

## Phase 2：內容補全（backlog）

> 目的：讓內容跟上 2026 現況。等使用者提供素材。

| ID | 模組 | 種類 | 狀態 | 依賴 | 備註 |
|----|------|------|------|------|------|
| M3-content-refresh | 2023 後新經歷＋IG 連結＋品牌字牆增補 | 📊 data-eng | ⬜ | 使用者提供清單 | 改 `src/data/profile.ts` 即可 |
| M4-custom-domain | 自訂網域（視需求） | implementation | ⬜ | M2 | BASE_PATH 改 ""（見 README） |

---

## 完成度統計

- Phase 0：1 / 1（100%）
- Phase 1：0 / 2（0%，M1 進行中）
- Phase 2：0 / 2（0%）
