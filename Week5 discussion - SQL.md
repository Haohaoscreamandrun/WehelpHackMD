Week 5 Discussion - SQL
===
## 請說明 Primary Key 的主要概念和實際的作用？
## 請說明 Foreign Key 的主要概念和實際的作用？
### Primary key vs. Foreign key 的主要概念
#### 關聯式資料庫管理(Relational Database Management System, RDBMS)
Key是關聯式資料庫中最重的的元素，除了可以維持Tables之間的關係，也可以幫助準確判別table中的資料。關聯式資料庫如Oracle SQL和MySQL，使用一疊的表格同時表示資料與他們之間的關係。Primary key就是用於提取出表格中唯一列的工具；而Foreign key則是用於表達表格之間的關係。
### Primary key vs. Foreign key 的實際作用
Primary key欄位不能包含任何null值，且必須各自是唯一值；他可以是已經存在的資料欄位，或是由資料庫自動生成，但一份表格中僅能有一欄；此constraint在已經連結至其他表格時(作為其他表格的Foreign key)無法被刪除(drop)。
Foreign key欄位可能是一欄或多欄；通常是來自其他表格的Primary key。此欄位可以接受重複值與null(在此情況下無法連結至其他表格)，且可以在連結的子表格中刪除此constraint。
有Primary key除了能夠指定唯一存在的列，也確保更快速得存取。而使用Foreign key可以讓我們不用再子表格中存儲同樣的欄位，只需要透過這個Foreign key連結到母表格中唯一的列中其他資訊。
實際上，Foreign key constraint保證我們在子表格中新增任何資料時，都必須與母表格產生連結；實際利用上，可以用來確保訂單只在還有商品的情況下建立，且可以透過Foreign key找到下訂者或商品的詳細資料。
## 請示範操作如何使用 MySQL Workbench 產生 ERD (Entity Relationship Diagram)
[How to Create a Simple ERD in MySQL Workbench](https://www.databasestar.com/mysql-workbench-erd/)
1. 在MySQL Workbench中建立資料庫與表格。
2. 在子表格下方tab中點選foreign keys，並在左邊填入foreign key名稱和引入的母表格；在右方選擇子表格column和母表格column。
3. 在上方Model review中新增ERR diagram(Enhanced Entity Relationship)
4. 點開後從catalog tree將創建好的表格拖曳至中央畫布。
5. 若foreign keys設置正確，表格之間的關係已清楚顯示。
## 如何使用 index 索引加速 SELECT * FROM table_name WHERE column_1='test' and column_2='test'; 這樣的查詢語句？如何可以觀察到索引的加速效果？
### 何謂索引(index)?
如果沒有索引，資料庫將會從頭掃描到尾，一直到找尋到符合目標為止，一旦表中的資料量增加，搜尋的速度就會越慢，效能就會越差，因此一張好的資料表要有相對應的索引來幫助搜尋。
創建索引後，系統會多花空間建立一個已經排序過的key-value，之後若索引欄位被呼叫，就可以從這個更小的範圍裡去搜尋，以節省時間。
### MySQL提供何種索引?
1. Primary key: 一個表格只能有一欄，值不可重複或為null。
2. Unique index: 值不可重複，但可以存為null。
3. non-Unique index: 可重複也可為null。
4. full-text search: 可設定的欄位只有CHAR、VARCHAR和TEXT等字元型態，允許null。
### 如何建立索引?
```SQL
mysql> CREATE TABLE member (
mysql> id      INT UNSIGNED PRIMARY KEY,
mysql> name    VARCHAR(20),
mysql> email   VARCHAR(36) UNIQUE KEY,
mysql> )

mysql> CREATE TABLE member (
mysql> id,
mysql> name,
mysql> email,
mysql> PRIMARY KEY(id),
mysql> UNIQUE KEY(email),
mysql> )

創建單值索引
mysql> CREATE INDEX email_index ON member(email);
mysql> ALTER TABLE member ADD INDEX(email);
創建複合索引
mysql> CREATE INDEX email_tel_index ON member(email, tel);
mysql> ALTER TABLE member ADD INDEX email_tel_index (email, tel);

mysql> create index username_password_index on member(username,password);
```
通常搜尋時不會只有針對一個欄位，使用複合索引效率會更好。
創建複合索引時，放越前面欄位的條件先被搜尋，因此越具唯一性的欄位要放前面。

要分析查詢使用的索引與使用的時間，可以在query前加上前綴：
```sql
mysql> explain SELECT * FROM member WHERE username='test' and password='test';
mysql> explain analyze SELECT * FROM member WHERE username='test' and password='test';
```
![W5D](/Week5%20discussion_1.png)
![W5D](/Week5%20discussion_2.png)
![W5D](/Week5%20discussion_3.png)
key欄可以判斷MySQL有無使用索引查詢
依照analyze的結果，使用複合索引查詢的速度較快。

## 基於第五週的資料表設計，如果我們要進一步支援回覆留言的功能。你會怎麼設計新的、或修改舊的資料表來支援以某個留言 ID 選取該留言所有回覆的 SQL 語句？
1. 新增一個名稱為message_reply的table。
2. 引入message中的id(PRIMARY KEY)作為新表格的Foreign key。
3. inner join後選擇所有符合該留言ID的回覆。
```sql
select message_reply.id, message_reply.content,
from message_reply
where message.id = "ID"
inner join message_reply on message.id = message_reply_id
``` 

## 基於第五週的資料表設計，如果我們要進一步支援留言的額外關鍵字標籤紀錄 ( 請參考 WeHelp 技術文章的標籤概念 )。你會怎麼設計新的、或修改舊的資料表來支援選取所有標記特定關鍵字的留言資料的 SQL 語句？
