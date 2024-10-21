# 一般性問題

## General questions

1. 請介紹一下自己
   - 台大園藝研究所、農藥進口美商
   - 轉職原因：原本的專業比較難在北部找到工作，選擇也很少，薪資的天花板也不高
   - 關於我的三大重點：
     - 受目標驅動：
       - 為了增進英文口說能力累積 Engoo 1500 分鐘
       - 在 30 歲的現在為了擁有選擇而全職加入 Wehelp 獨立完成個人專案(融進專案?加強重點)
     - 擅長溝通：
       - 前職需要大量溝通:與大量國外專家討論並向公家單位回覆審查意見
       - 與其他部門確認專案進度確保商品上市時程
     - 適應力強：(簡潔)
       - 第一份工作時外派雪蘭莪，在一片農田荒野中生活
       - 大學在中研院實習兩個月，也能在餐廳外場打工
       - 研究所與同學一起創業並且入選台大車庫
   - 總結來說我是一隻海豚，高度社會化，靠合作捕獵達成目標，適應力強各種水域都可以存活
2. 在開發專案的過程中，最困難的部分是什麼？
   - 進度安排，解決方法:約定好與同學進行每日工作進度報告
3. 對未來的職涯想像是什麼？
   - 享受工作：劉潤的底層邏輯提到真正能在領域發光發熱的人，都是在玩工作的人。
   - 享受合作：無論是在合作專案或先前的工作經驗中，讓我印象深刻的都是和同事的良好互動和互相成就感。
   - 享受學習：能在日常中累積知識與能力是我所追求的，希望未來的工作能給我持續不斷的挑戰。
4. 說明 Git Flow 的概念？你實際上如何在開發過程中使用 Git 做版本控制？
   - Git flow 是用於管理開發程式碼版本的分流概念，常見的分流方法是獨立 main 和 develop 兩條永久分枝。
   - Develop 分支用於開發與測試，而 main 分枝則是穩定可以隨時上線的程式版本。main 因為是穩定的版本，通常可以賦予版本號碼。
   - 隨著專案擴大，可以另外分出其他的暫時分支如 feature/release/hotfix，並在結束後被刪除
   - GitHub flow 則是基於一個開發團隊的協作流程：包括創立分支，修改分支，建立 pull request，分支審核，合併分支予刪除分支。
   - 開發個人專案時使用 type:subject 的 commit 模式註記每一次推送到 develop 分支的版本，上線時 merger 到 main 並上線。
   - 開發合作專案時以 github flow 的模式 fork develop 分支到各自的專案開發後再 merge 回 develop 分支，上線時以 main 版本上線

## 簡單介紹你的專案

1. Summary: 這是一個用於管理現代化停車場的應用程式，可以協助管理者管理停車場內的車輛資料，也能讓使用者利用第三方支付平台繳費離場。同時，這個應用支援使用者查看附近停車場位置和即時空位數量。
2. 亮點
   1. 空間索引加速查詢: 我利用 spatial index 加速 mysql 查詢速度約 7 倍，減少 CPU cost 達 1/7
   2. 降低伺服器負擔: 傳送照片至後端進行文字辨識非常耗費資源，我利用前端套件完成圖片處理與文字辨識，並將照片透過 pre-signed URL 上傳至 S3 bucket(S3 的安全性?)
3. 難點與改善方式
   1. 文字辨識前端套件為泛用工具無法自行訓練，只能調整參數：台灣車牌不使用英文的 IO 和數字 4, 以 whitelist 的方式提供可以辨認的字母及數字集，並且利用 openCV 套件調適照片，弱化雜訊。

## 簡單說明專案中利用到的工具及如何使用

### Redis

1. Summary: 我用 redis 作為我的快取工具，快取不會經常變動的資料庫資訊
2. 如何使用: 我將 mysql 的查詢與變更邏輯分離，只將不會經常變動得資料存入 local redis 如管理者和停車場資訊和使用者定位，並設定五分鐘的 life cycle。key 的命名方法是簡單的動態命名，如 admin1, admin2 等

### Nginx

