# HIGH_LEVEL_DESIGN.md — 系統設計藍圖（WHAT）

> 一頁版。這是靜態單頁作品集，沒有後端；設計重點在資訊架構、主題系統與隱私邊界。

---

## 系統形狀

```
瀏覽器
  └─ GitHub Pages（純靜態託管）
       └─ Next.js output:'export' 產出的 out/
            ├─ index.html（單頁：Hero → 品牌字牆 → 照片牆 → 邀約）
            ├─ photos/*.webp（預壓縮照片，唯一「資料庫」）
            └─ _next/*（JS/CSS/字型）
```

- **無伺服器、無 API、無資料庫**。所有內容編譯期定案。
- 內容單一來源：`src/data/profile.ts`（個人資料／自介／品牌清單／照片 manifest）。
- 部署：push main → GitHub Actions build → Pages（`basePath=/hsuan-resume`，見 `src/lib/site.ts`）。

## 資訊架構（ADR-005）

| 區塊 | 內容 | 目的 |
|------|------|------|
| Nav | 名字＋錨點＋日夜切換＋LINE pill | 常駐邀約入口 |
| Hero | 襯線大名字＋濃縮自介＋數據列＋金色 CTA＋形象照 | 3 秒認識她 |
| BrandWall | 30+ 場導言＋合作品牌襯線字牆 | 大牌背書，無日期 |
| Gallery | 3:4 統一卡＋pill 篩選＋燈箱原圖 | 看人看場面 |
| Contact | LINE ID＋複製＋金色 CTA | 零摩擦邀約 |

## 主題系統（ADR-004）

- CSS 變數 token（`--bg`／`--surface`／`--text`／`--muted`／`--gold`／`--line`）掛在 `:root`（深色預設）與 `[data-theme="light"]`（象牙）
- Tailwind v4 `@theme inline` 把 token 映射成語意色 utility
- `<head>` inline script 讀 localStorage 先設 `data-theme` 防 FOUC；Nav 切換鈕寫回
- 字型：Playfair Display（拉丁襯線）／Noto Serif TC（中文標題）／Noto Sans TC（內文），next/font 自託管

## 隱私邊界（ADR-001）

`originals/`（原始 PDF＋手機圖）永不進 git；聯絡資訊只有 LINE ID；驗收含 `0918`／`瑋` grep。

## 部署與網址

`https://joohnny3.github.io/hsuan-resume`；push＝發布，需使用者明說（ADR-002）。
