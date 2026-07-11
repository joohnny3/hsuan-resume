# predev/AGENTS.md — Pre-development Runtime Rules

本目錄用於 dev-os-starter 的 **pre-development workflow**。

這份文件是 AI 助手（IDE coding agent）在執行 pre-development 任務時的入口規則。它不是 `predev/PRE_DEV_NAVIGATOR.md` 的替代品；它是讓 AI 在進入長版 state machine 前先建立正確 runtime contract 的短入口。

不綁定特定 AI 工具。實務上你會在 Claude Code / Cursor / 其他具備 repo 讀寫能力的 coding agent 使用。

---

## 回答語言

預設使用**繁體中文**回答。

保留原文（不要翻譯）：

- 程式碼、檔名、CLI 指令、commit message、設定 key
- 技術術語與英文專有名詞（P0-P9、PX、PRD、HLD、Module Path、State Completion Packet、Self-Bootstrapping Prompt、Thread Health Check 等）
- 既有英文 docs / artifacts 的直接引用
- `PRE_DEV_NAVIGATOR.md` / `AGENTS.md` 自己的英文 section 名稱

不要因為讀到的 navigator 或既有 docs 是英文 / 中英混合，就把整個回答切換成英文。

---

## 觸發條件

當使用者提到以下語句時：

- pre-dev
- pre-development
- PRE_DEV_NAVIGATOR
- 我有一個想法
- 我想做一個新功能（且尚未產出 PRD / HLD / MODULE_PATH）
- 下一步（且專案還沒進入 `.dev-os` workflow）
- 現在該做什麼（且專案還沒進入 `.dev-os` workflow）
- P0 / P1 / P2 / P3 / P4 / P5 / P6 / P7 / P8 / P9 / PX
- readiness gate
- bootstrap 前
- 是否要進 dev-os
- 重大 pivot

你必須依照本文件與 `predev/PRE_DEV_NAVIGATOR.md` 判斷，不可以憑印象回答。

---

## 必讀文件

回答任何 pre-dev 問題前，必須先讀：

1. `predev/PRE_DEV_NAVIGATOR.md`
2. 目前工作目錄下的 `predev/PREDEV_CONTEXT.md`（若存在）
3. 使用者指定的上一階段 artifact
4. 如果是 P8/P9：所有 readiness / bootstrap 相關 artifacts（PRODUCT_BRIEF、PRD、HIGH_LEVEL_DESIGN、MODULE_PATH、RISK_REGISTER 等）

如果缺少必要文件，**不要猜**。請：
- 列出 Missing Required Artifacts
- 仍可基於現有內容做 provisional 處理
- verdict 必須標 Conditional / Not ready / Needs more input

---

## Greenfield vs Brownfield：第一條判斷

任何 pre-dev 工作開始前，AI 必須先回答：

```text
這是 greenfield（全新想法、沒有既有 codebase）？
還是 brownfield（在既有專案發想新功能）？
```

判斷依據：

```text
Greenfield signals:
- 沒有既有 repo
- 不需要讀任何既有檔案
- 純粹策略 / 概念討論
- 使用者明說「我想做一個新產品」

Brownfield signals（如出現任一項，視為 brownfield）:
- 使用者提到既有專案、既有 codebase、既有 repo
- 使用者問「這跟既有 X 怎麼整合」
- 既有 .dev-os/ 已存在
- 既有 docs/HIGH_LEVEL_DESIGN.md / MODULE_PATH.md 已存在
- 任何「pre-dev 結論需要對齊既有現實」的暗示
```

**Brownfield 預設使用 IDE，不要建議切回 Web AI。**

---

## Artifact 寫入位置

Pre-dev artifacts 寫到：

```text
predev/                       # 主要位置
  00_NOTES.md                 # 可選：使用者原始輸入
  01_IDEA_SNAPSHOT.md         # P0
  02_IDEA_CANVAS.md           # P1
  03_PROBLEM_USER_FRAME.md    # P2
  03_RISK_REGISTER.md         # P3
  04_SOLUTION_STRATEGY.md     # P4
  05_MVP_SCOPE_CONTRACT.md    # P5
  06_PRODUCT_BRIEF.md         # P6（P9 後移到 docs/）
  06_PRD.md                   # P6（P9 後移到 docs/）
  07_HIGH_LEVEL_DESIGN.md     # P7（P9 後 merge 進 docs/）
  07_MODULE_PATH.md           # P7（P9 後 merge 進 docs/）
  08_READINESS_GATE_REPORT.md # P8
  PX_*.md                     # PX exits
  PREDEV_CONTEXT.md           # 跨對話狀態
```

**禁止位置**：

```text
.dev-os/        # 只有 P9 通過後才動 .dev-os
docs/           # P6/P7 在 predev/ 寫；P9 才 copy/merge 到 docs/
src/, app/...   # pre-dev 不寫程式
```

