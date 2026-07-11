# PREDEV_CONTEXT.md

> 跨對話最小記憶文件。把它當成 navigator 與各 state artifacts 的「地圖」。
> 新對話 / 新環境啟動時，先讀本文件，再讀指定 artifact。
> 不要把整段舊聊天當記憶——讓 artifact 與本文件當記憶。
>
> Filename：在實際專案中重新命名為 `PREDEV_CONTEXT.md`（去掉 `.template`）。
> 通常放在 `predev/PREDEV_CONTEXT.md`。

---

## Current Pre-dev State
[P0 / P1 / P2 / P3 / P4 / P5 / P6 / P7 / P8 / P9 / PX]

## Greenfield / Brownfield
[Greenfield / Brownfield / Mixed]
[若 brownfield，列出既有專案根路徑與相關 module]

## Current Execution Environment
[Web AI / IDE]
[若是 IDE，記錄 IDE 類型（Claude Code / Cursor / 其他）與 repo 路徑]

## Project / Idea One-liner
[目前最準的一句話。不要寫成行銷文案，寫成可被測試的假設。]

## Current Direction
[目前選擇探索的方向。如果有多個方向被比較過，記在 Discarded Directions。]

## Target User
[目前主要使用者假設。如果還是泛指，明說「仍為 hypothesis」。]

## Problem Statement
[目前問題定義。不要寫「提升效率」這種口號；寫成具體 user-situation-pain 三件組。]

## Current Strategy / MVP
[若已存在。包含：first user outcome、in scope、out of scope、acceptance signals。]

## Decisions Made
- [已確定的產品 / scope / validation / dev-os suitability 決策。每條一句話。]
- [...]

## Explicitly Not Doing / Discarded Directions
- [已放棄或暫緩的方向，避免新對話重新打開]
- [每條附一句「為什麼不做」]
- [...]

## Important Assumptions
- [仍是 assumption，不可寫成 fact]
- [每條附「驗證方法」或「驗證 timebox」]
- [...]

## Open Questions
- [最重要未解問題]
- [每條附「為什麼重要」與「建議預設答案」]
- [...]

## Artifacts Produced

| Artifact | State | Path | Purpose | Current? |
|---|---|---|---|---|
| 01_IDEA_SNAPSHOT.md | P0 | predev/01_IDEA_SNAPSHOT.md | 原始想法整理 | yes |
| 02_IDEA_CANVAS.md | P1 | predev/02_IDEA_CANVAS.md | 方向收斂 | yes |
| 03_PROBLEM_USER_FRAME.md | P2 | predev/03_PROBLEM_USER_FRAME.md | 問題與使用者 | yes |
| 03_RISK_REGISTER.md | P3 | predev/03_RISK_REGISTER.md | 風險盤點 | yes |
| 04_SOLUTION_STRATEGY.md | P4 | predev/04_SOLUTION_STRATEGY.md | 解法策略 | yes |
| 05_MVP_SCOPE_CONTRACT.md | P5 | predev/05_MVP_SCOPE_CONTRACT.md | MVP scope | yes |
| 06_PRODUCT_BRIEF.md | P6 | predev/06_PRODUCT_BRIEF.md | Product brief 草案 | yes |
| 06_PRD.md | P6 | predev/06_PRD.md | PRD 草案 | yes |
| 07_HIGH_LEVEL_DESIGN.md | P7 | predev/07_HIGH_LEVEL_DESIGN.md | HLD 草案 | yes |
| 07_MODULE_PATH.md | P7 | predev/07_MODULE_PATH.md | Module path 草案 | yes |
| 08_READINESS_GATE_REPORT.md | P8 | predev/08_READINESS_GATE_REPORT.md | Readiness verdict | yes |

> 註：標 `Current?` 為 `yes` 代表這份 artifact 仍代表最新決策；標 `no` 代表已過時但保留作為歷史參考。

## Existing Project Files Referenced（Brownfield）

如果是 brownfield，列出 pre-dev 過程中讀過的既有專案檔案：

| File | 為什麼讀 | Last referenced state |
|---|---|---|
| docs/HIGH_LEVEL_DESIGN.md | 對齊既有系統設計 | P7 |
| docs/MODULE_PATH.md | 對齊既有模組路徑 | P7 |
| .dev-os/ROADMAP.md | 對齊既有 roadmap | P8 |
| ... | ... | ... |

## Recommended Next State
[下一個 P-state 或 PX exit path]

## Next Step Execution Location
[同一對話 / 新設計對話 / 一次性對話 / 切換到 IDE / IDE thread]

## Next Prompt To Run

```text
[貼上最新一次 State Completion Packet 的第 8 節 Copy-paste Next Prompt，
或寫 "see latest State Completion Packet in conversation history"]
```

> 注意：這個 prompt 必須是 self-bootstrapping prompt（PRE_DEV_NAVIGATOR.md Section 4D），
> 含明確的「Before answering, read these files first」清單。
> 如果上一輪 AI 產出的 next prompt 不符合，請依 Section 4B.4 補救 prompt 重做。

---

## Update Log

| Date | State Completed | What Changed |
|---|---|---|
| YYYY-MM-DD | P0 | initial idea snapshot |
| YYYY-MM-DD | P1 | direction chosen: ... |
| ... | ... | ... |

> 每完成一個 state，AI 在 State Completion Packet 第 12 項都會更新本文件。
> 手動修改也可以，但建議讓 AI 在 packet 裡產出，這樣不會漏。
