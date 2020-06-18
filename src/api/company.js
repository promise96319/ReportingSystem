import request from './request'
import URL from './config'

/**
 * 获取已登录用户的公司列表
 */
export const getCompanyList = () => {
  return request({
    url: URL.getCompanyList,
    method: 'get',
  })
}

/**
 * 根据ID获取公司信息
 * @param {Number} id 公司ID
 */
export const getCompanyDetail = (id) => {
  return request({
    method: 'get',
    url: `${URL.getCompanyDetail}/${id}`
  })
}

// export const uploadCompanyLogo = (file) => {
//   return request({
//     method: 'post',
//     url: URL.uploadCompanyLogo,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     data: {
//       file
//     }
//   })
// }

/**
 * 添加公司
 * @param {对象} data 公司
 */
export const addCompany = (data) => {
  return request({
    method: 'post',
    url: URL.addCompany,
    data
  })
}

/**
 * 更新公司信息
 * @param {Number} id 公司ID
 * @param {对象} data 公司详情 
 */
export const updateCompany = (id, data) => {
  return request({
    method: 'patch',
    url: `${URL.updateCompany}/${id}`,
    data,
  })
}