P9 通過後，由人類或 AI 在 explicit handoff 步驟把 predev artifacts copy/merge 到 docs/ 與 .dev-os/。Brownfield 場景必須 merge 不要覆蓋既有檔案。

---

## 禁止行為

當使用者問 pre-dev 相關問題時，禁止：

- 只說「下一步是 P8」就停
- 只說「建議開新對話」就停
- 只產出 artifact 後結束（artifact 完成不等於 state 完成）
- 產生沒有 "Before answering, read these files first" 的下一步 prompt
- 產生不能獨立開新對話 / 新環境的 prompt
- 在 P8 通過前要求初始化 `.dev-os`
- 在 P8 通過前在 `.dev-os/` 下寫任何檔案
- 寫 production code
- 寫單一 module SPEC
- 把 assumption 寫成 fact
- 因為文件齊全就自動建議進 dev-os（必須通過 P8 嚴格判斷）
- Brownfield 場景直接覆蓋既有 `docs/HIGH_LEVEL_DESIGN.md` 或 `docs/MODULE_PATH.md`

---

## 回答任何 state 完成結果時的硬性規則

每個 P-state / PX 完成時，回覆最後必須輸出完整 `State Completion Packet`（12 項，定義在 PRE_DEV_NAVIGATOR.md Section 4B）：

1. Completed State
2. Completion Evidence
3. Artifact Summary
4. Recommended Next State / Exit Path
5. Why This Next State
6. Next Step Execution Location
7. Files / Artifacts Reference List
8. **Copy-paste Next Prompt（必須是 self-bootstrapping prompt — 見下節）**
9. **Thread Health Check + Context Handoff Decision（必須給具體數字與 Yes/No，不要寫「視情況」— 見下節）**
10. Execution Environment Decision（Web AI / IDE / Switch needed）
11. New Conversation Startup Pack（不需要時寫 Not needed because ...）
12. Updated PREDEV_CONTEXT.md

如果只輸出 artifact 沒輸出 State Completion Packet，視為回答不合格並自行補齊。

---

## Thread Health Check 規範

State Completion Packet 第 9 節必須包含具體 Thread Health Check，不要寫「視情況」。

逐項判斷：

```text
- 預估對話訊息數: [N]
  - <30 = Healthy
  - 30-60 = 中等
  - 60-100 = 偏長
  - >100 = 強烈建議換 (Should switch)
- 已放棄方向 / 失敗 attempts: [N]
  - 0-2 = OK
  - >=3 = 污染風險高 (Should consider switch)
- AI 開始重複自己 / 忘記既有限制: [Yes / No]
- 下一個任務型態明顯不同（例如 P5 剛完成要切 P6 文件產出）: [Yes / No]
- 剛完成核心 artifact 固定（IDEA_CANVAS / PROBLEM_USER_FRAME / MVP_SCOPE_CONTRACT / PRD / HLD+MODULE_PATH / Readiness Gate Report）: [Yes / No]

Thread Health Verdict: [Healthy / Approaching limit / Should switch]
```

決策規則：

- Verdict = `Should switch` → Context Handoff Decision 必須是 New 系列
- Verdict = `Approaching limit` → 建議下一個小步驟後切換
- Verdict = `Healthy` → 可繼續同一對話

如果你不知道對話訊息數的精確值，估算一個範圍即可（例如 "約 40-50 則"）。寫「視情況」「不確定」「依需求」視為不合格。

---

## Self-Bootstrapping Next Prompt 規範

`Copy-paste Next Prompt`（第 8 節）必須是 **self-bootstrapping prompt**。

定義：把它複製到任何乾淨對話 / IDE thread，AI 都能在不需要其他附加說明的情況下知道要讀什麼、做什麼、輸出什麼。

必備 9 段（詳見 PRE_DEV_NAVIGATOR.md Section 4D）：

```text
1. Role / workflow version
2. Workflow constraints
3. Current state（已完成 + 現在執行）
4. Before answering, read these files first（明確路徑 + 用途）
5. Missing-file behavior
6. Task
7. Required output
8. Required final State Completion Packet
9. Self-enforcement clause
```

如果你產出的 `Copy-paste Next Prompt` 缺少「Before answering, read these files first」清單，**視為不合格**，必須自行修正後再輸出。

不要把 reading list 放在 packet 第 7 節就以為夠了——使用者通常只複製第 8 節，第 7 節會被丟掉。

---

## Execution Environment Decision

每次回答最後必須判斷：

```text
Current environment: [Web AI / IDE]
Recommended for next state: [Web AI / IDE]
Switch needed?: [Yes / No / Optional]
Brownfield triggers detected?: [Yes / No]
```

如果 brownfield triggers 出現（PRE_DEV_NAVIGATOR.md Section 4C.2），**必須主動建議切到 IDE**，並提供切換 prompt（Section 4C.3）。

P8 與 P9 一律要求 IDE。

---

## 回答「下一步」的固定格式

當使用者問 pre-dev 下一步時，請使用以下格式：

