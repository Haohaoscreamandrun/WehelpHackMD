# Week 2 discussion - JavaScript

## 請分析第二週第一題程式的時間複雜度？

### 若messages 數量是會變動的，那 task1 的時間複雜度？

#### 除了messages的數量，還有可能會變動的因子有

1. 使用的捷運路線：主線站數、支線站數、不重複總站數
   - 捷運線主線站數 x
   - 支線站數 y
   - 不重複總站數 s
2. messages中平均 message 的字數
   - 訊息字數平均長度 m
   - messages 數量 n

#### 構建之捷運表如下

```javascript
let greenLine = {
    'Songshan': 0,
    'Nanjing Sanmin': 1,
    'Taipei Arena': 2,
    'Nanjing Fuxing': 3,
    'Sonjiang Nanjing': 4,
    'Zhongshan': 5,
    'Beimen': 6,
    'Ximen': 7,
    'Xiaonanmen': 8,
    'Chiang Kai-Shek Memorial Hall': 9,
    'Guting': 10,
    'Taipower Building': 11,
    'Gongguan': 12,
    'Wanlong': 13,
    'Jingmei': 14,
    'Dapinglin': 15,
    'Qizhang': 16,
    'Xindian City Hall': 17,
    'Xindian': 18,
  };
let xiaobitanLine = {
    'Qizhang': 0,
    'Xiaobitan': 1,
  };
```

#### 接收並處理訊息

```javascript
// take in the JSON message and process
let location = new Object();
for (const [name, sentence] of Object.entries(messages)) {
  // check if sentence include station
  Object.keys({ ...greenLine, ...xiaobitanLine }).forEach((station) => {
    if (sentence.includes(station)) {
      // if yes, add to location pairs
      location[name] = `${station}`;
    }
  });
}
```

> - 將所有捷運線壓成一條，並掃過每一則訊息。若該訊息包含該捷運站即放入新物件location。
> - 內外迴圈分別為O(n)*O(s)

### 根據目前的捷運站計算距離

```javascript
for (const [name, station] of Object.entries(location)) {
    if (Object.keys(greenLine).includes(currentStation)) {
      //if currentStation is on greenLine
      // cond 1: station on greenLine
      // Will be NaN if greenLine['Xiaobitan']
      distance[name] =
        Math.abs(greenLine[station] - greenLine[currentStation]) |
        // cond 2: station not on greenLine, current-Qizhang-station
        (Math.abs(greenLine["Qizhang"] - greenLine[currentStation]) +
          xiaobitanLine[station]);
    } else {
      //if currentStation is not on greenLine
      //cond 1: station on greenLine, current-Qizhang-station
      distance[name] =
        (xiaobitanLine[currentStation] +
          Math.abs(greenLine["Qizhang"] - greenLine[station])) |
        //cond 2: station not on greenLine
        Math.abs(xiaobitanLine[station] - xiaobitanLine[currentStation]);
    }
  }
```

> - 遍歷所有訊息提取出來的捷運站，分別在目前的捷運站在哪一條線的情況下計算距離。
> - 此迴圈與訊息數量有關，時間複雜度應為O(n)

### 尋找最近距離的站點

```javascript
let shortestDistance = Math.min(...Object.values(distance));
let names = [];
for (const [name, dis] of Object.entries(distance)) {
  if (dis === shortestDistance) {
    names.push(name);
  }
}
```

> - 遍歷所有捷運站的距離，提取出最小距離的捷運站。
> - 此迴圈與訊息數量有關，時間複雜度應為O(n)

### 結論

- 三個迴圈時間複雜度相加為O(n)*O(s)+O(n)+O(n)
- 可以簡化為 O(n) x O(s)，即整體時間與*訊息輸入量*和*捷運站總站數*呈正相關。
- 但放大規模來看，O(n)最終應該會比O(s)重要很多。

## ```JavaScript``` 的 ```var``` 和 ```let``` 差異？ 

