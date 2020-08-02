<template>
  <div class="mapping">
    <SubHeader title="Mapping">
      <el-row slot="left" align="middle" class="left" type="flex">
        <el-divider direction="vertical"></el-divider>
        <div class="status">Mapping Status:</div>
        <el-select v-model="mappingStatus" placeholder="Batch" size="medium">
          <el-option
            v-for="status in [MATCHED, TO_BE_MATCHED]"
            :key="status"
            :value="status"
          ></el-option>
        </el-select>
        <el-button
          class="filter primary-icon"
          size="small"
          type="primary"
          @click="isAddAccountDialogShow = !isAddAccountDialogShow"
        >
          <svg-icon icon-class="plus-square"></svg-icon>New Account
        </el-button>
      </el-row>

      <el-row
        v-show="mappingStatus === TO_BE_MATCHED"
        align="middle"
        class="action-bar"
        justify="end"
        type="flex"
      >
        <el-col>
          <el-row align="middle" justify="end" type="flex">
            <el-button
              class="action"
              icon="el-icon-success"
              size="medium"
              type="success"
              @click="uploadMappingList"
              >Save</el-button
            >
            <el-button
              class="action"
              icon="el-icon-refresh"
              size="medium"
              type="info"
              @click="clearToBeMatchedData"
              >Reset</el-button
            >
          </el-row>
        </el-col>
      </el-row>
    </SubHeader>

    <div v-show="mappingStatus === MATCHED" class="main">
      <el-table
        v-loading="isGettingMappingList"
        :data="filterMatched"
        :max-height="windowHeight - 180"
        size="small"
        style="width: 100%;"
      >
        <el-table-column header-align="center" label="Imported Accounts">
          <el-table-column align="center" header-align="center">
            <template slot="header">
              <SearchPopover
                v-model="filterMatchedNo"
                placeholder="Account No."
                title="Account No."
              ></SearchPopover>
            </template>
            <template slot-scope="scope">{{ scope.row.account_no }}</template>
          </el-table-column>
          <el-table-column align="center" header-align="center">
            <template slot="header">
              <SearchPopover
                v-model="filterMatchedName"
                placeholder="Account Name"
                title="Account Name"
              ></SearchPopover>
            </template>
            <template slot-scope="scope">{{ scope.row.account_name }}</template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          :label="`Chart of accounts ${currentType}`"
          header-align="center"
        >
          <el-table-column align="center" header-align="center">
            <template slot="header">
              <SearchPopover
                v-model="filterMatchedAccountType"
                placeholder="Type of account"
                title="Type of account"
              ></SearchPopover>
            </template>
            <template slot-scope="scope">{{ scope.row.accountType }}</template>
          </el-table-column>
          <el-table-column
            align="center"
            header-align="center"
            label="Account No."
          >
            <template slot="header">
              <SearchPopover
                v-model="filterMatchedAccountNo"
                placeholder="Account No."
                title="Account No."
              ></SearchPopover>
            </template>
            <template slot-scope="scope">{{
              scope.row.matched_account_no
            }}</template>
          </el-table-column>
          <el-table-column
            align="center"
            header-align="center"
            label="Account Name"
          >
            <template slot="header">
              <SearchPopover
                v-model="filterMatchedAccountName"
                placeholder="Account Name"
                title="Account Name"
              ></SearchPopover>
            </template>
            <template slot-scope="scope">{{
              scope.row.matched_account_name
            }}</template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" header-align="center">
          <template slot="header">
            <div class="status" @click="isEditable = !isEditable">
              <svg-icon
                :icon-class="isEditable ? 'unlock-fill' : 'lock-fill'"
              ></svg-icon
              >Action
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
              :class="[isEditable ? '' : 'disable', 'action']"
              :type="isEditable ? 'primary' : 'info'"
              icon="el-icon-edit-outline"
              plain
              size="mini"
              @click="editAccount(scope.row)"
              >Edit</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="mappingStatus === TO_BE_MATCHED" class="main un-matched">
      <el-table
        v-loading="isGettingMappingList"
        :data="filterToBeMatched"
        :max-height="windowHeight - 180"
        size="small"
        style="width: 100%;"
      >
        <el-table-column header-align="center" label="Imported Accounts">
          <el-table-column align="center" header-align="center">
            <template slot="header">
              <SearchPopover
                v-model="filterNo"
                placeholder="Account No."
                title="Account No."
              ></SearchPopover>
            </template>
            <template slot-scope="scope">
              <template>{{ scope.row.account_no }}</template>
            </template>
          </el-table-column>

          <el-table-column align="center" header-align="center">
            <template slot="header">
              <SearchPopover
                v-model="filterName"
                placeholder="Account Name"
                title="Account Name"
              ></SearchPopover>
            </template>
            <template slot-scope="scope">
              <template>{{ scope.row.account_name }}</template>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          :label="`Chart of accounts ${currentType}`"
          header-align="center"
        >
          <el-table-column
            align="center"
            header-align="center"
            label="Type of account"
          >
            <template slot-scope="scope">
              <template>
                <el-select
                  v-model="scope.row.accountType"
                  clearable
                  placeholder="Type of account"
                  size="small"
                  value-key="no"
                  filterable
                  @change="chooseAccountType(scope.row)"
                >
                  <el-option
                    v-for="(item, index) in accountTypesArr"
                    :key="item + index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </template>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            header-align="center"
            label="Account No."
          >
            <template slot-scope="scope">
              <template>
                <!-- @change="chooseAccountNo($event, scope.row)" -->
                <el-select
                  v-model="scope.row.matched"
                  placeholder="Account No."
                  size="small"
                  value-key="no"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="(item, index) in scope.row.accountList"
                    :key="item.no + item.name + index"
                    :label="item.no"
                    :value="item"
                  ></el-option>
                </el-select>
              </template>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            header-align="center"
            label="Account Name"
          >
            <template slot-scope="scope">
              <template>
                <el-select
                  v-model="scope.row.matched"
                  placeholder="Account Name"
                  size="small"
                  value-key="name"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="(item, index) in scope.row.accountList"
                    :key="item.name + item.no + index"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
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
      :destroy-on-close="true"
    >
      <NewAccoundDailog @hideDialog="hideDialog($event)"></NewAccoundDailog>
    </el-dialog>

    <el-dialog :visible.sync="isStatusDialogShow" title="Status" width="540px">
      Editing is currently disabled. Do you want to unlock it?
      <div slot="footer">
        <el-button type="primary" @click="unlockStatus">Unlock</el-button>
        <el-button plian @click="isStatusDialogShow = false">Cancel</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="isEditAccountDialogShow"
      class="edit-account"
      width="540px"
    >
      <div class="title">Imported accounts</div>
      <el-form class="form1" label-position="left" label-width="130px">
        <el-form-item label="Account No.:">{{
          currentEditAccount.account_no
        }}</el-form-item>
        <el-form-item label="Account Name:">{{
          currentEditAccount.account_name
        }}</el-form-item>
      </el-form>
      <div class="title editable">Chart of accounts {{ currentType }}</div>
      <el-form label-position="left" label-width="130px">
        <el-form-item label="Type of account:">
          <el-select
            v-model="currentEditAccount.accountType"
            placeholder="Type of account"
          >
            <el-option
              v-for="(item, index) in accountTypesArr"
              :key="item + index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Account No.:">
          <el-select
            v-model="currentEditAccount.account"
            placeholder="Account No."
            value-key="no"
          >
            <el-option
              v-for="(item, index) in filterAccounts"
              :key="item.no + item.name + index"
              :label="item.no"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Account Name:">
          <el-select
            v-model="currentEditAccount.account"
            placeholder="Account Name"
            value-key="name"
          >
            <el-option
              v-for="(item, index) in filterAccounts"
              :key="item.name + item.no + index"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="12" justify="space-between" type="flex">
            <el-col :span="12">
              <el-button
                :loading="isUpdatingMapping"
                class="full-width"
                type="primary"
                @click="updateMapping"
                >Save</el-button
              >
            </el-col>
            <el-col :span="12">
              <el-button
                class="full-width"
                plain
                @click="isEditAccountDialogShow = false"
                >Cancel</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import SearchPopover from '@/components/SearchPopover'
