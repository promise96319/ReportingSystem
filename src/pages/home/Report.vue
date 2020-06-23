<template>
	<div class="report">
		<SubHeader title="Reports">
			<el-button
				size="medium"
				icon="el-icon-s-data"
				plain
				@click="$router.push({ name: 'Home' })"
			>Dashboard</el-button>
			<el-button
				size="medium"
				class="primary-icon"
				type="primary"
				@click="isStepDialogShow=true"
			>
				<svg-icon icon-class="plus-square"></svg-icon>New data
			</el-button>
		</SubHeader>

		<div class="main">
			<div
				class="module module1"
				@click="showPeriodDialog(moduleOptions[0])"
			>
				<div class="tip">{{ moduleOptions[0] }}</div>
				<div class="item1">Assets</div>
				<div class="item2">Liabities</div>
				<div class="item3">Equity</div>
			</div>
			<div
				class="module module2"
				@click="showPeriodDialog(moduleOptions[1])"
			>
				<div class="tip">{{ moduleOptions[1] }}</div>
				<div class="item1">
					<div class="sales">Sales revenus</div>
					<div class="margin">Margin</div>
				</div>
				<div class="item2">Expenses</div>
				<div class="item3">Net income</div>
			</div>
			<div
				class="module module3"
				@click="showPeriodDialog(moduleOptions[2])"
			>
				<div class="tip">{{ moduleOptions[2] }}</div>
				<div class="item1">Operating activities</div>
				<div class="item2">Investing activities</div>
				<div class="item3">Finacing activities</div>
				<div class="item4">Net Cash flow</div>
			</div>
			<div class="module module4">
				<div class="tip">{{ moduleOptions[3] }}</div>
				<el-row
					class="header"
					:gutter="10"
				>
					<el-col :span="12">
						<div>Account</div>
					</el-col>
					<el-col :span="6">
						<div>Debit</div>
					</el-col>
					<el-col :span="6">
						<div>Credit</div>
					</el-col>
				</el-row>
				<el-row
					v-for="(item, index) in accountOptions"
					:key="index"
					:gutter="10"
				>
					<el-col :span="12">
						<div>{{ item.value }}</div>
					</el-col>
					<el-col :span="6">
						<div v-if="index < 3">{{ item.number }}</div>
						<div v-else>0</div>
					</el-col>
					<el-col :span="6">
						<div v-if="index >= 3">{{ item.number }}</div>
						<div v-else>0</div>
					</el-col>
				</el-row>
			</div>
			<div class="module module5">
				<div class="tip">{{ moduleOptions[4] }}</div>
				<div class="container">
					<div class="header">Account Receivable</div>
					<el-row :gutter="16">
						<el-col :span="16">
							<div>Sell 500 items</div>
						</el-col>
						<el-col :span="8">
							<div>2000</div>
						</el-col>
					</el-row>
					<el-row :gutter="16">
						<el-col :span="16">
							<div>Sell 200 items</div>
						</el-col>
						<el-col :span="8">
							<div>800</div>
						</el-col>
					</el-row>
					<el-row :gutter="16">
						<el-col :span="16">
							<div>Payment received</div>
						</el-col>
						<el-col :span="8">
							<div>-2000</div>
						</el-col>
					</el-row>
					<el-row :gutter="16">
						<el-col :span="16">
							<div>Goods return 300</div>
						</el-col>
						<el-col :span="8">
							<div>-800</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>

		<el-dialog
			:visible.sync="isStepDialogShow"
			width="800px"
		>
			<StepDialog></StepDialog>
		</el-dialog>

		<el-dialog
			:title="currentTitle"
			:visible.sync="isPeriodDialogShow"
			width="400px"
			center
		>
			<el-row
				:gutter="12"
				type="flex"
				align="middle"
			>
				<el-col :span="4">Period:</el-col>
				<el-col :span="10">
					<el-select
						v-model="currentYear"
						@change="selectYear"
					>
						<el-option
							v-for="item in YEAR_OPTIONS"
							:key="item"
							:label="item"
							:value="item"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="10">
					<el-select
						v-model="currentMonth"
						value-key="value"
						@change="selectMonth"
					>
						<el-option
							v-for="item in MONTH_OPTIONS"
							:key="item.key"
							:label="item.value"
							:value="item"
						></el-option>
					</el-select>
				</el-col>
			</el-row>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button
					type="primary"
					@click="goToReport"
				>Confirm</el-button>
				<el-button @click="isPeriodDialogShow = false">Cancel</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import StepDialog from './components/StepDialog'
