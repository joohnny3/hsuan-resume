# COMMANDS.md — dev-os 操作指令

> 這份文件定義本專案如何用「固定命令」操作 dev-os。即使目前沒有完整 CLI,也應把下列動作當成標準作業。

---

## 核心命令

### `devos init`

用途:專案第一次採用 dev-os 時執行。

應做的事:
- 確認 `.dev-os/config.yml` 已填寫
- 確認 `docs/HIGH_LEVEL_DESIGN.md` 與 `docs/MODULE_PATH.md` 已建立
- 確認 `ROADMAP.md`、`PHASE_PLAN.md`、`NOW.md` 已去除 placeholder
- 確認 git policy 符合本專案實際分支策略

---

### `devos new-spec <module-id>`

用途:建立新模組 SPEC。

Standard 模式應建立:
- `.dev-os/specs/<module-id>/SPEC.md`
- `.dev-os/specs/<module-id>/PROMPT.md`
- `.dev-os/specs/<module-id>/ACCEPTANCE.md`
- `.dev-os/specs/<module-id>/STATUS.md`

Lite 模式可只建立:
- `.dev-os/specs/<module-id>/MINI_SPEC.md`

Strict 模式需額外確認:
- 相關 ADR 是否已存在
- 是否影響 phase demo
- 是否需要更新 `PHASE_PLAN.md`

---

### `devos close-spec <module-id>`

用途:模組完成時的標準收尾。

必做:
1. 健康檢查與偏離整理
2. SPEC 回填
3. 狀態同步

狀態同步至少包含:
- `ROADMAP.md`
- `STATUS.md`
- `ACCEPTANCE.md`
- `NOW.md`

是否 commit / push / 使用 branch / 開 PR,依 `.dev-os/config.yml` 的 `git.policy` 決定。預設 `main-direct` 不需要 PR。

---

### `devos status`

用途:在終端機印出當前開發進度儀表板。讀 `.dev-os/STATE.md` (YAML frontmatter) 與 `.dev-os/ROADMAP.md` (狀態 emoji),產出一頁式摘要。

輸出包含:
- 當前 Phase / Wave / Module / Workflow State / Branch
- 上一個 step、當前 step、下一個 step(以及對應 commit)
- Blockers(若有)
- Conversation 健康度(thread #N、訊息估計、verdict)
- ROADMAP 各 Phase 完成度進度條:
  - 若 ROADMAP 表格有 `種類`/`Kind` 欄(v0.5.2)→ 拆成 **Impl** 與 **Docs** 兩條 bar,並印 composition(例:`1 impl · 5 docs · 1 deferred`),破除「docs 寫完 = phase 完成」的幻覺。`implementation` 要 `done` 才算完成;`docs-only-spec` 在 `specced` 即算完成。
  - 若沒有 `種類`/`Kind` 欄 → fallback 單條 bar(✅ 完成數 / 加總 ✅⬜📝🔨🅿️,❌ dropped 與 deferred 不計入分母)
- 最近 5 個 git commit(若 root 是 git repo)

Placeholder 處理:若 STATE.md 還沒被覆寫(只有 template placeholder),會顯示「尚未初始化」並仍嘗試印出 ROADMAP 進度。

額外旗標:
- `-Watch` — 進入持續刷新模式(類似 `top`),含 activity spinner、ANSI 顏色、alt-screen buffer。STATE.md / ROADMAP.md mtime 變化即時 re-parse。Ctrl+C 結束會還原終端。
- `-RefreshMs <int>` — watch 模式刷新間隔(預設 250ms)
- `-Json` — 機器可讀格式,方便將來餵給 web dashboard / 靜態 HTML / CI 摘要
- `-NoColor` — 關閉 ANSI 顏色(pipe / log file 時自動建議加)
- `-Root <path>` — 指定不同的 repo root(預設當前目錄)

Activity glyph 邏輯(State 行右側):
- `⠋⠙⠹...`(綠色動畫 spinner)— last_update < 5 分鐘,代表正在活躍開發
- `●`(黃色靜態)— 5 分鐘到 1 小時,最近有動但不是當下
- `○`(灰色靜態)— 超過 1 小時,可能 idle 或 thread 已切換

PowerShell 版本範例在 `.dev-os/tools/devos-status.ps1`。

---

### `devos doctor`

用途:檢查 dev-os 文件是否失真。

最少檢查:
- 必要檔案是否存在
- `.dev-os/config.yml` 是否還有 placeholder
- `NOW.md` 是否指向已完成模組
- 每個 Standard / Strict spec 是否有四件套
- done 模組是否有 `IMPLEMENTATION_FEEDBACK.md`
- `ACCEPTANCE.md` 是否有驗收證據
- `ROADMAP.md` 完成度統計是否需要重算

PowerShell 版本範例在 `.dev-os/tools/devos-doctor.ps1`。

---

### `devos context <module-id>`

用途:打包某個模組給 AI 助手的必要上下文。

建議輸出:
- `.dev-os/config.yml`
- `.dev-os/DECISIONS.md`
- `.dev-os/PHASE_PLAN.md`
- `.dev-os/ROADMAP.md`
- `.dev-os/specs/<module-id>/SPEC.md`
- `.dev-os/specs/<module-id>/PROMPT.md`
- `.dev-os/specs/<module-id>/ACCEPTANCE.md`
- 相關既有 SPEC 或 IMPLEMENTATION_FEEDBACK

---

## 手動 fallback

如果沒有 CLI 或 script,照樣可以執行 dev-os。差別只是人工照著上面的命令定義逐項檢查。

不要把「沒有工具」當成跳過流程的理由。也不要把「有工具」當成不用判斷的理由。
