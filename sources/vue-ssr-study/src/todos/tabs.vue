<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <span
            v-for="state in states"
            :key="state"
            :class="[state, filter === state ? 'actived' : '']"
            @click="toggleFilter(state)"
            >{{state}}</span>
        </span>
        <span class="clear" @click="clearAllCompleted()">
            Clear Completed
        </span>
    </div>
</template>
<script>
    export default {
        props: {
            filter: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true // 必须要传
            }
        },
        data() {
          return {
              states:['All', "Active", "Completed"]
          }
        },
        methods: {
            toggleFilter(state) {
                this.$emit('toggle', state);
            },
            clearAllCompleted() {
                this.$emit('clear'); // 事件机制
            }
        },
        computed: {
            unFinishedTodoLength() { // 如果没有被选中
                return this.todos.filter(todo => !todo.completed).length
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .helper{
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing:antialiased;
    }
    .left,.clear,.tabs{
        padding 0px 10px
        box-sizing border-box
    }
    .left,.clear{
        width 150px
    }
    .left{
        text-align left
    }
    .clear {
        text-align:right
        cursor pointer
    }
    .tabs{
        width 200px
        display flex
        justify-content space-around
        *{
            display inline-block
            padding 0px 10px
            cursor pointer
            border 1px solid rgba(175,47,47,0)
            &.actived{
                border-color rgba(175,47,47,0.4)
                border-radius 5px
            }
        }
    }
</style>
