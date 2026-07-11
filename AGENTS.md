# AGENTS.md

本專案使用 **dev-os 工作流 (v0.5.4)**。

這份文件是 AI 助手的入口規則 — 給 AI 看的「快速操作手冊」。**完整規格與 state machine 細節在 `.dev-os/WORKFLOW_PROTOCOL.md`** — 需要時查那邊,不要在這裡重複。

不綁定特定 AI 工具(網頁設計對話 / IDE coding agent 都可用)。請依「能否讀寫 repo」判斷下一步應在哪裡執行。

---

## 回答語言(繁體中文強制)

預設**繁體中文** —— 不只 chat 回覆,**你寫進檔案的所有人類可讀內容也是**:STEP_LOG packet 內容、STATE.md body、NOW.md、handoff prompt 的每段內文、step 標題、option 清單。

保留原樣(不翻譯):程式碼、commit message、檔名 / 路徑、CLI、設定 key、module ID / ADR ID / state ID(S0–S10)、`module_kind` enum、機器解析的結構欄位與標題。**精確的「保留英文」清單見 `.dev-os/WORKFLOW_PROTOCOL.md` 的 Language 段。**

**不要因為讀到的舊 docs / packet 是英文,就跟著用英文** —— 那是過去 step log 與 handoff prompt 一直英文的根因。新產出一律繁中。

---

## v0.5.4 核心規則(讀其他段前先記住)

dev-os 用「三模式輸出」控制 chat 體積:

- **Tick(預設)**:小步驟完成 → 5-10 行精簡輸出 + 覆寫 STATE.md。**不印完整 prompt**
- **Step Complete**:state-machine 轉換 → 10-15 行 + STATE.md + STEP_LOG.md append。**仍不印完整 prompt**
- **Handoff**:Thread Health Verdict = Should switch → 才印完整 Copy-paste Next Prompt

使用者只輸入「繼續」/ `next` / `continue` → AI 用判斷直接做下一步,**不要每次都印完整 prompt**。

**v0.5.2 新增的 module 開設規則(必讀):**

- 每個 module 必須標 `module_kind`:`implementation` / `docs-only-spec` / `governance-decision`
- `docs-only-spec` 最多 2 個 step;`governance-decision` 不開 module,直接寫 `DECISIONS.md`
- S1 升 S2 前必答「完成後產品多了哪個能力?」答不出來 → 不開 module
- 連續 2 個 `docs-only-spec` 完成後,第三個必須是 `implementation` 或 roadmap reset
- S9 + 沒指定下一個 module 時,「繼續」**不可自動選**(包括 park / lowest-risk default),必須列選項等使用者明說

完整模式 spec、state machine、STATE.md/STEP_LOG.md 格式、Thread Health 演算法、`module_kind` 三種定義與 gate 規則,**全部在 `.dev-os/WORKFLOW_PROTOCOL.md`**。

---

## 觸發條件

當使用者提到以下語句時,你必須依本檔 + `.dev-os/WORKFLOW_PROTOCOL.md` 判斷,不可憑印象回答:

- 依照工作流 / 依照 dev-os / workflow 下一步
- 下一步是什麼 / 現在該做什麼 / 接下來怎麼做
- 給我下一步 / next step
- 繼續 / next / continue / go(這些觸發 Tick 模式繼續推進,見下方「繼續指令」)

---

## Pre-dev Router(先檢查)

在讀 `.dev-os/*` 之前,先判斷使用者是否還在 pre-development 階段或正在做重大 pivot。

通常 pre-dev 信號:

- 模糊產品想法、PRD 草稿或策略討論
- 尚未有 `docs/PRODUCT_BRIEF.md` / `docs/PRD.md` / `docs/HIGH_LEVEL_DESIGN.md` / `docs/MODULE_PATH.md`
- 尚未有 `.dev-os/ROADMAP.md` / `.dev-os/PHASE_PLAN.md`
- 使用者明說「我有一個想法」「我想做一個新功能」(且尚未有對應 SPEC)
- 提到 `predev/`、`PRE_DEV_NAVIGATOR`、P0-P9/PX、readiness gate
- 宣告重大 pivot(目標使用者改變、核心問題改變、商業模式改變、MVP 範圍大幅改變)

