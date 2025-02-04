# Backend specific

## Python 程式語言

1. 你如何在 Python 中做多行註解？

   1. 在 python 中單行註解可以用#完成，而多行註解則為三引號

   ```py
   # 這是python中的單行註解
   """
   三引號構成的多行註解
   These comments are often utilized to provide detailed explanations, documentation, or notes about the code
   """
   ```

2. 請問 is 和 == 的差別？
   1. `==` 用於比較兩個變數的值是否相等：它比較的是變數所儲存的值。例如，`a == b` 表示比較 a 和 b 的值是否相同，即使它們是不同的對象，只要值相同，結果就是 `True`
   2. `is`用於比較兩個變數的內存地址是否相同：它檢查的是兩個變數是否引用了相同的對象。換句話說，`a is b` 只有當 a 和 b 指向的是同一個內存地址時，才會返回 `True`
3. pass 在程式中的用途是？
   1. 佔位符：在撰寫未完成的代碼時，`pass` 允許你保持語法正確，並防止語法錯誤。例如，在函數或類中未完成的部分可以先用 `pass` 暫時填充
   2. 保持語法完整：在控制流程中（如迴圈、條件語句），如果某個區塊目前無需執行任何動作，可以用 `pass` 保持語句完整而不執行任何行為
4. 如何在函式中使用全域變數？

   1. 在 Python 中，如果你想在函式中使用全域變數，需要使用 `global` 關鍵字來明確聲明該變數是全域變數。這樣可以在函式內對全域變數進行修改。

   ```py
   x = 10  # 全域變數
   def modify():
       global x  # 使用全域變數 x
       x = 20  # 修改全域變數

   modify()
   print(x)  # 20
   ```

5. 請問 Set 和 List 最大的差異是什麼？
6. 請問 List 和 Tuple 最大的差異是什麼？
   1. List
      1. 特點：有序、可變、可包含重複元素。
      2. 創建方法：使用中括號 `[]` 或內建函式 `list()`
      3. 適用場景：需要有序、可修改且允許重複元素的資料集合
   2. Set
      1. 特點：無序、唯一元素（不允許重複元素）。
      2. 創建方法：使用大括號 `{}` 或內建函式 `set()`
      3. 適用場景：需要唯一元素且不關心元素順序的資料集合，以及對集合運算(交集、聯集、差集)有需求的情況。
   3. Tuple
      1. 特點：有序、不可變。
      2. 創建方法：使用小括號 `()` 或不使用括號。
      3. 常用操作：索引訪問、解包、不可修改元素。
      4. 適用場景：需要有序但不可修改的資料集合，特別是對資料不需要修改的情況。
7. 什麼是列表的負索引？能否舉個例子說明？

   ```py
   a = [10, 20, 30, 40, 50]
   print(a[-1])  # 50，表示列表中的最後一個元素
   print(a[-2])  # 40，表示倒數第二個元素
   ```

8. 請說明 Mutable 和 Immutable 資料型態的差異？

   ```py
   # Immutable
   x = 3
   y = x
   print(id(y)) # 140708459256312
   y = y + 1
   print(x) # 3
   # 創造另一個heap並把y指向新的位址

   print(id(x)) # 140708459256312
   print(id(y)) # 140708459256344

   # y物件id改變

   # Mutable

   x = {'name': 'ply'}
   y = x
   y['name'] = 'pply'
   print(x) # {'name': 'pply'}

   print(id(x)) # 2434969971584
   print(id(y)) # 2434969971584

   # 物件id相同
   ```

   1. Immutable datatype: int, float, string, tuple, frozenset, 如果物件被創造出來後，其 value 沒辦法被改變，稱之為 Immutable objects。
   2. Mutable: list, dict, set, 如果物件被創造出來，其 value 可以被改變，我們稱為 Mutable objects

