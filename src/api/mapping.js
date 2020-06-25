import request from './request'
import URL from './config'

/**
 * 根据 公司id获取当前语言下的匹配项和未匹配项
 * @param {Number} companyId 公司id
 * @param {String} region 当前语言
 */
export const getMappingList = (companyId, region) => {
  return request({
    method: 'get',
    url: `${URL.getMappingList}/${companyId}`,
    params: {
      region
    }
  })
}

/**
 * 上传手动匹配后的未匹配项
 * @param {Number} companyId 公司id
 * @param {String} region 当前语言
 * @param {Array} mappingList 匹配后的数据
 */
export const uploadMappingList = (companyId, region, mappingList) => {
  return request({
    method: 'post',
    url: `${URL.uploadMappingList}/${companyId}`,
    params: {
      region
    },
    data: {
      mapping_list: mappingList
    }
  })
}

/**
 * 更新匹配的数据
 * @param {Number} companyId 公司id
 * @param {String} region 当前语言
 * @param {Object} mapping 更新后的数据 { account_no, matched_account_no, matched_account_name }
 */
export const updateMappingList = (companyId, region, mapping) => {
  return request({
    method: 'patch',
    url: `${URL.updateMappingList}/${companyId}`,
    params: {
      region
    },
    data: {
      ...mapping
    }
  })
}