import request from './request'
import URL from './config'

/**
 * 获取 general ledger
 * @param {Number} companyId  公司id
 * @param {String} startDate  起始日期：如 2020-07
 * @param {String} endDate    结束日期：如 2020-08
 */
export const getGeneralLedger = (companyId, startDate, endDate) => {
  return request({
    method: 'get',
    url: `${URL.getGeneralLedger}/${companyId}`,
    params: {
      start: startDate,
      end: endDate
    }
  })
}