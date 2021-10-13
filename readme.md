[函数式编程（五）—— 函子](https://www.jianshu.com/p/f5ff293bcdd9)
Functor

- 函子
- 什么是 Functor
- 理解 Functor
- 总结
- MyBe 函子
- Either 函子
- IO 函子
- Task 函子（异步执行）
  - folktale 的安装
  - folktale 中的 curry 函数
  - folktale 中的 compose 函数
  - Task 函子异步执行
  - 案例
- Pointed 函子
- Monad 函子（单子）
  - IO 函子的嵌套问题
  - 什么是 Monad 函子
  - 实现一个 Monad 函子
  - Monad 函子小结
    - 什么是 Monad？
    - 什么时候使用 Monad?
- 【函数式编程总体设计】

## 函子

函子(representative functor)是范畴论里的概念，指从任意范畴到集合范畴的一种特殊函子。
我们没有办法避免副作用，但是我们尽可能的将副作用控制在可控的范围内，我们可以通过函子去处理副作用，我们也可以通过函子去处理异常，异步操作等。

## Functor

什么是 Functor
容器：包含值和值的变形关系(这个变形关系就是函数)
函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运行一个函数对值进行处理(变形关系)
