# PROMPT_LIBRARY.md — dev-os 工作流標準 Prompt 集

> 這份文件是 dev-os 工作流會用到的所有標準 prompts,集中管理。需要時直接複製。
>
> 每個 prompt 標明使用時機與使用位置(設計對話 / Claude Code IDE / 一次性對話)。
>
> 「為什麼用這個 prompt」見 PLAYBOOK.md。

---

## 目錄

- [類別 1:設計對話相關](#類別-1設計對話相關)
- [類別 2:SPEC 撰寫相關](#類別-2spec-撰寫相關)
- [類別 3:Claude Code 實作相關](#類別-3claude-code-實作相關)
- [類別 4:三個收尾 prompt(實作收尾)](#類別-4三個收尾-prompt實作收尾)
- [類別 5:對話銜接與初始化](#類別-5對話銜接與初始化)
- [類別 6:Phase 結束相關](#類別-6phase-結束相關)

---

## 類別 1:設計對話相關

### 1.1 新專案啟動 prompt(在新對話用)

**使用時機**:全新專案 Day 1,跟 AI 開始討論
**使用位置**:Claude.ai 新對話

```
我要開始一個新的軟體專案。在我們深入討論之前,讓我先描述大方向,然後請你幫我釐清產品定位、提出設計問題、挑戰我的假設。

專案描述:
[一段 2-5 句的專案描述,包含:解決什麼問題、給誰用、最核心的差異化是什麼]

我預計用 dev-os 工作流(spec-driven development with AI)來開發這個專案,代表我們會:
1. 先做 5-7 天的設計收斂(產出高層級設計、模組路徑、ADR)
2. 然後分 phase 用 SPEC 推進開發

現在這個對話就是「設計收斂階段」。請你:
1. 提出 3-5 個關鍵的釐清問題(關於目標用戶、核心情境、技術約束、商業模式等)
2. 對我的描述中含糊的地方挑戰我
3. 還不要急著開始寫文件,先讓我們對齊產品定位

我準備好了,請開始。
```

### 1.2 收斂高層級設計 prompt

**使用時機**:設計討論進行 2-3 輪後,準備落成文件
**使用位置**:同一個設計對話

```
我們已經討論過[列出已對齊的事項]。現在請你幫我把這些討論落成一份高層級設計文件。

請依以下結構撰寫:
1. 產品定位(一段話)
2. 核心設計信念(2-5 條,每條附理由)
3. 主要使用者旅程(從入口到離開的完整流程)
4. 系統架構(高層分割,例如「N 個引擎、M 個介面」)
5. 關鍵設計決策(會被回頭引用的根本選擇)

要求:
- 給未來的 AI 看的(不是給投資人看的),所以結構化、明確、無歧義
- 每個設計選擇都要附「為什麼這樣選」
- 寫完後輸出到 markdown 檔給我下載

寫完後告訴我:有哪些事項你覺得還沒充分對齊、需要再討論的。
```

### 1.3 收斂 ADR prompt

**使用時機**:高層級設計完成後,準備寫 DECISIONS.md
**使用位置**:同一個設計對話

```
基於我們的討論與剛產出的高層級設計,請列出應該被記錄為 ADR 的所有重大決策。

ADR 的判斷標準:
- 影響超過一個模組
- 改變難度高
- 受外在約束(法規、合作夥伴、硬體)
- 涉及產品定位

對每個決策,請輸出 ADR 格式:
- 編號(從 ADR-001 開始)
- 標題
- 脈絡
- 決定
- 理由
- Trade-off
- 影響的模組

預估會有 8-15 條 ADR。寫完後讓我審閱,我可能會挑戰某些決策。
```

### 1.4 寫 PHASE_PLAN prompt

**使用時機**:模組路徑文件寫完後,準備分 phase 與 wave
**使用位置**:同一個設計對話

```
請基於模組路徑文件,設計 PHASE_PLAN.md。涵蓋:

1. 整體 phase 切割(通常 3-5 個 phase)
   - Phase 0:基礎重構/建立(資料模型、核心 schema)
   - Phase 1:MVP-WOW(第一個能 demo 的完整體驗)
   - Phase 2+:後續完整功能

2. 每個 phase 內的 wave 分批
   - 每個 wave 4-7 個強相關模組
   - 為什麼這些模組要一起寫
   - 每個 wave 必須寫「完成後使用者多能做什麼一件事」
   - 若是 enabling work,標註服務於後續哪個 wave 的 user story

3. 每個 phase 結束的驗收 user story
   - 一段具體的 end-to-end 流程描述
   - 跑通就算 phase 完成

4. SPEC 撰寫策略
   - 每個 wave 是用模式 A(設計者親手寫)還是模式 B(Claude Code 自寫)
   - 預估時程

寫完後輸出到 markdown 檔。
```

---

## 類別 2:SPEC 撰寫相關

### 2.1 寫單一 SPEC prompt

**使用時機**:準備寫某個模組的 SPEC
**使用位置**:設計對話

```
請寫模組 [模組ID:模組名稱] 的完整 SPEC。

撰寫前必讀:
- 高層級設計文件(已附)
- 模組路徑文件(已附)
- DECISIONS.md(已附,特別注意 [相關 ADR 編號])
- 既有相關 SPEC(若有):[列出]

請依 SPEC_TEMPLATE.md 的結構撰寫,涵蓋:
1. 元資訊(模組 ID、Phase、預估工時、依賴、被依賴)
2. 目的(Why)
3. 範圍(包含、不包含、與相鄰模組的邊界)
4. 設計細節(資料模型、API、演算法、UI 等)
5. 設計理由與 trade-off(為什麼這樣設計、考慮過哪些方案、技術債)
6. 開放問題(動工前需要拍板的事)
7. 影響的檔案(預估清單)
8. 參考資料

風格與品質要求:
- 對照既有 SPEC(M1.1、C3 等)的詳細度
- 不要含糊,具體到欄位名稱、API endpoint 命名
- 開放問題列出至少 3-5 個

寫完後一起產出對應的 PROMPT.md、ACCEPTANCE.md、STATUS.md(三份配套)。
```

### 2.2 寫 SPEC_GUIDE prompt(模式 B 用)

**使用時機**:某模組設計選擇大多受既有 codebase 約束,想讓 Claude Code 自寫 SPEC
**使用位置**:設計對話

```
請為模組 [模組ID] 寫一份 SPEC_GUIDE.md(不是完整 SPEC)。

SPEC_GUIDE 的目的:讓 Claude Code IDE 看著實際 codebase 自己產出完整 SPEC。

SPEC_GUIDE 應包含:
1. 模組目的(一段話)
2. 對應的 ADR 與設計約束
3. 設計約束(必須遵守的規則,不可妥協)
4. 預期的主要表 / 主要 API(只給輪廓,具體欄位讓 Claude Code 設計)
5. 範例 seed data(讓 Claude Code 知道要支援什麼)
6. ACCEPTANCE 撰寫提示(這個模組的驗收應涵蓋哪些情境)
7. 給 Claude Code 的 prompt(直接複製可用)

完成後我會在 Claude Code 執行該 prompt,讓 Claude Code 自寫 SPEC。
```

---

## 類別 3:Claude Code 實作相關

### 3.1 啟動 Claude Code 對話 prompt

**使用時機**:在 Claude Code IDE 開新 session 準備執行某模組
**使用位置**:Claude Code IDE

```
請依 .dev-os/specs/<模組ID>/PROMPT.md 執行
```

就這一行。其他指令都已經寫在 PROMPT.md 裡了。

### 3.2 對齊步驟的標準回應(Claude Code 應該主動做)

**使用時機**:Claude Code 讀完 PROMPT 後
**使用位置**:Claude Code IDE 自動產出

Claude Code 應該回應:
- 簡述本模組目的(確認理解)
- 簡述打算建立/修改的檔案
- 回答 SPEC 中「Open Questions」的答案(從現有 codebase 推敲)
- 說明 codebase 中最接近的 existing pattern
- 說明這次明確 out-of-scope 的檔案或區域
- 提出實作前的疑問
- **等使用者確認後才動工**

如果 Claude Code 沒這樣做、直接寫程式,使用者打斷:

```
請先按 PROMPT.md 中「開工前的對齊步驟」對齊,我確認後再動工。
```

### 3.3 中斷實作要求重新評估

**使用時機**:實作中發現重大問題
**使用位置**:Claude Code IDE

```
暫停實作。我發現 [描述問題]。

請:
1. 評估這個問題對 SPEC 的影響(SPEC 寫錯了嗎?還是實作偏離 SPEC?)
2. 提出處理方案(改 SPEC?改實作?寫新 ADR?)
3. 等我決定後再繼續

不要 commit 任何已寫的程式碼,先停下來討論。
```

### 3.4 Debug Protocol(用於 bug 修補循環)

**使用時機**:
- 已經為同一個問題改第 2 次以上,還沒解決
- 修了一個 bug 但另一個破了,反覆來回
- 你或 AI 開始覺得「為什麼又壞了」
- 任何時候你懷疑 AI 在亂猜

**使用位置**:Claude Code IDE
**重要性**:遇到上述狀況時不可跳過,直接停手用這個 prompt

```text
暫停。我覺得我們可能陷入 bug 修補循環(修 A 壞 B、修 B 壞 A)。
請先停止修改任何 src 程式碼,改做 debug protocol。

請先讀:
1. `.dev-os/config.yml`(確認測試命令)
2. 當前模組的 SPEC / ACCEPTANCE / STATUS
3. 最近 3-5 個 commit 的 diff
4. 最近一次完整測試輸出(若無,先跑一次但不要改任何程式)

讀完後請回報:

1. **最小重現步驟**
   - 怎樣的輸入 / 操作會觸發目前的問題?
   - 越精簡越好

2. **根因假設**
   - 你目前覺得根本原因可能是什麼?(列 1-3 個假設,標出哪個最可能)
   - 哪個假設可以用一個簡單測試或檢查驗證?

3. **影響範圍**
   - 這個 bug 涉及哪些檔案 / 模組?
   - 如果動手修,可能順便影響哪些既有行為?

4. **回歸保護**
   - 你打算新增哪個 failing regression test 來鎖住「修好」的定義?
   - 修完後要重跑哪些測試確認沒打壞其他東西?

請輸出上面四點。在我確認前,不要改任何 src 檔案。
我確認後的執行順序是:
  (a) 先新增 failing regression test
  (b) 做最小修正
  (c) 跑完整測試套件
  (d) 報告結果
```

---

## 類別 4:三個收尾 prompt(實作收尾)

**這三個 prompt 是 dev-os 工作流的核心紀律。任何 Standard / Strict 模組實作完成後必須執行,順序不可顛倒。Lite 模組可依 MINI_SPEC 的驗收流程收尾。**

### 4.1 Prompt 1:健康檢查 + 對照 SPEC + 列出偏離點

**使用時機**:模組所有實作完成後
**使用位置**:Claude Code IDE
**重要性**:不可跳過

```
SPEC [模組ID](.dev-os/specs/<模組ID>/SPEC.md)已實作完成。
現在做最終收尾前的健康檢查,先不要 commit 任何新東西。

請依序做以下五件事,每件做完報告:

1. 先讀 `.dev-os/config.yml`,確認本專案的 commands 與 git policy。

2. 依 `.dev-os/config.yml` 跑全套既有 test 確認沒打壞:
   - 至少包含 typecheck / lint / test / build 中本專案有定義的命令
   全部 pass 才往下做

3. git log --oneline -10 列出本 SPEC 過程中的 commit history,
   確認真的有合理的分段 commit。
   如果有段落漏 commit 或被合併,直接說明

4. 對照 .dev-os/specs/<模組ID>/SPEC.md 的「影響的檔案」段:
   - SPEC 預期會新建但實際沒新建的檔案
   - SPEC 沒提到但實際新建的檔案
   - SPEC 預期會修改但實際沒改的檔案
   - 實際路徑跟 SPEC 不一致(例如命名差異)的地方

5. 列出實作過程中你「偏離 SPEC」或「SPEC 不夠精確」的所有地方,
   特別是:
   - 動工前你提的 Open Questions 答案,實作有沒有完整落地
   - 實作過程中是否發現 SPEC 有矛盾或不夠精確之處
   - 任何「SPEC 寫 A、實作走 B」的地方,理由是什麼

把上述報告寫成一份 .dev-os/specs/<模組ID>/IMPLEMENTATION_FEEDBACK.md,
並在文件最前面加上 `Design Deltas` 摘要表:
- 變更
- 原 SPEC 假設
- 實作結果
- 影響後續模組
- 是否需要 ADR

另外,把健康檢查命令與結果摘要保留成可回看的驗收證據,後續會同步到 ACCEPTANCE.md / STATUS.md。

報告完等我說 OK 才進下一步(SPEC 回填)。
```

### 4.2 Prompt 2:SPEC 回填校正

**使用時機**:Prompt 1 完成、使用者確認後
**使用位置**:Claude Code IDE
**重要性**:不可跳過

```
請把 SPEC [模組ID] 實作過程中的所有設計校正回填到
.dev-os/specs/<模組ID>/SPEC.md,讓 SPEC 跟最終實作一致。

回填內容應涵蓋:

1. **Open Questions 的答案落地**
   - 把 SPEC 末尾「開放問題」段的每一個 [ ] 換成 [x] 並寫入答案
   - 答案如果影響「設計細節」段的描述,回填到對應段落,
     讓 SPEC 不再有「以實際為準」這種懸而未決的句子

2. **實作中發現的 SPEC 矛盾或缺漏修正**
   - 上一個 prompt 你列出的所有「偏離 SPEC」或「SPEC 不夠精確」項目
   - 每一項都要回填到 SPEC 對應段落,並更新「設計理由」說明為何採此做法

3. **影響的檔案段同步**
   - 上一個 prompt 你列出的「實際路徑跟 SPEC 不一致」項目
   - 把 SPEC 的「影響的檔案」段更新成實際 ship 的檔名與路徑
   - 如果有 SPEC 預期但沒新建的檔案,從清單刪除並在「已知限制」段說明
   - 如果有 SPEC 沒提但實際新建的檔案,加入清單

4. **SPEC 變更歷史新增一行**:
   YYYY-MM-DD | 第二版 | 動工後校正:Open Questions 答案落地 +
   <一句話描述其他關鍵校正>

5. **如果這次校正讓「不包含」段需要更新**(例如某個你以為要做但實作判斷不該做
   的東西、或反之),也一併修

回填完做以下檢查:
- git diff .dev-os/specs/<模組ID>/SPEC.md 給我看修改內容
- 確認 SPEC 內沒有任何「以實際為準」「具體名稱待定」這類懸而未決字眼
- 確認 SPEC 跟 src/ 內的實際 ship 內容一致

確認無誤後依 `.dev-os/config.yml` 的 git policy 處理。如果 policy 允許 commit,執行:
  git add .dev-os/specs/<模組ID>/SPEC.md
  git commit -m "[<模組ID>] SPEC 回填: <一句話描述關鍵校正>"

不要動 src/、不要動其他檔案。
完成後告訴我:commit hash(若有) + 是否依 git policy push / 使用進階 branch 或 PR + 回填了哪幾類事項。
```

### 4.3 Prompt 3:狀態同步

**使用時機**:Prompt 2 完成後
**使用位置**:Claude Code IDE
**重要性**:不可跳過

```
請同步 SPEC [模組ID] 的完成狀態。先讀 `.dev-os/config.yml`,依本專案 git policy 執行。

請依序更新以下文件:

1. `.dev-os/ROADMAP.md`
   - 找到對應模組,狀態 ⬜ / 📝 / 🔨 改 ✅
   - 備註欄補上必要資訊(例如「實作於 X-Y 合併 SPEC」)
   - 如果本 SPEC 涵蓋多個 ROADMAP 項目,所有相關項目都要更新
   - 更新文件最下方「完成度統計」的對應 Phase 行,重算分子分母

2. `.dev-os/specs/<模組ID>/STATUS.md`
   - 狀態改為 done
   - 填完成日期
   - 補主要 commit / remote link(若有)
   - 勾選三個收尾 prompt 執行狀態
   - 補驗收證據索引

3. `.dev-os/specs/<模組ID>/ACCEPTANCE.md`
   - 確認所有 criterion 都已執行並通過
   - 每個 criterion 都補上命令 / 操作、結果摘要、證據路徑
   - 勾選「全部通過確認」

4. `.dev-os/NOW.md`
   - 如果設計者已確認下一個模組,更新為下一個任務
   - 如果尚未確認,把當前任務改成「等待設計者確認下一個模組」,並列出候選

同步後,執行一次基本一致性檢查:
- 若可用,跑 `.dev-os/tools/devos-doctor.ps1`
- 或人工確認 ROADMAP / STATUS / ACCEPTANCE / NOW 沒有互相矛盾

改完後依 `.dev-os/config.yml` 的 git policy 處理。如果 policy 允許 commit,執行:
  git add .dev-os/ROADMAP.md .dev-os/NOW.md .dev-os/specs/<模組ID>/STATUS.md .dev-os/specs/<模組ID>/ACCEPTANCE.md
  git commit -m "[dev-os] <模組ID> 狀態同步"

完成後告訴我:
- 新的 Phase 完成度比例
- STATUS / ACCEPTANCE / NOW 更新摘要
- doctor 或人工一致性檢查結果
- commit hash / push 狀態,以及進階 branch / PR 狀態(若本專案啟用)
```

---

## 類別 5:對話銜接與初始化

### 5.1 Design Sync prompt

**使用時機**:某模組三個收尾 prompt 完成,讓設計角色吸收 IMPLEMENTATION_FEEDBACK
**使用位置**:
- `ide-only`:同一個 Claude Code IDE thread
- `split`:原本寫該模組 SPEC 的 Web AI 設計對話

```
模組 [模組ID] 已實作完成並通過驗收。請依 `.dev-os/config.yml` 的
`project.conversation_layout` 執行 Design Sync。

如果是 `ide-only`:
1. 請直接讀 `.dev-os/specs/[模組ID]/IMPLEMENTATION_FEEDBACK.md`
2. 摘要 Design Deltas
3. 判斷是否需要更新 DECISIONS.md / PHASE_PLAN.md / NOW.md
4. 若需要更新,先提出建議,不要直接改程式碼

如果是 `split`,以下是 Claude Code 產出的 Design Deltas 摘要:

[貼上 IMPLEMENTATION_FEEDBACK.md 的 Design Deltas 表格]

完整 IMPLEMENTATION_FEEDBACK 如下(若內容很長,我會分批貼;若設計者不需要細節可略過):

[貼上 IMPLEMENTATION_FEEDBACK.md 全文或重點段落]

請根據這份回饋:
1. 評估有哪些事是後續模組設計時要考慮的
2. 是否有 ADR 需要新增或修正
3. 是否有跨模組的系統性發現
4. 是否影響我們對 PHASE_PLAN 的判斷

完成評估後我們再決定下一個模組怎麼處理。
```

### 5.2 開新設計對話的初始化 prompt(跨 phase 換新對話用)

**使用時機**:Phase 結束評估後決定換新對話
**使用位置**:Claude.ai 新對話

```
我正在開發 [專案名稱],採用 dev-os 工作流(spec-driven development with AI)。
我已完成 [Phase X],現在進入 [Phase Y]。

我會分批附上以下檔案讓你建立完整脈絡:

必要檔案:
1. config.yml(命令、git policy、工作流模式)
2. PHASE_PLAN.md(本 phase 的 wave 分批策略)
3. DECISIONS.md(N 個已對焦的重大決定,絕對不可妥協)
4. ROADMAP.md(全部模組與當前狀態)
5. HIGH_LEVEL_DESIGN.md(系統設計藍圖)
6. MODULE_PATH.md(開發路徑)
7. data-warehouse-guide.md(若有,結構化儲存規範)
8. 至少 2 份既有 SPEC(風格與品質標竿)
9. 上一個 phase 的回顧結論(若有)

**你的任務**:幫我寫 [Phase Y] 的 SPEC,以及在我詢問時提供設計判斷。
**不寫程式**(實作由 Claude Code IDE 處理)。

讀完所有檔案後請跟我簡述:
1. 你理解的本 phase 整體目標
2. 你看完 PHASE_PLAN 後對 wave 分批的理解或疑問
3. 對 ADR 的理解(特別是任何讓你覺得需要釐清的)
4. 準備好開始第一個 SPEC 嗎?

確認對焦後,我們從 Wave 1 開始。
```

### 5.3 Phase 結束後的回顧對話初始化

**使用時機**:某 phase 全部模組完成後
**使用位置**:Claude.ai 新一次性對話(不延續設計對話)

```
我剛完成專案 [專案名稱] 的 [Phase X]。請幫我做 phase 回顧。

請我先附上:
1. PHASE_PLAN.md 中本 phase 的設計
2. ROADMAP.md(看實際完成狀態)
3. 本 phase 所有模組的 IMPLEMENTATION_FEEDBACK.md(會分批貼)
4. 本 phase 結束的 demo 可以跑通嗎?(我會描述)

回顧的目標:
1. 真實實作跟設計差多少?
2. 有哪些 SPEC 寫得太細/太粗?
3. IMPLEMENTATION_FEEDBACK 循環順嗎?有什麼可以改進?
4. 哪些 ADR 需要修正或新增?
5. 對下個 phase 的策略性建議

我會逐項提供資訊。完成後幫我產出一份 phase 回顧文件,放到 .dev-os/retrospect/ 下。
```

---

## 類別 6:Phase 結束相關

### 6.1 Phase Demo 驗收 prompt

**使用時機**:Phase 內所有模組完成,要驗收 phase 級 user story
**使用位置**:Claude Code IDE

```
Phase [X] 全部模組已標記為 ✅。請幫我跑 phase 驗收 demo:

1. 重新讀 PHASE_PLAN.md 中本 phase 的「end-to-end user story」
2. 列出這個 user story 涉及哪些模組、哪些 API、哪些 UI
3. 設計一個自動化 e2e test(或人工 demo 流程),逐步驗證
4. 跑驗收,告訴我哪裡通、哪裡卡

如果有卡住的部分,評估:
- 是某個模組沒做完?
- 是模組之間整合沒做?
- 是 SPEC 漏了某個需求?

回報結果讓我決定下一步。
```

### 6.2 開新對話的「啟動包」打包 prompt

**使用時機**:準備跨 phase 開新對話時,需要產出新對話的啟動包
**使用位置**:現有設計對話(快結束時)

```
我準備為下一個 phase 開新的設計對話。請幫我產出「啟動包」,讓新對話能快速接手。

啟動包應包含:

1. **新對話的啟動 prompt**(可直接複製貼到新對話的訊息)
   - 涵蓋:你是誰、任務是什麼、該讀什麼檔案、該以什麼風格
   - 引用 PHASE_PLAN 跟 DECISIONS

2. **應該附給新對話的檔案清單**
   - 必要檔案(大約 5-8 份)
   - 每份檔案的位置與目的

3. **給開發者本人的部署/操作指引**
   - 怎麼開新對話
   - 怎麼貼 prompt
   - 預期新對話的反應
   - 出問題怎麼辦

4. **對新對話的提醒**
   - 嚴格 JIT(只寫當前 wave)
   - 對齊步驟不可省
   - 三個收尾 prompt 的紀律
   - IMPLEMENTATION_FEEDBACK 循環

打包完用 markdown 格式輸出。
```

---

## 附錄:常用快捷 prompt

這些是「短 prompt」,適合熟悉流程後使用。

```
# 啟動模組實作
請依 .dev-os/specs/<模組ID>/PROMPT.md 執行

# 健康檢查(縮短版,沒有把 IMPLEMENTATION_FEEDBACK 寫到檔案)
請對 [模組ID] 跑健康檢查 + 對照 SPEC + 列出偏離點

# SPEC 回填
請對 [模組ID] 跑 SPEC 回填校正,把實作中的偏離反映到 SPEC

# 狀態同步
請同步 [模組ID] 完成狀態(ROADMAP / STATUS / ACCEPTANCE / NOW)
```

熟悉後這四行 prompt 就可以驅動單一模組的完整生命週期。

---

## 演化建議

當你發現某個 prompt 在實際使用中不夠精準、或者發現新的場景需要新 prompt:

1. 在這個 PROMPT_LIBRARY.md 新增或修改
2. 在 PLAYBOOK.md 對應章節更新
