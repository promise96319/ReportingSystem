<template>
  <UserLayout>
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
    <!-- <el-row class="forget-password">
			<el-button
				type="text"
				size="mini"
				@click="$router.push({ name: 'ForgetPassword' })"
			>Forget Password?</el-button>
		</el-row> -->
    <el-button type="primary" :loading="isLogining" @click="login"
      >Login</el-button
    >
  </UserLayout>
</template>

<script>
import UserLayout from '@/components/UserLayout'
import api from '@/api'
import { CHANGE_USER } from '@/store/modules/user'

export default {
  components: {
    UserLayout
  },
  data() {
    return {
      email: '',
      password: '',
      isLogining: false
    }
  },
  methods: {
    async login() {
      if (this.email === '') {
        return this.$message.error('邮箱不能为空')
      }
      if (this.password === '') {
        return this.$message.error('密码不能为空')
      }
      if (
        !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
          this.email
        )
      ) {
        return this.$message.error('邮箱格式错误')
      }

      this.isLogining = true
      const res = await api.login(this.email, this.password)
      this.isLogining = false
      if (res.data.error_code === 0) {
        this.$store.commit(CHANGE_USER, res.data.data)
        this.$message.success('登录成功')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>
