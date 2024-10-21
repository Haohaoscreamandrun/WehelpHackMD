# White-board

## Python 程式碼考題

### 請說明和解釋印出來的結果

1. 第一題

    ```py
    def test():
      x=3
    test()
    print(x)
    # NameError: name 'x' is not defined
    ```

    x 在function內命名為local variable，他並無法在function外被取用
    可以透過return或命名global變數來在function外得到變數x

2. 第二題

    ```py
    x=3
    def test():
      x=10
    test()
    print(x) # 3
    ```

    命名 local variable 並不影響 global variable，若要影響 global variable 則需要在 function 內命名 global 變數：

    ```py
    x = 3

    def test():
        global x
        x = 10

    test()
    print(x)  # Output: 10
    ```

3. 第三題

    ```py
    x=3
    def test():
      global x
      x=10
    test()
    print(x) # Output: 10
    ```

4. 第四題

    ```py
    data=[0, 1, 5, 2, 4, 3, 6]
    print(data[-6]) # 1
    print(data[1:-2]) # [1,5,2,4]
    print(data[4::-2]) # [4,5,0]
    print(data[-7:-3]) # [0,1,5,2]
    print(data[-3:-7]) # []
    print(data[-3:-7:-1]) # [4,2,5,1]
    print(data[-8]) # IndexError: list index out of range
    ```

    1. 從6開始是 index -1, 往前推算
    2. index[1]是1, index[-2]是3
    3. 從 index[4] 開始, 往前每2位取值
    4. index[-7]為0, index[-3]為4
    5. 預設的step是+1, python無法在這個範圍內取值
    6. 將step修改為-1後即可正常取值

### 請將以下函式改用 Lambda 語法撰寫

```py
def test(x):
return x*2
print(test(3))

test = lambda x: x * 2
print(test(3))
```

### 請問以下程式會印出什麼？

```py
data = ["", -1, None, [False], True, {}]
for d in data:
  if d:
  print(d)
```

### 請問以下程式會印出什麼

```py
data = [3, 4, 5, 6]
print(data[:] is data)
print(data[:] == data)
```

### 請運用 generator 的技巧完成以下程式

```py
def myGenerator(max):
 # 你的程式碼

for n in myGenerator(5):
 print(n)

# 程式要印出 2, 4, 6, 8, 10
```

### 請定義 Iterator 物件的類別，完成以下程式

```py
class MyData:
 def __init__(self, max):
  self.n=0
  self.max=max
 # 你的程式碼

for x in MyData(5):
 print(x)

# 程式要印出 2, 4, 6, 8, 10
```

### 請使用 with … as … 改寫以下程式

```py
file=open("data", mode="w")
file.write("Hello")
file.close()
```

## Linux basic cmd

1. 資料夾與檔案處理

```shell
# 建立資料夾
mkdir [OPTION] DIRName
## 參數: -p 多層目錄
mkdir -p dir1/dir2/dir3

# 刪除檔案或資料夾
rm [OPTION] File
## 參數: -r 刪除資料夾 -f 強制刪除
rm -r myDir

# 列出資料夾內容
ls [OPTION] DIRName
## 參數: -l 列出詳細資訊 -a 列出隱藏檔案 -R 遞迴: 也列出子資料夾內容
ls -al

# 切換工作目錄
cd MyDir
cd .. # 回上層
cd ~ # 家目錄
cd / # 根目錄

# 列出當前目錄
pwd

# 複製資料夾或檔案
cp [OPTION] SOURCE DESTINATION
# 參數 
## -r 遞迴
cp -r ./myDir ./myDir2
## -p 同時複製權限、所有者、時間
## -f 強制覆蓋 -i 詢問覆蓋 -s 複製捷徑
```