這些情境下,**不要進入 dev-os S0 初始化或 module SPEC 工作**。改用 pre-dev workflow:

1. 讀 `predev/AGENTS.md`
2. 讀 `predev/PRE_DEV_NAVIGATOR.md`
3. 讀 `predev/PREDEV_CONTEXT.md`(若存在)

完整 `template/` 預設包含 `predev/`。如果目標專案缺少 `predev/`,請先從 `dev-os-starter/template/predev/` 複製過去,或要求使用者指向 starter 的絕對路徑。

只有 pre-dev 通過 P8 Readiness Gate、P9 bootstrap 已合入 docs/ 與 .dev-os/ 後,才回到下面 dev-os 判斷。

---

## 必讀文件

回答任何「下一步」前,必須先讀:

1. `.dev-os/WORKFLOW_PROTOCOL.md` — 真相;state machine、模式 spec、格式定義都在這
2. `.dev-os/config.yml` — 注意 `project.conversation_layout` 與 `git.*`
3. `.dev-os/STATE.md` — **永遠先看此檔**,即時知道當前 step / 上一步 / 下一步 / blockers
4. `.dev-os/NOW.md` — 下一個模組入口(模組級)
5. `.dev-os/ROADMAP.md` — 模組級進度
6. `.dev-os/PHASE_PLAN.md` — phase / wave 策略
7. `.dev-os/VISION.md` — 產品北極星(方向真相);讓你知道現在在 big picture 哪裡、為什麼做這個。若不存在則略過

如果有 active module,還必須讀:

8. `.dev-os/specs/<module-id>/STATUS.md`
9. `.dev-os/specs/<module-id>/SPEC.md`
10. `.dev-os/specs/<module-id>/PROMPT.md`
11. `.dev-os/specs/<module-id>/ACCEPTANCE.md`
12. `.dev-os/specs/<module-id>/STEP_LOG.md`(近 5 entries;舊的在 STEP_LOG_archive.md,**預設不讀**)
13. `.dev-os/specs/<module-id>/IMPLEMENTATION_FEEDBACK.md`(若已存在)

如果缺少必要文件:不要猜。明確說缺哪個,並給出補文件的下一步 prompt。

例外:如果 `.dev-os/WORKFLOW_PROTOCOL.md` 缺失,先用本檔作為暫時 protocol,並把「建立 WORKFLOW_PROTOCOL.md」列為待補事項。

---

## 三模式輸出(完整 spec 見 WORKFLOW_PROTOCOL.md)

### Tick 模式(預設)

```text
✅ [這一步做了什麼,1-3 個 bullet]

🚧 Blockers (若有,沒有就省略整段)
- [blocker]

👉 下一步:[一行]
   說「繼續」我直接做。詳見 .dev-os/STATE.md。
```

檔案動作:覆寫 `.dev-os/STATE.md`(YAML frontmatter + markdown body)。若 `git.auto_commit_per_step: true` 且有檔案變動 → 自動 commit。

### Step Complete 模式(state-machine 轉換)

```text
✅ [SX → SY,一行描述]

📊 重點
- [3-5 bullets]

📝 已更新
- .dev-os/STATE.md
- .dev-os/specs/<id>/STEP_LOG.md (+1 entry)
- [其他檔案]
- Commit: [hash 或 pending]

👉 下一步:[一行]
   說「繼續」我直接做。完整 packet 見 STEP_LOG.md。
```

檔案動作:Tick 全部事 + 把完整 11 項 packet append 到 STEP_LOG.md(template 在 `.dev-os/templates/STEP_LOG.template.md`)。

### Handoff 模式(換對話)

Step Complete + 額外:

```text
⚠️ 建議換對話
理由:[Thread Health 觸發條件]

下次貼這段到新對話:
```text
[完整 9-segment self-bootstrapping prompt]
```
```

額外:把同份 prompt 寫入 `.dev-os/HANDOFF_PROMPT.md`(覆寫)。

### Self-Bootstrapping Prompt 9 段(只用在 Handoff)

完整定義見 WORKFLOW_PROTOCOL.md「Self-Bootstrapping Prompt Contract」。簡要:

