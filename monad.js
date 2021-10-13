const fp = require("lodash/fp");
const fs = require("fs");
const IO = require("./IO");
class Monad extends IO {
  join() {
    return this._value();
  }
  // 同时调用map和join方法
  flatMap(fn) {
    return this.map(fn).join();
  }
}
/**
 * Monad:具有静态的IO方法和join方法的函子
 * 当一个函数返回一个函子时，我们就要想到monad来帮我们解决函子嵌套问题。
 * 当我们想要返回一个函数，这个函数返回一个值，这个时候可以调用map
 * 当我们想要去合并一个函数，但是这个函数返回一个函子，这时要用flatMap
 */
let readFile = (filename) =>
  new Monad(() => fs.readFileSync(filename, "utf-8"));
let print = (x) => new Monad(() => x);
console.log(readFile("package.json").flatMap(print).join());
console.log(readFile("package.json").map(fp.toUpper).flatMap(print).join());
// 处理数据，直接在读取文件之后，使用map进行处理即可
/**
 * 执行顺序:
 * readFile读取文件并返回一个IO函子
 * 使用readFile返回的IO函子调用flatMap，并传入print作为参数
 * 调用flatMap时，内部先调用map，当前的print和this._value进行合并，合并之后返回了一个新的函子
 *  （this._value就是readFile返回IO函子的函数：() => fs.readFileSync(filename, 'utf-8')）
 *   flatMap中的map函数执行完，print函数返回的一个IO函子，里面包裹的还是一个IO函子
 *   下面调用join函数，join函数就是调用返回的新函子内部的this._value()函数
 * 这个this._value就是之前print和this._value的组合函数，调用之后返回的就是print的返回结果
 * 所以flatMap执行完毕后，返回的就是print函数返回的IO函子
 *  */
