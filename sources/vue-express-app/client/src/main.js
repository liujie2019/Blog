import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './http';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
Vue.use(ElementUI);
Vue.use(dayjs);
Vue.prototype.$axios = axios;

// 注册全局过滤器
Vue.filter('formatTime', (value, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) return '';
  return dayjs(value).format(pattern);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
