<template>
  <div class="home">
    <SubHeader title="Dashboard">
      <el-button
        size="medium"
        icon="el-icon-s-data"
        plain
        @click="$router.push({ name: 'Report' })"
        >Reports</el-button
      >
      <el-button
        size="medium"
        class="primary-icon"
        type="primary"
        @click="isStepDialogShow = true"
      >
        <svg-icon icon-class="plus-square"></svg-icon>New data
      </el-button>
    </SubHeader>

    <div class="main"></div>

    <el-dialog :visible.sync="isStepDialogShow" width="800px">
      <StepDialog></StepDialog>
    </el-dialog>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import StepDialog from './components/StepDialog'

export default {
  components: {
    SubHeader,
    StepDialog
  },
  data() {
    return {
      isStepDialogShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .main {
  }
}
</style>
