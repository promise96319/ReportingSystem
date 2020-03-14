<template>
  <div class="login">
    <img :src="logoImg" alt="" />
    <el-input
      v-model="email"
      placeholder="Please enter your email"
      prefix-icon="el-icon-message"
      clearable
    ></el-input>
    <el-input
      v-model="password"
      placeholder="Please enter your password"
      show-password
      prefix-icon="el-icon-lock"
    ></el-input>
    <el-row class="forget-password">
      <el-button type="text" size="mini" @click="$router.push({ name: 'ForgetPassword' })">Forget Password?</el-button>
    </el-row>
    <el-button type="primary" @click="login">Login</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoImg: require("@/assets/logo.png"),
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$message.success('登录成功')
      this.$router.push('/')
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 320px;
  height: 320px;
  margin: 100px auto 0;
  text-align: center;
  img {
    margin-bottom: 64px;
  }
  .el-input {
    margin-top: 20px;
  }
  .el-button {
    margin-top: 20px;
    width: 100%;
  }
  .forget-password {
    text-align: right;
    .el-button {
      margin-top: 6px;
      width: 100px;
    }
  }
}
</style>
