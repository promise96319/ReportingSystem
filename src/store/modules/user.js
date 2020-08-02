import api from '@/api'
import tokenManager from '@/tools/tokenManager'
import { Message } from 'element-ui'
import router from '@/router/index'
import { SET_COMPANY_LIST, SET_CURRENT_COMPANY } from './company'

export const CHANGE_USER = 'CHANGE_USER'
export const LOGOUT = 'LOGOUT'

const user = {
  state: {
    // 用户信息
    user: {}
  },
  mutations: {
    [CHANGE_USER](state, user) {
      state.user = user
    },
    [LOGOUT](state) {
      state.user = {}
      tokenManager.clearToken()
      router.push({ name: 'Login' })
      Message.warning('登录已过期，请重新登录')
    }
  },
  actions: {
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .getUserInfo()
          .then((res) => {
            // 只有正确获取信息时才能改变用户状态
            if (res.data.error_code === 0) {
              const user = res.data.data
              commit(CHANGE_USER, user)
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 远程登出
    RemoteLogout({ commit, state }) {
      /**
       * 请求远程登出
       * 1. 如果 token 失效，或者出现未知错误，本地登出
       * 2. 否则 远程登出
       */
      return new Promise((resolve, reject) => {
        api
          .logout()
          .then((res) => {
            if (res.data.error_code === 0) {
              commit(CHANGE_USER, {})
              commit(SET_COMPANY_LIST, [])
              commit(SET_CURRENT_COMPANY, {})
              router.push({ name: 'Login' })
              Message.success('登出成功')
              resolve()
            } else {
              // 本地登出
              commit(LOGOUT)
              reject()
            }
          })
          .catch(() => {
            // 本地登出, 清除状态
            commit(SET_COMPANY_LIST, [])
            commit(SET_CURRENT_COMPANY, {})
            commit(LOGOUT)
            reject()
          })
      })
    }
  }
}

export default user
