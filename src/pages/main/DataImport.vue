<template>
  <div class="import">
    <SubHeader title="Data import">
      <el-button
        class="data-maintenance"
        icon="el-icon-document-copy"
        type="primary"
        size="medium"
        @click="$router.push({ name: 'DataMaintenance' })"
        >Data maintenance</el-button
      >
    </SubHeader>
    <div class="main">
      <el-upload
        ref="upload"
        class="upload-content"
        drag
        :action="`${URL.uploadBatch}/${currentCompany.id}`"
        :data="{ is_analyze: true }"
        :auto-upload="false"
        :multiple="false"
        accept=".xls, xml, xlt, .xlsx"
        :show-file-list="false"
        :on-change="fileChange"
        :on-success="uploadSuccess"
        :on-fail="uploadFail"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Drag & Drop or
          <em>Hit</em> to add file
          <div class="el-upload__tip">Only Excel files can be uploaded</div>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">Only Excel files can be uploaded</div> -->
      </el-upload>

      <div
        v-if="currentDate && currentBatch && importedData.length > 0"
        class="current-batch"
      >
        Batch: {{ currentDate }} Batch{{ currentBatch }}
      </div>

      <importedDataTable
        v-if="importedData.length > 0"
        :imported-data="importedData"
      ></importedDataTable>
    </div>

    <el-dialog
      title="Do you want to import the data?"
      :visible.sync="isUploadConfirmDialogShow"
      width="540px"
      class="upload-confirm"
    >
      <div class="file-list">
        <i class="el-icon-document"></i> File:
        {{ currentFile ? currentFile.name : '' }}
      </div>
      <div slot="footer">
        <el-button
          type="primary"
          :loading="isUploadingBatch"
          @click="uploadBatch"
          >Confirm</el-button
        >
        <el-button plain @click="isUploadConfirmDialogShow = false"
          >Cancel</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import importedDataTable from './components/ImportedDataTable'
import URL from '@/api/config'
import { MONTH_OPTIONS } from '@/constant/dateOptions'

export default {
  components: {
    SubHeader,
    importedDataTable
  },
  data() {
    return {
      URL,

      isUploadConfirmDialogShow: false,
      isUploadingBatch: false,
      // 当前上传的文件
      currentFile: null,

      // 当前导入的数据
      importedData: [],
      // 当前导入数据的批次
      currentBatch: '',
      // 当前导入数据的日期
      currentDate: ''
    }
  },
  computed: {
    currentCompany() {
      return this.$store.getters.currentCompany
    },
    currentType() {
      return this.$store.getters.currentType
    }
  },
  methods: {
    fileChange(file) {
      this.currentFile = file
      this.isUploadConfirmDialogShow = true
    },
    async uploadBatch() {
      this.isUploadingBatch = true
      this.$refs.upload.submit()
    },
    // 上传文件成功
    uploadSuccess(res) {
      this.$nextTick(() => {
        this.isUploadConfirmDialogShow = false
      })
      this.isUploadingBatch = false
      if (res.error_code === 0) {
        const { create_time, number, data } = res.data
        this.currentBatch = number
        this.importedData = data
        let date = new Date(create_time)
        let year = date.getFullYear()
        let monthNum = date.getMonth() + 1
        let month = MONTH_OPTIONS.find((item) => {
          return item.key == monthNum
        })
        // '2020 July'
        this.currentDate = `${year} ${month.value}`
      } else {
        if (res.message) {
          this.$message.error(res.message)
        }
      }
    },
    uploadFail(res) {
      this.isUploadingBatch = false
      if (res.message) {
        this.$message.error(res.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.import {
  .current-batch {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 700;
  }
  .main {
    padding: 30px;
    /deep/ .el-upload {
      width: 100%;
      margin-bottom: 10px;
      .el-upload-dragger {
        width: 100%;
        // background-color: rgba($color: #f9f9f9, $alpha: 1);
        background-color: rgba($color: #409eff, $alpha: 0.1);
      }
    }
  }
}
</style>
