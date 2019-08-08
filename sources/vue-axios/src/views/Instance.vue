<template>
  <div class="home">
  </div>
</template>

<script>
/**
 *
 */
import axios from 'axios';
export default {
  name: 'axios',
  components: {
  },
  created() {
    axios.defaults.headers.common['Authorization'] = 'test';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // 请求拦截
    axios.interceptors.request.use(function (config) {
      config.headers['X-test'] = 'hello';
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
      // response.data = [];
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
    const instance = axios.create({
      baseURL: 'http://localhost:8082',
      timeout: 1000,
      headers: {'X-Custom-Header': 'custom'}
    });
    instance.defaults.timeout = 3000;
    // instance.get('/data.json', {
    //   timeout: 5000
    // }).then(res => {
    //   console.log(res);
    // })
    axios.get('/data.json', {
      timeout: 5000
    }).then(res => {
      console.log(res);
    })
    // instance.post('/data.json', null, {
    //   timeout: 5000
    // }).then(res => {
    //   console.log(res);
    // })
  }
};
</script>
