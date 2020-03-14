<template>
	<div class="import">
		<SubHeader title="Data import">
			<el-button
				class="data-maintenance"
				icon="el-icon-document-copy"
				type="primary"
				size="medium"
				@click="$router.push({ name: 'DataMaintenance' })"
			>Data maintenance</el-button>
		</SubHeader>
		<div class="main">
			<el-upload
				class="upload-content"
				drag
				action=""
				:auto-upload="false"
				:multiple="false"
				accept=".xls, xml, xlt, .xlsx"
				:show-file-list="false"
				:on-success="uploadSuccess"
				:on-change="fileChange"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">
					Drag & Drop or
					<em>Hit</em> to add file
					<div class="el-upload__tip">Only Excel files can be uploaded</div>
				</div>
				<!-- <div class="el-upload__tip" slot="tip">Only Excel files can be uploaded</div> -->
			</el-upload>

			<div class="current-batch">
				Batch: 2020 July Batch03
			</div>

			<importedDataTable v-if="importedData.length > 0" :imported-data="importedData"></importedDataTable>
		</div>

		<el-dialog
			title="Do you want to import the data?"
			:visible.sync="isUploadConfirmDialogShow"
			width="540px"
			class="upload-confirm"
		>
			<div class="file-list">
				<i class="el-icon-document"></i> File: 
				{{ currentFile.name }}
			</div>
			<div slot="footer">
				<el-button type="primary" @click="isUploadConfirmDialogShow=false">Confirm</el-button>
				<el-button plain @click="isUploadConfirmDialogShow=false">Cancel</el-button>
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
			isUploadConfirmDialogShow: false,
			currentFile: '',
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
	},
	methods: {
		uploadSuccess() {
			console.log("success");
		},
		fileChange(e, list) {
			this.currentFile = e
			this.isUploadConfirmDialogShow = true
		}
	}
};
</script>

<style scoped lang="scss">
.import {
	.current-batch {
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		font-weight: 700;
	}
	.main {
		padding: 30px;
		/deep/ .el-upload {
			width: 100%;
			margin-bottom: 10px;
			.el-upload-dragger {
				width: 100%;
				// background-color: rgba($color: #f9f9f9, $alpha: 1);
				background-color: rgba($color: #409eff, $alpha: 0.1);
			}
		}
	}
}

.file-list .svg-icon {

}
</style>