# garbage

一個智能垃圾分類Web應用，使用Teachable Machine訓練的圖像分類模型來識別不同類型的垃圾。

## 功能

- 上傳圖片或使用鏡頭進行垃圾分類
- 支持玻璃、電池、紙板和金屬的分類
- 提供分類建議和信心分數
- 多種UI設計（控制台和馬賽克風格）

## 使用方法

1. 打開 `index.html` 在瀏覽器中
2. 上傳垃圾圖片或使用鏡頭捕捉
3. 查看分類結果和建議

## 項目結構

- `index.html` - 主應用（生態掃描控制台）
- `app-console.html` - 控制台風格應用
- `garbage-main/docs/` - 文檔和額外應用
  - `app-console.html` - 另一個控制台版本
  - `app-mosaic.html` - 馬賽克風格應用
- `model/` - Teachable Machine模型文件