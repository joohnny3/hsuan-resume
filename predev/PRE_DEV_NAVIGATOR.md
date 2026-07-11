# PRE_DEV_NAVIGATOR.md — dev-os Pre-development Navigator

> 一份給 **dev-os-starter 使用者** 的 pre-development 導航文件。
> 使用時機：你還沒有進入 `.dev-os` 開發工作流，手上只有模糊想法、產品方向、PRD 草稿，或還不確定是否值得開發。
> 目標：把「模糊想法」導航到「繼續探索 / 先驗證 / 不做 / 輕量 prototype / dev-os bootstrap」。
> Version: 0.4.1

---

## 0. 文件定位

`PRE_DEV_NAVIGATOR.md` 是 dev-os-starter 的 **pre-development layer**，不是 `.dev-os/WORKFLOW_PROTOCOL.md` 的替代品。

```text
模糊想法 / 產品探索 / 策略收斂
        ↓
PRE_DEV_NAVIGATOR.md（本文件）
        ↓
Product Brief / PRD / MVP Scope / High-level Design / Module Path
        ↓
dev-os Bootstrap Bundle
        ↓
專案 repo + .dev-os S0-S10 工程工作流
```

### 0.1 它負責什麼

```text
我現在在 pre-development 的哪個 state？
我下一個 prompt 應該下什麼？
我現在不該做什麼？
這個想法是否值得繼續？
是否應該先驗證、先 prototype、暫停、砍掉，還是進入 dev-os？
如果要進入 dev-os，應該輸出哪些初始化文件？
我現在該在 Web AI 還是 IDE 進行？什麼時候要切換？
```

### 0.2 它不負責什麼

```text
寫正式程式碼
修改 repo
執行測試
管理 active module
撰寫單一 module SPEC
做健康檢查 / SPEC 回填 / 狀態同步
替代 .dev-os/WORKFLOW_PROTOCOL.md
```

進入 repo 工程開發後，請回到既有 `.dev-os` 工作流。

---

## 1. 放置位置與使用方式

在 dev-os-starter 原始專案中,predev 是 `template/` 安裝包的一部分：

```text
dev-os-starter/
  template/
    predev/
      AGENTS.md                        # IDE runtime 入口
      PRE_DEV_NAVIGATOR.md             # 本文件
      PREDEV_CONTEXT.template.md
```

完整採用時,`template/predev/` 會複製到目標專案的 `predev/`。P8 Readiness Gate 通過前只跑 `predev/`,不要填寫或啟用 `.dev-os/`。

### 1.1 兩種主要使用情境

Pre-dev 有兩種主要使用方式，根據是否需要讀取既有專案檔案決定：

#### 1.1A Greenfield 模式（Web AI）

適用情境：

```text
完全新的想法
不依賴任何既有 codebase
不需要讀任何專案檔案
只是純粹的產品策略討論
P0-P2 階段都還是純概念探索
```

操作流程：

```text
1. 打開 ChatGPT / Claude.ai / 其他長上下文 Web AI
2. 貼上整份 PRE_DEV_NAVIGATOR.md
3. 貼上你的模糊想法、產品筆記、訪談摘要或 PRD 草稿
4. 執行「Pre-dev Router Prompt」（Section 3）
5. AI 判斷你目前在 P0 / P1 / ... / P9 / PX
6. AI 給你下一段可直接複製的 prompt
7. 一路推進，直到：
   - 觸發 brownfield 切換信號（Section 4C.2）→ 切到 IDE
   - PX：暫停 / 先驗證 / 不做 / prototype only
   - P9：輸出 dev-os Bootstrap Bundle
8. 把 Bootstrap Bundle 放進新專案 repo
9. 回到既有 dev-os S0-S10 workflow
```

#### 1.1B Brownfield 模式（IDE，預設推薦）

適用情境：

```text
要在既有專案中發想新功能
需要讀既有 code / schema / docs 才能判斷
需要評估與既有系統的相容性
已經有 .dev-os 但想做重大 pivot
任何「pre-dev 結論需要對齊既有現實」的情境
```

實務上，大多數使用者很快就會進入 brownfield 模式。**只要你需要看任何既有檔案，就應該在 IDE 跑，不要在 Web AI 跑。**

操作流程：

```text
1. 在 IDE（Claude Code / Cursor 等具備 repo 讀寫能力的 coding agent）打開既有專案
2. 告訴 AI：
   "我要在這個專案發想新功能。請先讀
    predev/AGENTS.md
    predev/PRE_DEV_NAVIGATOR.md
    （如果目標專案還沒安裝 template,可暫時指向 dev-os-starter 的絕對路徑，例如
     C:/gh/dev-os-starter/template/predev/AGENTS.md
     C:/gh/dev-os-starter/template/predev/PRE_DEV_NAVIGATOR.md）"
3. AI 讀 navigator + AGENTS.md + 你指定的既有專案檔案
4. 在既有專案的 `predev/` 或 `docs/predev/` 寫 pre-dev artifacts
5. 一路推進，直到 P8 通過
6. P9 輸出 bootstrap bundle，接到既有 `.dev-os/`
```

Brownfield artifact 寫入位置原則：

```text
寫到既有專案的：
  predev/ 或 docs/predev/   ← pre-dev artifacts 放這裡
  docs/PRODUCT_BRIEF.md     ← P6 產出，bootstrap 後保留
  docs/PRD.md
  docs/HIGH_LEVEL_DESIGN.md ← P7 產出，若既有專案已有，視為 pivot：要 merge 不要覆蓋
  docs/MODULE_PATH.md

不要寫到：
  .dev-os/                  ← P9 通過後才動 .dev-os
```

### 1.2 什麼時候使用

使用本文件，如果你符合以下任一情境：

```text
我只有一段很長、很亂的想法
我不確定這是不是產品
我不確定使用者是誰
我不知道要先問 AI 什麼
我不確定要先驗證、先做 prototype，還是直接開發
我已有 PRD 草稿，但不知道是否足夠進入 dev-os
我已有產品方向，但還沒有 HIGH_LEVEL_DESIGN / MODULE_PATH / ROADMAP
我正在考慮重大 pivot，需要回到產品探索層
```

### 1.3 什麼時候不要使用

不要使用本文件，如果：

```text
repo 已初始化 .dev-os
NOW.md 已指向 active module
你正在執行某個 module 的 SPEC / PROMPT / ACCEPTANCE / STATUS
你只是想知道 dev-os workflow 下一步
你正在做健康檢查、SPEC 回填、狀態同步、Design Sync
```

這些情境請使用 repo 內的：

```text
AGENTS.md
.dev-os/WORKFLOW_PROTOCOL.md
.dev-os/config.yml
.dev-os/NOW.md
.dev-os/ROADMAP.md
.dev-os/PHASE_PLAN.md
```

### 1.4 唯一例外：重大 pivot

如果專案已經進入 `.dev-os`，但產品方向發生重大 pivot，可以暫時回到本文件。

重大 pivot 包含：

```text
目標使用者改變
核心問題改變
商業模式改變
MVP 範圍大幅改變
模組路徑需要重排
原本的 HIGH_LEVEL_DESIGN 不再成立
```

在這種情況下，本文件只用來重新收斂產品方向。完成後，必須回到 dev-os Design Sync / ADR / PHASE_PLAN 更新流程。

---

## 2. 核心原則

### 原則 1：Pre-dev 的任務是降低錯誤開工機率

不要把模糊想法直接丟進工程工作流。Pre-dev 的價值不是讓你更快寫 code，而是避免你太早寫錯東西。

### 原則 2：Navigator 必須允許「不要開發」

不是所有想法都應該進入 dev-os。有效出口包含：

```text
繼續探索
先做使用者訪談
先做 landing page / waitlist
先做 fake-door test
先做 no-code prototype
先做 throwaway prototype
只做輕量小工具
暫停
砍掉
進入 dev-os
```

### 原則 3：文件是資產，對話不是最終資產

對話用來探索，文件用來固定。每個 P-state 都應該產生或更新一個 artifact。

### 原則 4：每一步都要輸出可直接複製的 self-bootstrapping prompt

AI 不能只說「下一步是釐清使用者」。它必須給出可以直接複製到下一個對話的完整 prompt。

而且這個 prompt 必須是 **self-bootstrapping**：本身就包含「Before answering, read these files first」清單，不能依賴使用者額外附帶資訊。詳見 Section 4D。

### 原則 5：不要假裝已經確定

如果資訊不足，標記為：

```text
Assumption
Open Question
Validation Needed
Decision Pending
```

不要把猜測寫成確定的產品決策。

### 原則 6：Pre-dev 不寫 production code

在 P0-P9 期間，除非明確走 `PX Prototype Only`，否則不要開始正式工程實作。

### 原則 7：每個 state 結束都要做 Context Handoff Check

Pre-dev 主要發生在 Web AI / 設計對話中，對話很容易因為大量背景、分支討論與文件貼上而變長。

因此每次完成 P0-P9 或 PX 任一階段時，AI 不只要輸出下一步 prompt，還必須判斷：

```text
是否應該繼續使用同一個對話？
是否應該開新的設計對話？
是否應該開一次性驗證 / review 對話？
如果要開新對話，新對話應該附哪些文件或 artifacts？
哪些舊內容不應該帶過去，以免污染下一階段？
```

這個判斷叫做 `Context Handoff Check`。它是 Pre-dev Navigator 的強制收尾步驟，不是可選建議。

### 原則 8：Artifact 完成不等於 state 完成

AI 完成某個 markdown 文件、修改兩個 docs、或產出一份策略草案，只代表「artifact 完成」。

一個 P-state / PX 真正完成，必須同時完成：

```text
1. 產出 / 更新本 state 的 artifact
2. 判斷 Recommended Next State / Exit Path
3. 輸出下一步執行位置
4. 輸出可直接複製的完整 self-bootstrapping 下一步 prompt
5. 列出下一步需要附上的文件 / artifacts
6. 判斷是否開新對話
7. 若開新對話，輸出 New Conversation Startup Pack
8. 判斷是否切換執行環境（Web AI ↔ IDE）
9. 輸出或更新 PREDEV_CONTEXT.md
```

因此，以下回答一律視為不合格：

```text
已完成 P7 兩份草案。
Context Handoff Check：建議下一步開乾淨的 P8 readiness review context。
應附 A、B、C。
```

它有方向，但沒有可執行的下一步。正確回答必須包含 `State Completion Packet`（Section 4B）。

### 原則 9：Execution Environment Awareness

Pre-dev 不是只在 Web AI 跑。AI 必須在每個 state 結束時主動判斷：

```text
這個 state 適合 Web AI 還是 IDE？
下一個 state 是否需要切換環境？
brownfield triggers 出現了嗎？
切換時 prompt 該怎麼改寫才能在新環境跑？
```

詳見 Section 4C。這是 v0.4 新增的硬性規則。`State Completion Packet` 必須包含 Execution Environment Decision。

### 原則 10：Thread Health 是用數字判斷的，不是用感覺

「要不要開新對話」不是軟描述，是 v0.4.1 起的硬性檢查。

AI 必須在 `State Completion Packet` 第 9 項給出**具體數字與 Yes/No**：

```text
- 預估對話訊息數: [N]（<30 healthy / 30-60 中等 / 60-100 偏長 / >100 強烈建議換）
- 已放棄方向 / 失敗 attempts: [N]（>=3 污染風險高）
- AI 開始重複自己 / 忘記限制: [Yes / No]
- 下一個任務型態明顯不同: [Yes / No]
- 剛完成核心 artifact 固定: [Yes / No]
- Thread Health Verdict: [Healthy / Approaching limit / Should switch]
```

寫「視情況」「看 context 長度」「artifact 是否固定」等抽象描述視為不合格。詳見 Section 4B 第 9 項。

