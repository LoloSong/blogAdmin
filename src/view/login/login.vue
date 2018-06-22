<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
      <h3 class="title">后台管理</h3>
      <el-form-item prop="username">
        <el-input placeholder="username" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" :loading="loading" @click="login">Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const OK = 0
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
        password: [{required: true, trigger: 'blur', message: '密码不能为空'}]
      },
      loading: false
    }
  },
  created () {
    if (this.$store.getters.token) {
      this.$store.dispatch('GetInfo')
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          let json = await this.$store.dispatch('Login', this.loginForm)
          if (json.code === OK) {
            this.loading = false
            this.$router.push({path: '/'})
          } else {
            this.loading = false
            this.$message.error(json.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .submit{
      width: 100%;
    }
  }
}
</style>
