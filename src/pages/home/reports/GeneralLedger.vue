<template>
  <div class="general-ledger">
    <SubHeader :is-back="true" title="General ledger">
      <div class="filter">
        {{ isFR ? 'Période' : 'Period' }} :
        <el-date-picker
          v-model="filterCondition.date"
          :end-placeholder="isFR ? 'Au' : 'End'"
          range-separator="-"
          size="mini"
          :start-placeholder="isFR ? 'Du' : 'Start'"
          type="monthrange"
          :clearable="false"
          @change="getGeneralLedger"
        >
        </el-date-picker>
        Devise :
        <el-select v-model="filterCondition.devise" size="mini">
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
      <div v-if="filterCondition.devise === GL_SINGLE" class="local">
        <el-table
          :data="[]"
          border
          class="header"
          height="36"
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            v-for="item in generalKey"
            :key="item.key"
            :label="isFR ? item.fr_label : item.label"
            :width="item.width"
            header-align="center"
          ></el-table-column>
        </el-table>
        <div
          v-loading="isGettingGeneralLedgerData"
          :style="{ height: windowHeight - 216 + 'px' }"
          class="content"
        >
          <el-table
            v-for="(data, index) in formatGenralLedger"
            :key="index"
            :data="data.entries"
            :row-class-name="boldRowClass"
            :show-header="false"
            :span-method="arraySpanMethod"
            border
            size="mini"
            style="width: 100%;"
          >
            <el-table-column
              v-for="item in generalKey"
              :key="item.key"
              :width="item.width"
              :align="item.align"
            >
              <template slot-scope="scope">
                <template v-if="item.key === 'date'">
                  {{ scope.row[item.key] | filterDateInTable }}
                </template>
                <template v-else>
                  {{ scope.row[item.key] }}
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-else class="mutiple">
        <el-table
          :data="[]"
          border
          class="header"
          height="60"
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            v-for="item in generalKey"
            :key="item.key"
            :label="isFR ? item.fr_label : item.label"
            :width="item.width"
            header-align="center"
          ></el-table-column>
        </el-table>
        <div
          v-loading="isGettingGeneralLedgerData"
          :style="{ height: windowHeight - 216 + 'px' }"
          class="content"
        >
          <el-table
            v-for="(data, index) in formatGenralLedger"
            :key="index"
            :data="data.entries"
            :row-class-name="boldRowClass"
            :show-header="false"
            :span-method="arraySpanMethod"
            border
            size="mini"
            style="width: 100%;"
          >
            <el-table-column
              v-for="item in generalKey"
              :key="item.key"
              :width="item.width"
              :align="item.align"
            >
              <template slot-scope="scope">
                <template v-if="item.key === 'date'">
                  {{ scope.row[item.key] | filterDateInTable }}
                </template>
                <template
                  v-else-if="
                    item.key === 'balance_originale' ||
                    item.key === 'balance_locale'
                  "
                >
                  {{ scope.row.balance }}
                </template>
                <template
                  v-else-if="
                    item.key === 'debit_amount' || item.key === 'credit_amount'
                  "
                >
                  <div v-if="scope.row.is_first || scope.row.is_last">
                    {{ scope.row[item.key] }}
                  </div>
                  <div v-else class="link">
                    {{ scope.row[item.key] }}
                  </div>
                </template>
                <template v-else>
                  {{ scope.row[item.key] }}
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import api from '@/api'
import {
  GENERAL_LEDGER,
  GL_SINGLE,
  GL_MULTIPLE,
  localeGeneralLedgerKey,
  multipleGeneralLedgerKey
} from '@/constant/generalLedgerKey'
import windowResizeMixin from '@/mixins/windowResizeMixin'
import { FR } from '@/constant/accountType'
import moment from 'moment'

export default {
  components: {
    SubHeader
  },
  filters: {
    filterDateInTable(date) {
      if (!date) return ''
      return moment(date).format('YYYY/MM/DD')
    }
  },
  mixins: [windowResizeMixin],
  data() {
    return {
      FR,
      GL_SINGLE,
      GL_MULTIPLE,
      localeGeneralLedgerKey,
      multipleGeneralLedgerKey,

      filterCondition: {
        date: [],
        devise: GL_MULTIPLE,
        analyticalItems: '',
        accountRange: []
      },

      generalLedgerData: [],
      isGettingGeneralLedgerData: false,
      accountList: []
    }
  },
  computed: {
    currentCompany() {
      return this.$store.getters.currentCompany
    },
    isFR() {
      return this.currentCompany.current_region === FR
    },
    generalKey() {
      return this.filterCondition.devise === GL_SINGLE
        ? localeGeneralLedgerKey
        : multipleGeneralLedgerKey
    },
    // 在第一行添加 no，balance，核算项目等
    // 在最后一行添加统计
    formatGenralLedger() {
      return this.generalLedgerData.map((item) => {
        item.entries = [
          {
            // invoice_no: item.account.no,
            // voucher_no: '',
            // 是否是第一列
            is_first: true,
            invoice_no: item.entries[0].account_no,
            voucher_no: item.account.name,
            balance: item.balance
          },
          ...item.entries,
          {
            voucher_no: 'Total',
            debit_amount: item.total.debit_amount,
            credit_amount: item.total.credit_amount,
            // 是否是最后一列
            is_last: true
          }
        ]
        return item
      })
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
      this.filterCondition.date = [moment().add(-12, 'month'), moment()]
    }
    this.filterCondition.analyticalItems = query.analyticalItems || ''

    // 默认本月
    this.getGeneralLedger()
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
        const max = Math.max(accountsFrom, accountsTo)
        const min = Math.min(accountsFrom, accountsTo)
        this.filterCondition.accountRange = this.accountList.filter(
          (item, index) => {
            return min <= index && index <= max
          }
        )
      }
    },
    async getGeneralLedger() {
      this.isGettingGeneralLedgerData = true
      const res = await api.getGeneralLedger(
        this.currentCompany.id,
        moment(this.filterCondition.date[0]).format('YYYY-MM'),
        moment(this.filterCondition.date[1]).format('YYYY-MM'),
        GENERAL_LEDGER,
        this.filterCondition.devise.toLocaleLowerCase()
      )
      this.isGettingGeneralLedgerData = false
      if (res.data.error_code === 0) {
        this.generalLedgerData = res.data.data.filter((item) => {
          return item && item.entries && item.entries.length > 0
        })
      }
    },
    // 合并单元格
    arraySpanMethod({ row, columnIndex }) {
      if (row.is_first || row.is_last) {
        if (columnIndex === 2) {
          return [1, 2]
        } else if (columnIndex === 3) {
          return [0, 0]
        }
      }
    },
    // 加粗行
    boldRowClass({ row }) {
      if (row.is_first || row.is_last) {
        return 'bold-row'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/customTableBorder.scss';

.general-ledger {
  .filter {
    .el-date-editor,
    .el-select {
      margin-right: 20px;
    }
  }
  .main {
    padding: 30px;
    /deep/ .header {
      .el-table__header th {
        background-color: #ededed;
        color: #303133;
        font-weight: bold;
        .cell {
          height: 100%;
          word-wrap: break-word;
          word-break: normal;
        }
      }
    }
    .content {
      overflow: scroll;
      .el-table {
        border-bottom: 1px solid #000;
        color: #303133;
        /deep/ .bold-row {
          font-size: 14px;
          font-weight: bold;
        }
        &:last-child {
          border-color: #ccc;
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