### 原則 11：回答語言預設繁體中文

預設用**繁體中文**回答。保留原文：

- 程式碼、檔名、CLI 指令、commit message
- 技術術語與英文專有名詞（P0-P9、PX、PRD、HLD、Module Path、State Completion Packet、Self-Bootstrapping Prompt 等）
- 既有英文 docs / artifacts 的直接引用
- `PRE_DEV_NAVIGATOR.md` / `AGENTS.md` 自己的英文 section 名稱

不要因為 navigator 內有大量英文 keyword 或既有 docs 是英文，就把整個回答切換成英文。

---

## 3. Pre-dev Router Prompt

這是本文件最常用的入口 prompt。

複製整份 `PRE_DEV_NAVIGATOR.md` 後，把你的想法或現有 artifacts 貼在最後，然後執行：

```text
你是 dev-os-starter 的 Pre-development Navigator。

我還沒有進入正式 .dev-os 開發工作流，或我正在重新檢查一個產品方向是否值得進入 dev-os。

請根據我提供的內容，使用 PRE_DEV_NAVIGATOR.md v0.4 判斷我目前在 pre-development 的哪個 state。

請嚴格遵守：
1. 不要直接寫程式。
2. 不要直接叫我初始化 .dev-os，除非通過 P8 Readiness Gate。
3. 如果資訊不足，請標成 assumption / open question，不要自行腦補成事實。
4. 你必須允許 exit path：繼續探索、先驗證、prototype only、park、kill、dev-os bootstrap。
5. 你必須輸出一段可直接複製的下一步 prompt。
6. 每次最多問 7 個關鍵問題；每個問題都要說明為什麼重要，並提供建議預設答案。
7. 如果我已經提供足夠資訊，不要為了形式而問問題，直接產出下一個 artifact。
8. 每次回答最後必須輸出完整 State Completion Packet（Section 4B），包含 Context Handoff Decision、Execution Environment Decision、New Conversation Startup Pack、Updated PREDEV_CONTEXT.md。
9. 你產生的「Copy-paste Next Prompt」本身必須是 self-bootstrapping prompt（Section 4D），開頭就要明確列出「Before answering, read these files first」。如果缺少這段，視為回答不合格並自行補齊。
10. 你必須主動判斷我目前是 greenfield 還是 brownfield 場景；如果出現 brownfield triggers（Section 4C.2），必須建議切到 IDE，並提供切換 prompt。

請用以下格式回答：

### 依照 Pre-dev Navigator，下一步是

**當前狀態**：
[P-state ID + 名稱]

**Greenfield / Brownfield**：
[Greenfield / Brownfield / Mixed]

**目前執行環境**：
[Web AI / IDE / Either]

**判斷依據**：
- [根據我提供內容看到的事實]
- [還缺少的關鍵資訊]

**目前最大風險**：
[產品 / 使用者 / 商業 / 技術 / scope / validation / dev-os suitability]

**現在不該做什麼**：
- [不要做的事]

**建議出口**：
[繼續探索 / 先驗證 / prototype only / park / kill / dev-os bootstrap]

**下一步執行位置**：
[同一個 Web AI 設計對話 / 新的設計對話 / 一次性驗證對話 / 切換到 IDE / 之後的 IDE coding agent]

**請直接複製這段 prompt 執行**：
```text
[完整 self-bootstrapping prompt（Section 4D）]
```

**Execution Environment Decision**：
- Current: [Web AI / IDE]
- Recommended for next state: [Web AI / IDE]
- Switch needed?: [Yes / No / Optional]
- Why: [理由]

**Context Handoff Check**：
- 建議：[繼續同一對話 / 開新設計對話 / 開新一次性驗證對話 / compact only / 結束]
- 理由：[為什麼]
- 如果開新對話 / 切環境，新對話 / 新環境要附上：
  - `[artifact / file]`：[用途]
- 不需要帶到新對話的內容：
  - [舊分支、過時假設、完整舊對話等]

以下是我的想法 / 現有 artifacts：

[貼上內容]

完成 artifact 後，請不要只回報「已完成」。請在回覆最後輸出完整 `State Completion Packet`（Section 4B 12 項）。

如果缺少 Copy-paste Next Prompt（且該 prompt 缺少「Before answering, read these files first」）或 New Conversation Startup Pack 或 Execution Environment Decision，請視為回答不合格並自行補齊。
```

---

## 4. 標準回答格式

任何 AI 使用本文件回答「下一步」時，都應該使用這個格式。

````md
### 依照 Pre-dev Navigator，下一步是

**當前狀態**：
[P0-P9 或 PX + state 名稱]

**Greenfield / Brownfield**：
[判斷]

**目前執行環境**：
[Web AI / IDE]

**判斷依據**：
- `[輸入內容 / artifact]`：[關鍵事實]
- `[輸入內容 / artifact]`：[缺口或風險]

**目前最大風險**：
[產品 / 使用者 / 商業 / 技術 / scope / validation / dev-os suitability]

**現在不該做什麼**：
- [不該做的事]

**建議出口**：
[繼續探索 / 先驗證 / prototype only / park / kill / dev-os bootstrap]

**下一步執行位置**：
[同一個 Web AI 設計對話 / 新的設計對話 / 一次性驗證對話 / 切換到 IDE / IDE coding agent]

**請直接複製這段 prompt 執行**：

```text
[完整 self-bootstrapping prompt（Section 4D）]
```

**執行前要附上 / 確認的內容**：
- `[artifact 或輸入]`

**完成後應該產生 / 更新**：
- `[artifact 名稱]`

**完成後下一個 state**：
[P-state ID + state 名稱，或 PX exit path]

**Execution Environment Decision**：
- Current: [...]
- Next: [...]
- Switch needed?: [Yes / No / Optional]
- 切換 prompt（如需要）：[參見 Section 4C.3]

**Context Handoff Check**：
- 建議：[繼續同一對話 / 開新設計對話 / 開新一次性驗證對話 / compact only / 結束]
- 理由：[context 是否過長、任務是否已完成、artifact 是否已固定、下一階段是否需要乾淨 context]
- 如果開新對話，新對話要附上：
  - `[artifact / file]`：[用途]
- 不需要帶到新對話的內容：
  - [不需要的舊內容]
````

---

## 4A. Context Handoff Protocol

Pre-dev Navigator 的工作場景通常是 Web AI 長對話或 IDE coding agent 長 thread。對話很容易因為大量背景、分支討論與文件貼上而變長。

如果每個 P-state 都留在同一個長對話裡，下一階段很容易被舊假設、已放棄方向或過長 context 污染。因此，每個 P-state 完成時都必須做 `Context Handoff Check`。

### 4A.1 Handoff 的核心原則

```text
對話用來探索。
artifact 用來固定。
handoff 用來重啟。
下一個 state 只應該吃「已整理過的必要 context」，不要吃整段舊對話。
```

每個 state 完成時，AI 應該同時輸出：

```text
1. 本階段 artifact
2. PREDEV_CONTEXT.md 更新版
3. 下一步 self-bootstrapping prompt
4. Context Handoff Check
5. Execution Environment Decision（Section 4C）
6. 如果要開新對話：New Conversation Startup Pack
```

### 4A.2 PREDEV_CONTEXT.md：跨對話最小記憶文件

當 pre-dev 對話開始變長時，不要依賴「整段聊天記錄」當記憶。請維護一份輕量的 `PREDEV_CONTEXT.md`。

建議結構：見 `predev/PREDEV_CONTEXT.template.md`。

`PREDEV_CONTEXT.md` 不取代各 state 的詳細 artifact。它是新對話的地圖，讓新 AI 知道應該讀哪些東西、哪些舊方向不要重開。

### 4A.3 什麼時候繼續同一對話

```text
還在同一個 P-state 內反覆補資料
只是回答 1-3 個小問題
artifact 還沒完成，開新對話會丟失正在形成的細節
目前對話仍短、清楚、沒有明顯分支污染
使用者只是要求修改剛產出的 artifact 的一小段
```

### 4A.4 什麼時候開新設計對話

```text
一個 P-state 已完成，且 artifact 已固定
下一個 state 的任務型態明顯不同
目前對話已貼入大量原始資料、舊文件或長篇討論
已經出現多個被放棄的方向，可能污染下一步判斷
AI 開始重複、忘記限制、混淆已決定和未決定的事
使用者需要把下一階段交給乾淨 context 的 AI
```

對於 Web AI / IDE 使用者，實務上常見的節奏是：

```text
P0/P1 可以在同一個探索對話完成。
P2/P3 建議視長度開新對話，因為問題 / 風險判斷需要乾淨 context。
P4/P5 可以同一對話，也可以在 MVP scope 前開新對話。
P6/P7 建議開新對話，因為文件生成與系統形狀需要穩定 context。
P8/P9 建議開新對話或至少使用乾淨 handoff，因為這會決定是否進入 dev-os。
PX validation / prototype / review 通常用一次性對話。
```

這不是硬性分段。真正硬性的是：每次 state 完成都必須做判斷。

### 4A.5 什麼時候開一次性對話

```text
驗證計畫審查
訪談 script 審查
landing page copy 審查
fake-door test 設計
競品 / 替代方案分析
技術可行性 spike 設計
用乾淨 context 做 devil's advocate review
用另一個 AI 批判目前 PRD / MVP scope
```

一次性對話的原則是：任務完成就結束，不要讓它變成主設計對話。

### 4A.6 什麼時候 compact，而不是開新對話

`compact` 只適合「同一任務尚未完成、但 context 快滿」的情況。

Pre-dev 預設更穩定的做法是：

```text
完成 artifact
→ 更新 PREDEV_CONTEXT.md
→ 開新對話
→ 重新載入必要文件
```

如果 artifact 已經完成，通常不要 compact；開新對話更乾淨。

### 4A.7 新對話應該附什麼

每次開新對話，不要把所有舊內容都塞進去。使用以下規則：

```text
必附：PRE_DEV_NAVIGATOR.md 或與下一 state 相關的摘錄
必附：PREDEV_CONTEXT.md 最新版
必附：上一個 state 的最新 artifact
選附：與下一 state 直接相關的 1-2 份前置 artifact
不要附：完整舊對話、已放棄方向的大量細節、過時 artifact、AI 中間推理廢稿
```

Artifact 附件建議表：

| 下一個 state | 新對話必附 | 視情況附上 | 不必附 |
|---|---|---|---|
| P1 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, Idea Snapshot | Raw idea | 舊對話全文 |
| P2 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, Idea Canvas | Idea Snapshot | 所有未選方向細節 |
| P3 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, Problem & User Frame | Idea Canvas | 原始腦暴全文 |
| P4 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, Problem & User Frame, Risk Register | Validation notes | 已排除的解法長文 |
| P5 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, Solution Strategy Brief, Risk Register | Problem & User Frame | P0 原始長文 |
| P6 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, MVP Scope Contract | Problem & User Frame, Risk Register | 所有中間討論 |
| P7 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, PRODUCT_BRIEF.md, PRD.md | MVP Scope Contract | 原始想法全文 |
| P8 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, PRODUCT_BRIEF.md, PRD.md, HIGH_LEVEL_DESIGN.md, MODULE_PATH.md, Risk Register | MVP Scope Contract | 早期未選方向 |
| P9 | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, Readiness Gate Report, PRODUCT_BRIEF.md, PRD.md, HIGH_LEVEL_DESIGN.md, MODULE_PATH.md | Risk Register | 未整理舊聊天 |
| PX | PRE_DEV_NAVIGATOR.md, PREDEV_CONTEXT.md, 目前最新 artifact, Risk Register | 相關原始證據 | 無關產品分支 |

### 4A.8 New Conversation Startup Pack 格式

