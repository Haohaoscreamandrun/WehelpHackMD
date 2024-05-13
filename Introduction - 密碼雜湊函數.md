密碼雜湊函數 Cryptographic hash function
===
1. 不論輸入資料的多少、長短，經過運算後得到一個固定長度的結果。
2. 因為不限制輸入長度，輸出結果有極小的機率可能會重複。
3. 輸入與輸出之間是猜不到規律的，(幾乎)無法反導。

```python
def hash(password):
  import hashlib
  m = hashlib.sha256()
  m.update(password.encode())
  result = m.hexdigest()
  return result
  # 比如吃了2根香蕉，無法從digest產物猜出原本吃的東西。
```

```python
from fastapi import FastAPI, Request
app=FastAPI()
@app.get("/")
async def setState(password: str):
  password=hash(password)
  # 存放排泄物到資料庫

@app.get("/check")
async def setState(password: str):
  password=hash(password)
  # 跟資料庫裡的排泄物比對
```

1. SessionMiddleware也是透過一些加密手法(Base64)把資訊存進cookie
2. 因為Base64可以反解，所以還是不會把重要資訊放進去session(相當於是明碼)
3. 相對的，使用者透過竄改session來假裝是別的使用者時，Middleware會判別出使用者曾經改動session內容，並立刻讓session失效。
4. Middleware會在後方加上鑑別碼再存入，並在後端加上邏輯判斷是否是當初發放的鑑別碼。

```python
from fastapi import FastAPI, Request
from fastAPI import JSONresponse
import hashlib

@app.get("/set_state")
def setState():
  response = JSONrespone({"ok": True})
  stateData = """{"id":4, "name": "ply}"""
  stateData=stateData+"\t"+hash(stateData)
  response.set.cookie("state",stateData)
  return response

@app.getState("/get_state")
def getState():
  state=request.cookies.get("state")
  stateParts = state.split("\t")
  stateData=stateParts[0]
  stateHash=stateParts[1]
  if hash(stateData) == stateHash:
    return 
  else:
    return
  ...
```
5. 如果別人知道加密的方法還是有可能通過上方的驗證，透過加入一個secret_key來加密
```python
def hash(password):
  import hashlib
  secret_key="aegevsdg"
  m = hashlib.sha256()
  m.update((password+secret_key).encode())
  result = m.hexdigest()
  return result
```