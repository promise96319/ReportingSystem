import request from './request'
import URL from './config'

/**
 * 根据公司id获取公司下所有用户信息
 * @param {Number} id 公司ID
 */
export const getUserList = (id) => {
  return request({
    method: 'get',
    url: `${URL.getUserList}/${id}/user`,
  })
}

/**
 * 邀请用户
 * @param {Number} company_id  公司ID
 * @param {String} email 用户邮箱
 */
export const inviteUser = (company_id, email) => {
  return request({
    method: 'get',
    url: URL.inviteUser,
    params: {
      company_id,
      email
    }
  })
}