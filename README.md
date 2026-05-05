# 垃圾分類 AI 識別系統 🗑️

一個現代化的垃圾分類前端應用，使用 AI 和相機識別技術幫助用戶正確分類垃圾。

## ✨ 功能特性

- 📷 **即時相機識別** - 使用後置相機實時識別垃圾
- 📤 **圖片上傳識別** - 支持上傳本地圖片進行分類
- 🤖 **AI 分類引擎** - 基於深度學習模型的準確分類
- 📊 **詳細分析報告** - 顯示分類信心度和相關信息
- 📱 **完全響應式設計** - 適配所有設備
- 🌐 **靜態部署** - 無需後端服務器

## 🎯 支持的垃圾類別

- **玻璃 🥤** - 玻璃瓶、玻璃杯、玻璃罐等
- **電池 🔋** - 可充電和一次性電池
- **紙板 📦** - 快遞箱、牛奶盒、報紙等
- **金屬 🥫** - 鋁罐、鐵罐、金屬蓋等

## 🚀 快速開始

### 1. 本地運行

最簡單的方法是使用 Python 簡單 HTTP 服務器：

```bash
cd /path/to/garbage-main
python3 -m http.server 8000
```

然後在瀏覽器中打開：`http://localhost:8000`

### 2. 使用 Node.js

如果已安裝 Node.js，可以使用 `http-server`：

```bash
npm install -g http-server
http-server -p 8000
```

### 3. 使用 Live Server

在 VS Code 中：
1. 安裝 "Live Server" 擴展
2. 右鍵點擊 `index.html`
3. 選擇 "Open with Live Server"

## 📦 部署到靜態網站

### Netlify 部署

1. 在 GitHub 上創建倉庫並推送代碼
2. 登錄 [Netlify](https://netlify.com)
3. 連接 GitHub 倉庫
4. 構建設置：
   - Build command: （留空）
   - Publish directory: `garage-main`
5. 部署

### Vercel 部署

1. 推送代碼到 GitHub
2. 在 [Vercel](https://vercel.com) 導入項目
3. 自動部署完成

### GitHub Pages 部署

1. 推送代碼到 GitHub
2. 在倉庫設置中啟用 GitHub Pages
3. 選擇 `main` 分支作為源
4. 訪問 `https://username.github.io/garbage`

### 傳統虛擬主機部署

1. 下載所有文件
2. 使用 FTP 上傳到虛擬主機
3. 確保所有模型文件（model.json, weights.bin）已上傳
4. 訪問網站 URL

## 📁 項目結構

```
garbage-main/
├── index.html              # 主 HTML 文件
├── css/
│   └── style.css          # 樣式表
├── js/
│   └── app.js             # 主應用邏輯
├── model.json             # TensorFlow.js 模型配置
├── weights.bin            # 模型權重文件
├── metadata.json          # 模型元數據
└── README.md              # 本文件
```

## 🔧 技術棧

- **前端框架**: 原生 HTML5/CSS3/JavaScript
- **機器學習**: TensorFlow.js + TeachableMachine
- **相機 API**: WebRTC Webcam API
- **部署**: 靜態文件服務

## 📱 瀏覽器支持

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12.2+
- ✅ Android Chrome

**注意**: 需要 HTTPS（除了 localhost）來訪問相機功能。

## 🔐 隱私和安全

- ✅ 所有處理在本地進行，無數據發送到服務器
- ✅ 圖片和視頻流不上傳任何地方
- ✅ 完全離線運行能力（加載後）

## 🎨 自定義

### 修改垃圾分類信息

編輯 `js/app.js` 中的 `WASTE_INFO` 對象：

```javascript
const WASTE_INFO = {
    glass: {
        name: '玻璃 🥤',
        description: '...',
        disposal: '...',
        tips: [...],
        examples: '...'
    },
    // ... 其他類別
};
```

### 修改顏色方案

編輯 `css/style.css` 中的 CSS 變數和梯度色：

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 🐛 故障排除

### 相機無法訪問
- 確保允許網站訪問相機
- 檢查 HTTPS 連接（或 localhost）
- 嘗試不同瀏覽器

### 模型加載失敗
- 確保 model.json 和 weights.bin 在同一目錄中
- 檢查瀏覽器控制台的錯誤信息
- 清除瀏覽器緩存

### 分類不準確
- 確保光線充足
- 將垃圾放在目標圓圈內
- 嘗試不同角度

## 📈 改進建議

- [ ] 添加多種模型支持
- [ ] 實現批量圖片識別
- [ ] 添加識別歷史記錄
- [ ] 集成數據分析
- [ ] 支持多語言
- [ ] 添加離線模式

## 📄 許可顯示

該項目使用 TeachableMachine 提供的 AI 模型進行垃圾分類。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 支持

如有問題，請檢查：
1. 瀏覽器控制台（按 F12）的錯誤信息
2. 網絡連接是否正常
3. 所有文件是否正確上傳

---

✨ 感謝使用垃圾分類 AI 識別系統！一起為環保做貢獻 💚
