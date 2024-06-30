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

## 試使用至少兩種 JavaScript 寫法，將整數陣列中的資料全部乘以 2 之後，獲得新的陣列。你覺得哪一種比較好？為什麼？

## 請分享在本週作業中，你如何儲存購物車的資料

## 購物車的資料是否適合儲存在前端？相對於儲存在資料庫，有何優缺點