如果 AI 建議開新對話，必須輸出以下完整區塊：

````md
## New Conversation Startup Pack

### 建議開新對話嗎？
[Yes / No / Optional]

### 新對話類型
[新設計對話 / 一次性驗證對話 / 一次性 review 對話 / 切換到 IDE thread]

### 為什麼
- [理由]

### 新對話要附上的文件 / artifacts
- `predev/PRE_DEV_NAVIGATOR.md`：[workflow 規則]
- `PREDEV_CONTEXT.md`：[目前狀態與決策摘要]
- `[上一階段 artifact].md`：[用途]

### 不要附上的內容
- [例如：完整舊對話、已放棄方向、過時草稿]

### 請直接複製到新對話的 prompt
（這個 prompt 必須符合 Section 4D 的 self-bootstrapping 要求）

```text
[完整 self-bootstrapping prompt]
```

### 預期新對話第一個回覆
- 確認 state
- 摘要已讀 artifacts
- 指出缺口
- 執行或修正下一步 prompt
````

### 4A.9 如果 AI 忘記做 Handoff，使用這個補救 prompt

```text
請依 PRE_DEV_NAVIGATOR.md v0.4 補做 Context Handoff Check 與 Execution Environment Decision。

請基於目前這個 state 的完成結果，輸出：
1. 目前完成了哪個 P-state / PX
2. 已產出的 artifact 摘要
3. 是否建議開新對話：Yes / No / Optional
4. 判斷理由
5. 如果開新對話，要附哪些文件 / artifacts
6. 不要附哪些舊內容
7. 新對話 self-bootstrapping 啟動 prompt
8. 新對話預期第一個回覆
9. Execution Environment Decision（Web AI / IDE / Switch）
10. 更新版 PREDEV_CONTEXT.md
```

---

## 4B. Mandatory State Completion Packet

每個 P-state / PX 的執行 prompt，不論任務是「整理想法」、「產出 PRD」、「修改 docs」、「產出 HIGH_LEVEL_DESIGN / MODULE_PATH」，最後都必須輸出 `State Completion Packet`。

### 4B.1 為什麼需要這個 packet

在 Web AI / coding agent 中，AI 很容易把「完成 artifact」誤判成「完成 workflow step」。例如：

```text
已完成 docs/HIGH_LEVEL_DESIGN.md 與 docs/MODULE_PATH.md。
建議下一步進 P8。
```

這不夠。因為使用者仍然不知道：

```text
下一步 prompt 是什麼？
要不要開新對話？
要不要切到 IDE？
新對話要貼哪些文件？
哪些舊內容不要帶過去？
新對話第一句該怎麼說？
PREDEV_CONTEXT.md 要怎麼更新？
```

### 4B.2 State Completion Packet 格式（12 項）

````md
## State Completion Packet

### 1. Completed State
[P-state ID + 名稱]

### 2. Completion Evidence
- 已產出 / 更新：`[artifact path]`
- 已遵守的限制：例如沒有寫程式、沒有初始化 `.dev-os`、沒有修改 production code
- 本 state 的 exit criteria 是否達成：[Yes / Partial / No]

### 3. Artifact Summary
- [用 3-7 點摘要本 state 固定下來的內容]

### 4. Recommended Next State / Exit Path
[P-state ID + 名稱，或 PX Validate First / Prototype Only / Park / Kill / Pivot]

### 5. Why This Next State
- [為什麼不是繼續留在本 state]
- [還有哪些風險 / open questions]

### 6. Next Step Execution Location
[同一個 Web AI 設計對話 / 新的設計對話 / 一次性驗證對話 / IDE coding agent / 切換到 IDE]

### 7. Files / Artifacts Reference List
（僅供你閱讀；下一步真正要讀的清單會內嵌在第 8 節的 prompt 開頭）

必附：
- `[file]`：[用途]

選附：
- `[file]`：[何時需要]

不要附：
- [完整舊對話、過時草稿、已放棄方向等]

### 8. Copy-paste Next Prompt
（**這是 self-bootstrapping prompt，必須符合 Section 4D 格式**。
prompt 開頭必須有「Before answering, read these files first」清單，
不能依賴第 7 節—使用者可能只複製第 8 節。）

```text
[完整 self-bootstrapping prompt]
```

### 9. Thread Health Check + Context Handoff Decision

**Thread Health Check**（逐項給數字 / Yes / No，**不要寫「視情況」**）：

- 預估對話訊息數: `[N]`
  - <30 = Healthy
  - 30-60 = 中等
  - 60-100 = 偏長
  - \>100 = 強烈建議換（Should switch）
- 已放棄方向 / 失敗 attempts: `[N]`
  - 0-2 = OK
  - \>=3 = 污染風險高（Should consider switch）
- AI 開始重複自己 / 忘記既有限制: `[Yes / No]`
- 下一個任務型態明顯不同（例如剛 P5 完成要切 P6 文件產出）: `[Yes / No]`
- 剛完成核心 artifact 固定（IDEA_CANVAS done / PROBLEM_USER_FRAME done / MVP_SCOPE_CONTRACT done / PRD done / HLD+MODULE_PATH done / Readiness Gate Report done）: `[Yes / No]`

**Thread Health Verdict**: `[Healthy / Approaching limit / Should switch]`

**Context Handoff Decision**：

- 建議：`[Continue Same Conversation / New Design Conversation / One-off Validation or Review Conversation / Compact Only / End]`
- 判斷：`[Yes / No / Optional]`
- 理由（必須引用上面 Thread Health Verdict 與具體信號，不能寫「視情況」）

決策規則：

- Verdict = `Should switch` → Decision 必須是 New 系列
- Verdict = `Approaching limit` → 建議下一個小步驟後切換
- Verdict = `Healthy` → 可繼續同一對話

### 10. Execution Environment Decision（Section 4C）
- Current environment: [Web AI / IDE]
- Recommended for next state: [Web AI / IDE]
- Switch needed?: [Yes / No / Optional]
- Brownfield triggers detected?: [Yes / No]
- 如果建議切換，提供切換 prompt（Section 4C.3）

### 11. New Conversation Startup Pack
如果上面建議不是開新對話，仍要寫：`Not needed because ...`

如果建議開新對話或切換環境，必須提供完整 self-bootstrapping startup prompt（已內嵌在第 8 節時可省略，並標註 "Same as section 8"）。

### 12. Updated PREDEV_CONTEXT.md
```markdown
# PREDEV_CONTEXT.md
（依 predev/PREDEV_CONTEXT.template.md 結構填寫完整內容）
```
````

### 4B.3 Universal Closing Clause

任何 state prompt 如果沒有明確包含以下文字，請在 prompt 最後自行附上：

```text
完成 artifact 後，請不要只回報「已完成」。
請在回覆最後輸出完整 `State Completion Packet`，包含 12 項：
1. Completed State
2. Completion Evidence
3. Artifact Summary
4. Recommended Next State / Exit Path
5. Why This Next State
6. Next Step Execution Location
7. Files / Artifacts Reference List
8. Copy-paste Next Prompt（必須是 self-bootstrapping prompt — 開頭明確列出 "Before answering, read these files first"）
9. Thread Health Check + Context Handoff Decision（必須給具體數字與 Yes/No，不要寫「視情況」）
10. Execution Environment Decision（Web AI / IDE / Switch）
11. New Conversation Startup Pack
12. Updated PREDEV_CONTEXT.md

回答語言：預設繁體中文（程式碼、檔名、技術術語保留原文）。

如果第 8 節 Copy-paste Next Prompt 缺少 "Before answering, read these files first"，或第 9 節缺少具體 Thread Health 數字（只寫「視情況」），或缺少 New Conversation Startup Pack 或 Execution Environment Decision，請視為回答不合格並自行補齊。
```

### 4B.4 補救 prompt：AI 已經只說「已完成」時

如果 AI 已經產出 artifact，但沒有提供完整 packet，直接貼這段：

```text
你的上一個回答只完成 artifact，不算完成 PRE_DEV_NAVIGATOR.md v0.4.1 的 state。

請依 v0.4.1 補做完整 `State Completion Packet`（12 項）。請用繁體中文回答。

請基於你剛完成的內容，輸出：
1. Completed State
2. Completion Evidence
3. Artifact Summary
4. Recommended Next State / Exit Path
5. Why This Next State
6. Next Step Execution Location
7. Files / Artifacts Reference List
8. Copy-paste Next Prompt（self-bootstrapping，開頭含 "Before answering, read these files first"）
9. Thread Health Check + Context Handoff Decision，必須給具體數字 / Yes/No：
   - 預估對話訊息數 [N] → [Healthy / 中等 / 偏長 / 強烈建議換]
   - 已放棄方向 / 失敗 attempts [N]
   - AI 開始重複自己 / 忘記限制 [Yes/No]
   - 下一個任務型態明顯不同 [Yes/No]
   - 剛完成核心 artifact 固定 [Yes/No]
   - Thread Health Verdict
   - Context Handoff Decision（必須對應 Verdict）
10. Execution Environment Decision（Web AI / IDE / Switch）
11. New Conversation Startup Pack（不需要時寫 Not needed because ...）
12. Updated PREDEV_CONTEXT.md

不要寫「視情況」「context 長度視情況」等抽象描述。
不要重寫剛才的 artifact。只補 workflow handoff。
```

### 4B.5 對 AI 的判斷規則

```text
如果使用者要求「產出文件」：產出文件 + State Completion Packet。
如果使用者要求「進入某個 P-state」：執行該 state + State Completion Packet。
如果使用者問「下一步是什麼」：只輸出下一步判斷與 prompt，但仍要包含 Context Handoff Decision + Execution Environment Decision。
如果使用者在 coding agent / IDE 中執行 pre-dev 文件產出：修改檔案後仍要回報 State Completion Packet。
```

---

## 4C. Execution Environment Handoff Protocol

v0.4 新增。Pre-dev 不是只在 Web AI 跑。實務上很多場景一開始在 Web AI，做到一半就需要看既有專案檔案，這時候必須切到 IDE。AI 必須主動偵測這個信號並提供切換 prompt。

### 4C.1 每個 P-state 的預設執行環境

| State | 預設 | Greenfield | Brownfield |
|---|---|---|---|
| P0 Raw Idea | Either | Web AI 適合 | IDE 也可以 |
| P1 Idea Clarification | Either | Web AI 適合 | IDE 也可以 |
| P2 Problem / User Framing | Either | Web AI 適合 | **IDE 推薦**（要對齊既有使用者） |
| P3 Evidence / Risk Check | **IDE 推薦** | Web AI 勉強可 | **IDE 強烈推薦**（要看資料） |
| P4 Solution Strategy | Either | Web AI 適合 | **IDE 推薦**（要評估既有 stack） |
| P5 MVP Scope | Either | Web AI 適合 | IDE 推薦 |
| P6 Product Brief / PRD | **IDE 推薦** | Web AI 可，但要手動移檔 | **IDE 推薦**（直接寫入 docs/） |
| P7 System Shape / Module Path | **IDE 推薦** | IDE 推薦（要對 stack） | **IDE 強烈推薦**（要看既有架構） |
| P8 Readiness Gate | **IDE 必要** | IDE 必要 | IDE 必要 |
| P9 Bootstrap Export | **IDE 必要** | IDE 必要 | IDE 必要（merge 進既有 repo） |
| PX Validate First | Either | Web AI 適合 | Either |
| PX Prototype Only | **IDE 必要** | IDE 必要 | IDE 必要 |
| PX Park / Kill | Either | Either | Either |
| PX Pivot | IDE 推薦 | Web AI 可 | **IDE 強烈推薦** |

### 4C.2 Brownfield Triggers：必須切到 IDE 的信號

