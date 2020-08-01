/**
 * co源码分析
 */
var slice = Array.prototype.slice;
// 对外暴露co
module.exports = co['default'] = co.co = co;
/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

// 对co进行一层简单的封装，方便传参
// 为有参数的generator调用，提供简单包装
co.wrap = function (fn) {
  // 存了一个指针指向原generator函数
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    // 传入的参数通过apply方式作为fn的参数执行
    // 调用co函数
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  // 缓存this
  var ctx = this;
  // 获取co函数从第二个参数到最后一个参数，除gen之外的其他参数
  var args = slice.call(arguments, 1)
  // 重点：co的返回值是Promise对象。可以then和catch的根源
  return new Promise(function(resolve, reject) {
    // 执行一次generator函数以获取遍历器对象
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    // 如果传入co的gen既不是generator函数也不是遍历器对象，直接将Promise变为成功态
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
    // 启动执行
    onFulfilled();

    function onFulfilled(res) {
      var ret;
      try {
        // 执行遍历器对象的next方法，如果报错则reject
        // 将异步操作结果(value)作为前一个yield的返回值
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      // 继续执行next函数
      next(ret);
    }

    function onRejected(err) {
      var ret;
      try {
        // 指向遍历器对象的throw方法(抛出错误，由generator函数内部进行错误处理)，如果报错则reject
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
    // 关键所在：generator执行器，自动连续执行next
    // 一个Generator内部可能有多个yield，一个yield结束之后会执行下一个yield，这个过程通过递归实现
    function next(ret) {
      // 如果generator函数执行完成，直接调用resolve把promise置为成功状态
      if (ret.done) return resolve(ret.value);
      // 每次都将yeild返回的value(ret.value)转换为Promise
      var value = toPromise.call(ctx, ret.value);
      // 使用Promise.then递归连续执行
      // onFulfilled和onRejected函数中会继续调用next函数自身
      // 给新的promise添加onFulfilled和onRejected
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      // yeild返回的value无法转换为Promise时进行错误处理
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
    // obj不存在，直接返回
    if (!obj) return obj;
    // 如果obj已经是Promise，直接返回
    if (isPromise(obj)) return obj;
    // 如果是generator函数或者generator生成器，执行
    if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
    // 如果是普通的函数（需要符合thunk函数规范），就将该函数包装成Promise的形式
    if ('function' == typeof obj) return thunkToPromise.call(this, obj);
    // 如果obj是array，直接用Promise.all包装
    if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
    // 如果obj是object
    if (isObject(obj)) return objectToPromise.call(this, obj);
    return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */
// thunk函数具备以下两个要素：
// 1. 有且只有一个参数是callback的函数
// 2. callback的第一个参数是 error
function thunkToPromise(fn) {
  var ctx = this;
  // 将thunk函数包装成Promise
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */
function objectToPromise(obj) {
    // 构造一个和传入对象有相同构造器的对象
    var results = new obj.constructor();
    // 获取 obj 的keys
    var keys = Object.keys(obj);
    // 存储 obj 中是 Promise 的属性
    var promises = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // 转换为Promise形式
      var promise = toPromise.call(this, obj[key]);
      // 如果是结果是 Promise，则用 defer 函数对 results 的某个 Promise 返回值进行修改
      if (promise && isPromise(promise)) defer(promise, key);
      // 如果不是就直接返回
      else results[key] = obj[key];
    }
    // 等待所有 promise 执行完毕，返回结果
    return Promise.all(promises).then(function () {
      return results;
    });

    function defer(promise, key) {
      // predefine the key in the result
      // 预定义
      results[key] = undefined;
      promises.push(promise.then(function (res) {
        // 运行成功结果赋值给 results
        results[key] = res;
      }));
    }
}

// 判断是否是Promise
function isPromise(obj) {
  return 'function' == typeof obj.then;
}
// 判断是否是Generator对象
function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

// 判断是否是Generator函数
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

// 判断是否是纯对象
function isObject(val) {
  return Object == val.constructor;
}
