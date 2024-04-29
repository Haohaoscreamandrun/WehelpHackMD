Week 4 Discussion
===
## 什麼是通訊協定？為什麼要有通訊協定的存在？ 

### 什麼是通訊協定? [CloudFlare](https://www.cloudflare.com/zh-tw/learning/network-layer/what-is-a-protocol/)
>標準化通訊協定就像電腦可以使用的共同語言，類似於來自世界不同地區的兩個人可能不理解對方的母語，但他們可以使用共同的第三語言進行交流。
>如果一台電腦使用網際網路通訊協定 (IP)，而第二台電腦也使用該通訊協定，它們將能夠進行通訊——就像聯合國依靠其 6 種官方語言在全球各地的代表之間進行交流一樣。但是，如果一台電腦使用 IP，而另一台電腦不知道該通訊協定，則它們將無法通訊。 

### 存在的必要性? 

1. 規格化： 不同 製造商、不同 系統與軟體、不同 地理位置的節點能夠通過遵守同一套通訊協定來進行溝通。 
2. 效率：定義了數據傳輸的標準格式和程序，可以提高數據傳輸的效率。 
3. 可靠性：包含錯誤檢測、校正機制，提高數據傳輸的可靠性。 
4. 兼容性：確保新舊技術之間彼此兼容性。 
5. 🌟安全性：部分通訊協定，甚至還提供數據加密、驗證，來保證數據傳輸的安全。 | 

