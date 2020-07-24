<template>
  <div class="accounts">
    <SubHeader title="Accounts">
      <el-button
        @click="showAddAccount"
        class="primary-icon"
        size="medium"
        type="primary"
      >
        <svg-icon icon-class="plus-square"></svg-icon>New account
      </el-button>
    </SubHeader>

    <div class="main">
      <el-table
        :data="filterAccountList"
        :max-height="windowHeight-180"
        :row-class-name="tableRowClassName"
        border
        size="mini"
        style="width: 100%"
        v-loading="isGettingAccountList"
      >
        <el-table-column
          :key="index"
          :label="item.value"
          :prop="item.key"
          align="center"
          header-align="center"
          v-for="(item, index) in [
						{ key: 'no', value: 'Account No.' },
						{ key: 'name', value: 'Account Name' },
						{ key: 'type_name', value: 'Account Type' }
					]"
        >
          <template slot-scope="scope">
            <template v-if="scope.$index === 0">
              <el-input
                :placeholder="item.value"
                class="search"
                clearable
                size="small"
                v-model="filterCondition[item.key]"
              >
                <!-- <el-button
									slot="append"
									icon="el-icon-search"
                ></el-button>-->
              </el-input>
            </template>
            <template v-else>{{ scope.row[item.key] }}</template>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="isEnable">
          <template slot="header" slot-scope="scope">
            <div @click="isEditable = !isEditable" class="status">
              <svg-icon :icon-class="isEditable ? 'unlock-fill' : 'lock-fill'" class="custom-svg"></svg-icon>Status
            </div>
          </template>
          <template slot-scope="scope">
            <template v-if="scope.$index === 0">
              <el-select class="search" size="small" v-model="filterCondition.is_active">
                <el-option :key="item" :value="item" v-for="item in activeOptions"></el-option>
              </el-select>
            </template>
            <template v-else>
              <el-button
								size="mini"
                :class="[isEditable ? '' : 'disable']"
                :loading="scope.row.no === currentUpdatingAccount.no"
                @click="toggleStatus(scope.row)"
                type="text"
                v-if="scope.row.is_active"
              >Enable</el-button>
              <el-button
								size="mini"
                :class="[isEditable ? '' : 'disable', 'danger']"
                :loading="scope.row.no === currentUpdatingAccount.no"
                @click="toggleStatus(scope.row)"
                type="text"
                v-else
              >Disable</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :visible.sync="isAddAccountDialogShow"
      class="new-account"
      title="Add account"
      width="540px"
			:destroy-on-close="true"
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
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import NewAccoundDailog from './components/NewAccoundDailog'
import api from '@/api'
import windowResizeMixin from '@/mixins/windowResizeMixin'

export default {
	mixins: [windowResizeMixin],
	data() {
		return {
			isAddAccountDialogShow: false,
			isStatusDialogShow: false,
			isEditable: false,

			isGettingAccountList: false,
			isUpdatingAccount: false,
			currentUpdatingAccount: {},
			accountList: [],

			activeOptions: ['All', 'Enable', 'Disable'],
			filterCondition: {
				no: '',
				name: '',
				type_name: '',
				// 取值 All | Enable | Disable
				is_active: 'All'
			}
		}
	},
	components: {
		SubHeader,
		NewAccoundDailog
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany
		},
		filterAccountList() {
			const { no, name, type_name, is_active } = this.filterCondition
			let activeFilter =
				is_active === 'Enable' ? true : is_active === 'Disable' ? false : ''
			let filterArr = this.accountList.filter(item => {
				return (
					item.no.indexOf(no) !== -1 &&
					item.name.indexOf(name) !== -1 &&
					item.type_name.indexOf(type_name) !== -1 &&
					(is_active === 'All' || item.is_active === activeFilter)
				)
			})
			filterArr.unshift({}) // 第一行为搜索栏，每次需空出来
			return filterArr
		}
	},
	created() {
		this.getAccountList()
	},
	methods: {
		showAddAccount() {
			this.isAddAccountDialogShow = true
		},
		async getAccountList() {
			this.isGettingAccountList = true
			const res = await api.getAccountList(this.currentCompany.id)
			this.isGettingAccountList = false
			if (res.data.error_code === 0) {
				this.accountList = res.data.data
			}
		},
		tableRowClassName({ rowIndex }) {
			let className = ''
			if (rowIndex === 0) {
				className = 'search'
			}
			if (rowIndex % 2 !== 0) {
				return className + ' highlight-row'
			}
			return className
		},
		unlockStatus() {
			this.isEditable = true
			this.isStatusDialogShow = false
		},
		async toggleStatus(account) {
			if (!this.isEditable) {
				this.isStatusDialogShow = true
				return
			}
			if (this.isUpdatingAccount === true) {
				return
			}
			let newAccount = JSON.parse(JSON.stringify(account))
			newAccount.is_active = !newAccount.is_active
			this.isUpdatingAccount = true
			this.currentUpdatingAccount = account
			const res = await api.updateAccount(this.currentCompany.id, newAccount)
			this.currentUpdatingAccount = {}
			this.isUpdatingAccount = false
			if (res.data.error_code === 0) {
				this.accountList = res.data.data
			}
		},
		hideDialog(isAdded) {
			if (isAdded === true) {
				this.getAccountList()
			}
			this.isAddAccountDialogShow = false
		}
	}
}
</script>

<style scoped lang="scss">
.main {
	padding: 30px;

	@import '../../styles/customTable.scss';
	/deep/ .el-table__header .cell {
		font-size: 16px;
	}
	.search {
		margin: 6px 0;
		&.el-input,
		&.el-select {
			width: 90% !important;
		}
	}

	.status {
		text-align: center;
		color: #fff;
		cursor: pointer;
		.svg-icon {
			stroke: #000;
			font-size: 18px;
			margin-right: 6px;
		}
	}
	.danger {
		color: #f56c6c;
	}
	.disable {
		color: #c0c4cc;
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
</style>