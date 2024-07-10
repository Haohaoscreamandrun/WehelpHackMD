# 停車場車牌識別與雲端繳費服務

## 主流程

1. 車輛入場，client系統判讀車牌號碼並拍攝車輛照片，前端判斷車牌號碼，用車牌號碼與照片URL打系統API。
2. 系統API得到車號：
    1. 確認剩餘車位，若有剩餘則回傳閘門開啟訊號。
    2. 若無剩餘車位，系統回傳車位已滿。
3. 系統取得車牌號碼與車輛照片URL，開始計算收費時間。
4. 使用者欲離場，於client端輸入車牌號碼，前端傳送此車牌號碼至後端系統。
5. 後端系統收到車牌號碼，於資料庫中尋找類似車牌號碼，回傳複數張車輛照片URL。
6. 使用者依照圖片選擇車輛，並確定欲繳費平台，打後端繳費API。
7. 系統依照離場時間，計算使用者應繳費金額。
8. 系統依照使用者選擇平台串接金流服務。
    1. 雲端發票服務?
9. 繳費成功，系統給予該車輛"允許離場"標誌，有效時間15分鐘。
    1. 若15分後該筆車輛訊息還未被移除，系統重新開始計算入場時間。
10. 車輛離場，client系統判讀車牌號碼，前端判斷車牌號碼，用車牌號碼打系統API。
11. 系統API得到車號
    1. 後端確認該車輛在系統中且有"允許離場"標誌，回傳閘門開啟訊息。系統將該車輛訊息刪除並修改剩餘車位數量。
    2. 後端確認該車輛在系統中且無"允許離場"標誌，回傳請上雲端系統繳費訊息。
    3. 後端並未於系統中查到該車輛，回傳該車輛無入場紀錄訊息。

## Client端會員系統

## Client端空車位查詢系統

## Client端EZgo自動離場繳費服務

## 套件

1. 圖像辨識：
    1. OpenCV，Pytesseract: [停車場 waiter](https://sciexplore.colife.org.tw/work/2024/C0116/con)
    2. [tensorflow.js](https://www.tensorflow.org/?hl=zh-tw)