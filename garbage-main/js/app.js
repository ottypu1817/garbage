// 垃圾分類信息
const WASTE_INFO = {
    glass: {
        name: '玻璃 🥤',
        emoji: '🟦',
        color: '#4299e1',
        description: '玻璃和玻璃製品',
        disposal: '玻璃製品應該放在藍色回收箱，避免打破',
        tips: [
            '移除瓶蓋和金屬環',
            '清空玻璃容器內的液體',
            '不要丟棄碎玻璃',
            '可以堆疊玻璃瓶節省空間'
        ],
        examples: '玻璃瓶、玻璃杯、玻璃罐'
    },
    battery: {
        name: '電池 🔋',
        emoji: '🟧',
        color: '#f6ad55',
        description: '可充電和一次性電池',
        disposal: '電池應該送到電子廢物回收中心，不能放在普通垃圾箱',
        tips: [
            '電池含有有害化學物質',
            '不要放入垃圾或回收箱',
            '查找當地電池回收點',
            '電池也包括手機和筆記本電池'
        ],
        examples: 'AA電池、充電器、手機電池、遙控器電池'
    },
    cardboard: {
        name: '紙板 📦',
        emoji: '🟫',
        color: '#ed8936',
        description: '紙板、紙箱和紙製品',
        disposal: '紙板應該放在綠色或藍色回收箱中',
        tips: [
            '壓平紙箱以節省空間',
            '移除塑膠膠帶',
            '天氣潮濕時應該蓋好',
            '汙染的紙板不能回收'
        ],
        examples: '快遞箱、牛奶盒、紙板、報紙、紙板杯'
    },
    matal: {
        name: '金屬 🥫',
        emoji: '🟩',
        color: '#9f7aea',
        description: '金屬罐、鋁箔和金屬製品',
        disposal: '金屬應該放在回收箱中，會被熔化後重新使用',
        tips: [
            '清空金屬罐內的液體',
            '可以壓扁金屬罐節省空間',
            '移除粘附的標籤',
            '金屬是最有價值的可回收材料'
        ],
        examples: '鋁罐、鐵罐、鋁箔、金屬蓋'
    }
};

// 全局變數
let model;
let webcam;
let maxPredictions;
let currentImage;
let isModelLoaded = false;

// 模型配置
const MODEL_URL = './model.json';
const METADATA_URL = './metadata.json';

// 初始化應用
async function init() {
    showLoading(true);
    try {
        console.log('正在加載模型...');
        const modelURL = MODEL_URL;
        const metadataURL = METADATA_URL;
        
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        
        isModelLoaded = true;
        console.log('模型已加載，支持的類別數:', maxPredictions);
        
        showLoading(false);
        setupEventListeners();
    } catch (error) {
        console.error('模型加載失敗:', error);
        showError('模型加載失敗: ' + error.message);
        showLoading(false);
    }
}

// 設置事件監聽
function setupEventListeners() {
    // 模式切換
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchMode(this.dataset.mode);
        });
    });

    // 相機按鈕
    document.getElementById('startBtn').addEventListener('click', startCamera);
    document.getElementById('captureBtn').addEventListener('click', captureAndClassify);
    document.getElementById('stopBtn').addEventListener('click', stopCamera);

    // 上傳相關
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    
    uploadBox.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', handleFileSelect);
    
    // 拖拽上傳
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // 上傳按鈕
    document.getElementById('uploadBtn').addEventListener('click', classifyUploaded);

    // 重置按鈕
    document.getElementById('resetBtn').addEventListener('click', reset);
}

// 切換模式
function switchMode(mode) {
    // 更新按鈕狀態
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // 切換內容
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (mode === 'camera') {
        document.getElementById('camera-mode').classList.add('active');
    } else {
        document.getElementById('upload-mode').classList.add('active');
    }

    // 停止相機（如果打開）
    if (webcam) {
        stopCamera();
    }
}

// 啟動相機
async function startCamera() {
    if (webcam) return;
    
    try {
        const canvas = document.getElementById('canvas');
        
        webcam = new tmImage.Webcam(
            400,
            400,
            true
        );

        await webcam.setup({
            facingMode: 'environment' // 使用後置相機
        });

        webcam.play();

        const video = document.getElementById('webcam');
        video.srcObject = webcam.canvas.captureStream(30);

        document.getElementById('captureBtn').disabled = false;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('startBtn').disabled = true;
    } catch (error) {
        console.error('相機啟動失敗:', error);
        showError('無法访问相機: ' + error.message + '。請檢查權限設置。');
    }
}

// 拍照並分類
async function captureAndClassify() {
    if (!webcam || !model) return;
    
    showLoading(true);
    try {
        const canvas = document.getElementById('canvas');
        
        await webcam.update();
        
        const prediction = await model.predict(webcam.canvas);
        
        // 將 canvas 轉換為圖片
        currentImage = webcam.canvas.toDataURL('image/jpeg');
        
        displayResults(prediction, currentImage);
        showLoading(false);
    } catch (error) {
        console.error('分類失敗:', error);
        showError('分類過程出現錯誤: ' + error.message);
        showLoading(false);
    }
}

