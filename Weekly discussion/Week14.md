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
    3. [OpenCV.js](https://docs.opencv.org/3.4/d5/d10/tutorial_js_root.html)
    4. [Tesseract.js](https://tesseract.projectnaptha.com/)
    5. [如何在 Nodejs 或前端使用 OpenCV](https://hi-upchen.medium.com/%E5%A6%82%E4%BD%95%E5%9C%A8-nodejs-%E6%88%96%E5%89%8D%E7%AB%AF%E4%BD%BF%E7%94%A8-opencv-%E5%85%8D%E5%AE%89%E8%A3%9D-cc2fea289054)
    6. [Building a Robust License Plate Detection and Recognition System using JavaScript](https://javascript.plainenglish.io/building-a-robust-license-plate-detection-and-recognition-system-using-javascript-8c64b314eec2)
    7. [Automatic Number Plate Recognition System using EasyOCR](https://www.geeksforgeeks.org/automatic-license-number-plate-recognition-system/)
    8. [How to detect vehicle license plates in photos in Javascript](https://cloudmersive.medium.com/how-to-detect-vehicle-license-plates-in-photos-in-javascript-db551505335)
    9. [License Plate Recognition with OpenCV and Tesseract OCR](https://www.geeksforgeeks.org/license-plate-recognition-with-opencv-and-tesseract-ocr/)
    10. [Taiwan_License_Plate_Recognition](https://github.com/KuoFuKai/Taiwan_License_Plate_Recognition?tab=readme-ov-file)
    11. [taiwan-license-plate-recognition-research-tlprr Dataset](https://universe.roboflow.com/jackresearch0/taiwan-license-plate-recognition-research-tlprr/dataset/7)
    12. [論文: Simultaneous End-to-End Vehicle and License Plate Detection with Multi-Branch Attention Neural Network Supplementary Materials](https://github.com/chensonglu/Vehicle_License_Plate_Datasets/tree/master)
    13. [車牌辨識步驟：Detect and Recognize Car License Plate from a video in real time](https://www.geeksforgeeks.org/detect-and-recognize-car-license-plate-from-a-video-in-real-time/)
