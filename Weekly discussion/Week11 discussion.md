# Week 11 discussion - JS

## 試舉例說明 JavaScript Hoisting 的現象

### Javascript Hoisting

提升(Hoisting)是Javascript的一種執行行為, 可以視為所有的變數宣告都將被提前執行。

```js
printHello()
// hello

function printHello() {
  console.log("hello")
}
```

```function printHello()```在被宣告前執行，但執行並未發生問題。這是因為JS會在執行程式碼之前，將特定的宣告移動至定義scope的頂端；在這個例子中，```printHello()```被移動到global scope的頂端。

### var 變數 Hoisting

```js
num = 6;
num += 7;
console.log(num)
// 13
var num;
```

以```var```宣告的變數會被提升至scope頂端

### let/const 變數 Hoisting

```js
name = "Dillion"
// ReferenceError: Cannot access 'name' before initialization
console.log(name)

let name;
```

JS並非提出```name is not defined```而是```ReferenceError```，因為經過Hoisting後，執行續知道有這個變數，但與```var```在宣告後直接先賦予```undefined```不同，```let```宣告並不會先初始化變數，必須等到初始化後才能被存取。

```js
console.log(name)
// ReferenceError: Cannot access 'name' before initialization

const name = "Dillion";
```

以```const```宣告的變數也有類似的行為。

### Class 變數 Hoisting

```js
const Dog = new Animal("Bingo")
// ReferenceError: Cannot access 'Animal' before initialization

class Animal {
  constructor(name) {
    this.name = name
  }
}
```

```Class```的宣告與```let\const```宣告有一樣的情形。

## 什麼是執行緒？JavaScript 是一個單執行緒的語言嗎？

### 進程(Process)與線程(Threads)

1. 進程是被載入記憶體、但還尚未被執行的程式，最為可以分配到作業系統的CPU time和記憶體等資源的最小單位。
2. 線程存在於進程中，是作業系統運算排程的最小單位，每個進程都至少有一個線程，是實際執行執行程式的單位。
3. 進程可以比喻為一座工廠，線程則為其中的工人。

### Javascript為單執行續語言

1. 首先，我們撰寫的JavaScript程式碼需要一個引擎來跑，也就是讀取，轉譯與執行。
2. 而Chrome使用的引擎V8是一個Google以$ C^{++} $撰寫的開源專案，讀取我們撰寫的JavaScript並轉譯為電腦可以讀的語言。
3. 因為JS是一個單執行續(single threaded)語言，V8也只為每一個JS內容開一個線程(process)，除非有用到工作線程(worker thread)，V8才會再多開一個線程。

    1. 在網頁渲染的過程中，這個主線程(Main thread)負責大部分工作並調度其他線程，在任何給定時間都只有一個指令被執行。
    2. 工作線程被用於執行須長時間的操作，如計算密集型任務和數據處理等。
    3. 使用V8的運行時環境(runtime)很多，包括NodeJS, Deno & Electron；瀏覽器除了Chrome外，Chromium, Brave, Opera, and Microsoft Edge都是。

4. V8運行線程時需要向RAM(Random-access Memories)索要記憶體，又稱常駐內存(Resident Set)。常駐內存可以劃分為兩區，Stack和Heap。

    1. Stack Memories:
        + Stack資料結構為後進先出(LIFO, Last In First Out)，讀取快速。
        + 所有儲存於此區域的資料必須是有限大小的靜態檔案。(StackOverflow就是當超出Stack限定記憶體大小產生的錯誤)
        + Called Stack: 這是函式執行過程(function frame)儲存的區域，也是基本型別(Primatives)和物件指向(Object pointer)的儲存區域。
    2. Heap Memories:
        + 動態分配記憶體，可以儲存大小會動態變化的大型物件。
        + 基本上無限制檔案大小，但不能超過系統分配給應用程式的最大限值。(Out of Memories error)
        + 因為需要靠pointer來查找，讀取速度較慢。