9. 試說明什麼試 Iterable 資料型態，在什麼地方會使用到？[link](https://myapollo.com.tw/blog/python-iterable-iterator-generator/)
   1. Iterable 資料型態是指可以逐一遍歷其中元素的資料結構。Python 中的 iterable 資料型態包含有序的 `list`, `tuple`, `str` ,和無序的 `set`, `dict`等，這些資料結構都實作了 `iter()`或`getitem()` 方法或支援 `for` 迴圈來逐一取出每個元素。
   2. iterable 資料型態在需要逐步處理資料或進行批次運算時經常使用，除了`for`迴圈之外很多 Python 內建函數，例如 `map()`, `filter()`, `sum()`，都能夠處理 iterable 資料型態。
10. 試說明淺拷貝和深拷貝的差異？如何進行深拷貝？[link](https://ithelp.ithome.com.tw/articles/10221255)

    1. 淺拷貝：
       1. 僅複製物件的第一層結構，對於嵌套的內部物件只會複製其 reference（指向相同的內存位址）。
       2. 修改淺拷貝物件中的內部嵌套物件，會影響到原始物件。
    2. 深拷貝：
       1. 完全複製物件及其所有層級的內部物件，這些內部物件不再與原始物件共享記憶體。
       2. 修改深拷貝後的物件不會影響到原始物件。
    3. 如何深拷貝 mutable 型態資料?(對 immutable 沒有差異)

       1. 需要 import copy 模組，裡面有 deepcopy 函式可以用

       ```py
       import copy
       a = [1, [2, 3]]
       b = a # Shallow copy
       a_deepcopy = copy.deepcopy(a) # Deep copy
       print(id(a), id(b), id(a_deepcopy))
       a_deepcopy[0] = 5
       print(a, a_deepcopy)
       """
       1966485926656
       1966485926656
       1966485924992
       [1, [2, 3]]
       [5, [2, 3]]
       """
       ```

11. 試說明 Generator 的應用場景？

    1. 也是 iterable 的一種，用於處理需要延遲執行或大量資料的情境，節省記憶體。
    2. generator 只是簡稱，其全名為 generator function 。generator function 是 1 個 function, 只是這個 function 會包含使用 yield 語法。 generator function 可以用 for 迴圈產生一系列的值，也可以用 next() 函式呼叫 1 次只取得 1 個值。

    ```py
    def one2ten():
    for x in range(1, 11):
        yield x

    x = one2ten()

    # 用 for 走訪:
    for i in x:
      print(i)
    """
    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    """

    # 用 next() 走訪：
    print(next(x))  # 1

    print(next(x))  # 2
    ```

12. 什麼是 Decorator？可能的應用場景？

    1. decorator 是以 function 作為參數的 function, 其作用是擴充其行為而不修改原 function 的內容
    2. 常見的應用場景包括 logging, 計時或是授權 function

    ```py
    import time

    def timer(func):
        def wrapper_func(*args, **kwargs):
            start_time = time.time()
            result = func(*args,**kwargs)
            end_time = time.time()
            print(f"Function {func.__name__} took {end_time - start_time:.4f}seconds to run")
            return result
        return wrapper_func

    # Syntax candy
    @timer
    def my_function():
        # some code here

    # Without syntax candy
    def my_function():
      # some code here
    my_function = timer(my_function)
    ```

13. 你覺得 JavaScript 和 Python 有什麼差別？
    1. 相較於 JS, Python 的代碼可維護性比較好，因為使用 indent 而不是大括弧
    2. Python 相較於 JS 比較簡潔易懂，比方說 for 迴圈，python 非常簡單可以寫完，但 JS 需要另外定義起點、終點和迭代方法；另一方面而言，JS 彈性較好
    3. JS 是弱型別語言，可以靈活運用變數

## FastAPI

1. 為什麼你要使用 FastAPI？
   1. Automatic Documentation: 快速自動產出可互動的 API 文件(Swagger UI)
   2. data validation: 兼容 Pydantic2 套件，可以簡單地完成對輸入資料的驗證
   3. standard-based: 立基在 OpenAPI 標準
   4. Speed: 是所有 python 框架中 benchmark 最快的框架之一，是基於 python 最新的非同步更新 asyncio 所產生的速度優勢
2. 試說明 ASGI Server 的用途？
   1. 非同步處理： ASGI 是 WSGI 的擴展，它支持非同步處理。這意味著一個請求可以被掛起，去處理其他請求，或者等待 I/O 操作完成後再繼續處理。
   2. 適用場景： 需要處理大量並發連線、長時間運行的任務，例如 WebSocket、HTTP/2、Server-Sent Events 等。
   3. FastAPI 是一個 ASGI 框架，只要使用 ASGI 伺服器程式(如 Uvicorn)運行就可以架起一個 ASGI server.
3. WSGI Server 和 ASGI Server 的差別？
   1. WSGI(Web Server Gateway Interface) and ASGI(Asynchornous Server Gateway Interface)是 Python Web 框架與 Web 伺服器之間溝通的標準介面。兩者最大的差異在於對 同步 和 非同步 處理的支援
   2. 隨著 Web 應用變得越來越複雜，對伺服器性能的要求也越來越高。非同步處理可以讓伺服器更有效地利用資源，處理更多的請求。ASGI 的出現就是為了滿足這種需求，它讓 Python Web 框架能夠更好地支持現代 Web 應用所需的特性。

## Flask

1. 為什麼你要使用 Flask？
2. 試說明 WSGI Server 的用途？
3. WSGI Server 和 ASGI Server 的差別？

## Node

1. 為什麼你要使用 Node.js？
2. 試解釋 Node.js Event Loop。
3. 試解釋 Node.js 的 Non-Block IO 系統。

## Database [DB 必讀](https://ithelp.ithome.com.tw/articles/10221111)

1. 請說明 No-SQL 和 SQL 資料庫的差異？
   1. SQL 資料庫（關聯式資料庫）
      1. 結構化： 資料以表格形式儲存，具有嚴格的結構，每個欄位都有固定的資料型態。
      2. 關聯性： 資料之間通過外鍵建立關聯，形成複雜的關係。
      3. ACID 特性： 確保資料的一致性、隔離性、耐久性。
      4. 代表性產品： MySQL, PostgreSQL, Oracle Database
   2. NoSQL 資料庫（非關聯式資料庫） 1. 非結構化： 資料儲存方式靈活，可以存儲各種格式的數據，如 JSON、XML 等。 2. 分散式： 容易水平擴展，適合處理大數據量。 3. 高性能： 針對特定查詢優化，性能優異。 4. 代表性產品： MongoDB, Cassandra, Redis
      |SQL|NonSQL|
      |不適合海量非結構化數據|靈活處理海量非結構化數據|
      |水平擴展性差|擴展性強適合大數據應用|
      |查詢語言強大方便操作|查詢複雜缺乏標準化|
      |數據完整適合複雜處理|一致性難保證容易落差|
2. 什麼是資料庫正規化？第一到第三正規化的觀念是什麼？
   1. 資料庫正規化 是一種資料庫設計的技術，目的是減少資料冗餘、避免資料不一致，並提高資料庫的整體效率。透過正規化，我們可以將資料分解成更小的、更獨立的表格，以減少資料重複，並確保資料的完整性。
   2. 第一正規化 (1NF):
      1. 每個欄位只能儲存一個值: 也就是說，一個欄位不能儲存多個值，例如將多個地址存放在同一個欄位中。
      2. 每個欄位都必須有唯一的名稱: 不能有兩個欄位名稱相同。
      3. 每一個表格中的每一行都必須是唯一的: 通常透過主鍵來實現。
   3. 第二正規化 (2NF):
      1. 每個非關鍵屬性必須完全依賴於主鍵: 也就是說，非主鍵欄位所包含的信息必須完全依賴於主鍵，不能只依賴主鍵的一部分。
   4. 第三正規化 (3NF):
      1. 每個非關鍵屬性必須直接依賴於主鍵，而不是依賴於其他非關鍵屬性: 也就是說，非主鍵欄位不能傳遞依賴於其他非主鍵欄位。
3. 什麼是索引？為什麼要加索引？是否知道索引背後的資料結構技巧。[link](https://ithelp.ithome.com.tw/articles/10221111)
   1. 索引就像一本書的目錄，它能幫助資料庫快速定位到特定的資料，而不需要逐一掃描整個資料表。索引是一種資料結構，通常是樹狀結構，它儲存著資料表中特定欄位的值以及指向對應數據行的指針。
   2. 如果沒有索引，資料庫將會從頭掃描到尾，一直到找尋到符合目標為止，一旦表中的資料量增加，搜尋的速度就會越慢，效能就會越差，因此一張好的資料表要有相對應的索引來幫助搜尋。
   3. 創建索引後，系統會多花空間建立一個已經排序過的 key-value，之後若索引欄位被呼叫，就可以從這個更小的範圍裡去搜尋，以節省時間。索引能加速 ORDER BY 和 GROUP BY 查詢。
   4. B+樹： 大部分資料庫系統使用 B+樹作為索引的資料結構。B+樹是一種平衡的多路搜索樹，相較於 B 樹層級更少(每層 4kb 都拿來放索引可以放很多)，只有最下面的葉子節點有資料，且節點之間有自帶排序，因此每次查詢的時間相對穩定
4. 什麼是外鍵？為什麼要加外鍵？
   外鍵（Foreign Key） 在關聯式資料庫中扮演著建立表與表之間關聯的重要角色。簡單來說，外鍵就是一個表中的欄位，其值參考了另一個表的主鍵。
   1. 增強資料的可靠性：外鍵將兩個相關的表連結起來，形成一個有意義的整體。
   2. 確保資料一致性： 外鍵約束(constraint)可以確保相關資料的一致性。
   3. 保持資料的完整性： 外鍵可以防止資料庫中出現孤兒記錄（即在一個表中存在沒有對應關聯的記錄）。
   4. 簡化資料庫設計： 通過外鍵，可以將複雜的資料結構分解成多個簡單的表，提高資料庫的可維護性。
5. 試說明 Transaction 和 ACID 的概念？[link](https://oldmo860617.medium.com/database-transaction-acid-156a3b75845e)
   1. 简单来说，Transaction 就是数据库的一组操作，要么全做，要么全不做。ACID 则是确保这些操作可靠性的四个重要特性。
   2. 从一个账户转账到另一个账户，这包含了两个操作：扣减一个账户的余额，增加另一个账户的余额。这两个操作必须同时成功或失败，才能保证账户余额的正确性。
   3. ACID:
      1. 原子性（Atomicity）： 一个事务是一个不可分割的工作单元，事务中的操作全部執行成功 or 全部不執行（只要其中一個行為失敗就全部回滾）。
      2. 一致性（Consistency）： 数据库总是从一个一致性状态转换到另一个一致性状态。
      3. 隔离性（Isolation）： 多个事务并发执行时，每个事务都好像是在单独的环境中执行，不受其他事务的干扰。同時發生得 A 和 B transaction 使用的資料庫應該要長的一樣，不應該是 B transaction 抓到 A transaction 進行一半的資料。
      4. 持久性（Durability）： 一旦事务提交，其对数据库的改变就是永久性的，即使发生系统故障也能够保持。
6. Inner Join, Outer Join, Left Join, Right Join 的差異？
   1. Inner Join(交集): 只返回兩個表中都有匹配記錄的行。
   2. Outer join: 分為 Left Join、Right Join 和 Full Outer Join
      1. Left join: 返回左邊表格的所有記錄，以及右邊表格中匹配的記錄。如果右邊表格中沒有匹配的記錄，則在對應的列填入 NULL。
      2. Right join: 與 Left Join 相反，返回右邊表格的所有記錄，以及左邊表格中匹配的記錄。
      3. Full outer join(聯集): 返回兩個表格的所有記錄，無論是否有匹配的記錄。沒有匹配的記錄會用 NULL 填充。
7. 請說明 Connection Pool 的運作觀念。
   1. 是一種用來管理資料庫連接的技術。它就像一個池子，裡面預先存放了若干個與資料庫建立的連接。當應用程式需要與資料庫進行交互時，並不是每次都新建一個連接，而是從池子中取出一個現成的連接來使用，用完之後再放回池子。
   2. Connection Pool 的工作原理
      1. 初始化： 應用程式啟動時，會初始化連接池，並建立一定數量的連接，放入池中。
      2. 获取连接： 當應用程式需要與資料庫進行交互時，會向連接池請求一個連接。
      3. 使用连接： 應用程式使用獲取到的連接執行 SQL 语句。
      4. 釋放连接： 使用完畢後，應用程式將連接返還給連接池。
      5. 回收连接： 連接池會對返回的連接進行驗證，如果有效則放回池中，否則將其關閉。
8. 資料結構演算法:Hash Map/Array 是什麼?適用場景是那些?為什麼不能取代 MySQL?
9. JWT?原理?Session?
   1. JWT 運作機制
      1. Client 輸入正確的登入資訊後透過 POST 請求送至 Server.
      2. Server 檢查登入資訊是否正確，以密鑰加密資訊產生 JSON Web Token (JWT)，回傳給 Client 端.
      3. Client 得到 JWT 後儲存在瀏覽器，並以此 JWT 附加在之後送出的請求中。
      4. Server 收到包含 JWT 的請求，檢查 JWT 的簽名並從解密 JWT 中得到使用者資訊。
      5. Server 回傳該名使用者請求的資源。
   2. 搭配 Cookie 使用
      1. Cookie 是由瀏覽器在請求時自動帶上的，但需要同網域，需要防 CSRF
      2. header bearer token 由前端在 request header 中手動放入 JWT，需要 local storage，需要防 XSS
      3. 同網域的話，用 cookie 會比較好，比較多安全的參數可以調整如 samesite、httponly、secure 等，跨網域只能（或建議）選擇用 bearer token。
      4. 用 cookies 就沒辦法同時兼顧到 mobile 端。
   3. JWT 組成
      1. JWT 的組合可以看成是三個 JSON object，並且用.來做區隔，而這三個部分會各自進行編碼，組成一個 JWT 字串。
      2. 第一部份：Header，由兩個欄位組成，為 Base64 編碼，可逆解。

         ```json
         // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
         {
           "alg": "HS256", // token加密演算法
           "typ": "JWT" // token type
         }
         ```

      3. 第二部份：Payload，用於傳遞訊息的欄位，可以放一些自己想放的東西或建議放置的標準訊息，為 Base64 編碼，可逆解。

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

         ```plaintext
         // .mNJpvyczAWWzmStGmRe-b55PK2Jhfe_gQCT1rfioh0k
         HMACSHA256(
         base64UrlEncode(header) + "." +
         base64UrlEncode(payload),
         secret
         )
         ```

      5. 因為第三部份包含前兩部份的加密，若竄改了前面兩部份，第三部份一定也會改變，且因為密鑰被儲存在 Server 中，使用者無法自行編寫合法 JWT.

   4. JWT 機制中，使用者狀態是存放在客戶端或伺服器端？有何優缺點？
      1. 資料全部都放在 Client side 中，JWT 的利用可以降低查詢資料庫的需求。
      2. 優點：
         1. 採用 JSON object 的形式，大部分的程式語言皆支援
         2. 整個 JWT，只要 Payload 不要放過多的資訊，其實 Size 是相當小的
         3. 不用在 Server 的資料庫存放 Session，特別適合多台 Server 的情境下，使得擴展性容易，因為多台 Server 要使用 Session 的話，會有共享 Session 的問題產生.
         4. 支持跨域請求，不會有傳統用 Cookie 進行跨域請求等問題

## Architecture

1. Nginx 的用途？你為什麼需要使用 Nginx？
   1. Nginx 是一款高性能的 HTTP 和反向代理服务器
      1. 静态文件服务: Nginx 在处理静态文件（如 HTML、CSS、JS、图片等）方面非常高效，能够快速响应客户端请求。
      2. 反向代理: Nginx 可以作为反向代理服务器:
         1. 负载均衡: 将请求分发到多个服务器上，提高系统的负载能力和可用性。
         2. 隐藏后端服务器: 将后端服务器的 IP 地址隐藏起来，提高安全性。
         3. SSL 卸载: 可以将 SSL 加解密的工作交给 Nginx 处理，减轻后端服务器的负担。
         4. 缓存静态内容: 提高网站的访问速度。
         5. 提供统一的访问入口: 可以通过一个域名访问多个后端服务。
      3. 使用 Nginx 的好處:
         1. 高性能: Nginx 的异步架构使其能够高效地处理大量的并发连接，适用于高流量的网站。
         2. 稳定性: Nginx 具有很高的稳定性，能够长时间稳定运行。
         3. 灵活配置: Nginx 提供了丰富的配置选项，可以根据不同的需求进行定制。
         4. 开源免费: Nginx 是一个开源软件，可以免费使用和定制。
2. 為什麼你會使用 S3，好處是什麼？
   1. 簡化開發： S3 提供簡單易用的 API，可以輕鬆地整合到應用程式中。
   2. 可儲存任何類型的資料： S3 可以儲存幾乎任何類型的資料，包括圖片、影片、文檔、備份等等。
   3. 無限容量： S3 的儲存容量幾乎沒有限制，可以隨著資料量的增長而擴展。
   4. 內容分發網絡 (CDN): 與 CDN 結合，加速全球用戶訪問網站或應用程式。
   5. 提供監控數據：儲存大量的原始資料，供分析工具使用。
   6. 提供 pre-signed url 服務: 上傳時客戶端可以透過從後端取得的暫時性 URL 將資料上傳至 S3，可以減少 server 後端壓力
3. 什麼是 CDN，你是否使用過 CDN？
   1. 全稱 Content Delivery Network，內容交付網路。它是一個分布式的伺服器網路，將內容複製到世界各地的多個伺服器上。當使用者訪問網站時，系統會自動將最近的伺服器上的內容傳遞給使用者，減少了數據傳輸的距離，提高了網站的訪問速度和穩定性。
   2. 加速網站速度： 將內容複製到離用戶更近的伺服器上，減少了數據傳輸的延遲，提高了網頁載入速度。
   3. 降低伺服器負擔： CDN 可以緩存靜態內容，減少源伺服器的請求，降低伺服器負擔。
   4. 我在個人專案中使用 AWS CloudFront 代理 S3 中儲存的車牌照片
4. 什麼是 Redis，為什麼要使用 Redis？[link](https://hackmd.io/@cynote/BkobMykLw)
   1. Redis 是一個開源、高效能的記憶體資料庫，常被用於資料快取、訊息佇列、排行榜等應用場景。
   2. 為什麼要使用 Redis?
      1. 超快速度 Cache： Redis 的資料都存儲在記憶體中，因此讀寫速度非常快，能大幅提升應用程式的響應速度。將經常訪問的資料存儲在 Redis 中，減少對後端資料庫的查詢，提高系統性能。
      2. Redis 支持數據的持久化，可以將內存中的數據保持在磁盤中，重啟的時候可以再次加載進行使用。
      3. 支持多種資料結構，如字符串、哈希、列表、集合、有序集合等，這使得它在處理複雜的資料結構時非常靈活。
5. 什麼是 DNS，A record 和 CName record 各有什麼用途？[link](https://pala.tw/https-a-record-cname/)
   1. DNS（Domain Name System，域名系統）就像是一個全球性的電話簿，將容易記憶的域名, 如 `www.example.com` 轉換成計算機能理解的 IP 地址（如 192.168.0.1）
   2. A record：
      1. 將一個域名直接映射到一個 IP 地址
      2. 要去「台北 101 大樓」，老司機就明白你要去的地點是「台北市信義區信義路五段 7 號」順利帶你到目的地。
   3. CNAME record：
      1. 將一個域名（別名）指向另一個域名
      2. 將子域名指向主域名，方便管理。
      3. 要去台北最高咖啡廳，老司機就明白你要去的地點是「台北 101 大樓」，進而知道你要去「台北市信義區信義路五段 7 號」順利帶你到目的地。
6. Docker 和傳統的 Virtual Machine 有什麼差別？
   1. Virtual Machine: 將一台物理伺服器分割成多個虛擬的伺服器，每個虛擬機都擁有獨立的作業系統、記憶體、硬碟等資源。
   2. Docker: 輕量級的容器化技術，它允許開發者將應用程式及其依賴打包成一個獨立的容器，這個容器可以在任何支持 Docker 的環境中運行。
   3. 差異:
      1. VM 的隔離性、技術難度與資源消耗都高，但啟動速度較慢
      2. Docker 隔離性較差，但資源消耗少、啟動快且容易移植
7. 什麼是 CI/CD？是否使用過任何 CI/CD 工具？
   1. CI/CD 是 持續整合 (Continuous Integration) 和 持續交付/部署 (Continuous Delivery/Deployment) 的縮寫。它是一套實踐方法，旨在自動化軟體開發流程，從程式碼編寫、測試到部署，讓軟體開發變得更加高效和可靠
   2. 持續整合 (CI)：開發人員頻繁地將代碼合併到主分支，並通過自動化的構建和測試來驗證代碼的正確性。這能及早發現並解決問題，提高軟體品質。
   3. 持續交付 (CD)：在每次代碼變更後，自動將可釋出的軟體構件部署到生產環境或類生產環境。這能加快軟體交付的速度，縮短產品上市時間。
8. 你會怎麼利用 AWS 或 GCP 提供的服務設計系統架構，來面對瞬間暴衝的需求量？
   1. 配置 Auto Scaling 組，在需求增加時自動擴展虛擬機或容器的數量，並部署 Elastic Load Balancer (AWS) 來分配流量，確保請求均勻分配到多個伺服器上，避免單一伺服器過載
   2. 使用 AWS CloudFront 或 GCP Cloud CDN 將靜態內容分發到全球各地，減少源伺服器的負擔並提升用戶端的響應速度
   3. 更精細的調控：配置 AWS CloudWatch 監控系統指標，針對特定事件或指標進行快速反應，自動發出告警並觸發 AWS Lambda 擴展機制，在流量高峰時自動擴展處理請求

## Security

0. Cookie 的運作方式?
1. 什麼是 SQL Injection？如何防止？
   1. WHAT is SQL injection?
      > 是一種可以攻擊所有支援 SQL 指令資料庫伺服器的方法。在 2007-2010 間被 **開放式 Web 應用程式安全專案(OWASP)** 選為前 10 大網路應用漏洞，並在 2013 年被列為第一大攻擊手段。
   2. WHERE is it take place?
      > 發生在應用程式提供使用者輸入介面，如身分驗證或搜尋功能；或程式使用 Cookies 或 Session 資料執行 SQL 查詢。
   3. WHAT KIND of database vulnerable to it?
      > 任何使用 SQL 進行資料操作與查詢的資料庫都有此風險，只要應用程式沒有適當的驗證與清潔使用者輸入資料就直接與 SQL 查詢語句整合即有風險。
   4. WHEN will it happen?
      1. 使用字串連結方式或聯合查詢方式
      2. 使用權限過大的帳戶來連結資料庫
      3. 開放了不必要且權力過大的功能
      4. 過度信任使用者所輸入的資料
   5. HOW to prevent it from happening?
      - 參數化查詢(Parameterized Queries): 資料庫伺服器不會將參數的內容視為 SQL 指令的一部分，而是在資料庫完成指令編譯後才套用參數，此時就算有 SQL 字串也不會被視為 SQL 的一部分執行。
      - 進行輸入驗證和過濾： 在接受使用者輸入時，應該進行驗證和過濾，以確保它們符合預期的格式和範圍。例如，對於僅允許整數的輸入，可以確保使用者輸入的值為整數，並在使用時進行適當的轉換。
      - 最小權限原則（Principle of Least Privilege）： 當編寫 SQL 查詢時，使用具有最小權限的資料庫使用者帳戶。這可以降低攻擊者成功利用 SQL 注入攻擊時所能造成的損害。
2. 什麼是 XSS 攻擊？如何防止？[link](https://www.explainthis.io/zh-hant/swe/what-is-xss)
   XSS 攻擊是指當某個惡意用戶，從客戶端注入攻擊腳本來達到某種目的(例如：竊取 Cookie、Session、密碼等)，導致其他用戶受到波及。之所以會說是跨域 (cross-site)，是因為這種攻擊方式，通常是從可信的來源發出，因此能夠繞過同源政策 (same origin policy)。
   1. Stored XSS: 被保存在資料庫中的 Javascript 引起的攻擊稱為 Stored XSS，最常見的就是文章、留言等，因為用戶可以任意輸入內容，若沒有檢查，則`<script>` 等標籤就會被視為正常的 HTML 執行。
   2. Reflected XSS: 此類型不會被存在資料庫中，主要透過用戶發出惡意的請求，倘若後端沒有過濾而直接將結果回傳前端的話，就有可能執行到惡意的程式碼
      1. 用戶可能會收到一封似乎合法的電子郵件，該郵件中包含一個似乎是合法的鏈接，但實際上已經被篡改。
      2. 當用戶點擊此鏈接時，嵌入在 URL 中的惡意腳本會在其瀏覽器中執行。
      3. 這可能導致攻擊者能夠竊取用戶的身份驗證令牌、進行非授權的操作，或甚至插入惡意內容。
   3. DOM-Based XSS: DOM 全名為 Document Object Model，它可以利用 Javascript 動態產生完整的網頁，不用透過後端，因此 DOM-Based XSS 是指網頁上的 Javascript 在執行過程中，沒有檢查輸入資料，使得操作 DOM 的過程中帶入了惡意程式碼
   4. 前兩種都必須由後端進行防範:
      1. 輸入驗證：對所有用戶輸入的數據進行嚴格的驗證，包括表單、查詢字符串、Cookie 等。限制輸入的類型、長度和範圍，避免接受不必要的數據。此外，應使用強類型和正則表達式來驗證用戶輸入，確保數據符合預期格式。
      2. 輸出編碼：在將用戶輸入的數據顯示到網頁上之前，應對特殊字符（如尖括號、單引號、雙引號等）進行轉義，避免瀏覽器將其解析為 HTML 或 JavaScript 代碼。
   5. DOM-based 需要從前端去防範，任何的輸入欄位，例如留言欄位、檔案上傳欄位、表單的欄位等，都要有跳脫的機制，讓腳本被轉換成字符串。
   6. 使用安全的函數庫和模板：在開發網站時，選擇已經內置 XSS 防護的函數庫和模板引擎。
3. 什麼是 DDoS 攻擊？如何處理？
   1. DDoS 攻擊是一種利用大量惡意流量阻塞伺服器或基礎設施的攻擊手段，導致合法用戶無法正常使用網站或服務。攻擊者使用多個來源同時發送請求，超載目標系統
   2. 使用 DDoS 防護服務（如 AWS Shield 或 Cloudflare）來過濾和阻擋惡意流量
   3. 設置流量監控與自動擴展，提升服務承受大量流量的能力
4. CSRF?

## Operating System

1. 請解釋 Process 和 Thread 的差別？
   1. Process (進程)：
      1. Process 是作業系統中的最小資源管理單位。每個 Process 擁有自己的記憶體空間、變數、文件描述符等資源，不同的 Process 無法直接共享這些資源。當一個程序啟動時，作業系統會為其創建一個 Process，並分配所需的資源來執行其代碼
      2. Process 意旨已經執行並且 load 到記憶體中的 Program，行程中的每一行程式碼隨時都有可能被 CPU 執行。
      3. 每一個 Process 又由下面兩項組成：
         1. 一個 Memory Space。相當於 Object 的 variable，不同 Process 的 Memory Space 也不同，彼此看不到對方的 Memory Space
         2. 一個以上的 Thread。
   2. Thread (線程)：
      1. Thread 是一個 Process 內部的執行單位，多個 Thread 可以共享同一個 Process 的資源，如記憶體和變數。因此，Thread 的切換速度比 Process 更快，且它們能夠彼此協作完成任務
      2. 以聊天室 Process 為例，可以同時接受對方傳來的訊息以及發送自己的訊息給對方，就是同個 Process 中不同 Thread 的功勞。
      3. 每一個 Thread 又由下面兩項組成：
         1. Stack：紀錄從某個起始點開始 (例如 main)，到目前為止所有函數的呼叫路徑，以及在這些呼叫路徑上所用到的區域變數。
         2. 紀錄 CPU 內部的暫存器 (如 Program Counter, Stack Pointer, Program Status Word 等) 的狀態。
2. 請解釋 Race Condition，能否進一步解釋 Deadlock？
   1. Race Condition 發生在多個執行緒或進程同時存取同一個資源時，當兩個線程同時存取共用變數時，就會發生競爭狀況。 第一個線程會讀取變數，而第二個線程會從變數讀取相同的值。 然後，第一個線程和第二個線程會對值執行其作業，然後他們爭相查看哪一個線程可以最後將值寫入共用變數。
   2. Deadlock 是指一組進程因為相互等待彼此所持有的資源，導致無法繼續執行的情況。這通常發生在多個進程或執行緒各自鎖定了一部分資源，並且彼此需要對方的資源才能完成工作，形成循環等待，最終導致系統陷入僵局