如果出現以下任一信號，AI **必須主動建議切到 IDE**，不要繼續在 Web AI：

```text
1. 使用者提到既有專案、既有 codebase、既有 repo、既有 schema、既有 API
2. 使用者問「這跟我們現有的 X 怎麼整合」
3. 使用者要評估技術可行性，但不貼任何既有檔案
4. 使用者要做技術 spike 或 prototype
5. 需要查看既有 docs / ADR / module structure 才能判斷 dev-os suitability
6. 需要在既有專案 repo 寫 artifacts
7. 已經出現 .dev-os 字眼但 AI 沒有 repo 存取
8. P8 Readiness Gate（一律切 IDE）
9. P9 Bootstrap Export（一律切 IDE）
10. 任何「pre-dev 結論需要對齊既有現實」的時刻
```

### 4C.3 切換到 IDE 的範本 prompt

當 AI 判斷需要切到 IDE，State Completion Packet 第 10 節 + 第 11 節必須提供以下範本：

````md
### 切換到 IDE 的步驟

1. 打開 IDE（Claude Code / Cursor 等）並切到既有專案路徑
2. 把以下 prompt 貼到 IDE 的新 thread：

```text
你是 dev-os-starter 的 Pre-development Navigator。

我正在從 Web AI 切換到 IDE 繼續 pre-dev workflow。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development，不是正式 .dev-os 開發
- 不要寫 production code
- 不要初始化 .dev-os（除非 P8 通過）
- pre-dev artifacts 寫到 `predev/` 或 `docs/predev/`，不要寫進 `.dev-os/`

Current State:
- 已完成：[上一個 state]
- 現在要執行：[下一個 state]
- 切換原因：[brownfield trigger 描述]

Before answering, read these files first:
1. `[absolute or relative path]/predev/PRE_DEV_NAVIGATOR.md`：workflow rules
2. `[path]/predev/AGENTS.md`：IDE runtime rules
3. `[predev artifact path]/PREDEV_CONTEXT.md`：跨對話狀態
4. `[predev artifact path]/[上一階段 artifact]`：用途
5. `[既有專案檔案 1]`：[為什麼要讀]
6. `[既有專案檔案 2]`：[為什麼要讀]

If any required file is missing:
- 不要猜
- 先列出 Missing Required Artifacts
- 仍可基於現有內容做 provisional 處理
- verdict 必須標 Conditional / Not ready / Needs more input

Task:
[下一步任務描述]

Required output:
[本 state 預期輸出項目]

At the end, output full `State Completion Packet`（Section 4B 12 項）。
你產生的「Copy-paste Next Prompt」本身也必須是 self-bootstrapping prompt，
開頭含 "Before answering, read these files first"。
```
````

### 4C.4 切回 Web AI 的時機（罕見）

通常不需要從 IDE 切回 Web AI。例外情境：

```text
1. 在 IDE 跑出 dead-end，想找另一個 AI 做 devil's advocate review
2. 純策略討論不需要看任何檔案，但想用 Web AI 比較長的 context window
3. 需要與非工程相關者分享產物討論
```

切回 Web AI 時，必須先把所有需要的 artifacts 用 markdown 區塊匯出，貼進 Web AI。

### 4C.5 Mixed mode：同時用兩邊

允許但要謹慎。建議模式：

```text
IDE = 主要 thread（執行 P-state、產 artifacts、讀既有檔案）
Web AI = 一次性對話（critique / 競品研究 / 訪談 script 等）
```

主 thread 永遠是 IDE。Web AI 的結論手動帶回 IDE artifact。

---

## 4D. Self-Bootstrapping Prompt Contract

v0.4 硬性規則。第 8 節 Copy-paste Next Prompt **必須是 self-bootstrapping prompt**，意思是：把它複製到任何乾淨的對話 / IDE thread，AI 都能在不需要其他附加說明的情況下知道要讀什麼、做什麼、輸出什麼。

### 4D.1 為什麼

使用者實務上經常只複製第 8 節的 prompt，不會把第 7 節 Files Reference List 一起複製。如果 prompt 沒自帶 reading list，新對話 / 新環境的 AI 就會憑印象做事。

### 4D.2 Self-bootstrapping prompt 必備 9 段

```text
1. Role / workflow version
2. Workflow constraints（不要寫程式、不要初始化 .dev-os、artifacts 寫到哪、etc.）
3. Current state（已完成的 + 現在要執行的）
4. Before answering, read these files first（明確路徑 + 用途）
5. Missing-file behavior（如果檔案缺少怎麼辦）
6. Task（本 state 任務）
7. Required output（具體輸出項目）
8. Required final State Completion Packet（Section 4B 12 項）
9. Self-enforcement clause（你產生的下一個 prompt 也必須符合本規範）
```

### 4D.3 範本

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development，不是正式 .dev-os 開發
- 不要寫 production code
- 不要初始化 .dev-os，除非 P8 Readiness Gate 通過
- pre-dev artifacts 寫到 `predev/` 或 `docs/predev/`，不要寫進 `.dev-os/`
- [其他本 state 限制]

Current State:
- 已完成：[上一個 state + 名稱]
- 現在要執行：[本 state ID + 名稱]
- Greenfield / Brownfield：[判斷]
- 預期執行環境：[Web AI / IDE]

Before answering, read these files first:
1. `predev/PRE_DEV_NAVIGATOR.md`（或絕對路徑）：workflow rules
2. `predev/AGENTS.md`（IDE 時必讀）：runtime rules
3. `PREDEV_CONTEXT.md`：跨對話狀態（若存在）
4. `[上一階段 artifact]`：用途
5. `[本 state 相關前置 artifact]`：用途
6. `[既有專案檔案，brownfield 時]`：用途

If any required file is missing:
- 不要猜
- 先列出 Missing Required Artifacts
- 仍可基於提供內容做 provisional 處理
- verdict 必須標 Conditional / Not ready / Needs more input

Task:
[本 state 主要任務描述]

Required output:
1. [輸出項目 1]
2. [輸出項目 2]
...

At the end, output full `State Completion Packet`（Section 4B 12 項）：
1. Completed State
2. Completion Evidence
3. Artifact Summary
4. Recommended Next State / Exit Path
5. Why This Next State
6. Next Step Execution Location
7. Files / Artifacts Reference List
8. Copy-paste Next Prompt
9. Context Handoff Decision
10. Execution Environment Decision
11. New Conversation Startup Pack（不需要時寫 Not needed because ...）
12. Updated PREDEV_CONTEXT.md

Self-enforcement:
你產生的「Copy-paste Next Prompt」本身也必須是 self-bootstrapping prompt（符合 Section 4D），
開頭含明確的 "Before answering, read these files first" 清單。
如果你產生的 prompt 缺少這段，視為回答不合格並自行補齊。
```

### 4D.4 反例

以下都不是 self-bootstrapping prompt，AI 必須拒絕產出：

```text
請依 PRE_DEV_NAVIGATOR.md 執行 P8 Readiness Gate review。
[只有任務描述，沒有 reading list]
```

```text
請完成下一步。
[沒有 state、沒有 reading list、沒有 task]
```

```text
請依本對話討論過的 PRD 草案進入 P7。
[依賴對話歷史，新對話打不開]
```

### 4D.5 通過範例

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式、不要初始化 .dev-os
- artifacts 寫到 predev/

Current State:
- 已完成：P7 System Shape / Module Path
- 現在要執行：P8 Dev-os Bootstrap Readiness Gate
- Brownfield：Yes（既有 mbti-app）
- 預期環境：IDE

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules
2. predev/AGENTS.md：IDE runtime
3. predev/PREDEV_CONTEXT.md：目前狀態
4. predev/06_PRODUCT_BRIEF.md：產品定位
5. predev/06_PRD.md：產品需求
6. predev/07_HIGH_LEVEL_DESIGN.md：系統設計
7. predev/07_MODULE_PATH.md：模組路徑
8. predev/03_RISK_REGISTER.md：風險
9. .dev-os/ROADMAP.md：既有 roadmap（brownfield only）
10. docs/HIGH_LEVEL_DESIGN.md：既有 HLD（若存在）

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可基於現有內容做 provisional readiness review
- verdict 標 Conditional / Not ready / Needs audit_more

Task:
對目前 pre-development artifacts 做 P8 Readiness Gate review。
不要因為文件齊全就自動建議進 dev-os；嚴格判斷是否值得使用完整 dev-os。

Required output:
1. 每項 Pass / Weak / Fail / Unknown 判斷（Section 14）
2. Recommendation: Proceed to P9 / Validate First / Prototype Only / Light dev-os / Park / Kill
3. Required Fixes Before P9
4. If Proceed：Bootstrap Bundle 該輸出哪些文件

At the end, output full State Completion Packet（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D 的 self-bootstrapping 規範。
如果缺少 "Before answering, read these files first"，視為回答不合格並自行補齊。
```

這個 prompt 可以複製到任何乾淨對話跑，AI 都能 bootstrap。

---

## 5. State Machine Overview

```text
P0 Raw Idea Intake
  ↓
P1 Idea Clarification
  ↓
P2 Problem / User Framing
  ↓
P3 Evidence / Risk Check
  ↓
P4 Solution Strategy
  ↓
P5 MVP Scope + Non-goals
  ↓
P6 Product Brief / PRD
  ↓
P7 System Shape / Module Path
  ↓
P8 Dev-os Bootstrap Readiness Gate
  ↓
P9 Bootstrap Export
  ↓
dev-os S0-S10
```

任何 state 都可以轉入：

```text
PX Validate First
PX Prototype Only
PX Park
PX Kill
PX Pivot
```

### 5.1 State 快速判斷表

| State | 使用者狀態 | 主要問題 | 主要產物 | 預設環境 |
|---|---|---|---|---|
| P0 | 只有一大段想法 | 這段話裡到底有什麼？ | Idea Snapshot | Either |
| P1 | 有方向但很散 | 這是一個什麼產品方向？ | Idea Canvas | Either |
| P2 | 有產品感但問題/使用者不清 | 解決誰的什麼問題？ | Problem & User Frame | Either |
| P3 | 問題/使用者初步清楚 | 有哪些最危險假設？ | Risk Register + Validation Plan | IDE 推薦 |
| P4 | 問題清楚但解法未定 | 第一個解法策略是什麼？ | Solution Strategy Brief | Either |
| P5 | 解法方向清楚但 scope 不清 | MVP 做什麼、不做什麼？ | MVP Scope Contract | Either |
| P6 | MVP 清楚但還沒固定成文件 | 如何固定成 PRD？ | Product Brief + PRD | IDE 推薦 |
| P7 | PRD 清楚但工程形狀不清 | 系統如何切模組？ | High-level Design + Module Path | IDE 推薦 |
| P8 | 有設計與模組路徑 | 是否真的適合進 dev-os？ | Readiness Gate Report | **IDE 必要** |
| P9 | 已通過 readiness | 輸出哪些 dev-os 初始化文件？ | Bootstrap Bundle | **IDE 必要** |
| PX | 不應繼續線性推進 | 驗證、暫停、砍掉或 prototype？ | Exit Plan | 視 PX 子類 |

---

## 6. P0 — Raw Idea Intake

### 進入條件

```text
使用者只有一大段口語想法
內容混雜動機、功能、抱怨、靈感、商業想像
沒有清楚產品一句話
沒有清楚 target user
沒有清楚問題定義
```

### 目標

把混亂輸入整理成可討論的 `Idea Snapshot`，但不要開始設計產品。

### 現在不該做

```text
不要寫 PRD
不要設計架構
不要列 module
不要初始化 .dev-os
不要假設 target user 已確定
```

### 產物：predev/01_IDEA_SNAPSHOT.md

