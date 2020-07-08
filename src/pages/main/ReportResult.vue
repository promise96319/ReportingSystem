<template>
  <div class="accounting-entries">
    <SubHeader title="Accounting entries">
      <el-button
        :loading="isExportingToExcel"
        @click="exportToExcel"
        class="plain-icon"
        plain
        size="medium"
      >
        <svg-icon icon-class="export"></svg-icon>Export
      </el-button>
      <el-button @click="isFilterDrawerShow=true" class="primary-icon" size="medium" type="primary">
        <svg-icon icon-class="filter"></svg-icon>Filter
      </el-button>
    </SubHeader>
    <div class="main">
      <el-table
        :data="filterEntriesData"
        :max-height="windowHeight - 180"
        :row-class-name="tableRowClassName"
        @row-click="tableRowClick"
        border
        v-if="isMatchedDone"
        v-loading="isGettingEntries"
				size="mini"
      >
        <el-table-column
          :key="index"
          :label="item.value"
          :prop="item.key"
          align="center"
          header-align="center"
          v-for="(item, index) in accountingEntriesKey"
          :width="item.width"
        ></el-table-column>
      </el-table>
      <div class="match-tip" v-else>
        <div
          class="tip"
        >There are still some accounts to be matched. Please complete the matching work at first.</div>
        <el-button @click="$router.push({ name: 'Mapping' })" type="primary">To complete the match</el-button>
      </div>
    </div>

    <el-drawer :visible.sync="isFilterDrawerShow" :with-header="false" size="700px">
      <div class="filter-container">
        <!-- accounts 过滤 from -->
        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Accounts:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="12" align="middle" justify="space-between" type="flex">
              <el-col :span="4" class="from">From</el-col>
              <el-col :span="20">
                <el-select
                  clearable
                  placeholder="Accounts"
                  size="mini"
                  v-model="filterCondition.accountsFrom"
                  value-key="no"
                >
                  <el-option
                    :key="item.no + item.name + index"
                    :label="item.no + '  ' + item.name"
                    :value="index"
                    v-for="(item, index) in accountList"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- accounts 过滤 to -->
        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label"></el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="12" align="middle" justify="space-between" type="flex">
              <el-col :span="4" class="from">To</el-col>
              <el-col :span="20">
                <el-select
                  clearable
                  placeholder="Accounts"
                  size="mini"
                  v-model="filterCondition.accountsTo"
                  value-key="no"
                >
                  <el-option
                    :key="item.no + item.name"
                    :label="item.no + '  ' + item.name"
                    :value="index"
                    v-for="(item, index) in accountList"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row
          :gutter="20"
          :key="item.key"
          align="middle"
          class="search-item"
          justify="space-between"
          type="flex"
          v-for="item in filterCondition.others.slice(0, 2)"
        >
          <el-col :span="6" class="label">{{ item.label }}:</el-col>
          <el-col :span="18" class="input">
            <div class="el-input el-input--mini el-input--suffix">
              <div @click="showFilterDraw(item)" class="el-input__inner filter-row">
                <span v-if="item.keywords.join(',')">{{ item.keywords.join(', ') }}</span>
                <span class="placeholder" v-else>{{ item.label }}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 凭证日期 过滤 -->
        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Period:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :span="4">From</el-col>
                  <el-col :span="18">
                    <el-date-picker
                      align="right"
                      clearable
                      placeholder="Start date"
                      size="mini"
                      type="date"
                      v-model="filterCondition.periodFrom"
                    ></el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :offset="1" :span="3">To</el-col>
                  <el-col :span="18">
                    <el-date-picker
                      align="right"
                      clearable
                      placeholder="End date"
                      size="mini"
                      type="date"
                      v-model="filterCondition.periodTo"
                    ></el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row
          :gutter="20"
          :key="item.key"
          align="middle"
          class="search-item"
          justify="space-between"
          type="flex"
          v-for="item in filterCondition.others.slice(2, 3)"
        >
          <el-col :span="6" class="label">{{ item.label }}:</el-col>
          <el-col :span="18" class="input">
            <div class="el-input el-input--mini el-input--suffix">
              <div @click="showFilterDraw(item)" class="el-input__inner filter-row">
                <span v-if="item.keywords.join(',')">{{ item.keywords.join(', ') }}</span>
                <span class="placeholder" v-else>{{ item.label }}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 凭证编号 过滤 -->
        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Voucher No.:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :span="4">From</el-col>
                  <el-col :span="18">
                    <el-input
                      clearable
                      placeholder="Start No."
                      size="mini"
                      type="number"
                      v-model="filterCondition.voucherNoFrom"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :offset="1" :span="3">To</el-col>
                  <el-col :span="18">
                    <el-input
                      clearable
                      placeholder="End No."
                      size="mini"
                      type="number"
                      v-model="filterCondition.voucherNoTo"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row
          :gutter="20"
          :key="item.key"
          align="middle"
          class="search-item"
          justify="space-between"
          type="flex"
          v-for="item in filterCondition.others.slice(3, 4)"
        >
          <el-col :span="6" class="label">{{ item.label }}:</el-col>
          <el-col :span="18" class="input">
            <div class="el-input el-input--mini el-input--suffix">
              <div @click="showFilterDraw(item)" class="el-input__inner filter-row">
                <span v-if="item.keywords.join(',')">{{ item.keywords.join(', ') }}</span>
                <span class="placeholder" v-else>{{ item.label }}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 金额大小 过滤 -->
        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Currency amount:</el-col>
          <el-col :span="18" class="input">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :span="4">From</el-col>
                  <el-col :span="18">
                    <el-input
                      clearable
                      placeholder="Min amount"
                      size="mini"
                      type="number"
                      v-model="filterCondition.currencyAmountFrom"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="12" align="middle" justify="space-between" type="flex">
                  <el-col :offset="1" :span="3">To</el-col>
                  <el-col :span="18">
                    <el-input
                      clearable
                      placeholder="Max amount"
                      size="mini"
                      type="number"
                      v-model="filterCondition.currencyAmountTo"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row
          :gutter="20"
          :key="item.key"
          align="middle"
          class="search-item"
          justify="space-between"
          type="flex"
          v-for="item in filterCondition.others.slice(4)"
        >
          <el-col :span="6" class="label">{{ item.label }}:</el-col>
          <el-col :span="18" class="input">
            <div class="el-input el-input--mini el-input--suffix">
              <div @click="showFilterDraw(item)" class="el-input__inner filter-row">
                <span v-if="item.keywords.join(',')">{{ item.keywords.join(', ') }}</span>
                <span class="placeholder" v-else>{{ item.label }}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="action" justify="space-between" type="flex">
          <el-col :span="6" class="label"></el-col>
          <el-col :span="18" class="input">
            <el-button @click="resetFilter" class="full-width" type="primary">
              <i class="el-icon-refresh"></i>
              Reset
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <el-drawer :title="currentFilter.label" :visible.sync="isCurrentFilterDrawShow" size="400px">
      <div class="drawer-filter">
        <el-input clearable prefix-icon="el-icon-search" size="small" v-model="currentSearchValue"></el-input>
        <el-checkbox
          :indeterminate="isIndeterminate"
          @change="handleSelectAllOptions"
          v-model="isSelectAll"
        >Select All</el-checkbox>
        <el-checkbox-group v-model="currentFilter.keywords">
          <el-checkbox
            :key="option"
            :label="option"
            @change="handleSelectOptions"
            v-for="option in filterSeachOptions"
          ></el-checkbox>
        </el-checkbox-group>
        <el-row :gutter="20" class="confirm" type="flex">
          <el-col>
            <el-button @click="confirmFilter" type="primary">OK</el-button>
          </el-col>
          <el-col>
            <el-button @click="clearFilter">Clear</el-button>
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
				size="mini"
      >
        <el-table-column
          :key="item.key"
          :label="item.value"
          :prop="item.key"
					:width="item.width"
          align="center"
          header-align="center"
          v-for="item in journalEntryKey"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="isAccountingItemsShow" title="Accounting items" width="400px">
      <el-row :key="item.key" class="accounting-items" v-for="item in accountingItemsKey">
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
import windowResizeMixin from '@/mixins/windowResizeMixin'