````md
### 依照 Pre-dev Navigator，下一步是

**當前狀態**：
[P-state ID + 名稱]

**Greenfield / Brownfield**：
[判斷]

**目前執行環境**：
[Web AI / IDE]

**判斷依據**：
- `[檔案路徑或輸入]`：[關鍵事實]
- `[檔案路徑或輸入]`：[缺口或風險]

**目前最大風險**：
[產品 / 使用者 / 商業 / 技術 / scope / validation / dev-os suitability]

**現在不該做什麼**：
- [...]

**建議出口**：
[繼續探索 / 先驗證 / prototype only / park / kill / dev-os bootstrap]

**下一步執行位置**：
[同一對話 / 新設計對話 / 一次性對話 / 切換 IDE / IDE coding agent]

**請直接複製這段 prompt 執行**：

```text
[完整 self-bootstrapping prompt]
```

**Execution Environment Decision**：
- Current: [...]
- Next: [...]
- Switch needed?: [Yes / No / Optional]

**Context Handoff Check**：
- 建議：[...]
- 理由：[...]
- 新對話 / 新環境要附上：[...]
- 不要附：[...]
````

然後依任務性質決定是否還要附完整 State Completion Packet（12 項）。如果上一輪剛完成某個 state，下一輪的「下一步」回答必須附完整 packet。

---

## 與 dev-os runtime 的邊界

| 情境 | 入口文件 | 必讀 | 不要讀 |
|---|---|---|---|
| 還沒有 docs/PRODUCT_BRIEF / PRD / HLD / MODULE_PATH | `predev/AGENTS.md`（本文件） | `predev/PRE_DEV_NAVIGATOR.md`、`predev/PREDEV_CONTEXT.md` | `.dev-os/WORKFLOW_PROTOCOL.md` |
| 已通過 P8 且 P9 已產出 bootstrap bundle | root `AGENTS.md` | `.dev-os/WORKFLOW_PROTOCOL.md`、`.dev-os/config.yml`、`.dev-os/NOW.md` 等 | `predev/PRE_DEV_NAVIGATOR.md`（除非重大 pivot） |
| 已進入 .dev-os 但發生重大 pivot | 短暫回到 `predev/AGENTS.md` | `predev/PRE_DEV_NAVIGATOR.md`、既有 `.dev-os/*`、`docs/*` | （暫不執行 `.dev-os/WORKFLOW_PROTOCOL.md` 的下一步判斷） |

---

## 補救：AI 已經只說「已完成」時

如果 AI 已經產出 artifact，但沒有提供完整 State Completion Packet，使用以下補救 prompt：

```text
你的上一個回答只完成 artifact，不算完成 PRE_DEV_NAVIGATOR.md v0.4 的 state。

請依 v0.4 補做完整 State Completion Packet（12 項）。

請基於你剛完成的內容，輸出：
1. Completed State
2. Completion Evidence
3. Artifact Summary
4. Recommended Next State / Exit Path
5. Why This Next State
6. Next Step Execution Location
7. Files / Artifacts Reference List
8. Copy-paste Next Prompt（self-bootstrapping，開頭含 "Before answering, read these files first"）
9. Thread Health Check + Context Handoff Decision（必須給具體數字 / Yes/No）：
   - 預估對話訊息數 [N] → [Healthy / 中等 / 偏長 / 強烈建議換]
   - 已放棄方向 / 失敗 attempts [N]
   - AI 開始重複自己 / 忘記限制 [Yes/No]
   - 下一個任務型態明顯不同 [Yes/No]
   - 剛完成核心 artifact 固定 [Yes/No]
   - Thread Health Verdict
   - Context Handoff Decision（必須對應 Verdict）
10. Execution Environment Decision
11. New Conversation Startup Pack（不需要時寫 Not needed because ...）
12. Updated PREDEV_CONTEXT.md

不要寫「視情況」「context 長度視情況」等抽象描述。
不要重寫剛才的 artifact。只補 workflow handoff。
```

---

## 速查清單

```text
[ ] 回答用繁體中文（程式碼/檔名/技術術語保留原文）
[ ] 先讀 predev/PRE_DEV_NAVIGATOR.md
[ ] 判斷 Greenfield / Brownfield
[ ] 判斷目前 P-state
[ ] 判斷目前執行環境
[ ] 識別 brownfield triggers（必要時建議切 IDE）
[ ] 產出 artifact 到 predev/ 路徑
[ ] 不寫 production code
[ ] 不動 .dev-os/（除非 P9 通過）
[ ] 輸出完整 State Completion Packet（12 項）
[ ] 第 8 節 prompt 是 self-bootstrapping（含 Before answering reading list）
[ ] 第 9 節 Thread Health 給具體數字 + Yes/No + Verdict（不要寫「視情況」）
[ ] 第 10 節包含 Execution Environment Decision
[ ] 第 12 節更新 PREDEV_CONTEXT.md
```

任一項缺失，自動視為不合格並補齊。
