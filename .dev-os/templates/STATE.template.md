---
phase: "[Phase X — name]"
wave: "[Wave Y — name]"
vision:
  stage: "[目前 Stage 編號,對應 VISION.md Stage Map]"
  stage_name: "[目前 Stage 名稱]"
  total_stages: 0
module: "[module-id]"
module_name: "[module name]"
workflow_state: "[SX]"
workflow_state_name: "[state name]"
branch: "[branch-name]"
last_update: "[YYYY-MM-DDTHH:MM:SS+TZ]"
conversation:
  date: "[YYYY-MM-DD]"
  thread_n: 1
  messages_estimate: 0
  health_verdict: "Healthy"
current_step:
  n: 0
  title: "[一行描述]"
  location: "same conversation"
  started_at: "[ISO timestamp]"
last_step:
  n: 0
  title: "(none yet)"
  commit: "(none)"
  completed_at: "(n/a)"
next_step:
  n: 1
  title: "[預測下一步]"
  location: "same conversation"
blockers: []
---

# STATE.md — 開發進度即時儀表板

> 此為 STATE.md 的乾淨範本。複製到 `.dev-os/STATE.md` 後填值,然後 commit。
> AI 之後每個 step 結尾會覆寫此檔。

---

## 當前狀態

- **Phase**: [Phase X — name]
- **Wave**: [Wave Y — name]
- **Module**: [module-id] — [module name]
- **Workflow State**: [SX] — [state name]
- **Branch**: [branch-name]
- **Conversation**: [date] thread #1 (0 messages, Healthy)
- **Last update**: [ISO timestamp]

## 當前 Step

- **#0**: [一行描述]
- **執行位置**: same conversation
- **開始**: [ISO timestamp]

## 上一個 Step

- **#0**: (none yet)
- **Commit**: (none)
- **完成**: (n/a)

## 下一個 Step (預測)

- **#1**: [預測下一步]
- **執行位置**: same conversation

## Blockers

- none

## Module Progress

- [module-id]: 0 / 估 ? steps
- Acceptance: (pending)

## Recent commits (本模組,最近 5 個)

- (none yet)
