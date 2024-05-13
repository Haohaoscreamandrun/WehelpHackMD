Week 6 Discussion - Membership
===
## 使用 SessionMiddleware 管理的使用者狀態資訊，是否可能被任意竄改？
+ SessionMiddleware會在使用者建立一個新的session時生成一個隨機且唯一的session ID用於識別此session，並將此session ID儲存於client-side(cookie)，而其他資訊則儲存在server-side(session store)。

  + client-side(key-value pair):
  ```
  {user: s%3A h30wc0pvSHJCYLVz0tui0Cv6NCCexGV8 .Cw7O3d354j%2FMcrxrXuWb65%2FRUpV6QdV07axdG0rZc8Y}
  ```
  + server-side:
  ```h30wc0pvSHJCYLVz0tui0Cv6NCCexGV8```

+ Session ID的資訊可以被讀取但無法被更改，因為經過簽名的訊息會同時附上一組鑑別碼；只要session ID被竄改，後面生成的鑑別碼就不一樣。

+ 每次伺服器收到包含session ID的request時，伺服器就可以比對session store的資料來找到相對應的使用者。

+ 但只要登入過後，伺服器就只認session ID，所以如果有人取得了cookie儲存的session ID，他就可以使用你的帳號，稱為session hijacking。

+ 以下是常見的三種session攻擊手法：
    1. Session fixation
        + 利用詐騙信件或其他方式，攻擊者指定一個有效的Session ID，讓使用者使用這個Session ID完成登入，攻擊者因此可以使用同一個Session ID欺騙伺服器已經通過登入驗證，進而回傳機密資訊。
        + 比如攻擊者以Query字串的方式讓使用者跳轉到登入頁面並設定Session ID: http://innocentsite.org/login?PHPSESSID=0123456789ABCDEF
        + 使用者以此Session ID登入，伺服器發現已有Session ID後沒有另外指派，攻擊者透過一樣的Session ID提出GET請求而得到原本需要先通過驗證的資訊。
        + 解決方式是在每次使用者的重要操作之前都派發一個新的Session ID，不論每次取得Session的間隔為何，並在每次登出後抹除所有Session。
    2. Session hijacking
        + 當攻擊者可以使用者存取請求和回復，而當使用者並未加密請求(比如只用URL傳送session ID)，攻擊者可以從請求當中看到Session ID，並直接加以利用。
        + 攻擊者可能透過公用Wi-Fi做到窺視連線資料，或是綁架網域名稱讓使用者實際上是向攻擊者伺服器傳送請求。
        + 跨站腳本攻擊：攻擊者通過在網頁中插入惡意的客戶端腳本代碼，使其在用戶瀏覽器上執行。比如在評論中發布包含用「```<script></script>```」標記括起來的可執行代碼。這些標記告訴 Web 瀏覽器將標記之間的所有內容解讀為 JavaScript 代碼。評論出現在頁面上之後，任何其他使用者載入網站時，其 Web 瀏覽器將執行指令碼標記之間的惡意代碼。
    3. Session prediction
        + 如果 Session ID 的長度、複雜度、雜亂度不夠，就能夠被攻擊者猜測。攻擊者只要寫程式不斷暴力計算 Session ID，就有機會得到有效的 Session ID 而竊取使用者帳號。
        + 通常套件內建的session ID生產function都有一定程度的安全性。
