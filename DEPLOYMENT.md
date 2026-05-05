# 🚀 部署指南

此指南將幫助你將垃圾分類 AI 應用部署到各個平台。

## 目錄
1. [本地開發](#本地開發)
2. [GitHub Pages 部署](#github-pages-部署)
3. [Netlify 部署](#netlify-部署)
4. [Vercel 部署](#vercel-部署)
5. [傳統虛擬主機部署](#傳統虛擬主機部署)
6. [Docker 部署](#docker-部署)

---

## 本地開發

### 方法 1: Python 內置服務器 ⭐ 推薦

**最簡單，無需安裝任何依賴：**

```bash
cd garbage-main
python3 -m http.server 8000
```

在瀏覽器打開：`http://localhost:8000`

### 方法 2: Node.js HTTP Server

```bash
npm install -g http-server
cd garbage-main
http-server -p 8000
```

### 方法 3: PHP 內置服務器

```bash
cd garbage-main
php -S localhost:8000
```

### 方法 4: VS Code Live Server

1. 安裝擴展：**Live Server**
2. 右鍵點擊 `index.html` → **Open with Live Server**

---

## GitHub Pages 部署

**完全免費，自動集成 GitHub！**

### 第 1 步：創建 GitHub 倉庫

```bash
cd garbage-main
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用戶名/garbage.git
git push -u origin main
```

### 第 2 步：啟用 GitHub Pages

1. 進入倉庫設置 → **Settings**
2. 找到 **Pages** 部分
3. **Source** 選擇 `main` 分支
4. **Folder** 選擇 `/garbage-main`
5. 點擊 **Save**

### 第 3 步：等待部署

稍等片刻，你的網站將在以下地址訪問：
```
https://你的用戶名.github.io/garbage
```

### 自動部署工作流

項目已包含 `.github/workflows/deploy.yml`，推送更改到 main 分支後會自動部署。

---

## Netlify 部署

**世界級的靜態網站託管服務**

### 方法 1：使用 UI

1. 訪問 [netlify.com](https://netlify.com)
2. 登錄或註冊
3. 點擊 **Add new site** → **Import an existing project**
4. 連接 GitHub 倉庫
5. 設置選項：
   - **Branch to deploy**: `main`
   - **Build command**: （留空）
   - **Publish directory**: `garbage-main`
6. 點擊 **Deploy**

### 方法 2：使用 Netlify CLI

```bash
# 安裝 CLI
npm install -g netlify-cli

# 登錄
netlify login

# 部署
cd garbage-main
netlify deploy --prod
```

### 自定義域名

1. 在 Netlify 設置中添加 **Custom domain**
2. 按照說明配置 DNS

預計部署時間：**< 1 分鐘**

---

## Vercel 部署

**由 Next.js 團隊維護的最快靜態部署**

### 第 1 步：訪問 Vercel

1. 進入 [vercel.com](https://vercel.com)
2. 使用 GitHub 登錄
3. 點擊 **Import Project**

### 第 2 步：配置

1. 選擇 GitHub 倉庫
2. 設置選項：
   - **Framework Preset**: `Other`
   - **Root Directory**: `garbage-main`
3. 點擊 **Deploy**

### 方法：使用 Vercel CLI

```bash
# 安裝
npm install -g vercel

# 部署
cd garbage-main
vercel
```

預計部署時間：**< 30 秒**

---

## 傳統虛擬主機部署

**適用於共享主機或專用服務器**

### 第 1 步：準備文件

```bash
# 進入項目目錄
cd garbage-main

# 壓縮所有文件
zip -r garbage-classifier.zip . -x "*.git*" ".gitignore"
```

### 第 2 步：上傳到服務器

使用 FTP（如 FileZilla）或 cPanel 文件管理器：

1. 連接到服務器
2. 導航到 `public_html` 或 `www` 目錄
3. 上傳所有文件：
   - `index.html`
   - `css/` 文件夾
   - `js/` 文件夾
   - `model.json`
   - `weights.bin`
   - `metadata.json`

### 第 3 步：配置 .htaccess（Apache）

創建 `.htaccess` 文件以支持 URL 重寫：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 第 4 步：訪問網站

在瀏覽器中訪問你的域名

**重要**：確保 HTTPS 已啟用（讓我們加密 SSL 證書）

---

## Docker 部署

**容器化部署方案**

### 創建 Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 8000

CMD ["http-server", "-p", "8000"]
```

### 構建和運行

```bash
# 構建鏡像
docker build -t garbage-classifier .

# 運行容器
docker run -p 8000:8000 garbage-classifier

# 訪問
# http://localhost:8000
```

### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./garbage-main:/app
```

運行：
```bash
docker-compose up
```

---

## 部署平台對比

| 平台 | 成本 | 易難度 | 速度 | 推薦度 |
|------|------|--------|------|-------|
| GitHub Pages | 🟢 免費 | 🟢 簡單 | 🟢 快 | ⭐⭐⭐⭐⭐ |
| Netlify | 🟢 免費 | 🟢 簡單 | 🟢 快 | ⭐⭐⭐⭐⭐ |
| Vercel | 🟢 免費 | 🟢 簡單 | 🟡 很快 | ⭐⭐⭐⭐ |
| Cloudflare Pages | 🟢 免費 | 🟢 簡單 | 🟢 快 | ⭐⭐⭐⭐ |
| 傳統主機 | 🔴 付費 | 🔴 複雜 | 🔴 一般 | ⭐⭐ |

---

## 常見問題

### Q: 我該選擇哪個服務？
**A**: 
- 新手：**GitHub Pages** 或 **Netlify**
- 追求速度：**Vercel**
- 已有域名：**Netlify** 或 **Vercel**

### Q: 部署後無法訪問相機怎麼辦？
**A**: 
1. 確保使用 **HTTPS**（除了 localhost）
2. 檢查瀏覽器是否要求了權限
3. 查看瀏覽器控制台的錯誤信息

### Q: 如何添加自定義域名？
**A**:
1. 在服務商（Namecheap、GoDaddy 等）購買域名
2. 更新 DNS 記錄指向託管服務商
3. 在託管平台設置中配置自定義域名

### Q: 部署後模型加載失敗？
**A**:
1. 檢查 `model.json` 和 `weights.bin` 是否上傳
2. 檢查瀏覽器網絡標籤查看文件加載狀態
3. 確保文件完整性

---

## 性能優化建議

### 加速加載
```javascript
// 預加載模型
window.addEventListener('load', function() {
    preloadModel();
});
```

### CDN 加速
- 在 Cloudflare 免費 CDN 上使用
- 啟用圖片優化

### 緩存策略
- 瀏覽器緩存：1 小時
- 模型文件緩存：7 天

---

## 監控和統計

### Google Analytics

在 `index.html` 中添加：
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 下一步

1. ✅ 選擇部署平台
2. ✅ 按照指南部署
3. ✅ 測試功能
4. ✅ 分享給朋友
5. ✅ 收集反饋

---

## 需要幫助？

- 📖 查看 [README.md](./README.md)
- 🐛 檢查 [GitHub Issues](https://github.com)
- 💬 提交問題報告

**祝部署成功！🎉**
