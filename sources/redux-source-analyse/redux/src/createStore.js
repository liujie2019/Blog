// 导入 symbol 类型的 observable (symbol类型的属性，是对象的私有属性)
import $$observable from 'symbol-observable'

import ActionTypes from './utils/actionTypes'
// 判断是否是简单对象
import isPlainObject from './utils/isPlainObject'

/**
 * 创建一个Redux store来存放应用所有的 state。应用中有且只有一个store
 *
 * @param {Function} reducer 是一个函数,接收两个参数，分别是当前的state树和
 * 要处理的action，返回新的state树
 *
 * @param {any} [preloadedState] 初始化时的state，在应用中，你可以把服务端传来经过处理后的state
 * 传给它。如果你使用combineReducers创建reducer，它必须是一个普通对象，与传入
 * 的keys保持同样的结构。否则，你可以自由传入任何reducer可理解的内容。
 *
 * @param {Function} [enhancer] 是一个组合的高阶函数，返回一个强化过的store creator。
 * 这与middleware相似，它也允许你通过复合函数改变store接口。
 *
 * @returns {Store} 返回一个对象，给外部提供 dispatch, getState, subscribe, replaceReducer
 */
export default function createStore(reducer, preloadedState, enhancer) {
    // 如果preloadedState和enhancer都是function，不支持，throw new Error
    // 我们都知道[initState]为object，[enhancer]为function
    // typeof arguments[3] === 'function'为true的话，说明使用了多个store enhancer
    // 需要使用compose()函数将多个store enhancer合并成一个函数
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function'
    )
  }

  // 当preloadedState === 'function'和typeof enhancer === 'undefined'都为true时，说明只有两个参数
  // 且第二个参数为函数，那么实际上传入的是reducer和enhancer，并没有传入初始化的state(preloadedState)
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState // preloadedState形参中实际保存的是enhancer
    preloadedState = undefined
  }
  // typeof enhancer !== 'undefined'为true，则说明传入了三个参数
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') { // 如果有三个参数且第三个参数不为函数则报错（enhancer必须为函数）
      throw new Error('Expected the enhancer to be a function.')
    }
    // 如果传入了applyMiddleware，applyMiddleware的作用就是将这些enhancer格式化成符合redux要求的enhancer
    // 再用处理好的enhancer来生成store
    return enhancer(createStore)(reducer, preloadedState)
  }
  // 传入的reducer必须是一个纯函数，且是必填参数
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  // 定义了一些变量
  let currentReducer = reducer // 当前store中的reducer
  let currentState = preloadedState // 当前store中存储的状态
  let currentListeners = [] // 当前store中放置的监听函数，即当前订阅者列表
  let nextListeners = currentListeners // 下一次dispatch时的监听函数列表，即新的订阅列表
  // 注意：当我们新添加一个监听函数时，只会在下一次dispatch的时候生效。
  let isDispatching = false // 标志是否正在dispatch

  // 添加这个函数的意图在下面会讲到，先看代码层面上的作用：
  // 如果nextListeners和currentListeners指向同一个对象，即判断两者是不是同一个引用
  // 则nextListeners对currentListeners进行浅拷贝
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
       // 如果是一个引用的话，浅拷贝出来一个currentListeners赋值给nextListeners
      // 其实这里是保存一份订阅快照
      // slice不修改原数组，只返回一个浅复制了原数组总的元素的一个新数组
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} store.getState()获取当前应用的state
   */
  function getState() {
      // 为了保证数据的一致性，当在reducer操作的时候，是不可以读取当前的state值的
    if (isDispatching) {
        // 参考：https://github.com/reactjs/redux/issues/1568
        // 为了保持reducer的pure，禁止在reducer中调用getState
        // 纯函数reducer要求根据一定的输入即能得到确定的输出，所以禁止了getState,subscribe,unsubscribe和dispatch等会带来副作用的行为
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }
    // 返回当前应用的state
    // currentState在每次dispatch的时候都会得到相应的更新
    return currentState
  }

  /**
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   * 添加一个监听函数，每当dispatch被调用的时候都会执行这个监听函数
   */
  function subscribe(listener) {
      // 判断监听者是否为函数。传入的listener必须是一个函数，否则抛出错误
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }
    // 判断是否有reducer正在进行数据修改，保证数据的一致性
    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      )
    }
    // 标识监听器的订阅状态
    let isSubscribed = true // 设置一个标识，标识该监听器已经订阅了
    // 在每次subscribe的时候，浅拷贝一次currentListeners，在nextListener中添加新的listener
    ensureCanMutateNextListeners()
    // 将listener添加到监听函数数组中
    // 需要注意的是：listener在下一次dispatch时才会生效
    nextListeners.push(listener)

    // subscribe函数返回取消订阅的函数，用于从监听函数数组中删除相应的监听函数
    return function unsubscribe() {
       // 判断是否已经取消订阅
      if (!isSubscribed) { // 如果已经取消过订阅了，则直接返回
        return
      }
      // 判断是否有reducer正在进行数据修改，保证数据的一致性
      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
        )
      }

      isSubscribed = false // 设置一个标识，标识该监听器已经取消订阅了
      // 在每次unsubscribe的时候，浅拷贝一次currentListeners，在nextListeners取消订阅当前listener
      ensureCanMutateNextListeners()
      // 找到listener对应的索引
      const index = nextListeners.indexOf(listener)
      // 从nextListeners中删除unsubscribe的listener
      nextListeners.splice(index, 1)
    }
  }

  // 发送action给reducer，返回新的state，并且执行所有添加到store中的监听函数。
  function dispatch(action) {
      // 判断action是否为简单对象
      // action必须是一个plain object，如果想要能处理传进来的函数的话必须使用中间件（redux-thunk等）
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }
    // 判断action.type是否存在，action必须定义type属性
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }
    // 判断当前是否有执行其他的reducer操作
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    try {
      isDispatching = true // 执行reducer前，将isDispatching设置为true，阻止后续的action进来触发reducer操作
      currentState = currentReducer(currentState, action) // 调用reducer，获取到新的state，并赋值给currentState
    } finally {
      isDispatching = false // 完成之后在finally里将isDispatching再改为false，允许后续的action进来触发reducer操作
    }
    // 更新监听函数数组
    const listeners = (currentListeners = nextListeners)
    // 依次执行监听函数数组中的监听函数，一一通知订阅者做数据更新，不传入任何参数
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  // 这个函数是用来替换reducer的
  function replaceReducer(nextReducer) {
      // 判断所传reducer是否为函数
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    // 通过条件判断之后，将nextReducer赋值给currentReducer，以达到替换reducer效果，并触发state更新操作。
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE }) // 触发相应的action，更新state
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  // 这块代码我们不需要掌握
  // 这个observable函数，并没有调用，即便暴露出来我们也没办法使用
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  // 为啥要有这么一行代码？
  // 原因很简单，假设我们没有这样代码，此时currentState就是undefined的，也就我说我们没有默认值了
  // 当我们dispatch一个action的时候，就无法在currentState基础上做更新。
  // 所以需要拿到所有reducer默认的state，这样后续的dispatch一个action的时候，才可以更新我们的state。
  dispatch({ type: ActionTypes.INIT })
  // 返回了如下5个方法，其中前3个最为常用
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}