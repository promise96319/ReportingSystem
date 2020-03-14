<template>
	<div class="settings">
		<SubHeader title="Settings"></SubHeader>
		<div class="main">
			<div class="container">
				<el-form :model="userInfo" label-width="170px" label-position="left">
					<el-form-item label="Email address:">{{ userInfo.emailAddress }}</el-form-item>
					<el-form-item label="Password:">
						<el-input v-model="userInfo.password" disabled show-password placeholder="Password">
							<el-button class="lock" slot="append" @click="isPasswordEditable=!isPasswordEditable">
								<svg-icon :icon-class="isPasswordEditable ? 'unlock' : 'lock'"></svg-icon>
							</el-button>
						</el-input>
						<el-collapse-transition>
							<div class="new-password" v-show="isPasswordEditable">
								<el-input v-model="userInfo.password" show-password placeholder="New password"></el-input>
								<el-input v-model="userInfo.password" show-password placeholder="Confirm new password"></el-input>
							</div>
						</el-collapse-transition>
					</el-form-item>
					<el-form-item label="Chat of accounts type:">
						<el-select
							v-model="userInfo.accountType"
							placeholder="请选择"
							:disabled="!isAccountTypeEditable"
						>
							<el-option v-for="item in accountTypes" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<el-button class="lock append" @click="isAccountTypeEditable=!isAccountTypeEditable">
							<svg-icon :icon-class="isAccountTypeEditable ? 'unlock' : 'lock'"></svg-icon>
						</el-button>
					</el-form-item>
					<el-form-item>
						<el-row type="flex" justify="space-between" :gutter="12">
							<el-col :span="12">
								<el-button type="primary" class="full-width">Confirm</el-button>
							</el-col>
							<el-col :span="12">
								<el-button plain  class="full-width">Cancel</el-button>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
export default {
	data() {
		return {
			isPasswordEditable: false,
			isAccountTypeEditable: false,
			userInfo: {
				emailAddress: "12438383@qq.com",
				password: "hello world",
				accountType: ""
			},
			accountTypes: ["CN", "EN", "AT"]
		};
	},
	components: {
		SubHeader
	},
	created() {}
};
</script>

<style scoped lang="scss">
.settings {
	.main {
		padding: 30px;
		.container {
			width: 440px;
			margin: 60px auto 0;
			text-align: left;
			/deep/ .el-form-item__label {
				color: #303133;
				font-weight: 600;
			}

			.lock {
				font-size: 20px;
				stroke: #606266;
			}
			.new-password {
				.el-input {
					margin-top: 10px;
				}
			}

			.el-select {
				width: 100%;
				/deep/ .el-input__suffix {
					right: 68px;
				}
			}

			.append {
				background-color: #f5f7fa;
				position: absolute;
				height: 40px;
				width: 64px;
				top: 0px;
				right: 0px;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				display: table-cell;
				vertical-align: middle;
				border-color: #dcdfe6 !important;
				.svg-icon {
					transform: translateY(-3px);
				}
			}
		}
	}
}
</style>