1. Summary: 我用 nginx 作為我的反向代理伺服器，將 ELB 傳入 EC2 的連線依照 sub-domain 導向不同的 container，並將 http 連線自動轉為 https 連線，也有利用 nginx serve 靜態檔案

### Docker

1. Summary: 我將專案在本地包裝成 docker image，並在 EC2 上跑成獨立的 container。

## 網站運作基本概念

1. 盡可能仔細的描述，使用者在瀏覽器上打網址，最後看到一個網頁的背後過程。[link](https://www.freecodecamp.org/news/what-happens-when-you-hit-url-in-your-browser/)
   - 瀏覽器解析 URL，透過 DNS 取得網站 IP 位址
   - 根據通訊協定建立和 IP 位址的連線, 以 TCP/IP 為例
     - TCP-3 way handshake(要清楚 TCP 和 HTTP 的關係)
   - 瀏覽器像伺服器傳送 GET 請求
   - 伺服器回傳網頁頁面程式碼、狀態碼等
   - 瀏覽器解析內容後渲染於顯示器上
2. 什麼是 CORS，如何讓跨網域溝通變得可行？

   1. 跨站請求偽造 Cross Site Request Forgery, CSRF​
      1. 原本的伺服器是無條件相信 cookie 的資料，而沒有再進行驗證。​
      2. 跨站請求偽造步驟
         1. 使用者登入合法網站，合法網站發出 cookie 存至使用者瀏覽器。
         2. 使用者在未登出的情況下，以其他分頁瀏覽惡意網站。
         3. 惡意網站同樣可以使用瀏覽器中的 cookie，該惡意網站以該 cookie 向合法網站發送請求。​
   2. 同源政策 Same Origin Policy​
      1. 現存所有瀏覽器皆實作同源政策以防止跨站請求偽造。
      2. Client-side 只能向相同來源的資源發送 request，相同來源的定義為
         1. 相同通訊協定(Same Protocol)​
         2. 相同網域(Same Domain)​
         3. 相同通訊埠(Same Port)​
      3. 只要請求發送的網域不符合上述規則，瀏覽器 CORS 會報錯
   3. 跨來源資源共用 Cross-Origin Resource Sharing, CORS​

      1. 實務上不可能避免請求非同源資源，例如從影片平台 API 提取影片、使用公共字型庫或顯示全國氣象資料等。
      2. 開發人員首先在其伺服器上設定 CORS 標頭，方法是將該 url 新增到允許的來源清單。​

         - 組態清單 ​ [Access-Control-Allow-Origin](https://news.example.com)
         - Mount a CORS middleware on server:

         ```py
         app = FastAPI()
         app.add_middleware(
             CORSMiddleware,
             allow_origins = ["http://127.0.0.1:8000"],
             allow_credentials = True,
             allow_methods = ["GET"],
             allow_headers = ["*"]
         )
         ```

      3. 為了請求非同源的資源，瀏覽器必須要在 headers 中放入 CORS 安全列表請求標頭。

         - 其中 'Origin: client URL' 可告知請求來源。​
         - fetch from client to server as a cross origin request

         ```javascript
         async function CORS(event){
             try{
                 let response = await fetch("http://127.0.0.2:9000",{
                     method: "GET",
                 })
                 if(!response.ok){
                     threw new Error("Network response is not ok.")
                 }
                 let text = await response.json()
                 console.log("Response test:", text)
             }catch(error){
                 console.error("There was a problem with fetch.")
             }
         }
         ```

      4. 伺服器收到後，在 response 的 headers 中 Access-Control-Allow-Origin 加上 client url。
      5. 對於之後每個請求，伺服器將以 ​Access-Control-Allow-Credentials : true 進行回應。​

3. 說明 HTTP 通訊協定的特性？
   1. 以 TCP/IP 連線: 寫好訊息后，拼圖被拆分成碎片。然後，每片碎片都可以通過不同的郵政路線運送，部分路線比其他需要更長時間。當拼圖碎片經過不同路線到達後，它們的順序可能是錯誤的。IP 確保碎片到達它們的目的地位址。TCP 可以被認爲是另一邊的拼圖組裝者，可將拼圖按正確的順序組裝在一起，要求重新傳送缺失的碎片，並讓傳送者知道拼圖已經收到
   2. 無連接性(Conectionless) : Client 送出一個 request 後，就會和 server 斷開連結，直到 server 準備好 response 後，才會再次建立 server-client 的連結。
      - HTTP 1.1 之後- 持續連線狀態 persistent connection，過一段時間之後還是會斷開，避免效率低落和伺服器壓力(頻繁建立 TCP/IP 通道)
   3. 無狀態性(Stateless) : HTTP 對於事物的處理不會保存任何資訊，每次的 request-response cycle 都會被視為一次獨立事件。
   4. 可擴充性： 請求與回應都共同有 Header Fields 與 Message Body；而只有請求有 Request Method，只有回應有 Response Status Codes - HTTP 只有定義出空間放東西，以及做一些預定義，如 Request Header Fields 有提到請求的表頭（header）有些名稱已經先被定義了。因為這東西的擴充定義非常自由，所以也有 RFC 額外定義其他名稱
   5. 純文字的(Text-based)：Request 和 response 是可以讀的文字，雖然對 de-bug 友善但資訊是不安全的。
   6. 支援緩存(support caching)：藉由重複使用先前取過的資源，網站與網頁應用程式能夠顯著地提升效能。caching 可以減少網路傳輸量以降低一個資源可展示的延遲時間。善用 HTTP caching 可以讓網站可以回應更多請求。
   7. 支持加密：HTTPS (after 2010)是支援加密和驗證的 HTTP。兩種通訊協定的唯一區別是 HTTPS 使用 TLS (SSL) 來加密普通的 HTTP 請求和回應，並對這些請求和回應進行數位簽名。
      - HTTPS 使用 TLS（或 SSL）來加密 HTTP 請求和回應，因此攻擊者看到的不是請求中的文字，而是一堆看似隨機的字元。 TLS 使用一種稱為公開金鑰加密的技術：有兩個金鑰，即公開金鑰和私密金鑰，其中公開金鑰透過伺服器的 SSL 憑證與用戶端裝置分享。當用戶端開啟與伺服器的連線時，這兩個裝置使用公開金鑰和私密金鑰商定新的金鑰（稱為工作階段金鑰），以加密它們之間的後續通訊。
   8. 支援代理(Proxy)：代理伺服器作為一個大門，會過濾所有使用者與伺服器之間的請求與回應，並阻擋使用者向任何的伺服器提出請求。外部伺服器可以看到的 IP 位址屬於代理伺服器，故使用 Proxy 可以隱藏使用者 IP；因為 Proxy 可緩存大量的網頁與檔案，故也能節省大量頻寬。
   9. 單向傳輸：Server 是被動地等待 Client 的連線，並不會有 Server 主動連接 Client 的情況，與 Websocket 可以進行雙向傳輸不同。
4. HTTP GET 方法和 POST 方法具體的差異是什麼？
   1. 安全性：GET 請求參數顯示在 URL 中，若為機密訊息可被緩存及書籤；POST 請求參數在 request body 中，外部不可見且無法緩存。
   2. 傳輸量：URL 長度上限依照瀏覽器稍有不同，最小大約 2000 出頭字符，因此 GET 請求數據的傳輸量會受到限制；POST 請求以 request body 傳輸，沒有大小限制。
   3. 數據類型：URL 只允許 ASCII 字符，若有其他種類字符則需要額外轉換(百分號編碼)，request body 可以傳送各種格式，包含二進制、表格等等。
   4. 冪等：GET 請求是冪等，而 POST 在每次執行時都會改變伺服器狀態
5. 4xx Status Code 和 5xx Status Code 通常用在什麼情境？
   1. 都是錯誤代碼，但主要區分 client 端或 server 端 error
   2. 400 代表錯誤請求語法或參數、401 身分驗證失敗、403 無授權、404 請求位址無資源
   3. 500 伺服器內部錯誤、503 伺服器臨時無法處理、504 請求的回覆超時
6. `WebSocket` 通訊協定和 `HTTP` 通訊協定有哪些差別？
   WebSocket 是網路協定的一種， Client 可以透過此協定與 Server 做溝通，而他和一般 http 或 https 不同的是， WebSocket 協定只需透過一次連結便能保持連線，不必再透過一直發送 Request 來與 Server 互動
   1. 連接方式：HTTP：是基於請求-回應模型，客戶端發送請求，伺服器回應後，連接關閉。WebSocket：是一個全雙工通訊協定(允許雙向資料傳輸)，客戶端與伺服器建立一次連接後，可以持續雙向傳輸數據，無需反覆重新連接。
   2. 數據傳輸：HTTP：每次請求都需要完整的頭資訊，導致頻繁的開關連接和額外開銷。WebSocket：初次連接後，數據傳輸時不再需要頭資訊，能夠提供更高效的數據交換，特別適合實時應用。
   3. 應用場景：HTTP：適用於一次性請求和回應，例如瀏覽器加載網頁。WebSocket：適用於需要持續傳輸數據的應用，例如即時聊天、股票行情推送等。
7. 說明快取的觀念？如何應用在你專案中？
   1. Cache 是利用記憶體暫時儲存取得的資料，並且在下次請求時直接回傳給 client 而不需要再次經歷 I/O，減少 server 反應的時間
   2. 在我的個人專案中，我使用 local redis 快取所有不會經常變動的資料，因為後端撰寫 MySQL connector 時區分搜尋與變更的方法，因此 redis 只需要快取搜尋中不常變更的資料即可(如某管理員管理的所有停車場)
   3. 先向 local redis 找尋是否有相關資料的 key，若無則向 RDS 請求並緩存於 redis server 中
   4. replacement policy 快取置換和 consistency 快取資料一致性?
8. 什麼是 Cookie？試說明 Cookie 的運作方式？
   1. Cookie 是一種小型的資料檔案，當使用者瀏覽網站時，伺服器會將這些資料傳送到使用者的瀏覽器，並存儲在本地。這些資料通常用來記錄使用者的操作行為或身份，以改善使用體驗(解決 HTTP 的無狀態性)。
   2. 創建與存儲：當使用者首次訪問網站時，伺服器透過 HTTP 回應中的 Set-Cookie 標頭向瀏覽器發送 Cookie，瀏覽器會將其以 key value 方式存儲在本地檔案中。
   3. 回傳：每當使用者再次請求同一網站時，瀏覽器會自動將該 Cookie 附加到請求中，以便伺服器識別並提供相關資料。
   4. 有效期限與範圍：Cookie 可以設定有效期限與適用的範圍，例如僅限於特定網域或子網域。若未設有效期限(MaxAge)，則為 Session Cookie，會在瀏覽器關閉後刪除。
   5. 舉例: 當你在網上購物時，你將商品添加到購物車，這個資訊就會被存儲在 Cookie 中。這樣，即使你關閉了瀏覽器，下次再打開時，購物車裡的商品還是存在的。
   6. 如何防止竄改?
      1. 加密 Cookie 内容: 只有服务器端持有解密密钥，才能解密 Cookie 并验证用户身份
      2. 设置 HttpOnly 属性: 防止 JavaScript 脚本访问 Cookie，降低 XSS 攻击的风险。
      3. 限制 Cookie 的作用域: 减少 Cookie 被其他网站窃取的风险
      4. 使用 Session 存储: 服务器端生成一个唯一的 Session ID，并通过 Cookie 发送给客户端。客户端每次请求时，将 Session ID 发送给服务器，服务器根据 Session ID 从服务器端获取用户信息。
9. 什麼是 Web Storage？和 Cookie 的特性有什麼差別？
   1. HTML5 提供了一個能在 Client 端儲存資料的技術，分為 Local Storage 跟 Session Storage
   2. Local Storage：能跨分頁的儲存資料，關閉頁面資料也不會消失（例如：某些網站的表單當我們填寫到一半關掉重新開啟仍然會記住之前輸入的資訊）
   3. Session Storage：不能跨分頁的儲存資料，關閉頁面資料會消失
   4. 在容量的部分大多有 5 MB ，因此相對於 cookie 來說是更好儲存資料的方式
   5. 與 Cookie 的主要差異
      1. 容量：Web Storage 容量通常為 5MB，遠大於 Cookie 的 4KB
      2. 傳輸：Cookie 會在每次 HTTP 請求中自動傳回伺服器，而 Web Storage 中的資料只存於瀏覽器端，不會被自動傳送
      3. 用途：Cookie 主要用於追蹤使用者狀態（如登入），而 Web Storage 則適合存放較大的資料，避免每次 HTTP 請求的額外負擔
10. 請說明 RESTful API 的設計原則。
    1. REST 全名為 Representational State Transfer，是一種軟體架構，他最初是用來管理複雜網路上的通訊指導方針指導方針建立。而 RESTful API 意旨遵循著 REST 架構風格的 API ，而 REST 架構風格需含以下原則
    2. REST 架構風格:
       1. 統一介面：將操作的細節作抽象，並提供統一的操作方式和規格。
       2. 無狀態：無狀態意旨伺服器獨立於所有之前的請求，所以用戶端可以按任何順序去請求資源。
       3. 分層系統：用戶端不清楚伺服器端有幾層，甚至伺服器端可以再向其他伺服器端請求資源。
       4. 可快取性：用戶端在獲得第一次回應後快取一些資訊，然後後續會直接使用快取中獲得資訊。（例如：網站中每個頁首、頁尾、LOGO 等）
       5. 隨需編碼（code on demand）：Server 可以隨時擴充功能，因應 Client 的即時需求。
    3. RESTful API: 意旨遵循著 REST 架構風格的 API
       1. 可擴展性：由於系統無需保留 Client 狀態，因此可以提高擴展效能。
       2. 靈活性：由於 Client 與 Server 完全分離，因此分層的應用程式功能可以提供靈活性。
       3. 獨立性：可以使用各種程式語言來編寫程式，不影響 API 的設計。
11. 解釋一下 MVC 的設計觀念，曾經實作過 MVC 的程式架構嗎？試說明。
    1. MVC（Model-View-Controller）是一種軟體設計模式，將應用程式分為三個主要部分：
       1. Model（模型）：負責管理數據和業務邏輯，處理數據的更新與操作，並在數據發生變更時通知視圖。
       2. View（視圖）：顯示數據的部分，負責將 Model 提供的數據呈現給用戶，通常與 UI 元素緊密相關。
       3. Controller（控制器）：處理用戶的輸入，將用戶操作轉換成對 Model 的指令，並根據結果更新 View。
    2. 這種模式的主要優勢是分離關注點，讓應用程式的每個部分各司其職，降低耦合度並提升代碼的可維護性和可測試性
    3. 在個人專案中
       1. 後端可以明確的分為接受前端 request 的 controller(router),而任何與資料庫有關的操作函式都另外獨立在 model 資料夾中
       2. 前端 js 區分為四塊，html 引入的唯一 modules(controller), 負責處理視覺部分的 view 和其他負責該頁面邏輯的 script(model), 頁面間共用或呼叫其他第三方服務的 common

## 單元測試

1. 什麼是 Pure Function？(適合做測試，但本身有獨立的意義)
   1. 相同輸入產生相同輸出：只要輸入相同，Pure Function 每次都會返回完全相同的結果，保證函式的輸出與輸入是可預測的。
   2. 沒有副作用（side effect）：Pure Function 不會影響函式外部的狀態，也不會修改外部變量或依賴外部的狀態。它只依賴於傳入的參數來進行計算，這確保函式的行為是獨立且可控的
2. 請說明 Unit Test 想解決的問題是什麼，可以分享你寫的 Unit Test 案例嗎？
   1. Unit Test（單元測試）旨在解決程式中各個小單位（通常是函數或方法）運行的正確性問題。其主要目的是
      1. 驗證程式碼的正確性：通過測試各個區塊，確認它們是否按照設計執行，並確保輸出結果符合預期
      2. 捕捉早期錯誤：透過單元測試，開發者可以在開發過程中快速發現並修復小範圍內的錯誤，避免問題累積到更高層級
      3. 提高程式的可維護性：測試程式能及時揭示程式碼變動是否影響到原本正確運行的部分，減少後續修改導致的潛在問題
