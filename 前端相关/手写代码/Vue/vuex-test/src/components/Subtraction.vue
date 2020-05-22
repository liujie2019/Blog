<template>
  <div class="container">
    <h3>当前最新的count值为：{{count}}</h3>
    <button @click="sub">-1</button>
    <button @click="subN(3)">-N</button>
    <button @click="subAsync">Async -1</button>
    <button @click="subAsyncN(3)">Async -N</button>
    <h3>{{showCount}}</h3>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showCount'])
  },
  methods: {
    // 将Mmutations函数映射为当前组件的methods方法
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subAsyncN'])
    // subCount () {
    //   // 映射成功后这里就可以直接调用了
    //   this.sub()
    // },
    // subCount2 () {
    //   this.subN(2) // 直接给mutation传递参数即可
    // }
  },
  components: {}
}
</script>

<style scoped lang="scss"></style>
