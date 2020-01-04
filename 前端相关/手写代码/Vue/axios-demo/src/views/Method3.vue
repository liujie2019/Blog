<template>
  <div class="home">
    <h1>错误处理</h1>
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
      // 错误处理：在请求错误时进行的处理
      axios.interceptors.request.use(config => {
          return config;
      }, err => {
          return Promise.reject(err);
      });
      axios.interceptors.response.use(res => {
          return res;
      }, err => {
          // 请求和响应拦截器中的错误都会被catch捕获到
          return Promise.reject(err);
      });
      axios.get('/data2.json').then(res => {
          console.log(res);
      }).catch(err => {
          console.log(err);
      });
      // 例子：在实际开发过程中，一般添加统一的错误处理
      const instance = axios.create({});
      instance.interceptors.request.use(config => {
          return config;
      }, err => {
          // 客户端请求错误，4xx
          $('#errorDialog').show();
          setTimeout(() => {
              $('#errorDialog').hide();
          }, 3000);
          return Promise.reject(err);
      });
      instance.interceptors.response.use(config => {
          return config;
      }, err => {
          // 服务端响应错误，5xx
          $('#errorDialog').show();
          setTimeout(() => {
              $('#errorDialog').hide();
          }, 3000);
          return Promise.reject(err);
      });
  }
}
</script>
