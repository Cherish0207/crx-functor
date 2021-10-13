const IO = require("./IO");

const r = IO.of(process) // process对象（进程）
  // map需要传入一个函数，函数需要接收一个参数，这个参数就是of中传递的参数process
  // 返回process中的execPath属性(当前node进程的执行路径)
  .map((p) => p.execPath);
console.log(r); // IO { _value: [Function] }

// 上面只是组合函数，如果需要调用就执行下面
console.log(r._value());
// C:\Program Files\nodejs\node.exe
// /usr/local/bin/node
