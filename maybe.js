/**
 * 处理外部的空值情况（控制副作用在允许的范围）
 * map函数中判断_value是不是null和undefined，如果是就返回一个value为null的函子，如果不是就执行函数
 */
class MayBe {
  static of(value) {
    return new MayBe(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
  }
  isNothing() {
    return this._value === null || this._value === undefined;
  }
}
function getResult(str) {
  return MayBe.of(str).map((x) => x.toUpperCase());
}

console.log(getResult("hello world"));
//MayBe { _value: 'HELLO WORLD' }
console.log(getResult(null));
// 如果输入的是null，是不会报错的
// MayBe { _value: null }
