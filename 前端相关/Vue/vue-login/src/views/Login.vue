<template>
  <div>
    <h3>{{ title }}</h3>
    <form action class="login" v-if="isLogin">
      <label for="user">
        <span>用户名：</span>
        <input type="text" name="userName" v-model="userName" />
      </label>
      <label for="password">
        <span>密码：</span>
        <input type="password" name="password" v-model="password" />
      </label>
      <div>
        <button type="button" @click="login">登录</button>
        <button type="button" @click="register">注册</button>
      </div>
    </form>
    <form action class="register" v-else>
      <label for="user">
        <span>用户名：</span>
        <input type="text" name="userName" v-model="userName" />
      </label>
      <label for="password">
        <span>密码：</span>
        <input type="password" name="password" v-model="password" />
      </label>
      <label for="password">
        <span>再次输入密码：</span>
        <input type="password" name="password" v-model="repeatPassword" />
      </label>
      <div>
        <button type="button" @click="registerUser">确定</button>
        <button type="button" @click="cancel">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '欢迎登录',
        userName: '',
        password: '',
        repeatPassword: '',
        isLogin: true
      };
    },
    methods: {
      login() {
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');
        if (!this.userName || !this.password) {
          alert('用户名密码填写不完整');
        }
        else if (this.userName !== userName || this.password !== password) {
          alert('用户名密码不匹配');
        }
        else {
          this.userName = '';
          this.password = '';
          this.$router.push('/home');
        }
      },
      register() {
        this.isLogin = false;
        this.title = '欢迎注册';
        this.userName = '';
        this.password = '';
      },
      registerUser() {
        
      },
      cancel() {
        this.isLogin = true;
        this.title = '欢迎登录';
      }
    }
  }
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
</style>
