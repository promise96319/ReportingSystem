<template>
	<UserLayout>
    <el-row class="title">
			Please set your password
		</el-row>
    <el-input :value="email" disabled></el-input>
    <el-input
			v-model="password"
			placeholder="Please enter your password"
			prefix-icon="el-icon-key"
      show-password
			clearable
		></el-input>
		<el-input
			v-model="confirmPassword"
			placeholder="Please confirm your password"
			show-password
      clearable
			prefix-icon="el-icon-key"
		></el-input>
		<el-button type="primary" @click="resetPassword" :loading="isResetingPassword">Confirm</el-button>
		<div class="set-password">
			<!-- <UserInput 
			  type="password" 
				label="设定密码" 
				prefix-icon="key" 
				v-model.trim="password" 
				placeholder="密码必须至少8个字符，至少1个字母，1个数字"
				:error="passwordError"
				:verify-rule="verifyPassword">
			</UserInput>
			<UserInput 
			  type="password" 
				label="重复密码" 
				prefix-icon="key" 
				v-model.trim="confirmPassword" 
				placeholder="重复密码" 
				:error="confirmPasswordError"
				:verify-rule="verifyConfirmPassword">
			</UserInput> -->
		</div>
	</UserLayout>
</template>

<script>
import UserLayout from "@/components/UserLayout";
import api from '@/api'

export default {
	data() {
		return {
      email: '',
			password: '',
			confirmPassword: '',

			isResetingPassword: false,
		};
	},
	components: {
		UserLayout
	},
	created() {
    const token = this.$route.query.token
		if (!token) {
			this.$router.replace({ name: 'Login' })
		} else {
      this.checkToken(token)
    }
	},
	methods: {
    // 检验 token 是否有效
    async checkToken(token) {
      const res = await api.checkEmail(token)
      if (res.data.error_code === 0) {
        this.email = res.data.data.email
      } else {
        // token 无效，需要重新邀请
        this.$router.replace({ name: 'UserManagement' })
      }
    },
		async resetPassword() {
			if (this.password === '') {
				this.$message.error('Password is Empty')
				return false
			}

			if (this.password.length < 6) {
				this.$message.error('Password must be at last 6 character')
				return false
      }
      
      if (this.confirmPassword === '') {
				this.$message.error('Please confirm your password')
				return false
			}

			if (this.confirmPassword !== this.password) {
        this.$message.error('Password is not the same')
				return 
			}

      this.isResetingPassword = true
      const token = this.$route.query.token
			const res = await api.register(token, this.password)
			this.isResetingPassword = false

			if (res.data.error_code === 0) {
				this.$message.success('Register success!')
				this.$router.push('/')
			}
		}
	}
};
</script>

<style scoped lang="scss">
.title {
  text-align: left;
  color: #606266;
}
.el-input {
	margin-top: 20px;
}
.el-button {
	margin-top: 20px;
	width: 100%;
}
</style> 