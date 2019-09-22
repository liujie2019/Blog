import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from './router';

let loading; // 定义loading变量
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
  });
}
function endLoading() {
  loading.close();
}

// 请求拦截器 设置统一的header
axios.interceptors.request.use((config) => {
  // 加载
  startLoading();
  if (localStorage.eleToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = localStorage.eleToken;
  }
  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use();
export default axios;