import NewAccoundDailog from './components/NewAccoundDailog'
import api from '@/api'
import windowResizeMixin from '@/mixins/windowResizeMixin'

const MATCHED = 'Matched'
const TO_BE_MATCHED = 'To be matched'

export default {
  components: {
    SubHeader,
    SearchPopover,
    NewAccoundDailog
  },
  mixins: [windowResizeMixin],
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
        // ''
        accountType: '',
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
      return this.$store.getters.currentCompany.current_region
    },
    filterToBeMatched() {
      const result = this.toBeMatchedData.filter((item) => {
        return (
          item.account_no.indexOf(this.filterNo) !== -1 &&
          item.account_name.indexOf(this.filterName) !== -1
        )
      })
      return result
    },
    filterMatched() {
      const result = this.matchedData.filter((item) => {
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
      return result
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
      if (!this.currentEditAccount.accountType) {
        return this.accountList
      }

      let types = this.accountTypes.filter((item) => {
        return (
          this.currentEditAccount.accountType === '' ||
          item.name === this.currentEditAccount.accountType
        )
      })

      return this.accountList.filter((item) => {
        return types.some((type) => {
          return item.no.indexOf(type.no) === 0
        })
      })
    }
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
      this.currentEditAccount.account_no = account.account_no
      this.currentEditAccount.account_name = account.account_name
      this.currentEditAccount.accountType = account.accountType
      this.currentEditAccount.account = {
        no: account.matched_account_no,
        name: account.matched_account_name
      }
    },
    hideDialog(isAdded) {
      this.isAddAccountDialogShow = false
      if (isAdded) {
        this.getAccountList()
        this.getMappingList()
      }
    },
    // 获取Account列表
    async getAccountList() {
      this.isGettingMappingList = true
      const res = await api.getAccountList(this.currentCompany.id)
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
      if (shouldUpdateToBeMatched) {
        this.isGettingMappingList = true
      }
      const res = await api.getMappingList(this.currentCompany.id)
      this.isGettingMappingList = false
      if (res.data.error_code === 0) {
        const { matched, to_be_matched } = res.data.data
        // 获取相关 accountType
        this.matchedData = matched.map((item) => {
          // CN,EN 下是四位
          // FR,US 下部分是四位，部分三位，US部分二位
          // FR 语言下 大部分三位算一类，部分四位算一类（6开头）
          // 先从四位开始查找，再查找三位，再查找二位
          let accountType = this.accountTypes.find((type) => {
            return type.no.slice(0, 4) === item.matched_account_no.slice(0, 4)
          })
          if (!accountType) {
            accountType = this.accountTypes.find((type) => {
              return type.no.slice(0, 3) === item.matched_account_no.slice(0, 3)
            })
          }
          if (!accountType) {
            accountType = this.accountTypes.find((type) => {
              return type.no.slice(0, 2) === item.matched_account_no.slice(0, 2)
            })
          }

          item.accountType = (accountType && accountType.name) || ''
          return item
        })
        // 添加三个属性
        if (shouldUpdateToBeMatched) {
          this.toBeMatchedData = to_be_matched.map((item) => {
            item.accountType = ''
            item.matched = {
              no: '',
              name: ''
            }
            item.accountList = this.accountList
            return item
          })
        }
      }
    },
    // 选择 Account Type，自动设置相应的Account No. Account Name
    chooseAccountType(mapping) {
      if (mapping.accountType === '') {
        mapping.accountList = this.accountList
        return
      }

      let types = this.accountTypes.filter((item) => {
        return mapping.accountType === '' || item.name === mapping.accountType
      })

      mapping.accountList = this.accountList.filter((item) => {
        return types.some((type) => {
          return item.no.indexOf(type.no) === 0
        })
      })

      mapping.matched = {
        no: '',
        name: ''
      }
    },
    chooseAccountNo(no, row) {
      let account = this.accountList.find((item) => {
        return item.no === no
      })
      if (account) {
        row.matched_account_name = account.name
      }
    },
    // 上传匹配列表
    async uploadMappingList() {
      const filterMappingList = this.toBeMatchedData.filter((item) => {
        return (
          item.matched && item.matched.no !== '' && item.matched.name !== ''
        )
      })
      const mapping_list = filterMappingList.map((item) => {
        return {
          account_no: item.account_no,
          account_name: item.account_name,
          matched_account_no: item.matched.no,
          matched_account_name: item.matched.name
        }
      })
      if (mapping_list.length === 0) {
        return
      }
      this.isSavingMapping = false
      const res = await api.uploadMappingList(
        this.currentCompany.id,
        mapping_list
      )
      this.isSavingMapping = true
      if (res.data.error_code === 0) {
        this.$message.success('保存成功')
        // todo 保存成功后的回调
        this.getMappingList(false)
        this.toBeMatchedData = this.toBeMatchedData.filter((item) => {
          return item.matched.no === '' || item.matched.name === ''
        })
      }
    },
    // 清除未匹配项编辑的内容
    clearToBeMatchedData() {
      this.toBeMatchedData.forEach((item) => {
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
      const res = await api.updateMappingList(this.currentCompany.id, mapping)
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
