<template>
  <div class="cash-flow-statement">
    <SubHeader title="Balance Sheet">
      <el-button
        class="primary-icon"
        icon="el-icon-s-data"
        size="medium"
        type="primary"
        @click="$router.go(-1)"
        >Reports</el-button
      >
    </SubHeader>
    <div class="main"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cash-flow-statement {
}
</style>