// 處理文件選擇
function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

// 處理文件
function handleFiles(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    
    const reader = new FileReader();
    reader.onload = (event) => {
        currentImage = event.target.result;
        document.getElementById('uploadBox').style.opacity = '0.5';
        
        const img = document.createElement('img');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 224;
            canvas.height = 224;
            
            const size = Math.min(img.width, img.height);
            const x = (img.width - size) / 2;
            const y = (img.height - size) / 2;
            
            ctx.drawImage(img, x, y, size, size, 0, 0, 224, 224);
        };
        img.src = currentImage;
    };
    reader.readAsDataURL(file);
}

// 分類上傳的圖片
async function classifyUploaded() {
    if (!currentImage || !model) return;
    
    showLoading(true);
    try {
        const img = document.createElement('img');
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 224;
            canvas.height = 224;
            
            const size = Math.min(img.width, img.height);
            const x = (img.width - size) / 2;
            const y = (img.height - size) / 2;
            
            ctx.drawImage(img, x, y, size, size, 0, 0, 224, 224);
            
            const prediction = await model.predict(canvas);
            displayResults(prediction, currentImage);
            showLoading(false);
        };
        img.src = currentImage;
    } catch (error) {
        console.error('圖片分類失敗:', error);
        showError('圖片分類失敗: ' + error.message);
        showLoading(false);
    }
}

// 顯示結果
function displayResults(predictions, imageSource) {
    // 找到最高分類
    let maxScore = 0;
    let maxIndex = 0;
    
    predictions.forEach((prediction, index) => {
        if (prediction.probability > maxScore) {
            maxScore = prediction.probability;
            maxIndex = index;
        }
    });

    // 獲取類別標籤
    const labels = ['glass', 'battery', 'cardboard', 'matal'];
    const topLabel = labels[maxIndex] || 'unknown';
    const wasteData = WASTE_INFO[topLabel];

    // 隱藏上傳框
    document.getElementById('upload-mode').classList.remove('active');
    document.getElementById('camera-mode').classList.remove('active');

    // 顯示結果
    const resultsSection = document.getElementById('results');
    
    // 顯示圖片
    const resultImage = document.getElementById('resultImage');
    resultImage.innerHTML = `<img src="${imageSource}" alt="分類圖片">`;

    // 設置標題和描述
    document.getElementById('resultTitle').textContent = wasteData.emoji + ' ' + wasteData.name;

    // 顯示分類信息
    const classificationsDiv = document.getElementById('classifications');
    classificationsDiv.innerHTML = '';
    
    predictions.forEach((prediction, index) => {
        const label = labels[index] || `類別${index}`;
        const percentage = (prediction.probability * 100).toFixed(1);
        const wasteType = WASTE_INFO[label];
        
        const item = document.createElement('div');
        item.className = 'classification-item';
        item.innerHTML = `
            <div class="classification-label">
                <span>${wasteType.emoji} ${wasteType.name}</span>
                <span>${percentage}%</span>
            </div>
            <div class="classification-bar">
                <div class="classification-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        classificationsDiv.appendChild(item);
    });

    // 顯示詳細信息
    const wasteInfoDiv = document.getElementById('wasteInfo');
    wasteInfoDiv.className = `waste-info waste-${topLabel}`;
    wasteInfoDiv.innerHTML = `
        <h3>📖 ${wasteData.name}</h3>
        <p><strong>分類: </strong>${wasteData.description}</p>
        <p><strong>📍 處理方式: </strong>${wasteData.disposal}</p>
        <p><strong>例子: </strong>${wasteData.examples}</p>
        <div class="waste-tips">
            <strong>💡 小貼士:</strong>
            <ul>
                ${wasteData.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `;

    resultsSection.style.display = 'block';
}

// 停止相機
function stopCamera() {
    if (webcam) {
        webcam.stop();
        webcam = null;
    }

    const video = document.getElementById('webcam');
    video.srcObject = null;

    document.getElementById('captureBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('startBtn').disabled = false;
}

// 重設
function reset() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('upload-mode').classList.add('active');
    document.getElementById('uploadBox').style.opacity = '1';
    document.getElementById('fileInput').value = '';
    currentImage = null;
}

// 顯示/隱藏加載狀態
function showLoading(show) {
    const loadingDiv = document.getElementById('loading');
    if (show) {
        loadingDiv.style.display = 'flex';
    } else {
        loadingDiv.style.display = 'none';
    }
}

// 顯示錯誤信息
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// 頁面加載完成時初始化
document.addEventListener('DOMContentLoaded', init);

// 頁面卸載時清理資源
window.addEventListener('beforeunload', () => {
    if (webcam) {
        stopCamera();
    }
});
