<template>
  <div class="accounting-entries">
    <SubHeader title="Accounting entries">
      <el-button class="plain-icon" plain size="medium">
        <svg-icon icon-class="export"></svg-icon>Export
      </el-button>
      <el-button @click="isFilterDrawerShow=true" class="primary-icon" size="medium" type="primary">
        <svg-icon icon-class="filter"></svg-icon>Filter
      </el-button>
    </SubHeader>
    <div class="main">
      <el-table
        :data="filterEntriesData"
        :row-class-name="tableRowClassName"
        @row-click="tableRowClick"
        border
        v-if="isMatchedDone"
        v-loading="isGettingEntries"
      >
        <el-table-column
          :key="index"
          :label="item.value"
          :prop="item.key"
          align="center"
          header-align="center"
          v-for="(item, index) in accountingEntriesKey"
          width="120px"
        ></el-table-column>
      </el-table>
      <div class="match-tip" v-else>
        <div class="tip">您有一些匹配尚未完成，请先完成匹配再来查看Accounting entries</div>
        <el-button @click="$router.push({ name: 'Mapping' })" type="primary">去匹配</el-button>
      </div>
    </div>

    <el-drawer :visible.sync="isFilterDrawerShow" :with-header="false">
      <div class="filter-container">
        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Accounts:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="12" align="middle" justify="space-between" type="flex">
              <el-col :span="4" class="from">From</el-col>
              <el-col :span="20">
                <el-input placeholder="Accounts" size="mini"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label"></el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="12" align="middle" justify="space-between" type="flex">
              <el-col :span="4" class="from">To</el-col>
              <el-col :span="20">
                <el-input placeholder="Accounts" size="mini"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Vendors:</el-col>
          <el-col :span="18" class="input">
            <el-input placeholder="Vendors" size="mini" v-model="tmpFilterCondition.vendors"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Customers:</el-col>
          <el-col :span="18" class="input">
            <el-input placeholder="Customers" size="mini" v-model="tmpFilterCondition.customers"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Period:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :span="4">From</el-col>
                  <el-col :span="18">
                    <el-date-picker align="right" placeholder="Start date" size="mini" type="date"></el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :offset="1" :span="3">To</el-col>
                  <el-col :span="18">
                    <el-date-picker align="right" placeholder="End date" size="mini" type="date"></el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Explanation:</el-col>
          <el-col :span="18" class="input">
            <el-input
              placeholder="Explanation"
              size="mini"
              v-model="tmpFilterCondition.explanation"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Voucher No.:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :span="4">From</el-col>
                  <el-col :span="18">
                    <el-input placeholder="Start No." size="mini"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :offset="1" :span="3">To</el-col>
                  <el-col :span="18">
                    <el-input placeholder="End No." size="mini"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Currency:</el-col>
          <el-col :span="18" class="input">
            <el-input
              clearable
              placeholder="Currency"
              size="mini"
              v-model="tmpFilterCondition.currency"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Currency amount:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :span="4">From</el-col>
                  <el-col :span="18">
                    <el-input placeholder="Min amount" size="mini" type="number"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :offset="1" :span="3">To</el-col>
                  <el-col :span="18">
                    <el-input placeholder="Max amount" size="mini" type="number"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Department:</el-col>
          <el-col :span="18" class="input">
            <el-input
              clearable
              placeholder="Department"
              size="mini"
              v-model="tmpFilterCondition.department"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Employee:</el-col>
          <el-col :span="18" class="input">
            <el-input
              clearable
              placeholder="Employee"
              size="mini"
              v-model="tmpFilterCondition.employee"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Other third party:</el-col>
          <el-col :span="18" class="input">
            <el-input
              clearable
              placeholder="Other third party"
              size="mini"
              v-model="tmpFilterCondition.otherThirdParty"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Project:</el-col>
          <el-col :span="18" class="input">
            <el-input
              clearable
              placeholder="Project"
              size="mini"
              v-model="tmpFilterCondition.project"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Invoice No.:</el-col>
          <el-col :span="18" class="input">
            <el-input
              clearable
              placeholder="Invoice No."
              size="mini"
              v-model="tmpFilterCondition.invoiceNo"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Iventory item:</el-col>
          <el-col :span="18" class="input">
            <el-input
              clearable
              placeholder="Iventory item"
              size="mini"
              v-model="tmpFilterCondition.iventoryItem"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="action" justify="space-between" type="flex">
          <el-col :span="6" class="label"></el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="20" type="flex">
              <el-col :span="12">
                <el-button class="full-width primary-icon" type="primary">
                  <svg-icon icon-class="filter"></svg-icon>Filter
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button class="full-width" plain>
                  <i class="el-icon-refresh"></i>
                  Reset
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <el-dialog :visible.sync="isAllVouchersShow" title="Journal Entry" width="1200px">
      <el-row align="middle" class="journal-header" justify="space-betweeen" type="flex">
        <el-col>
          Date
          <span>{{ allVouchers | formatDate }}</span>
        </el-col>
        <el-col class="right">
          Voucher No.
          <span>{{ allVouchers[0] && allVouchers[0].voucher_no }}</span>
        </el-col>
      </el-row>
      <el-table
        :data="allVouchers"
        :row-class-name="tableRowClassName"
        @row-click="showAccountingItems"
        height="600px"
      >
        <el-table-column
          :key="item.key"
          :label="item.value"
          :prop="item.key"
          align="center"
          header-align="center"
          v-for="item in journalEntryKey"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="isAccountingItemsShow" title="Accounting items" width="400px">
      <el-row class="accounting-items" v-for="item in accountingItemsKey" :key="item.key">
        <el-row class="header">{{ item.value + ':' }}</el-row>
        <el-row class="content">{{ currentVoucher[item.key] }}</el-row>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import {
	accountingEntriesKey,
	journalEntryKey,
	accountingItemsKey
} from '@/constant/accountingEntriesKey'
import api from '@/api'

