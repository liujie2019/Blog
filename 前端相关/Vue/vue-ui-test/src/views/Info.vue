<template>
  <div>
    hello info page
    <button v-on:click="count">计数</button>
  </div>
</template>

<script>
  import store from '@/store';
  export default {
    name: 'info',
    methods: {
      count: () => {
        // console.log('技术了');
        store.commit('increase');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
