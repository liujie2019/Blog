/* @flow */
/* globals MutationObserver */

// noop空函数，可用作函数占位符
import { noop } from 'shared/util'
// Vue 内部的错误处理函数
import { handleError } from './error'
// 判断是IE/IOS/内置函数
import { isIE, isIOS, isNative } from './env'
// 使用 MicroTask 的标识符
export let isUsingMicroTask = false

// 以数组形式存储执行的函数
// 存放异步执行的回调
const callbacks = []
// nextTick 执行状态
// 一个标记位，如果已经有timerFunc被推送到任务队列中去则不需要重复推送
let pending = false

// 遍历函数数组执行每一项函数
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).

// 核心的异步延迟函数，用于异步延迟调用 flushCallbacks 函数
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */

// timerFunc 优先使用原生 Promise
// 原本 MutationObserver 支持更广，但在 iOS >= 9.3.3 的 UIWebView 中，触摸事件处理程序中触发会产生严重错误
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    // IOS 的 UIWebView，Promise.then 回调被推入 microtask 队列但是队列可能不会如期执行。
    // 因此，添加一个空计时器“强制”执行 microtask 队列。
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true

  // 当原生 Promise 不可用时，timerFunc 使用原生 MutationObserver
  // 如 PhantomJS，iOS7，Android 4.4
  // issue #6466 MutationObserver 在 IE11 并不可靠，所以这里排除了IE
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
  // 如果原生 setImmediate 可用，timerFunc 使用原生 setImmediate
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  // 最后的倔强，timerFunc 使用 setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
// cb回调函数：是要延迟执行的函数
// ctx：指定cb回调函数的this指向
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // cb回调函数会经统一处理压入callbacks数组
  callbacks.push(() => {
    if (cb) {
      // 给cb回调函数执行加上了try-catch错误处理
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // 执行异步延迟函数timerFunc
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  // 当nextTick没有传入函数参数的时候，返回一个Promise化的调用
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
