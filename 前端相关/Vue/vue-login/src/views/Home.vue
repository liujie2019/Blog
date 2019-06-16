<template>
  <div>
    <ul class="footer">
      <li>
        <router-link to="/home/list">留言列表</router-link>
      </li>
      <li>
        <router-link to="/home/user">个人中心</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.footer li {
  flex: 1;
  font-size: 16px;
  text-align: center;
  border-top: 1px solid #42b983;
  a {
    color: #42b983;
    display: block;
    &.active {
      background-color: #42b983;
      color: #fff;
    }
  }
}
</style>
