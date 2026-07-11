# STEP_LOG.md — [module-id] 步驟歷史

> Append-only。每次 Step Complete / Handoff 模式時,AI 在最底下 append 一筆完整 11 項 packet。
> Tick 模式不 append(避免日誌爆炸)。
>
> **語言**:packet 內容一律用**繁體中文**填;只有 `### 1.`~`### 11.` 小標題、`## Step #<N>`、`**State**` / `**Commit**` / `**產品影響**`、state/module ID、檔名路徑、code 保留原樣(儀表板工具靠這些定位內容,`**產品影響**` 這個 key 不可改名或翻譯)。
>
> **歸檔規則 (v0.5.1)**:當本檔 entry 數 > 5 或行數 > 600,AI 在 append 新 entry 之前先把最舊的搬到 `STEP_LOG_archive.md`(同目錄,不存在則建)。保留近 5 entries 在本檔。
>
> 用途:
> - 跨對話 AI 讀此檔重建模組脈絡(配合 STATE.md)
> - 模組完成後 retrospect
> - Debug 時看「這個模組之前試過什麼方向」(若需要更舊歷史,看 STEP_LOG_archive.md)
>
> 此檔屬於該模組,跟隨模組一起 commit。

---

## Step #1 — [一行 step title:有產品變更時用產品語言寫(例「結果頁新增 1-5 準確度回饋」),純工作流步驟才用流程語言]

**State**: [SX] [→ SY,若有轉換]
**完成時間**: [ISO timestamp]
**Commit**: [hash 或 none]
**產品影響**: [一句話,使用者/產品現在多了什麼看得到的改變;若是純工作流步驟(status sync / SPEC backfill / Design Sync / health check / alignment 等沒有產品行為變更的步驟)就寫「無,純工作流記帳」]

### 1. Completed Step
[這一步完成了什麼,用繁體中文寫;可帶 S-state ID]

### 2. Completion Evidence
- 已修改 / 新增檔案: `[path]`
- commit hash: `[hash]`
- acceptance 是否達成: [Yes / Partial / No,引用 ACCEPTANCE.md 證據]
- 跑過的測試指令與結果: `[command]` → `[result]`

### 3. Step Summary
- [3-7 點繁體中文重點]

### 4. Recommended Next Step
[下一個 S-state ID + step name]

### 5. Why This Next Step
- [為什麼做這步 / 為什麼不停在原地,繁中]
- [未決問題 / 風險,繁中]

### 6. Next Step Execution Location
[Same conversation / new IDE thread / design conversation / one-off]

### 7. Files / Artifacts Reference List
必附:
- `[file]`: [purpose]

選附:
- `[file]`: [when needed]

### 8. Copy-paste Next Prompt
**只在 Handoff 模式才填入完整 prompt,其他模式寫 `Not generated — Tick/Step Complete 模式`**

```text
[full self-bootstrapping prompt 或 "Not generated"]
```

### 9. Thread Health Check
- 預估對話訊息數: [N] → [Healthy / 中等 / 偏長 / 強烈建議換]
- 已放棄方向 / 失敗 attempts: [N] → [OK / 中等 / 污染風險高]
- AI 開始重複自己 / 忘記限制: [Yes / No]
- 下一個任務真的換認知模式 (implement↔design+split / 進出 Debug;同 module 內中間轉換填 No): [Yes / No]
- 整個 module 完成 (進 S9) 或 phase 收尾 (只完成中間 artifact 填 No): [Yes / No]
- **Thread Health Verdict**: [Healthy / Approaching limit / Should switch]

### 10. Context Handoff Decision
- 建議: [Continue / New IDE Thread / New Design Conversation / One-off / Compact / End]
- 理由: [based on item 9]

### 11. New Conversation Startup Pack
[若 item 10 不是 New 系列,寫 `Not needed because ...`。若是 New,寫 `Same as item 8` 或另一份 prompt。]

---

<!-- 後續 step append 在這條分隔線之上,保留此說明在最底 -->
<!-- ## Step #2 — ... -->
<!-- ## Step #3 — ... -->
