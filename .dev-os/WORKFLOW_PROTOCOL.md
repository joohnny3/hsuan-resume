# WORKFLOW_PROTOCOL.md — dev-os workflow state protocol (v0.5.4)

> This file is the single source of truth for "what is the next workflow step?"
> AGENTS.md gives the quick rules; this file gives the full spec.
>
> AI assistants read this together with `config.yml`, `STATE.md`, `NOW.md`,
> `ROADMAP.md`, and `PHASE_PLAN.md` before producing a next-step response.

---

## Required Inputs

1. `.dev-os/config.yml`
2. `.dev-os/STATE.md` — 即時儀表板(必讀第一份)
3. `.dev-os/NOW.md`
4. `.dev-os/ROADMAP.md`
5. `.dev-os/PHASE_PLAN.md`
6. `.dev-os/VISION.md` — 產品北極星(方向真相);回答「現在在 big picture 哪裡、為什麼做這個」。若不存在則略過

If `STATE.md` / `NOW.md` points to an active module, also read:

7. `.dev-os/specs/<module-id>/STATUS.md`
8. `.dev-os/specs/<module-id>/SPEC.md`
9. `.dev-os/specs/<module-id>/PROMPT.md`
10. `.dev-os/specs/<module-id>/ACCEPTANCE.md`
11. `.dev-os/specs/<module-id>/STEP_LOG.md` — 近 5 entries;舊的在 STEP_LOG_archive.md(預設不讀)
12. `.dev-os/specs/<module-id>/IMPLEMENTATION_FEEDBACK.md`,若存在

Missing file → report it, don't guess.

---

## Conversation Layout

Read `.dev-os/config.yml` `project.conversation_layout`:

- `ide-only`(預設):Design Sync 在同一 IDE/coding-agent thread。讀 `IMPLEMENTATION_FEEDBACK.md` 後決定是否更新 `DECISIONS.md` / `PHASE_PLAN.md` / `ROADMAP.md` / `NOW.md`
- `split`:Design Sync 時人類複製 Design Deltas table(必要時整份 `IMPLEMENTATION_FEEDBACK.md`)到外部設計對話

不要叫 `ide-only` 使用者把回饋複製到外部設計對話。

---

## Language(繁體中文強制)

**你產出的所有人類可讀內容一律用繁體中文** —— STEP_LOG packet 的敘述、STATE.md body 說明、NOW.md 的 focus / 指令 / 理由、handoff prompt 的每段內文、option 清單、blocker 描述、step 標題、ROADMAP 的 Name / Notes。chat 回覆也是繁中。

**只有「機器在解析的結構」保留英文 / 原樣**(翻掉會弄壞 `devos-status` 與儀表板工具的解析):

1. **STATE.md frontmatter 的 key** 全英文(`phase` / `wave` / `vision` / `module` / `workflow_state` / `current_step` …);`workflow_state` 的值是 state ID(`S9`)、`health_verdict` 的值(`Healthy` / `Approaching limit` / `Should switch`)保留英文。`vision` 區塊的 key(`stage` / `stage_name` / `total_stages`)保留英文,`stage` 值是數字字串(對應 VISION.md Stage Map)、`total_stages` 是整數,`stage_name` 值用繁中。其餘是敘述的值(`module_name`、`workflow_state_name`、step `title`)用繁中。
2. **STATE.md body 這幾個 section 標題**保留英文原字(dashboard 用字串比對定位):`## Step Summary`、`## Prior Step Summary`、`## Next Selection Options`、`## Blockers`(或 `Residual Risks`)。標題**底下的內容用繁中**。
3. **STEP_LOG**:`## Step #<N>` 的 `Step #<N>` 前綴、`**State**` / `**完成時間**` / `**Commit**` / `**產品影響**` 標籤、`### 1. Completed Step` ~ `### 11.` 這些 **packet 小標題名稱**保留原樣;**標題底下的內容用繁中**(`**產品影響**` 的值也是繁中,但 key 與「無,純工作流記帳」判定字串不可改)。
4. **ROADMAP 表格**:欄位標題(`Module ID` / `Name` / `Phase` / `Wave` / `Kind` / `Status` / `Depends On` / `Notes`)、`Status` 欄值(`done` / `in-progress` / `specced` / `planned` / `deferred` / `parked` / `dropped` 或對應 emoji)、`Kind` 欄值(`implementation` / `docs-only-spec` / `governance-decision`)保留英文;`Name` / `Notes` 用繁中(`Key finding:` 前綴保留、後面發現用繁中)。
5. 一律保留原樣:程式碼、commit message、檔名 / 路徑、CLI、設定 key、module ID(`M1.10`)、ADR ID(`ADR-010`)、state ID(`S0`–`S10`)、`module_kind` enum、英文技術識別字(如 `candidate_follow_up`、`result_payload.topFive`)。

