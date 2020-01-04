<template>
  <div class="home">
    <h1>axios常用请求方法</h1>
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
    //   axios.all([
    //       axios.get('/data.json'),
    //       axios.get('/test.json')
    //   ]).then(
    //       axios.spread((dataRes, testRes) => {
    //           console.log(dataRes);
    //           console.log(testRes);
    //       })
    //   );
      // axios实例
      let instance = axios.create({
          baseURL: 'http://localhost:8080', // 请求域名，基本地址
          timeout: 1000, // 请求超时时长
          url: '/data.json', // 请求路径
          method: 'get', // 请求方法
          headers: { // 设置请求头
              token: ''
          },
          params: {}, // 请求参数拼接在url
          data: {} // 请求参数放在请求体中
      });
      // baseURL会被拼接在/data.json前面
      instance.get('/data.json', data => {
          console.log(data);
      })
      // 1. axios全局配置
      axios.defaults.timeout = 1000;
      axios.defaults.baseURL = 'http://localhost:8080';
      // 2. axios实例配置
      let instance = axios.create();
      instance.defaults.timeout = 3000; // 这里不设置的话，实例默认使用全局中的配置
      instance.defaults.baseURL = 'http://localhost:8090';
      // 3. axios请求配置
      instance.get('/data.json', {
          timeout: 4000
      });
      // 实际开发
      // 有两种请求接口
      // http://localhost:8080
      // http://localhost:8081
      const instance = axios.create({
          baseURL: 'http://localhost:8080',
          timeout: 1000
      });
      const instance2 = axios.create({
          baseURL: 'http://localhost:8081',
          timeout: 3000
      });
      // baseURL，timeout，url，method，params
      instance.get('/dataList', {
          params: {
              id: 12
          }
      }).then(data => {
          console.log(data);
      });
      // baseURL，timeout: 5000，url，method
      instance2.get('/userList', {
          timeout: 5000 // 覆盖instance2中设置的timeout
      }).then(data => {
          console.log(data);
      });
  }
}
</script>
