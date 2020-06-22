<template>
	<div class="user-management">
		<SubHeader title="User management">
			<el-button
				type="primary"
				class="invite-button"
				@click="inviteMember"
			>
				<svg-icon icon-class="member"></svg-icon>Invite new member
			</el-button>
		</SubHeader>
		<div class="main">
			<div class="container">
				<el-table
					:data="usersData"
					style="width: 100%"
					border
					v-loading="isGettingUserData"
				>
					<el-table-column
						prop="id"
						label="User ID"
						align="center"
						header-align="center"
					></el-table-column>
					<el-table-column
						prop="username"
						label="User name"
						align="center"
						header-align="center"
					></el-table-column>
					<el-table-column
						prop="email"
						label="Email address"
						align="center"
						header-align="center"
					></el-table-column>
					<el-table-column
						label="Role"
						align="center"
						header-align="center"
					>
						<template slot-scope="scope">
							<span
								v-if="scope.row.is_super_admin"
								class="admin"
							>
								<svg-icon icon-class="admin"></svg-icon>Administrator
							</span>
							<div
								v-else
								@click="showEditRoleDialog(scope.row)"
								class="edit-role"
							>
								<span>{{ scope.row.role }}</span>
								<i class="el-icon-edit-outline"></i>
							</div>
						</template>
					</el-table-column>

					<el-table-column
						label="Action"
						align="center"
						header-align="center"
						width="350"
					>
						<template slot-scope="scope">
							<span
								v-if="scope.row.is_super_admin"
								class="admin"
							>
								<!-- <svg-icon icon-class="admin"></svg-icon>Administrator -->
							</span>
							<div v-else>
								<el-button
									type="primary"
									size="medium"
									@click="showEditPasswordDialog(scope.row)"
								>
									<i class="el-icon-edit-outline"></i>
									Edit
								</el-button>

								<el-button
									type="danger"
									size="medium"
									@click="deleteMember(scope.row)"
								>
									<i class="el-icon-delete"></i>
									Delete
								</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<el-dialog
			title="Edit user data"
			:visible.sync="isDialogShow"
			width="400px"
		>
			<el-form
				:label-width="isEditPasswordShow ? '130px' : '60px'"
				label-position="left"
			>
				<el-form-item label="Email">{{ tmpUserData.email }}</el-form-item>

				<el-form-item
					v-if="isEditPasswordShow"
					label="New password"
				>
					<el-input
						v-model="password"
						placeholder="Please enter new password"
						show-password
						clearable
					></el-input>
				</el-form-item>
				<el-form-item
					v-if="isEditPasswordShow"
					label="Confirm password"
				>
					<el-input
						v-model="confirmPassword"
						placeholder="Please confirm new password"
						show-password
						clearable
					></el-input>
				</el-form-item>

				<el-form-item
					v-if="isEditRoleShow"
					label="Role"
					class="role"
				>
					<el-select v-model="role">
						<el-option
							v-for="item in [ROLE_ADMIN, ROLE_WRITE, ROLE_READ]"
							:label="item"
							:value="item"
							:key="item"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button
						type="primary"
						@click="confirmEdit"
					>Confirm</el-button>
					<el-button @click="cancelEdit">Cancel</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import api from '@/api'
import { ROLE_ADMIN, ROLE_WRITE, ROLE_READ } from '@/constant/role'

export default {
	data() {
		return {
			ROLE_ADMIN,
			ROLE_WRITE,
			ROLE_READ,

			usersData: [],
			isGettingUserData: false,

			// 当前是在编辑password?
			isEditPasswordShow: false,
			// 当前是在编辑role?
			isEditRoleShow: false,
			isDialogShow: false,

			tmpUserData: {},
			password: '',
			confirmPassword: '',
			role: ''
		}
	},
	components: {
		SubHeader
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany
		}
	},
	created() {
		this.getUserList()
	},
	methods: {
		async getUserList() {
			if (!this.currentCompany || !this.currentCompany.id) {
				return
			}

			this.isGettingUserData = true
			const res = await api.getUserList(this.currentCompany.id)
			this.isGettingUserData = false
			if (res.data.error_code === 0) {
				this.usersData = res.data.data
			}
		},
		inviteMember() {
			this.$msgbox
				.prompt('Please enter the email', 'Invite new member', {
					confirmButtonText: 'Confirm',
					cancelButtonText: 'Cancel',
					inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
					inputErrorMessage: 'Incorrect mailbox format'
				})
				.then(async ({ value }) => {
					const res = await api.inviteUser(this.currentCompany.id, value)
					if (res.data.error_code === 0) {
						this.$message({
							type: 'success',
							message:
								'The invitation has been sent to the mailbox, please check it in time'
						})
						this.getUserList()
					}
				})
				.catch(() => {})
		},
		deleteMember(user) {
			this.$msgbox
				.confirm(
					`Would you want to remove this user
      (${user.email})?`,
					'Notice',
					{
						confirmButtonText: 'Confirm',
						cancelButtonText: 'Cancel',
						type: 'warning',
						center: true
					}
				)
				.then(async () => {
					const res = await api.deleteUser(this.currentCompany.id, user.id)
					if (res.data.error_code === 0) {
						this.$message.success('删除成功！')
						this.getUserList()
					}
				})
				.catch(() => {})
		},
		showEditPasswordDialog(user) {
			this.tmpUserData = user
			this.isEditRoleShow = false
			this.isDialogShow = this.isEditPasswordShow = true
		},
		showEditRoleDialog(user) {
			this.tmpUserData = user
			this.role = user.role
			this.isEditPasswordShow = false
			this.isDialogShow = this.isEditRoleShow = true
		},
		cancelEdit() {
			this.isDialogShow = false
		},
		confirmEdit() {
			if (this.isEditPasswordShow) {
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

				this.updatePassword()
			}

			if (this.isEditRoleShow) {
				if (this.role === this.tmpUserData.role) {
					this.isDialogShow = false
					return
				}
				this.updateRole()
			}
		},
		async updatePassword() {
			const res = await api.updatePassword(
				this.tmpUserData.id,
				this.password,
				null,
				this.currentCompany.id
			)
			if (res.data.error_code === 0) {
				this.isDialogShow = false
				this.$message.success('用户密码更改成功！')
			}
		},
		async updateRole() {
			const res = await api.updateRole(
				this.currentCompany.id,
				this.tmpUserData.id,
				this.role
			)
			if (res.data.error_code === 0) {
				this.isDialogShow = false
				this.$message.success('用户权限更新成功！')
				this.getUserList()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../styles/customTable.scss';
.user-management {
	.invite-button .svg-icon {
		margin-right: 6px;
	}
	.main {
		padding: 30px;

		.el-button {
			width: 100px;
		}
		.container {
			// width: 600px;
			// margin: 40px auto 0;
			text-align: left;
			.remove-button.el-button {
				color: #f56c6c;
			}
			.remove-button:hover {
				border-color: #f56c6c !important;
			}
			.remove-button:focus {
				border-color: #f56c6c !important;
			}

			.admin {
				color: #409eff;
				font-weight: 500;
			}

			.edit-role {
				cursor: pointer;
				i {
					color: #409eff;
				}
			}
		}
	}
}

.role .el-select {
	width: 100%;
}
</style>
