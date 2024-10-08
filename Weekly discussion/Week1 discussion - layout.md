# Week 1 Discussion

## 按照第一週的版面設計，請明確的告訴協助出圖的設計師：在 10 個大方塊中，使用的原始圖片理想尺寸 ( 寬高 ) 是多少？

#### 目的是要在原圖的長寬比下，套用在每個大方塊中都可以不會過度放大

- 在螢幕解析度>1200的情況下，span2的有386px，span1的只有183px
- 600-1200px的寬度下，span2寬度範圍是260-530px，span1的是120-250px
- <600px時，所有span1的寬度是324-540px
- 一般圖片的黃金比例是高比寬2:3，圖片的寬度放到最大的情況是540px

#### 建議原圖寬高是540:360px

## 請查詢 statcounter global stats，請問常見的螢幕解析度範圍是？

- 桌機中佔比最高的是1920x1080，約24%; 第二是1366x768，佔約14%; 寬度範圍是1280-2560px，有直式特規810px
- 平板中佔最多的是768x1024，約22%;第二是810x1080，佔10%; 寬度範圍是601-1280px
- 手機佔比最高是360x800，約10%;寬度範圍是360-428px

## 第一週的主版面為什麼要放在固定尺寸 1200px 中間？如果不呢？這中間有哪些可能的考量？

1. 如果不限制最大的寬度，主版面會隨螢幕寬度越寬而變寬
2. 各box元素的長寬比會偏向寬度極端長而比例失調
3. 圖片若原圖的長寬本來就不大，box放寬之後因為隨著放大而失真
4. 文字限制在20px，文字與圖片的比例會越來越小，不協調
5. 沒有必要用到多出來的空間，人的視覺可以接受留白
6. 固定寬度的情況下製作比較簡單

## 說明 HTML 的 ```<p>``` 和 ```<div>``` 有什麼異同？

- 雖然同為區塊級元素，但系統會因為paragraph這個tag為段落前後加上16的margin
- ```<p>```標籤，只能包含文字等內容，不能包含其他區塊元素（如```<div>或<p>```）
- 如果```<p>```裡面有區塊元素，```<p>```會在區塊元素前被強制加上結尾```</p>```

## 說明 CSS 中的 vw, vh 和百分比有什麼差別？

- ```v```代表viewport，為視窗的範圍，```w```和```h```則分別代表寬和高
- 1代表1%，50就代表占據一半的視窗大小
- %代表父元素的百分比，50%只佔container的一半寬或一半長

## 說明 CSS 中的 margin collapse 現象？

>當兩個或多個相鄰的元素之間存在垂直方向的 margin（外邊距）時，有時這些 margin 會發生「折疊」的現象，這就是 CSS 中的「margin collapse」（外邊距折疊）。

- margin collapse 專注於垂直方向的 margin，而不是水平方向的。
- 當 margin collapse 發生時，兩個 margin 之間的距離會變為它們中的較大者，或者是兩個負 margin 中的較大者。較小的 margin 會「折疊」到較大的 margin 中。
- 如果子元素的 margin 與父元素的 margin 發生了折疊，則也會出現 margin collapse 的情況。

```html
<!--Illustration: 兩個<p> tag中間的margin並不是70px-->
<div style="margin-top: 20px;">
    <p style="margin-bottom: 30px;">段落 1</p>
    <p style="margin-top: 40px;">段落 2</p>
</div>
```

> - 只要```<div>```是```display: flex```就不會有這個問題
> - 只有上下的margin會有margin collapse 左右的margin不會

## 說明 CSS 中的 ```display:none``` 和 ```visibility:hidden``` 的差異？

- ```display: none;```
  - 會完全移除元素，且元素不佔用任何空間。換句話說，當元素設置為 ```display: none;``` 時，它會從頁面中完全消失，包括佔用的空間。
  - 元素不會對頁面上的事件做出反應，因為它們已經從文檔流中移除了。完全移除了元素對於渲染性能更有利，因為不需要佔用任何空間或進行佈局計算。
- ```visibility: hidden;```
  - 則是將元素隱藏，但它仍然佔據原來的空間。換句話說，當元素設置為 ```visibility: hidden;``` 時，它只是不可見，但它的佔位仍然存在。
  - 隱藏的元素仍然存在於文檔流中，因此它們會對頁面上的事件做出反應。僅將元素隱藏，但它仍然需要佔用空間並進行佈局計算，因此對於性能可能會稍微差一些。

## 隨機問答

1. visual studio右下角的```UTF-8```是什麼?
    > VScode那裏設定的是儲存```index.html```檔案的文字編碼, ```<meta charset="UTF-8">``` 那行則是告訴瀏覽器要用甚麼編碼解讀我們的```index.html```文件
2. ```<meta name="viewport" content="width=device-width, initial-scale=1.0">```那行拿掉會怎樣?
    > 是為了智慧型手機設定，2012-2014一般網頁還沒有為了手機設計，手機會自動縮小網頁，內容會變得很小。簡單來說是因應手機瀏覽而出現的功能。
3. 既然```<div> <span>```可以解決多數架構需求，為什麼還需要有語意化標籤的存在?
    > 語意化標籤在搜尋引擎的加權比重不同, 是網頁工程師為了向搜尋引擎說明區塊重要性的工具
4. ```box-sizing: content-box & border-box```的不同?
    > - content-box(default) : 將寬度值指定到內容物的寬度，不計算padding和border
    > - border-box: 將寬度值指定到邊框到邊框之間的範圍(包含padding和border)
5. ```font-family: Georgia, serif;```代表什麼意思?
    > 字型設定的先後順序，```sans-serif``` 代表所有無襯線體，放在最後面會讓瀏覽器抓使用者資源的最接近的非襯線體來用
