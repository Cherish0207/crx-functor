const { compose, curry } = require("folktale/core/lambda");
const { toUpper, first } = require("lodash/fp");

// curry中的第一个参数是函数有几个参数，为了避免一些错误
const f = curry(2, (x, y) => x + y);
console.log(f(1, 2)); // 3
console.log(f(1)(2)); // 3

// compose组合函数在lodash里面是flowRight
const r = compose(toUpper, first);
console.log(r(["one", "two"])); // ONE
