<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
      // http://localhost:8080/data.json?id=12&name=lisi
      axios.get('/data.json', {
          params: {
              id: 12,
              name: 'lisi'
          }
      }).then(data => {
          console.log(data);
      })
      axios({
          method: 'GET',
          url: '/data.json',
          params: {
              id: 12,
              name: 'lisi'
          }
      }).then(data => {
          console.log(data);
      });
      // post
      const data = {
          id: 12,
          name: 'lisi'
      };
      axios.post('/create', data).then(data => {
          console.log(data);
      });
      axios({
          method: 'post',
          url: '/create',
          data
      }).then(data => {
          console.log(data);
      });
      // formData格式的post请求
      const formData = new FormData();
      for (const key in data) {
          if (data.hasOwnProperty(key)) {
              formData.append(key, data[key]);
          }
      }
      axios.post('/create', formData).then(data => {
          console.log(data);
      });
      // put请求
      axios.put('/update', data).then(data => {
          console.log(data);
      })
      // patch请求
      axios.patch('/update', data).then(data => {
          console.log(data);
      })
      // delete请求
      // http://localhost:8080/remove?id=12
      axios.delete('/remove', {
          params: { // params是以查询字符串的形式拼接参数，请求头中没有Content-Type
              id: 12
          }
      }).then(data => {
          console.log(data);
      })
      axios.delete('/remove', {
          // Content-Type: application/json;charset=UTF-8
          data: {
              id: 12
          }
      }).then(data => {
          console.log(data);
      })
  }
}
</script>