**重點(這是過去沒做到的根因)**:**不要因為之前的 packet / docs 是英文就繼續用英文**。舊內容是英文**不構成**繼續英文的理由 —— 新產出一律繁中。上面第 5 點的技術識別字以外的句子,沒有「保留英文」的藉口。

---

## Module Kinds (v0.5.2)

每個 module 開出前必須先宣告 `module_kind`,寫進 SPEC.md 開頭與 STATUS.md。決定走的 state machine 路徑與最大 step 數。

### `implementation`

交付可被使用者或產品觀察到的新能力(新 UI、新 API、新 scoring、新 schema migration 檔、新 fixture file、新 test 覆蓋、新的本地工具)。走完整 S2 → S3 → S4 → S5 → S6 → S7 → S8 → S9。

**收尾合併(v0.5.3)**:S5(health check)與 S8(Design Sync)是有判斷價值的 gate,各自獨立做、不可省略或合掉。但中間的機械步驟 —— S6(SPEC backfill)、S7(status sync),以及 S8 在「確認無 ADR / 無策略變更」時的 no-op —— 在**沒有實質 delta** 時可以**合併成一個 step、一次跳多個 state**(例如一個 step 做完 S6 → S8),做法比照 `docs-only-spec` 的 S3 → S9 直跳。state 本身保留(稽核軌跡不變),只是不必為每個機械 hop 各寫一份完整 packet。若 health check 抓到問題、或 Design Sync 需要動 ADR,仍分開做。

### `docs-only-spec`

純規格 / 文件 / 邊界宣告,不交付執行能力。走縮短路徑 **S2 → S3 → S9**,**最多 2 個 step**:

1. Step 1(S2 → S3): 建 SPEC set
2. Step 2(S3 → S9): 接受 alignment + status sync(同一 step 合併,不分開)

跳過 S4–S8(沒實作、沒 health check、沒 backfill、沒 design sync)。不產 `IMPLEMENTATION_FEEDBACK.md`。不需要 `Copy-paste Next Prompt`(因為下一步就是 S1 選下一個 module 或進 phase 收尾)。

### `governance-decision`

ADR 級的決定(選哪條路、停 / 不停、phase 切換、不開新 module 的決議、park / unpark、roadmap reset)。**不開 module**,直接寫 `DECISIONS.md` 一個 ADR + 必要時更新 NOW.md / ROADMAP.md。最多 1 個 step。

---

### Module-kind gate(S1 升 S2 前必答)

選下一個 module 時,在升 S2(寫 SPEC)之前必須回答:

> **完成這個 module 後,使用者或產品多了哪個可被觀察到的新能力?**

判斷:

- 答得出「使用者看到 X」/「某 API 多了 Y」/「local fixture 存在了」/「某段 SQL 跑出 report」/「test 覆蓋多了 Z」 → `implementation` module,正常走 S2 → S9 full path。
- 答案是「更清楚知道什麼還不能做」/「再次宣告某 default 是 closed」/「為將來的 X 訂規則」 → **不開 module**。改寫成 `DECISIONS.md` 的 ADR(`governance-decision`),或寫進既有 SPEC 的新 section。
- 答案是「本地跑 SQL / 寫 fixture / 寫 analysis script」 → 若專案有 `LIVE_DEPLOYMENT_SAFETY.md` 三層模型,這多半是 L3 工作,**不需要 module**,直接做。

### 連續 boundary 偵測

若最近 **2 個** 完成的 module 都是 `docs-only-spec`,AI 在 S1 必須回應:

> 「最近 2 個 module 都是 docs-only-spec:[ID1], [ID2]。再開一個 docs-only-spec 違反 v0.5.2。請選 implementation module 或要求 roadmap reset。」

不可自動繼續切第三個 boundary doc。

