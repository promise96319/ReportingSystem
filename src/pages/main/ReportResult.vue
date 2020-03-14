<template>
	<div class="accounting-entries">
		<SubHeader title="Accounting entries">
			<el-button plain size="medium" class="plain-icon">
				<svg-icon icon-class="export"></svg-icon>Export
			</el-button>
			<el-button type="primary" size="medium" @click="isFilterDrawerShow=true" class="primary-icon">
				<svg-icon icon-class="filter"></svg-icon>Filter
			</el-button>
		</SubHeader>
		<div class="main">
			<el-table
				:data="accountingEntriesData"
				border
				style="width: 100%"
				:row-class-name="tableRowClassName"
			>
				<el-table-column
					v-for="(item, index) in accountingEntriesKey"
					:key="index"
					:prop="item.key"
					:label="item.value"
					align="center"
					header-align="center"
				></el-table-column>
			</el-table>
		</div>

		<el-drawer :visible.sync="isFilterDrawerShow" :with-header="false">
			<div class="filter-container">
				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Accounts:</el-col>
					<el-col class="input" :span="18">
						<el-row :gutter="12" type="flex" justify="space-between" align="middle">
							<el-col :span="4" class="from">From</el-col>
							<el-col :span="20">
								<el-input size="mini" placeholder="Accounts"></el-input>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6"></el-col>
					<el-col class="input" :span="18">
						<el-row :gutter="12" type="flex" justify="space-between" align="middle">
							<el-col :span="4" class="from">To</el-col>
							<el-col :span="20">
								<el-input size="mini" placeholder="Accounts"></el-input>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Vendors:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" placeholder="Vendors"></el-input>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Customers:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" placeholder="Customers"></el-input>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Period:</el-col>
					<el-col class="input" :span="18">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-row :gutter="12" type="flex" justify="space-between" align="middle">
									<el-col :span="4">
										From
									</el-col>
									<el-col :span="18">
										 <el-date-picker
											align="right"
											type="date"
											size="mini"
											placeholder="Start date">
										</el-date-picker>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="12">
								<el-row :gutter="12" type="flex" justify="space-between" align="middle">
									<el-col :offset="1" :span="3">
										To
									</el-col>
									<el-col :span="18">
										 <el-date-picker
											align="right"
											type="date"
											size="mini"
											placeholder="End date">
										</el-date-picker>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Explanation:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" placeholder="Explanation"></el-input>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Voucher No.:</el-col>
					<el-col class="input" :span="18">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-row :gutter="12" type="flex" justify="space-between" align="middle">
									<el-col :span="4">
										From
									</el-col>
									<el-col :span="18">
										<el-input size="mini" placeholder="Start No."></el-input>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="12">
								<el-row :gutter="12" type="flex" justify="space-between" align="middle">
									<el-col :offset="1" :span="3">
										To
									</el-col>
									<el-col :span="18">
										<el-input size="mini" placeholder="End No."></el-input>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Currency:</el-col>
					<el-col class="input" :span="18">
						<el-select size="mini" placeholder="Currency" value=""></el-select>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Currency amount:</el-col>
					<el-col class="input" :span="18">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-row :gutter="12" type="flex" justify="space-between" align="middle">
									<el-col :span="4">
										From
									</el-col>
									<el-col :span="18">
										<el-input size="mini" type="number" placeholder="Min amount"></el-input>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="12">
								<el-row :gutter="12" type="flex" justify="space-between" align="middle">
									<el-col :offset="1" :span="3">
										To
									</el-col>
									<el-col :span="18">
										<el-input size="mini" type="number" placeholder="Max amount"></el-input>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Department:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" clearable placeholder="Department"></el-input>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Employee:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" clearable placeholder="Employee"></el-input>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Other third party:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" clearable placeholder="Other third party"></el-input>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Project:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" clearable placeholder="Project"></el-input>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-item" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6">Invoice No.:</el-col>
					<el-col class="input" :span="18">
						<el-input size="mini" clearable placeholder="Invoice No."></el-input>
					</el-col>
				</el-row>

				<el-row class="action" :gutter="20" type="flex" justify="space-between" align="middle">
					<el-col class="label" :span="6"></el-col>
					<el-col class="input" :span="18">
						<el-row type="flex" :gutter="20">
						<el-col :span="12">
							<el-button type="primary" class="full-width primary-icon">
								<svg-icon icon-class="filter"></svg-icon>
								Filter</el-button>
						</el-col>
						<el-col :span="12">
							<el-button plain class="full-width">
								<i class="el-icon-refresh"></i>
								Reset</el-button>
						</el-col>
					</el-row>
					</el-col>
				</el-row>

			</div>
		</el-drawer>
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
import accountingEntriesKey from "@/constant/accountingEntriesKey";

export default {
	data() {
		return {
			accountingEntriesKey,

			isFilterDrawerShow: false,
			accountingEntriesData: [{
				date: '2020年3月2日',
				voucherNo: '2323',
				line: '2',
				explanation: 'hello world',
				accountNo: '2342.123',
				accountDescription: '23sd',
				currency: 'CN',
				exchangeRate: '1.32',
				debit: '233',
				credit: '2323',
			}, {}, {}, {}, {}]
		};
	},
	components: {
		SubHeader
	},
	methods: {
		tableRowClassName({ row, rowIndex }) {
			if (rowIndex % 2 !== 0) {
				return "highlight-row";
			}
			return "";
		}
	}
};
</script>

<style scoped lang="scss">
.accounting-entries {
	.el-button {
		width: 120px;
	}
	.main {
		padding: 30px;
		@import "../../styles/customTable.scss";
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