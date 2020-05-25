<template>
	<div class="report">
		<SubHeader title="Reports">
			<el-button
				size="medium"
				icon="el-icon-s-data"
				plain
				@click="$router.push({ name: 'Home' })"
			>Dashboard</el-button>
			<el-button size="medium" class="primary-icon" type="primary" @click="isStepDialogShow=true">
				<svg-icon icon-class="plus-square"></svg-icon>New data
			</el-button>
		</SubHeader>

		<div class="main">
			<div class="module module1">
				<div class="item1">Assets</div>
				<div class="item2">Liabities</div>
				<div class="item3">Equity</div>
			</div>
			<div class="module module2">
				<div class="item1">
					<div class="sales">Sales revenus</div>
					<div class="margin">Margin</div>
				</div>
				<div class="item2">Expenses</div>
				<div class="item3">Net income</div>
			</div>
			<div class="module module3">
				<div class="item1">Operating activities</div>
				<div class="item2">Investing activities</div>
				<div class="item3">Finacing activities</div>
				<div class="item4">Net Cash flow</div>
			</div>
			<div class="module module4">
				<el-row class="header" :gutter="10">
					<el-col :span="12"><div>Account</div></el-col>
					<el-col :span="6"><div>Debit</div></el-col>
					<el-col :span="6"><div>Credit</div></el-col>
				</el-row>
				<el-row v-for="(item, index) in accountOptions" :key="index" :gutter="10">
					<el-col :span="12">
						<div>{{ item.value }}</div>
					</el-col>
					<el-col :span="6">
						<div>{{ index * 100 }}</div>
					</el-col>
					<el-col :span="6">
						<div>{{ index * 100 }}</div>
					</el-col>
				</el-row>
			</div>
			<div class="module module5">
				<div class="container">
					<div class="header">Account Receivable</div>
					<el-row :gutter="16">
						<el-col :span="16"><div>Sell 500 items</div></el-col>
						<el-col :span="8"><div>2000</div></el-col>
					</el-row>
					<el-row :gutter="16">
						<el-col :span="16"><div>Sell 200 items</div></el-col>
						<el-col :span="8"><div>800</div></el-col>
					</el-row>
					<el-row :gutter="16">
						<el-col :span="16"><div>Payment received</div></el-col>
						<el-col :span="8"><div>-2000</div></el-col>
					</el-row>
					<el-row :gutter="16">
						<el-col :span="16"><div>Goods return 300</div></el-col>
						<el-col :span="8"><div>-800</div></el-col>
					</el-row>
				</div>
			</div>
		</div>

		<el-dialog title :visible.sync="isStepDialogShow" width="800px">
			<StepDialog></StepDialog>
		</el-dialog>
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
import StepDialog from "./compoents/StepDialog";
export default {
	data() {
		return {
			isStepDialogShow: false,
			accountOptions: [
				{
					key: "",
					value: "Cash"
				},
				{
					key: "",
					value: "Bank"
				},
				{
					key: "",
					value: "Account receivable"
				},
				{
					key: "",
					value: "Account payable"
				},
				{
					key: "",
					value: "Tax payable"
				},
				{
					key: "",
					value: "Capital"
				},
				{
					key: "",
					value: "Undistribuated profit"
				}
			]
		};
	},
	components: {
		SubHeader,
		StepDialog
	}
};
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
			&:hover {
				box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.16);
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