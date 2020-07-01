<template>
  <div class="mapping">
    <SubHeader title="Mapping">
      <el-row align="middle" class="left" slot="left" type="flex">
        <el-divider direction="vertical"></el-divider>
        <div class="status">Mapping Status:</div>
        <el-select placeholder="Batch" size="medium" v-model="mappingStatus">
          <el-option :key="status" :value="status" v-for="status in [MATCHED, TO_BE_MATCHED]"></el-option>
        </el-select>
        <el-button
          @click="isAddAccountDialogShow = !isAddAccountDialogShow"
          class="filter primary-icon"
          size="small"
          type="primary"
        >
          <svg-icon icon-class="plus-square"></svg-icon>New Account
        </el-button>
      </el-row>

      <el-row
        align="middle"
        class="action-bar"
        justify="end"
        type="flex"
        v-show="mappingStatus === TO_BE_MATCHED"
      >
        <el-col>
          <el-row align="middle" justify="end" type="flex">
            <el-button
              @click="uploadMappingList"
              class="action"
              icon="el-icon-success"
              size="medium"
              type="success"
            >Save</el-button>
            <el-button
              @click="clearToBeMatchedData"
              class="action"
              icon="el-icon-refresh"
              size="medium"
              type="info"
            >Reset</el-button>
          </el-row>
        </el-col>
      </el-row>
    </SubHeader>
    <div class="main" v-show="mappingStatus === MATCHED">
      <el-table :data="filterMatched" style="width: 100%" v-loading="isGettingMappingList">
        <el-table-column header-align="center" label="Imported Accounts">
          <el-table-column align="center" header-align="center" label="Account No.">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <el-input
                  class="search"
                  placeholder="Account No."
                  size="small"
                  v-model="filterMatchedNo"
                ></el-input>
              </template>
              <template v-else>{{ scope.row.account_no }}</template>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="Account Name">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <el-input
                  class="search"
                  placeholder="Account Name"
                  size="small"
                  v-model="filterMatchedName"
                ></el-input>
              </template>
              <template v-else>{{ scope.row.account_name }}</template>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column header-align="center" :label="`Chart of accounts ${currentType}`">
          <el-table-column align="center" header-align="center" label="Type of account">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <el-input
                  class="search"
                  placeholder="Type of account"
                  size="small"
                  v-model="filterMatchedAccountType"
                ></el-input>
              </template>
              <template v-else>{{ scope.row.accountType.no + ' ' + scope.row.accountType.name }}</template>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="Account No.">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <el-input
                  class="search"
                  placeholder="Account No."
                  size="small"
                  v-model="filterMatchedAccountNo"
                ></el-input>
              </template>
              <template v-else>{{ scope.row.matched_account_no }}</template>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="Account Name">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <el-input
                  class="search"
                  placeholder="Account Name"
                  size="small"
                  v-model="filterMatchedAccountName"
                ></el-input>
              </template>
              <template v-else>{{ scope.row.matched_account_name }}</template>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" header-align="center">
          <template slot="header" slot-scope="scope">
            <div @click="isEditable = !isEditable" class="status">
              <svg-icon :icon-class="isEditable ? 'unlock-fill' : 'lock-fill'"></svg-icon>Action
            </div>
          </template>
          <template slot-scope="scope" v-if="scope.$index !== 0">
            <el-button
              :class="[isEditable ? '' : 'disable', 'action']"
              :type="isEditable ? 'primary' : 'info'"
              @click="editAccount(scope.row)"
              icon="el-icon-edit-outline"
              plain
              size="small"
            >Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="main un-matched" v-show="mappingStatus === TO_BE_MATCHED">
      <el-table :data="filterToBeMatched" style="width: 100%" v-loading="isGettingMappingList">
        <el-table-column header-align="center" label="Imported Accounts">
          <el-table-column align="center" header-align="center" label="Account No.">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <el-input class="search" placeholder="Account No." size="small" v-model="filterNo"></el-input>
              </template>
              <template v-else>{{ scope.row.account_no }}</template>
            </template>
          </el-table-column>

          <el-table-column align="center" header-align="center" label="Account Name">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <el-input
                  class="search"
                  placeholder="Account Name"
                  size="small"
                  v-model="filterName"
                >
                  <!-- <el-button icon="el-icon-search" slot="append"></el-button> -->
                </el-input>
              </template>
              <template v-else>{{ scope.row.account_name }}</template>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column header-align="center" :label="`Chart of accounts ${currentType}`">
          <el-table-column align="center" header-align="center" label="Type of account">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0"></template>
              <template v-else>
                <el-select
                  @change="chooseAccountType(scope.row)"
                  clearable
                  placeholder="Type of account"
                  size="small"
                  v-model="scope.row.accountType"
                  value-key="no"
                >
                  <el-option
                    :key="item.no + item.name + index"
                    :label="item.no + '  ' + item.name"
                    :value="item"
                    v-for="(item, index) in accountTypes"
                  ></el-option>
                </el-select>
              </template>
            </template>
          </el-table-column>

          <el-table-column align="center" header-align="center" label="Account No.">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <!-- <el-input :placeholder="item.value" class="search" size="small">
                  <el-button icon="el-icon-search" slot="append"></el-button>
                </el-input>-->
              </template>
              <template v-else>
                <!-- <el-input
                  clearable
                  placeholder="Account No."
                  v-model="scope.row.matched_account_no"
                ></el-input>-->

                <el-select
                  @change="chooseAccountNo($event, scope.row)"
                  placeholder="Account No."
                  size="small"
                  v-model="scope.row.matched_account_no"
                >
                  <el-option
                    :key="item.no + item.name + index"
                    :label="item.no"
                    :value="item.no"
                    v-for="(item, index) in scope.row.accountList"
                  ></el-option>
                </el-select>
              </template>
            </template>
          </el-table-column>

          <el-table-column align="center" header-align="center" label="Account Name">
            <template slot-scope="scope">
              <template v-if="scope.$index === 0">
                <!-- <el-input :placeholder="item.value" class="search" size="small">
                  <el-button icon="el-icon-search" slot="append"></el-button>
                </el-input>-->
              </template>
              <template v-else>
                <el-input
                  clearable
                  disabled
                  placeholder="Account Name"
                  size="small"
                  v-model="scope.row.matched_account_name"
                ></el-input>
              </template>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :visible.sync="isAddAccountDialogShow"
      class="new-account"
      title="Add account"
      width="540px"
    >
      <NewAccoundDailog @hideDialog="hideDialog($event)"></NewAccoundDailog>
    </el-dialog>

    <el-dialog :visible.sync="isStatusDialogShow" title="Status" width="540px">
      Editing is currently disabled. Do you want to unlock it?
      <div slot="footer">
        <el-button @click="unlockStatus" type="primary">Unlock</el-button>
        <el-button @click="isStatusDialogShow = false" plian>Cancel</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="isEditAccountDialogShow" class="edit-account" width="540px">
      <div class="title">Imported accounts</div>
      <el-form class="form1" label-position="left" label-width="130px">
        <el-form-item label="Account No.:">{{ currentEditAccount.account_no }}</el-form-item>
        <el-form-item label="Account Name:">{{ currentEditAccount.account_name }}</el-form-item>
      </el-form>
      <div class="title editable">Chart of accounts {{ currentType }}</div>
      <el-form label-position="left" label-width="130px">
        <el-form-item label="Type of account:">
          <el-select
            placeholder="Type of account"
            v-model="currentEditAccount.accountType"
            value-key="no"
          >
            <el-option
              :key="item.no + item.name + index"
              :label="item.no + '  ' + item.name"
              :value="item"
              v-for="(item, index) in accountTypes"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Account No.:">
          <el-select placeholder="Account No." v-model="currentEditAccount.account" value-key="no">
            <el-option
              :key="item.no + item.name + index"
              :label="item.no"
              :value="item"
              v-for="(item, index) in filterAccountList"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="currentEditAccount.matched_account_no"></el-input> -->
        </el-form-item>
        <el-form-item label="Account Name:">
          <el-input disabled v-model="currentEditAccount.account.name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="12" justify="space-between" type="flex">
            <el-col :span="12">
              <el-button
                :loading="isUpdatingMapping"
                @click="updateMapping"
                class="full-width"
                type="primary"
              >Save</el-button>
            </el-col>
            <el-col :span="12">
              <el-button @click="isEditAccountDialogShow = false" class="full-width" plain>Cancel</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import NewAccoundDailog from './components/NewAccoundDailog'
