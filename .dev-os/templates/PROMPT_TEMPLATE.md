# PROMPT.md — [模組 ID] 給 Claude Code 的執行指令

> **使用方式**:從這個 template 複製,改內容。寫完後存到 `.dev-os/specs/<模組ID>/PROMPT.md`。
>
> 在 Claude Code 中執行此 prompt:
> ```
> 請依 .dev-os/specs/<模組ID>/PROMPT.md 執行
> ```

---

## 任務概要

請實作模組 **[模組 ID]:[模組名稱]**。

完整規格在 `.dev-os/specs/<模組ID>/SPEC.md`,請先讀完。

---

## 開工前必讀

請依序讀以下檔案,建立完整脈絡:

1. `README.md`(repo 根目錄)
2. `.dev-os/config.yml` — 專案命令、git policy、工作流模式
3. `.dev-os/README.md` — 開發系統使用方式
4. `.dev-os/DECISIONS.md` — **特別注意 [相關 ADR 編號]**
5. `.dev-os/specs/<模組ID>/SPEC.md` — 本模組規格
6. `.dev-os/specs/<模組ID>/ACCEPTANCE.md` — 驗收標準

[列出本模組需要參考的其他現有檔案,例如已有的 schema、相關 service、相關文件]

---

## 開工前的對齊步驟

讀完上述檔案後,**先不要寫程式**。請先回報以下事項,等使用者確認後才動工。

### 通用(Lite / Standard / Strict 都要做)

1. **本模組目的**:用 1-2 句話確認你理解的模組目的
2. **預期修改的檔案**:列出你打算新建 / 修改 / 刪除哪些檔案
3. **主要設計重點**:schema / API / UI / 核心邏輯中最重要的決策
4. **Open Questions 的答案**:對 SPEC 末尾「開放問題」段的每一項,給你目前的最佳答案(從現有 codebase 推敲),並標註把握度
5. **既有 pattern 參考**:這次要改的東西,codebase 裡有沒有類似既有寫法?如果有,請說明會照哪個檔案或模組的風格做,不要另起爐灶
6. **Out-of-scope 檔案**:這次明確不應修改哪些檔案或區域?

### Standard 額外要做

7. **影響範圍判斷**:這次改動會不會影響其他模組?如果會,影響什麼?

### Strict 額外要做

8. **2-3 個實作方案對比**:
   - 方案 A:[簡述] | 優點 | 風險 | 估計工時
   - 方案 B:[簡述] | 優點 | 風險 | 估計工時
   - 可選方案 C:[簡述] | 優點 | 風險 | 估計工時
   - **推薦方案**:[選哪個,為什麼]
9. **測試策略**:你打算寫或更新哪些測試覆蓋核心行為?如果是 bug fix,先說明 failing regression test

### 等待確認

回報完上述後,**停下來等我回覆**。我可能會確認、修正方向、或補充資訊。沒有確認前,不要開始寫 `src/` 或其他實作檔案。

---

## 實作順序建議

建議按以下順序進行,每完成一步就 git commit:

1. [步驟 1,例如:建立 DB schema migration]
2. [步驟 2,例如:寫 model + 基本 CRUD]
3. [步驟 3,例如:跑第一個 acceptance test]
4. [步驟 4,...]

每完成一步:
- 跑相關測試
- git commit,訊息格式如 `feat(<模組ID>): add ...`
- 短訊息回報進度

---

## 程式碼風格與紀律

- 沿用現有 codebase 的 schema/API/test 風格
- 所有新增/修改的程式碼必須有對應型別
- 新增的 schema 必須有 migration 檔
- 新增的 API endpoint 必須有對應的測試
- 結構化儲存:若專案有 `docs/data-warehouse-guide.md`,相關資料要符合該規範
- 不要引入新的 npm/pip 套件 — 如果真的需要,先跟我確認
- 設計禁區提醒(來自 DECISIONS.md):見 [相關 ADR]

---

## 完成後的更新流程

當所有 ACCEPTANCE 通過後,**必須執行三個收尾 prompt**(順序不可顛倒):

### Prompt 1:健康檢查

詳見 PROMPT_LIBRARY.md 第 4.1。產出 IMPLEMENTATION_FEEDBACK.md。

### Prompt 2:SPEC 回填

詳見 PROMPT_LIBRARY.md 第 4.2。把實作中的偏離反映到 SPEC。

### Prompt 3:狀態同步

詳見 PROMPT_LIBRARY.md 第 4.3。同步 ROADMAP、STATUS、ACCEPTANCE、NOW。

完成三個 prompt 後執行 **Design Sync**:
- 先讀 `.dev-os/config.yml` 的 `project.conversation_layout`
- `ide-only`(預設):不用複製到外部對話。在同一個 IDE thread 讀 `IMPLEMENTATION_FEEDBACK.md`,判斷是否需要更新 `DECISIONS.md` / `PHASE_PLAN.md` / `ROADMAP.md` / `NOW.md`
- `split`:把 `IMPLEMENTATION_FEEDBACK.md` 的 Design Deltas 表格貼到 Web AI 設計對話;若設計者要求,再貼完整 feedback
- Design Sync 完成後,再依 ROADMAP 與設計者確認結果更新 `NOW.md` 指向新任務
