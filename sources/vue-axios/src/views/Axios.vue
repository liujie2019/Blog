<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
    // 写法一
    axios.get('/test.json', {
      params: {
        id: 12
      }
    }).then(res => {
        console.log(res);
      })
    // 写法二
    axios({
      method: 'get',
      url: '/test.json',
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res);
    });
    // post
    // form-data 表单提交-用于文件和图片上传
    // application/json
    let data = {
      age: 12,
      name: 'lisi'
    };
    axios.post('/post', data).then(res => {
      console.log(res);
    });
    axios({
      method: 'post',
      url: '/post',
      data
    }).then(res => {
      console.log(res);
    })
    // form-data
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    axios.post('/post', formData).then(res => {
      console.log(res);
    });
    // put
    axios.put('/put', data).then(res => {
      console.log(res);
    });
    // patch
    axios.patch('/patch', data).then(res => {
      console.log(res);
    });
    // delete
    axios.delete('/delete', {
      params: {
        id: 23
      }
    }).then(res => {
      console.log(res);
    });
    axios.delete('/delete', {
      data: {
        id: 23
      }
    }).then(res => {
      console.log(res);
    });
    axios({
      method: 'delete',
      url: '/delete',
      data: {
        id: 23
      }
    }).then(res => {
      console.log(res);
    });
  }
};
</script>
