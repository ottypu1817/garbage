# 🗑️ 垃圾分類 AI 應用 - 快速開始指南

## ✅ 已完成功能

- ✨ **完整的前端應用** - HTML5/CSS3/JavaScript
- 📷 **相機識別** - 支持後置相機實時識別
- 📤 **圖片上傳** - 支持拖拽或點擊上傳
- 🤖 **AI 分類** - 可分類 4 種垃圾類型：
  - 玻璃 🥤
  - 電池 🔋
  - 紙板 📦
  - 金屬 🥫
- 📱 **完全響應式** - 適配所有設備
- 🌐 **靜態部署** - 無需後端服務器

## 📦 文件結構

```
garbage-main/
├── index.html                  # 主應用程序
├── css/style.css              # 完整的響應式樣式
├── js/app.js                  # 應用邏輯（1900+ 行）
├── model.json                 # TensorFlow 模型配置
├── weights.bin                # 模型權重
├── metadata.json              # 模型元數據
├── package.json               # 項目配置
├── netlify.toml               # Netlify 部署配置
├── vercel.json                # Vercel 部署配置
├── .github/workflows/deploy.yml  # GitHub Actions 工作流
├── README.md                  # 詳細文檔
├── DEPLOYMENT.md              # 部署指南
└── QUICK_START.md             # 本文件

```

## 🚀 本地運行

### 最簡單的方法：Python

```bash
cd garbage-main
python3 -m http.server 8000
```

打開瀏覽器：**http://localhost:8000**

### 其他方法：

**使用 Node.js：**
```bash
npx http-server -p 8000
```

**使用 PHP：**
```bash
php -S localhost:8000
```

**VS Code Live Server：**
1. 安裝 "Live Server" 擴展
2. 右鍵 → "Open with Live Server"

## 🌐 部署到互聯網

### 🟢 推薦：GitHub Pages（完全免費）

```bash
# 1. 初始化 Git 倉庫
git init
git add .
git commit -m "Initial commit"

# 2. 創建 GitHub 倉庫並推送
git branch -M main
git remote add origin https://github.com/你的名字/garbage.git
git push -u origin main

# 3. 在 GitHub 設置中啟用 Pages
# Settings → Pages → main 分支 → /garbage-main 文件夾

# 完成！訪問：https://你的名字.github.io/garbage
```

### 🔵 Netlify（拖拽部署）

```bash
# 訪問 https://netlify.com
# 1. 連接 GitHub 倉庫
# 2. 設置：Publish directory = garbage-main
# 3. 部署完成！自動生成 URL
```

### 🟡 Vercel（最快）

```bash
npm install -g vercel
cd garbage-main
vercel
# 部署完成！
```

### 傳統虛擬主機

1. 使用 FTP 上傳所有文件到 `public_html`
2. 建立 `.htaccess` 文件用於 URL 重寫
3. 確保 HTTPS 已啟用

詳見 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧪 功能測試

### 相機識別
1. 打開應用 → 點擊 **📷 相機識別**
2. 點擊 **🎥 打開相機**
3. 將垃圾放在圓圈內
4. 點擊 **📸 拍照識別**
5. 查看結果和分類信息

### 圖片上傳
1. 打開應用 → 點擊 **📤 上傳照片**
2. 拖拽圖片或點擊上傳
3. 點擊 **🔍 識別**
4. 查看結果

## 🔧 自定義修改

### 修改垃圾類別信息

編輯 `js/app.js` 中的 `WASTE_INFO` 對象：

```javascript
const WASTE_INFO = {
    glass: {
        name: '玻璃 🥤',
        emoji: '🟦',
        color: '#4299e1',
        description: '玻璃和玻璃製品',
        disposal: '...',
        tips: [...],
        examples: '...'
    }
};
```

### 修改顏色方案

編輯 `css/style.css`：

```css
/* 改變主題色 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 改為藍色主題 */
background: linear-gradient(135deg, #0099ff 0%, #00d4ff 100%);
```

### 改變應用標題

在 `index.html` 中修改：

