<template>
	<div class="mapping">
		<SubHeader title="Mapping">
			<div class="status">Mapping Status:</div>
			<el-select v-model="mappingStatus" size="medium" placeholder="Batch">
				<el-option v-for="status in ['Matched', 'To be matched']" :key="status" :value="status"></el-option>
			</el-select>
		</SubHeader>
		<div class="main" v-show="mappingStatus === 'Matched'">
			<el-table :data="matchedData" style="width: 100%">
				<el-table-column label="Imported Accounts" header-align="center">
					<el-table-column
						v-for="(item, index) in [
							{ key: 'accountNo', value: 'Account No.' },
							{ key: 'accountName', value: 'Account Name' }	
            ]"
						:key="index"
						:prop="item.key"
						:label="item.value"
						header-align="center"
						align="center"
					>
						<template slot-scope="scope">
							<template v-if="scope.$index === 0">
								<el-input :placeholder="item.value" size="small" class="search">
									<el-button slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</template>
							<template v-else>{{ scope.row[item.key] }}</template>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column label="Chart of accounts CN" header-align="center">
					<el-table-column
						prop="toAccountType"
						label="Type of account"
						header-align="center"
						align="center"
					>
						<template slot-scope="scope">
							<template v-if="scope.$index === 0">
								<el-select size="small" class="search" value="All">
									<el-option key="all" value="All"></el-option>
									<el-option key="cn" value="CN"></el-option>
									<el-option key="en" value="EN"></el-option>
								</el-select>
							</template>
							<template v-else>{{ scope.row.toAccountType }}</template>
						</template>
					</el-table-column>
					<el-table-column
						v-for="(item, index) in [
							{ key: 'toAccountNo', value: 'Account No.' },
							{ key: 'toAccountName', value: 'Account Name' }	
            ]"
						:key="index"
						:prop="item.key"
						:label="item.value"
						header-align="center"
						align="center"
					>
						<template slot-scope="scope">
							<template v-if="scope.$index === 0">
								<el-input :placeholder="item.value" size="small" class="search">
									<el-button slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</template>
							<template v-else>{{ scope.row[item.key] }}</template>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column align="center" header-align="center">
					<template slot="header" slot-scope="scope">
						<div class="status" @click="isEditable=!isEditable">
							<svg-icon :icon-class="isEditable ? 'unlock' : 'lock'"></svg-icon>Action
						</div>
					</template>
					<template slot-scope="scope" v-if="scope.$index !== 0">
						<el-button
							:type="isEditable ? 'primary' : 'info'"
							plain
							:class="[isEditable ? '' : 'disable', 'action']"
							size="small"
							icon="el-icon-edit-outline"
							@click="toggleStatus(scope.$index)"
						>Edit</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="main un-matched" v-show="mappingStatus === 'To be matched'">
			<el-row type="flex" justify="space-between" align="middle" class="action-bar">
				<el-col>
					<el-button
						type="primary"
						size="small"
						class="filter primary-icon"
						@click="isAddAccountDialogShow=!isAddAccountDialogShow"
					>
						<svg-icon icon-class="plus-square"></svg-icon>New Account
					</el-button>
				</el-col>
				<el-col>
					<el-row type="flex" justify="end" align="middle">
						<el-button type="primary" class="action" icon="el-icon-circle-check" size="small">Save</el-button>
					  <el-button type="warning" plain class="action" icon="el-icon-refresh" size="small">Reset</el-button>
					</el-row>
				</el-col>
			</el-row>
			<el-table :data="toBeMatchedData" style="width: 100%">
				<el-table-column label="Imported Accounts" header-align="center">
					<el-table-column
						v-for="(item, index) in [
							{ key: 'accountNo', value: 'Account No.' },
							{ key: 'accountName', value: 'Account Name' }	
            ]"
						:key="index"
						:prop="item.key"
						:label="item.value"
						header-align="center"
						align="center"
					>
						<template slot-scope="scope">
							<template v-if="scope.$index === 0">
								<el-input :placeholder="item.value" size="small" class="search">
									<el-button slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</template>
							<template v-else>{{ scope.row[item.key] }}</template>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column label="Chart of accounts CN" header-align="center">
					<el-table-column label="Type of account" header-align="center" align="center">
						<template slot-scope="scope">
							<template v-if="scope.$index === 0">
								<el-select size="small" class="search" value="All">
									<el-option key="all" value="All"></el-option>
									<el-option key="cn" value="CN"></el-option>
									<el-option key="en" value="EN"></el-option>
								</el-select>
							</template>
							<template v-else>
								<el-select v-model="scope.row.toAccountType" placeholder="Account Name" size="small">
									<el-option v-for="i in 10" :key="i" :value="i"></el-option>
								</el-select>
							</template>
						</template>
					</el-table-column>
					<el-table-column
						v-for="(item, index) in [
							{ key: 'toAccountNo', value: 'Account No.' },
							{ key: 'toAccountName', value: 'Account Name' }	
            ]"
						:key="index"
						:prop="item.key"
						:label="item.value"
						header-align="center"
						align="center"
					>
						<template slot-scope="scope">
							<template v-if="scope.$index === 0">
								<el-input :placeholder="item.value" size="small" class="search">
									<el-button slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</template>
							<template v-else>
								<el-select v-model="scope.row[item.key]" placeholder="Account Name" size="small">
									<el-option v-for="i in 10" :key="i" :value="i"></el-option>
								</el-select>
							</template>
						</template>
					</el-table-column>
				</el-table-column>
				<!-- <el-table-column align="center" header-align="center" label="Action">
					<template slot-scope="scope" v-if="scope.$index !== 0">
						<el-button type="primary" class="action" icon="el-icon-circle-check" size="small">Save</el-button>
						<el-button type="warning" plain class="action" icon="el-icon-refresh" size="small">Reset</el-button>
					</template>
				</el-table-column>-->
			</el-table>
		</div>

		<el-dialog
			title="Add account"
			:visible.sync="isAddAccountDialogShow"
			width="540px"
			class="new-account"
		>
			<NewAccoundDailog></NewAccoundDailog>
		</el-dialog>

		<el-dialog title="Status" :visible.sync="isStatusDialogShow" width="540px">
			Editing is currently disabled. Do you want to unlock it?
			<div slot="footer">
				<el-button type="primary" @click="unlockStatus">Unlock</el-button>
				<el-button plian @click="isStatusDialogShow=false">Cancel</el-button>
			</div>
		</el-dialog>

		<el-dialog
			:visible.sync="isEditAccountDialogShow"
			width="540px"
			class="edit-account"
		>
			<div class="title">Imported accounts</div>
			<el-form class="form1" :model="currentAccount" label-width="130px" label-position="left">
			<el-form-item label="Account No.:">
					{{ currentAccount.accountNo }}
				</el-form-item>
				<el-form-item label="Account Name:">
					{{ currentAccount.accountName }}
				</el-form-item>
			</el-form>
			<div class="title editable">Chart of accounts CN</div>
			<el-form :model="currentAccount" label-width="130px" label-position="left">
				<el-form-item label="Type of account:">
					<el-select v-model="currentAccount.toAccountType">
						<el-option v-for="type in ['CN', 'EN']" :key="type" :value="type"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Account No.:">
					<el-input v-model="currentAccount.toAccountNo"></el-input>
				</el-form-item>
				<el-form-item label="Account Name:">
					<el-input v-model="currentAccount.toAccountName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-row type="flex" justify="space-between" :gutter="12">
						<el-col :span="12">
							<el-button type="primary" class="full-width" @click="isEditAccountDialogShow=false">Save</el-button>
						</el-col>
						<el-col :span="12">
							<el-button plain class="full-width" @click="isEditAccountDialogShow=false">Cancel</el-button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