```markdown
# Idea Snapshot

## Raw Input Summary
[用 5-10 句整理原始想法]

## Possible Product Directions
1. [方向 A]
2. [方向 B]
3. [方向 C]

## Possible Target Users
- [使用者假設 1]
- [使用者假設 2]

## Possible Problems
- [問題假設 1]
- [問題假設 2]

## Strong Signals
- [原始輸入中最明確、最有能量的部分]

## Ambiguities
- [最含糊的地方]

## Open Questions
- [問題]

## Recommended Next State
[P1 / P2 / PX]
```

### P0 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development，不是正式 .dev-os 開發
- 不要寫 production code
- 不要設計系統、不要列工程 module
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/ 或 docs/predev/

Current State:
- 已完成：（無）
- 現在要執行：P0 Raw Idea Intake
- 預期環境：Web AI 或 IDE 都可以

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md（或你提供的絕對路徑）：workflow rules
2. （IDE 環境時）predev/AGENTS.md：runtime rules

If predev/PRE_DEV_NAVIGATOR.md is missing:
- 先請使用者貼上整份 navigator 內容
- 不要憑印象執行 P0

Task:
請把下面的模糊想法整理成 Idea Snapshot。不要寫 PRD、不要設計系統、不要列工程 module。

Required output:
1. Raw Input Summary：用 5-10 句整理我的想法
2. Possible Product Directions：列出最多 3 個可能產品方向
3. Possible Target Users：列出可能使用者，但標成 hypothesis
4. Possible Problems：列出可能問題，但標成 hypothesis
5. Strong Signals：指出原始輸入中最明確、最值得保留的訊號
6. Ambiguities：指出最模糊、最容易讓後續走錯的地方
7. Open Questions：最多 7 個關鍵問題；每題附「為什麼重要」與「建議預設答案」
8. Recommended Next State：依 PRE_DEV_NAVIGATOR.md 判斷下一個 state

限制：
- 不要假設我一定要做成軟體產品
- 不要建議我立刻開發
- 如果看起來應該先驗證或暫停，請明確說

Raw idea:

[貼上原始想法]

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D 的 self-bootstrapping 規範，
開頭明確列出 "Before answering, read these files first"。
如果缺少這段，視為回答不合格並自行補齊。
```

### Exit criteria

```text
一個可討論的產品方向假設
一組可能 target users
一組可能 problems
一份 open questions 清單
```

---

## 7. P1 — Idea Clarification

### 進入條件

```text
已整理出可能產品方向
但一句話定位仍不穩
使用者、問題、使用情境仍有多個版本
```

### 目標

把 idea 收斂成 1-2 個可繼續探索的方向，而不是同時追所有可能性。

### 現在不該做

```text
不要承諾 MVP scope
不要寫技術架構
不要做功能清單大爆炸
不要把每個方向都塞進第一版
```

### 產物：predev/02_IDEA_CANVAS.md

```markdown
# Idea Canvas

## One-line Product Hypothesis
[這可能是一個什麼產品]

## Alternative Directions Considered
| Direction | Target User | Problem | Why it might work | Why it might fail |
|---|---|---|---|---|

## Chosen Direction for Next Exploration
[目前先探索哪一個方向]

## Why This Direction First
[原因]

## Explicitly Not Choosing Yet
- [暫時不選的方向]

## Key Unknowns
- [未知]

## Recommended Next State
[P2 / P3 / PX]
```

### P1 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要設計技術架構、不要列完整功能清單
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/

Current State:
- 已完成：P0 Raw Idea Intake
- 現在要執行：P1 Idea Clarification
- 預期環境：Web AI 或 IDE 都可以

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules
2. predev/PREDEV_CONTEXT.md（若存在）：跨對話狀態
3. predev/01_IDEA_SNAPSHOT.md：上一階段 artifact

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可基於現有內容做 provisional Idea Canvas
- 標明哪些區塊還缺資訊

Task:
請基於 Idea Snapshot，把這個想法收斂成 1-2 個可繼續探索的產品方向。

Required output:
1. One-line Product Hypothesis：一句話產品假設
2. Alternative Directions Considered：最多 3 個方向，用表格比較 target user / problem / why it might work / why it might fail
3. Chosen Direction for Next Exploration：建議優先探索哪一個方向
4. Why This Direction First：為什麼先選它
5. Explicitly Not Choosing Yet：哪些方向先不做
6. Key Unknowns：最重要未知數
7. Recommended Next State：P2 / P3 / PX

如果你認為目前不該繼續收斂，而該先驗證、park 或 kill，請轉入 PX 並說明。

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### Exit criteria

```text
一句話產品假設
明確選擇的探索方向
暫時不選的方向
主要未知數
```

---

## 8. P2 — Problem / User Framing

### 進入條件

```text
產品方向初步存在
但 target user 還太泛
problem statement 還像口號
沒有清楚 current alternative
不知道使用者何時、為什麼需要它
```

### 目標

釐清：

```text
誰在什麼情境下遇到什麼問題？
現在怎麼解決？
現有解法哪裡不夠？
這個問題是否夠痛、夠頻繁、夠明確？
```

### 現在不該做

```text
不要先設計功能
不要先決定技術 stack
不要假設所有人都是使用者
不要用「提升效率」「更方便」這種模糊問題定義收尾
```

### 產物：predev/03_PROBLEM_USER_FRAME.md

```markdown
# Problem & User Frame

## Primary Target User
[最優先使用者]

## Secondary Users
[次要使用者，若有]

## Situation / Trigger
[什麼情境觸發需求]

## Problem Statement
[使用者遇到的具體問題]

## Current Alternatives
| Alternative | How user uses it today | What is insufficient |
|---|---|---|

## Pain Evidence
[已有證據；如果沒有，標示 none yet]

## Frequency / Urgency / Willingness
- Frequency: [高/中/低/未知]
- Urgency: [高/中/低/未知]
- Willingness to pay or switch: [高/中/低/未知]

## Non-users
[明確不是第一版使用者的人]

## Open Questions
- [問題]

## Recommended Next State
[P3 / P4 / PX]
```

### P2 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/

Current State:
- 已完成：P1 Idea Clarification
- 現在要執行：P2 Problem / User Framing
- 預期環境：Web AI 或 IDE

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules
2. predev/PREDEV_CONTEXT.md：跨對話狀態
3. predev/02_IDEA_CANVAS.md：上一階段 artifact
4. （Brownfield 時）既有專案中與該使用者群體相關的 docs / 訪談紀錄

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可做 provisional frame，但要標明 evidence 為 none yet

Task:
請基於目前的產品方向，幫我完成 Problem & User Frame。
請嚴格避免泛泛而談。不要說「所有人」「提高效率」「更方便」就結束。

Required output:
1. Primary Target User：第一版最優先使用者，越具體越好
2. Secondary Users：次要使用者，如果第一版不服務他們要明說
3. Situation / Trigger：使用者在什麼情境下會需要它
4. Problem Statement：具體問題，不要寫成解法
5. Current Alternatives：使用者今天怎麼解決；每個替代方案哪裡不夠
6. Pain Evidence：已有證據；如果沒有，明確標示 none yet
7. Frequency / Urgency / Willingness：用高/中/低/未知評估
8. Non-users：第一版明確不服務誰
9. Open Questions：最多 7 個，附為什麼重要與建議預設答案
10. Recommended Next State：P3 / P4 / PX

如果 evidence 太弱，請不要假裝沒問題；請建議進入 P3 或 PX Validate First。

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### Exit criteria

```text
primary target user
具體 problem statement
current alternatives
現有解法不足之處
非目標使用者
```

---

## 9. P3 — Evidence / Risk Check

### 進入條件

```text
問題與使用者已初步清楚
但證據不足
最危險假設尚未列出
不知道該直接做、先訪談、先 prototype，還是先停
```

### 目標

避免基於漂亮敘事直接開發。找出最大風險與最便宜驗證方式。

### 風險類型

```text
Problem risk：問題不夠痛
User risk：找不到明確使用者
Value risk：即使做了也沒有足夠價值
Channel risk：找不到觸達使用者的方法
Business risk：無法收費或不值得維運
Technical risk：技術不可行或成本過高
Scope risk：MVP 太大
Workflow risk：不適合 dev-os，應該輕量做
```

### 現在不該做

```text
不要用「我覺得有人需要」當證據
不要因為 AI 說合理就開發
不要跳過風險排序
```

### 產物：predev/03_RISK_REGISTER.md

```markdown
# Risk Register

| Risk | Type | Severity | Evidence now | How to test cheaply | Decision threshold |
|---|---|---|---|---|---|

# Validation Plan

## Recommended Path
[Continue / Validate First / Prototype Only / Park / Kill]

## Validation Tests
1. [test]
2. [test]
3. [test]

## What Would Change My Mind
- [信號]

## Timebox
[例如 3 天 / 1 週 / 2 週]

## Recommended Next State
[P4 / P5 / PX]
```

### P3 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/

Current State:
- 已完成：P2 Problem / User Framing
- 現在要執行：P3 Evidence / Risk Check
- 預期環境：IDE 推薦（brownfield 強烈推薦 IDE 以便讀既有資料）

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（特別是 Section 9 P3）
2. predev/PREDEV_CONTEXT.md：跨對話狀態
3. predev/02_IDEA_CANVAS.md：產品方向
4. predev/03_PROBLEM_USER_FRAME.md：問題框架
5. （Brownfield）既有專案的相關 metrics / logs / 訪談 / 客服紀錄 / analytics dashboard 連結

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可做 provisional Risk Register，但每個風險都要標 Evidence: none yet
- 把 P3 verdict 標 Conditional

Task:
請基於目前的 Problem & User Frame，做 Evidence / Risk Check。
請不要急著設計功能。請像一位嚴格但務實的產品策略顧問，判斷這個想法現在最可能死在哪裡。

Required output:
1. Risk Register：列出 5-10 個主要風險，欄位包含 Risk / Type / Severity / Evidence now / How to test cheaply / Decision threshold
2. Top 3 Riskiest Assumptions：最危險的三個假設
3. Validation Plan：最便宜的驗證方式
4. What Would Change My Mind：什麼證據會讓我們繼續、pivot 或停止
5. Recommended Path：Continue / Validate First / Prototype Only / Park / Kill
6. Recommended Next State：P4 / P5 / PX

請明確說明：
- 如果現在不該進入開發，為什麼
- 如果可以繼續，哪些風險可以留到 MVP 後處理

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### Exit criteria

```text
Top 3 riskiest assumptions
便宜驗證方式
是否繼續的 threshold
建議出口
```

---

## 10. P4 — Solution Strategy

### 進入條件

```text
使用者與問題清楚
主要風險已盤點
但還沒有選擇第一個解法策略
```

### 目標

比較多種解法，選擇第一個最小可驗證產品策略。

### 現在不該做

```text
不要把所有解法合併成大產品
不要為了看起來完整而做平台
不要先做 admin / settings / dashboard 等非核心體驗
```

### 產物：predev/04_SOLUTION_STRATEGY.md

```markdown
# Solution Strategy Brief

## Problem Recap
## Solution Options
| Option | Description | Pros | Cons | Validation value | Build cost |
|---|---|---|---|---|---|

