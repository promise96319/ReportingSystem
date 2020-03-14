<template>
	<el-form :model="newAccount" label-width="130px" label-position="left">
		<el-form-item label="Type of account:">
			<el-select v-model="newAccount.accountType">
				<el-option v-for="type in ['CN', 'EN']" :key="type" :value="type"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="Account No.:">
			<el-input v-model="newAccount.accountNo"></el-input>
		</el-form-item>
		<el-form-item label="Account Name:">
			<el-input v-model="newAccount.accountName"></el-input>
		</el-form-item>
		<el-form-item label="Status:">Enable</el-form-item>
		<el-form-item>
			<el-row type="flex" justify="space-between" :gutter="12">
				<el-col :span="12">
					<el-button type="primary" class="full-width">Save</el-button>
				</el-col>
				<el-col :span="12">
					<el-button plain class="full-width">Cancel</el-button>
				</el-col>
			</el-row>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			newAccount: {
				accountType: "",
				accountNo: "",
				accountName: ""
			}
		};
	}
};
</script>

<style lang="scss" scoped>
.el-select {
	width: 100%;
}
</style>