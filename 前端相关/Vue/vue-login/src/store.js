import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    addItem (state, value) {
      state.list.push(value)
    }
  },
  actions: {

  }
})