[Stack memory and Heap memory graphic](https://deepu.tech/memory-management-in-v8/)

## 試說明 JavaScript Event Loop 的概念

1. JavaScript作為跑在單一條執行緒(single thread)、單一執行堆疊(one called stack)上的語言，若某一行的程式碼需要一點時間才能執行完成並存進stack最上面stack frame，就如同步請求一樣，後續的程式碼就必須要等到這一行執行完成才能被step into，稱為阻塞(blocking)。
2. 若下一行代碼本身需要上一行的資料那還說得通，但若是與上一行毫不相關就浪費了這些等待時間，甚至造成卡頓。
3. 為了解決同步執行造成的卡頓，JS設計了非同步回呼函式(asynchronized callback function)的方法，也就是非阻塞函式的參數導入另一個函式的設計，等於告訴電腦：當執行完這個非阻塞函式直接執行下一行，等得到結果再傳進回呼函式中。
4. 瀏覽器並不只有運行時環境(run-time)，他還有很多WebAPIs可以提供給JS使用。這些非阻塞WebAPIs就像是工作線程，能夠獨立於主線程運作，但必須要把結果傳回給主線程的callback function才能繼續渲染頁面。
5. 這個丟回去的過程就是今天討論的主角 — Event Loop和Callback queue.

### Event loop & Callback queue

Stack在執行非同步函式(Asychronize Function)時，會告知瀏覽器：
> 當處理完成後，將結果丟給參數中的回呼函式，並在Callback Queue中等待與排隊。
> Event Loop會不斷監控Stack是不是已經空了。若是，則將Callback Queue序列中第一個回呼函式丟進Stack中執行。

## 請分享你如何完成圖片輪播效果？

1. 先顯示第一張圖片，並依照圖片數量生成切換dots:

    ```js
    async function fetchAttraction(attractionID){
      ...
      let response = await fetch(attractionURL)
      let jsonObj = await response.json()
      let jsonList = jsonObj['data']
      ...
      imgContainer.style.backgroundImage = `url(${jsonList['images'][0]})`
      ...
      // create pagination
      for (let i = 0; i < jsonList['images'].length; i++){
        let circleDiv = document.createElement('div')
        circleDiv.classList.add("bookingbar--imgcontainer--pagination--pages")
        // add class to the first circle to make it checked
        if (i === 0){circleDiv.classList.add("page--checked")}
        circleDiv.id = `pages__${i}`
        paginationMark.appendChild(circleDiv)
      }
    }
    ```

2. 並在載入頁面後將所有該景點的圖片預先載入:

    ```js
    async function fetchAttraction(attractionID){
    ...
    let response = await fetch(attractionURL)
    let jsonObj = await response.json()
    let jsonList = jsonObj['data']
    ...
    // return list for later use
    imgsURL = jsonList['images']
    }
    // pre-load img
    async function preloadImages(imgsURL){
      await imgsURL.forEach(url => {
        let img = new Image();
        img.src = url
        preloadImgList.push(img)
      })
    }
    async function flow(){
    await fetchAttraction(attractionID)
    await preloadImages(imgsURL)
    ...
    }
    flow()
    ```

3. 根據點選的按鈕不同，以不同參數呼叫切換圖片的function:

    ```js
    // pagination btn
    function pagination(direction) {
      //clear dots
      let lastDot = document.getElementById(`pages__${pageCount}`)
      lastDot.classList.toggle("page--checked")
      // determine moving distance
      pageCount += direction
      // logic to loop pictures
      if (pageCount < 0){
        pageCount = preloadImgList.length + direction
      }else if (pageCount >= preloadImgList.length){
        pageCount = pageCount - preloadImgList.length
      }
      // load picture
      
      imgContainer.style.backgroundImage = `url(${preloadImgList[pageCount].src})` //Won't fetch url again since already preloaded

      // add class to dots make it checked
      let currentDot = document.getElementById(`pages__${pageCount}`)
      currentDot.classList.toggle("page--checked")
    }
    // hang listener on > < btn
    lastImageBtn.addEventListener("click", () => pagination(-1))
    nextImageBtn.addEventListener("click", () => pagination(+1))
    // hang listener on dots
    paginationMark.addEventListener('click',(event)=>{
      if(event.target.classList.value === "bookingbar--imgcontainer--pagination--pages"){
        let targetID = event.target.id
        let jumpPage = targetID.split("__")[1]
        pagination(parseInt(jumpPage)-pageCount)
      }
    })
    ```

## 請分享你寫 JavaScript 或 Python 程式時自己心中的 Coding Style 是什麼？

|Coding style|Javascript|Python|
|:--|:--:|:--:|
|variables naming|lowerCamelCase|lower_snake_case|
|indentation|new line in bracket|PEP8(autopep8)|
|white space|white space|tab|

## 你是否有做圖片的預載？有什麼好處？如何做？

好處： 可以利用使用者在觀察頁面時間先預載圖片，避免等到要切換時才載入，增加使用者體驗，並且讓切換動畫能在第一次就成功觸發。
