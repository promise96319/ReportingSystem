<template>
  <el-form label-position="left" label-width="130px">
    <el-form-item label="Type of account:">
      <el-select @change="setDefaultTypeName" v-model="accountType" value-key="no">
        <el-option
          :key="item.no + item.name + index"
          :label="item.no + '  ' + item.name"
          :value="item"
          v-for="(item, index) in accountTypes"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Account No.:">
      <el-row :gutter="16" justify="space-between" type="flex">
        <el-col :span="12">
          <el-input disabled v-model="accountType.no"></el-input>
        </el-col>
        <!-- <el-col :span="1">
					.
        </el-col>-->
        <el-col :span="12">
          <el-input clearable placeholder="Account No." v-model="no"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="Account Name:">
      <el-input clearable placeholder="Account Name" v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="Status:">Enable</el-form-item>
    <el-form-item>
      <el-row :gutter="12" justify="space-between" type="flex">
        <el-col :span="12">
          <el-button
            :loading="isAddingAccount"
            @click="addAccount"
            class="full-width"
            type="primary"
          >Save</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="hideAddedDialog" class="full-width" plain>Cancel</el-button>
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

			isAddingAccount: false
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

			let no = this.accountType.no + str
			// 将no控制在8个字符以内，不足的时候补0
			if (no.length <= 8) {
				no = no.padEnd(8, '0')
			} else {
				this.$message.error('Account No. 最大为8个字符')
				return
			}

			const data = {
				no,
				name: this.name,
				type_no: this.accountType.no,
				type_name: this.accountType.name
			}

			this.isAddingAccount = true
			const res = await api.addAccount(
				this.currentCompany.id,
				this.currentType,
				data
			)
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