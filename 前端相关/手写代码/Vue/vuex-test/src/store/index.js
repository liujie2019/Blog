import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  // 只有mutations中定义的函数，才有权限修改state中的数据
  mutations: {
    add (state) {
      // 更改状态
      state.count++
      // mutations 中不能写异步代码，会导致Vue调试工具中的state变化不同步
      // setTimeout(() => {
      //   state.count++
      // }, 1000)
    },
    addN (state, step) {
      state.count += step
    },
    sub (state) {
      state.count--
    },
    subN (state, step) {
      state.count -= step
    }
  },
  actions: {
    addAsync (context) {
      setTimeout(() => {
        // 在actions中，不能直接修改state中的数据
        // 必须通过context.commit触发某个mutation才行
        context.commit('add')
      }, 1000)
    },
    addAsyncN (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsync (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subAsyncN (context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  getters: {
    showCount (state) {
      return `当前最新的数量为【${state.count}】`
    }
  }
})