> References:
> 1. [cookie-session驗證原理以及express-session套件使用](https://johnnychang25678.medium.com/node-js-cookie-session%E9%A9%97%E8%AD%89%E5%8E%9F%E7%90%86%E4%BB%A5%E5%8F%8Aexpress-session%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8-aeafa386837e)
> 2. [深入 Session 與 Cookie：Express、PHP 與 Rails 的實作](https://github.com/aszx87410/blog/issues/46)
> 3. [HTTP Session 攻擊與防護](https://devco.re/blog/2014/06/03/http-session-protection/)
## 哪些路徑的後端程式，必須驗證使用者為已登入的狀態？為什麼？
1. 查詢或修改用戶資訊：當使用者訪問其個人資訊或帳戶設置頁面時，應該驗證使用者已經登入，以確保他們只能訪問自己的資訊。
2. 付款資訊和訂單管理：當使用者查看其訂單記錄或付款資訊時，應該驗證使用者已登入，以防止未經授權的訪問。
3. 管理員頁面：如果網站有管理員後台或管理員功能，則應該驗證使用者為管理員並已登入，以限制管理員功能的訪問。
4. 購物車及結帳：在購物車和結帳流程中，需要驗證使用者已登入，以確保訂單和付款資訊僅由授權的使用者訪問和操作。
## 刪除留言的操作，若直接根據前端傳進來的留言編號刪除，有什麼風險？如何避免？
1. 誤刪：可能是使用者不小心按到，並無意刪除。可以設定prevent default並再次以pop up向使用者確認是否要刪除該留言。
2. 非本人刪除：如果未進行適當的權限檢查，攻擊者可能會直接使用其他用戶的留言編號來刪除留言，這樣就會導致未經授權的操作。在執行刪除操作之前，應該對用戶的身份進行驗證，確保只有擁有適當權限的用戶才能刪除留言。例如，僅允許留言的作者或具有管理員權限的用戶進行刪除操作。
3. 繞過前端驗證：使用者可以使用開發者工具，並在console中執行程式將表單手動送出：
```js
document.getElementById("inputField").value = "Manipulated value";
document.getElementById("myForm").submit();
```
為避免此種情況，最好在後端也驗證過一次，確保使用者不能在繞過前端驗證後沒有其他把關方式。
4. 先讓他在前端消失，還不要操作資料庫(Dcard:這則留言已被刪除)
## 為什麼我們應該使用 SQL 語句檢查某個帳戶是否存在，而不是把所有會員資料抓取後自己寫程式檢查？
1. 效能問題：資料庫的資料量大時，SQL語法的查詢速度佔優勢，且只返回所需要的資料可以節省時間。
2. 資料傳輸量：每次查詢都傳輸整張表格會浪費大量的傳輸空間，增加網路流量與資料庫負載。
3. 安全性：在資料庫中查詢可以避免將所有敏感資料暴露到程式端，減少潛在的資料外洩風險。
4. 一致性：先擷取所有資料庫後若資料庫的資料變動會無法及時反應，導致輸出結果過時。
## 承上，我們是否應該優化會員頁面一次抓取所有留言的操作，該如何優化？
1. 只抓取前10筆留言，剩餘採用按鈕與pagination的方式讓使用者選擇是否要繼續抓取下一頁。
```py
def query_pagination(limit, offset):
    sql = "SELECT\
                message.id AS message,\
                member.username AS member, \
                message.context AS message \
            FROM member \
            INNER JOIN message ON member.id = message.member_id\
            LIMIT %s OFFSET %s"
    val = (limit, offset)
    mycursor.execute(sql,val)
```
2. 快取?
## 請舉例說明什麼是 SQL Injection？如何防止？
### 何謂 SQL injection 攻擊?
1. WHAT is SQL injection? 
> 是一種可以攻擊所有支援SQL指令資料庫伺服器的方法。在2007-2010間被 **開放式Web應用程式安全專案(OWASP)** 選為前10大網路應用漏洞，並在2013年被列為第一大攻擊手段。
2. WHERE is it take place? 
> 發生在應用程式提供使用者輸入介面，如身分驗證或搜尋功能；或程式使用Cookies或Session資料執行SQL查詢。
3. WHAT KIND of database vulnerable to it? 
> 任何使用SQL進行資料操作與查詢的資料庫都有此風險，只要應用程式沒有適當的驗證與清潔使用者輸入資料就直接與SQL查詢語句整合即有風險。
4. WHEN will it happen?
   - 使用字串連結方式或聯合查詢方式
   - 使用權限過大的帳戶來連結資料庫
   - 開放了不必要且權力過大的功能
   - 過度信任使用者所輸入的資料
5. HOW is it worked?  
> 當設計者未針對使用者輸入進行審查，並且直接整合進SQL搜尋語句：
```python
import mysql.connector

# Establish a connection to your MySQL database
connection = mysql.connector.connect(
    host="your_host",
    user="your_username",
    password="your_password",
    database="your_database"
)
# Create a cursor object
mycursor = connection.cursor()

# Example vulnerable query
username = input("Enter username: ")
password = input("Enter password: ")

sql = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'"

# Execute the query
mycursor.execute(sql)
```
> 攻擊者只要輸入特定字串，就可能跳出邏輯檢查。比如當使用者輸入：
```Username: admin' OR '1'='1```
```Password: admin' OR '1'='1```
```sql
SELECT * FROM users 
WHERE username='admin' OR '1'='1' 
AND password='admin' OR '1'='1';
```
> 因為```'1'='1'```永遠是```True```，對於SQL來說語意和以下相同：
```sql
SELECT * FROM users;
```
6. HOW to prevent it from happening?
    + 參數化查詢(Parameterized Queries): 資料庫伺服器不會將參數的內容視為SQL指令的一部分，而是在資料庫完成指令編譯後才套用參數，此時就算有SQL字串也不會被視為SQL的一部分執行。
    + 進行輸入驗證和過濾： 在接受使用者輸入時，應該進行驗證和過濾，以確保它們符合預期的格式和範圍。例如，對於僅允許整數的輸入，可以確保使用者輸入的值為整數，並在使用時進行適當的轉換。
    + 最小權限原則（Principle of Least Privilege）： 當編寫 SQL 查詢時，使用具有最小權限的資料庫使用者帳戶。這可以降低攻擊者成功利用 SQL 注入攻擊時所能造成的損害。


session, cookie, 還有有的同學可能會查到的HTTPBasicCredentials, JWT都有相關，但不完全相同