||var|let|
|:--|:--|:--|
|引入JS時間|早在JS草創時期已經存在|在ES 2015 (ES6)才正式引入|
|宣告範圍|函式宣告function-scope|區域宣告block-scope|
|存取|可全域存取(函式除外)|宣告上層無法存取|
|再次宣告|可再次宣告|同層內無法再次宣告，但可以更新(const無法更新值)|
|推升Hoisting|宣告部分會推升，但賦值不會，噴```undefined```|宣告賦值都不會推升，執行錯誤|

## ```JavaScript``` 的 ```==``` 和 ```===``` 差異？

1. ```==```會先將兩邊的東西轉為相同型態，若兩值相同則回傳為```true```
2. ```===```除了值外也會比較型別
3. 都一樣是比較左右兩邊的值，相等回傳```true```，不相等則回傳```false```

```javascript
123 == "123" return true 
123 === "123" return false

0 == false return true 
// 因為 true 和 false 會轉為 1,0 

undefined == null return true 
// 因為undefined 意思是「變數沒有被宣告 or 已經宣告但沒有賦值」 
// null 意思是「沒有值」，所以都是沒有值
undefined === null return false
// 因為 undefined 型別為 undefined，null 型別為 object

NaN === NaN return false 
// NaN 的定義為「非數值」 
// 他不等於任何人，包括他自己（NaN）本身，如果想要確認某個數值是否是 NaN 的話, 可以使用 isNaN(NaN)方法 
```

## 如何逐一取得物件中的 Key/Value Pairs 並印出來？ 

```javascript
let object = {a: 1, b: 2, c: 3}; 
// Object.keys()
for (const key of Object.keys(object)) { 
  console.log(key , object[key]); 
};
// forEach()
Object.keys(object).forEach(key => { 
  console.log(key,object[key]); 
});
// Object.entries()
for (const [key, value] of Object.entries(object)) { 
  console.log(key, value); 
} 
```

> ```Object.values(), Object.keys(), Object.entries()``` 都不會迭代到繼承的 property，並且返回皆是「陣列」

## 如何把物件中的 Values 轉換成一個陣列儲存？

```javascript
let names = []; 

for (const [name, dis] of Object.entries(distance)) {if(dis === shortestDistance) {names.push(name);}}
```

## Python 的 ```==``` 和 ```is``` 的差異？

```python
a = 1000
b = 1000
id(a)
# 140042294421360 
id(b)
# 140042294420272
a == b
# True
a is b
# False
```

> == 是判斷兩個變數之間的「值」是否相等, is 是判斷兩個變數之間的「記憶體位址」是否相同。

## Python 的 pass 指令有什麼作用？

- 跳過未撰寫完成的函式，不產生語法錯誤，作為placeholder使用

```python
# 三種迴圈控制
for i in range(1,10): 
  if i % 3 == 0: 
    break
  print(i) 
# 1 2

for i in range(1,10): 
  if i % 3 == 0: 
    continue 
  print(i)
# 1 2 4 5 7 8

for i in range(1,10): 
  if i % 3 == 0: 
    pass 
  print(i)
# 1 2 3 4 5 6 7 8 9
```

## 如何逐一取得字典中的 Key/Value Pairs 並印出來？

```python
my_dict = {'a': 39, 'b': 25, 'c': 20} 

for key, value in zip(keys, values): 
  print(f"Key: {key}, Value: {value}") 

for key, value in dict.items(): 
  print(f"Key: {key}, Value: {value}")

for index, key in enumerate(dict): 
  print(f"Index: {index}, Key: {key}, Value: {dict[key]}")
```

## 變數命名的常見規則/習慣有哪些？

1. Meaningful and pronounceable 有意義且可發音，直白代表其用途，避免只有一個字母的命名。
2. Consistent for same types of variables ，將函式以動詞開頭並說明其動作，class首字母都大寫。
3. Do not use noise words不要加入無意義的或無法區分其意圖的詞like product and productInfo。
4. camelCase或snake_case
