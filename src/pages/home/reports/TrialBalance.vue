<template>
  <div class="trial-balance">
    <SubHeader :is-back="true" title="Trial balance">
      <div class="filter">
        {{ isFR ? 'Période' : 'Period' }} :
        <el-date-picker
          v-model="filterCondition.date"
          :clearable="false"
          :end-placeholder="isFR ? 'Au' : 'End'"
          :start-placeholder="isFR ? 'Du' : 'Start'"
          range-separator="-"
          size="mini"
          type="monthrange"
          @change="getTrialBalance"
        ></el-date-picker
        >Devise :
        <el-select
          v-model="filterCondition.devise"
          size="mini"
          @change="getTrialBalance"
        >
          <el-option
            :key="GL_SINGLE"
            :label="GL_SINGLE"
            :value="GL_SINGLE"
          ></el-option>
          <el-option
            :key="GL_MULTIPLE"
            :label="GL_MULTIPLE"
            :value="GL_MULTIPLE"
          ></el-option>
        </el-select>
      </div>
      <el-button
        class="primary-icon"
        icon="el-icon-s-data"
        size="mini"
        type="primary"
        @click="$router.go(-1)"
        >Reports</el-button
      >
    </SubHeader>
    <div class="main">
      <div v-show="filterCondition.devise === GL_SINGLE" class="content">
        <el-table
          v-loading="isGettingTrialBalanceData"
          :data="formatTrialBalance"
          :height="windowHeight - 180"
          border
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            :label="isFR ? 'Cumul période' : 'Period'"
            header-align="center"
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="total_debit"
              width="120px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="total_debit(row)"
                >
                  {{ row.local_debit_n_1 | fixedNum }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="total_credit"
              width="120px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.total_credit | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>

          <el-table-column
            :label="isFR ? 'N° compte' : 'Account No.'"
            header-align="center"
            prop="account_no"
            width="120px"
          ></el-table-column>
          <el-table-column
            :label="isFR ? 'Intitulé' : 'Account Description'"
            header-align="center"
            prop="account_description"
          ></el-table-column>

          <el-table-column
            header-align="center"
            :label="isFR ? 'Solde N' : 'Balance N'"
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="debit_n"
              width="120px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.debit_n | fixedNum }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="credit_n"
              width="120px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.credit_n | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>
          <el-table-column
            header-align="center"
            :label="isFR ? 'Solde N-1' : 'Balance N-1'"
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="debit_n_1"
              width="120px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.debit_n_1 | fixedNum }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="credit_n_1"
              width="120px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.credit_n_1 | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>
        </el-table>
      </div>
      <div v-show="filterCondition.devise === GL_MULTIPLE" class="content">
        <el-table
          v-loading="isGettingTrialBalanceData"
          :data="formatTrialBalance"
          :height="windowHeight - 180"
          border
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            :label="
              isFR
                ? 'Cumul période devise originale'
                : 'Accumulated of the period in original currency'
            "
            header-align="center"
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="original_total_debit"
              width="100px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="row.type === 'italic' ? 'italic' : ''"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.original_total_debit | fixedNum }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="original_total_credit"
              width="100px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.original_total_credit | fixedNum }}
                </div>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            :label="
              isFR
                ? 'Cumul période devise locale'
                : 'Accumulated of the period in local currency'
            "
            header-align="center"
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="local_total_debit"
              width="95px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.local_total_debit | fixedNum }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="local_total_credit"
              width="95px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.local_total_credit | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>

          <el-table-column
            :label="isFR ? 'N° compte' : 'Account No.'"
            header-align="center"
            prop="account_no"
            width="100px"
          >
            <template slot-scope="{ row }">
              <div :class="row.type === 'italic' ? 'italic' : ''">
                {{ row.account_no | fixedNum }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :label="isFR ? 'Intitulé' : 'Account Description'"
            header-align="center"
            prop="account_description"
          >
            <template slot-scope="{ row }">
              <div :class="row.type === 'italic' ? 'italic' : ''">
                {{ row.account_description }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            :label="
              isFR ? 'Solde N devise originale' : 'Balance N original currency'
            "
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="original_debit_n"
              width="80px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.original_debit_n | fixedNum }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="original_credit_n"
              width="80px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.original_credit_n | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>

          <el-table-column
            header-align="center"
            :label="isFR ? 'Solde N devise locale' : 'Balance N local currency'"
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="local_debit_n"
              width="80px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.local_debit_n | fixedNum }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="local_credit_n"
              width="80px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.local_credit_n | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>

          <el-table-column
            header-align="center"
            :label="
              isFR
                ? 'Solde N-1 devise originale'
                : 'Balance N-1 original currency'
            "
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="original_debit_n_1"
              width="90px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.original_debit_n_1 | fixedNum }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="original_credit_n_1"
              width="90px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.original_credit_n_1 | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>

          <el-table-column
            header-align="center"
            :label="
              isFR ? 'Solde N-1 devise locale' : 'Balance N-1 local currency'
            "
          >
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="local_debit_n_1"
              width="90px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.local_debit_n_1 | fixedNum }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="local_credit_n_1"
              width="90px"
            >
              <template slot-scope="{ row }">
                <div
                  :class="[row.type === 'italic' ? 'italic' : '', 'link']"
                  @click="goToGenralLedger(row)"
                >
                  {{ row.local_credit_n_1 | fixedNum }}
                </div>
              </template></el-table-column
            >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import api from '@/api'
import {
  TRIAL_BALANCE,
  GL_SINGLE,
  GL_MULTIPLE
} from '@/constant/generalLedgerKey'
import { accountingItemsKey } from '@/constant/accountingEntriesKey'
import windowResizeMixin from '@/mixins/windowResizeMixin'
import { FR } from '@/constant/accountType'
import moment from 'moment'

export default {
  components: {
    SubHeader
  },
  filters: {
    fixedNum(num) {
      if (typeof num !== 'number') {
        return num
      }
      if (!num) {
        return num
      }
      return num.toFixed(2)
    }
  },
  mixins: [windowResizeMixin],
  data() {
    return {
      GL_SINGLE,
      GL_MULTIPLE,
      accountingItemsKey,

      filterCondition: {
        accountsFrom: 0,
        accountsTo: Infinity,
        date: [],
        devise: GL_MULTIPLE,
        analyticalItems: [],
        accountRange: [],
        accountTypeName: []
      },
      trialBalanceData: [],

      isGettingTrialBalanceData: false
    }
  },
  computed: {
    isFR() {
      return this.currentCompany.current_region === FR
    },
    currentCompany() {
      return this.$store.getters.currentCompany
    },
    formatTrialBalance() {
      let filterData = this.trialBalanceData
      if (
        this.filterCondition.accountRange &&
        this.filterCondition.accountRange.length > 0
      ) {
        filterData = filterData.filter((item) => {
          return this.filterCondition.accountRange.includes(item.account_no)
        })
      }

      if (
        this.filterCondition.accountTypeName &&
        this.filterCondition.accountTypeName
      ) {
        filterData = filterData.filter((item) => {
          return this.filterCondition.accountTypeName.includes(
            item.account_type_name
          )
        })
      }

      if (
        this.filterCondition.analyticalItems &&
        this.filterCondition.analyticalItems.length > 0
      ) {
        filterData = filterData.filter((item) => {
          return this.filterCondition.analyticalItems.some((key) => {
            return item[key]
          })
        })
      }

      if (this.filterCondition.devise === GL_MULTIPLE) {
        // 整理数据
        let newData = []
        filterData.forEach((item) => {
          item.paramsAccountNo = item.account_no
          item.local_total_credit = item.total_credit
          item.local_total_debit = item.total_debit
          item.local_debit_n = item.debit_n
          item.local_debit_n_1 = item.debit_n_1
          item.local_credit_n = item.credit_n
          item.local_credit_n_1 = item.credit_n_1
          newData.push(item)
          if (!item.multiple_total || !item.multiple_balance) {
            return
          }
          let rmbItem = {
            type: 'italic',
            ...item,
            account_no: '',
            paramsAccountNo: item.account_no,
            account_description: 'CNY',
            original_total_debit: item.multiple_total.RMB.original.total_debit,
            original_total_credit:
              item.multiple_total.RMB.original.total_credit,
            local_total_debit: item.multiple_total.RMB.local.total_debit,
            local_total_credit: item.multiple_total.RMB.local.total_credit,
            original_debit_n: item.multiple_balance.RMB.original_n.debit,
            original_credit_n: item.multiple_balance.RMB.original_n.credit,
            original_debit_n_1: item.multiple_balance.RMB.original_n_1.debit,
            original_credit_n_1: item.multiple_balance.RMB.original_n_1.credit,
            local_debit_n: item.multiple_balance.RMB.local_n.debit,
            local_credit_n: item.multiple_balance.RMB.local_n.credit,
            local_debit_n_1: item.multiple_balance.RMB.local_n_1.debit,
            local_credit_n_1: item.multiple_balance.RMB.local_n_1.credit
          }
          newData.push(rmbItem)
          let usdItem = {
            type: 'italic',
            ...item,
            account_no: '',
            paramsAccountNo: item.account_no,
            account_description: 'USD',
            original_total_debit: item.multiple_total.USD.original.total_debit,
            original_total_credit:
              item.multiple_total.USD.original.total_credit,
            local_total_debit: item.multiple_total.USD.local.total_debit,
            local_total_credit: item.multiple_total.USD.local.total_credit,
            original_debit_n: item.multiple_balance.USD.original_n.debit,
            original_credit_n: item.multiple_balance.USD.original_n.credit,
            original_debit_n_1: item.multiple_balance.USD.original_n_1.debit,
            original_credit_n_1: item.multiple_balance.USD.original_n_1.credit,
            local_debit_n: item.multiple_balance.USD.local_n.debit,
            local_credit_n: item.multiple_balance.USD.local_n.credit,
            local_debit_n_1: item.multiple_balance.USD.local_n_1.debit,
            local_credit_n_1: item.multiple_balance.USD.local_n_1.credit
          }
          newData.push(usdItem)
        })
        filterData = newData
      }
      return filterData
    }
  },
  created() {
    this.getAccountList()
    const { query, params } = this.$route
    if ([GL_SINGLE, GL_MULTIPLE].includes(params.devise)) {
      this.filterCondition.devise = params.devise
    }
    if (params.monthRange && params.monthRange.length === 2) {
      this.filterCondition.date = [
        moment(params.monthRange[0]),
        moment(params.monthRange[1])
      ]
    } else {
      this.filterCondition.date = [moment(), moment()]
    }
    this.filterCondition.analyticalItems = query.analyticalItems
      ? query.analyticalItems.toLocaleLowerCase().replace(' ', '_').split(',')
      : []
    if (query.accountTypeName) {
      const names = query.accountTypeName.split(',')
      if (names.length > 0 && names[0]) {
        this.filterCondition.accountTypeName = names
      }
    }
    this.getTrialBalance()
  },
  methods: {
    // 获取Account列表
    async getAccountList() {
      const res = await api.getAccountList(this.currentCompany.id)
      if (res.data.error_code === 0) {
        this.accountList = res.data.data
        let { accountsFrom, accountsTo } = this.$route.query
        accountsFrom = accountsFrom || 0
        accountsTo = accountsTo || Infinity
        this.filterCondition.accountsFrom = accountsFrom
        this.filterCondition.accountsTo = accountsTo
        const max = Math.max(accountsFrom, accountsTo)
        const min = Math.min(accountsFrom, accountsTo)
        const list = this.accountList.filter((item, index) => {
          return min <= index && index <= max
        })
        this.filterCondition.accountRange = list.map((item) => {
          return item.no
        })
      }
    },
    async getTrialBalance() {
      this.isGettingTrialBalanceData = true
      const res = await api.getGeneralLedger(
        this.currentCompany.id,
        moment(this.filterCondition.date[0]).format('YYYY-MM'),
        moment(this.filterCondition.date[1]).format('YYYY-MM'),
        TRIAL_BALANCE,
        this.filterCondition.devise.toLocaleLowerCase()
      )
      this.isGettingTrialBalanceData = false
      if (res.data.error_code === 0) {
        this.trialBalanceData = res.data.data
      }
    },
    goToGenralLedger(row) {
      this.$router.push({
        name: 'GeneralLedger',
        query: {
          accountsFrom: this.filterCondition.accountsFrom,
          accountsTo: this.filterCondition.accountsTo,
          analyticalItems: this.filterCondition.analyticalItems.join(','),
          accountNo: row.paramsAccountNo
        },
        params: {
          monthRange: this.filterCondition.date,
          devise: this.filterCondition.devise
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/customTableBorder.scss';

.trial-balance {
  .filter {
    .el-date-editor,
    .el-select {
      margin-right: 20px;
    }
  }
  .main {
    padding: 30px;
    /deep/ .el-table__header {
      th {
        background-color: #ededed;
        font-weight: bold;
        color: #303133;
        .cell {
          word-wrap: break-word;
          word-break: normal;
        }
      }
    }
    .content {
      overflow-y: scroll;
      width: 100%;
      .el-table {
        border-bottom: 1px solid #999;
        color: #303133;
        /deep/ .bold-row {
          font-size: 14px;
          font-weight: bold;
        }
        &:last-child {
          border-color: #ccc;
        }
        .italic {
          font-style: italic;
          color: #909399;
        }
        .link {
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}

/deep/ .el-table__body tr:hover td {
  background-color: rgba($color: #409eff, $alpha: 0.1);
}
</style>