import api from '@/api'
import { FR } from '@/constant/accountType'

const MATCHED = 'Matched'
const TO_BE_MATCHED = 'To be matched'

export default {
	data() {
		return {
			MATCHED,
			TO_BE_MATCHED,

			isAddAccountDialogShow: false,
			isEditAccountDialogShow: false,
			isStatusDialogShow: false,
			isEditable: false,

			mappingStatus: TO_BE_MATCHED,
			matchedData: [],
			toBeMatchedData: [],

			// 该语言下的 account type [{ no: 1, name: '22'}]
			accountTypes: [],
			// 该语言下的 account no [{ no, name }]
			accountList: [],
			// to be matched 下的过滤项
			filterNo: '',
			filterName: '',
			// matched 下的过滤项
			filterMatchedNo: '',
			filterMatchedName: '',
			filterMatchedAccountType: '',
			filterMatchedAccountNo: '',
			filterMatchedAccountName: '',
			// 当前编辑 mapping 的内容
			currentEditAccount: {
				// { no: '', name: '' }
				accountType: {},
				// { no: '', name: '' }
				account: {}
			},

			isGettingMappingList: false,
			isUpdatingMapping: false,
			isSavingMapping: false
		}
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany
		},
		currentType() {
			return this.$store.getters.currentType
		},
		filterToBeMatched() {
			const result = this.toBeMatchedData.filter(item => {
				return (
					item.account_no.indexOf(this.filterNo) !== -1 &&
					item.account_name.indexOf(this.filterName) !== -1
				)
			})
			result.unshift({})
			return result
		},
		filterMatched() {
			const result = this.matchedData.filter(item => {
				const accountType = item.accountType || { no: '', name: '' }
				return (
					item.account_no.includes(this.filterMatchedNo) &&
					item.account_name.includes(this.filterMatchedName) &&
					item.matched_account_no.includes(this.filterMatchedAccountNo) &&
					item.matched_account_name.includes(this.filterMatchedAccountName) &&
					(accountType.no + '  ' + accountType.name).includes(
						this.filterMatchedAccountType
					)
				)
			})
			result.unshift({})
			return result
		},
		filterAccountList() {
			return this.accountList.filter(item => {
				return item.no.includes(this.currentEditAccount.accountType.no)
			})
		}
	},
	components: {
		SubHeader,
		NewAccoundDailog
	},
	created() {
		this.getAccountType()
		this.getAccountList()
	},
	methods: {
		unlockStatus() {
			this.isEditable = true
			this.isStatusDialogShow = false
		},
		editAccount(account) {
			if (!this.isEditable) {
				this.isStatusDialogShow = true
				return
			}
			this.isEditAccountDialogShow = true
			this.currentEditAccount = {
				account_no: account.account_no,
				account_name: account.account_name,
				accountType: account.accountType,
				account: {
					no: account.matched_account_no,
					name: account.matched_account_name
				}
			}
		},
		hideDialog(isAdded) {
			this.isAddAccountDialogShow = false
			if (isAdded) {
				this.getMappingList()
			}
		},
		// 获取Account列表
		async getAccountList() {
			this.isGettingMappingList = true
			const res = await api.getAccountList(
				this.currentCompany.id,
				this.currentType
			)
			if (res.data.error_code === 0) {
				this.accountList = res.data.data
			}
			this.getMappingList()
		},
		// 获取当前语言下所有 account type
		async getAccountType() {
			const res = await api.getAccountType(this.currentType)
			if (res.data.error_code === 0) {
				this.accountTypes = res.data.data
			}
		},
		// 获取已匹配和未匹配的列表
		// isUpdatingMatched 为 true 表示是未匹配项变成了匹配项，需要更新 matched 数据
		async getMappingList(shouldUpdateToBeMatched = true) {
			this.isGettingMappingList = true
			const res = await api.getMappingList(
				this.currentCompany.id,
				this.currentType
			)
			this.isGettingMappingList = false
			if (res.data.error_code === 0) {
				const { matched, to_be_matched } = res.data.data
				// 获取相关 accountType
				this.matchedData = matched.map(item => {
					// CN 语言下 第一个小数点前是account type
					// FR 语言下 大部分三位算一类，部分四位算一类（6开头）
					let accountType = this.accountTypes.find(type => {
						if (this.currentType === FR) {
							return type.no.slice(0, 3) === item.matched_account_no.slice(0, 3)
						} else {
							return (
								type.no.split('.')[0] === item.matched_account_no.split('.')[0]
							)
						}
					})
					item.accountType =
						typeof accountType === 'undefined'
							? { no: '', name: '' }
							: accountType
					return item
				})
				// 添加三个属性
				if (shouldUpdateToBeMatched) {
					this.toBeMatchedData = to_be_matched.map(item => {
						item.accountType = { no: '', name: '', default: '' }
						item.matched_account_no = ''
						item.matched_account_name = ''
						item.accountList = this.accountList
						return item
					})
				}
			}
		},
		// 选择 Account Type，自动设置相应的Account No. Account Name
		chooseAccountType(mapping) {
			mapping.accountList = this.accountList.filter(item => {
				return item.no.includes(mapping.accountType.no)
			})
			// const index = this.toBeMatchedData.findIndex(item => {
			// 	return mapping.account_no === item.account_no
			// })
			// this.toBeMatchedData[index].matched_account_no = mapping.accountType.no
			// this.toBeMatchedData[index].matched_account_name =
			// 	mapping.accountType.name
		},
		chooseAccountNo(no, row) {
			let account = this.accountList.find(item => {
				return item.no === no
			})
			if (account) {
				row.matched_account_name = account.name
			}
		},
		// 上传匹配列表
		async uploadMappingList() {
			const filterMappingList = this.toBeMatchedData.filter(item => {
				return (
					item.matched_account_no !== '' && item.matched_account_name !== ''
				)
			})
			const mapping_list = filterMappingList.map(item => {
				return {
					account_no: item.account_no,
					account_name: item.account_name,
					matched_account_no: item.matched_account_no,
					matched_account_name: item.matched_account_name
				}
			})
			if (mapping_list.length === 0) {
				return
			}
			this.isSavingMapping = false
			const res = await api.uploadMappingList(
				this.currentCompany.id,
				this.currentType,
				mapping_list
			)
			this.isSavingMapping = true
			if (res.data.error_code === 0) {
				this.$message.success('保存成功')
				// todo 保存成功后的回调
				this.getMappingList(false)
				this.toBeMatchedData = this.toBeMatchedData.filter(item => {
					return (
						item.matched_account_no === '' || item.matched_account_name === ''
					)
				})
			}
		},
		// 清除未匹配项编辑的内容
		clearToBeMatchedData() {
			this.toBeMatchedData.forEach(item => {
				item.accountType = {}
				item.matched_account_no = ''
				item.matched_account_name = ''
			})
		},
		// 更新mapping
		async updateMapping() {
			const mapping = {
				account_no: this.currentEditAccount.account_no,
				matched_account_no: this.currentEditAccount.account.no,
				matched_account_name: this.currentEditAccount.account.name
			}
			this.isUpdatingMapping = true
			const res = await api.updateMappingList(
				this.currentCompany.id,
				this.currentType,
				mapping
			)
			this.isUpdatingMapping = false

			if (res.data.error_code === 0) {
				this.isEditAccountDialogShow = false
				this.getMappingList()
				this.$message.success('更新成功')
			}
		}
	}
}
</script>