**背景**:某個實測專案曾連續產出四個 docs-only boundary module,實際產品能力沒增加,Step counter 卻飆到 31。這條規則是 belt-and-suspenders,即使 module-kind gate 失誤也會在連續第二個 docs-only 時觸發強制停下。

---

## State Machine

### S0: dev-os not initialized
- Signals: config 缺/placeholder、ROADMAP 空、NOW 沒指向具體任務、HLD/MODULE_PATH 缺
- Next: 完成初始化(config、roadmap、now、phase plan、核心 docs)

### S1: no next module selected
- Signals: NOW 沒 active module、ROADMAP 有 planned modules、設計者未確認下一個
- Next:
  1. 應用 **module-kind gate**(見上節):若答不出「新能力」,**不開 module**,改用 ADR 或寫進既有 SPEC
  2. 應用 **連續 boundary 偵測**:若最近 2 個 done module 都是 `docs-only-spec`,強制要求 implementation 或 roadmap reset,不可繼續切
  3. 通過上述兩道 gate → 決定下一個模組,更新 NOW,在 NOW.md 與 SPEC.md 標明 `module_kind`

### S2: module selected, SPEC incomplete
- Signals: NOW 指向 module、SPEC 缺或 Lite/Standard/Strict 不完整、`module_kind` 已宣告
- Next: 寫 SPEC set(或 mode B 寫 SPEC_GUIDE)。SPEC.md 第一段必須有 `module_kind: <implementation | docs-only-spec>`
- 路徑分歧:
  - `implementation` → 走完整 S3 → S4 → S5 → S6 → S7 → S8 → S9
  - `docs-only-spec` → S3 → S9 直跳,**最多 2 個 step**,不產 IMPLEMENTATION_FEEDBACK.md

### S3: SPEC complete, pre-implementation alignment not done
- Signals: 四件套存在、STATUS 是 `specced`、無實作 commit、未做 alignment 回應
- Next: IDE/coding agent 跑 `<module-id>/PROMPT.md`,讀檔回報理解,**等 human 確認再動工**

### S4: aligned and in progress
- Signals: STATUS 是 `in-progress`、有部分實作、acceptance 未全過
- Next: 依 PROMPT.md 實作,小步 commit(`git.auto_commit_per_step: true` 自動),跑相關測試

### S5: implementation complete, health check not done
- Signals: 功能看似完成、acceptance 大致過、無 `IMPLEMENTATION_FEEDBACK.md`
- Next: 跑 Prompt 1 健康檢查,產出 `IMPLEMENTATION_FEEDBACK.md` 含 Design Deltas

### S6: health check done, SPEC backfill not done
- Signals: feedback 存在、SPEC 未回填 deltas 與 Open Questions 答案
- Next: 跑 Prompt 2 SPEC backfill

### S7: SPEC backfilled, status not synced
- Signals: SPEC 已更新、ROADMAP/STATUS/ACCEPTANCE/NOW 未同步
- Next: 跑 Prompt 3 狀態同步

### S8: status synced, Design Sync not done
- Signals: ROADMAP/STATUS done、ACCEPTANCE 有證據、NOW 更新、但 IMPLEMENTATION_FEEDBACK 未被設計角色吸收
- Next: 依 `conversation_layout` 跑 Design Sync
- 收尾合併(v0.5.3):S6 → S7 → S8 若無實質 delta,可由同一個 step 一次跳完(見 Module Kinds 的 `implementation` 收尾合併)。S5 health check 與「有 delta 的 Design Sync」仍各自獨立

### S9: module fully complete, waiting for next module
- Signals: Design Sync 完(`implementation` module)或 alignment 接受完(`docs-only-spec` module)、無 active task
- Next: 回到 S1 跑 module-kind gate + 連續 boundary 偵測,選下一個 module
- **「繼續」特例(v0.5.2)**:S9 + `NOW.next_module` 為空時,「繼續」**不可自動選** safe default(包括 park、再切一個 docs-only-spec、auto-pick lowest-risk module)。AI 必須列出選項清單,等使用者明說「選 X」才推進。若專案有 `VISION.md`,每個選項要標明推進哪個 Stage、屬主引擎還是側支。詳見下方「繼續」指令段。

### S10: phase completion candidate
- Signals: 本 phase 核心模組全 done、phase user story 未驗收、retrospective 未做
- Next: phase demo 驗收 → retrospective → 更新回顧文件

