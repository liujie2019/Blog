import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        countIncrease(state, value) {
            state.count = value + 1
        }
    }
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
