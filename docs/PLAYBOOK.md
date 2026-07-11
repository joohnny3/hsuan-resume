# PLAYBOOK.md — dev-os 工作流心法手冊

> 這份文件是 dev-os 工作流的「**為什麼**」與「**何時做什麼**」。
>
> 機械層面的「怎麼做」(prompt 範本、檔案結構)在 PROMPT_LIBRARY.md 與 template/ 資料夾。
>
> 你應該至少把整份 PLAYBOOK 讀過一遍,動工後可隨時回查特定章節。

---

## 目錄

1. [這套工作流的核心信念](#1-這套工作流的核心信念)
2. [這套工作流適合什麼專案](#2-這套工作流適合什麼專案)
3. [這套工作流不適合什麼專案](#3-這套工作流不適合什麼專案)
4. [整體節奏:從 Day 1 到 Phase 結束](#4-整體節奏)
5. [新專案啟動(Day 1-7)](#5-新專案啟動)
6. [一個 SPEC 的完整生命週期](#6-一個-spec-的完整生命週期)
7. [對話空間管理](#7-對話空間管理)
8. [兩種 SPEC 撰寫模式](#8-兩種-spec-撰寫模式)
9. [三個收尾 prompt 的紀律](#9-三個收尾-prompt-的紀律)
10. [IMPLEMENTATION_FEEDBACK 循環](#10-implementation_feedback-循環)
11. [ADR 與 DECISIONS.md](#11-adr-與-decisionsmd)
12. [JIT 原則](#12-jit-原則)
13. [Phase 結束時的處理](#13-phase-結束時的處理)
14. [常見失敗模式與對策](#14-常見失敗模式與對策)
15. [演化與回饋](#15-演化與回饋)
16. [v1.1 工作流硬化](#16-v11-工作流硬化)
17. [v1.2 vibe coding 安全網](#17-v12-vibe-coding-安全網)

---

## 1. 這套工作流的核心信念

這套工作流的根基是四個信念。如果你不認同這四個,後面的所有設計對你都是負擔。

### 信念一:設計與實作要分開,但要互相回饋

傳統做法把「設計」跟「實作」綁在一起——程式設計師邊寫邊想。AI 時代讓兩者可以高度分工:**人類負責設計與決策,AI 負責實作**。但分工後最大的風險是「設計脫離現實」,所以必須有強制的**回饋循環**(IMPLEMENTATION_FEEDBACK)把實作的真實狀況送回給設計者。

### 信念二:對話的脈絡比 prompt 的內容值錢

跟 AI 工作的真實成本不是 token,是「**讓 AI 理解這個專案需要的脈絡建立成本**」。一個對話跑久了,AI 對專案的理解會逐步深化,這個累積的脈絡是資產。但對話也會因為包含太多無關內容而效率下降。

對話空間的管理是這套工作流的隱性核心:**設計用一條對話、實作用另一條、跨 phase 換新對話**。

### 信念三:文件不是給人看的,是給未來的 AI 看的

傳統文件是給「未來接手的工程師」看的,所以強調易讀、有趣、有故事。這套工作流的文件是給**未來的 AI**看的,所以強調:結構化、可索引、明確指令、無歧義、有先例可循。

這代表 SPEC 不需要寫得「優雅」,要寫得「可被機器消化」。ADR 不需要寫得「好讀」,要寫得「下次 AI 動工前能自己讀懂約束」。

### 信念四:AI 的執行不等於驗證

AI 寫程式很快,但「**它說做完了**」跟「**真的做對了**」是兩件事。AI 會非常有自信地說「已經修好」「應該可以了」,但這只代表它輸出了某種程式,不代表那段程式正確、不破壞既有功能、或解決了真正的問題。

最危險的不是 AI 一開始就寫錯,而是它每次都「**看似有道理地修正**」,但實際上修好 A 又弄壞 B,反覆來回直到整個 codebase 變混亂。

這代表三件事必須建制化:

1. **不能用對話判斷對錯**。「AI 說好了」不算數,程式跑得起來、測試有過、人類看過畫面才算數。
2. **每個 bug 要變成測試**。修一個 bug 卻沒留下 regression test,等於邀請它一個月後復活。
3. **遇到「為什麼又壞了」要停手**。第 2 次以上沒解決同一問題時,改用 Debug Protocol(見第 14 章失敗模式 9 與 PROMPT_LIBRARY 3.4),不要繼續讓 AI 猜。

這個信念是 SPEC、ACCEPTANCE、IMPLEMENTATION_FEEDBACK、健康檢查 prompt 存在的理由:它們都是為了把「AI 說做完」變成「事實上做完」的證據。

---

## 2. 這套工作流適合什麼專案

- **規模**:中大型專案(預計 30+ 個模組、3+ 個月開發)
- **開發者人數**:1-3 人(獨立開發者最受益)
- **AI 介入程度**:大量使用 Claude Code 或類似 AI IDE 工具
- **不確定性**:有複雜的商業邏輯需要設計判斷,不只是 CRUD app
- **存活期**:預期會跑超過半年,不是一次性 PoC

最典型的案例:**獨立開發者用 AI 輔助開發一個複雜的領域產品**(教育系統、SaaS、醫療工具等)。

---

## 3. 這套工作流不適合什麼專案

- **小於 3 個月的快速 prototype**:overhead 太重
- **純 CRUD app**:沒有複雜商業邏輯,SPEC 變成廢話
- **多人同步開發大型團隊**:有自己的工作流(Jira、design doc 等)
- **完全靜態的內容網站**:不需要這麼多紀律
- **每週只能投入幾小時的 side project**:節奏拉長後 SPEC 跟實作會嚴重脫節

如果你的專案不在「適合」清單裡,**輕量採用部分元素**就好(例如只用 ADR 不用 SPEC,或只用 PROMPT_LIBRARY 不用 .dev-os 結構)。

---

## 4. 整體節奏

一個典型的 dev-os 專案從 Day 1 到完成大概長這樣:

```
Day 1-7:    新專案啟動(設計收斂)
              ├─ 跟 AI 對話,釐清產品定位
              ├─ 產出高層級設計文件
              ├─ 產出模組路徑文件
              ├─ 收斂 8-15 條 ADR
              └─ 寫 PHASE_PLAN.md(分 phase + 分 wave)

Phase 0:    基礎重構/建立(2-6 週)
              ├─ 寫 4-6 個基礎模組的 SPEC
              ├─ Claude Code 一個一個實作
              └─ 每個模組:對齊 → 實作 → 健康檢查 → SPEC 回填 → 狀態同步

Phase 1+:   功能開發(每個 phase 數週到數月)
              ├─ 分 wave 撰寫 SPEC
              ├─ 重複 SPEC → 實作 → 回填的循環
              └─ Phase 結束時做回顧、決定下一步
```

**關鍵節奏點**:
- Day 1-7 不寫程式,專注在設計收斂
- 每個 SPEC 動工前充分對齊,寧可多花一天討論
- 每個 SPEC 完成後三個收尾 prompt 缺一不可
- 每個 wave 結束 review、每個 phase 結束 retrospect

---

## 5. 新專案啟動

新專案 Day 1 不要急著建 .dev-os 資料夾或寫 SPEC。**先做設計收斂**。

### Day 1-2:跟 AI 對話釐清產品定位

打開 Claude.ai 開新對話,粗略描述你的專案目標、用戶、核心情境。讓 AI 提問、挑戰、提出設計建議。**這個階段不要怕對話變長**——脈絡正在建立。

目標產出:
- 一段話能講清楚產品定位
- 至少 3-5 個重要的設計選擇被討論過(例如「要不要做家長 App」「要不要支援多租戶」)

### Day 3-4:產出高層級設計文件

把對話中達成共識的設計落成一份文件。建議結構參考本 starter 提供的 `template/docs/HIGH_LEVEL_DESIGN_TEMPLATE.md`。

這份文件會包含:
- 產品定位
- 核心設計信念(2-5 條,影響所有後續決策)
- 主要使用者旅程
- 系統架構(三引擎、四介面之類的高層分割)
- 關鍵設計決策(會被回頭引用)

### Day 5-6:產出模組路徑文件

把高層級設計轉成「**有哪些模組要做、彼此什麼依賴、分幾個 phase**」的路徑。
參考 `template/docs/MODULE_PATH_TEMPLATE.md`。

### Day 7:落地 .dev-os/

到 Day 7,你應該有:
- `docs/HIGH_LEVEL_DESIGN.md`(WHAT)
- `docs/MODULE_PATH.md`(HOW)
- `docs/data-warehouse-guide.md`(資料儲存規範,若專案需要結構化資料或 AI 輸出儲存,可由 template 建立)

這時 copy `template/.dev-os/` 到你的 repo:
- 填 `.dev-os/config.yml`(測試命令、git policy、工作流模式)
- 寫 `.dev-os/DECISIONS.md`(把已收斂的決策寫成 ADR)
- 寫 `.dev-os/ROADMAP.md`(把模組路徑轉成可追蹤清單)
- 寫 `.dev-os/PHASE_PLAN.md`(分 phase + 分 wave 的策略)
- 寫 `.dev-os/NOW.md`(指向第一個任務)
- 寫 repo 根目錄的 `README.md`(工程性入口)

**不要跳過這 7 天**。如果你跳過直接寫 SPEC,後面會付出 2-3 倍的時間在「不停回頭改設計」。

---

## 6. 一個 SPEC 的完整生命週期

每個模組從寫 SPEC 到完成,經歷 6 個階段:

### 階段 1:SPEC 撰寫(在「設計對話」中)

人類設計者跟 AI 討論該模組,產出四份文件:
- `SPEC.md`:完整規格(目的、範圍、設計細節、開放問題)
- `PROMPT.md`:給 Claude Code 的執行指令
- `ACCEPTANCE.md`:可執行的驗收標準
- `STATUS.md`:狀態追蹤(初始為 specced)

### 階段 2:部署到 repo

人類把四份文件 commit 到 `.dev-os/specs/<模組ID>/`。

### 階段 3:Claude Code 對齊

在 IDE 中執行:
```
請依 .dev-os/specs/<模組ID>/PROMPT.md 執行
```

PROMPT 會要求 Claude Code 先讀檔案、簡述理解、提出問題,**等使用者確認後才動工**。

**對齊是這套流程最關鍵的紀律**。寧可花 30 分鐘討論清楚,不要直接寫程式。

### 階段 4:Claude Code 實作

對齊後 Claude Code 按 PROMPT 的「實作順序建議」分段實作,每段 commit。

### 階段 5:健康檢查 + SPEC 回填 + 狀態同步(三個 prompt)

**所有實作完成後,絕對不要直接收工**。執行三個收尾 prompt(見下方第 9 章)。

v1.1 後,第三個 prompt 不只同步 ROADMAP,也同步 `STATUS.md`、`ACCEPTANCE.md` 與 `NOW.md`。ROADMAP 仍是模組級進度真相,但驗收證據與單一模組歷史不應塞進 ROADMAP。

### 階段 6:Design Sync

實作中發現的偏離、SPEC 不精確之處、新決策,寫進 `IMPLEMENTATION_FEEDBACK.md`,再執行 **Design Sync**。`ide-only` 模式在同一個 IDE thread 吸收回饋;`split` 模式才由人類把 Design Deltas 帶回 Web AI 設計對話。

這六階段缺一不可。少做一個就會在後續模組付出代價。

---

## 7. 對話空間管理

這套流程在 Claude.ai 至少會用到三種對話空間,**不要混用**:

### A. 設計對話(SPEC 撰寫)

職責:寫 SPEC、討論架構、產出 ADR
特性:長壽,可以跑數週,持續累積專案脈絡
換新時機:跨 phase 時換新(不是每個 wave)

### B. Claude Code IDE 對話(實作)

職責:執行 SPEC、寫程式、跑測試
特性:每個模組一個獨立 session(完成就結束)
換新時機:每個模組完成

### C. 一次性對話(回顧、新專案啟動)

職責:Phase 結束的回顧、新專案的設計收斂
特性:短壽,完成任務就結束
換新時機:任務完成就結束

**最容易犯的錯誤**:
- ❌ 在 Claude Code 對話寫 SPEC(沒有設計脈絡)
- ❌ 在設計對話一直延續到 Phase 2 結束(對話爆炸)
- ❌ 跨 phase 不換新對話(脈絡污染)

**最正確的做法**:
- ✅ 設計對話跑完一個 phase 後,評估是否換新
- ✅ Claude Code 每個模組獨立 session
- ✅ Phase 結束時開「Phase 回顧對話」做 retrospect

---

## 8. 兩種 SPEC 撰寫模式

### 模式 A:設計者親手寫(透過設計對話)

**適用**:
- 結構性影響大的模組(資料模型、狀態機、跨模組共用 API)
- 跨模組決策較多
- 設計禁區(ADR)需要重點強調
- 創新性高的模組(沒有現成範本)

**節奏**:在設計對話中跟 AI 一起寫,人類審核每個段落的決策

### 模式 B:Claude Code 自寫 SPEC(透過 SPEC_GUIDE)

**適用**:
- 在既有 schema 旁加 incremental 表
- 設計選擇多受既有結構約束
- Claude Code 看著實際程式碼能寫得更貼合

**節奏**:設計者寫一份簡短 `SPEC_GUIDE.md`(設計脈絡 + 約束),Claude Code 產出 SPEC、PROMPT、ACCEPTANCE 後再開工

### 怎麼選

新手建議:**前 5-10 個 SPEC 全用模式 A**,累積對 SPEC 風格的判斷後再嘗試模式 B。

老手判斷:**「這個模組的設計決策超過 50% 是受既有程式碼約束嗎?」是 → 模式 B,否則模式 A**。

---

## 9. 三個收尾 prompt 的紀律

每個 SPEC 實作完成後,**必須**執行以下三個 prompt(順序不可顛倒)。

完整版本在 `PROMPT_LIBRARY.md`。這裡講為什麼。

### Prompt 1:健康檢查 + 對照 SPEC + 列出偏離點

**為什麼**:確保實作沒打壞既有功能,並把實作中的真實狀況浮現出來。

關鍵動作:
- 跑全套 test
- 檢查 commit history 結構
- 對照 SPEC「影響的檔案」段
- 列出所有「偏離 SPEC」或「SPEC 不夠精確」的地方

**這個 prompt 的產出就是 IMPLEMENTATION_FEEDBACK 的素材**。

### Prompt 2:SPEC 回填校正

**為什麼**:讓 SPEC 永遠跟實際程式碼一致,不要產生「文件騙人」的狀況。

關鍵動作:
- 把 Open Questions 的答案落地
- 修正 SPEC 中不精確的地方
- 同步「影響的檔案」段
- 在「SPEC 變更歷史」新增一行

**這個 prompt 跑完後,SPEC 的版本進化到「跟實作一致」的真相版本**。

### Prompt 3:狀態同步

**為什麼**:讓專案的模組進度、單模組狀態、驗收證據、下一步入口一致,避免狀態混亂。

關鍵動作:
- 對應模組狀態 ⬜ → ✅
- 更新完成度統計
- 更新 STATUS、ACCEPTANCE、NOW
- 依 `.dev-os/config.yml` 的 git policy commit / push,進階模式才使用 branch / PR

### 為什麼不能跳過

跳過 prompt 1:你不知道是否打壞東西、不知道實作偏離了哪裡
跳過 prompt 2:三個月後 SPEC 跟程式碼脫節,新模組基於錯誤資訊設計
跳過 prompt 3:ROADMAP / STATUS / ACCEPTANCE / NOW 開始互相矛盾,進度成迷

**這三個 prompt 的存在,是為了讓「文件」永遠是「程式碼的真實鏡像」**。

---

## 10. IMPLEMENTATION_FEEDBACK 循環

這是 dev-os 工作流的「回饋」核心。

### 怎麼做

實作模組 X 過程中,Claude Code 在 prompt 1 的執行結果寫進 `.dev-os/specs/<模組X>/IMPLEMENTATION_FEEDBACK.md`,內容:
- Open Questions 的最終答案
- SPEC 不精確的地方
- 偏離 SPEC 的決策與理由
- 發現的新限制

### 然後

人類**主動執行 Design Sync**,讓設計者(可能是同一個 IDE thread 的 AI、Web AI、或你自己)知道:
- 實作的真實狀況
- 下個模組設計時要知道哪些事
- 是否要寫新的 ADR
- 是否要改 PHASE_PLAN

### 為什麼這步是「人類主動」而不是自動

`ide-only` 模式下,coding agent 可以直接讀 repo,但仍需要人類要求它做設計吸收與判斷。`split` 模式下,設計者(設計對話的 Claude)沒辦法主動讀 repo,人類是訊息傳遞的橋樑。**Design Sync 不能省略**——省略後設計會脫離現實,後續 SPEC 越寫越不準。

### 一個常見的錯誤

「每個模組都要做 Design Sync 嗎?」

**是**。即使是「沒什麼好回報」的模組,也要 Design Sync「這個模組沒有偏離 SPEC,Open Questions 的答案是 X、Y、Z」這個事實。設計者需要知道「沒事」也是訊息。

---

## 11. ADR 與 DECISIONS.md

### 什麼是 ADR

Architectural Decision Record:重大架構決定的記錄。每個 ADR 包含:
- 編號(ADR-001, ADR-002, ...)
- 日期
- 脈絡(為什麼有這個決策需求)
- 決定本身
- 理由
- Trade-off
- 影響的模組

### 什麼時候要寫 ADR

當決策具備以下特徵之一:
- 影響超過一個模組
- 改變難度高(寫了之後要改要付大成本)
- 受外在環境約束(法規、合作夥伴、硬體限制)
- 涉及產品定位(影響使用者體驗的根本選擇)

不需要寫 ADR 的:
- 局部技術選擇(用哪個 npm 套件)
- 命名 convention(放在 data-warehouse-guide 之類的指引)
- 純實作細節

### 何時寫

新專案 Day 1-7 會密集寫 8-15 條 ADR(從設計對話收斂出來)。
之後每個 phase 可能新增 2-5 條(實作中發現需要拍板的事)。

### 紀律

ADR 一旦寫了,**不要修改**(歷史不可變)。要推翻就寫新的 ADR 標記 `Supersedes ADR-XXX`,舊 ADR 標 `Superseded by ADR-YYY`。

---

## 12. JIT 原則

**Just-in-Time SPEC writing**:不要一次寫完所有模組的 SPEC。

### 為什麼

- 寫太早會跟實作脫節(Wave 3 的 SPEC 在 Wave 1 完成前寫,假設多半會錯)
- 寫太多 SPEC 給人心理壓力
- 實作過程會發現新事實,提前寫的 SPEC 要頻繁 revise

### 紀律

永遠只有「**正在做的 wave + 下一個 wave**」兩份完整 SPEC。
其他 wave 在 ROADMAP.md 裡只有一行描述。

### 例外

某些緊密耦合的模組必須一起寫(例如資料模型 + 狀態機),這種情況合併成一份 SPEC,JIT 仍然成立——只是「一個 SPEC 涵蓋多個 ROADMAP 項目」。

---

## 13. Phase 結束時的處理

每個 phase 結束有四個動作:

### 動作 1:Phase 內所有模組的 SPEC 都 ✅ 嗎

對照 ROADMAP,確認本 phase 規劃的模組都實作 + 回填 + 同步完成。

### 動作 2:Phase 級驗收 demo

跑通 PHASE_PLAN 中為這個 phase 寫的「end-to-end user story」。如果跑不通,**phase 不算結束**,回頭補。

### 動作 3:Phase 回顧

開一個短暫的「Phase 回顧對話」,跟 AI 討論:
- 真實實作跟設計差多少?
- 有哪些 SPEC 寫得太細/太粗?
- IMPLEMENTATION_FEEDBACK 循環順嗎?
- 哪些 ADR 需要修正或新增?
- 下個 phase 該怎麼策略性切入?

### 動作 4:設計對話的處理

評估設計對話的健康度:
- 對話內容對下個 phase 還有用嗎?
- 對話是否已經太長導致品質下降?

決定:
- 健康 → 繼續用同個對話
- 不健康 → 開新對話,用「對話銜接 prompt」(見 PROMPT_LIBRARY.md)初始化

---

## 14. 常見失敗模式與對策

### 失敗模式 1:設計對話跨太多 phase 沒換新

症狀:Claude 開始忘記早期決策、SPEC 風格漂移、新 SPEC 跟舊模組不一致
對策:Phase 結束時主動評估換新對話,用啟動包初始化新對話

### 失敗模式 2:跳過對齊步驟

症狀:Claude Code 寫到一半發現 schema 設計錯,要回頭重做
對策:再忙也要花 30 分鐘對齊。寫程式比對齊貴 10 倍

### 失敗模式 3:不執行三個收尾 prompt

症狀:三個月後 SPEC 跟程式碼完全脫節,新人(或新 AI)讀 SPEC 等於讀廢紙
對策:把三個 prompt 設成「強制收尾步驟」,沒做不算完成模組

### 失敗模式 4:不執行 Design Sync

症狀:設計對話脫離現實,新 SPEC 越寫越不準
對策:每個模組完成後,依 `conversation_layout` 執行 Design Sync。`ide-only` 在同一個 IDE thread 讀回饋;`split` 才手動把 Design Deltas 帶回設計對話

### 失敗模式 5:超前寫 SPEC

症狀:Wave 3 的 SPEC 寫了結果 Wave 1 完成後發現要改一半
對策:嚴格 JIT,只寫當前 wave 的 SPEC

### 失敗模式 6:用 Claude Code 寫 SPEC 而不是用設計對話

症狀:SPEC 缺乏跨模組視野,只看到當下這個模組的局部
對策:除非確定符合「模式 B」適用條件,預設用模式 A

### 失敗模式 7:ADR 寫得太細或太粗

症狀:ADR 太細變成「每個 commit 都寫 ADR」(失去意義);太粗變成「重要決策埋在程式碼裡沒記錄」
對策:用第 11 章的判斷準則

### 失敗模式 8:Phase 結束沒做回顧

症狀:同樣的錯誤在下個 phase 重複犯
對策:每 phase 結束強制做一次 retrospect,即使覺得「沒什麼好討論」

### 失敗模式 9:bug 修補循環(修 A 壞 B、修 B 壞 A)

症狀:同一個問題改了 2-3 次以上沒解、修一個破一個、對話越拉越長、AI 開始重複講「應該是修好了」但問題還在

對策:
1. 立刻停手,不要再讓 AI 繼續猜
2. 使用 PROMPT_LIBRARY 的 **Debug Protocol prompt**(3.4)
3. 強制流程:停修 → 找根因 → 加 regression test → 最小修正 → 完整測試
4. 如果連 debug protocol 都沒收斂,新開一個 thread,把 SPEC、ACCEPTANCE、最近 diff、失敗測試輸出帶過去,用乾淨 context 重看一遍

關鍵心法:AI 的「道歉」不是驗證。它說「你說得對」「我已經修好」不代表真的理解根因,也不代表系統可靠。

---

## 15. 演化與回饋

**這套工作流不是石碑**。它從 Phase 0 到 Phase 1 一直在演化:

- 三個收尾 prompt 是 Phase 1 才出現的紀律
- IMPLEMENTATION_FEEDBACK 循環是中段才標準化
- 模式 B(Claude Code 自寫 SPEC)是試驗中

**鼓勵你做的事**:
- 每跑完一個 phase,問自己「有什麼可以改進的工作流?」
- 發現新的好用 prompt → 加進 PROMPT_LIBRARY
- 發現新的失敗模式 → 寫進第 14 章
- 發現新的設計判斷準則 → 寫進對應章節

---

## 16. v1.1 工作流硬化

v1 的重點是建立閉環。v1.1 的重點是讓閉環**可檢查、可分級、可長期維持**。

### 16.1 狀態真相分工

不要把「單一真相來源」理解成所有狀態都塞進一個檔案。正確分工如下:

| 檔案 | 職責 |
|------|------|
| `ROADMAP.md` | 模組級進度真相 |
| `STATUS.md` | 單一模組的過程、commit、收尾狀態 |
| `ACCEPTANCE.md` | 驗收標準與證據 |
| `NOW.md` | 下一個該做的任務 |

模組完成時,這四份文件必須一起同步。只更新 ROADMAP 會讓專案看起來完成,但實際驗收與下一步入口可能已經失真。

### 16.2 `.dev-os/config.yml`

每個專案都應該有 `.dev-os/config.yml`,集中放:

- 專案名稱、目前 phase / wave
- install / lint / typecheck / test / build / e2e 命令
- git policy(main-direct、commit-only、branch-direct、pr-required)
- workflow mode(lite、standard、strict)
- quality gates

所有 prompt 在執行測試、commit、push 或 PR 前,都應先讀 config,不要猜測命令或分支策略。

### 16.3 Lite / Standard / Strict

不是每個任務都需要完整四件套。

| 模式 | 適用 | 文件 |
|------|------|------|
| Lite | 1 天內、低風險、可逆小改 | `MINI_SPEC.md` |
| Standard | 一般模組 | `SPEC.md` + `PROMPT.md` + `ACCEPTANCE.md` + `STATUS.md` |
| Strict | schema、狀態機、跨模組 API、核心商業邏輯 | Standard + ADR 檢查 + phase demo 影響評估 |

升級判斷:
- 影響資料模型 → 至少 Standard
- 影響兩個以上模組 → 至少 Standard
- 做錯後重改成本高 → Strict
- 牽涉權限、安全、金流、法規 → Strict

### 16.4 驗收證據

`ACCEPTANCE.md` 不只打勾,還要留證據:

- 測試命令
- 輸出摘要
- API response 摘要
- screenshot / video / artifact 路徑
- 手動 demo 結論

沒有證據的「通過」,三個月後很難被新 AI 或新開發者信任。

### 16.5 IMPLEMENTATION_FEEDBACK 先給 Design Deltas

完整 feedback 可以很長,但設計對話最需要的是「哪些設計假設改變」。所以 `IMPLEMENTATION_FEEDBACK.md` 開頭應有 `Design Deltas` 表格:

| 變更 | 原 SPEC 假設 | 實作結果 | 影響後續模組 | 需要 ADR |
|------|--------------|----------|--------------|----------|

Design Sync 時,先看這張表。`split` 模式下先貼這張表到設計對話;設計者需要細節時,再貼完整 feedback。

### 16.6 `devos doctor`

工作流不該只靠人記得。至少要有一個簡單檢查命令,檢查:

- 必要檔案是否存在
- `config.yml` 是否還有 placeholder
- `NOW.md` 是否指向舊任務
- Standard / Strict spec 是否有四件套
- done 模組是否有 `IMPLEMENTATION_FEEDBACK.md`
- `ACCEPTANCE.md` 是否缺驗收證據
- `ROADMAP.md` 統計是否可能失真

template 已提供 PowerShell 範例:`.dev-os/tools/devos-doctor.ps1`。沒有 CLI 也沒關係,先有 doctor,就能降低文件漂移。

### 16.7 預設不用 PR

對非工程師與單人 AI 開發者,PR 不應是預設流程。PR 的價值是「合併前檢查點」,不是避免 conflict 的保證。真正降低 conflict 的方法是:

- 一次只做一個清楚模組
- 不讓兩個 AI session 同時改同一批檔案
- 模組邊界切清楚
- 小步 commit
- 開工前先對齊會改哪些檔案

建議 git policy:

| policy | 適用 |
|--------|------|
| `main-direct` | 預設。單人 / 非工程師使用者,直接在 `main` commit,模組完成後 push |
| `commit-only` | 單人暫時不想 push,只保留本機 commit |
| `branch-direct` | 進階。高風險功能先放 branch,人工確認後合回 main,不強制 PR |
| `pr-required` | 多人協作、多 AI session 平行開發、或高風險核心改動 |

所以,PR 要保留,但放在進階模式。Quickstart 與預設 template 應使用 `main-direct`。

---

---

## 17. v1.2 vibe coding 安全網

v1.2 的重點不是讓流程變重,而是吸收成熟 vibe coding 裡最容易救命的安全網。

### 17.1 Design Sync 取代「永遠貼回設計對話」

`.dev-os/config.yml` 新增 `project.conversation_layout`:

- `ide-only`(預設):設計與實作校準在同一個 IDE thread 完成,不需要複製到外部對話。
- `split`:設計與實作分開時,才把 Design Deltas 貼回 Web AI 設計對話。

### 17.2 Debug Protocol

當同一個 bug 修第 2 次以上、修 A 壞 B、或你開始覺得「為什麼又壞了」,不要繼續讓 AI 猜。用 PROMPT_LIBRARY 3.4 停下來找最小重現、根因假設、影響範圍與 regression test。

### 17.3 風險檢查與 AFK 判斷

SPEC_TEMPLATE 加入 30 秒風險檢查。只要碰資料破壞、權限外洩、金流錯誤,就升級 Strict。入門者前 10 個 SPEC 建議都不要 AFK。

### 17.4 Manual QA

ACCEPTANCE_TEMPLATE 加入 UI / API / 資料三組 Manual QA。測試 pass 只是證據之一;有 UI 的功能仍要真的打開畫面看空狀態、loading、錯誤狀態、手機與桌面 viewport。

### 17.5 開工前探索與 vertical slice

PROMPT_TEMPLATE 要求 Claude Code 先找 existing pattern、列 out-of-scope 區域,Strict 模組才要求 2-3 個方案比較。PHASE_PLAN 的每個 wave 都要回答:完成後使用者多能做什麼一件事?如果只是內部建設,要標註它服務哪個後續 user story。

---

## 結語

這套工作流的核心是「**讓設計、實作、回饋形成閉環**」。任何讓閉環打開的事都是失敗模式。

當你在某個專案使用這套流程時,如果發現「**好像沒按 PLAYBOOK 走也能跑**」,問自己:

- 是這個專案規模還不夠大,流程確實太重?(這套不適合)
- 還是只是這幾天運氣好,還沒撞到問題?(嚴守紀律,問題會在後面爆炸)

獨立開發者最危險的習慣是「**現在很順所以下次也會順**」。流程紀律就是為了在你「很順」時不偷懶,確保你「不順」時有東西扛得住。

祝你開發順利。
