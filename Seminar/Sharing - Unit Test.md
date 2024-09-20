# Unit test

[handout](https://app.heptabase.com/w/5012ae25710d1800654ea18c1c2e057d5f2a1014b66384d58bb9e7f5c95be2d8?id=10098832-73b9-4aaf-a640-9db0f782c45b)

## key points

1. 通常只有一個entry point，但會有很多的exit points(return)
    1. return something
    2. change something's state
    3. call third party(like APIs)
2. 嚴謹的公司會要求至少60%的測試覆蓋率
3. Stubs/Marks 測試third party calling function(測試絕對不可以直接call)
    1. Stubs break incoming dependencies (indirect inputs). Stubs are fake modules, objects, or functions that provide fake behavior or data into the code under test. We do not assert against them. We can have many stubs in a single test.
    2. Mocks break outgoing dependencies (indirect outputs or exit points). Mocks are fake modules, objects, or functions that we assert were called in our tests. A mock represents an exit point in a unit test. Because of this, it is recommended that you have no more than a single mock per test.
4. 
