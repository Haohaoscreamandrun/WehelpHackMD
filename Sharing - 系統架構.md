# 系統架構
* **什麼是系統架構?**
定義系統的結構、行為及其他圖形介面（view）的概念模型。架構敘述（architecture description）是有關系統的描述和呈現，有助於瞭解系統結構和行為的方式來組織
* **如何規劃系統架構?**
1. System Analysis(系統分析)
* 目的：確定使用者需求和系統必須達成的功能
* 過程中，分析師會收集和分析資料，理解作業流程，並從使用者方確認需求
* 需求規格書，定義了系統應有的行為和特性，通常會請使用者提供URD(User Request Design)
> 按照規格書作很重要，如果多出來的功能，使用者可以推掉。
2. System Design(系統設計)
* 目的：根據系統分析得到需求的規格，進一步設計一個可以滿足這些需求的系統架構
* 設計階段結果可能包括架構圖、流程圖等，這些都是開發和實現系統所必需的
* 舉例，開發一套程式佈署平台管理系統所需的設計：
    1. 前端頁面設計
        * 使用者登入畫面
        * 程式包上傳頁面
        * 程式包下載頁面
        * 管理者權限頁面
    2. 後端撰寫server程式，供不同頁面做對應的處理 
        * 確認使用者權限
        * 程式版本控管、狀態維護(Review、Approved、Frozen、Terminated)
        * 確認下載檔案有無異動(使用**Checksum**機制檢查檔案大小)
        * 讓管理者設定使用者權限
    4. 資料庫設計 (Ex: 建立不同table存放各類別資料)
    5. 程式檔案存放空間 (Ex: FTP server)
    6. 異常處理


**簡略版**
![image](https://hackmd.io/_uploads/SkQ_AA6b0.png)
**詳細版**
![image](https://hackmd.io/_uploads/rJ_Jx1R-R.png)

* 結論
1. SA/SD可以讓系統架構設計的更完善
2. 做好系統架構需要經驗累積
3. 會員系統建置練習(Ex: 頁面設計、資料庫建置、Session)
![image](https://hackmd.io/_uploads/BJVlzQyfR.png)


參考資料
1. https://medium.com/bucketing/system-design-%E7%B3%BB%E7%B5%B1%E6%9E%B6%E6%A7%8B%E5%9F%BA%E7%A4%8E-%E4%BB%80%E9%BA%BC%E6%98%AF%E7%B3%BB%E7%B5%B1%E6%9E%B6%E6%A7%8B-bed1e1323770
2. https://medium.com/@eason91367/%E8%BB%9F%E9%AB%94%E7%B3%BB%E7%B5%B1%E6%9E%B6%E6%A7%8B%E6%95%B4%E7%90%86-%E4%B8%AD-9252078a0fb2