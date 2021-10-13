/**
 * 异常会让函数变的不纯，Either 函子可以用来做异常处理
 * Either函子：两者中的任何一个，类似于 if...else...的处理
 * 当出现问题的时候，Either函子会给出提示的有效信息
 */
class Left {
  static of(value) {
    return new Left(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this; // 返回当前对象，并没有使用fn函数
  }
}
class Right {
  static of(value) {
    return new Right(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return Right.of(fn(this._value));
  }
}
/**
 * 定义一个字符串转换成对象的函数
 * try-catch处理异常: 正常情况使用Right函子; 错误后使用Left函子，并返回错误信息
 */
function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of({ error: e.message });
  }
}

console.log(parseJSON("{name:xm}")); // Left { _value: { error: 'Unexpected token n in JSON at position 1' } }
console.log(parseJSON('{"name":"xm"}')); // Right { _value: { name: 'xm' } }
console.log(parseJSON('{"name":"xm"}').map((x) => x.name.toUpperCase())); // Right { _value: 'XM' }