## Chosen Strategy
## Why This Strategy
## First User Outcome
## Differentiation Hypothesis
## Not Building Yet
## Recommended Next State
```

### P4 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/

Current State:
- 已完成：P3 Evidence / Risk Check
- 現在要執行：P4 Solution Strategy
- 預期環境：Either（brownfield 推薦 IDE 以對既有 stack）

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（Section 10 P4）
2. predev/PREDEV_CONTEXT.md
3. predev/03_PROBLEM_USER_FRAME.md
4. predev/03_RISK_REGISTER.md
5. （Brownfield）既有專案的 docs/HIGH_LEVEL_DESIGN.md、docs/MODULE_PATH.md、core feature list

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可給出 provisional strategy，但要明說「未對齊既有 stack 假設」

Task:
請基於 Problem & User Frame 和 Risk Register，提出 Solution Strategy Brief。
比較 2-4 種可能解法，不要直接假設第一個想到的解法就是最佳解。

Required output:
1. Problem Recap
2. Solution Options：表格比較 Description / Pros / Cons / Validation value / Build cost
3. Chosen Strategy
4. Why This Strategy
5. First User Outcome
6. Differentiation Hypothesis
7. Not Building Yet
8. Recommended Next State：P5 / PX

限制：
- 優先選可以驗證核心價值的策略，不是功能最多的策略
- 如果最合理策略不是軟體開發（而是服務、內容、手動流程或 no-code），請明確說

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### Exit criteria

```text
比較過的解法選項
選定的第一個策略
第一個 user outcome
不做的策略
```

---

## 11. P5 — MVP Scope + Non-goals

### 進入條件

```text
解法策略已選
但第一版範圍還不清
功能清單可能膨脹
沒有明確 non-goals
```

### 目標

定義最小可驗證 MVP：它要讓某個使用者完成某個具體 outcome，而不是做一個完整平台。

### 現在不該做

```text
不要把「以後可能需要」放進 MVP
不要為了完整性做管理後台
不要把 edge cases 當核心路徑
不要把多 persona 都納入第一版
```

### 產物：predev/05_MVP_SCOPE_CONTRACT.md

```markdown
# MVP Scope Contract

## MVP Goal
## Primary User
## First End-to-End User Story
## In Scope
## Out of Scope / Non-goals
## Manual / Wizard-of-Oz Allowed
## Acceptance Criteria
## Success Signals
## Failure / Pivot Signals
## Recommended Next State
```

### P5 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/

Current State:
- 已完成：P4 Solution Strategy
- 現在要執行：P5 MVP Scope + Non-goals
- 預期環境：Either

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（Section 11 P5）
2. predev/PREDEV_CONTEXT.md
3. predev/04_SOLUTION_STRATEGY.md
4. predev/03_RISK_REGISTER.md
5. （Brownfield）既有 ROADMAP.md / PHASE_PLAN.md（若存在）

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可定義 provisional MVP，但要明說與既有 roadmap 整合假設未驗證

Task:
請基於 Solution Strategy，幫我定義 MVP Scope Contract。
用非常嚴格的 scope 控制方式處理。目標不是做完整產品，而是做第一個可驗證的 end-to-end 使用者體驗。

Required output:
1. MVP Goal
2. Primary User
3. First End-to-End User Story
4. In Scope
5. Out of Scope / Non-goals
6. Manual / Wizard-of-Oz Allowed
7. Acceptance Criteria
8. Success Signals
9. Failure / Pivot Signals
10. Recommended Next State：P6 / PX

請特別檢查：
- scope 是否過大
- 是否能在第一版驗證核心假設
- 是否真的需要 dev-os，還是應該 prototype only

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### Exit criteria

```text
第一個 end-to-end user story
in scope
out of scope
acceptance criteria
success / failure signals
```

---

## 12. P6 — Product Brief / PRD

### 進入條件

```text
MVP scope 清楚
但尚未固定成可交接、可審查、可重啟的文件
```

### 目標

把探索結果固定成 `PRODUCT_BRIEF.md` 與 `PRD.md`。這兩份可以在進入 dev-os 後保留在 `docs/`，作為產品背景。

### 現在不該做

```text
不要寫成投資簡報
不要省略 non-goals
不要把 open questions 藏起來
不要寫成過度抽象的願景文件
```

### 產物 1：predev/06_PRODUCT_BRIEF.md（P9 後 copy 到 docs/PRODUCT_BRIEF.md）

```markdown
# PRODUCT_BRIEF.md

## One-liner
## Problem
## Target User
## Current Alternatives
## Proposed Solution
## MVP Goal
## Why Now / Why This
## Success Signals
## Non-goals
## Key Risks
## Open Questions
```

### 產物 2：predev/06_PRD.md（P9 後 copy 到 docs/PRD.md）

```markdown
# PRD.md

## 1. Problem Statement
## 2. Goals
## 3. Non-goals / Out of Scope
## 4. Users
## 5. Core User Journey
## 6. Functional Requirements
## 7. Manual / Non-automated Parts for MVP
## 8. Data / Content Requirements
## 9. Privacy / Security / Compliance Notes
## 10. Acceptance Criteria
## 11. Success Metrics / Validation Signals
## 12. Risks and Open Questions
## 13. Dev-os Suitability Notes
```

### P6 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/
- P9 後會把 06_PRODUCT_BRIEF.md / 06_PRD.md 移到 docs/

Current State:
- 已完成：P5 MVP Scope Contract
- 現在要執行：P6 Product Brief / PRD
- 預期環境：IDE 推薦（要直接寫檔）

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（Section 12 P6 + Section 16 output contract）
2. predev/PREDEV_CONTEXT.md
3. predev/05_MVP_SCOPE_CONTRACT.md
4. predev/03_PROBLEM_USER_FRAME.md
5. predev/03_RISK_REGISTER.md
6. （Brownfield）既有 docs/PRD.md（若存在 → 視為 merge 不要覆蓋）

If any required file is missing:
- 列出 Missing Required Artifacts
- 不要憑印象補

Task:
請基於 MVP Scope Contract、Problem & User Frame、Risk Register，產出兩份產品文件：
1. predev/06_PRODUCT_BRIEF.md
2. predev/06_PRD.md

請注意：
- 文件是給未來 AI 與開發者看的，不是給投資人看的
- 結構化、明確、無歧義
- 不要把 assumption 寫成 fact
- 所有 open questions 要保留
- Non-goals 必須明確
- 不要寫程式，不要設計 repo 結構

Required output:
PRODUCT_BRIEF.md（11 個 section，見 Section 16.1）
PRD.md（13 個 section，見 Section 16.2）

完成後請判斷 Recommended Next State：P7 / PX。

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### Exit criteria

```text
PRODUCT_BRIEF.md 草案
PRD.md 草案
明確 goals / non-goals
core user journey
functional requirements
acceptance criteria
risks and open questions
```

---

## 13. P7 — System Shape / Module Path

### 進入條件

```text
PRD 已基本清楚
但還沒有高層級系統設計
還沒有模組邊界、依賴、phase / wave 路徑
```

### 目標

把產品文件轉成 dev-os 可以使用的工程啟動文件草案。

### 現在不該做

```text
不要寫 production code
不要寫單一 module SPEC
不要過度設計所有未來功能
不要把每個小 component 都當 module
```

### 產物 1：predev/07_HIGH_LEVEL_DESIGN.md

```markdown
# HIGH_LEVEL_DESIGN.md

## Product Positioning
## Core Design Beliefs
## Primary User Journey
## System Overview
## Major Components / Engines / Interfaces
## Data Flow Overview
## Key Product and Technical Decisions
## Risks and Constraints
## Explicit Non-goals
## Open Questions
```

### 產物 2：predev/07_MODULE_PATH.md

```markdown
# MODULE_PATH.md

## Module Map Overview
## Module List
| Module ID | Name | Purpose | Depends On | Enables | Phase | Wave | Notes |
|---|---|---|---|---|---|---|---|

## Dependency Graph
## Phase Plan Summary
## First Vertical Slice
## Module Boundaries
## Deferred Modules
## Open Questions
```

### P7 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要寫單一 module SPEC（SPEC 會在進入 dev-os 後再寫）
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/

Current State:
- 已完成：P6 Product Brief / PRD
- 現在要執行：P7 System Shape / Module Path
- 預期環境：IDE 推薦（brownfield 強烈推薦）

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（Section 13 P7 + Section 16.3 + 16.4）
2. predev/PREDEV_CONTEXT.md
3. predev/06_PRODUCT_BRIEF.md
4. predev/06_PRD.md
5. predev/03_RISK_REGISTER.md
6. （Brownfield）既有 docs/HIGH_LEVEL_DESIGN.md：merge basis
7. （Brownfield）既有 docs/MODULE_PATH.md：merge basis
8. （Brownfield）相關既有源碼資料夾結構：對齊現實
9. （Brownfield）.dev-os/ROADMAP.md：避免重複定義

If any required file is missing:
- 列出 Missing Required Artifacts
- Brownfield 缺既有 HLD/MODULE_PATH 時必須警告：可能引入既有架構衝突

Task:
請基於 docs/PRODUCT_BRIEF 與 docs/PRD，產出 dev-os bootstrap 前需要的工程形狀草案：
1. predev/07_HIGH_LEVEL_DESIGN.md
2. predev/07_MODULE_PATH.md

要求：
- 不要寫程式
- 不要寫單一 module SPEC
- 高層級設計與模組路徑，不是 implementation plan
- 模組要有清楚責任、依賴與 phase，不要過度切碎
- 必須標出第一個 vertical slice
- 必須標出 deferred modules

Required output:
HIGH_LEVEL_DESIGN.md（9 個 section，見 Section 16.3）
MODULE_PATH.md（8 個 section，見 Section 16.4）

完成後請判斷 Recommended Next State：P8 / PX。

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
這是 P7 的常見失敗模式：只產出兩份 docs 然後說「下一步進 P8」就停。
你的 Copy-paste Next Prompt 必須是完整的 P8 self-bootstrapping prompt，
含 P8 該讀的所有檔案 reading list（HLD + MODULE_PATH + PRD + Risk Register 等）。
```

### P7 常見失敗模式（v0.3 留下的歷史問題）

如果 AI 回覆類似：

```text
已完成 HIGH_LEVEL_DESIGN.md。
已完成 MODULE_PATH.md。
建議下一步開 P8 readiness review。
```

這缺少：

```text
P8 self-bootstrapping prompt
是否開新對話 / 切環境的 Yes / No / Optional
New Conversation Startup Pack
PREDEV_CONTEXT.md 更新
```

立刻使用 Section 4B.4 補救 prompt。

### Exit criteria

```text
HIGH_LEVEL_DESIGN.md 草案
MODULE_PATH.md 草案
module list
dependency order
first vertical slice
phase summary
```

---

## 14. P8 — Dev-os Bootstrap Readiness Gate

### 進入條件

```text
已有 PRODUCT_BRIEF / PRD
已有 HIGH_LEVEL_DESIGN 草案
已有 MODULE_PATH 草案
但尚未確認是否真的適合 dev-os
```

### 目標

決定：

```text
進入 dev-os bootstrap
先補產品探索
先驗證
先做 throwaway prototype
輕量採用 dev-os 部分元素
暫停或砍掉
```

### 現在不該做

```text
不要因為文件看起來完整就直接進 dev-os
不要忽略 dev-os overhead
不要把小 prototype 硬塞進完整 dev-os
```

### Readiness Gate Checklist

每項給出：`Pass / Weak / Fail / Unknown`。

```markdown
# Dev-os Bootstrap Readiness Gate

## 1. Product Readiness
- Problem is specific
- Target user is specific
- Current alternatives are understood
- MVP goal is clear
- Non-goals are explicit

## 2. Validation Readiness
- Riskiest assumptions identified
- Evidence exists or validation plan is acceptable
- Success / failure signals are defined

## 3. Engineering Readiness
- High-level design is coherent
- Module path is clear
- First vertical slice is defined
- Major risks and constraints are visible

## 4. Dev-os Suitability
- Expected effort is likely 3+ months or non-trivial
- There is complex product / domain logic
- The project is expected to live long enough to benefit from workflow discipline
- The overhead is justified

## Recommendation
[Proceed to P9 / Validate First / Prototype Only / Light dev-os / Park / Kill]

## Required Fixes Before P9
- [fix]
```

