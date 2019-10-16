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

// 响应拦截器 401 token过期处理
axios.interceptors.response.use((response) => {
  endLoading();
  return response;
}, (error) => {
  endLoading();
  // 错误提醒
  const { status, data } = error.response;
  Message.error(data);
  if (status === 401) {
    Message.error('token失效，请重新登录');
    // 清除token
    localStorage.removeItem('eleToken');
    // 跳转登录页面
    router.push('/login');
  }
  return Promise.reject(error);
});
export default axios;
