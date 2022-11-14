# F2E 2022 FE Week1
### 目前僅支援1920*1080畫面顯示
## 1. Folder Structure
```bash
.
├── README.md
├── src
│   ├── assets
│   ├── components
│   ├── containers
│   ├── hooks
│   ├── routes
└── build
```
## 2. 環境設定
```
npm install
```
## 3. Local Run
```
npm run start
```
啟動後可透過瀏覽器開啟
http:localhost:3000/
## 3. Build
```
npm run build
```
編譯好的靜態網頁會放在build資料夾

## 4. 結構說明

1. 程式進入點為index.tsx/App.js
2. 透過route轉導到首頁: containers/Home.tsx
3. Home.tsx裡面會包含一個主框架, 作為時間軸使用
4. 透過hooks/useScroller.tsx 來讀取時間軸資訊
5. 所有分鏡都放在components/StoryBoard資料夾下方
