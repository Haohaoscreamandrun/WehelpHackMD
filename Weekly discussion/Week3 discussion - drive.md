# Week3 Discussion - Drive

## 電腦中的主記憶體 Main Memory 和硬碟 Disk or Drive 有什麼差別？

1. [HP tech](https://www.hp.com/gb-en/shop/tech-takes/computer-memory-vs-storage)
    - Memory又稱RAM(random access memory)，是資料的短期存放區域，電腦的運行程序可以快速地取得。Storage是可以永久的儲藏資料的地方，又可以分為內部(各種電腦內分割的槽)或外部(隨身碟)的storage。
2. [LeoLin](https://medium.com/@leo19866/cpu%E8%88%87%E8%A8%98%E6%86%B6%E9%AB%94-memory-%E7%9A%84%E9%81%8B%E4%BD%9C%E6%A9%9F%E5%88%B6-2e33bd9b0858)
    - 記憶體有兩種，一個是volatile memory, 一個是non-volatile memory。差別在於電供中斷之後，揮發性記憶體裡的資料會消失，而非揮發性記憶體則不會；volatile傳輸速度比起non-volatile快很多，因此多作為main memory使用。一般電腦使用的揮發性記憶體類型是RAM，其隨機是指 “當要對這個記憶體內的任何位置的資料作讀取或寫入時，其所花費的時間與位置無任何關係” ，相對應的觀念則是循序存取。揮發性記憶體比較貴。
    - RAM又可以區分為DynamicRAM和StaticRAM，DRAM採用電容儲存資料，藉由判斷電容內的電量來判斷1/0，但漏電是無可避免的，為避免資料消失，DRAM必須定期重新充電來保持資料狀態。SRAM則是使用flip-flop邏輯閘儲存資料，靠斷路與否來判斷1/0，不需要定期充電，傳輸也更快，像是cache就是一種SRAM。但因為製造上DRAM就是簡單的電容，且一個電容能儲藏的資料要兩個以上的邏輯閘，所以DRAM容量更大且便宜很多。
    - 因為兩因為兩者在關機後資料都會消失，故在關機前要將資料傳給硬碟(Hard disk)或非揮發性記憶體，也就是常見的固態硬碟SSD。

|SSD|傳統硬碟|
|NAND 積體電路|精密金屬機件|
|輕薄短小、省電、溫度低|體積大、重量重、較耗電、溫度較高|
|讀寫快速|讀寫速度相對較慢|
|NAND 寫入時會有耗損|理論上磁片讀寫無耗損|
|耐摔耐碰撞|怕碰撞|
|晶片燒毀後，無法資料救援|硬碟故障時，資料救援機會較高|

## 請調查你的電腦主記憶體空間和硬碟空間各是多少？各值多少錢？

- DRAM
  - ADATA 威剛 DDR4 3200 16GB 兩支(雙通道) 現價PChome $1,099
- SSD
  - ADATA XPG GAMMIX S50 Lite 1TB M.2 SSD 現價原價屋 $3,990

## 程式中什麼時候會使用到記憶體空間、什麼時候會使用到硬碟空間？

- 程式一般在被使用時是使用RAM，因為CPU可以更快的回應和存取。
  - DDR4 RAM, one of the newer types of RAM technology, is capable of a peak transfer rate of 25.6GB/s!  
- 開始使用時會從storage 取得程式碼和資料並在RAM上運行。
- 若RAM空間不夠用，作業系統可能會將沒有執行到的code放在由storage切分出來的虛擬記憶體中，當有需要時再swap進RAM中
- 程式在執行Loading或Saving時也會需要存取Storage
- 通常Cache會使用RAM的空間，但也有些Storage會有緩存空間，比如說有的SSD上會有DRAM晶片，用於加速讀寫；也有的SSD會畫出一部分空間模擬Cache空間來達到這個效果。

## 程式中使用變數儲存一個整數 3 要使用多少記憶體空間？

- 若存的是'int'，沒有後面的小數點和小數位數，在大部分的程式語言內，'int'的資料格式使用4 bytes = 32 bits

- 若存的是浮點數'float'，'float'使用1 bit表示sign、8 bits表示exponent，23 bits for fraction，最終值是三數相乘 (看不懂)

- 在現代的Python實現（如CPython）中，一個小的整數可能會使用大約28個bytes（這個大小包括了Python物件的通用頭部信息）。但這個數值可能因實現的不同而有所變化。

- 64 bits (8 bytes): Every number in JavaScript consumes 64 bits of memory, which includes integers and floating-point numbers alike. Therefore, even a simple integer like 3 is stored using 8 bytes in JavaScript

## 假設中華電信光世代網路下載速度是 100Mbps，若全速下載一個 25MB 的檔案，要花多少時間？

- Mbps 是 Million bit per second，因此要除以一個位元組才會等於MB/s (Million bytes per second)

- 100 Mbps = 12.5 MB/s

- 大概只需要兩秒的時間(全速)
