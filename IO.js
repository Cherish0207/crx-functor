/**
 * IO: 输入输出
 * IO函子:
 *  _value是一个函数，这里是把函数作为值来处理
 *  把不纯的动作存储到_value中，延迟执行这个不纯的操作(惰性执行)，包装当前的操作
 *  把不纯的操作交给调用者来处理
 */
const fp = require("lodash/fp");

class IO {
  static of(value) {
    return new IO(() => value); // 调用of时,把当前取值过程包装到函数里面，再在需要的时候再获取
  }
  constructor(fn) {
    // 传入一个函数
    this._value = fn;
  }
  map(fn) {
    // 这里new一个新的构造函数，是为了把当前_value的函数和map传入的fn进行组合成新的函数
    return new IO(fp.flowRight(fn, this._value));
  }
}

// console.log(process.execPath);// /usr/local/bin/node
const r = IO.of(process) // process对象（进程）
  // map需要传入一个函数，函数需要接收一个参数，这个参数就是of中传递的参数process
  // 返回process中的execPath属性(当前node进程的执行路径)
  .map((p) => p.execPath);
console.log(r); // IO { _value: [Function] }

// 上面只是组合函数，如果需要调用就执行下面
console.log(r._value());
// C:\Program Files\nodejs\node.exe
// /usr/local/bin/node
