import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { storeShape, subscriptionShape } from '../utils/PropTypes'
import warning from '../utils/warning'

let didWarnAboutReceivingStore = false
// warnAboutReceivingStore是一个为了方便开发者升级的警示方法，并没有任何实际作用
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return
  }
  didWarnAboutReceivingStore = true

  warning(
    '<Provider> does not support changing `store` on the fly. ' +
    'It is most likely that you see this error because you updated to ' +
    'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +
    'automatically. See https://github.com/reduxjs/react-redux/releases/' +
    'tag/v2.0.0 for the migration instructions.'
  )
}

export function createProvider(storeKey = 'store') { // storeKey的默认值为store
    // 简单的字符串拼接，最后值为storeSubscription
    const subscriptionKey = `${storeKey}Subscription`
    // Provider是整个应用最外层的React组件，接受一个store作为props
    class Provider extends Component {
        // react-redux使用context来实现父级对所有的子级传递数据 但是这个context已经在16.3版本有了新的方法 这里就不多讲了
        // 该方法中定义了自动沿组件传递的特殊props
        // 首先，如果想让子组件获取到父组件的数据，那么肯定得有一个入口，这个getChildContext就是子组件固定的入口，它会去判断自身的ContextTypes是否有数据
        // 如果有的话，就会直接调用父级的这个getChildContext来返回对应的数据
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store; // 拿到props中的store，并挂载在当前实例的store属性上
        }
        // render方法中，渲染了其子级元素，使整个应用成为Provider的子组件
        render() {
          return Children.only(this.props.children) // 只允许渲染一个
        }
    }
    // process是Node应用自带的一个全局变量，可以获取当前进程的若干信息
    // 在大多数前端库中，经常会使用process.env.NODE_ENV这个环境变量来判断当前是开发环境还是生产环境
    if (process.env.NODE_ENV !== 'production') { // 开发环境
        // 在开发环境下，Provider中额外定义了一个componentWillReceiveProps的生命周期
        // 在这个生命周期中，如果发现父组件的props中的store发生了变化，则执行warnAboutReceivingStore，抛出错误提示
      Provider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this[storeKey] !== nextProps.store) {
          warnAboutReceivingStore()
        }
      }
    }
    // 定义Provider的props数据类型
    Provider.propTypes = {
        store: storeShape.isRequired,
        children: PropTypes.element.isRequired,
    }
    // 定义要传递给子组件的数据类型
    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    return Provider
}

export default createProvider()
