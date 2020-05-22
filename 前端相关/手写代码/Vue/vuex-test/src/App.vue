<template>
  <div id="app">
    <my-Addition />
    -----------------------
    <my-Substraction />
  </div>
</template>
<script>
import Addition from './components/Addition'
import Substraction from './components/Subtraction'

export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    'my-Addition': Addition,
    'my-Substraction': Substraction
  }
}
</script>
