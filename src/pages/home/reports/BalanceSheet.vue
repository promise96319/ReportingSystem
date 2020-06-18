<template>
	<div class="balance-sheet">
		<SubHeader title="Balance Sheet">
			<el-button
				size="medium"
				icon="el-icon-s-data"
				type="primary"
				class="primary-icon"
				@click="$router.go(-1)"
			>Reports</el-button>
		</SubHeader>
		<div class="main">
		</div>
	</div>
</template>

<script>
import SubHeader from "@/components/SubHeader";
export default {
	components: {
		SubHeader
	}
};
</script>

<style lang="scss" scoped>
.balance-sheet {
}
</style>