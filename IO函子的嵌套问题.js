const fp = require("lodash/fp");
const fs = require("fs");

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

let readFile = (filename) => {
  return new IO(() => fs.readFileSync(filename, "utf-8"));
};
let print = (x) => {
  return new IO(() => x);
};

// 组合函数，先读文件再打印
// let cat = fp.flowRight(print, readFile);
let cat = readFile("package.json").map(print)
// 调用后拿到的结果是嵌套的IO函子 IO(IO(x))
console.log(cat._value()._value());
// IO { _value: [Function] }
/**
 * {
  "name": "Functor",
  "version": "1.0.0",
  "description": "",
  "main": "either.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "folktale": "^2.3.2",
    "lodash": "^4.17.20"
  }
}
 */
// 遇到多个IO函子嵌套时，_value就会调用很多次，这样的调用体验很不好
