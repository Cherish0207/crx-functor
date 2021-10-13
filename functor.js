/**
 * 1.函子的值_value保存在内部，不对外公布（外部无法访问）。
 * 2.有一个对外的方法map，接收一个函数fn（纯函数）来处理_value。
 *   map函数返回一个新的函子，把fn处理的值返回给新的函子来保存
 */
class Container {
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return new Container(fn(this._value));
  }
}

// 创建一个函子的对象
let r = new Container(5)
  .map((x) => x + 1) // 6
  .map((x) => x ** 2); // 36

// 返回了一个container函子对象，里面有值是36，不对外公布
console.log(r); //Container { _value: 36 }