export default {
	data() {
		return {
			accountingEntriesKey,
			journalEntryKey,
			accountingItemsKey,

			accountingEntriesData: [],
			// 是否正在获取entries数据
			isGettingEntries: false,

			// mapping中的内容是否已经全部匹配
			isMatchedDone: true,

			// filter侧边栏是否显示
			isFilterDrawerShow: false,
			// 临时过滤选项，点filter后确认筛选
			tmpFilterCondition: {
				accountsFrom: '',
				accountsTo: '',
				periodFrom: '',
				periodTo: '',
				voucherNoFrom: '',
				voucherNoTo: '',
				currencyAmountFrom: '',
				currencyAmountTo: '',

				vendors: '',
				customers: '',
				explanation: '',
				currentcy: '',
				department: '',
				employee: '',
				otherThirdParty: '',
				project: '',
				invoiceNo: '',
				iventoryItem: ''
			},
			// 实际的过滤选项
			filterCondition: {},

			// account 列表
			accountList: [],

			// 用户点击某一行凭证，显示dialog
			isAllVouchersShow: false,
			// 用户点击某一行凭证，显示的内容
      allVouchers: [],
      
      isAccountingItemsShow: false,
      currentVoucher: {}
		}
	},
	components: {
		SubHeader
	},
	filters: {
		formatDate(vouchers) {
			if (vouchers.length === 0) {
				return ''
			}

			let date = new Date(vouchers[0].date)
			let y = date.getFullYear()
			let m = date.getMonth() + 1
			m = m < 10 ? '0' + m : m
			let d = date.getDate()
			d = d < 10 ? '0' + d : d
			return `${d}/${m}/${y}`
		}
	},
	computed: {
		filterEntriesData() {
			return this.accountingEntriesData
		},
		currentCompany() {
			return this.$store.getters.currentCompany
		},
		currentType() {
			return this.$store.getters.currentType
		}
	},
	created() {
		this.getEntries()
	},
	methods: {
		tableRowClassName({ rowIndex }) {
			if (rowIndex % 2 !== 0) {
				return 'cursor highlight-row'
			}
			return 'cursor'
		},
		tableRowClick(row) {
			this.allVouchers = this.accountingEntriesData.filter(item => {
				return row.voucher_no === item.voucher_no && row.date === item.date
			})
			this.isAllVouchersShow = true
    },
    showAccountingItems(row) {
      let isAccountingItemsExisted = accountingItemsKey.some((item) => {
        return row[item.key] || row[item.key] === 0
      })
      if (!isAccountingItemsExisted) {
        this.$message.warning('当前凭证没有核算项目')
        return
      }

      this.isAccountingItemsShow = true
      this.currentVoucher = row
    },
		async getEntries() {
			this.isGettingEntries = true
			const res = await api.getEntries(this.currentCompany.id, this.currentType)
			this.isGettingEntries = false
			if (res.data.error_code === 0) {
				this.accountingEntriesData = res.data.data
			}
			if (res.data.error_code === 5000) {
				this.isMatchedDone = false
			}
		},
		// 获取Account列表
		async getAccountList() {
			const res = await api.getAccountList(
				this.currentCompany.id,
				this.currentType
			)
			if (res.data.error_code === 0) {
				this.accountList = res.data.data
			}
		}
	}
}
</script>

<style scoped lang="scss">
.accounting-entries {
	.el-button {
		width: 120px;
	}
	.main {
		padding: 30px;
		@import '../../styles/customTable.scss';
		/deep/ .el-table__header .cell {
			font-size: 16px;
		}
		.match-tip {
			text-align: center;
			.tip {
				margin-top: 100px;
			}
			.el-button {
				margin-top: 20px;
			}
		}
	}
}
/deep/ .el-drawer {
	overflow: auto;
	width: 700px !important;
}

.filter-container {
	padding: 30px 30px 40px;
	overflow-y: scroll;
	height: 100%;
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

	.action {
		margin-top: 30px;
		.full-width {
			width: 100%;
		}
	}
}

/deep/ .el-table__row.cursor {
	cursor: pointer;
}

.journal-header {
	font-weight: bold;
	margin-bottom: 10px;
	span {
		margin-left: 12px;
	}
	.right {
		text-align: right;
	}
}

.accounting-items {
  margin-bottom: 10px;
  .header {
    height: 24px;
    font-weight: 500;
    color: #303133;
  }
  .content {
    height: 24px;
    color: #303133;
  }
}
</style>