# SPEC_GUIDE.md — [模組 ID]:[模組名稱]

> **使用時機**:模式 B。當模組的具體設計高度依賴現有 codebase,先由設計對話產出本 guide,再讓 Claude Code 讀 codebase 後產出完整 SPEC 四件套。

---

## 模組目的

[一段話說明這個模組要解決什麼問題]

---

## 必讀脈絡

- `docs/HIGH_LEVEL_DESIGN.md`
- `docs/MODULE_PATH.md`
- `.dev-os/DECISIONS.md` — 特別注意 ADR:[列出]
- 相關既有 SPEC:[列出]
- 相關程式碼路徑:[列出]

---

## 不可違反的設計約束

- [約束 1]
- [約束 2]
- [約束 3]

---

## 預期輪廓

### 主要資料表 / 模型

- [名稱]:[用途]

### 主要 API / function

- [名稱]:[用途]

### 主要 UI / workflow

- [描述]

---

## seed data / 範例情境

[列出 Claude Code 寫 SPEC 時應考慮的真實資料或情境]

---

## Acceptance 撰寫提示

完整 SPEC 產出時,ACCEPTANCE 至少要涵蓋:

- [情境 1]
- [情境 2]
- [錯誤 / 邊界情境]

---

## 給 Claude Code 的 prompt

```text
請依 .dev-os/specs/<模組ID>/SPEC_GUIDE.md 撰寫完整 SPEC 四件套:

1. SPEC.md
2. PROMPT.md
3. ACCEPTANCE.md
4. STATUS.md

開始前請先讀 guide 中列出的所有文件與相關 codebase。讀完後先回報:
- 你理解的模組目的
- 你看到的既有 codebase 約束
- 你打算採用的 schema/API/測試方向
- 需要我拍板的問題

等我確認後,再產出四件套。產出後不要開始實作。
```
