# JavaScript Promise

## 試舉例說明 JavaScript Promise 的基本用途

### Why Prmoise not callback?

在 ES6 promise 出現之前，通常使用回調函式 (callback) 實現異步操作。但使用回調函式 callback 存在一個明顯的缺點，當需要執行多個異步操作時，程式碼會不斷往內嵌套，這種情況通常被稱為「callback 地獄」(callback hell)。

### Promise物件 & async/await語法糖

1. A Promise is an Object that links Producing code and Consuming code
    1. "Producing code" is code that can take some time
    2. "Consuming code" is code that must wait for the result
2. A Promise supports two properties: state and result.
    |myPromise.state|myPromise.result|
    |:--|:--|
    |"pending"|undefined|
    |"fulfilled"|a result of value|
    |"rejected"|an error object|
3. async and await make promises easier to write (Syntactic sugar)
    1. **async** makes a function return a Promise
    2. **await** makes a function wait for a Promise

### Examples

1. Waiting for Timeout

    ```js
    // in ordinary Promise
    let myPromise = new Promise(function(myResolve, myReject) {
      setTimeout(function() { myResolve("I love You !!"); }, 3000);
    });
    myPromise.then(function(value) {
      document.getElementById("demo").innerHTML = value;
    });

    // in async/await
    async function myDisplay() {
      let myPromise = new Promise(function(resolve, reject) {
        resolve("I love You !!");
      });
      document.getElementById("demo").innerHTML = await myPromise;
    }

    myDisplay();
    ```

2. Waiting for a File

    ```js
    // in ordinary Promise
    let myPromise = new Promise(function(myResolve, myReject) {
      let req = new XMLHttpRequest();
      req.open('GET', "mycar.html");
      req.onload = function() {
        if (req.status == 200) {
          myResolve(req.response);
        } else {
          myReject("File not Found");
        }
      };
      req.send();
    });

    myPromise.then(
    function(value) {myDisplayer(value);},
    function(error) {myDisplayer(error);}
    );

    // in async await
    async function getFile() {
      let myPromise = new Promise(function(resolve) {
        let req = new XMLHttpRequest();
        req.open('GET', "mycar.html");
        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            resolve("File not Found");
          }
        };
        req.send();
      });
      document.getElementById("demo").innerHTML = await myPromise;
    }

    getFile();
    ```

## 試舉例說明如何使用 JavaScript Promise.all() 方法

### .all()在所有Promise resolve之後才會成功

```js
let resolvePromise = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve('resolve')
  }, 1000)
})

let rejectPromise = new Promise((resolve, reject) => {
  setTimeout(function() {
    reject('reject')
  }, 1000)
})


// This will reject, because not all Pormise being resolved
Promise.all([resolvePromise, rejectPromise])
  .then((success) => {
    console.log('In Promise.all', success)
  })
  .catch((reject) => {
    console.log('In Promise.all', reject)
  })

// In Promise.all reject
```

### .race()只要有一個Promise成功就回傳resolve

```js
// This will resolve, because the first Promise is resolve
Promise.race([resolvePromise, rejectPromise])
  .then((success) => {
    console.log('In Promise.race', success)
  })
  .catch((reject) => {
    console.log('In Promise.race', reject)
  })
```

### Scenario or .all()

1. ```Promise.all()``` is useful anytime you have more than one promise and your code wants to know when all the operations that those promises represent have finished successfully.
2. ```Promise.all()``` is probably most commonly used with similar types of requests (as in the above example), but there is no reason that it needs to be.
3. In addition, ```Promise.all()``` has what is called a "*fast fail*" implementation. It returns a master promise that will reject as soon as the first promise you passed it rejects or it will resolve when all the promises have resolved.

### Times no need for .all()

1. You only have one async operation. With only one operation, you can just use a ```.then()``` handler on the one promise and there is no reason for ```Promise.all()```.
2. When you don't need to coordinate among multiple async operations.
3. When a fast fail implementation is not appropriate. If you need all results, even if some fail, then ```Promise.all()``` will not do that by itself. You will probably want something like ```Promise.allSettled()``` instead.
4. If your async operations do not all return promises, ```Promise.all()``` cannot track an async operation that is not managed through a promise.

