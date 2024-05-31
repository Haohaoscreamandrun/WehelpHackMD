# Week9 discussion - AWS

## 什麼是 Linux Package Manager，請查詢 Ubuntu、RHEL 使用的 Package Manager 分別是？

### Package manager

1. 在Linux系統上，軟體被建立為*package*，透過*repositories*散佈，並在使用者終端上透過*package managers*管理。
2. 每個Linux系統都包含上千個*packages*，其中很多都需要其他*package*才能順利運行，這些就稱為這個*package*的*dependencies*。
3. *Package managers*協助終端使用者自動化安裝、升級和移除*packages*和它的*dependencies*。可以大幅增進使用者體驗和有效率的管理Linux上的軟體。
4. 使用*Package managers*的優點：
    1. 獲取正確、可信和穩定*package*的簡單方法。
    2. 當獲取或刪除*package*時，自動管理相關的*dependencies*
    3. *package managers*會依照Linux的習慣來存儲軟體。
    4. *package managers*通常會提供簡單的指令可以更新所有的*packages*。

### 常見的*Package Managers*

#### APT(Advanced Package Tool)

+ 使用系統: Ubuntu、Debian and Kali Linux
+ Commands: ```apt(new), apt-get(old)```
+ 底層package: dpkg
+ 儲存格式: ```.deb```

#### YUM(Yellowdog Updater)

+ 使用系統: RHEL/CentOS7, Fedora 21
+ Commands: ```yum```
+ 底層package: RPM
+ 儲存格式: ```.rpm```

#### DNF(Dandified YUM)

> YUM successor

+ 使用系統: RHEL/CentOS8, Fedora 22
+ Commands: ```dnf, yum```
+ 底層package: RPM
+ 儲存格式: ```.rpm```

## 請查詢並試算，如果你現在使用的 EC2 Instance 完整運作一整個月，沒有免費額度的情況下，要花多少費用？

### 目前使用的EC2 instance 詳細資訊

1. 位置：亞太區(雪梨)
2. vCPU: 1
3. instance type: t2.micro
4. 定價:
    1. 方案(隨需): USD $0.0146/hr
    2. 方案(Saving plans): USD $0.0105/hr (rent 1y/total pre pay)

### Calculation

因不滿一年，使用隨需方案計算：
一個月小時數：30*24 = 720 hr
總價：$0.0146/hr * 720hr = USD $ 10.512 = NTD $ 341.3

## 請分享你的景點資料庫設計

## 請分享你判斷目前取得的頁面資料，是否為最後一頁的策略

1. 每次向MySQL取資料時，LIMIT 13
2. 若fetchall後的len(data) == 13, 代表後面還有頁面呈現
3. 若fetchall後的 0 < len(data) <= 12, 代表後面沒有頁面，但此頁有最後幾筆的資料

> 使用此邏輯之優點：GET請求還是只需要向MySQL資料庫請求一次，且與原本請求的資料量差異不大。

## 請分享你按照捷運週邊景點數量排序，取得捷運站名的方式

```py
sql = "SELECT mrt FROM attractions\
   GROUP BY mrt\
   ORDER BY COUNT(name) DESC"
mycursor = mydb.cursor()
mycursor.execute(sql)
myresult = mycursor.fetchall()
list = []
for mrt in myresult:
    if mrt[0] is not None:
        list.append(mrt[0])
        return JSONResponse(status_code=200, content={"data": list})
```

因有景點之mrt為null值，在return結果之前掃過一次