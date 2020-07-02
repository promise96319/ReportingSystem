import request from './request'
import URL from './config'

/**
 * 获取所有 entries
 * @param {Number} companyId  公司id
 */
export const getEntries = (companyId) => {
  return request({
    method: 'get',
    url: `${URL.getEntries}/${companyId}`,
  })
}