---

## Debug Protocol Trigger

進入 bug-fix 循環時不要繼續正常 S4。改用 `PROMPT_LIBRARY.md` Debug Protocol:

- 同一 issue 改了 ≥2 次未解
- 修 A 壞 B,或修 B 又把 A 弄回來
- 開始問「為什麼又壞了?」
- 懷疑 AI 在瞎猜

Debug protocol 暫停 source 編輯,要求重現、根因假設、影響範圍、回歸保護,等確認。

---

## Three Output Modes

控制 chat 體積。**預設 Tick**;只在 step 完成或要換對話時升 Step Complete / Handoff。

### Mode A — Tick(預設)

何時:任何小步驟完成(讀檔、跑測試、改一段 code、補欄位、評估)。**無跨 workflow state**。

Chat 輸出(5-10 行):

```text
✅ [這一步做了什麼,1-3 個 bullet]

🚧 Blockers (若有,沒有就省略整段)
- [blocker]

👉 下一步:[一行]
   說「繼續」我直接做。詳見 .dev-os/STATE.md。
```

檔案動作:
- **一定**:覆寫 `.dev-os/STATE.md`(若 `git.auto_commit_per_step: true` 且有變動,同 commit 帶上)
- **不做**:STEP_LOG.md append、完整 packet、完整 next prompt

### Mode B — Step Complete

何時:剛完成 state-machine 轉換(S2→S3、S5→S6、S7→S8 等)。

Chat 輸出(10-15 行):

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

檔案動作:
- 覆寫 STATE.md
- Append 完整 11 項 packet 到 `.dev-os/specs/<id>/STEP_LOG.md`(template 見 `templates/STEP_LOG.template.md`)
- 若 STEP_LOG.md 超過歸檔門檻,先做歸檔(見下方「STEP_LOG.md 歸檔規則」)
- 若 `git.auto_commit_per_step: true` 且有變動 → 自動 commit
- 不印完整 Copy-paste Next Prompt(除非 Verdict = Should switch,升 Mode C)

### Mode C — Handoff

何時:Thread Health Verdict = `Should switch`,或使用者明說要換對話 / 開新 thread / 帶到外部設計對話。

Chat 輸出:Mode B 全部 + 額外:

```text
⚠️ 建議換對話
理由:[Thread Health 觸發條件,例如「剛完成 SPEC 固定,下一步是 implement 模式不同」]

下次貼這段到新對話:
```text
[完整 9-segment self-bootstrapping prompt]
```
```

檔案動作:Mode B 全部 + 寫入 `.dev-os/HANDOFF_PROMPT.md`(覆寫)。

---

## 「繼續」指令

預設語意:**AI 用判斷推進,不要問**。

觸發詞(任一):`繼續` / `next` / `continue` / `go` / `next step`(大小寫、空格、emoji 不限)。

AI 行為:
1. 讀 STATE.md 確認當前 step 與下一步預測
2. 若上一輸出有 Blockers 段且 blocker 未解 → **不要硬上**,改回:「上一步 blockers 仍未解:[列]。請先處理。」
3. Blockers 解了或沒有 → 直接做下一步
4. 完成後依規則輸出 Tick / Step Complete / Handoff

例外:
- STATE.md 不存在 → 不能用「繼續」,要求使用者提供完整 prompt 或先建立 STATE.md
- 下一步影響超出 module scope(改 schema、刪檔)→ 必須先一行 confirm 再做
- Verdict = Should switch → 不執行下一步,直接 Mode C Handoff
- **S9 + `NOW.next_module` 為空(v0.5.2)** → 不可自動選 next module(包括 park、roll back、再切 docs-only-spec、auto-pick lowest-risk)。AI 必須:
  1. 列出所有合理選項(implementation module、roadmap reset、close phase、park)
  2. 對每個選項標明 `module_kind` 與是否會升 L1 production(如專案有 LIVE_DEPLOYMENT_SAFETY.md)
  3. **若專案有 `VISION.md`**:對每個選項標明它推進哪個 **Stage**(對應 Stage Map),以及屬於**主引擎**還是**側支**(若 VISION.md 有「主引擎 vs 側支」段)。讓使用者看得到每條路在 big picture 的位置,而不是只看到 workflow 機制。
  4. 等使用者明確輸入「選 X」/「選 implementation 模組 Y」才推進
  5. **park 也要明說**;不可把 park 當成 silent default
