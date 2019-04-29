<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{num}}</h1>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'about',
  store,
  data() {
    return {
      num: store.state.count
    }
  }
}
</script>
