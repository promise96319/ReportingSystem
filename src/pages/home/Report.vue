<template>
  <div class="report">
    <SubHeader title="Reports">
      <el-button
        icon="el-icon-s-data"
        plain
        size="medium"
        @click="$router.push({ name: 'Home' })"
        >Dashboard</el-button
      >
      <el-button
        class="primary-icon"
        size="medium"
        type="primary"
        @click="isStepDialogShow = true"
      >
        <svg-icon icon-class="plus-square"></svg-icon>New data
      </el-button>
    </SubHeader>

    <div class="main">
      <div class="module module1" @click="showPeriodDialog(moduleOptions[0])">
        <div class="tip">{{ moduleOptions[0] }}</div>
        <div class="item1">Assets</div>
        <div class="item2">Liabities</div>
        <div class="item3">Equity</div>
      </div>
      <div class="module module2" @click="showPeriodDialog(moduleOptions[1])">
        <div class="tip">{{ moduleOptions[1] }}</div>
        <div class="item1">
          <div class="sales">Sales revenus</div>
          <div class="margin">Margin</div>
        </div>
        <div class="item2">Expenses</div>
        <div class="item3">Net income</div>
      </div>
      <div class="module module3" @click="showPeriodDialog(moduleOptions[2])">
        <div class="tip">{{ moduleOptions[2] }}</div>
        <div class="item1">Operating activities</div>
        <div class="item2">Investing activities</div>
        <div class="item3">Finacing activities</div>
        <div class="item4">Net Cash flow</div>
      </div>
      <div class="module module4" @click="showFilterDialog(moduleOptions[3])">
        <div class="tip">{{ moduleOptions[3] }}</div>
        <el-row :gutter="10" class="header">
          <el-col :span="12">
            <div>Account</div>
          </el-col>
          <el-col :span="6">
            <div>Debit</div>
          </el-col>
          <el-col :span="6">
            <div>Credit</div>
          </el-col>
        </el-row>
        <el-row
          v-for="(item, index) in accountOptions"
          :key="index"
          :gutter="10"
        >
          <el-col :span="12">
            <div>{{ item.value }}</div>
          </el-col>
          <el-col :span="6">
            <div v-if="index < 3">{{ item.number }}</div>
            <div v-else>0</div>
          </el-col>
          <el-col :span="6">
            <div v-if="index >= 3">{{ item.number }}</div>
            <div v-else>0</div>
          </el-col>
        </el-row>
      </div>
      <div class="module module5" @click="showFilterDialog(moduleOptions[4])">
        <div class="tip">{{ moduleOptions[4] }}</div>
        <div class="container">
          <div class="header">Account Receivable</div>
          <el-row :gutter="16">
            <el-col :span="16">
              <div>Sell 500 items</div>
            </el-col>
            <el-col :span="8">
              <div>2000</div>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="16">
              <div>Sell 200 items</div>
            </el-col>
            <el-col :span="8">
              <div>800</div>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="16">
              <div>Payment received</div>
            </el-col>
            <el-col :span="8">
              <div>-2000</div>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="16">
              <div>Goods return 300</div>
            </el-col>
            <el-col :span="8">
              <div>-800</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="isStepDialogShow" width="800px">
      <StepDialog></StepDialog>
    </el-dialog>

    <el-dialog
      :title="currentTitle"
      :visible.sync="isPeriodDialogShow"
      center
      width="400px"
    >
      <el-row :gutter="12" align="middle" type="flex">
        <el-col :span="4">Period:</el-col>
        <el-col :span="10">
          <el-select v-model="currentYear" @change="selectYear">
            <el-option
              v-for="item in YEAR_OPTIONS"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-select
            v-model="currentMonth"
            value-key="value"
            @change="selectMonth"
          >
            <el-option
              v-for="item in MONTH_OPTIONS"
              :key="item.key"
              :label="item.value"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goToReport">Confirm</el-button>
        <el-button @click="isPeriodDialogShow = false">Cancel</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="isFilterDialogShow" center width="520px">
      <el-row
        :gutter="20"
        align="middle"
        class="search-item"
        justify="space-between"
        type="flex"
      >
        <el-col :span="6" class="label">Accounts:</el-col>
        <el-col :span="18" class="input">
          <el-row
            :gutter="12"
            align="middle"
            justify="space-between"
            type="flex"
          >
            <el-col :span="4" class="from">From</el-col>
            <el-col :span="20">
              <el-select
                v-model="filterCondition.accountsFrom"
                clearable
                placeholder="Accounts"
                size="mini"
                value-key="no"
              >
                <el-option
                  v-for="(item, index) in accountList"
                  :key="item.no + item.name + index"
                  :label="item.no + '  ' + item.name"
                  :value="index"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- accounts 过滤 to -->
      <el-row
        :gutter="20"
        align="middle"
        class="search-item"
        justify="space-between"
        type="flex"
      >
        <el-col :span="6" class="label"></el-col>
        <el-col :span="18" class="input">
          <el-row
            :gutter="12"
            align="middle"
            justify="space-between"
            type="flex"
          >
            <el-col :span="4" class="from">To</el-col>
            <el-col :span="20">
              <el-select
                v-model="filterCondition.accountsTo"
                clearable
                placeholder="Accounts"
                size="mini"
                value-key="no"
              >
                <el-option
                  v-for="(item, index) in accountList"
                  :key="item.no + item.name + index"
                  :label="item.no + '  ' + item.name"
                  :value="index"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row
        :gutter="20"
        align="middle"
        type="flex"
        class="search-item"
        justify="space-between"
      >
        <el-col :span="6" class="label">Period:</el-col>
        <el-col :span="18">
          <el-date-picker
            v-model="filterCondition.monthRange"
            end-placeholder="End"
            range-separator="-"
            size="mini"
            start-placeholder="Start"
            type="monthrange"
            :clearable="false"
          >
            <!-- @change="getGeneralLedger" -->
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row
        :gutter="20"
        align="middle"
        type="flex"
        class="search-item"
        justify="space-between"
      >
        <el-col :span="6" class="label">Currency:</el-col>
        <el-col :span="18">
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
        </el-col>
      </el-row>

      <el-row
        :gutter="20"
        type="flex"
        class="search-item"
        justify="space-between"
      >
        <el-col :span="6" class="label">Analytical item:</el-col>
        <el-col :span="18">
          <el-checkbox-group v-model="filterCondition.analyticalItems">
            <el-checkbox
              v-for="item in accountingItemsKey"
              :key="item.key"
              :label="item.key"
            ></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goToReport">Confirm</el-button>
        <el-button @click="isFilterDialogShow = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import StepDialog from './components/StepDialog'