- **連續 boundary 觸發**:S9 完成且最近 2 個 done module 都是 `docs-only-spec` → AI 在「繼續」回應裡必須拒絕自動推進,要求使用者選 implementation 或 roadmap reset

---

## STATE.md — Live Dashboard

`.dev-os/STATE.md` 是 step 級即時真相。AI 每個 step 結尾覆寫;每個 step 開頭讀。

### 規格

YAML frontmatter(機器可讀)+ markdown body(人可讀)。AI 必須兩部分都更新。

```markdown
---
phase: "Phase 1 — MVP-WOW"
wave: "Wave 1"
vision:
  stage: "1"
  stage_name: "測驗診斷後台"
  total_stages: 4
module: "M1.0"
module_name: "Live-safe metadata preservation"
workflow_state: "S3"
workflow_state_name: "SPEC complete, pre-implementation alignment not done"
branch: "main"
last_update: "2026-05-27T14:30:00+08:00"
conversation:
  date: "2026-05-27"
  thread_n: 3
  messages_estimate: 12
  health_verdict: "Healthy"
current_step:
  n: 8
  title: "Gate check before implementation"
  location: "same conversation"
  started_at: "2026-05-27T14:30:00+08:00"
last_step:
  n: 7
  title: "Read all 20 required files"
  commit: "(no changes)"
  completed_at: "2026-05-27T14:28:00+08:00"
next_step:
  n: 9
  title: "Wait for human authorization + storage target"
  location: "same conversation"
blockers:
  - "Authorization line is still [待填]"
---

# STATE.md — 開發進度即時儀表板
[人類可讀摘要 — module progress / recent commits / blockers / next step notes]
```

### 寫入規則(step 結束時)

1. **完整覆寫** STATE.md(不是 append)
2. 更新 `last_update` 為當下 ISO timestamp
3. 重新評估 `conversation.health_verdict`
4. `current_step` 推進為剛完成的;`last_step` 推進;`next_step` 重新預測
5. Blockers 未解的留著
6. **保留 `vision:` 區塊**(覆寫時不可漏掉)。值維持與 `VISION.md` Stage Map 對齊;只有在「完成某 stage 的關鍵 deliverable、確實推進到下一 stage」時才改 `stage` / `stage_name`,並同步更新 `VISION.md` 對應 checkbox。若無 `VISION.md`,可省略整個 `vision:` 區塊。

### 讀取規則(step 開始時)

1. 讀 YAML frontmatter
2. 若缺欄位或 `last_update` 比 git HEAD 還舊 → 提示 STATE.md 需重建

---

## STEP_LOG.md — Per-Module Append-Only History

每個模組有一份 `.dev-os/specs/<module-id>/STEP_LOG.md`。Append-only。

### 寫入規則

- **只在 Step Complete / Handoff 模式 append**(Tick 不 append)
- 一個 entry = 完整 11 項 packet
- Append,絕對不刪舊 entry(歸檔由下方規則處理)
- 模組第一個 step 時建檔(從 `templates/STEP_LOG.template.md` 複製)

### 歸檔規則(v0.5.1 新增)

避免 STEP_LOG.md 無限長拖累每步 context。觸發任一條件時,AI 在 append 新 entry **之前** 先做歸檔:

- entry 數 > 5
- 或檔案行數 > 600

歸檔動作:
1. 把最舊的 entry(們)移到 `STEP_LOG_archive.md`(若不存在則建立),append 在末尾
2. STEP_LOG.md 保留**最近 5 entries**
3. 在 STEP_LOG.md 頂部備註:「先前 entries 已歸檔到 STEP_LOG_archive.md」
4. 歸檔本身不需要 Step Complete packet,但需要在 STATE.md 的 markdown body 加一行記錄

讀取規則:
- 預設讀 `STEP_LOG.md`(近 5 entries)
- **不讀** `STEP_LOG_archive.md`,除非使用者明確問「這個模組之前試過什麼」或 debug 需要
- AGENTS.md 必讀清單只列 STEP_LOG.md,不列 archive

### Packet 11 項格式

每個 entry 寫入 STEP_LOG.md 時用以下格式(範本完整版在 `templates/STEP_LOG.template.md`):

