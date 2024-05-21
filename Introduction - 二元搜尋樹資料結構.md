# 目標：儲存不可重複的數字，支援新增、查詢及有序列表

## 解法一：使用資料陣列結構

```javascript
class ArrayDB{
  constructor(){
    this.data=[]
    this.size=0
  }

  push(value){ // O(n)
if(!this.contains(value)){
  this.data.push(value);
  this.size++;
}
  }

  contains(value){
    for(let i=0; i<this.data.length;i++>){
      if(this.data[i]===value){
        return true;
      }
    }
    return false;
  }
  list(){ // O(n*logn)
    return this.data.toSorted();
  }
}

let db = new ArrayDB();
db.push(5);
db.push(8);
db.push(6);
db.push(8);
console.log(db.size);
console.log(db.contains(8));
console.log(db.contains(7));
console.log(db.list());

```

## 解法二：使用二元搜尋樹資料結構 Binary Search Tree

### 每一個資料就擺在一個節點中，節點包含一個指向左邊節點的紀錄，和一個指向右邊節點的紀錄

```javascript
//list[3,1,2,5,0]
// root       3
// node1   1     5
// node2 0  2
// list[0,1,2,3,5]

class Node{
  consturctor(value, left, right){
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BSTDB{
  constructor(){
    this.root = null;
    this.size = 0;
  }

  push(value){ // O(logn)
    let node= this.root;
    if(node === null){
      this.root = new Node(value, null, null);
      this.size++;
      return;
    }
    while(true){
      if(value === node.value){
        return;
      }else if (value> node.value){ //要放的資料比較大，往右
        if(node.right === null){
          node.right = new Node(value,null,null)
          this.size++;
          break;
        }else{
          node.node.right;
        }
      }else{ // 要放的資料比較小，往左
        if(node.left === null){
          node.left = new Node(value, null, null)
        }
      }
    }
  }

  contains(value){ // O(logn)
    ...
  }

  list(){ // O(n)
    let node = this.root;
    let stack= [];
    let result = [];
    while(true){
      while(node!== null){
        stack.push(node);
        node=node.left;
      }
      if(stack.length === 0){
        break
      }
      node=stack.pop();
      result.push(node.value);
      node=node.right;
    }
    return result
  }
}

```

不同的資料結構會影響資料存取的速度
[索引參考](https://ithelp.ithome.com.tw/articles/10221111)