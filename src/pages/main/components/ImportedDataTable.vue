<template>
	<div class="imported-data">
		<el-table 
		:data="importedData" 
		border 
		style="width: 100%" 
		:row-class-name="tableRowClassName"
		size="medium">
			<el-table-column
				v-for="(item, index) in importedDataKey"
				:key="index"
				:prop="item.key"
				:label="item.value"
				align="center"
				header-align="center"
			></el-table-column>
		</el-table>
	</div>
</template>

<script>
import importedDataKey from "@/constant/importedDataKey";

export default {
	props: {
		importedData: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			importedDataKey
		};
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

<style lang="scss" scoped>
@import "../../../styles/customTable.scss";
</style>