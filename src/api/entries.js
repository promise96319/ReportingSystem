import request from './request'
import URL from './config'

/**
 * 获取所有 entries
 * @param {Number} companyId  公司id
 * @param {String} region  当前语言
 */
export const getEntries = (companyId, region) => {
  return request({
    method: 'get',
    url: `${URL.getEntries}/${companyId}`,
    params: {
      region
    }
  })
}
