<template>
	<div class="import">
		<SubHeader :is-back="true" title="Data maintenance">
			<div class="filter-title">Batch:</div>
			<el-select v-model="filterCondition.year" size="medium" placeholder="Year">
				<el-option v-for="year in filterOptions.year" :key="year" :value="year"></el-option>
			</el-select>
			<el-select v-model="filterCondition.month" size="medium" placeholder="Month">
				<el-option v-for="month in filterOptions.month" :key="month" :value="month"></el-option>
			</el-select>
			<el-select v-model="filterCondition.batch" size="medium" placeholder="Batch">
				<el-option v-for="batch in filterOptions.batch" :key="batch" :value="batch"></el-option>
			</el-select>

			<el-button type="primary" size="medium" class="filter primary-icon"><svg-icon icon-class="filter"></svg-icon>Filter</el-button>
			<el-button type="danger" size="medium" icon="el-icon-delete" @click="isDeleteBatchDialogShow=true">Delete</el-button>
		</SubHeader>
		<div class="main">
			<importedDataTable :imported-data="importedData"></importedDataTable>
		</div>

		<el-dialog
			title="Batch: 2020 July Batch08"
			:visible.sync="isDeleteBatchDialogShow"
			width="540px"
			class="upload-confirm"
		>
			<div class="delete-batch">
				Do you want to delete these data?
			</div>
			<div slot="footer">
				<el-button type="primary" @click="isDeleteBatchDialogShow=false">Confirm</el-button>
				<el-button plain @click="isDeleteBatchDialogShow=false">Cancel</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
import importedDataTable from "./components/ImportedDataTable";

export default {
	data() {
		return {
			isDeleteBatchDialogShow: false,
			filterOptions: {
				year: ["2018", "2019", "2020"],
				month: ["July", "Nov"],
				batch: ["batch01", 2, 3, 4]
			},
			filterCondition: {
				year: "",
				month: "",
				batch: ""
			},
			importedData: [
				{
					createTime: "2020-1-2",
					voucher: "e23",
					voucherNumber: "2432",
					enclosureNumber: "123",
					order: "23",
					description: "jkakdlwe",
					subjectNumber: "2313.23",
					subjectName: "飞机费",
					debtorAmount: "2342",
					lenderAmount: "234",
					client: "silence"
				},
				{
					createTime: "2020-1-2",
					voucher: "e23",
					voucherNumber: "2432",
					enclosureNumber: "123",
					order: "23",
					description: "jkakdlwe",
					subjectNumber: "2313.23",
					subjectName: "飞机费",
					debtorAmount: "2342",
					lenderAmount: "234",
					client: "silence"
				},
				{
					createTime: "2020-1-2",
					voucher: "e23",
					voucherNumber: "2432",
					enclosureNumber: "123",
					order: "23",
					description: "jkakdlwe",
					subjectNumber: "2313.23",
					subjectName: "飞机费",
					debtorAmount: "2342",
					lenderAmount: "234",
					client: "silence"
				},
				{
					createTime: "2020-1-2",
					voucher: "e23",
					voucherNumber: "2432",
					enclosureNumber: "123",
					order: "23",
					description: "jkakdlwe",
					subjectNumber: "2313.23",
					subjectName: "飞机费",
					debtorAmount: "2342",
					lenderAmount: "234",
					client: "silence"
				},
				{
					createTime: "2020-1-2",
					voucher: "e23",
					voucherNumber: "2432",
					enclosureNumber: "123",
					order: "23",
					description: "jkakdlwe",
					subjectNumber: "2313.23",
					subjectName: "飞机费",
					debtorAmount: "2342",
					lenderAmount: "234",
					client: "silence"
				}
			]
		};
	},
	components: {
		SubHeader,
		importedDataTable
	}
};
</script>

<style scoped lang="scss">
.import {
	.filter-title {
		margin-right: 10px;
	}
	.el-select {
		width: 100px;
		margin-right: 10px;
  }
  .filter {
    width: 100px;
  }
	.main {
    padding: 30px;
	}
}
</style>