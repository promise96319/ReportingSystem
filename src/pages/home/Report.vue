<template>
	<div class="report">
		<SubHeader :is-back="true" title="Reports">
			<el-button
				class="new-data primary-icon"
				type="primary"
				@click="isStepDialogShow=true"
			>
				<svg-icon icon-class="plus-square"></svg-icon>New data
			</el-button>
		</SubHeader>

		<div class="main"></div>

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
			isStepDialogShow: false
		};
	},
	components: {
		SubHeader,
		StepDialog
	}
};
</script>

<style lang="scss" scoped>
.report {
	.main {
	}
}
</style>