import compose from './compose'

export default function applyMiddleware(...middlewares) { // middlewares是一个中间件数组
    // 返回值是一个返回函数的函数(其实就是一个enhancer)
    // 外层函数的参数是createStore函数
    // 内层函数其实是一个加强版的createStore函数
    return createStore => (...args) => {
        // 这里是内层函数的函数体
        const store = createStore(...args) // 创建一个store
        let dispatch = () => { // 定义一个临时的dispatch，如果在中间件构造过程中调用dispatch，会抛出错误信息
            throw new Error(
                `Dispatching while constructing your middleware is not allowed. ` +
                `Other middleware would not be applied to this dispatch.`
            )
        }
        // 定义middlewareAPI，包含两个方法，一个是getState，另一个是dispatch
        // 传给middleware的参数
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        // 执行所有的middleware
        // middlewares调用Array.prototype.map进行改造，存放在chain
        const chain = middlewares.map(middleware => middleware(middlewareAPI))
        // 用compose整合chain数组，并赋值给dispatch，重新改写dispatch
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch // 将新的dispatch替换原先的store.dispatch
        }
    }
}
