/* @flow */
/* globals MutationObserver */

// noop 空函数，可用作函数占位符
import { noop } from 'shared/util';
// Vue 内部的错误处理函数
import { handleError } from './error';
// 判断是否是IE/IOS/内置函数
import { isIE, isIOS, isNative } from './env';

// 使用 MicroTask 的标识符
export let isUsingMicroTask = false;

// 用来存储所有需要执行的回调函数
const callbacks = [];

// 用来标志是否正在执行回调函数
let pending = false;

function flushCallbacks() {
  pending = false;
  // 将callbacks拷贝一份
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  // 循环遍历数组里面的函数，并且执行
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

/**
接下来是核心的 异步延迟函数。这里不同的 Vue 版本采用的策略其实并不相同。
2.6 版本优先使用 microtask 作为异步延迟包装器。
2.5 版本则是 macrotask 结合 microtask。然而，在重绘之前状态改变时会有小问题（如 ＃6813）。此外，在事件处理程序中使用 macrotask 会导致一些无法规避的奇怪行为（如＃7109，＃7153，＃7546，＃7834，＃8109）。
所以 2.6 版本现在又改用 microtask 了，为什么是又呢。因为2.4版本及之前也是用的 microtask。
microtask 在某些情况下也是会有问题的，因为 microtask 优先级比较高，事件会在顺序事件（如＃4521，＃6690 有变通方法）之间甚至在同一事件的冒泡过程中触发（＃6566）。
 */

// 核心的异步延迟函数，用于异步延迟调用 flushCallbacks 函数
let timerFunc;

/* istanbul ignore next, $flow-disable-line */

// 不同的 Vue 版本采用的策略其实并不相同。根据判断，在不同环境下使用不同的异步延迟函数

// nextTick采用了微任务队列，可以通过原生Promise.then或MutationObserver对其进行访问。
// timerFunc优先使用原生Promise
// 其实MutationObserver拥有更广泛的支持，但在 iOS >= 9.3.3 的 UIWebView 中，触摸事件处理程序中触发时会产生严重错误。
// 所以原生Promise可用的时候，优先使用原生Promise。
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    // IOS 的 UIWebView，Promise.then 回调被推入 microtask 队列，但是队列可能不会如期执行。
    // 因此，添加一个空计时器强制执行 microtask 队列。
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver)
  // PhantomJS and iOS 7.x
  || MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // 当原生 Promise 不可用时，timerFunc 使用原生 MutationObserver
  // 如 PhantomJS，iOS7，Android 4.4
  // issue #6466 MutationObserver 在 IE11 并不可靠，所以这里排除了IE
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
  // 如果上面两种情况都不能用，且原生setImmediate可用，timerFunc 使用原生 setImmediate
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
  // 如果上面的都不能用，timerFunc使用setTimeout
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}
// 优先级：microtask优先(Promise和MutationObserver都是microtask)。
// Promise > MutationObserver > setImmediate > setTimeout

/**
 * nextTick函数。接受两个参数：
 * @param {*} cb 回调函数：是要延迟执行的函数；
 * @param {*} ctx 指定 cb 回调函数 的 this 指向；
 * Vue 实例方法 $nextTick 做了进一步封装，把ctx设置为当前Vue实例。
 */
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  // cb回调函数会经统一处理并压入callbacks数组
  callbacks.push(() => {
    if (cb) {
      // 给cb回调函数执行添加try-catch错误处理
      try {
        cb.call(ctx);
      } catch (e) {
          // 错误处理
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  // 执行异步延迟函数timerFunc
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  // 当nextTick没有传入回调函数参数的时候，返回一个Promise化的调用
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
