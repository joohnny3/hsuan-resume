# IMPLEMENTATION_FEEDBACK.md — [模組 ID] 實作回饋

> **使用方式**:由 Claude Code 在「三個收尾 prompt」的第一個 prompt(健康檢查)執行時自動產出。
>
> **本檔案的用途**:把實作中的偏離與發現記下來,供設計角色吸收。
>
> 是否需要複製到別處,依 `.dev-os/config.yml` 的 `project.conversation_layout` 判斷:
> - `ide-only`(預設):不用複製,coding agent 會在同一個 IDE thread 讀取。
> - `split`:由使用者把 Design Deltas 表格貼到 Web AI 設計對話;必要時再貼完整內容。
>
> 這份回饋是 dev-os 工作流的「閉環」核心。沒有 Design Sync,設計會脫離現實。

---

## 元資訊

- **模組 ID**:[模組 ID]
- **實作完成日期**:YYYY-MM-DD
- **主要 commit**:[commit hash]
- **實作人**:Claude Code(具體 model 版本與 session 略)
- **負責人**:[獨立開發者本人]

---

## Design Deltas 摘要

> 這張表是 Design Sync 時最重要的部分。它回答「哪些設計假設被實作修正了」。

| 變更 | 原 SPEC 假設 | 實作結果 | 影響後續模組 | 需要 ADR |
|------|--------------|----------|--------------|----------|
| [變更 1] | [原假設] | [實作結果] | [是/否,影響什麼] | [是/否] |
| [若無,寫「無重大設計差異」] | — | — | — | — |

---

## 1. 健康檢查結果

### 既有 test 狀態

```
[執行 npm run typecheck / npm test 等命令的結果]

例:
✓ npm run typecheck — pass
✓ npm run test:skill-graph — pass (12 tests)
✓ npm run test:mission-loop — pass (28 tests)
✓ npm run test:<本模組> — pass (X tests)

全套 test pass,沒有打壞既有功能
```

### Commit history 結構

```
[git log --oneline -N 的結果]

例:
abc1234 feat(C3.3): add timeline editor API endpoints
def5678 feat(C3.3): add timeline editor frontend
...
```

**結構評估**:[是否符合 PHASE_PLAN 規劃的分段 commit 紀律]

---

## 2. SPEC vs 實作對照(影響的檔案段)

### SPEC 預期會新建但實際沒新建

- [檔案路徑] — 原因:[為什麼沒建]
- [若無,寫「無」]

### SPEC 沒提到但實際新建

- [檔案路徑] — 原因:[為什麼新建]
- [若無,寫「無」]

### SPEC 預期會修改但實際沒改

- [檔案路徑] — 原因:[為什麼沒改]
- [若無,寫「無」]

### 實際路徑跟 SPEC 不一致

- SPEC 寫:`[原路徑]` → 實際:`[新路徑]` — 原因:[...]
- [若無,寫「無」]

---

## 3. 偏離 SPEC 或 SPEC 不夠精確的地方

### Open Questions 答案落地狀況

對照 SPEC 末尾的 Open Questions:

- **Q1:[問題]**
  - SPEC 寫:[原本 SPEC 中的方向]
  - 實際答案:[實作後的決定]
  - 是否影響其他部分:[是/否,影響什麼]

- **Q2:[問題]**
  - SPEC 寫:[...]
  - 實際答案:[...]
  - 是否影響其他部分:[...]

[繼續列完所有 Open Questions]

### 實作中發現的 SPEC 矛盾或缺漏

- **發現 1**:[描述 SPEC 中的矛盾或缺漏]
  - 嚴重程度:critical / important / nice-to-have
  - 處理方式:[在實作中如何處理]
  - 是否需要寫新 ADR:[是/否]

- **發現 2**:[...]

[繼續列完所有發現]

### SPEC 寫 A、實作走 B 的地方

- **項目 1**:
  - SPEC 寫:[A 方案]
  - 實作走:[B 方案]
  - 理由:[為什麼改方向]
  - 是否回填到 SPEC:[是/否,回填了什麼]

- **項目 2**:[...]

---

## 4. 對後續模組設計的影響

> 這部分讓設計者知道下個模組設計時需要參考什麼新事實。

### 對直接相關模組的影響

- [模組 X]:[本模組實作後,模組 X 設計時需要知道的事實]
- [模組 Y]:[...]

### 對全系統的影響

- [系統性發現,例如:某個共用模式可以推廣到其他模組]
- [...]

### 是否需要修訂 PHASE_PLAN

[評估:本實作是否讓 PHASE_PLAN 中的某些假設失效]

---

## 5. 是否需要新 ADR

[列出實作中產生的、值得記錄為 ADR 的決策]

- 候選 ADR:[標題]
  - 脈絡:[...]
  - 決定:[...]
  - 是否值得正式寫成 ADR:[是/否,理由]

[若無,寫「本模組未產生需要記錄為 ADR 的決策」]

---

## 6. 給設計者的建議

[實作者(Claude Code)對設計者的建議,例如:某些設計模式可重用、某些約束需要重新評估等]

- [建議 1]
- [建議 2]

---

## 給人類的後續動作清單

當你讀完這份 IMPLEMENTATION_FEEDBACK 後,你應該:

- [ ] 確認三個收尾 prompt 全部跑完(本份是 prompt 1 的產出,還有 prompt 2、3 要跑)
- [ ] 依 `.dev-os/config.yml` 的 `project.conversation_layout` 執行 Design Sync
- [ ] `ide-only`:在同一個 IDE thread 請 coding agent 讀本檔案,判斷是否需要更新 DECISIONS / PHASE_PLAN / NOW
- [ ] `split`:先把 `Design Deltas` 摘要貼到設計對話;若設計者需要細節,再貼本檔案完整內容
- [ ] 處理「對後續模組設計的影響」與候選 ADR
- [ ] 進入下一個模組
