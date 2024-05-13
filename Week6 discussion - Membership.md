Week 6 Discussion - Membership
===
## 使用 SessionMiddleware 管理的使用者狀態資訊，是否可能被任意竄改？
+ SessionMiddleware會在使用者建立一個新的session時生成一個隨機且唯一的session ID用於識別此session，並將此session ID儲存於client-side(cookie)，而其他資訊則儲存在server-side(session store)。

   + client-side(key-value pair):
> {user: s%3A**h30wc0pvSHJCYLVz0tui0Cv6NCCexGV8**.Cw7O3d354j%2FMcrxrXuWb65%2FRUpV6QdV07axdG0rZc8Y}
   + server-side:
> h30wc0pvSHJCYLVz0tui0Cv6NCCexGV8

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
## 哪些路徑的後端程式，必須驗證使用者為已登入的狀態？為什麼？
## 刪除留言的操作，若直接根據前端傳進來的留言編號刪除，有什麼風險？如何避免？
## 為什麼我們應該使用 SQL 語句檢查某個帳戶是否存在，而不是把所有會員資料抓取後自己寫程式檢查？
## 承上，我們是否應該優化會員頁面一次抓取所有留言的操作，該如何優化？
## 請舉例說明什麼是 SQL Injection？如何防止？
## 補充 - SQL injection攻擊及參數化查詢如何預防
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



session, cookie, 還有有的同學可能會查到的HTTPBasicCredentials, JWT都有相關，但不完全相同