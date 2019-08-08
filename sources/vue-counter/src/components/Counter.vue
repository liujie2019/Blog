<template>
  <div class="container">
    <h2> Clicked: {{count}} times, count is {{evenOrOdd}}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  components: {},
  // 在组件中通过计算属性获得Vuex中对应属性的状态值
  // computed: mapGetters([
  //   'evenOrOdd'
  // ]),
  // computed: {
  //   evenOrOdd() {
  //     return this.$store.state.count % 2 === 0 ? '偶数' : '奇数'
  //   }
  // },
  computed: mapState({
    count: state => state.count,
    evenOrOdd(state) {
      return state.count % 2 === 0 ? '偶数' : '奇数'
    }
  }),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementAsync',
    'incrementIfOdd'
  ])
}
</script>

<style scoped lang="scss">

</style>
