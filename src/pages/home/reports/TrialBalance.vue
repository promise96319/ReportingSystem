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
      <div class="content">
        <el-table
          v-loading="isGettingTrialBalanceData"
          :data="trialBalanceData"
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
            ></el-table-column>
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="total_credit"
              width="120px"
            ></el-table-column>
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

          <el-table-column header-align="center" label="Solde N">
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="debit_n"
              width="120px"
            ></el-table-column>
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="credit_n"
              width="120px"
            ></el-table-column>
          </el-table-column>
          <el-table-column header-align="center" label="Solde N-1">
            <el-table-column
              :label="isFR ? 'Débiteur' : 'Debit'"
              align="right"
              header-align="center"
              prop="debit_n_1"
              width="120px"
            ></el-table-column>
            <el-table-column
              :label="isFR ? 'Créditeur' : 'Credit'"
              align="right"
              header-align="center"
              prop="credit_n_1"
              width="120px"
            ></el-table-column>
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
import windowResizeMixin from '@/mixins/windowResizeMixin'
import { FR } from '@/constant/accountType'
import moment from 'moment'

export default {
  components: {
    SubHeader
  },
  mixins: [windowResizeMixin],
  data() {
    return {
      GL_SINGLE,
      GL_MULTIPLE,
      filterCondition: {
        date: [],
        devise: GL_SINGLE
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
    }
  },
  created() {
    this.filterCondition.date = [moment().add(-1, 'month'), moment()]
    this.getTrialBalance()
  },
  methods: {
    async getTrialBalance() {
      this.isGettingTrialBalanceData = true
      const res = await api.getGeneralLedger(
        this.currentCompany.id,
        moment(this.filterCondition.date[0]).format('YYYY-MM'),
        moment(this.filterCondition.date[1]).format('YYYY-MM'),
        TRIAL_BALANCE,
        GL_SINGLE.toLocaleLowerCase()
      )
      this.isGettingTrialBalanceData = false
      if (res.data.error_code === 0) {
        this.trialBalanceData = res.data.data.concat(
          res.data.data,
          res.data.data,
          res.data.data
        )
      }
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
    }
  }
}

/deep/ .el-table__body tr:hover td {
  background-color: rgba($color: #409eff, $alpha: 0.1);
}
</style>
