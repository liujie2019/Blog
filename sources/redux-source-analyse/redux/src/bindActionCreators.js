function bindActionCreator(actionCreator, dispatch) {
    return function() {
        // actionCreators必须返回一个action
        return dispatch(actionCreator.apply(this, arguments))
    }
}

// bindActionCreators一般需要结合react-redux一起使用
export default function bindActionCreators(actionCreators, dispatch) {
    // 当actionCreators是函数时
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    // 判断actionCreators是否为null或者非对象
    // 提示开发者actionCreators类型错误，应该是一个非空对象或者是函数。
    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error(
        `bindActionCreators expected an object or a function, instead received ${
            actionCreators === null ? 'null' : typeof actionCreators
        }. ` +
            `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
        )
    }
    // actionCreators是对象的情况
    const keys = Object.keys(actionCreators)
    const boundActionCreators = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const actionCreator = actionCreators[key]
        if (typeof actionCreator === 'function') {
            // boundActionCreators中的每一个key都对应dispatch(actionCreator.apply(this, arguments))
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return boundActionCreators
}
