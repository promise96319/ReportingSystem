<template>
  <div class="forget-password">
    <img :src="logoImg" alt />
    <div class="label">Forget Password</div>
    <el-input
      v-model="email"
      placeholder="Please enter your email"
      prefix-icon="el-icon-message"
      clearable
    ></el-input>
    <el-button type="primary" @click="login">Reset Password</el-button>
    <div class="login">
      <el-button
        type="text"
        size="mini"
        @click="$router.push({ name: 'Login' })"
        >Login</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoImg: require('@/assets/logo.png'),
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$message.success('登录成功')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.forget-password {
  width: 320px;
  height: 320px;
  margin: 100px auto 0;
  text-align: center;
  img {
    margin-bottom: 64px;
  }
  .label {
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    margin-top: 10px;
    color: #606166;
  }
  .el-input {
    margin-top: 10px;
  }
  .el-button {
    margin-top: 20px;
    width: 100%;
  }
  .login {
    text-align: right;
    .el-button {
      margin-top: 10px;
      width: 80px;
      text-align: right;
    }
  }
}
</style>
