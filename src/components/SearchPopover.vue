<template>
  <div class="search-popover">
    <el-popover trigger="click" width="240">
      <el-input
        :placeholder="placeholder"
        :value="tmpValue"
        @input="valueChange"
        clearable
        class="search"
        size="mini"
        suffix-icon="el-icon-search"
      ></el-input>
      <el-row :gutter="20" justify="center" type="flex">
        <el-button size="mini" type="primary" @click="confirmSearch">Confirm</el-button>
        <el-button size="mini" @click="resetSearch">Reset</el-button>
      </el-row>
      <div class="title" slot="reference">
        {{ title }}
        <i class="el-icon-caret-bottom"></i>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		value: {
			required: true
		},
		placeholder: {
			type: String,
			default: ''
		}
  },
  data() {
    return {
      tmpValue: ''
    }
  },
  created() {
    this.tmpValue = this.value
  },
	methods: {
		valueChange(e) {
      this.tmpValue = e
    },
    confirmSearch() {
			this.$emit('input', this.tmpValue)
    },
    resetSearch() {
      this.tmpValue = ''
      this.confirmSearch()
    }
	}
}
</script>

<style scoped lang="scss">
.title {
	width: 100%;
	height: 100%;
	cursor: pointer;
}

.search {
  margin-bottom: 10px;
}
</style>