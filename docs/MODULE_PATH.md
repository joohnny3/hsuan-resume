# MODULE_PATH.md — 模組清單與開發路徑（HOW）

> 一頁版。狀態真相在 `.dev-os/ROADMAP.md`，這裡只描述模組內容與依賴。

---

## 模組總覽

```
M0.1-mvp-site（✅）
   └─▶ M1-editorial-redesign（🔨）
          └─▶ M2-deploy-pages（⬜，需使用者同意發布）
                 ├─▶ M3-content-refresh（⬜，等素材，可與 M2 對調）
                 └─▶ M4-custom-domain（⬜，視需求）
```

## 模組說明

### M0.1-mvp-site（完成）
PDF 抽照片＋壓縮 WebP、五區塊單頁（粉嫩風）、Pages workflow、本機驗證。視覺已由 M1 取代；照片資產、`profile.ts`、workflow 沿用。

### M1-editorial-redesign（進行中）
深色奢華 editorial＋日夜主題、首屏整合自介、品牌字牆、照片牆 3:4 統一、OG/favicon 重製。
規格：`.dev-os/specs/M1-editorial-redesign/MINI_SPEC.md`。

### M2-deploy-pages
`gh repo create joohnny3/hsuan-resume --public` → push main → Pages（Source: GitHub Actions）。
**Gate：使用者明說「發布／push」**（ADR-002）。步驟詳見根目錄 README。

### M3-content-refresh（data-eng）
新經歷併入品牌字牆、IG 帳號填 `profile.instagram`、視情況補新照片（壓縮 SOP 見 README）。

### M4-custom-domain（選配）
買網域 → Pages 設 custom domain → `src/lib/site.ts` 的 `BASE_PATH` 改 `""`、`SITE_ORIGIN` 改新網域。
