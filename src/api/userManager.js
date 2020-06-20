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

/**
 * 通过 token 获取用户 email，看 token 是否有过期
 * @param {String}} token 邀请邮箱的 token
 */
export const checkEmail = (token) => {
  return request({
    method: 'get',
    url: URL.checkEmail,
    params: {
      token
    }
  })
}

/**
 * 通过邮箱token，和用户设定的 password 进行注册
 * @param {*} token 
 * @param {*} password 
 */
export const register = (token, password) => {
  return request({
    method: 'post',
    url: URL.register,
    data: {
      token,
      password,
    }
  })
}

/**
 * 更新用户密码
 * 1. 管理员修改非管理员用户密码时不需要传 oldPassword，但需要传 companyId
 * 2. 用户自己更改密码时需要传 old_password
 * @param {*} userId 
 * @param {*} password 
 * @param {*} oldPassword 
 * @param {*} companyId 
 */
export const updatePassword = (userId, password, oldPassword, companyId) => {
  let data = { password }
  if (typeof oldPassword !== undefined) {
    data.old_password = oldPassword
  }

  if (typeof companyId !== undefined) {
    data.company_id = companyId
  }

  return request({
    method: 'patch',
    url: `${URL.updatePassword}/${userId}`,
    data,
  })
}

/**
 * 更新公司下用户权限
 * @param {Number} companyId 公司id
 * @param {Number} userId 用户id
 * @param {String} role 用户角色 admin/write/read
 */
export const updateRole = (companyId, userId, role) => {
  return request({
    method: 'patch',
    url: `${URL.updateRole}/${companyId}/user/${userId}`,
    data: {
      role
    }
  })
}

/**
 * 删除公司下用户
 * @param {Number} companyId 公司id
 * @param {Number} userId 用户id
 */
export const deleteUser = (companyId, userId) => {
  return request({
    method: 'delete',
    url: `${URL.updateRole}/${companyId}/user/${userId}`,
  })
}


