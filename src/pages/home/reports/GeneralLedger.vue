<template>
  <div class="general-ledger">
    <SubHeader :is-back="true" title="General ledger">
      <div class="filter">
        Période :
        <el-date-picker
          end-placeholder="Au"
          range-separator="-"
          size="mini"
          start-placeholder="Du"
          type="monthrange"
					:clearable="false"
          v-model="filterCondition.date"
        ></el-date-picker>Devise :
        <el-select size="mini" v-model="filterCondition.devise">
          <el-option :key="GL_SINGLE" :label="GL_SINGLE" :value="GL_SINGLE"></el-option>
          <el-option :key="GL_MULTIPLE" :label="GL_MULTIPLE" :value="GL_MULTIPLE"></el-option>
        </el-select>
      </div>
      <el-button
        @click="$router.go(-1)"
        class="primary-icon"
        icon="el-icon-s-data"
        size="mini"
        type="primary"
      >Reports</el-button>
    </SubHeader>
    <div class="main">
      <el-table :data="[]" border class="header" height="36" size="mini" style="width: 100%">
        <el-table-column
          :key="item.key"
          :label="item.label"
          :width="item.width"
          v-for="item in localeGeneralLedgerKey"
        ></el-table-column>
      </el-table>
      <div :style="{ 'height': windowHeight - 216 + 'px' }" class="content">
        <el-table
          :data="data.entries"
          :key="index"
          :row-class-name="boldRowClass"
          :show-header="false"
          :span-method="arraySpanMethod"
          border
          size="mini"
          style="width: 100%"
          v-for="(data, index) in formatSingleGenralLedger"
        >
          <el-table-column
            :key="item.key"
            :prop="item.key"
            :width="item.width"
            v-for="item in localeGeneralLedgerKey"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import api from '@/api'
import {
	GL_SINGLE,
	GL_MULTIPLE,
	localeGeneralLedgerKey
} from '@/constant/generalLedgerKey'
import windowResizeMixin from '@/mixins/windowResizeMixin'

export default {
	mixins: [windowResizeMixin],
	data() {
		return {
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
	components: {
		SubHeader
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany
		},
		// 在第一行添加 no，balance，核算项目等
		// 在最后一行添加统计
		formatSingleGenralLedger() {
			return this.localeGeneralLedgerData.map(item => {
				item.entries = [
					{
						// invoice_no: item.account.no,
						// voucher_no: '',
						// 是否是第一列
						is_first: true,
						invoice_no: 53312,
						voucher_no: 'Banque - Compte principal/Project001/Sales dept.',
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
		this.getGeneralLedger()
	},
	methods: {
		async getGeneralLedger() {
			this.isGettingGeneralLedgerData = true
			const res = await api.getGeneralLedger(
				this.currentCompany.id,
				'2020-07',
				'2020-08',
				'General ledger'
			)
			this.isGettingGeneralLedgerData = false
			if (res.data.error_code === 0) {
				this.localeGeneralLedgerData = JSON.parse(
					JSON.stringify([
						...res.data.data,
						...res.data.data,
						...res.data.data,
						...res.data.data
					])
				)
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
				color: #333;
				font-weight: bold;
			}
		}
		.content {
			overflow: scroll;
			.el-table {
				border-bottom: 1px solid #999;
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