```md
## Step #<N> — <one-line title>

**State**: <SX> [→ <SY>]（機械 hop 合併時可記多段跳轉,如 `S6 → S8`)
**完成時間**: <ISO timestamp>
**Commit**: <hash 或 none>
**產品影響**: <一句話產品變更,或「無,純工作流記帳」>

### 1. Completed Step
### 2. Completion Evidence (檔案、commit、acceptance、測試)
### 3. Step Summary (3-7 bullets)
### 4. Recommended Next Step
### 5. Why This Next Step
### 6. Next Step Execution Location
### 7. Files / Artifacts Reference List
### 8. Copy-paste Next Prompt (只 Handoff 模式填,否則寫 "Not generated")
### 9. Thread Health Check
### 10. Context Handoff Decision
### 11. New Conversation Startup Pack (若 #10 不是 New 系列,寫 Not needed because ...)
```

**`**產品影響**` 規則(v0.5.4)**:這一行是給儀表板工具抽「這步對產品的意義」用的,目的是讓人從儀表板一眼看出哪些 step 真的改了使用者看得到的東西,哪些只是工作流記帳。

- 有產品行為變更(新 UI/欄位/API/scoring/migration 等使用者或資料看得到的改變):寫**一句**白話的能力描述,例「結果頁新增 1-5 準確度回饋與自評信心」。`## Step` 標題也盡量用這種產品語言。
- 純工作流步驟(status sync / SPEC backfill / Design Sync / health check / alignment / 純 docs 整理等沒有產品行為變更):寫 `無,純工作流記帳`。dashboard 會把這類 step 自動降權收起,不要為了好看而誇大成產品變更。
- `**產品影響**` 這個 key 與「無,純工作流記帳」這個判定字串不可改名 / 翻譯(dashboard 靠字串比對)。

---

## Auto-Commit Per Step

`config.yml` 的 `git.auto_commit_per_step` 與 `git.auto_push` 控制。

### auto_commit_per_step: true(建議預設)

任何 step 結束時若 working tree 有變動,AI:

1. 把 STATE.md / STEP_LOG.md / STEP_LOG_archive.md 與這個 step 改到的檔案 **合併在同一 commit**
2. 訊息格式:
   ```
   <type>(<module-id>): step <N> - <one-line summary>

   - [bullet]
   - [bullet]

   STATE: <SX> -> <SY> (or same)
   ```
3. type:`feat` / `fix` / `docs` / `chore` / `wip`

### auto_push: false(新專案建議預設)

即使 auto_commit_per_step: true,也**不自動 push**。原因:
- live deployment branch 需明示 push
- PR 流程需使用者決定何時開
- 平行 AI session 場景避免 race

使用者明說 `push` / `推上去`,AI 才推。

### auto_push: true

專案明確設 `auto_push: true` 時(代表已確認 push 不會觸發部署,例如 deploy 只綁 production branch、preview 已關):

- 每個 step 的 commit 完成後,自動把**當前分支**push 到它的 origin upstream(首次無 upstream 用 `git push -u origin <branch>`)。
- **安全鐵則:絕不自動 push `git.default_branch` / live branch(如 `master`)**。若 HEAD 正好在 live branch 上,跳過 auto-push,要求使用者明確授權 —— 仍受 `direct_push_to_live_branch_allowed: false` 管。
- auto-push 只推 commit,不開 PR、不 merge。

### Squash 選項(模組 done 時)

使用者說「整理 commit」時,AI 可看本模組所有 `wip(<module-id>)` commit 並提供 squash 建議。**不直接動手** — squash 屬 destructive,需確認。

---

## Thread Health Check

每個 Mode B / C 輸出必須包含。Mode A 只在 STATE.md frontmatter 更新 `health_verdict`,不在 chat 印。

### 門檻

```text
- 預估對話訊息數: [N]
  - <15: Healthy
  - 15-30: 中等
  - 30-50: 偏長
  - >50: 強烈建議換 (Should switch)
- 已放棄方向 / 失敗 attempts: [N]
  - 0-1: OK
  - 2: 中等
  - >=3: 污染風險高 (Should switch)
- AI 是否開始重複自己 / 忘記既有限制: [Yes / No]
- 下一個任務是否真的換認知模式 (implement↔design 且 split layout、或 進/出 Debug Protocol): [Yes / No]
  - 同一 module 內 S3→S4→S5→S6→S7→S8 都是同一個 context,一律填 No
- 是否整個 module 完成 (進 S9) 或 phase 收尾: [Yes / No]
  - 只完成 module 內某個中間 artifact (SPEC backfill、status sync) 不算,填 No
```

