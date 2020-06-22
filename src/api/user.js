import request from './request'
import URL from './config'

/**
 * 用户登录
 * @param {邮箱} email
 * @param {密码} password
 */
export const login = (email, password) => {
  return request({
    method: 'post',
    url: URL.login,
    data: {
      email,
      password
    }
  })
}

/**
 * 获取登录用户信息
 */
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: URL.getUserInfo
  })
}

/**
 * 登出
 */
export const logout = () => {
  return request({
    method: 'get',
    url: URL.logout
  })
}
