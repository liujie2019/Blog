<template>
  <div class="home">
    <h1>取消请求</h1>
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
      // 取消正在进行的http请求
      let source = axios.CancelToken.source();
      axios.get('/data.json', {
          CancelToken: source.token
      }).then(res => {
          console.log(res);
      }).catch(err => {
          console.log(err);
      });
      // 取消请求(message可选)
      source.cancel('cancel get data.json request');
  }
}
</script>