import NewAccoundDailog from "./components/NewAccoundDailog";

export default {
	data() {
		return {
			isAddAccountDialogShow: false,
			isEditAccountDialogShow: false,
			isStatusDialogShow: false,
			isEditable: false,
			mappingStatus: "To be matched",
			currentAccount: {},
			matchedData: [
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},

				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},

				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "CN",
					toAccountNo: "2398.23",
					toAccountName: "engliish"
				}
			],
			toBeMatchedData: [
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "hh",
					toAccountNo: "",
					toAccountName: ""
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "",
					toAccountNo: "",
					toAccountName: ""
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "",
					toAccountNo: "",
					toAccountName: ""
				},
				{
					accountNo: "2332.20",
					accountName: "飞机配",
					toAccountType: "",
					toAccountNo: "",
					toAccountName: ""
				}
			]
		};
	},
	components: {
		SubHeader,
		NewAccoundDailog
	},
	methods: {
		unlockStatus() {
			this.isEditable = true;
			this.isStatusDialogShow = false;
		},
		toggleStatus(index) {
			if (!this.isEditable) {
				this.isStatusDialogShow = true;
				return;
			}
			this.isEditAccountDialogShow = true;
			this.currentAccount = this.matchedData[index];
		}
	}
};
</script>

<style scoped lang="scss">
.mapping {
	.el-select {
		margin: 0 0 0 8px;
	}
	.main {
		padding: 30px;
		&.un-matched {
			padding-top: 10px;
		}
		.action-bar {
			margin-bottom: 10px;
			.action.el-button {
				width: 100px;
			}
		}
		@import "../../styles/customTable.scss";
		.search {
			margin: 6px 0;
			&.el-input,
			&.el-select {
				width: 100% !important;
			}
		}
		/deep/ .el-table__header .cell {
			font-size: 16px;
		}
		/deep/ .el-table__row td {
			padding-top: 6px;
			padding-bottom: 6px;
		}
		.status {
			text-align: center;
			color: #fff;
			font-size: 16px;
			cursor: pointer;
			.svg-icon {
				font-size: 18px;
				stroke: #fff;
				margin-right: 6px;
			}
		}
		.el-button.action {
			width: 80px;
			&.disable {
				color: #bcbec2;
				background-color: #f4f4f5;
				border-color: #e9e9eb;
			}
		}
	}
}

.new-account {
	line-height: 40px;
	/deep/ .el-dialog__body {
		padding: 30px 60px;
	}
	/deep/ .el-dialog__title {
		color: #303133;
		font-weight: bold;
	}
	/deep/ .el-form-item__label {
		color: #303133 !important;
		font-weight: 600;
	}
}

.edit-account {
	/deep/ .el-dialog__body {
		padding: 0px 30px 20px;
	}
	.title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
		&.editable {
			margin-top: 20px;
			margin-bottom: 18px;
		}
	}
	.el-form {
		padding-left: 40px;
		.el-select {
			width: 100%;
			box-sizing: border-box;
			margin: 0;
		}
	}
	.form1 {
		.el-form-item {
			margin-bottom: 0px;
		}
	}
}
</style>