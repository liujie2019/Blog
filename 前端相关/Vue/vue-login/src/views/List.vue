<template>
  <div>
    <p v-if="pageList.length === 0">
      还没有任何内容
    </p>
    <ul>
      <li
        v-for="(item, index) in pageList"
        :key="index"
      >
        {{ item.title + '--' + item.content + '--' + item.date }}
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '@/store';
  export default {
    name: 'list',
    store,
    data () {
      return {};
    },
    computed: {
      pageList() {
        return store.state.list;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
