<template>
	<div class="intro">
		<el-steps direction="vertical">
			<el-step title="Step 1">
				<div
					slot="description"
					class="description"
				>Import new data of accounting entries prepared with another bookkeeping software</div>
				<svg-icon class="step-icon" icon-class="upload" slot="icon"></svg-icon>
			</el-step>
			<el-step title="Step 2" description="Update the chart of accounts based on the imported data">
				<svg-icon class="step-icon" icon-class="edit" slot="icon"></svg-icon>
			</el-step>
			<el-step
				title="Step 3"
				description="Update the mapping table and make sure that all the accounts from the imported data are matched with the foreign accounts"
			>
				<svg-icon class="step-icon" icon-class="repeat" slot="icon"></svg-icon>
			</el-step>
			<el-step title="Step 4" description="Get the dashboard and the financial reports updated">
				<svg-icon class="step-icon" icon-class="file" slot="icon"></svg-icon>
			</el-step>
		</el-steps>

		<div class="started">
			<el-button
				class="get-started"
				type="primary"
				@click="
            () => {
              $router.push({ name: 'DataImport' });
            }
          "
			>Get started</el-button>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-steps {
	height: 400px;
	width: 700px;
	margin: 0px auto 60px;

	/deep/ .is-wait {
		font-size: 22px;
		font-weight: 700;
		color: #303133;
		border-color: #606266;
	}

	/deep/ .el-step__description.is-wait {
		font-size: 18px;
		color: #606266;
		font-weight: 500;
		word-wrap: break-word;
		word-break: normal;
		margin: 4px 0 4px 16px;
	}

	/deep/ .el-step__icon {
		border: none;
		width: 28px;
		height: 28px;
		border-radius: 14;
	}

	.step-icon {
		font-size: 24px;
		stroke: #303133;
	}

	.description {
		word-wrap: break-word;
	}
}
.started {
  text-align: center;
  .el-button {
    width: 200px;
  }
}
</style>