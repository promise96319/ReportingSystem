<template>
	<div class="trial-balance">
		<SubHeader
			:is-back="true"
			title="Trial balance"
		>
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
				<el-select
					size="mini"
					v-model="filterCondition.devise"
				>
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
				@click="$router.go(-1)"
				class="primary-icon"
				icon="el-icon-s-data"
				size="mini"
				type="primary"
			>Reports</el-button>
		</SubHeader>
		<div class="main">
			<div class="content">
				<el-table
					:data="trialBalanceData"
					border
					:height="windowHeight - 180"
					size="mini"
					style="width: 100%"
				>
					<el-table-column
						:label="isFR ? 'Cumul période' : 'Period'"
						header-align="center"
					>
						<el-table-column
							:label="isFR ? 'Débiteur' : 'Debit'"
							prop="total_debit"
							header-align="center"
							align="right"
						>
						</el-table-column>
						<el-table-column
							:label="isFR ? 'Créditeur' : 'Credit'"
							prop="total_credit"
							header-align="center"
							align="right"
						>
						</el-table-column>
					</el-table-column>

					<el-table-column
						:label="isFR ? 'N° compte' : 'Account No.'"
						prop="account_no"
						header-align="center"
					>
					</el-table-column>
					<el-table-column
						:label="isFR ? 'Intitulé' : 'Account Description'"
						prop="account_description"
						header-align="center"
					>
					</el-table-column>

					<el-table-column
						label="Solde N"
						header-align="center"
					>
						<el-table-column
							:label="isFR ? 'Débiteur' : 'Debit'"
							prop="debit_n"
							header-align="center"
							align="right"
						>
						</el-table-column>
						<el-table-column
							:label="isFR ? 'Créditeur' : 'Credit'"
							prop="credit_n"
							header-align="center"
							align="right"
						>
						</el-table-column>
					</el-table-column>
					<el-table-column
						label="Solde N-1"
						header-align="center"
					>
						<el-table-column
							:label="isFR ? 'Débiteur' : 'Debit'"
							prop="debit_n_1"
							header-align="center"
							align="right"
						>
						</el-table-column>
						<el-table-column
							:label="isFR ? 'Créditeur' : 'Credit'"
							prop="credit_n_1"
							header-align="center"
							align="right"
						>
						</el-table-column>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import api from '@/api'
import { GL_SINGLE, GL_MULTIPLE } from '@/constant/generalLedgerKey'
import windowResizeMixin from '@/mixins/windowResizeMixin'
import { FR } from '@/constant/accountType'

export default {
	mixins: [windowResizeMixin],
	data() {
		return {
			GL_SINGLE,
			GL_MULTIPLE,
			filterCondition: {
				date: [],
				devise: GL_SINGLE
			},
			trialBalanceData: []
		}
	},
	computed: {
		isFR() {
			return this.$store.getters.currentCompany.current_region === FR
		},
		currentCompany() {
			return this.$store.getters.currentCompany
		}
	},
	components: {
		SubHeader
	},
	created() {
		this.getTrialBalance()
	},
	methods: {
		async getTrialBalance() {
			const res = await api.getGeneralLedger(
				// this.currentCompany.id
				6,
				'2020-07',
				'2020-08',
				'Trial balance'
			)
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