<template>
  <div class="container">
    <h3>当前最新的count值为：{{$store.state.count}}</h3>
    <button @click="addCount">+1</button>
    <button @click="addCount2">+N</button>
    <button @click="addAsync">Async +1</button>
    <button @click="addAsync2">Async +N</button>
    <h3>{{$store.getters.showCount}}</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  methods: {
    addCount () {
      // 不推荐直接修改store
      // this.$store.state.count++
      // 推荐通过触发mutations的方式来修改store
      this.$store.commit('add')
    },
    addCount2 () {
      // 给mutations传参数
      // commit的作用就是调用某个mutation函数
      this.$store.commit('addN', 3)
    },
    // 异步 +1
    addAsync () {
      // 这里的dispatch函数，专门用来触发action
      this.$store.dispatch('addAsync')
    },
    addAsync2 () {
      // 在触发action时携带参数
      this.$store.dispatch('addAsyncN', 3)
    }
  }
}
</script>

<style scoped lang="scss"></style>
