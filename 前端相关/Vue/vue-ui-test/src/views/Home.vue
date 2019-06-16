<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ count }}
  </div>
</template>

<script>
// @ is an alias to /src
// @代表src目录
import HelloWorld from '@/components/HelloWorld.vue';
import store from '@/store';
export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      count: store.state.count
    }
  }
};
</script>
