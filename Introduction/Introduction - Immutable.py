# Immutable
import copy
x=3
y=x
print(id(y))
y=y+1
print(x)
#3
#創造另一個heap並把y指向新的位址

print(id(x))
print(id(y))
# y物件id改變

# Mutable
x = {'name': 'ply'}
y = x
y['name'] = 'pply'
print(x)
# {'name': 'pply'}

print(id(x))
print(id(y))
# 物件id相同


def test(x):
  x += 1
  print(x)
  print(id(x))
  # local namespace

x = 3 # global namespace

test(x)
print(x)
print(id(x))
# 傳遞Immutable參數不影響全域參數

def test1(data):
  data['x'] += 1
  print(id(data))

dic = { 'x': 3, 'y': 4 }
test1(dic)
print(dic)
print(id(dic))
# 傳遞Mutable參數影響全域參數

# Immutable in mutable
def test2(data):
  x = data[1]
  print(id(data))
  x += 1
  print(id(x))

li = [0,1,5]
print(id(li[1]))
test2(li)
print(li)
print(id(li[1]))


def one2ten():
  for x in range(1, 11):
    yield x

x = one2ten()

# 用 for 走訪:
for i in x:
  print(i)

# 用 next() 走訪：
# print(next(x))  # 1

# print(next(x))  # 2

a = [1, [2, 3]]
b = a # Shallow copy
a_deepcopy = copy.deepcopy(a) # Deep copy
print(id(a), id(b), id(a_deepcopy))
a_deepcopy[0] = 5
print(a, a_deepcopy)
"""
1966485926656
1966485926656
1966485924992
[1, [2, 3]]
[5, [2, 3]]
"""