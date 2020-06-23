<template>
	<el-form
		label-width="130px"
		label-position="left"
	>
		<el-form-item label="Type of account:">
			<el-select
				v-model="accountType"
				@change="setDefaultTypeName"
				value-key="no"
			>
				<el-option
					v-for="item in accountTypes"
					:key="item.no"
					:label="item.no + '  ' + item.name"
					:value="item"
				></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="Account No.:">
			<el-row
				:gutter="16"
				type="flex"
				justify="space-between"
			>
				<el-col :span="12">
					<el-input
						v-model="accountType.no"
						disabled
					></el-input>
				</el-col>
				<!-- <el-col :span="1">
					.
				</el-col> -->
				<el-col :span="12">
					<el-input v-model="no" clearable placeholder="Account No."></el-input>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item label="Account Name:">
			<el-input v-model="name" clearable placeholder="Account Name"></el-input>
		</el-form-item>
		<el-form-item label="Status:">Enable</el-form-item>
		<el-form-item>
			<el-row
				type="flex"
				justify="space-between"
				:gutter="12"
			>
				<el-col :span="12">
					<el-button
						:loading="isAddingAccount"
						type="primary"
						class="full-width"
						@click="addAccount"
					>Save</el-button>
				</el-col>
				<el-col :span="12">
					<el-button
						plain
						class="full-width"
						@click="hideAddedDialog"
					>Cancel</el-button>
				</el-col>
			</el-row>
		</el-form-item>
	</el-form>
</template>

<script>
import api from '@/api'

export default {
	data() {
		return {
			accountTypes: [],

			// 选择的 account Type
			accountType: {
				name: '',
				no: ''
			},
			// type_no + no === accountNo
			no: '',
			name: '',

			isAddingAccount: false,
		}
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany
		},
		currentType() {
			return this.$store.getters.currentType
		}
	},
	created() {
		this.getAccountType()
	},
	methods: {
		setDefaultTypeName() {
			if (typeof this.accountType.default !== 'undefined') {
				this.name = this.accountType.default
			}
		},
		async getAccountType() {
			const res = await api.getAccountType(this.currentType)
			if (res.data.error_code === 0) {
				this.accountTypes = res.data.data
				if (this.accountTypes.length > 0) {
					this.accountType = this.accountTypes[0]
					this.setDefaultTypeName()
				}
			}
		},
		async addAccount() {
			if (this.accountType.name === '') {
				this.$message.error('Please select the type of account')
				return
			}

			if (this.no === '') {
				this.$message.error('Please enter Account No.')
				return
			}

			let str = this.no.replace('.', '')
			if (isNaN(parseInt(str))) {
				this.$message.error('Account No. is invalid')
				return
			}

			if (this.name === '') {
				this.$message.error('Please enter Account Name')
				return
			}

			const data = {
				no: this.accountType.no + this.no,
				name: this.name,
				type_no: this.accountType.no,
				type_name: this.accountType.name
			}

			this.isAddingAccount = true
			const res = await api.addAccount(this.currentCompany.id, this.currentType, data)
			this.isAddingAccount = false

			if (res.data.error_code === 0) {
				this.$message.success('添加成功！')
				this.hideDialog(true)
			}
			
		},
		hideAddedDialog() {
			this.hideDialog()
		},
		hideDialog(isAdded = false) {
			this.$emit('hideDialog', isAdded)
		}
	}
}
</script>

<style lang="scss" scoped>
.el-select {
	width: 100%;
}
</style>