![Layer of HTTP](https://ask.qcloudimg.com/http-save/3264435/4ykes0cz2v.png)
1. 应用层: 支持网络应用 - ftp, smtp, http 
2. 传输层: 主机进程间的数据传递 - tcp, udp 
3. 网络层: 将数据报从信源传递到信宿 - ip, 路由选择协议
4. 链路层: 数据在网络上的相邻结点间的传输 - ppp, ethernet 
5. 物理层: 信道上传送的位流 

## TELNET、SMTP、HTTP 這三種通訊協定分別用在什麼場景？ 

### TELNET - [維基](https://zh.wikipedia.org/zh-tw/Telnet)

- Telnet (short for "teletype network")是一種應用層協定，使用於網際網路及區域網中，使用虛擬終端機的形式，*提供雙向、以文字字串為主的命令列介面互動功能*。PPT/BBS布告欄/command line線上遊戲就是以此為主，以呈現為主。 

- 屬於TCP/IP協定族的其中之一，是網際網路遠端登錄服務的標準協定和主要方式，*常用於伺服器的遠端控制，可供使用者在本地主機執行遠端主機上的工作。* 

- 使用者首先在電腦執行Telnet程式，連線至目的地伺服器，然後輸入帳號和密碼以驗證身分。使用者可以在本地主機輸入命令，然後讓已連接的遠端主機執行，就像直接在對方的控制台上輸入一樣。 

- 傳統Telnet會話所傳輸的資料並未加密，帳號和密碼等敏感資料容易會被竊聽，因此很多伺服器都會封鎖Telnet服務，改用更安全的SSH。   

### SMTP  -  [CloudFlare](https://www.cloudflare.com/zh-tw/learning/email-security/what-is-smtp/) 

- 簡易郵件傳輸通訊協定(Simple Mail Transfer Protocol) 是透過網路傳輸電子郵件的技術標準。與其他網路通訊協定一樣，SMTP 允許電腦和伺服器交換資料，而無論其底層硬體或軟體是什麼。 

- 正如使用標準化的信封地址讓郵政服務能夠運作一樣，SMTP 標準化了電子郵件從寄件人到收件人的傳輸方式，從而使廣泛的電子郵件傳遞成為可能。 

- SMTP 是郵件傳遞通訊協定，而不是郵件擷取通訊協定。郵政服務將郵件投遞到信箱，但收件人仍必須從信箱中取出郵件。同樣，SMTP 將電子郵件傳送到電子郵件提供者的郵件伺服器，但需要使用不同的通訊協定從郵件伺服器中擷取該電子郵件，收件人才能閱讀它。  

### HTTP - [CloudFlare](https://www.cloudflare.com/zh-tw/learning/ddos/glossary/hypertext-transfer-protocol-http/), [維基]

> ##### 超文字傳輸通訊協定 (HTTP) 是全球資訊網的基礎，用於透過超文字連結載入網頁。HTTP 是一種應用程式層通訊協定，用於在聯網裝置之間傳輸資訊，並在網路通訊協定堆疊的其他層上執行。透過 HTTP 的典型流程涉及用戶端機器向伺服器發出請求，然後伺服器傳送回應訊息。  

- 在網際網路上發出的每個 HTTP 請求都攜帶一系列編碼資料，這些資料帶有不同類型的資訊。典型的 HTTP 請求包含以下內容： 

    * HTTP 版本類型 
    * 一個 URL 
    * 一個 HTTP 方法(Method) 
    * HTTP 請求標頭(Request Head) 
    * 選用的 HTTP 主體。(Body) 

> ##### HTTP的發展是由提姆·柏內茲-李於1989年在歐洲核子研究組織（CERN）所發起。HTTP的標準制定由全球資訊網協會（World Wide Web Consortium，W3C）和網際網路工程任務組（Internet Engineering Task Force，IETF）進行協調，最終發布了一系列的RFC，其中最著名的是1999年6月公佈的 RFC 2616，定義了HTTP協定中現今廣泛使用的一個版本——*HTTP 1.1*。  

## HTTP 通訊協定有哪些特性？ - [CloudFlare](https://www.cloudflare.com/zh-tw/learning/ssl/why-is-http-not-secure/)；[MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Caching)；[Johny Medium](https://johnnychang25678.medium.com/%E7%B6%B2%E8%B7%AF%E6%A6%82%E8%AB%96-%E4%BB%80%E9%BA%BC%E6%98%AFhttp-460c101c553)；[Fortinet](https://www.fortinet.com/tw/resources/cyberglossary/http-proxy) 

1. 以TCP/IP連線 
2. 無連接性(Conectionless) : Client送出一個request後，就會和server斷開連結，直到server準備好response後，才會再次建立server-client的連結。
> ##### HTTP 1.1 之後- 持續連線狀態 persistent connection，過一段時間之後還是會斷開，避免效率低落和伺服器壓力(頻繁建立TCP/IP通道)
4. 無狀態性(Stateless) : HTTP對於事物的處理不會保存任何資訊，每次的request-response cycle都會被視為一次獨立事件。  
5. 可擴充性： 請求與回應都共同有 Header Fields 與 Message Body；而只有請求有 Request Method，只有回應有 Response Status Codes - HTTP 只有定義出空間放東西，以及做一些預定義，如 Request Header Fields 有提到請求的表頭（header）有些名稱已經先被定義了。因為這東西的擴充定義非常自由，所以也有 RFC 額外定義其他名稱 
6. 純文字的(Text-based)：Request和response是可以讀的文字，雖然對de-bug友善但資訊是不安全的。 
7. 支援緩存(support caching)：藉由重複使用先前取過的資源，網站與網頁應用程式能夠顯著地提升效能。caching 可以減少網路傳輸量以降低一個資源可展示的延遲時間。善用 HTTP caching 可以讓網站可以回應更多請求。  
8. 支持加密：HTTPS (after 2010)是支援加密和驗證的 HTTP。兩種通訊協定的唯一區別是HTTPS 使用 TLS (SSL) 來加密普通的 HTTP 請求和回應，並對這些請求和回應進行數位簽名。 
> ##### HTTPS 使用 TLS（或 SSL）來加密 HTTP 請求和回應，因此攻擊者看到的不是請求中的文字，而是一堆看似隨機的字元。 TLS 使用一種稱為公開金鑰加密的技術：有兩個金鑰，即公開金鑰和私密金鑰，其中公開金鑰透過伺服器的 SSL 憑證與用戶端裝置分享。當用戶端開啟與伺服器的連線時，這兩個裝置使用公開金鑰和私密金鑰商定新的金鑰（稱為工作階段金鑰），以加密它們之間的後續通訊。
9. 支援代理(Proxy)：代理伺服器作為一個大門，會過濾所有使用者與伺服器之間的請求與回應，並阻擋使用者向任何的伺服器提出請求。外部伺服器可以看到的IP位址屬於代理伺服器，故使用Proxy可以隱藏使用者IP；因為Proxy可緩存大量的網頁與檔案，故也能節省大量頻寬。 

## HTTP Request 中包含哪些重要的資訊？ 

### 有三個主要的部件 [Sematext](https://sematext.com/glossary/http-requests/) 

* Request Line：它包含了 

    1. 請求方法(HTTP Method)：[連結](https://www.threads.net/@bytebytego/post/C6T3lZqA5tg/?xmt=AQGz4butGtmBPjjBiuke6yz7apjMj0wx8ilHkgju0EVgHQ) (這是約定成俗而非一定要是接這些內容) 
    2. 請求標的：可以是URI, Uniform Resource Identifier純路徑或是URL(Uniform Resource Locator）路徑+定位資訊如協議、主機名稱、路徑與端口) 
    3. HTTP版本：用於定義後面資訊的架構 

* Header： 

    1. Cookies 
    2. Authorization Token
    3. … 
    4. *通常是 鍵：值 對* 

* Message Body： 

    1. 是伺服器用於回應的資訊，包含前面兩組資訊、一行空白和可有可無的Message body 

## HTTP Response 中包含哪些重要的資訊？ 

* Status Line： HTTP version/ a status code/ reason phrase 
```
HTTP/1.1 200 OK
```

* Headers： 

    1. Content type：說明回傳的內容是什麼格式(e.g. ```text/html```) 
    2. Content length：寫明message body有多少bytes 
    3. Cache control： 緩存policy(如何存、存在哪、過期時長等)
    4. Server：說明處理請求的軟體和版號 
    5. Date：說明回應產生的日期與時間 
    6. Set-cookie：將要放入客戶端瀏覽器的cookie 
    7. Location：若有重新導向的狀態碼，指名重新導向的位址 

* 空白行 
* Message Body 

## 哪些前端程式、瀏覽器操作會預設使用 HTTP ```GET``` 方法？ 

1. 超鏈接：點擊 ```<a>``` tag時，瀏覽器會默認使用```GET```導向該鏈接 
2. 前端表單```<form>```傳送預設是```GET```
3. ```<img>, <script> and <style>```：瀏覽器會自動向設定好的靜態資源鏈結發送```GET```請求 
4. 瀏覽器中輸入網址並按下Enter時，預設是使用```GET```請求 
5. 瀏覽器收到```3XX```狀態碼的重新導向回應時，預設使用```GET```向該網址重新導向 
6. ```AJAX/Fetch```拿資料預設也是```GET```

## 詳細描述後端程式 ```return RedirectResponse(...)``` 導向操作實際上是如何完成的？ 

1. 後端以函式方法創建一個重新導向的對象，其中包含可導向的URL和一個符合HTTP的狀態碼(如```301 Moved permantly```或```303 See other```) 
    - ```HTTP_303_SEE_OTHER```, 表明若使用者一開始帶```POST``` 方法，做重定向之後，必須要用```GET``` 
    - ```HTTP_307_TEMPORARY_REDIRECT``` 而307 則表明，使用者不管帶什麼方法上來，重定向之後都要用相同方法。 
2. 後端程式將重新導向發送Response給client 
3. Client瀏覽器接收到該response後，自動向該URL發出HTTP ```GET```請求
4. 該重新導向的URL Server根據該請求處理並回應 

## 為什麼任務中指示檢查 checkbox 是否勾選的動作，我們不在後端程式進行？如果在後端進行這個動作，是否有額外的價值？ 
[Input Validation on Client-Side or Server-Side?](https://www.packetlabs.net/posts/input-validation/) 
[Client-Side vs Server-Side Form Input Validation](https://surveyjs.io/stay-updated/blog/client-server-data-validation) 
### 以前端處理的好處
- 實時回饋：前端可以立即執行、回應操作或顯示訊息 
- 減少請求：不用將每次的勾選都送往後端處理，可以減少請求與回應的次數，提高效率 
- 降低後端負擔：將簡單的邏輯判斷放在前端可以減輕一些server的負載，提高穩定性。 
### 放在後端的好處可能有： 
- 安全性：後端再次驗證以確保使用者沒有繞過前端進行非法的操作(buffer overflow, command injection, or remote code execution) 
    - Buffer overflow 緩存溢出: 當程式試圖向緩衝區寫入衝過其容量限制的資料，攻擊者可以覆寫資料庫或使程序跳轉執行惡意程式 
    - Command injection 命令注入：當程序透過外部輸入建構系統命令時，未對輸入進行驗證或過濾。常見輸入特殊字符終止當前命令。 
    - Remote code execution 遠程代碼執行：當程序沒有正確驗證或過濾用戶輸入，可能會發生攻擊者可以透過輸入遠程執行代碼來操控目標系統。 

- ~~前端只能驗證使用者可以看到的數據，一些經過計算後的值並無法被使用者驗證~~(沒有實際例子，且偏向前端的限制)
- 數據一致性：若該Checkbox與後端數據資料庫的操作有關，進行後端驗證可以確保數據一致。因為使用者端的驗證功能可能因為使用的電腦或瀏覽器不同，導致資訊沒有經過一致的驗證。 
- 有些工程師習慣關掉前端JavaScript故無法透過前端驗證，目的是減少廣告或抵擋網路攻擊。
- 完全的驗證：使用者傳送的資訊可能包含隱藏或加密的資訊，後端可以對這些資訊進行全面的驗證。 

 