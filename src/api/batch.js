import request from './request'
import URL from './config'

/**
 * 上传凭证数据文件，生成批次（batch）  => 使用 element-ui 的 upload 组件进行上传
 * @param {Number} companyId  公司id
 * @param {File} file 数据文件
 * @param {Bool} isAnalyze 返回结果是否对凭证名称字段进行解析。不传或传空字符串时为False，其他情况均为True
 */
// export const uploadBatch = (companyId, file, isAnalyze = '') => {
//   return request({
//     method: 'post',
//     url: `${URL.uploadBatch}/${companyId}`,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     data: {
//       file,
//       is_analyze: isAnalyze
//     }
//   })
// }

/**
 * 获取有数据的月份或批次
 * 1. 如果没有传入 month, 获取的是 该year下有数据的month
 * 2. 如果传入了month, 获取的是 该year，moth下的batch
 * @param {Number} companyId 公司id
 * @param {Number} year 年份
 * @param {Number} month 月份
 */
export const getBatch = (companyId, year, month) => {
  let params = {
    year
  }
  if (typeof month !== 'undefined') {
    params.month = month
  }
  return request({
    method: 'get',
    url: `${URL.getBatch}/${companyId}/batch`,
    params
  })
}

/**
 * 根据 batch id 查询batch详情
 * @param {*} companyId  公司id
 * @param {*} batchId  批次id
 * @param {*} isAnalyze 返回结果是否对凭证名称字段进行解析。不传或传空字符串时为False，其他情况均为True
 */
export const queryBatch = (companyId, batchId, isAnalyze = true) => {
  return request({
    method: 'get',
    url: `${URL.queryBatch}/${companyId}/batch/${batchId}`,
    params: {
      is_analyze: isAnalyze
    }
  })
}

/**
 * 根据 batch id 删除batch
 * @param {*} companyId  公司id
 * @param {*} batchId  批次id
 */
export const deleteBatch = (companyId, batchId) => {
  return request({
    method: 'delete',
    url: `${URL.queryBatch}/${companyId}/batch/${batchId}`
  })
}