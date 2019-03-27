import React, { Component } from 'react'
import PropTypes from 'prop-types' // 静态类型检查
import { ReactReduxContext } from './Context'

class Provider extends Component {
  constructor(props) {
    super(props)

    const { store } = props

    this.state = {
      storeState: store.getState(),
      store
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.subscribe() // 组件第一次加载完成后执行订阅函数
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe() // 组件卸载完成后，取消相关订阅

    this._isMounted = false
  }

  componentDidUpdate(prevProps) {
      // 比较新旧store是否相同，如果相同则跳过
    if (this.props.store !== prevProps.store) {
        // 如果不相同，则取消之前的订阅
      if (this.unsubscribe) this.unsubscribe()
        // 重新发起订阅，因为store变化了
      this.subscribe()
    }
  }

  subscribe() {
    const { store } = this.props
    // 调用store.subscribe方法订阅store的变化
    this.unsubscribe = store.subscribe(() => {
      const newStoreState = store.getState() // 当store发生变化时，调用store.getState方法获取到新的state

      if (!this._isMounted) { // 组件未加载成功之前直接return
        return
      }

      this.setState(providerState => {
        // 比较新旧state是否相同，相同则跳过没有必须的state更新
        if (providerState.storeState === newStoreState) {
          return null
        }

        return { storeState: newStoreState }
      })
    })

    // Actions might have been dispatched between render and mount - handle those
    // 处理组件在渲染和加载情况下，action被触发的情况
    const postMountStoreState = store.getState()
    if (postMountStoreState !== this.state.storeState) {
      this.setState({ storeState: postMountStoreState })
    }
  }

  render() {
    const Context = this.props.context || ReactReduxContext

    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

// 定义Provider的props相关数据类型
Provider.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }),
  context: PropTypes.object,
  children: PropTypes.any
}

export default Provider
