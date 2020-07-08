<template>
  <el-form label-position="left" label-width="130px">
    <el-form-item label="Type of account:">
			<el-select v-model="accountType" clearable>
				<el-option
          :key="item + index"
          :label="item"
          :value="item"
          v-for="(item, index) in accountTypesArr"
        ></el-option>
			</el-select>
      
    </el-form-item>
    <el-form-item label="Account No.:">
      <el-row :gutter="16" justify="space-between" type="flex">
        <el-col :span="12">
          <!-- <el-input disabled v-model="accountType.no"></el-input> -->
					<el-select @change="setDefaultTypeName" v-model="currentSelectedAccount" value-key="no" clearable>
						<el-option
							:key="item.no + item.name + index"
							:label="item.no"
							:value="item"
							v-for="(item, index) in filterAccounts"
						></el-option>
      </el-select>
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

			// 当前选择的 account Type
			accountType: '',
			// 当前
			currentSelectedAccount: {
				no: '',
				name: '',
			},
			// currentSelectedAccount.no + no === accountNo
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
			return this.$store.getters.currentCompany.current_region
		},
		// accountType里的name 是 type of account, defaul 是name, no 是 no
		accountTypesArr() {
			let arr = this.accountTypes.map((item) => {
				return item.name
			})
			return [...new Set(arr)]
		},
		// 过滤后的 accounts
		filterAccounts() {
			let accounts = this.accountTypes.filter((item) => {
				return this.accountType === '' || item.name === this.accountType
			})
			return accounts.map((item) => {
				return {
					name: item.default,
					no: item.no
				}
			})
		}
	},
	created() {
		this.getAccountType()
	},
	methods: {
		setDefaultTypeName() {
			if (typeof this.currentSelectedAccount.name !== 'undefined') {
				this.name = this.currentSelectedAccount.name
			}
		},
		async getAccountType() {
			const res = await api.getAccountType(this.currentType)
			if (res.data.error_code === 0) {
				this.accountTypes = res.data.data
			}
		},
		async addAccount() {
			if (!this.accountType) {
				this.$message.error('Please select the type of account.')
				return
			}

			if (!this.currentSelectedAccount.no) {
				this.$message.error('Please select the Account No.')
				return
			}

			if (this.currentSelectedAccount.no.length < 9 && this.no === '') {
				this.$message.error('Please enter the Account No.')
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

			let no = this.currentSelectedAccount.no + str
			// 将no控制在8个字符以内，不足的时候补0
			if (no.length <= 9) {
				no = no.padEnd(9, '0')
			} else {
				this.$message.error('Account No. 最大为9个字符')
				return
			}

			const data = {
				no,
				name: this.name,
				type_no: this.currentSelectedAccount.no,
				type_name: this.accountType
			}

			this.isAddingAccount = true
			const res = await api.addAccount(
				this.currentCompany.id,
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