1. Role / workflow version
2. Workflow constraints
3. Current state(從 STATE.md)
4. Before answering, read these files first(**第一筆務必 STATE.md**)
5. Missing-file behavior
6. Task
7. Required output
8. Required final Step Completion Packet(只在 step boundary)
9. Self-enforcement clause

---

## 「繼續」指令

使用者只輸入 `繼續` / `next` / `continue` / `go` / `next step`:

1. AI 讀 `.dev-os/STATE.md` 確認下一步
2. 若上一步有未解 blockers → **不要硬上**,改回:「上一步 blockers 未解:[列]。請先處理。」
3. 否則直接做下一步 → 依完成情境輸出 Tick / Step Complete / Handoff
4. 若 STATE.md 不存在 → 要求使用者提供完整 prompt 或先建立 STATE.md
5. 若下一步影響超出 module scope(改 schema、刪檔)→ 先一行 confirm 再做

---

## Thread Health Check(門檻見 WORKFLOW_PROTOCOL.md)

每個 Step Complete / Handoff 輸出必須包含。逐項給數字 / Yes / No,不要寫「視情況」。

任一成立 → Verdict = Should switch(必須升 Handoff 模式):
- 訊息數 > 50
- 失敗 attempts ≥ 3
- AI 開始重複自己 / 忘記既有限制 = Yes
- 下一個任務真的換認知模式 = Yes(implement↔design 且 `split` layout、或進/出 Debug Protocol)
- 整個 module 完成(進 S9)或 phase 收尾 = Yes

**v0.5.3:** 同一 module 內的中間 state 轉換(S3→S8,含 health check / SPEC backfill / status sync / Design Sync)**不算**換對話理由,預設留在同一對話。只有「整個 module 完成」或「真的換認知模式」才換。完整理由見 `.dev-os/WORKFLOW_PROTOCOL.md` Verdict 規則。

---

## 對話空間判斷

| 適用 | 場景 |
|------|------|
| **同對話** | 詢問工作流下一步、回顧目前狀態、判斷缺什麼、小範圍文件修正 |
| **IDE / coding agent** | 讀寫 repo、跑命令、改檔、跑測試、健康檢查、SPEC 回填、狀態同步 |
| **設計對話** | 寫新 SPEC、產品/架構決策、分析 IMPLEMENTATION_FEEDBACK、判斷 ADR、決定下一模組 |
| **新一次性對話** | phase retrospective、複雜問題診斷、不想污染主對話的臨時討論 |
| **新設計對話** | 跨 phase、原設計對話太長、設計脈絡混亂 |

判斷原則:讀寫 repo / 跑命令 → IDE;純設計判斷 → 設計對話。

---

## 禁止行為

當使用者問「依照工作流下一步」時,禁止:

- 只描述下一步,不依模式輸出(Tick / Step Complete / Handoff)
- 不讀 `.dev-os/WORKFLOW_PROTOCOL.md` 與 `.dev-os/STATE.md`
- 憑一般軟體開發經驗猜流程
- 把 PR 當成預設流程(除非 `config.yml` 明確 `policy: pr-required`)
- 忽略 STATE.md 的 blockers
- 忽略 acceptance 是否真的有證據
- 沒判斷該在哪個對話空間執行

---

## 常用 Prompt 範本

完整 prompt 集(啟動模組實作 / 健康檢查 / SPEC 回填 / 狀態同步 / Design Sync 等)在 `PROMPT_LIBRARY.md`(若 starter 在身邊)或專案 `docs/PROMPT_LIBRARY.md`(若有複製)。

需要時去那邊查 — **不要在這份 AGENTS.md 重複維護**。

---

## 本專案補充（hsuan-resume）

- 全站繁體中文；主角名字「瑄瑄／張庭瑄」——「瑄」（U+7444），**絕不寫成「瑋」**
- Next.js 16.2.10 breaking changes 多：寫碼前先讀 `node_modules/next/dist/docs/` 對應章節；next/image **不會自動加 basePath**，靜態資源一律用 `src/lib/site.ts` 的 `asset()`
- 隱私鐵則與發布 gate：README「設計禁區」＋ `.dev-os/DECISIONS.md`（ADR-001／ADR-002）；**push 需使用者明說**