### P8 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫程式
- 不要初始化 .dev-os（P8 通過後 P9 才會考慮）
- pre-dev artifacts 寫到 predev/

Current State:
- 已完成：P7 System Shape / Module Path
- 現在要執行：P8 Dev-os Bootstrap Readiness Gate
- 預期環境：IDE 必要

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（Section 14 P8 checklist）
2. predev/AGENTS.md：runtime rules
3. predev/PREDEV_CONTEXT.md
4. predev/06_PRODUCT_BRIEF.md
5. predev/06_PRD.md
6. predev/07_HIGH_LEVEL_DESIGN.md
7. predev/07_MODULE_PATH.md
8. predev/03_RISK_REGISTER.md
9. （Brownfield）.dev-os/ROADMAP.md：既有 phase plan
10. （Brownfield）.dev-os/PHASE_PLAN.md：既有 phase plan

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可做 provisional readiness review
- verdict 標 Conditional / Not ready / Needs more artifacts

Task:
對目前 pre-development artifacts 做 P8 Readiness Gate review。
不要因為文件齊全就自動建議進 dev-os；嚴格判斷是否值得使用完整 dev-os。

Required output:
1. 每項給出 Pass / Weak / Fail / Unknown + 理由（4 大類共 16 項，見上面 checklist）
2. Recommendation: Proceed to P9 / Validate First / Prototype Only / Light dev-os / Park / Kill
3. Required Fixes Before P9
4. If Proceed to P9：列出 Bootstrap Bundle 應輸出的文件
5. If not Proceed：給 PX exit plan

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement:
你產生的 Copy-paste Next Prompt 必須符合 Section 4D。
如果你判斷 Proceed to P9，下一步 prompt 就是 P9 Bootstrap Export self-bootstrapping prompt。
如果你判斷 not Proceed，下一步 prompt 就是對應 PX self-bootstrapping prompt。
```

### 通過 P8 的條件

```text
problem 具體
target user 具體
MVP scope 清楚
non-goals 清楚
first vertical slice 清楚
module path 可描述
主要風險已知
dev-os overhead 合理
```

任一項為 Fail 通常不要進 P9。

---

## 15. P9 — Dev-os Bootstrap Export

### 進入條件

```text
P8 recommendation = Proceed to P9
已決定使用 dev-os
需要輸出 repo 初始化文件
```

### 目標

產出可放入新 repo 的 dev-os Bootstrap Bundle。

### Bootstrap Bundle 必須包含

```text
docs/PRODUCT_BRIEF.md              # 從 predev/06_PRODUCT_BRIEF.md 移過去
docs/PRD.md                        # 從 predev/06_PRD.md 移過去
docs/HIGH_LEVEL_DESIGN.md          # 從 predev/07_HIGH_LEVEL_DESIGN.md 移過去（brownfield 要 merge）
docs/MODULE_PATH.md                # 從 predev/07_MODULE_PATH.md 移過去（brownfield 要 merge）
.dev-os/DECISIONS.md               # 新建
.dev-os/ROADMAP.md                 # 新建
.dev-os/PHASE_PLAN.md              # 新建
.dev-os/NOW.md                     # 新建
.dev-os/config.yml                 # 新建
README.md                          # 新建 / 更新
```

### P9 self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- P8 已通過，現在執行 P9 Bootstrap Export
- 不要寫 production code
- 不要寫單一 module SPEC（SPEC 會在 dev-os S2 寫）
- Greenfield：寫到新 repo
- Brownfield：寫到既有 repo，與既有檔案 merge

Current State:
- 已完成：P8 Readiness Gate（通過）
- 現在要執行：P9 Dev-os Bootstrap Export
- 預期環境：IDE 必要

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（Section 15 P9 + Section 16 output contract）
2. predev/AGENTS.md
3. predev/PREDEV_CONTEXT.md
4. predev/06_PRODUCT_BRIEF.md
5. predev/06_PRD.md
6. predev/07_HIGH_LEVEL_DESIGN.md
7. predev/07_MODULE_PATH.md
8. predev/08_READINESS_GATE_REPORT.md
9. predev/03_RISK_REGISTER.md
10. （Brownfield）既有 docs/*：merge basis
11. （Brownfield）既有 .dev-os/*：merge basis（如果是重大 pivot）
12. （Greenfield）dev-os-starter/template/：bootstrap template(包含 predev/ 與 .dev-os/)

If any required file is missing:
- 列出 Missing Required Artifacts
- 不要跳過 P8 通過要求
- 缺 readiness gate report 時必須回到 P8

Task:
基於 P8 通過的 pre-development artifacts，輸出 dev-os Bootstrap Bundle。
每個檔案內容用獨立 markdown block 包起來，並標示檔案路徑。

Required output:
1. docs/PRODUCT_BRIEF.md
2. docs/PRD.md
3. docs/HIGH_LEVEL_DESIGN.md（brownfield 需 merge diff）
4. docs/MODULE_PATH.md（brownfield 需 merge diff）
5. .dev-os/DECISIONS.md
6. .dev-os/ROADMAP.md
7. .dev-os/PHASE_PLAN.md
8. .dev-os/NOW.md
9. .dev-os/config.yml
10. README.md（更新）
11. Copy Instructions（如何把這些放進 repo）
12. First dev-os Prompt（self-bootstrapping，給 IDE coding agent 用）
13. Expected dev-os State（S0 / S1 / S2 / S3，以及還缺什麼）

要求：
- 不要寫任何 production code
- 不要寫單一 module SPEC
- 所有 assumption / open question 必須保留
- ROADMAP 以 module 為單位
- PHASE_PLAN 必須包含 phase 與 wave
- NOW.md 指向第一個設計/工程任務，通常是第一個 module 的 SPEC 撰寫
- config.yml 中不知道的命令用 [待填]
- DECISIONS.md 只放重大 product / architecture decisions

At the end, output full `State Completion Packet`（Section 4B 12 項）。
本 state 完成後 Pre-dev workflow 結束；下一步轉到 dev-os AGENTS.md。

Self-enforcement:
第 12 項 First dev-os Prompt 必須符合 Section 4D self-bootstrapping 規範，
開頭明確列出 "Before answering, read these files first"，
讀的是 dev-os 的 AGENTS.md / WORKFLOW_PROTOCOL.md / config.yml / NOW.md / ROADMAP.md / PHASE_PLAN.md 等。
```

---

## 16. Bootstrap Output Contract

P9 輸出文件的最低結構要求。

### 16.1 docs/PRODUCT_BRIEF.md

```markdown
# PRODUCT_BRIEF.md
## One-liner
## Problem
## Target User
## Current Alternatives
## Proposed Solution
## MVP Goal
## Why Now / Why This
## Success Signals
## Non-goals
## Key Risks
## Open Questions
```

### 16.2 docs/PRD.md

```markdown
# PRD.md
## 1. Problem Statement
## 2. Goals
## 3. Non-goals / Out of Scope
## 4. Users
## 5. Core User Journey
## 6. Functional Requirements
## 7. Manual / Non-automated Parts for MVP
## 8. Data / Content Requirements
## 9. Privacy / Security / Compliance Notes
## 10. Acceptance Criteria
## 11. Success Metrics / Validation Signals
## 12. Risks and Open Questions
## 13. Dev-os Suitability Notes
```

### 16.3 docs/HIGH_LEVEL_DESIGN.md

```markdown
# HIGH_LEVEL_DESIGN.md
## Product Positioning
## Core Design Beliefs
## Primary User Journey
## System Overview
## Major Components / Engines / Interfaces
## Data Flow Overview
## Key Product and Technical Decisions
## Risks and Constraints
## Explicit Non-goals
## Open Questions
```

### 16.4 docs/MODULE_PATH.md

```markdown
# MODULE_PATH.md
## Module Map Overview
## Module List
| Module ID | Name | Purpose | Depends On | Enables | Phase | Wave | Notes |
|---|---|---|---|---|---|---|---|

## Dependency Graph
## Phase Plan Summary
## First Vertical Slice
## Module Boundaries
## Deferred Modules
## Open Questions
```

### 16.5 .dev-os/DECISIONS.md

```markdown
# DECISIONS.md
> ADR and product-level decisions.

## ADR-001: [Title]
- Date: [YYYY-MM-DD]
- Status: Accepted
- Context:
- Decision:
- Rationale:
- Trade-offs:
- Impacted Modules:
```

ADR 只記錄：

```text
影響超過一個模組的決策
改變難度高的決策
產品定位層級決策
資料模型 / 架構邊界決策
受外部約束影響的決策
```

### 16.6 .dev-os/ROADMAP.md

```markdown
# ROADMAP.md
## Current Phase
## Roadmap
| Module ID | Name | Phase | Wave | Status | Depends On | Notes |
|---|---|---|---|---|---|---|

## Phase Completion Criteria
## Deferred / Later Modules
## Notes
```

Status: `planned / speccing / specced / in-progress / done / deferred / blocked`

### 16.7 .dev-os/PHASE_PLAN.md

```markdown
# PHASE_PLAN.md
## Phase Overview
| Phase | Goal | User-visible Outcome | Waves | Exit Criteria |
|---|---|---|---|---|

## Phase 0: [Foundation / MVP Base]
### Goal
### Wave 0.1: [Wave Name]
#### Modules
#### Why these modules together
#### User-visible outcome after this wave
#### Exit criteria

## Phase Risks
## Replanning Rules
```

每個 wave 都必須回答：**完成後使用者多能做什麼一件事？**

### 16.8 .dev-os/NOW.md

```markdown
# NOW.md
## Current Focus
## Active Module
- Module ID:
- Name:
- State:

## Next Action
## Recommended Execution Location
## Copy-paste Prompt

```text
[下一步 self-bootstrapping prompt]
```

## Notes
```

### 16.9 .dev-os/config.yml

```yaml
version: 1

project:
  name: "[project-name]"
  workflow_mode: "standard"
  conversation_layout: "ide-only"
  current_phase: "[Phase 0]"
  current_wave: "[Wave 0.1]"

paths:
  roadmap: ".dev-os/ROADMAP.md"
  now: ".dev-os/NOW.md"
  decisions: ".dev-os/DECISIONS.md"
  phase_plan: ".dev-os/PHASE_PLAN.md"
  specs_dir: ".dev-os/specs"
  high_level_design: "docs/HIGH_LEVEL_DESIGN.md"
  module_path: "docs/MODULE_PATH.md"

commands:
  install: "[待填]"
  typecheck: "[待填]"
  lint: "[待填]"
  test: "[待填]"
  build: "[待填]"
  e2e: "[optional / 待填]"

git:
  policy: "main-direct"
  default_branch: "main"
  require_clean_worktree_before_spec: true

status_rules:
  roadmap_is_progress_source: true
  status_keeps_module_history: true
  acceptance_requires_evidence: true
  now_points_to_next_task_only: true

quality_gates:
  require_tests_before_done: true
  require_acceptance_evidence_before_done: true
  require_implementation_feedback: true
  require_status_sync: true
```

### 16.10 README.md

```markdown
# [Project Name]
## What this is
## Target User
## MVP Goal
## Current Phase
## Development Workflow

This project uses dev-os workflow. Start with:

```text
請依照 dev-os workflow 判斷下一步。
```

## Important Docs
- docs/PRODUCT_BRIEF.md
- docs/PRD.md
- docs/HIGH_LEVEL_DESIGN.md
- docs/MODULE_PATH.md
- .dev-os/ROADMAP.md
- .dev-os/NOW.md
- .dev-os/PHASE_PLAN.md
- .dev-os/DECISIONS.md
```

---

## 17. PX — Exit / Validate / Prototype / Park / Kill

PX 不是失敗。PX 是避免錯誤開工的安全出口。

