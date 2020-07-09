<template>
	<div class="sub-header">
		<el-row type="flex" align="middle">
			<el-button v-if="isBack" class="back" type="text" icon="el-icon-back" @click="$router.go(-1)">Back</el-button>
			<el-divider v-if="isBack" direction="vertical"></el-divider>
      <div class="title">{{ title }}</div>
			<slot name="left"></slot>
		</el-row>
		<el-row type="flex" justify="end" align="middle" class="right">
			<slot></slot>
		</el-row>
	</div>
</template>

<script>
export default {
	props: {
		isBack: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			required: true
		},
	}
};
</script>

<style lang="scss" scoped>
.sub-header {
	height: 60px;
	line-height: 60px;
	padding: 0 30px;
  // background-color: #f5f5f5;
	background-color: #f9f9f9;
	border-bottom: 1px solid #ebeef5;
	display: flex;
	justify-content: space-between;
  align-items: center;
  .el-divider {
    margin: 0 16px;
  }
	.title {
		font-size: 20px;
		font-weight: 600;
	}
}
</style>