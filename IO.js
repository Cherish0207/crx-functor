/**
 * IO: 输入输出
 * IO函子:惰性求值
 *  _value是一个函数，这里是把函数作为值来处理
 *  把不纯的操作(比如10、网络请求、DOM)存储到_value中，延迟执行这个操作(惰性执行)，包装当前的操作
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
  join() {
    return this._value();
  }
  // 同时调用map和join方法
  flatMap(fn) {
    return this.map(fn).join();
  }
}

module.exports = IO;
