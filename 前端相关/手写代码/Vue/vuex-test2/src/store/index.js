import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    viewKey: 'all',
    inputValue: '',
    nextId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为 store 中的 inputValue 赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      const item = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(item)
      state.nextId++
      state.inputValue = ''
    },
    // 根据Id删除对应的列表项
    removeItem(state, id) {
      // 根据Id查找对应项的索引
      const index = state.list.findIndex(item => item.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    changeStatus(state, params) {
      const { id, status } = params
      const index = state.list.findIndex(item => item.id === id)
      if (index !== -1) {
        state.list[index].done = status
      }
    },
    cleanDone(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      // axios是异步请求，因此需要放入actions中
      axios.get('/list.json').then(({ data }) => {
        // 调用mutation来初始化数据
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的任务条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') { // 筛选出未完成的列表项
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})
