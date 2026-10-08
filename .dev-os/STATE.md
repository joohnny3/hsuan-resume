---
phase: "Phase 1 — Editorial 改版"
wave: "Wave 1"
vision:
  stage: "1"
  stage_name: "可分享上線"
  total_stages: 3
module: "M1-editorial-redesign"
module_name: "Editorial 視覺與資訊架構改版"
workflow_state: "S9"
workflow_state_name: "module fully complete, waiting for next module"
branch: "main"
last_update: "2026-10-09"
conversation:
  date: "2026-10-09"
  thread_n: 1
  messages_estimate: 36
  health_verdict: "Healthy"
  note: "S9 內追加微調；step 24–28 同一對話完成"
current_step:
  n: 29
  title: "合作品牌移除兩筆＋新增 Mortlach 慕赫威士忌活動（完成，已加到 PR #1 分支）"
  location: "same conversation"
  started_at: "2026-10-09"
last_step:
  n: 28
  title: "內容整理、首屏組圖與影片按鈕、姓名字型定案（step 24–28 單一 commit）"
  commit: "60c97f7"
  completed_at: "2026-10-09"
next_step:
  n: 30
  title: "等使用者合併 PR #1（合併後才上線）；之後選擇繼續微調／補內容／收尾（S9 不可自動選）"
  location: "same conversation"
published:
  live_url: "https://joohnny3.github.io/hsuan-resume/"
  repo: "joohnny3/hsuan-resume (public)"
  first_deploy: "2026-07-12"
blockers: []
---

# STATE.md — 開發進度即時儀表板

## 當前狀態

- **Phase**: Phase 1 — Editorial 改版
- **Module**: M1-editorial-redesign — **已完成並發布上線 🚀**
- **Live**: https://joohnny3.github.io/hsuan-resume/ （repo: joohnny3/hsuan-resume, public）
- **Branch**: `content/2026-10-update`（PR #1 開啟中；合併進 main 後才上線，線上目前仍為 step 23 的版本）
- **Last update**: 2026-10-09

## 當前 Step

- **#28**（完成）：2026-10-09 這一批的全部調整，連同 step 24–27 合併為單一 commit。
  - **首屏**：自介第三版文案；形象照換成四場活動組圖（無活動標籤）；姓名中文改 Shippori Mincho SemiBold、英文 Hsuan 取消斜體；自介下方新增「▶ 自我介紹影片」按鈕（YouTube Shorts）。
  - **Header**：桌機版導覽固定顯示純文字；手機版維持純 icon。
  - **合作品牌／活動經歷**：移除兩區副標；活動經歷寫法對齊照片說明（活動×品牌 SG/PG），排序 SG → PG → 未標；加入三場新工作。共 37 筆。
  - **精選活動**：刪 4 張、加 3 張新工作；說明文字去掉「台灣」前綴；排序 SG 在前、PG 在後。共 35 張。
  - 細節見 `specs/M1-editorial-redesign/STEP_LOG.md` step 24–28 與 `DECISIONS.md` ADR-009 追記。
  - 上述已推到分支 `content/2026-10-update`，PR #1 開啟中（使用者選擇先不合併，線上仍為舊版）。
- **#29**（完成，已加到 PR #1 分支）：
  - 合作品牌移除「多力多滋」「BingX」兩筆（26 → 24）。活動經歷中提到這兩個品牌的條目未動。
  - 新增一場活動「Mortlach 慕赫威士忌 SG」：原圖移入 `originals/photos/`（gitignored），壓成 `public/photos/event-mortlach.webp`（878×1200，無 EXIF）；精選活動與活動經歷各加一筆，依使用者指示皆放 **SG 區最後（第一筆 PG 之前）**。現為精選活動 36 張（SG 20／PG 16）、活動經歷 38 筆（SG 19／PG 11／未標 8）。合作品牌未加入 Mortlach。

## 下一個 Step

- **#30**：等使用者合併 PR #1（https://github.com/joohnny3/hsuan-resume/pull/1）；合併後確認線上部署。其餘可選項（S9 不可自動選）：
  - **A. 繼續視覺／文案微調**（本機預覽 http://localhost:3000/hsuan-resume/）
  - **B. 補內容**（新經歷、新照片）
  - **C. 清掉既有待辦**：重生成 OG 分享圖（仍是舊首屏照與「HSUAN」字樣）；修 `ThemeToggle.tsx` 的 lint 錯誤；決定 `public/photos/expo-jtar.webp`（已無引用）是否刪除；workflow actions 升版。

## Blockers

- none

## Module Progress

- M1-editorial-redesign: 7 / 7 steps ✅（step 4 之後皆為 S9 內追加微調）
- Acceptance: 全數通過（build／隱私 grep／日夜切換／3:4 統一／燈箱／品牌字牆／配色 v3+v4 token／簽名 logo）
- 字體：全站襯線（ADR-009），唯一例外是首屏姓名（Shippori Mincho，見 ADR-009 追記）

## 已知事項

- `npm run lint` 有 1 筆既有錯誤：`ThemeToggle.tsx:10` `react-hooks/set-state-in-effect`（部署流程只跑 build，不受影響）。
- 改 `globals.css` 的 `@theme` 後若 dev server 樣式沒更新（重啟也無效），刪除 `.next` 再啟動。
- 日系明朝字型多半缺「瑄」（U+7444），換姓名字型前必須實測（方法見 ADR-009 追記）。
- 文案原則：使用者提供的文字照原文套用；有修改建議先提出討論，不直接改字。

## Recent commits（本模組）

- 075217d — step 1: root 化重構與 dev-os lite 實例化
- cdcea69 — step 2: 深色奢華 editorial 重寫
- b9a81ea — step 3: 驗收證據回填與狀態同步
- (step 4 之後的 commit 見 git log)
