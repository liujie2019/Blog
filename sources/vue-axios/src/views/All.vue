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
    axios.all(
      [
        axios.get('/data.json'),
        axios.get('/test.json')
      ]
    ).then(
      axios.spread((dataRes, testRes) => {
        console.log(dataRes);
        console.log(testRes);
      })
    )
  }
};
</script>
