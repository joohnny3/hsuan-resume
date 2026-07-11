# .dev-os/ — 開發作業系統

> 這個資料夾是這個專案的「開發中控台」。它不執行任何程式,但它告訴你(以及 Claude Code)**現在該做什麼、怎麼做、怎麼驗收**。
>
> 完整心法見 docs/PLAYBOOK.md(若你有放),或 dev-os-starter 的 PLAYBOOK。

---

## 為什麼有這個資料夾

獨立開發者最大的痛點不是寫程式,是**追蹤進度與決策的脈絡**。AI 寫程式很快,但 AI 不會自動知道「上週為什麼這樣設計」「這個模組要先做還是後做」「驗收標準是什麼」。

這個資料夾解決這件事。所有開發前的思考都先變成檔案,Claude Code 從檔案讀取脈絡。**人類的工作是想清楚並寫進來,AI 的工作是按照寫好的規格執行。**

---

## 怎麼使用

### 日常開發循環(v0.5)

1. 打開 `STATE.md` — 看到「現在第幾步、上一步、下一步」(若已啟動 module)
2. 打開 `config.yml` — 確認命令、git policy、工作流模式
3. 打開 `NOW.md` — 看到「現在該做的是哪個模組」
4. 打開 `specs/X/SPEC.md` — 確認你理解這個模組要做什麼
5. 在 Claude Code 裡執行:
   ```
   請依 .dev-os/specs/X/PROMPT.md 執行
   ```
6. Claude Code 對齊 → 實作 → 每個 step 結尾自動 commit + 更新 STATE.md
7. 同對話內推進只需說「繼續」,AI 不必每次印長 prompt
8. 完成後跑三個收尾 prompt(健康檢查、SPEC 回填、狀態同步)
9. 執行 Design Sync,讓設計角色吸收 IMPLEMENTATION_FEEDBACK
10. 回到第 1 步

### 新增模組時

1. 先判斷模式:Lite / Standard / Strict
2. Lite 從 `templates/MINI_SPEC_TEMPLATE.md` 複製
3. Standard / Strict 從 `templates/SPEC_TEMPLATE.md` 複製一份(連同其他三份配套 template)
4. 填內容(建議跟設計對話的 AI 一起寫,然後自己審核落檔)
5. 加進 `ROADMAP.md` 的對應 Phase

### 重大決策變更時

1. 寫進 `DECISIONS.md`(ADR 格式,新增不修改舊的)
2. 影響到的 SPEC 一併更新
3. 跟設計角色與 Claude Code 同步說明變更

---

## 檔案職責

| 檔案 | 用途 | 誰寫 | 多久更新 |
|------|------|------|----------|
| `README.md` | 這份指南 | 一次性 | 偶爾 |
| `WORKFLOW_PROTOCOL.md` | workflow state machine 與下一步判斷規則 | 一次性 | 工作流演化時 |
| `config.yml` | 專案命令、git policy、工作流模式 | 人類 | 專案規則改變時 |
| `COMMANDS.md` | devos 操作命令定義 | 人類 | 工作流演化時 |
| `STATE.md` (v0.5) | step 級即時儀表板(當前 step / 上一步 / 下一步 / blockers) | Claude(每個 step 結尾覆寫) | 每個 step |
| `ROADMAP.md` | 全部模組清單 + 模組級進度 | 人類 + Claude | 每完成一個模組 |
| `NOW.md` | 指向「現在該做的下一個任務」 | Claude(完成後更新) | 每完成一個模組 |
| `DECISIONS.md` | 重大架構決定的記錄 | 人類 | 有新決策時 |
| `PHASE_PLAN.md` | Phase 切割與 wave 分批策略 | 人類 | Phase 啟動時 |
| `specs/<模組ID>/SPEC.md` | 該模組的完整規格 | 人類 + AI | 動工前寫,動工後回填 |
| `specs/<模組ID>/PROMPT.md` | 給 Claude Code 的執行指令 | 人類 + AI | 動工前寫 |
| `specs/<模組ID>/ACCEPTANCE.md` | 驗收標準、測試與證據 | 人類 + AI | 動工前寫,完成時補證據 |
| `specs/<模組ID>/STATUS.md` | 進度筆記 + 完成狀態 | 開發中持續更新 | 開發中 |
| `specs/<模組ID>/STEP_LOG.md` (v0.5) | 該模組所有 step 完成 packet append-only 歷史 | Claude(Step Complete / Handoff 模式 append) | 每個 state-machine 轉換 |
| `specs/<模組ID>/IMPLEMENTATION_FEEDBACK.md` | 實作中的偏離與發現 | Claude Code(完成時產出) | 模組完成時 |
| `templates/` | 範本,新模組從這裡複製 | 一次性 | 偶爾 |
| `tools/devos-doctor.ps1` | 基礎一致性檢查 | script | 需要檢查時 |
| `tools/devos-status.ps1` | 進度儀表板(讀 STATE.md + ROADMAP.md 印一頁摘要) | script | 想看現在開到哪 |

---

## 狀態真相分工

`ROADMAP.md` 是模組級進度真相,但不是唯一狀態文件。各檔案分工如下:

- `STATE.md` (v0.5):回答「現在第幾步、上一步、下一步、blockers」(step 級)
- `ROADMAP.md`:回答「哪些模組完成了」(模組級)
- `STATUS.md`:回答「這個模組怎麼完成的、收尾 prompt 是否跑完」(模組過程)
- `STEP_LOG.md` (v0.5):回答「這個模組所有 step 的完整 packet 歷史」(append-only)
- `ACCEPTANCE.md`:回答「怎麼驗收、證據在哪裡」
- `NOW.md`:回答「下一個該做哪個模組」

模組完成時,ROADMAP / STATUS / ACCEPTANCE / NOW 四份要同步。STATE.md 每個 step 都會被 AI 覆寫,STEP_LOG.md append。

---

## Git 流程預設

預設使用 `.dev-os/config.yml` 的 `main-direct`:

- 單人或非工程師使用者直接在 `main` 開發
- 每個模組小步 commit
- 模組完整收尾後 push `main`
- 不要求 PR

PR 只作為進階模式,適用於多人協作、多個 AI session 平行改 code、或 schema / 權限 / 金流 / 核心架構等高風險改動。

---

## 模組命名規則

模組 ID 對應到 `MODULE_PATH.md` 裡的編號。

格式範例:`<引擎代號>.<子模組編號>-<簡短英文名>`

例:
- `M1.1-skill-graph-schema`
- `C3-mission-loop`(合併 SPEC 涵蓋 C3.1 + C3.2)
- `S2.1-whisper-sampling`

具體格式按專案需求調整,但要求:
- 全 repo 一致
- 對應到 ROADMAP 上看得出來
- 不超過 50 字

---

## SPEC 寫作的 JIT 原則

**不要一次把所有模組的 SPEC 寫完**。

- 寫太早會跟實作脫節
- 寫太多沒做的 SPEC 會給你心理壓力
- 開發中發現的事實會讓提前寫的 SPEC 過時

**JIT 原則**:每完成一個模組,在動下一個模組前,花時間把那個模組的 SPEC 寫好。永遠只有「**正在做的 + 下一個**」兩份完整 SPEC。

模組可依風險使用不同規格強度:
- Lite:低風險、一天內、可逆小改,用 `MINI_SPEC_TEMPLATE.md`
- Standard:一般模組,用 SPEC 四件套
- Strict:schema、狀態機、跨模組 API、核心商業邏輯,用 SPEC 四件套並檢查 ADR 與 phase demo 影響

---

## 跟 Claude Code 互動的最佳實踐

### Claude Code 啟動對話時的標準開場

```
請先讀:
1. .dev-os/config.yml(命令、git policy、工作流模式)
2. .dev-os/README.md(系統使用方式)
3. .dev-os/NOW.md(現在該做什麼)
4. .dev-os/DECISIONS.md(已對焦的重大決定)

然後跟我確認你理解今天要做的事。
```

### 啟動模組實作

```
請依 .dev-os/specs/<模組ID>/PROMPT.md 執行
```

### 三個收尾 prompt(模組完成時的強制收尾)

詳見 `PROMPT_LIBRARY.md` 第 4 類。三個 prompt 順序不可顛倒,任何 Standard / Strict 模組完成後都必須跑。

### Design Sync

三個收尾 prompt 完成後,依 `.dev-os/config.yml` 的 `project.conversation_layout` 判斷:

- `ide-only`(預設):在同一個 IDE thread 請 coding agent 讀 `IMPLEMENTATION_FEEDBACK.md`,判斷是否需要更新 `DECISIONS.md` / `PHASE_PLAN.md` / `NOW.md`。
- `split`:把 Design Deltas 表格貼到 Web AI 設計對話,必要時再貼完整 `IMPLEMENTATION_FEEDBACK.md`。

---

## 上層文件的關係

這個 `.dev-os/` 不取代以下文件,而是引用它們:

- `docs/HIGH_LEVEL_DESIGN.md` — WHAT 設計藍圖
- `docs/MODULE_PATH.md` — HOW 開發路徑
- `docs/data-warehouse-guide.md` — 結構化儲存規範(若有,可由 `docs/DATA_WAREHOUSE_GUIDE_TEMPLATE.md` 建立)

當 SPEC.md 跟上層文件衝突時,**以上層文件為準**(因為它代表已對焦的高層共識)。如果發現衝突需要改上層文件,在 DECISIONS.md 記錄變更原因。

---

## 不要做的事

- ❌ 不要直接修改 ROADMAP.md 的狀態欄而不更新 STATUS.md(會失去脈絡)
- ❌ 不要把 ROADMAP、STATUS、ACCEPTANCE、NOW 更新到彼此矛盾
- ❌ 不要在沒有 SPEC 的情況下開始寫某個模組的程式
- ❌ 不要把 SPEC 當成永遠不變的合約(實作中發現問題,改 SPEC 是正常的,但要記錄變更)
- ❌ 不要一次寫所有模組的 SPEC(JIT 原則)
- ❌ 不要在 Claude Code 沒讀過 NOW.md 跟 DECISIONS.md 的情況下開始寫程式
- ❌ 不要跳過三個收尾 prompt(這是最容易偷懶但代價最大的事)
- ❌ 不要忘記執行 Design Sync
