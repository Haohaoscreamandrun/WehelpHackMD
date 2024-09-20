# Python 程式碼考題

## 請說明和解釋印出來的結果

1. 第一題

    ```py
    def test():
      x=3
    test()
    print(x)
    ```

2. 第二題

    ```py
    x=3
    def test():
      x=10
    test()
    print(x)
    ```

3. 第三題

    ```py
    x=3
    def test():
      global x
      x=10
    test()
    print(x)
    ```

4. 第四題

    ```py
    data=[0, 1, 5, 2, 4, 3, 6]
    print(data[-6])
    print(data[1:-2])
    print(data[4::-2])
    print(data[-7:-3])
    print(data[-3:-7])
    print(data[-3:-7:-1])
    print(data[-8])
    ```

## 請將以下函式改用 Lambda 語法撰寫

```py
def test(x):
return x*2
print(test(3))
```

## 請問以下程式會印出什麼？

```py
data = ["", -1, None, [False], True, {}]
for d in data:
if d:
print(d)
```

## 請問以下程式會印出什麼

```py
data = [3, 4, 5, 6]
print(data[:] is data)
print(data[:] == data)
```

## 請運用 generator 的技巧完成以下程式

```py
def myGenerator(max):
 # 你的程式碼

for n in myGenerator(5):
 print(n)

# 程式要印出 2, 4, 6, 8, 10
```

## 請定義 Iterator 物件的類別，完成以下程式

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

## 請使用 with … as … 改寫以下程式

```py
file=open("data", mode="w")
file.write("Hello")
file.close()
```
