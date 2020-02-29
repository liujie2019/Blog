<template>
  <div id="app">
    <h1>count：{{this.$store.state.count}}</h1>
    <h2>count：{{count}}</h2>
    <button @click="countIncrease">自增</button>
  </div>
</template>
<script>
export default {
    name: 'app',
    computed: {
        count() {
            return this.$store.state.count;
        }
    },
    methods: {
        countIncrease() {
            let value = 100;
            // commit的第一个参数是mutations的名称
            this.$store.commit('countIncrease', value)
        }
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
