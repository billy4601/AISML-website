# AISML-website：只放產生的靜態檔，不得直接修改

本 repo 是 GitHub Pages 發布用的靜態輸出，由私有 repo **billy4601/AISML-website-builder** 產生後同步過來。

## 規則（Billy 2026-11-06）

- **不得在本 repo 直接修改任何檔案**：HTML、CSS、JS、robots.txt、404.html、CNAME 都一樣。直接修改會在下次同步時被覆蓋，也會讓 Builder 與網站不一致。
- 要改內容、翻譯、樣式或設定，一律到 Builder 修改 `content/{tw,en,jp}/*.md`、`content/site.json` 或 `site/assets/`，建置、驗證、匯出後再同步到本 repo。步驟見 Builder 的 AGENTS.md。
- 本 repo 的 commit 只能是 Builder 匯出結果的同步。
- Claude 或其他 agent 被要求修改本 repo 時：停止，改到 Builder 作業；沒有 Builder 存取權時，告知 Billy，不要在這裡改。
- 網域與 GitHub Pages 設定步驟見 Builder 的 `docs/DOMAIN-SETUP.md`。
