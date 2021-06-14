# 我的私藏餐廳
陳列我最愛的餐廳平台

## 網站功能
- 陳列我收藏的餐廳，主頁面可看到餐廳名稱、餐廳類別和我的評分
- 搜尋功能可以透過關鍵字搜尋餐廳名稱或類別
- 排序功能可以將畫面中的餐廳依希望的方式排序
- 「介紹」可以看到餐廳更多的相關資訊
- 「編輯」可以看到編輯餐廳的相關資訊
- 「刪除」可以將點選的餐廳從我的私藏中移除
- 「建立新餐廳」可以新增餐廳到我的私藏名單中

## 畫面截圖
![首頁](https://github.com/konnono/my-restaurant-list/blob/main/A8-cover_page.png)
![介紹頁](https://github.com/konnono/my-restaurant-list/blob/main/A6-detail_page.png)

## 安裝方式
複製檔案
```
git clone https://github.com/konnono/my-restaurant-list.git
```

準備mongoDB:
- 請在mongoDB準備一個名為「restaurant-db」的資料庫

在檔案夾中執行
```
npm install
```

產生種子檔案
```
npm run seed
```

執行程式:
```
npm run start
```

以開發模式執行程式(nodemon):
```
npm run dev
```
You should see server up and running message on console
