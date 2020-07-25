<template>
	<div class="trial-balance">
		<SubHeader
			:is-back="true"
			title="Balance sheet"
		>
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
					:data="balanceSheetData"
					border
					size="mini"
					style="width: 100%"
					:height="windowHeight - 180"
				>
					<el-table-column
						label="COMPTE DE RESULTAT"
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
					<el-table-column label="Mars 2020" width="160" align="right" header-align="center">
						<template slot-scope="scope">
							{{ scope.row.amount && scope.row.amount[0] }}
						</template>
					</el-table-column>
					<el-table-column label="Mars 2020" width="160" align="right" header-align="center">
						<template slot-scope="scope">
							{{ scope.row.amount && scope.row.amount[1] }}
						</template>
					</el-table-column>
					<el-table-column label="Mars 2020" width="160" align="right" header-align="center">
						<template slot-scope="scope">
							{{ scope.row.amount && scope.row.amount[2] }}
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
import { FR, EN } from '@/constant/accountType'

export default {
	mixins: [windowResizeMixin],
	data() {
		return {
			balanceSheetData: [],
		}
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany
		},
	},
	components: {
		SubHeader,
	},
	created() {
		this.getBalanceSheet()
	},
	methods: {
		async getBalanceSheet() {
			const res = await api.getGeneralLedger(
				// this.currentCompany.id
				6,
				'2020-07',
				'2020-07',
				'Profit and loss'
			)
			if (res.data.error_code === 0) {
				this.balanceSheetData = res.data.data
			}
		},
	},
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
			.bold {
				font-weight: 500;
				font-size: 14px;
			}
		}
	}
}

/deep/ .el-table__body tr:hover td {
	background-color: rgba($color: #409eff, $alpha: 0.1);
}
</style>