<style scoped lang="scss">
.mapping {
	.left {
		margin-left: 20px;
		.status {
			margin-left: 20px;
		}
		.el-select {
			margin: 0 20px 0 8px;
		}
	}
	.main {
		padding: 30px;
		.action-bar .action.el-button {
			width: 100px;
		}
		@import '../../styles/customTable.scss';
		.search {
			margin: 6px 0;
			&.el-input,
			&.el-select {
				width: 100% !important;
			}
		}
		/deep/ .el-table__header .cell {
			font-size: 16px;
		}
		/deep/ .el-table__row td {
			padding-top: 6px;
			padding-bottom: 6px;
		}
		.status {
			text-align: center;
			color: #fff;
			font-size: 16px;
			cursor: pointer;
			.svg-icon {
				font-size: 18px;
				stroke: #000;
				margin-right: 6px;
			}
		}
		.el-button.action {
			width: 80px;
			&.disable {
				color: #bcbec2;
				background-color: #f4f4f5;
				border-color: #e9e9eb;
			}
		}
	}
}

.new-account {
	line-height: 40px;
	/deep/ .el-dialog__body {
		padding: 30px 60px;
	}
	/deep/ .el-dialog__title {
		color: #303133;
		font-weight: bold;
	}
	/deep/ .el-form-item__label {
		color: #303133 !important;
		font-weight: 600;
	}
}

.edit-account {
	/deep/ .el-dialog__body {
		padding: 0px 30px 20px;
	}
	.title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
		&.editable {
			margin-top: 20px;
			margin-bottom: 18px;
		}
	}
	.el-form {
		padding-left: 40px;
		.el-select {
			width: 100%;
			box-sizing: border-box;
			margin: 0;
		}
	}
	.form1 {
		.el-form-item {
			margin-bottom: 0px;
		}
	}
}
</style>