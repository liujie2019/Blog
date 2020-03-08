<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <p v-for="child in childList" v-if="isShow">{{child.name}}</p> -->
    <template v-if="isShow">
      <p v-for="child in childList" :key="child">{{child.name}}</p>
    </template>
  </div>
</template>
<script>
export default {
  name: 'about',
  data() {
    return {
      childList: [
        {name: 'lisi'},
        {name: 'wangwu'}
      ]
    }
  },
  computed: {
    isShow() {
      return this.childList && this.childList.length > 0
    }
  },
  mounted() {
    console.log(this.$options.render);
  }
}
</script>
