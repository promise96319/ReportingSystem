<template>
	<div class="import">
		<SubHeader
			:is-back="true"
			title="Data maintenance"
		>
			<div class="filter-title">Batch:</div>
			<el-select
				v-model="filterCondition.year"
				size="medium"
				placeholder="Year"
				@change="getMonthByYear"
			>
				<el-option
					v-for="year in YEAR_OPTIONS"
					:key="year"
					:value="year"
				></el-option>
			</el-select>
			<el-select
				v-model="filterCondition.month"
				size="medium"
				placeholder="Month"
				@change="getBatchByMonth"
			>
				<el-option
					v-for="month in monthOptions"
					:key="month"
					:value="month"
					:label="month | monthFormat"
				></el-option>
			</el-select>
			<el-select
				v-model="filterCondition.batch"
				size="medium"
				placeholder="Batch"
				value-key="id"
				@change="queryBatch"
			>
				<el-option
					v-for="batch in batchOptions"
					:key="batch.id"
					:value="batch"
					:label="`Batch${batch.number}`"
				></el-option>
			</el-select>

			<!-- <el-button
				type="primary"
				size="medium"
				class="filter primary-icon"
				@click="queryBatch"
			>
				<svg-icon icon-class="filter"></svg-icon>Filter
			</el-button> -->
			<el-button
				type="danger"
				size="medium"
				icon="el-icon-delete"
				@click="isDeleteBatchDialogShow=true"
			>Delete</el-button>
		</SubHeader>
		<div class="main">
			<importedDataTable
				:imported-data="importedData"
				:loading="isGettingBatchData"
			></importedDataTable>
		</div>

		<el-dialog
			title="Batch: 2020 July Batch08"
			:visible.sync="isDeleteBatchDialogShow"
			width="540px"
			class="upload-confirm"
		>
			<div class="delete-batch">
				Do you want to delete these data?
			</div>
			<div slot="footer">
				<el-button
					type="primary"
					:loading="isDeletingBatch"
					@click="deleteBatch"
				>Confirm</el-button>
				<el-button
					plain
					@click="isDeleteBatchDialogShow=false"
				>Cancel</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import importedDataTable from './components/ImportedDataTable'
import { YEAR_OPTIONS, MONTH_OPTIONS } from '@/constant/dateOptions'
import api from '@/api'

export default {
	data() {
		return {
			YEAR_OPTIONS,
			monthOptions: [],
			batchOptions: [],

			isDeleteBatchDialogShow: false,

			filterCondition: {
				// 默认为当年
				year: 2020,
				// 当为 '' 时说明没有选择 month
				month: '',
				// 当为 {} 时说明没有选择 batch
				batch: {
					// id: 0,
					// number: 0,
				}
			},
			currentBatchId: -1,
			importedData: [],
			isGettingBatchData: false,
			isDeletingBatch: false,
		}
	},
	filters: {
		monthFormat(month) {
			let findedMonth = MONTH_OPTIONS.find(item => {
				return item.key == month
			})
			return findedMonth.value
		}
	},
	computed: {
		currentCompany() {
			return this.$store.getters.currentCompany
		}
	},
	components: {
		SubHeader,
		importedDataTable
	},
	created() {
		this.filterCondition.year = new Date().getFullYear()
		this.isGettingBatchData = true
		this.getMonth()
	},
	methods: {
		// 选择 年份的时候，month, batch 重置
		resetMonthAndBatch() {
			this.monthOptions = []
			this.filterCondition.month = ''
			this.resetBatch()
		},
		resetBatch() {
			this.batchOptions = []
			this.filterCondition.batch = {}
		},
		// 选择 月份的时候，batch 重置
		// 根据年份获取 month
		async getMonth() {
			// 通过year请求month
			const res = await api.getBatch(
				this.currentCompany.id,
				this.filterCondition.year
			)
			if (res.data.error_code !== 0) {
				this.isGettingBatchData = false
				return
			}

			const { month } = res.data.data
			this.monthOptions = month
			// 如果month存在，默认选择最大的month
			if (month.length > 0) {
				// 当月份不存时，改变月份（默认为最大值）
				this.filterCondition.month = Math.max(...month)
				this.getBatch()
			} else {
				this.isGettingBatchData = false
			}
		},
		async getBatch() {
			const res = await api.getBatch(
				this.currentCompany.id,
				this.filterCondition.year,
				this.filterCondition.month
			)
			if (res.data.error_code !== 0) {
				this.isGettingBatchData = false
				return
			}
			const { batch } = res.data.data
			this.batchOptions = batch.reverse()
			if (this.batchOptions.length > 0) {
				let batch = { number: -1 }

				this.batchOptions.forEach(item => {
					if (item.number > batch.number) {
						batch = item
					}
				})
				this.filterCondition.batch = batch
				this.queryBatch()
			} else {
				this.isGettingBatchData = false
			}
		},
		getMonthByYear() {
			this.resetMonthAndBatch()
			this.getMonth()
		},
		getBatchByMonth() {
			this.resetBatch()
			this.getBatch()
		},
		// 根据 year month batch 搜索凭证结果
		async queryBatch() {
			// 如果没有选择 batch
			const id = this.filterCondition.batch.id
			if (!id && id !== 0) {
				this.$message.error('Please select the batch at first')
				return
			}
			if (id === this.currentBatchId) {
				// 防止重复请求
				return
			}
			this.currentBatchId = id

			this.isGettingBatchData = true
			const res = await api.queryBatch(id)
			this.isGettingBatchData = false
			if (res.data.error_code !== 0) {
				return
			}
			this.importedData = res.data.data.data
		},
		async deleteBatch() {
			const id = this.filterCondition.batch.id
			if (!id && id !== 0) {
				this.$message.error('Please select the batch at first')
				return
			}
			this.isDeletingBatch = true
			const res = await api.deleteBatch(this.currentCompany.id, id)
			this.isDeletingBatch = false
			if (res.data.error_code !== 0) {
				return
			}
			this.$message.success('删除成功')
			this.isDeleteBatchDialogShow = false
			// 此时 需要重新请求搜索选项
			this.getMonth()
		}
	}
}
</script>

<style scoped lang="scss">
.import {
	.filter-title {
		margin-right: 10px;
	}
	.el-select {
		width: 100px;
		margin-right: 10px;
	}
	.filter {
		width: 100px;
	}
	.main {
		padding: 30px;
	}
}
</style>