### Verdict 規則

任一成立 → **Should switch**:
- 訊息數 > 50
- 失敗 attempts ≥ 3
- AI 開始重複自己 / 忘記既有限制 = Yes
- 下一個任務真的換認知模式 = Yes(implement↔design 且 `conversation_layout: split`、或 進/出 Debug Protocol)
- 整個 module 完成(進 S9)或 phase 收尾 = Yes

否則:
- 訊息 25-50 或 失敗=2 → **Approaching limit**
- 其餘 → **Healthy**

**v0.5.3 關鍵修正**:同一 module 內的中間 state 轉換(S3→S4→S5→S6→S7→S8,含 health check / SPEC backfill / status sync / Design Sync)**不算**換對話理由,預設留在同一對話。理由:這些步驟共用同一批 context(同一個 module、同一組數字、同一組 guardrail),step 名字不同不代表 context 換了;且 dev-os 已把狀態落盤到 STATE.md / STEP_LOG / NOW,module 內換對話的邊際收益低、摩擦高。只有「整個 module 完成(S9)」或「真的換認知模式」才升 Should switch。

> 背景:v0.5 舊規則把「任務型態明顯不同」「剛完成核心 artifact 固定」當硬性 Should switch。實測中曾有一個 module(7 個 step)被迫換 6 次對話,其中 4 次發生在對話僅 8–12 則訊息時(門檻是 >50)。根因:判定比的是 step 的「名字」變了,不是 context 真的換了。

### 行為對照

- **Should switch** → 必須升 Mode C Handoff,**不執行下一步**
- **Approaching limit** → 再做一個 Tick / Step Complete,下一個 step boundary 升 Mode C
- **Healthy** → 預設 Tick,step boundary 升 Step Complete

---

## Self-Bootstrapping Prompt Contract

Mode C Handoff 印的 Copy-paste Next Prompt 必須符合:貼到任何乾淨對話/IDE thread,AI 都能在不需其他附加說明下知道讀什麼、做什麼、輸出什麼。

**段內文字一律用繁體中文**(handoff prompt 不被 dashboard 解析,所以除了 code / 檔名路徑 / CLI / state ID / module ID / config key 之外,全部用繁中寫)。9 段的結構保留,但段名後的內容用繁中。

必備 9 段:

```text
1. Role / workflow version (e.g. "你是 dev-os AI 助手, using .dev-os/WORKFLOW_PROTOCOL.md v0.5.4")
2. Workflow constraints (no production code without alignment, git policy, acceptance gates, live deployment safety...)
3. Current state (從 STATE.md:phase / wave / module / workflow_state / last_step / current_step)
4. Before answering, read these files first (明確路徑 + 用途,**第一筆務必 STATE.md**)
5. Missing-file behavior
6. Task (本 step 任務)
7. Required output (預設 Tick 模式,blockers 解了再升 Step Complete)
8. Required final Step Completion Packet (只在 step boundary 才要求;預設「依模式判斷」)
9. Self-enforcement clause (你產生的下一個 prompt 也必須符合本 contract)
```

---

## Rescue Prompt(AI 只說「done」時)

```text
你上一個回答完成了工作,但沒有依 dev-os v0.5.4 三模式輸出。

請依 `.dev-os/WORKFLOW_PROTOCOL.md`:

1. 判斷剛才這一步是 Tick / Step Complete / Handoff
2. 覆寫 `.dev-os/STATE.md`(YAML frontmatter + markdown body)
3. 若是 Step Complete / Handoff,把 11 項 packet append 到 `.dev-os/specs/<module-id>/STEP_LOG.md`(必要時先做歸檔)
4. 若 `git.auto_commit_per_step: true` 且有檔案變動,做結構化 commit
5. 在 chat 印對應模式的精簡輸出(Tick = 5-10 行 / Step Complete = 10-15 行 / Handoff 才印完整 prompt)

不要重做剛才的工作,只補 workflow handoff。
```
