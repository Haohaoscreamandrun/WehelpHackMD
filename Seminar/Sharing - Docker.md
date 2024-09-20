# 五倍紅寶石-Docker

## Docker 技術綜觀

1. Container 其實是Linux原本就有的技術，但需要很多複雜的指令，無法直接在mac和windows上跑
2. 跟VM相比，Container的隔離性並沒有這麼好，但執行速度恨快
3. Docker是Container的標準化工具，讓container變得更容易使用
4. Container build是基於作業系統(OS)之上，如果底層晶片指令集不同，還是會跑不動
5. Kubernetes是用來編排container的工具，使用的是Google和RedHat定義的OCI規範。
6. Docker image符合OCI規範，可以由k8s管理，但docker container並不符合OCI

## Image & Container

1. Image作為Container的樣板，之間的關係很像class和instance
2. Image把會使用到的package裝進去，Build once run anywhere
3. Container是以image作為模板run起來的，但也可以在操作container後commit回image, 但跟原本的image不會相同(他會把container writable upper div複製後堆到image最上面的lower div)

## Command

1. 指令格式: docker / 對象 /  ( [參數] {image} [cmd])

2. 指令練習

```shell
# docker container run [參數] {image 名稱} [CMD]

# 觀察以下指令的執行過程與結果
docker container run alpine echo "hello world"
## echo "hello world" 是啟動這個 container 的 process
##  舊版指令: docker run alpine echo "hello world" 

# 練習基本指令
docker container ls # 為什麼看不到上一行指令建立的 container? 因為他已經執行完 echo "hello world" 就shut down了
docker container ls -a
## CONTAINER ID   IMAGE     COMMAND                CREATED              STATUS                          PORTS     NAMES
## 1d3e39ecbebf   alpine    "echo 'hello world'"   About a minute ago   Exited (0) About a minute ago      
## happy_nobel
## 舊版指令:
## docker ps 
## docker ps -a

# 移除 container
docker container rm {container name or id} # 並不需要打完全部的名字或ID，他搜尋的到就好
## 舊版指令: docker rm {container id or hash id}

# 移除所有停止運行的 container
docker container prune

# 啟動時指定名字
docker container run --name my-container alpine

# 查看一個 container
docker container inspect my-container

# 觀察以下兩個指令執行後的差異
docker container run alpine echo "hello world"
docker container run --rm alpine echo "hello world" # 跑完之後不只關掉，直接刪除
# 前景執行
## run 的時候沒有指定 COMMAND，那就是用預設的 COMMAND
docker container run -it ubuntu
## -i interactive 啟動互動模式，保持標準輸入的開放
## -t tty 讓 Docker 分配一個虛擬終端機(pseudo-TTY)，並且綁定到容器的標準輸出上。
## 此時會建立一個虛擬終端機，並且啟動互動模式，也就是你現在「在 container 裡」
## 離開的話，要下什麼指令？ exit

# detach 模式 (背景模式)
## run 的時候沒有指定 COMMAND，那就是用預設的 COMMAND
docker container run -d nginx
## 觀察執行後的結果
docker container ls 

# detach 模式看不到程式輸出的結果？
## 觀察 container 裡 processes 的 stdout 與 stderr
docker container logs {container id or name}

# 實驗:
## ubuntu 這個 image 如果用 detach 模式啟動會怎麼樣？
docker container run -d ubuntu
## 你觀察到什麼？container 有被成功啟動嗎？ 有，但她直接關掉了
### 因為沒加cmd 預設的cmd是bash，container開啟後發現沒有process可以跑，所以就自己關掉
### 作為container的 PID 1 process, 它的存在是撐住container的關鍵，PID 1必須要在前景並且持續運行
```

## Images

1. Image 完整名稱: Host:PortNumber:Namespace/image:tag

## 課堂作業

```shell
Run nginx container with default command
Enter to this container
  # 在背景執行
  **docker container run -d nginx** 
  
  # enterto this container
  docker container exec -it {container id} bash
  
Edit index.html in this container/usr/share/nginx/html
  # 在 container 裡安裝編輯器
  apt-get update -y
  apt-get install -y nano

<html>
      <head>
          <title>My First Image</title>
      </head>
      <body>
          <h1>Hi, I am {your name}</h1>
      </body>
  </html>

Commit this container to an image
# 把 container commit 回 image
docker container commit {container hash id} {new image name}
Signup/Signin Docker hub
Push this new image to DockerHubhttps://ithelp.ithome.com.tw/articles/10191139
Test:
  docker container run -d -p 3000:80 {custom image name}
  
  # 在 host 用 curl 測試
  curl localhost:3000
  
驗收: 找一個同學試用你的 image 

```
