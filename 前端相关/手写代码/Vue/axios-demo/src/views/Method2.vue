<template>
  <div class="home">
    <h1>拦截器</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'method',
  components: {
  },
  created() {
      // 拦截器：在请求或响应被处理前进行拦截
      // 分为请求拦截器和响应拦截器
      // 请求拦截器
      axios.interceptors.request.use(config => {
          // 在发送请求前做些事情
          return config;
      }, err => {
          // 在请求错误的时候做些事情
          // 请求没有到达服务器
          return Promise.reject(err);
      });
      // 响应拦截器
      axios.interceptors.response.use(res => {
          // 请求成功对响应数据做处理
          return res;
      }, err => {
          // 在响应错误的时候做些事情
          return Promise.reject(err);
      });
      // 取消拦截器(了解)
      const customInterceptors = axios.interceptors.request.use(config => {
          config.headers = {
              auth: true
          };
          return config;
      });
      // 对上述定义的拦截器进行取消
      axios.interceptors.request.eject(customInterceptors);
      // 例子：登录状态: token
      let instance = axios.create({});
      // 在实际开发中一般是个实例设置拦截器，如果直接给给axios设置的话会造成污染，因为axios是全局的。
      // 可以用instance来访问需要登录的接口
      instance.interceptors.request.use(config => {
          config.headers.token = 'token';
          return config;
      });
      // 可以用instance2来访问不需要登录的接口
      let instance2 = axios.create({});
      // 实例开发举例：在请求前打开弹窗，请求后取消弹窗
      const instance_phone = axios.create({});
      instance_phone.interceptors.request.use(confirm => {
          $('#dialog').show();
          return config;
      });
      instance_phone.interceptors.response.use(res => {
          $('#dialog').hide();
          return res;
      });
  }
}
</script>
