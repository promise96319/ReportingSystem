<template>
  <div class="profit-loss">
    <SubHeader :is-back="true" title="Balance sheet">
      <el-date-picker
        v-model="selectedDate"
        :clearable="false"
        placeholder="Select date"
        size="mini"
        type="month"
        @change="getProfitAndLoss"
      ></el-date-picker>
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
      <div class="content">
        <el-table
          v-loading="isGettingData"
          :data="justifyBalanceSheetData"
          :height="windowHeight - 180"
          border
          size="mini"
          style="width: 100%;"
          :span-method="spanMethod"
        >
          <el-table-column :label="isFR ? 'ACTIF' : 'ASSETS'">
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.actif &&
                  scope.row.actif.name &&
                  scope.row.actif.name.includes('\n')
                "
              >
                <div>{{ scope.row.actif.name.split('\n')[0] }}</div>
                <div :class="classFilter(scope.$index, tables.ACTIF.row1)">
                  {{ scope.row.actif.name.split('\n')[1] }}
                </div>
              </div>
              <div v-else :class="classFilter(scope.$index, tables.ACTIF.row1)">
                {{ scope.row.actif && scope.row.actif.name }}
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right" header-align="center" width="160">
            <template slot="header" slot-scope="scope">
              <div class="link">{{ currentMonth }}</div>
            </template>
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.actif &&
                  scope.row.actif.name &&
                  scope.row.actif.name.includes('\n')
                "
                @click="goToTrialBalance(scope.$index, tables.ACTIF.row2)"
              >
                <div class="empty">empty</div>
                <div :class="classFilter(scope.$index, tables.ACTIF.row2)">
                  {{
                    (scope.row.actif.amount && scope.row.actif.amount[0])
                      | fixedNum
                  }}
                </div>
              </div>
              <div
                v-else
                :class="classFilter(scope.$index, tables.ACTIF.row2)"
                @click="goToTrialBalance(scope.$index, tables.ACTIF.row2)"
              >
                {{
                  (scope.row.actif &&
                    scope.row.actif.amount &&
                    scope.row.actif.amount[1]) | fixedNum
                }}
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right" header-align="center" width="160">
            <template slot="header" slot-scope="scope">
              <div class="link">{{ lastYear }}</div>
            </template>
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.actif &&
                  scope.row.actif.name &&
                  scope.row.actif.name.includes('\n')
                "
                @click="goToTrialBalance(scope.$index, tables.ACTIF.row2)"
              >
                <div class="empty">empty</div>
                <div :class="classFilter(scope.$index, tables.ACTIF.row2)">
                  {{
                    (scope.row.actif.amount && scope.row.actif.amount[1])
                      | fixedNum
                  }}
                </div>
              </div>
              <div
                v-else
                :class="classFilter(scope.$index, tables.ACTIF.row2)"
                @click="goToTrialBalance(scope.$index, tables.ACTIF.row2)"
              >
                {{
                  (scope.row.actif &&
                    scope.row.actif.amount &&
                    scope.row.actif.amount[1]) | fixedNum
                }}
              </div>
            </template>
          </el-table-column>

          <el-table-column :label="isFR ? 'PASSIF' : 'LIABILITIES & EQUITY'">
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.passif &&
                  scope.row.passif.name &&
                  scope.row.passif.name.includes('\n')
                "
              >
                <template v-if="scope.$index !== 10">
                  <div>{{ scope.row.passif.name.split('\n')[0] }}</div>
                  <div>{{ scope.row.passif.name.split('\n')[1] }}</div>
                </template>
                <template v-else>
                  <div class="empty">empty</div>
                  <div>{{ scope.row.passif.name.split('\n')[1] }}</div>
                  <div>{{ scope.row.passif.name.split('\n')[2] }}</div>
                </template>
              </div>
              <div
                v-else
                :class="classFilter(scope.$index, tables.PASSIF.row1)"
              >
                {{ scope.row.passif && scope.row.passif.name }}
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right" header-align="center" width="160">
            <template slot="header" slot-scope="scope">
              <div class="link">{{ currentMonth }}</div>
            </template>
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.passif &&
                  scope.row.passif.name &&
                  scope.row.passif.name.includes('\n')
                "
                @click="goToTrialBalance(scope.$index, tables.PASSIF.row2)"
              >
                <div class="empty">empty</div>
                <div v-if="scope.$index === 10" class="empty">empty</div>

                <div :class="classFilter(scope.$index, tables.PASSIF.row2)">
                  {{
                    (scope.row.passif.amount && scope.row.passif.amount[0])
                      | fixedNum
                  }}
                </div>
              </div>
              <div
                v-else
                :class="classFilter(scope.$index, tables.PASSIF.row2)"
                @click="goToTrialBalance(scope.$index, tables.PASSIF.row2)"
              >
                {{
                  (scope.row.passif &&
                    scope.row.passif.amount &&
                    scope.row.passif.amount[0]) | fixedNum
                }}
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right" header-align="center" width="160">
            <template slot="header" slot-scope="scope">
              <div class="link">{{ lastYear }}</div>
            </template>
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.passif &&
                  scope.row.passif.name &&
                  scope.row.passif.name.includes('\n')
                "
                @click="goToTrialBalance(scope.$index, tables.PASSIF.row2)"
              >
                <div class="empty">empty</div>
                <div v-if="scope.$index === 10" class="empty">empty</div>

                <div :class="classFilter(scope.$index, tables.PASSIF.row2)">
                  {{
                    (scope.row.passif.amount && scope.row.passif.amount[1])
                      | fixedNum
                  }}
                </div>
              </div>
              <div
                v-else
                :class="classFilter(scope.$index, tables.PASSIF.row2)"
                @click="goToTrialBalance(scope.$index, tables.PASSIF.row2)"
              >
                {{
                  (scope.row.passif &&
                    scope.row.passif.amount &&
                    scope.row.passif.amount[1]) | fixedNum
                }}
              </div>
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
import windowResizeMixin from '@/mixins/windowResizeMixin'
import { FR, EN, CN } from '@/constant/accountType'
import {
  monthOptions,
  BALANCE_SHEET,
  GL_SINGLE
} from '@/constant/generalLedgerKey'
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
      balanceSheetData: {},
      selectedDate: '',
      isGettingData: true,
      tables: {
        ACTIF: {
          row1: {
            italic: [1, 2, 4, 5, 7, 8],
            separate: [0, 10],
            bold: [9, 18, 20],
            normal: [],
            link: []
          },
          row2: {
            click: [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18
            ],
            italic: [1, 2, 4, 5, 7, 8],
            separate: [0, 10],
            bold: [9, 18, 20],
            normal: [3, 6],
            link: [10, 11, 12, 13, 14, 15, 16, 17, 19]
          }
        },
        PASSIF: {
          row1: {
            bold: [7, 18, 20]
          },
          row2: {
            toPL: 4,
            click: [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19
            ],
            bold: [7, 18, 20],
            link: [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              19
            ]
          }
        }
      }
    }
  },
  computed: {
    justifyBalanceSheetData() {
      let result = []
      let passif = this.balanceSheetData.PASSIF
      if (passif) {
        // todo 对passif做处理
        passif.splice(8, 0, {})
        passif.splice(11, 0, {})
      }
      let actif = this.balanceSheetData.ACTIF
      console.log(actif, 'actif')
      if (actif) {
        // todo 对passif做处理
        actif.forEach((item, index) => {
          let row = {
            actif: item,
            passif: passif[index]
          }
          result.push(row)
        })
      }
      return result
    },
    currentCompany() {
      return this.$store.getters.currentCompany
    },
    currentMonth() {
      const date = moment(this.selectedDate).endOf('month')
      const year = moment(date).year()
      const day = moment(date).date()
      return `${day}/${this.formatMonth(date)}/${year}`
    },
    lastYear() {
      let date = moment(this.selectedDate).endOf('year')
      date = moment(date).add(-1, 'year')
      const year = moment(date).year()
      const day = moment(date).date()
      return `${day}/${this.formatMonth(date)}/${year}`
    },
    isFR() {
      return this.currentCompany.current_region === FR
    }
  },
  created() {
    if (this.$route.query.date) {
      this.selectedDate = this.$route.query.date
    } else {
      this.selectedDate = moment()
    }

    this.getProfitAndLoss()
  },
  methods: {
    spanMethod({ rowIndex, columnIndex }) {
      if (rowIndex === 10 && columnIndex === 3) {
        return {
          rowspan: 2,
          colspan: 1
        }
      }

      if (rowIndex === 10 && columnIndex === 4) {
        return {
          rowspan: 2,
          colspan: 1
        }
      }

      if (rowIndex === 10 && columnIndex === 5) {
        return {
          rowspan: 2,
          colspan: 1
        }
      }
    },
    classFilter(rowIndex, tables) {
      const { italic, bold, link, click } = tables
      let other = ''
      if (click && click.includes(rowIndex)) {
        other = ' click'
      }
      if (italic && italic.includes(rowIndex)) {
        return 'italic' + other
      }
      if (bold && bold.includes(rowIndex)) {
        return 'bold' + other
      }
      if (link && link.includes(rowIndex)) {
        return 'link' + other
      }
      return 'normal' + other
    },
    formatMonth(date) {
      const monthIndex = moment(date).month()
      switch (this.currentCompany.current_region) {
        case CN:
          return monthOptions['cn'][monthIndex]
        case FR:
          return monthOptions['fr'][monthIndex]

        default:
          return monthOptions['en'][monthIndex]
      }
    },
    async getProfitAndLoss() {
      this.isGettingData = true
      const res = await api.getGeneralLedger(
        this.currentCompany.id,
        moment(this.selectedDate).format('YYYY-MM'),
        moment(this.selectedDate).format('YYYY-MM'),
        BALANCE_SHEET
      )
      this.isGettingData = false
      if (res.data.error_code === 0) {
        if (res.data.data['ASSETS'] && res.data.data['LIABILITIES & EQUITY']) {
          console.log(1)
          this.$set(this.balanceSheetData, 'ACTIF', res.data.data['ASSETS'])
          this.$set(
            this.balanceSheetData,
            'PASSIF',
            res.data.data['LIABILITIES & EQUITY']
          )
        } else {
          this.balanceSheetData = res.data.data
        }
      }
    },
    goToTrialBalance(rowIndex, tableRow) {
      if (!tableRow.click || !tableRow.click.includes(rowIndex)) {
        return
      }
      if (tableRow.toPL && tableRow.toPL === rowIndex) {
        this.goToProfitAndLoss()
        return
      }
      this.$router.push({
        name: 'TrialBalance',
        params: {
          monthRange: [this.selectedDate, this.selectedDate],
          devise: GL_SINGLE
        }
      })
    },
    goToProfitAndLoss() {
      this.$router.push({
        name: 'ProfitAndLoss',
        query: {
          date: moment(this.selectedDate).format('yyyy-MM')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/customTableBorder.scss';

.profit-loss {
  .el-date-editor {
    margin-right: 20px;
    width: 160px;
  }
  .main {
    padding: 30px;
    /deep/ .el-table__header {
      th {
        background-color: #ededed;
        color: #303133;
        font-weight: bold;
      }
    }
    .content {
      overflow: scroll;
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
      }
      .empty {
        visibility: hidden;
      }
      .bold {
        font-weight: 500;
        font-size: 14px;
      }
      .italic {
        font-style: italic;
        color: #909399;
        font-size: 12px;
      }
      .link {
        color: #409eff;
      }
      .normal {
        color: #303133;
      }
      .click {
        cursor: pointer;
      }
    }
  }
}

/deep/ .el-table__body tr:hover td {
  background-color: rgba($color: #409eff, $alpha: 0.1);
}

.date-picker {
  width: 100%;
}
</style>
