# Week12 discussion - JWT

## 試舉例說明 I/O Bound 和 CPU Bound 程序是什麼意思？

### Input/Output bound

1. 簡單說就是花在要求資料的時間大於處理的時間。
2. 現今電腦多採馮諾伊曼架構，將資料處理單元與存儲單元分離，而資料在中央處理器與記憶體之間的傳輸速度是有限的，並且會限制整體速度。
3. 隨著CPU處理速度增加，程序可能更容易受到I/O bound，也因此整體速度並不會隨著CPU處理速度增加。
4. 在網路開發中，I/O bound指程序速度受限於與資料庫互動、檔案存取、網路請求等。比如：Fetching data, reading files and API request.
5. Optimization:
    1. Concurrency management: 使用callbacks/promises/async await等非同步方法避免event loop block.
    2. Caching: 使用緩存來避免過多的I/O操作。
    3. Optimize query: 資料庫index等技術。

### CPU bound

1. 花在要求資料的時間大於處理的時間。
2. 如果程序的底層邏輯可以接受多線程處理，處理速度可以由平行計算提升(任務平分至多個核心)。
3. 除了平行處理，現代技術包括多匯排(Multiple Buses)、多元程式規劃(Multiprogramming)、搶占調度(Preemptive Scheduling)都可以有效增加CPU的使用效率，使得目前的瓶頸通常不是單一元件，而是隨著不同的程序而有不同的瓶頸。
4. 網路開發中，資料密集計算或加密解密通常會用掉大量算力。
5. Optimization:
    1. Parallelism: 利用多線程或多程序在core之間分散loading。
    2. Optimization: 使用有效率的邏輯和資料結構。
    3. Scaling: 考量將任務分散於多數個伺服器之間來降低負載。

## Python 是一個多執行緒的語言嗎？Python 執行緒在什麼應用情境中能有效的加速？

### Global Interpreter Lock (GIL)

1. Python是一個支援多線程的語言，然而 CPython Interpreter 中 GIL 的存在，讓電腦只能一次使用一個線程來執行 python 程式碼。
2. GIL 是一個用於防止多線程並行處理(multithread concurrent)的機制，用以增加 CPython 的線程安全性(thread-safety)，避免多個線程同時訪問與修改共享資料。
3. 當一個 Python 程式是以多線程 multithread 的方式在運行時，只有爭取到 GIL 的線程可以運行該程式，並在執行完成後釋放 GIL。
4. CPython 另外內建了一個計時器，在達到一定的閾值後會強制當前線程釋放 GIL 讓所有線程一起爭取。
5. 一個直譯器只會有一個 GIL，因此，就算你把兩個不同的 thread 放在不同的核上，程式在運行時依然只會有一個 thread 在運行。

### Multithreading under I/O bound program

1. 在I/O密集型的任務中，例如網路請求、資料庫查詢或檔案處理等，給予這些任務不同的線程 ```threading.Thread```。
2. 程式會因為需要等待其他系統的回應而閒置，CPython強制釋出 GIL 後會有機會讓其他線程爭取到 GIL，有效利用等待的時間。

## 將十萬個不重複單字放進 Python 的 Set 和 List 中，並根據輸入查找某個單字是否存在，請問查找時，哪種結構比較有效率，為什麼？

## 試說明 JWT 的運作機制？是否可以搭配 Cookie 使用？

## 試說明 JWT 機制如何預防使用者竄改 Token？

## JWT 機制中，使用者狀態是存放在客戶端或伺服器端？有何優缺點？
