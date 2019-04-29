<template>
  <div class="container">
    我是info页面
    <button @click="add">增加</button>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'Info',
  store,
  mounted() {
    window.vue = this
  },
  methods: {
    add: function() {
      store.commit('increase')
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">

</style>
