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

### Set in Python

1. Set 在 Python 中的資料結構使用哈希(Hashing), 允許使用者在平均O(1)的時間複雜度下執行插入、刪除與遍歷。
2. Set 中的元素是沒有順序的，因此也無法以 index 來存取特定元素。
3. 雜湊函數是這種資料結構的基礎，將鍵映射到索引或數字，這個索引被稱為雜湊碼（Hash Code）。優秀的雜湊函數應均勻地映射鍵到雜湊表的不同位置，減少碰撞。

### List in Python

1. List 是有順序的資料結構，如同其他語言中的陣列(array)。
2. List 的搜尋是從 index 小至大逐一比對，若元素不存在於 list 則時間複雜度為O(n)。

## 試說明 JWT 的運作機制？是否可以搭配 Cookie 使用？

### JWT 運作機制

1. Client 輸入正確的登入資訊後透過 POST 請求送至 Server.
2. Server 檢查登入資訊是否正確，以密鑰加密資訊產生 JSON Web Token (JWT)，回傳給 Client 端.
3. Client 得到 JWT 後儲存在瀏覽器，並以此 JWT 附加在之後送出的請求中。
4. Server 收到包含 JWT 的請求，檢查 JWT 的簽名並從解密 JWT 中得到使用者資訊。
5. Server 回傳該名使用者請求的資源。

### 搭配Cookie使用

1. Cookie是由瀏覽器在請求時自動帶上的，但需要同網域，需要防 CSRF
2. header bearer token 由前端在 request header 中手動放入 JWT，需要 local storage，需要防 XSS
3. 同網域的話，用 cookie 會比較好，比較多安全的參數可以調整
如 samesite、httponly、secure 等，跨網域只能（或建議）選擇用 bearer token。
4. 用 cookies 就沒辦法同時兼顧到 mobile 端。

## 試說明 JWT 機制如何預防使用者竄改 Token？

### JWT 組成

1. JWT的組合可以看成是三個JSON object，並且用.來做區隔，而這三個部分會各自進行編碼，組成一個JWT字串。
2. 第一部份：Header，由兩個欄位組成，為Base64編碼，可逆解。

    ```json
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    {
        "alg": "HS256", // token加密演算法
        "typ": "JWT"    // token type
    }
    ```

3. 第二部份：Payload，用於傳遞訊息的欄位，可以放一些自己想放的東西或建議放置的標準訊息，為Base64編碼，可逆解。

    ```json
    // eyJpZCI6MSwibmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE3MTk4Mjc5MTV9.
    {
        "id": 1,
        "name": "test",
        "email": "<test@test.com>",
        "exp": 1719827915
    }
    ```

4. 第三部份：Verify Signature，將前兩部份的加密字串合併密鑰，再次進行加密。

    ```json
    // .mNJpvyczAWWzmStGmRe-b55PK2Jhfe_gQCT1rfioh0k
    HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret
      )
    ```

5. 因為第三部份包含前兩部份的加密，若竄改了前面兩部份，第三部份一定也會改變，且因為密鑰被儲存在 Server 中，使用者無法自行編寫合法 JWT.

## JWT 機制中，使用者狀態是存放在客戶端或伺服器端？有何優缺點？

1. 資料全部都放在 Client side 中，JWT 的利用可以降低查詢資料庫的需求。
2. 優點：
    1. 採用JSON object的形式，大部分的程式語言皆支援
    2. 整個JWT，只要Payload不要放過多的資訊，其實Size是相當小的
    3. 不用在Server的資料庫存放Session，特別適合多台Server的情境下，使得擴展性容易，因為多台Server要使用Session的話，會有共享Session的問題產生.
    4. 支持跨域請求，不會有傳統用Cookie進行跨域請求等問題
