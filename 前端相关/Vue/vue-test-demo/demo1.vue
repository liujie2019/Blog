<template>
  <div class="container">
    hello vue
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="['li-item', {'active': index === current}]"
        @click="selectItem(index)"
      >
        {{item}}
      </li>
    </ul>
    <h1>选中的item：</h1>
    <ul>
      <li
        v-for="(item, index) in selectedList"
        :key="index"
        :class="['li-item']"
      >
        {{item}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      selectedList: [],
      current: undefined
    }
  },
  methods: {
    selectItem: function(index) {
      this.current = index;
      this.selectedList.push(this.list[index]);
    }
  }
}
</script>
<style scoped>
.li-item {
  cursor: pointer;
}
.active {
  background-color: green;
}
</style>
