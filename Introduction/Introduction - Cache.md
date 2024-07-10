# Cache 快取

## 如何改善計算機系統的整體效率

### 找出系統的瓶頸

1. CPU bound
    1. 3A遊戲大作
    2. 虛擬實境
    3. 影像編輯
2. I/O bound
    1. 大多數網站
    2. 文字處理軟體
    3. 網路爬蟲

### CPU Cache & Main Memory

1. CPU register 的處理速度是 0.25-0.5 ns
2. Main Memory 的處理速度是 80-250 ns
3. 如果中間沒有CPU Cache，CPU會花大量時間等待主記憶體回傳資料再運算
4. CPU Cache 的處理速度是 0.5-25 ns，但成本比主記憶體高很多所以空間很小
5. SSD 25000-50000 ns, Magnetic Disk ~ 5000000 ns, 所有讀取的過程都會很慢。

### Local System & Web server

1. Local storage ~1 ms
2. Web Server ~100 ms
3. 不管放在本機哪裡，都比直接去遠端伺服器存取快很多。

### Redis &  MySQL

1. Redis ~ 0.01 ms
2. MySQL ~ 1 ms
3. Redis主要用記憶體存資料，相較於MySQL存在磁碟機

## 快取管理策略

### 快取資料一致性

1. 快取必須和原始資料來源的資料保持一致
    1. GET:先檢查快取是否有資料，若無，從原始來源獲得並加入快取
    2. POST:更新原始來源並清除相關快取。

### 快取的置換策略

1. 快取無法儲存所有資料
2. Least Recently Used 優先存快取
