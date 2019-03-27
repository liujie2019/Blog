<template>
    <section class="real-app">
        <input
            autofocus="autofocus"
            placeholder="接下去要做什么？"
            class="add-input"
            @keyup.enter="addTodo"
            type="text"
        >
        <Item
            v-for="todo in filterdTodos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
        />
        <Tabs
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilter"
            @clear="clearAllCompleted"
        />
    </section>
</template>
<script>
import Item from './item.vue';
import Tabs from './tabs.vue';
let id = 0;
    export default {
        data() {
            return {
                todos: [],
                filter: 'All'
            }
        },
        components: {
            Item,
            Tabs
        },
        methods: {
            addTodo(e) {
                if(e.target.value === ''){
                    alert("请输入要做什么再添加!!!");
                    return;
                }
                // 每次都在数组第一项插入
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ''; //清空输入框内容
            },
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
            },
            toggleFilter(state) {
                this.filter = state;
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed);
            }
        },
        computed: {
            // 被过滤过的todos
            filterdTodos() {
                // 如果等于All，则返回全部的
                if (this.filter === 'All') {
                    return this.todos;
                }
                // 如果等于Completed，则completed为true
                const completed = this.filter === 'Completed';
                return this.todos.filter(todo => todo.completed === completed);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app{
        width 600px
        margin :0px  auto
        box-shadow :0px 0px 5px #666
    }
    .add-input{
        positon:relative;
        margin 0px
        width 100%
        font-size 24px
        font-family  inherit
        font-weight:inherit
        line-height 1.4rem
        border 0;
        outline none
        color inherit
        padding 6px
        border 1px solid #999
        box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
        box-sizing border-box
        font-smoothing:antialiased;
        padding 16px 16px 16px 60px
        border none
    }
</style>
