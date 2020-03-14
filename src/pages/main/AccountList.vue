<template>
	<div class="accounts">
		<SubHeader title="Accounts">
			<el-button
				type="primary"
				size="medium"
				class="primary-icon"
				@click="isAddAccountDialogShow=true"
			>
				<svg-icon icon-class="plus-square"></svg-icon>New account
			</el-button>
		</SubHeader>

		<div class="main">
			<el-table
				:data="accountList"
				border
				style="width: 100%"
				:row-class-name="tableRowClassName"
				size="medium"
			>
				<el-table-column
					v-for="(item, index) in [
            { key: 'accountNo', value: 'Account No.' },
            { key: 'accountName', value: 'Account Name' },
            { key: 'accountType', value: 'Account Type' },
          ]"
					:key="index"
					:prop="item.key"
					:label="item.value"
					align="center"
					header-align="center"
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
				<el-table-column prop="isEnable" align="center" header-align="center">
					<template slot="header" slot-scope="scope">
						<div class="status" @click="isEditable=!isEditable">
							<svg-icon :icon-class="isEditable ? 'unlock' : 'lock'"></svg-icon>Status
						</div>
					</template>
					<template slot-scope="scope">
						<template v-if="scope.$index === 0">
							<el-select size="small" class="search" value="All">
								<el-option key="all" value="All"></el-option>
								<el-option key="enable" value="Enable"></el-option>
								<el-option key="disable" value="Disable"></el-option>
							</el-select>
						</template>
						<template v-else>
							<el-button v-if="scope.row.isEnable" type="text" :class="[isEditable ? '' : 'disable']" @click="toggleStatus(scope.$index)">Enable</el-button>
							<el-button v-else type="text" :class="[isEditable ? '' : 'disable', 'danger']" @click="toggleStatus(scope.$index)">Disable</el-button>
						</template>
					</template>
				</el-table-column>
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

		<el-dialog
			title="Status"
			:visible.sync="isStatusDialogShow"
			width="540px"
		>
			Editing is currently disabled. Do you want to unlock it?
			<div slot="footer">
				<el-button type="primary" @click="unlockStatus">Unlock</el-button>
				<el-button plian @click="isStatusDialogShow=false">Cancel</el-button>
			</div>
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
			isStatusDialogShow: false,
			isEditable: false,
			accountList: [
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: false
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: false
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: false
				},

				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				},
				{
					accountNo: "2313",
					accountName: "飞机票哦",
					accountType: "hahaad",
					isEnable: true
				}
			]
		};
	},
	components: {
		SubHeader,
		NewAccoundDailog
	},
	methods: {
		tableRowClassName({ row, rowIndex }) {
			let className = ''
			if (rowIndex === 0) {
				className = 'search'
			}
			if (rowIndex % 2 !== 0) {
				return className + " highlight-row";
			}
			return className;
		},
		unlockStatus() {
			this.isEditable=true 
			this.isStatusDialogShow=false
		},
		toggleStatus(index) {
			if (!this.isEditable) {
				this.isStatusDialogShow = true
				return
			}
			this.accountList[index].isEnable = !this.accountList[index].isEnable
		}
	}
};
</script>

<style scoped lang="scss">
.main {
	padding: 30px;

	@import "../../styles/customTable.scss";
	/deep/ .el-table__header .cell {
		font-size: 16px;
	}
	/deep/ .el-table__row td {
		padding-top: 2px;
		padding-bottom: 2px;
	}
	.search {
		margin: 6px 0;
		&.el-input, &.el-select {
			width: 90% !important;
		}
	}

	.status {
		text-align: center;
		color: #fff;
		cursor: pointer;
		.svg-icon {
			stroke: #fff;
			font-size: 18px;
			margin-right: 6px;
		}
	}
	.danger {
		color: #f56c6c;
	}
	.disable {
		color: #c0c4cc;
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
</style>