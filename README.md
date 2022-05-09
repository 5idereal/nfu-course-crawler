# nfu-course-crawler

# 關於

# 開始使用

## 前往網頁

## 檢視原始檔案

### 屬性

- **id** *string*: **課號** 

- **name** *string*: **課程名稱**

- **teacher** *string*: **老師姓名**

- **type** *number*: **課程類型** (1: 必修, 2: 選修, 3: 通識)

- **credit** *number*: **學分數**

- **hours** *string*: **時數**

- **class** *string*: **授課班級**

- **M~U** *string*: **節數** (M~U 對應 星期一到日)

- **location** *string*: **上課地點**

- **students** *array*: **學生名單** (學號)

# 自行爬取

> 請確認是否已安裝 [Node.js](https://nodejs.org/en/) 和 [git](https://git-scm.com/)。

1. 將此 repo 下載到電腦上。

```bash
git clone https://github.com/SiderealArt/nfu-course-crawler
cd nfu-course-crawler
```

2. 安裝所需套件。

```bash
npm i
```

3. 執行程式。

```bash
node index.js
```

> ***爬取所有資料預計將耗費 18 小時。***

## 致謝
