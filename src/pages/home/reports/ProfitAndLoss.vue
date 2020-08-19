<template>
  <div class="profit-loss">
    <SubHeader :is-back="true" title="Profit and loss">
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
          :data="profitAndLossData"
          :height="windowHeight - 180"
          border
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            :label="isFR ? 'COMPTE DE RESULTAT' : 'PROFIT & LOSS'"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.add_index" class="bold">
                {{ scope.row.name }}
              </div>
              <div v-else-if="scope.row.name.includes('\n')">
                <div class="bold">{{ scope.row.name.split('\n')[0] }}</div>
                <div>{{ scope.row.name.split('\n')[1] }}</div>
              </div>
              <div v-else>{{ scope.row.name }}</div>
            </template>
          </el-table-column>

          <el-table-column align="right" header-align="center" width="160">
            <template slot="header" slot-scope="scope">
              <div class="link">{{ currentMonth }}</div>
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.add_index" class="bold">
                {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
              </div>
              <div v-else-if="scope.row.name.includes('\n')">
                <div class="empty">empty</div>
                <div
                  class="link"
                  @click="
                    goToTrialBalance(
                      scope.row.account_type_name,
                      moment(selectedDate).format('yyyy-MM'),
                      moment(selectedDate).format('yyyy-MM')
                    )
                  "
                >
                  {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
                </div>
              </div>
              <div
                v-else
                class="link"
                @click="
                  goToTrialBalance(
                    scope.row.account_type_name,
                    moment(selectedDate).format('yyyy-MM'),
                    moment(selectedDate).format('yyyy-MM')
                  )
                "
              >
                {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right" header-align="center" width="160">
            <template slot="header" slot-scope="scope">
              <div class="link">{{ currentYear }}</div>
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.add_index" class="bold">
                {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
              </div>
              <div v-else-if="scope.row.name.includes('\n')">
                <div class="empty">empty</div>
                <div
                  class="link"
                  @click="
                    goToTrialBalance(
                      scope.row.account_type_name,
                      moment(selectedDate).startOf('year').format('yyyy-MM'),
                      moment(selectedDate).format('yyyy-MM')
                    )
                  "
                >
                  {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
                </div>
              </div>
              <div
                v-else
                class="link"
                @click="
                  goToTrialBalance(
                    scope.row.account_type_name,
                    moment(selectedDate).startOf('year').format('yyyy-MM'),
                    moment(selectedDate).format('yyyy-MM')
                  )
                "
              >
                {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
              </div>
            </template>
          </el-table-column>

          <el-table-column align="right" header-align="center" width="160">
            <template slot="header" slot-scope="scope">
              <div class="link">{{ lastYear }}</div>
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.add_index" class="bold">
                {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
              </div>
              <div v-else-if="scope.row.name.includes('\n')">
                <div class="empty">empty</div>
                <div
                  class="link"
                  @click="
                    goToTrialBalance(
                      scope.row.account_type_name,
                      moment(selectedDate)
                        .add(-1, 'year')
                        .startOf('year')
                        .format('yyyy-MM'),
                      moment(selectedDate)
                        .add(-1, 'year')
                        .endOf('year')
                        .format('yyyy-MM')
                    )
                  "
                >
                  {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
                </div>
              </div>
              <div
                v-else
                class="link"
                @click="
                  goToTrialBalance(
                    scope.row.account_type_name,
                    moment(selectedDate)
                      .add(-1, 'year')
                      .startOf('year')
                      .format('yyyy-MM'),
                    moment(selectedDate)
                      .add(-1, 'year')
                      .endOf('year')
                      .format('yyyy-MM')
                  )
                "
              >
                {{ (scope.row.amount && scope.row.amount[0]) | fixedNum }}
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
  PROFIT_AND_LOSS,
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
      profitAndLossData: [],
      selectedDate: '',
      isGettingData: true
    }
  },
  computed: {
    currentCompany() {
      return this.$store.getters.currentCompany
    },
    currentMonth() {
      const year = moment(this.selectedDate).year()
      const month = moment(this.selectedDate).month()

      switch (this.currentCompany.current_region) {
        case CN:
          return monthOptions['cn'][month] + ' ' + year
        case FR:
          return monthOptions['fr'][month] + ' ' + year
        default:
          return monthOptions['en'][month] + ' ' + year
      }
    },
    currentYear() {
      const year = moment(this.selectedDate).year()
      if (this.isFR) {
        return `Exercice ${year}`
      } else {
        return `Y ${year}`
      }
    },
    lastYear() {
      const year = moment(this.selectedDate).year()
      if (this.isFR) {
        return `Exercice ${year - 1}`
      } else {
        return `Y ${year - 1}`
      }
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
    moment(time) {
      return moment(time)
    },
    async getProfitAndLoss() {
      this.isGettingData = true
      const res = await api.getGeneralLedger(
        this.currentCompany.id,
        moment(this.selectedDate).format('YYYY-MM'),
        moment(this.selectedDate).format('YYYY-MM'),
        PROFIT_AND_LOSS
      )
      this.isGettingData = false
      if (res.data.error_code === 0) {
        this.profitAndLossData = res.data.data
      }
    },
    goToTrialBalance(accountTypeName, accountsFrom, accountsTo) {
      const name = accountTypeName.join(',')
      this.$router.push({
        name: 'TrialBalance',
        query: {
          accountTypeName: name
        },
        params: {
          monthRange: [accountsFrom, accountsTo],
          devise: GL_SINGLE
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
        .link {
          cursor: text;
        }
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
      .link {
        color: #409eff;
        cursor: pointer;
      }
      .bold {
        font-weight: 500;
        font-size: 14px;
        color: #303133;
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
