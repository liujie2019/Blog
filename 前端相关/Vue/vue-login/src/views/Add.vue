<template>
  <div>
    <h3>添加留言</h3>
    <form>
      <label for="title">
        <span>标题</span>
        <input type="text" name="title" v-model="title" />
      </label>
      <label for="content">
        <span>内容</span>
        <input type="text" name="content" v-model="content" />
      </label>
      <button type="button" @click="add">
        添加
      </button>
    </form>
  </div>
</template>

<script>
  import store from '@/store';
  import {formatDate} from '../lib/util';
  export default {
    name: 'add',
    store,
    data() {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      add() {
        const date = formatDate(new Date());
        if (!this.title || !this.content) {
          alert('信息不完整');
        }
        else {
          store.commit('addItem', {
            title: this.title,
            content: this.content,
            date
          });
          this.content = '';
          this.title = '';
          this.$router.push('/home/list');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
