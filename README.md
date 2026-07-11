# hsuan-resume

> 瑄瑄（張庭瑄）的接案作品集網站——展場 SG/PG 的數位模卡＋LINE 邀約入口。

---

## 這是什麼

給活動公司、經紀與品牌廠商看的單頁作品集：深色奢華 editorial 視覺（可切日間主題）、形象照、品牌字牆、統一 3:4 照片牆、LINE 一鍵邀約。

- **不是**：求職履歷表、部落格、粉絲頁
- **是**：讓廠商 30 秒認識瑄瑄並直接邀約的數位模卡（見 `.dev-os/VISION.md`）

---

## 現在的狀態

**Phase 1 — Editorial 改版**進行中

- 下一個該動工的任務：[`.dev-os/NOW.md`](./.dev-os/NOW.md)
- 完整路線圖：[`.dev-os/ROADMAP.md`](./.dev-os/ROADMAP.md)
- 已對焦的重大決策：[`.dev-os/DECISIONS.md`](./.dev-os/DECISIONS.md)

---

## 技術棧

- 語言：TypeScript
- 框架：Next.js（App Router，`output: 'export'` 靜態輸出）＋ React
- 樣式：Tailwind CSS v4（CSS 變數主題 token，深色預設＋象牙日間）
- 字型：Playfair Display／Noto Serif TC／Noto Sans TC（next/font 自託管）
- 部署：GitHub Pages ＋ GitHub Actions（`.github/workflows/deploy.yml`）
- 正式網址：https://joohnny3.github.io/hsuan-resume （尚未發布）

---

## 啟動 Dev 環境

```bash
npm install
npm run dev     # http://localhost:3000/hsuan-resume
```

## 常用指令

| 用途 | 指令 |
|------|------|
| 開發伺服器 | `npm run dev` |
| 建置（靜態輸出 out/） | `npm run build` |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |

---

## ⚠️ 隱私鐵則（ADR-001，不可妥協）

這將是**公開 repo**，進了 git 歷史就永遠刪不乾淨：

1. **手機號碼不得出現在任何檔案**——對外聯絡只放 LINE ID
2. **`originals/`（原始履歷 PDF＋手機原圖）永不 commit**——`.gitignore` 以 `/originals/`、`*.pdf`、`S__*.jpg` 三重封鎖，請勿移除
3. 照片一律壓成 WebP 才進 `public/photos/`
4. 公開資訊白名單：本名張庭瑄、藝名瑄瑄、LINE ID、身高體重三圍
5. 名字是「瑄」（U+7444），不是「瑋」

---

## Repo 結構導覽

```
.
├── AGENTS.md            AI 助手入口規則（dev-os 工作流）
├── README.md           ← 你正在看的這個檔
├── predev/              模糊想法／大改版先走這裡
├── .dev-os/             開發中控台：STATE、NOW、ROADMAP、DECISIONS、specs
├── docs/                HIGH_LEVEL_DESIGN、MODULE_PATH、PLAYBOOK、PROMPT_LIBRARY
├── originals/           原始 PDF＋手機原圖（gitignored，永不進 repo）
├── src/
│   ├── app/             layout／page／globals.css／icon／OG 圖
│   ├── components/      Nav、Hero、BrandWall、Gallery、Contact…
│   ├── data/profile.ts  ★ 所有內容的單一資料來源
│   └── lib/site.ts      ★ BASE_PATH／網址單一事實來源
├── public/photos/       壓縮後的 WebP 照片
└── .github/workflows/   Pages 自動部署
```

---

## 日常維護 SOP

### 新增經歷（品牌字牆）

改 `src/data/profile.ts` 的 `brands` 陣列，加一個名字即可。

### 新增照片

1. 壓縮成 WebP（長邊 1200px 左右）：
   ```bash
   python -c "from PIL import Image; im=Image.open('originals/photos/新圖.jpg'); im.thumbnail((1200,1200)); im.save('public/photos/新檔名.webp','WEBP',quality=80)"
   ```
2. 在 `profile.ts` 的 `photos` 陣列加一筆（`w`/`h` 填實際像素；分類：`exhibition`／`beauty`／`retail`／`ceremony`）

### 填 IG 帳號

`profile.instagram` 填帳號（不含 @），聯絡區自動出現按鈕。

---

## 首次發布（M2，需明確同意才執行）

```bash
gh repo create joohnny3/hsuan-resume --public --source . --push
```

然後到 repo **Settings → Pages → Source** 選 **GitHub Actions**，等 Actions 跑完即上線。

### 未來換自訂網域（M4）

Pages 設 custom domain 後，把 `src/lib/site.ts` 的 `BASE_PATH` 改 `""`、`SITE_ORIGIN` 改新網域，push 即可。

---

## 給 Claude Code（或其他 AI 助手）

本 repo 採 dev-os **lite** 模式、`main-direct`：直接在 `main` 小步 commit，**絕不自動 push**（push＝公開發布個資，需使用者明說）。

啟動新對話的標準開場：

```
請先讀:
1. README.md（這個檔）
2. .dev-os/config.yml
3. .dev-os/STATE.md
4. .dev-os/NOW.md
5. .dev-os/DECISIONS.md

然後跟我確認你理解今天要做的事。
```

---

## 設計禁區（不可妥協）

1. 電話號碼／原始 PDF 不進 repo（ADR-001）
2. 未經使用者明說不 push（ADR-002）
3. 靜態資源路徑一律走 `asset()` helper——next/image 不會自動加 basePath（ADR-003）
4. 名字用「瑄」不用「瑋」
5. 內容改動走 `src/data/profile.ts`，不要散進元件
