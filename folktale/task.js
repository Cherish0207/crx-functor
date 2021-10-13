/**
 * folktale(2.3.2) 2.x 中的 Task 和 1.0 中的 Task 区别很大，1.0 中的用法更接近我们现在演示的函子
 * 2.0中是一个函数，函数返回一个函子对象
 * 1.0中是一个类
 * 这里以 2.3.2 来演示
 */
const { task } = require("folktale/concurrency/task");
const fs = require("fs");
function readFile(filename) {
  return task((resolver) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) resolver.reject(err);
      resolver.resolve(data);
    });
  });
}

// readFile调用返回Task函子，调用要用run方法
readFile("package.json")
  .run()
  // 现在没有对resolve进行处理，可以使用task的listen去监听获取的结果
  // listen传一个对象，onRejected是监听错误结果，onResolved是监听正确结果
  .listen({
    onRejected: (err) => {
      console.log(err);
    },
    onResolved: (value) => {
      console.log(value);
    },
  });