import { YEAR_OPTIONS, MONTH_OPTIONS } from '@/constant/dateOptions'
import { GL_SINGLE, GL_MULTIPLE } from '@/constant/generalLedgerKey'
import { accountingItemsKey } from '@/constant/accountingEntriesKey'
import api from '@/api'
import moment from 'moment'
export default {
  components: {
    SubHeader,
    StepDialog
  },
  data() {
    return {
      YEAR_OPTIONS,
      MONTH_OPTIONS,
      GL_SINGLE,
      GL_MULTIPLE,
      accountingItemsKey,

      isStepDialogShow: false,
      isPeriodDialogShow: false,
      isFilterDialogShow: false,
      // 模块名称
      moduleOptions: [
        'Balance sheet',
        'Profit & loss',
        'Cash flow statement',
        'Trial balance',
        'General ledger'
      ],
      // 模块4 选项数组
      accountOptions: [
        {
          key: '',
          value: 'Cash',
          number: 100
        },
        {
          key: '',
          value: 'Bank',
          number: 200
        },
        {
          key: '',
          value: 'Account receivable',
          number: 300
        },
        {
          key: '',
          value: 'Account payable',
          number: 200
        },
        {
          key: '',
          value: 'Tax payable',
          number: 100
        },
        {
          key: '',
          value: 'Capital',
          number: 200
        },
        {
          key: '',
          value: 'Undistribuated profit',
          number: 100
        }
      ],
      // 当前选择模块标题
      currentTitle: '',
      // 当前选择模块 年
      currentYear: '',
      // 当前选择模块 月
      currentMonth: {},

      accountList: [],
      filterCondition: {
        accountsFrom: '',
        accountsTo: '',
        monthRange: [],
        devise: GL_SINGLE,
        analyticalItems: []
      }
    }
  },
  computed: {
    currentCompany() {
      return this.$store.getters.currentCompany
    }
  },
  created() {
    this.getAccountList()
    this.getEntries()
  },
  methods: {
    async getEntries() {
      const res = await api.getEntries(this.currentCompany.id)
      if (res.data.error_code === 0) {
        let latestDate = moment().add(-10, 'year')
        this.accountingEntriesData = res.data.data.forEach((item) => {
          if (moment(item.date).isAfter(moment(latestDate))) {
            latestDate = item.date
          }
        })
        latestDate = latestDate ? moment(latestDate) : moment()
        this.currentYear = latestDate.year()
        this.currentMonth = this.MONTH_OPTIONS[11 - latestDate.month()]
      }
    },
    // 获取Account列表
    async getAccountList() {
      const res = await api.getAccountList(this.currentCompany.id)
      if (res.data.error_code === 0) {
        this.accountList = res.data.data
      }
    },
    showPeriodDialog(title) {
      this.currentTitle = title
      this.isPeriodDialogShow = true
    },
    showFilterDialog(title) {
      this.currentTitle = title
      this.isFilterDialogShow = true
    },
    selectYear(e) {
      this.currentYear = e
    },
    selectMonth(e) {
      this.currentMonth = e
    },
    goToReport() {
      switch (this.currentTitle) {
        case this.moduleOptions[0]:
          this.$router.push({
            name: 'BalanceSheet',
            query: {
              date: `${this.currentYear}-${this.currentMonth.key}`
            }
          })
          break
        case this.moduleOptions[1]:
          this.$router.push({
            name: 'ProfitAndLoss',
            query: {
              date: `${this.currentYear}-${this.currentMonth.key}`
            }
          })
          break
        case this.moduleOptions[2]:
          break
        // this.$router.push({ name: 'ProfitAndLoss' })
        // break
        case this.moduleOptions[3]:
          this.$router.push({
            name: 'TrialBalance',
            query: {
              accountsFrom: this.filterCondition.accountsFrom,
              accountsTo: this.filterCondition.accountsTo,
              analyticalItems: this.filterCondition.analyticalItems.join(',')
            },
            params: {
              monthRange: this.filterCondition.monthRange,
              devise: this.filterCondition.devise
            }
          })
          break
        case this.moduleOptions[4]:
          this.$router.push({
            name: 'GeneralLedger',
            query: {
              accountsFrom: this.filterCondition.accountsFrom,
              accountsTo: this.filterCondition.accountsTo,
              analyticalItems: this.filterCondition.analyticalItems.join(',')
            },
            params: {
              monthRange: this.filterCondition.monthRange,
              devise: this.filterCondition.devise
            }
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$color_gray: rgb(177, 195, 203);
$color_light_green: rgb(108, 178, 199);
$color_green: rgb(37, 158, 177);
$color_blue: rgb(94, 166, 214);

$border_radius: 12px;
$gap: 10px;

.content-center {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.report {
  .main {
    width: 1200px;
    margin: 60px auto;
    display: grid;
    grid-template-columns: repeat(3, 360px);
    grid-template-rows: repeat(2, 360px);
    gap: 40px 40px;
    place-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    // 所有模块样式
    .module {
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
      transition: 0.5s;
      cursor: pointer;
      position: relative;
      .tip {
        position: absolute;
        z-index: 99;
        top: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        color: #303133;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        height: 0;
        text-align: center;
        line-height: 60px;
        transition: all 0.2s;
        overflow: hidden;
        border-radius: 16px;
        font-size: 20px;
        font-weight: 500;
      }
      &:hover {
        box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.16);
        .tip {
          height: 60px;
        }
      }
    }
    // 模块1样式
    .module1 {
      display: grid;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: repeat(2, 50%);
      place-content: center;
      grid-gap: 10px;
      div {
        @extend .content-center;
        border-radius: $border_radius;
      }
      .item1 {
        grid-area: 1 / 1 / 3 / 2;
        background-color: $color_blue;
      }
      .item2 {
        background-color: $color_light_green;
      }
      .item3 {
        background-color: $color_green;
      }
    }
    .module2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 3fr 1fr;
      place-content: center;
      gap: 10px;
      div {
        @extend .content-center;
        border-radius: $border_radius;
      }
      .item1 {
        grid-area: 1 / 1 / 3 / 2;
        background-color: $color_gray;
        display: flex;
        flex-direction: column;
        .sales {
          flex: 1;
        }
        .margin {
          flex: 2;
          background-color: $color_blue;
        }
      }
      .item2 {
        background-color: $color_light_green;
      }
      .item3 {
        background-color: $color_green;
      }
    }
    .module3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 2fr 1fr;
      place-content: center;
      gap: 10px;
      div {
        @extend .content-center;
        border-radius: $border_radius;
      }
      .item1 {
        font-size: 16px;
        background-color: $color_light_green;
      }
      .item2 {
        font-size: 16px;
        background-color: $color_green;
      }
      .item3 {
        font-size: 16px;
        background-color: $color_blue;
      }
      .item4 {
        grid-area: 2 / 1 / 3 / 4;
        background-color: $color_gray;
      }
    }
    .module4 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
      text-align: center;
      .el-row {
        .el-col div {
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          background-color: $color_light_green;
        }
        .el-col:first-child div {
          background-color: $color_blue;
        }
        .el-col:last-child div {
          background-color: $color_green;
        }
        &.header {
          font-size: 16px;
          font-weight: 500;
          .el-col div {
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            background-color: $color_gray;
          }
        }
      }
    }
    .module5 {
      .container {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 16px;
        background-color: $color_gray;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        .header {
          text-align: left;
        }
        .el-col div {
          font-size: 16px;
          height: 36px;
          line-height: 36px;
          border-radius: 18px;
        }
        .el-col:first-child div {
          background-color: $color_blue;
        }
        .el-col:last-child div {
          background-color: $color_green;
        }
      }
    }
  }
}

.search-item {
  margin-bottom: 16px;
  .label {
    font-weight: 600;
  }
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
