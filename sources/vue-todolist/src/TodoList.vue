<template>
    <div>
        <input v-model="inputValue" />
        <button @click="handleSubmit">提交</button>
        <ul>
            <todo-item
                v-for="(item, index) of todoList"
                :key="index"
                :content="item"
                :index="index"
                @delete="handleDelete"
            >
                {{item}}
            </todo-item>
        </ul>
    </div>
</template>
<script>
import TodoItem from './components/TodoItem'
export default {
    components: {
        'todo-item': TodoItem
    },
    data () {
        return {
            inputValue: '',
            todoList: []
        }
    },
    methods: {
        handleSubmit() {
            this.todoList.push(this.inputValue)
            this.inputValue = ''
        },
        handleDelete(index) {
            this.todoList.splice(index, 1)
        }
    }
}
</script>

<style>

</style>
