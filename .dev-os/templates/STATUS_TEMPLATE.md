# STATUS.md — [模組 ID] 開發狀態

> **使用方式**:從這個 template 複製,改內容。寫完後存到 `.dev-os/specs/<模組ID>/STATUS.md`。
>
> 開發過程中持續更新。完成後標記為 done。

---

## 當前狀態

**狀態**:planned / specced / in-progress / done / parked / dropped
**開始日期**:YYYY-MM-DD
**完成日期**:YYYY-MM-DD(完成後填)
**主要 commit**:[commit hash 或 remote link]
**工作流模式**:Lite / Standard / Strict

---

## 進度筆記

> 開發中遇到的事情記在這裡。可以包含:
> - 解決的關鍵設計問題
> - 實作中發現 SPEC 需要調整的地方
> - 跟其他模組的整合點
> - 卡住的地方
> - 學到的東西

### YYYY-MM-DD

[筆記內容]

---

## 實作中發現的 SPEC 調整

> 如果開發中發現原 SPEC 不切實際或需要調整,記錄在這裡。
> SPEC.md 也要對應更新(在「SPEC 變更歷史」區塊新增一筆)。
> 詳細的偏離記錄在 IMPLEMENTATION_FEEDBACK.md。

| 原 SPEC 規定 | 實際做了什麼 | 原因 |
|--------------|--------------|------|
| — | — | — |

---

## 三個收尾 prompt 執行狀態

- [ ] Prompt 1 健康檢查 完成,IMPLEMENTATION_FEEDBACK.md 已產出
- [ ] Prompt 2 SPEC 回填 完成
- [ ] Prompt 3 狀態同步 完成(ROADMAP / STATUS / ACCEPTANCE / NOW)
- [ ] Design Sync 已完成(依 `conversation_layout` 判斷 ide-only 或 split)

---

## 驗收證據索引

> 詳細內容寫在 ACCEPTANCE.md,這裡只列出最重要的證據入口。

| Criterion | 證據 | 結果 |
|-----------|------|------|
| — | — | — |

---

## 接續工作建議

> 如果這個模組還有「相關但不在 SPEC 範圍內」的後續工作,在這裡記錄,讓未來回頭看時可以快速接續。

- [...]
- [...]
