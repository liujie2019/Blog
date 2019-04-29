<template>
  <div>
      <h1>TodoList</h1>
      <div>
          <input type="text" v-model="inputValue">
          <button @click="addItem">提交</button>
          <ul>
              <todo-item
                v-for="(item, index) of list"
                :key="index"
                :index="index"
                :content="item"
                @delete="deleteTodoItem"
              >
              </todo-item>
          </ul>
      </div>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem';
export default {
    components: {
        'todo-item': TodoItem
    },
    data() {
        return {
            inputValue: '',
            list: []
        }
    },
    methods: {
        addItem() {
            this.list.push(this.inputValue);
            this.inputValue = '';
        },
        deleteTodoItem(index) {
            this.list.splice(index, 1);
        }
    }
}
</script>

<style>

</style>