import { YEAR_OPTIONS, MONTH_OPTIONS } from '@/constant/dateOptions'
export default {
	data() {
		return {
			YEAR_OPTIONS,
			MONTH_OPTIONS,

			isStepDialogShow: false,
			isPeriodDialogShow: false,
			// 模块名称
			moduleOptions: [
				'Balance sheet',
				'Profit & loss',
				'Cash flow statement',
				'Trial balance',
				'General ledger'
			],
			// 模块4 选项数组
			accountOptions: [
				{
					key: '',
					value: 'Cash',
					number: 100
				},
				{
					key: '',
					value: 'Bank',
					number: 200
				},
				{
					key: '',
					value: 'Account receivable',
					number: 300
				},
				{
					key: '',
					value: 'Account payable',
					number: 200
				},
				{
					key: '',
					value: 'Tax payable',
					number: 100
				},
				{
					key: '',
					value: 'Capital',
					number: 200
				},
				{
					key: '',
					value: 'Undistribuated profit',
					number: 100
				}
			],
			// 当前选择模块标题
			currentTitle: '',
			// 当前选择模块 年
			currentYear: '',
			// 当前选择模块 月
			currentMonth: {}
		}
	},
	components: {
		SubHeader,
		StepDialog
	},
	methods: {
		showPeriodDialog(title) {
			this.currentTitle = title
			this.isPeriodDialogShow = true
		},
		selectYear(e) {
			this.currentYear = e
		},
		selectMonth(e) {
			this.currentMonth = e
		},
		goToReport() {
			this.$router.push({ name: 'BalanceSheet' })
		}
	},
	mounted() {
		const today = new Date()
		this.currentYear = today.getFullYear()
		this.currentMonth = this.MONTH_OPTIONS[11 - today.getMonth()]
	}
}
</script>

<style lang="scss" scoped>
$color_gray: rgb(177, 195, 203);
$color_light_green: rgb(108, 178, 199);
$color_green: rgb(37, 158, 177);
$color_blue: rgb(94, 166, 214);

$border_radius: 12px;
$gap: 10px;

.content-center {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.report {
	.main {
		width: 1200px;
		margin: 60px auto;
		display: grid;
		grid-template-columns: repeat(3, 360px);
		grid-template-rows: repeat(2, 360px);
		gap: 40px 40px;
		place-content: center;
		color: #fff;
		font-size: 20px;
		font-weight: 500;
		// 所有模块样式
		.module {
			border-radius: 16px;
			padding: 24px;
			box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
			transition: 0.5s;
			cursor: pointer;
			position: relative;
			.tip {
				position: absolute;
				z-index: 99;
				top: 0;
				left: 0;
				right: 0;
				background-color: #fff;
				color: #303133;
				box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
				height: 0;
				text-align: center;
				line-height: 60px;
				transition: all 0.2s;
				overflow: hidden;
				border-radius: 16px;
				font-size: 20px;
				font-weight: 500;
			}
			&:hover {
				box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.16);
				.tip {
					height: 60px;
				}
			}
		}
		// 模块1样式
		.module1 {
			display: grid;
			grid-template-columns: repeat(2, 50%);
			grid-template-rows: repeat(2, 50%);
			place-content: center;
			grid-gap: 10px;
			div {
				@extend .content-center;
				border-radius: $border_radius;
			}
			.item1 {
				grid-area: 1 / 1 / 3 / 2;
				background-color: $color_blue;
			}
			.item2 {
				background-color: $color_light_green;
			}
			.item3 {
				background-color: $color_green;
			}
		}
		.module2 {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 3fr 1fr;
			place-content: center;
			gap: 10px;
			div {
				@extend .content-center;
				border-radius: $border_radius;
			}
			.item1 {
				grid-area: 1 / 1 / 3 / 2;
				background-color: $color_gray;
				display: flex;
				flex-direction: column;
				.sales {
					flex: 1;
				}
				.margin {
					flex: 2;
					background-color: $color_blue;
				}
			}
			.item2 {
				background-color: $color_light_green;
			}
			.item3 {
				background-color: $color_green;
			}
		}
		.module3 {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 2fr 1fr;
			place-content: center;
			gap: 10px;
			div {
				@extend .content-center;
				border-radius: $border_radius;
			}
			.item1 {
				font-size: 16px;
				background-color: $color_light_green;
			}
			.item2 {
				font-size: 16px;
				background-color: $color_green;
			}
			.item3 {
				font-size: 16px;
				background-color: $color_blue;
			}
			.item4 {
				grid-area: 2 / 1 / 3 / 4;
				background-color: $color_gray;
			}
		}
		.module4 {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 14px;
			text-align: center;
			.el-row {
				.el-col div {
					height: 30px;
					line-height: 30px;
					border-radius: 15px;
					background-color: $color_light_green;
				}
				.el-col:first-child div {
					background-color: $color_blue;
				}
				.el-col:last-child div {
					background-color: $color_green;
				}
				&.header {
					font-size: 16px;
					font-weight: 500;
					.el-col div {
						height: 30px;
						line-height: 30px;
						border-radius: 15px;
						background-color: $color_gray;
					}
				}
			}
		}
		.module5 {
			.container {
				width: 100%;
				height: 100%;
				padding: 20px;
				border-radius: 16px;
				background-color: $color_gray;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				text-align: center;
				.header {
					text-align: left;
				}
				.el-col div {
					font-size: 16px;
					height: 36px;
					line-height: 36px;
					border-radius: 18px;
				}
				.el-col:first-child div {
					background-color: $color_blue;
				}
				.el-col:last-child div {
					background-color: $color_green;
				}
			}
		}
	}
}
</style>