export default {
	mixins: [windowResizeMixin],
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
			// 过滤选项，值改变的时候动态过滤数据
			filterCondition: {
				// account{ no, name }范围 的索引值
				accountsFrom: '',
				accountsTo: '',
				// 时间范围
				periodFrom: '',
				periodTo: '',
				// 数字返回
				voucherNoFrom: '',
				voucherNoTo: '',
				currencyAmountFrom: '',
				currencyAmountTo: '',
				// 其他需要弹出选择窗的搜索项
				others: [
					{
						key: 'supplier',
						label: 'Vendors',
						keywords: [],
						allOptions: []
					},
					{
						key: 'customer',
						label: 'Customers',
						keywords: [],
						allOptions: []
					},
					{
						key: 'explanation',
						label: 'Explanation',
						keywords: [],
						allOptions: []
					},
					{
						key: 'currentcy',
						label: 'Currentcy',
						keywords: [],
						allOptions: []
					},
					{
						key: 'department',
						label: 'Department',
						keywords: [],
						allOptions: []
					},
					{
						key: 'employee',
						label: 'Employee',
						keywords: [],
						allOptions: []
					},
					{
						key: 'otherThirdParty',
						label: 'Other third party',
						keywords: [],
						allOptions: []
					},
					{
						key: 'project',
						label: 'Project',
						keywords: [],
						allOptions: []
					},
					{
						key: 'invoice_no',
						label: 'Invoice No.',
						keywords: [],
						allOptions: []
					},
					{
						key: 'iventory_item',
						label: 'Iventory item',
						keywords: [],
						allOptions: []
					}
				]
			},
			// 是否弹出选择窗
			isCurrentFilterDrawShow: false,
			// 选择框的不确定状态
			isIndeterminate: false,
			// 选择窗中的搜索内容
			currentSearchValue: '',
			// 是否选择所有的选项
			isSelectAll: false,
			// 当前选择窗中的选项
			currentFilter: {
				allOptions: []
			},

			// account 列表
			accountList: [],

			// 用户点击某一行凭证，显示dialog
			isAllVouchersShow: false,
			// 用户点击某一行凭证，显示的内容
			allVouchers: [],

			isAccountingItemsShow: false,
			// 当前查看的凭证内容（核算项目时）
			currentVoucher: {},

			// 是否正在导出数据到excel
			isExportingToExcel: false
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
			let {
				accountsFrom,
				accountsTo,
				periodFrom,
				periodTo,
				voucherNoFrom,
				voucherNoTo,
				currencyAmountFrom,
				currencyAmountTo,
				others
			} = this.filterCondition
			// accounts 过滤逻辑
			accountsFrom = accountsFrom === '' ? 0 : accountsFrom
			accountsTo = accountsTo === '' ? this.accountList.length - 1 : accountsTo
			if (accountsFrom > accountsTo) {
				[accountsFrom, accountsTo] = [accountsTo, accountsFrom]
			}

			let accountsRange = this.accountList.slice(accountsFrom, accountsTo + 1)

			// period 过滤逻辑
			periodFrom =
				periodFrom === '' ? -Infinity : new Date(periodFrom).getTime()
			periodTo = periodTo === '' ? Infinity : new Date(periodTo).getTime()

			if (periodFrom > periodTo) {
				[periodFrom, periodTo] = [periodTo, periodFrom]
			}

			// voucher no 过滤逻辑
			voucherNoFrom = voucherNoFrom === '' ? -Infinity : voucherNoFrom
			voucherNoTo = voucherNoTo === '' ? Infinity : voucherNoTo
			if (voucherNoFrom > voucherNoTo) {
				[voucherNoFrom, voucherNoTo] = [voucherNoTo, voucherNoFrom]
			}

			// currency amount 过滤逻辑
			currencyAmountFrom =
				currencyAmountFrom === '' ? -Infinity : currencyAmountFrom
			currencyAmountTo = currencyAmountTo === '' ? Infinity : currencyAmountTo
			if (currencyAmountFrom > currencyAmountTo) {
				[currencyAmountFrom, currencyAmountTo] = [
					currencyAmountTo,
					currencyAmountFrom
				]
			}

			// 过滤出需要显示的内容
			let entriesData = this.accountingEntriesData.filter(data => {
				let isInAccounting = accountsRange.some(account => {
					return account.no.includes(data.account_no)
					// && account.name.includes(data.account_description)
				})

				let voucherDate = new Date(data.date).getTime()
				let isInPeriod = voucherDate >= periodFrom && voucherDate <= periodTo

				let isInVoucherNo =
					data.voucher_no >= voucherNoFrom && data.voucher_no <= voucherNoTo

				let isInCurrencyAmount =
					data.currency_amount >= currencyAmountFrom &&
					data.currency_amount <= currencyAmountTo

				let isInFilter = others.every(item => {
					if (item.keywords && item.keywords.length > 0) {
						// 数据在关键词中才返回true
						return item.keywords.includes(data[item.key])
					}
					// 没有选关键词时，不搜索
					return true
				})

				// console.log('isInAccounting', isInAccounting);
				// console.log('isInPeriod', isInPeriod);
				// console.log('isInVoucherNo', isInVoucherNo);
				// console.log('isInCurrencyAmount', isInCurrencyAmount);
				// console.log('isInFilter', isInFilter);

				return (
					isInAccounting &&
					isInPeriod &&
					isInVoucherNo &&
					isInCurrencyAmount &&
					isInFilter
				)
			})

			// 重新设定筛选项
			others.map(filter => {
				// 值是否存在 { 值：false }
				let existObj = {}
				entriesData.forEach(data => {
					let value = data[filter.key]
					if (value || value === 0) {
						existObj[value] = true
					}
				})
				filter.allOptions = Object.keys(existObj)
				return filter
			})

			return entriesData
		},
		filterSeachOptions() {
			return this.currentFilter.allOptions.filter(option => {
				return option.includes(this.currentSearchValue)
			})
		},
		currentCompany() {
			return this.$store.getters.currentCompany
		}
	},
	created() {
		this.getEntries()
		this.getAccountList()
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
			let isAccountingItemsExisted = accountingItemsKey.some(item => {
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
			const res = await api.getEntries(this.currentCompany.id)
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
			const res = await api.getAccountList(this.currentCompany.id)
			if (res.data.error_code === 0) {
				this.accountList = res.data.data
			}
		},
		showFilterDraw(data) {
			this.currentFilter = JSON.parse(JSON.stringify(data))
			const { keywords, allOptions } = this.currentFilter
			this.isSelectAll = keywords.length === allOptions.length
			this.isIndeterminate =
				keywords.length !== 0 && keywords.length !== allOptions.length

			this.isCurrentFilterDrawShow = true
		},
		handleSelectAllOptions(isSelectAll) {
			this.isIndeterminate = false
			if (isSelectAll) {
				this.currentFilter.keywords = this.currentFilter.allOptions
			} else {
				this.currentFilter.keywords = []
			}
		},
		handleSelectOptions() {
			let keywordLength = this.currentFilter.keywords.length
			this.isSelectAll = keywordLength === this.currentFilter.allOptions.length
			this.isIndeterminate =
				keywordLength > 0 &&
				keywordLength < this.currentFilter.allOptions.length
		},
		confirmFilter() {
			// 找到对应的筛选条件进行替换
			const index = this.filterCondition.others.findIndex(item => {
				return item.key === this.currentFilter.key
			})

			if (index !== -1) {
				this.$set(this.filterCondition.others, index, this.currentFilter)
			}
			this.isCurrentFilterDrawShow = false
		},
		clearFilter() {
			const index = this.filterCondition.others.findIndex(item => {
				return item.key === this.currentFilter.key
			})
			this.currentFilter.keywords = []
			if (index !== -1) {
				this.$set(this.filterCondition.others, index, this.currentFilter)
			}
			this.isCurrentFilterDrawShow = false
		},
		resetFilter() {
			this.filterCondition.accountsFrom = ''
			this.filterCondition.accountsTo = ''
			this.filterCondition.periodFrom = ''
			this.filterCondition.periodTo = ''
			this.filterCondition.voucherNoFrom = ''
			this.filterCondition.voucherNoTo = ''
			this.filterCondition.currencyAmountFrom = ''
			this.filterCondition.currencyAmountTo = ''
			this.filterCondition.others = this.filterCondition.others.map(item => {
				item.keywords = []
				return item
			})
		},
		exportToExcel() {
			if (!this.isMatchedDone) {
				this.$message.warning('当前暂无数据可用')
				return
			}
			this.isExportingToExcel = true
			import('@/tools/Export2Excel').then(excel => {
				const tHeader = accountingEntriesKey.map(item => {
					return item.value
				})
				const data = this.filterEntriesData.map(row => {
					return accountingEntriesKey.map(item => {
						return row[item.key]
					})
				})
				excel.export_json_to_excel({
					header: tHeader,
					data,
					filename: this.filename || 'Accounting entries'
				})
				this.isExportingToExcel = false
			})
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
		height: 100%;
		padding: 30px;
		@import '../../styles/customTable.scss';
		/deep/ .el-table__header .cell {
			font-size: 16px;
		}
		.match-tip {
			text-align: center;
			.tip {
				width: 360px;
				margin: 100px auto 0;
			}
			.el-button {
				width: 200px;
				margin-top: 20px;
			}
		}
	}
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

	.filter-row {
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		.placeholder {
			color: #c0c4cc;
		}
	}

	.action {
		margin-top: 30px;
		.full-width {
			width: 100%;
		}
	}
}

.drawer-filter {
	padding: 0 20px 30px;
	.el-checkbox {
		display: block;
		margin: 16px 0;
	}
	.confirm {
		margin: 30px 0;
		.el-button {
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
	border-bottom: 1px solid #ebeef5;
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