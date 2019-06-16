<template>
  <div>
    <h1>欢迎来到个人中心</h1>
    <img src="../assets/logo.png" />
    <div>
      <button @click="add">添加留言</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    methods: {
      add() {
        this.$router.push('/add');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
