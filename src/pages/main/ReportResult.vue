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
      <el-table v-loading="isGettingEntries" :data="accountingEntriesData" :row-class-name="tableRowClassName" border>
        <el-table-column
          :key="index"
          :label="item.value"
          :prop="item.key"
					width="120px"
          align="center"
          header-align="center"
          v-for="(item, index) in accountingEntriesKey"
        ></el-table-column>
      </el-table>
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
            <el-input placeholder="Vendors" size="mini"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Customers:</el-col>
          <el-col :span="18" class="input">
            <el-input placeholder="Customers" size="mini"></el-input>
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
            <el-input placeholder="Explanation" size="mini"></el-input>
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
            <el-select placeholder="Currency" size="mini" value></el-select>
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
            <el-input clearable placeholder="Department" size="mini"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Employee:</el-col>
          <el-col :span="18" class="input">
            <el-input clearable placeholder="Employee" size="mini"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Other third party:</el-col>
          <el-col :span="18" class="input">
            <el-input clearable placeholder="Other third party" size="mini"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Project:</el-col>
          <el-col :span="18" class="input">
            <el-input clearable placeholder="Project" size="mini"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Invoice No.:</el-col>
          <el-col :span="18" class="input">
            <el-input clearable placeholder="Invoice No." size="mini"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" align="middle" class="search-item" justify="space-between" type="flex">
          <el-col :span="6" class="label">Iventory item:</el-col>
          <el-col :span="18" class="input">
            <el-input clearable placeholder="Iventory item" size="mini"></el-input>
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
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import accountingEntriesKey from '@/constant/accountingEntriesKey'
import api from '@/api'

export default {
	data() {
		return {
			accountingEntriesKey,

			isFilterDrawerShow: false,
			accountingEntriesData: [],
			isGettingEntries: false,
		}
	},
	components: {
		SubHeader
	},
	computed: {
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
				return 'highlight-row'
			}
			return ''
		},
		async getEntries() {
			this.isGettingEntries = true
			const res = await api.getEntries(this.currentCompany.id, this.currentType)
			this.isGettingEntries = false
			if (res.data.error_code === 0) {
				this.accountingEntriesData = res.data.data
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
</style>