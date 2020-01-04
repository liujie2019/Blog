import Vue from 'vue'
import App from './App.vue'
import router from './router'
import HttpClient from './service/http'

Vue.config.productionTip = false
// 将HttpClient挂载到Vue实例上，这样就可以直接在页面中使用，不需要每次都引入了
Vue.prototype.$HttpClient = HttpClient
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
