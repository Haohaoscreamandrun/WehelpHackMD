Week 6 Discussion - Membership
===
## 補充 - SQL injection攻擊及參數化查詢如何預防
### 何謂 SQL injection 攻擊?
1. WHAT is SQL injection? 
> 是一種可以攻擊所有支援SQL指令資料庫伺服器的方法。在2007-2010間被*開放式Web應用程式安全專案(OWASP)*選為前10大網路應用漏洞，並在2013年被列為第一大攻擊手段。
2. WHERE is it take place? 
> 發生在應用程式提供使用者輸入介面，如身分驗證或搜尋功能；或程式使用Cookies或Session資料執行SQL查詢。
3. WHAT KIND of database vulnerable to it? 
> 任何使用SQL進行資料操作與查詢的資料庫都有此風險，只要應用程式沒有適當的驗證與清潔使用者輸入資料就直接與SQL查詢語句整合即有風險。
4. WHEN will it happen?
> - 使用字串連結方式或聯合查詢方式
> - 使用權限過大的帳戶來連結資料庫
> - 開放了不必要且權力過大的功能
> - 過度信任使用者所輸入的資料
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
> ```Username: admin' OR '1'='1```
> ```Password: admin' OR '1'='1```
```sql
SELECT * FROM users 
WHERE username='admin' OR '1'='1' 
AND password='admin' OR '1'='1';
```
> 因為```'1'='1'```永遠是```True```，對於SQL來說語意和以下相同：
```sql
SELECT * FROM users;
```