### 17.1 PX Validate First

使用時機：

```text
問題 / 使用者 / 需求強度 / 付費意願 / channel 仍不明
但想法仍值得低成本驗證
```

產物 predev/PX_VALIDATE_FIRST.md：

```markdown
# PX_VALIDATE_FIRST.md
## Why not build yet
## Riskiest Assumptions
## Validation Tests
| Test | Cost | Timebox | Success threshold | Failure signal |
|---|---|---|---|---|

## Script / Landing Page / Interview Guide
## Decision After Validation
```

PX Validate First self-bootstrapping prompt：

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要寫正式開發程式
- 不要初始化 .dev-os
- pre-dev artifacts 寫到 predev/

Current State:
- 來自：（依上游 state，例如 P3）
- 現在要執行：PX Validate First
- 預期環境：Either

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md（Section 17.1）
2. predev/PREDEV_CONTEXT.md
3. predev/03_PROBLEM_USER_FRAME.md
4. predev/03_RISK_REGISTER.md
5. （Brownfield）既有 analytics / 訪談 / 客服紀錄

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可給 provisional plan，但要標明 evidence: none yet

Task:
請把目前想法轉成 PX Validate First plan。

Required output:
1. Why not build yet
2. Riskiest Assumptions
3. Validation Tests：每個 test 包含 cost / timebox / success threshold / failure signal
4. Interview Script / Landing Page Copy / Fake-door Test 設計
5. Decision After Validation：什麼結果進 P4/P5/P6，什麼結果 pivot / park / kill

限制：
- 不要建議正式開發
- 優先選 1-2 週內能完成的驗證

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement: 你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### 17.2 PX Prototype Only

使用時機：

```text
需要體驗或技術驗證
但不值得啟用完整 dev-os
可以接受 throwaway code
```

產物 predev/PX_PROTOTYPE_ONLY.md：

```markdown
# PX_PROTOTYPE_ONLY.md
## Prototype Goal
## What to Build
## What Not to Build
## Throwaway Rules
## Validation Criteria
## Timebox
## After Prototype Decision
```

PX Prototype Only self-bootstrapping prompt：

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4
- 這是 pre-development
- 不要初始化完整 .dev-os
- 可以寫 throwaway code
- artifacts 寫到 predev/

Current State:
- 來自：（依上游 state，例如 P5 或 P8）
- 現在要執行：PX Prototype Only
- 預期環境：IDE 必要

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md（Section 17.2）
2. predev/PREDEV_CONTEXT.md
3. predev/04_SOLUTION_STRATEGY.md（若存在）
4. predev/05_MVP_SCOPE_CONTRACT.md（若存在）
5. predev/03_RISK_REGISTER.md
6. （Brownfield）既有相關 stack docs

If any required file is missing:
- 列出 Missing Required Artifacts
- 仍可定義 provisional prototype

Task:
請把目前想法轉成 PX Prototype Only plan。
明確設計一個 throwaway prototype，而不是 production MVP。

Required output:
1. Prototype Goal
2. What to Build
3. What Not to Build
4. Throwaway Rules
5. Validation Criteria
6. Timebox
7. After Prototype Decision

限制：
- 不要建立完整 .dev-os
- 不要引入長期架構承諾
- 不要把 prototype 當 production base

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement: 你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

### 17.3 PX Park

使用時機：

```text
想法可能有價值
但現在時機、資源、證據或優先級不足
```

產物 predev/PX_PARK.md：

```markdown
# PX_PARK.md
## Why Park
## What is Preserved
## Conditions to Revisit
## Minimum Evidence Needed
## Re-entry State
```

### 17.4 PX Kill

使用時機：

```text
問題不明
需求弱
替代方案已足夠
成本明顯大於價值
不符合 dev-os 使用情境
```

產物 predev/PX_KILL.md：

```markdown
# PX_KILL.md
## Why Kill
## Evidence / Reasoning
## What We Learned
## Reusable Pieces
## Do Not Reopen Unless
```

### 17.5 PX Pivot

使用時機：

```text
原方向不成立
但過程中發現更好的 target user / problem / solution
```

產物 predev/PX_PIVOT.md：

```markdown
# PX_PIVOT.md
## Original Direction
## Why Pivot
## New Hypothesis
## What Carries Over
## What is Discarded
## Re-entry State
[P1 / P2 / P3]
```

PX Park / Kill / Pivot 都要遵守 Section 4B State Completion Packet + Section 4D self-bootstrapping prompt 規範。

---

## 18. Dev-os Suitability Rules

使用 dev-os 通常比較適合：

```text
預期 3+ 個月
模組數多
有複雜 domain / business logic
需要長期維護
AI coding agent 會大量參與
需要規格、驗收、回饋同步紀律
```

不一定適合完整 dev-os：

```text
一次性 demo
小於 1-2 週的 prototype
純靜態內容網站
單一腳本
純 CRUD 且邏輯簡單
尚未確定問題是否存在
只是想測試市場反應
```

替代選項：

```text
Light dev-os：只用 PRODUCT_BRIEF / PRD / ADR / simple roadmap
Prototype only：做 throwaway prototype
Validate first：先驗證需求
Park / Kill
```

---

## 19. Pre-dev 到 dev-os 的 handoff

### 19.1 P9 完成後的人工步驟

Greenfield：

```text
1. 建立新 repo
2. copy dev-os-starter/template/. 到 repo（包含 predev/ 與 .dev-os/）
3. 把 P9 輸出的文件放到對應路徑
4. 補 config.yml 裡的 commands
5. commit bootstrap files
6. 打開 IDE coding agent
7. 問「依照 dev-os workflow，下一步是什麼？」
```

Brownfield：

```text
1. 確認既有 repo 已有 AGENTS.md 與 .dev-os/
2. 把 predev/ 內的 06_PRODUCT_BRIEF.md / 06_PRD.md → docs/PRODUCT_BRIEF.md / docs/PRD.md
3. 07_HIGH_LEVEL_DESIGN.md / 07_MODULE_PATH.md → merge 進既有 docs/HIGH_LEVEL_DESIGN.md / docs/MODULE_PATH.md（不要直接覆蓋）
4. 把 P9 輸出的新 ADR 加進 .dev-os/DECISIONS.md
5. 把新 module 加進 .dev-os/ROADMAP.md 與 .dev-os/PHASE_PLAN.md
6. 更新 .dev-os/NOW.md 指向第一個新 module 的 SPEC 撰寫
7. predev/ 可以保留（作為決策歷史）或封存到 docs/predev-archive/
8. 問「依照 dev-os workflow，下一步是什麼？」
```

### 19.2 First dev-os Prompt

```text
請依照 dev-os workflow 判斷下一步。

Before answering, read these files first:
1. AGENTS.md
2. .dev-os/WORKFLOW_PROTOCOL.md
3. .dev-os/config.yml
4. .dev-os/NOW.md
5. .dev-os/ROADMAP.md
6. .dev-os/PHASE_PLAN.md
7. .dev-os/DECISIONS.md
8. docs/HIGH_LEVEL_DESIGN.md
9. docs/MODULE_PATH.md
10. docs/PRODUCT_BRIEF.md
11. docs/PRD.md

請不要直接寫程式。

請回覆：
1. 目前 dev-os workflow state
2. 判斷依據
3. 下一步執行位置
4. 可直接複製的完整 self-bootstrapping prompt
5. 執行前需要確認的文件
6. 完成後會產生 / 更新什麼
7. 完成後下一個 state
```

### 19.3 Handoff 後的常見狀態

```text
如果 bootstrap files 已完整，但第一個 module SPEC 還沒寫：通常是 S2
如果 NOW.md 還沒選 module：通常是 S1
如果 config / roadmap / HLD / module path 缺失：仍是 S0
如果第一個 module 四件套已經存在：可能是 S3
```

---

## 20. 可加入 AGENTS.md / README.md 的小型 routing rule

不要把整份 pre-dev system 塞進 `.dev-os/WORKFLOW_PROTOCOL.md`。

dev-os-starter 的 root `AGENTS.md` 應該包含一段 Pre-dev Router：

```text
如果使用者只有模糊產品想法，且尚未產出：
- docs/PRODUCT_BRIEF.md
- docs/PRD.md
- docs/HIGH_LEVEL_DESIGN.md
- docs/MODULE_PATH.md
- .dev-os/ROADMAP.md
- .dev-os/PHASE_PLAN.md

不要直接進入 dev-os S0 初始化。

請改讀：
1. predev/AGENTS.md
2. predev/PRE_DEV_NAVIGATOR.md
3. 使用者提供的 pre-dev artifacts 或現有 PREDEV_CONTEXT.md

如果專案已經初始化 .dev-os，且不是重大 pivot，回答「下一步」時不要讀 pre-dev 文件。
PRE_DEV_NAVIGATOR.md 只用於 repo 初始化前，或重大 pivot 時。
```

---

## 21. Minimal Mode：時間很少時怎麼跑

如果使用者不想跑完整 P0-P9，可以用 Minimal Mode。

### Minimal Mode self-bootstrapping prompt

```text
你是 dev-os-starter 的 Pre-development Navigator。

Workflow:
- 使用 PRE_DEV_NAVIGATOR.md v0.4 Minimal Mode（Section 21）
- 這是 pre-development
- 不要寫程式
- 不要初始化 .dev-os，除非通過 P8

Current State:
- 已完成：（未知 / 視提供內容判斷）
- 現在要執行：Minimal Mode triage
- 預期環境：Either

Before answering, read these files first:
1. predev/PRE_DEV_NAVIGATOR.md：workflow rules（Section 21 + Section 4B + Section 4D）
2. predev/PREDEV_CONTEXT.md（若存在）

If any required file is missing:
- 列出 Missing Required Artifacts
- Minimal Mode 仍可以 provisional 處理

Task:
請用 PRE_DEV_NAVIGATOR.md 的 Minimal Mode 幫我處理這個想法。
只做五件事：
1. 判斷目前 state
2. 找出最大風險
3. 建議 exit path：continue / validate first / prototype only / park / kill / bootstrap
4. 給我下一段 self-bootstrapping prompt
5. 輸出完整 State Completion Packet

限制：
- 不要產出完整 PRD，除非你判斷已經到 P6
- 不要進入 dev-os bootstrap，除非你判斷已經通過 P8
- 明確說現在不該做什麼

Raw input:

[貼上想法]

At the end, output full `State Completion Packet`（Section 4B 12 項）。

Self-enforcement: 你產生的 Copy-paste Next Prompt 也必須符合 Section 4D。
```

---

## 22. Quality Checklist for AI Output

AI 使用本文件時，每次回答都要自我檢查：

```text
是否判斷了 P-state？
是否判斷了 Greenfield / Brownfield？
是否判斷了目前執行環境（Web AI / IDE）？
是否說明判斷依據？
是否指出目前最大風險？
是否說明現在不該做什麼？
是否允許非 dev-os 出口？
是否輸出可直接複製的完整 self-bootstrapping prompt（Section 4D）？
  - 是否包含 "Before answering, read these files first"？
  - 是否包含 missing-file behavior？
  - 是否包含 task + required output？
  - 是否包含 State Completion Packet 要求？
  - 是否包含 self-enforcement clause？
是否輸出完整 State Completion Packet（12 項）？
是否說明完成後產物？
是否說明下一個 state？
是否做了 Context Handoff Check？
是否做了 Execution Environment Decision？
如果建議開新對話或切環境，是否輸出 New Conversation Startup Pack？
是否列出新對話 / 新環境要附上的文件？
是否列出不應帶到新對話的舊內容？
是否輸出或更新 PREDEV_CONTEXT.md？
是否避免把 assumption 寫成 fact？
是否避免直接寫程式？
```

如果缺少任一項，回答不合格。