```html
<h1>你的標題 🎯</h1>
```

## 🌈 特色功能詳解

### 📷 相機識別

- ✅ 支持後置相機（自動選擇）
- ✅ 實時攝像頭數據展示
- ✅ 目標圓圈提示
- ✅ 拍照自動分類

### 📤 圖片上傳

- ✅ 支持拖拽上傳
- ✅ 支持點擊選擇
- ✅ 支持多種圖片格式（JPG、PNG、WebP）
- ✅ 自動圖片縮放

### 📊 分類結果

- ✅ 彩色分類信息卡片
- ✅ 百分比置信度顯示
- ✅ 詳細的垃圾處理建議
- ✅ 實用的分類小貼士

### 🎨 用戶界面

- ✅ 現代化設計
- ✅ 流暢動畫效果
- ✅ 完全響應式
- ✅ 暗黑模式友好

## 🔐 隱私和安全

✅ **完全本地處理** - 無數據上傳
✅ **離線運行** - 加載後可離線使用
✅ **開源代碼** - 完全透明
✅ **HTTPS** - 支持安全連接

## 📱 兼容性

| 瀏覽器 | 版本 | 支持 |
|--------|------|------|
| Chrome | 60+ | ✅ |
| Firefox | 60+ | ✅ |
| Safari | 12+ | ✅ |
| Edge | 79+ | ✅ |
| iOS Safari | 12.2+ | ✅ |
| Android Chrome | 最新 | ✅ |

## ⚡ 性能

- 初始加載時間：**~3-5 秒**（取決於模型大小）
- 分類速度：**~0.5-1 秒**
- 模型大小：**~2.2 MB**

## 🐛 故障排除

### 相機無法訪問
```
原因：需要 HTTPS 或 localhost
解決：
1. 部署到 HTTPS 網站
2. 或使用 localhost 測試
3. 檢查瀏覽器權限設置
```

### 模型加載失敗
```
原因：模型文件未完整上傳
解決：
1. 確保 model.json 和 weights.bin 在同一目錄
2. 檢查文件大小是否正確
3. 清除瀏覽器緩存
```

### 分類結果不準確
```
原因：光線或角度問題
解決：
1. 增加光線亮度
2. 將物體放在圓圈內
3. 嘗試不同角度
4. 訓練自己的模型（高級）
```

## 📚 項目技術棧

- **前端**: HTML5、CSS3、Vanilla JavaScript
- **機器學習**: TensorFlow.js、TeachableMachine
- **相機**: Web Camera API
- **部署**: GitHub Pages、Netlify、Vercel
- **版本控制**: Git

## 🎯 下一步改進

- [ ] 添加多語言支持
- [ ] 實現離線模式
- [ ] 添加識別歷史
- [ ] 用戶設置保存
- [ ] 社交分享功能
- [ ] PWA 應用化
- [ ] 深色模式切換
- [ ] 聲音反饋

## 💬 社區和支持

- 📖 詳細文檔：[README.md](./README.md)
- 🚀 部署指南：[DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 報告 Bug：提交 GitHub Issue
- 💡 建議功能：提交 GitHub Discussion

## 🎉 部署檢查清單

- [ ] 本地測試成功
- [ ] 所有文件已上傳
- [ ] HTTPS 已啟用
- [ ] 相機功能測試
- [ ] 分類功能測試
- [ ] 跨浏覽器測試
- [ ] 移動設備測試
- [ ] 性能優化完成

## 📞 需要幫助？

1. 查看控制台錯誤信息（按 F12）
2. 閱讀詳細文檔
3. 檢查部署配置
4. 提交 GitHub Issue

---

## 快速命令參考

```bash
# 本地開發
python3 -m http.server 8000

# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 部署到 GitHub
git remote add origin <your-repo-url>
git push -u origin main

# 部署到 Netlify
npx netlify-cli deploy --prod

# 部署到 Vercel
npx vercel --prod

# 清除模型緩存
localStorage.clear()
```

---

**祝你使用愉快！♻️ 讓我們一起保護環境！** 💚

**最後更新**：2026-05-05
