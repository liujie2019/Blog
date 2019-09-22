<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理系统</span>
      </div>
      <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
            <p>还没有账号？点击<router-link to='/register'>注册</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {}
    }
  },
  components: {

  },
  methods: {
    submitForm(formName) {

    }
  }
}
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
