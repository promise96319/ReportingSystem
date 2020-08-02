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
        ></el-date-picker
        >Devise :
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
      <el-table
        :data="[]"
        border
        class="header"
        height="36"
        size="mini"
        style="width: 100%;"
      >
        <el-table-column
          v-for="item in localeGeneralLedgerKey"
          :key="item.key"
          :label="isFR ? item.fr_label : item.label"
          :width="item.width"
        ></el-table-column>
      </el-table>
      <div
        v-loading="isGettingGeneralLedgerData"
        :style="{ height: windowHeight - 216 + 'px' }"
        class="content"
      >
        <el-table
          v-for="(data, index) in formatSingleGenralLedger"
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
            v-for="item in localeGeneralLedgerKey"
            :key="item.key"
            :width="item.width"
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
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import api from '@/api'
import {
  GENERAL_LEDGER,
  GL_SINGLE,
  GL_MULTIPLE,
  localeGeneralLedgerKey
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

      filterCondition: {
        date: [],
        devise: GL_SINGLE
      },

      localeGeneralLedgerData: [],
      isGettingGeneralLedgerData: false
    }
  },
  computed: {
    currentCompany() {
      return this.$store.getters.currentCompany
    },
    isFR() {
      return this.currentCompany.current_region === FR
    },
    // 在第一行添加 no，balance，核算项目等
    // 在最后一行添加统计
    formatSingleGenralLedger() {
      return this.localeGeneralLedgerData.map((item) => {
        item.entries = [
          {
            // invoice_no: item.account.no,
            // voucher_no: '',
            // 是否是第一列
            is_first: true,
            invoice_no: item.account.no,
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
    this.filterCondition.date = [moment().add(-1, 'month'), moment()]
    this.getGeneralLedger()
  },
  methods: {
    async getGeneralLedger() {
      this.isGettingGeneralLedgerData = true
      const res = await api.getGeneralLedger(
        this.currentCompany.id,
        moment(this.filterCondition.date[0]).format('YYYY-MM'),
        moment(this.filterCondition.date[1]).format('YYYY-MM'),
        GENERAL_LEDGER,
        GL_SINGLE.toLocaleLowerCase()
      )
      this.isGettingGeneralLedgerData = false
      if (res.data.error_code === 0) {
        this.localeGeneralLedgerData = res.data.data
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
    /deep/ .header .el-table__header {
      th {
        background-color: #ededed;
        color: #303133;
        font-weight: bold;
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
      }
    }
  }
}

/deep/ .el-table__body tr:hover td {
  background-color: rgba($color: #409eff, $alpha: 0.1);
}
</style>
