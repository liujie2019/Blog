<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>
<script>
// 引入组件
import Header from './todos/header.vue'
import Footer from './todos/footer.jsx'
import Todo from './todos/todo.vue'
    export default {
        components: {
            Header,
            Footer,
            Todo
        },
        data() {
            return {
                text: 'hello vue！'
            }
        }
    }
</script>

<style lang="stylus" scoped>
#app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
}
</style>