## 試使用至少兩種 JavaScript 寫法，逐一取得陣列中的資料並印出來，你覺得哪一種比較好？為什麼？

1. map()

    ```js
    let Array1 = [1, 3, 6]
    Array1.map( (number) => console.log(number * 3))
    // 3, 9, 18
    ```

2. forEach()

    ```js
    let Array2 = [1, 3, 6]
    Array2.forEach( (number) => console.log(number * 3))
    // 3, 9, 18
    ```

3. for loop

    ```js
    let Array3 = [1, 3, 6]
    for (let i = 0 ; i < 3; i++){
        console.log(Array3[i] * 3)
      }
    // 3, 9, 18
    ```

map 與 forEach 類似，但都比for迴圈好，因為不需要另外注意計算陣列長度

## 試使用至少兩種 JavaScript 寫法，將整數陣列中的資料全部乘以 2 之後，獲得新的陣列。你覺得哪一種比較好？為什麼？

1. map()

    ```js
    let Array1 = [1, 3, 6]
    let newArray1 = Array1.map( (number) => number * 2)
    console.log(Array1, newArray1)
    // [ 1, 3, 6 ] [ 2, 6, 12 ]
    ```

2. forEach()

    ```js
    let newArray2 = []
    Array2.forEach( (number) => newArray2.push(number * 2))
    console.log(Array2, newArray2)
    // [ 1, 3, 6 ] [ 2, 6, 12 ]
    ```

3. for loop

    ```js
    let newArray3 = []

    for (let i = 0 ; i < 3; i++){
      newArray3[i] = Array3[i] * 2
    }

    console.log(Array3, newArray3)
    // [ 1, 3, 6 ] [ 2, 6, 12 ]
    ```

map() 會回傳新陣列，在三者之中使用上最為方便。另外兩種都必須要額外使用方法製造新陣列。

## 請分享在本週作業中，你如何儲存購物車的資料

1. 取得 ```Form``` 內的資料

    ```js
    let bookingForm = document.querySelector(".bookingbar--bookingpanel--bookingform")
    let formData = new FormData(bookingForm)
    ```

2. 取得目前的 attractionID

    ```js
    // get attraction ID
    let url = window.location.href
    let urlParts = url.split('/')
    let attractionID = urlParts[urlParts.length - 1]
    let bookingURL = `${server}/api/booking`
    ```

3. 建構 request 並送出

    ```js
    let request = {
          'attractionId': parseInt(attractionID),
          'date': bookingDate,
        }
    if (bookingTime === "上半天"){
      request['time'] = 'Morning'
      request['price'] = 2000
    } else if (bookingTime === "下半天"){
      request['time'] = 'Afternoon'
      request['price'] = 2500
    }
    let respond = await fetch(bookingURL, {
      method : "POST",
      headers: new Headers({
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify(request)
    })
    ```

4. POST api 先檢查是否有此user的訂單

    ```python
    user_id = user['id']
    sql = "SELECT * FROM booking\
            WHERE user_id = %s"
    val = (user_id,)
    user_booking = await check_booking(sql, val)
    ```

5. 若有則先刪除

    ```py
    if (len(user_booking) > 0):
    sql = "DELETE FROM booking WHERE user_id = %s"
    val = (user_id,)
    commitDB(sql, val)
    ```

6. INSERT 前端送來的資訊

    ```py
    # Insert new one
    sql = 'INSERT INTO booking\
            (user_id, attraction_id, date, time, price)\
            VALUES (%s, %s, %s, %s, %s)'
    val = (user['id'], bookingInput.attractionId,
            bookingInput.date, bookingInput.time, bookingInput.price,)
    commitDB(sql, val)
    ```

## 購物車的資料是否適合儲存在前端？相對於儲存在資料庫，有何優缺點

優點：

1. 減少資料庫負擔
2. 