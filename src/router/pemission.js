import router from './index'
import { TOGGLE_SIDEBAR } from '@/store/modules/app'
import store from '@/store'

import api from '@/api'
import { SET_COMPANY_LIST, SET_CURRENT_COMPANY } from '@/store/modules/company'
import { CURRENT_COMPANY_ID } from '@/constant/storageKey'

// 登录状况下每次都会获取公司信息
const getCompanyInfo = async (callback) => {
  const currentCompany = store.getters.currentCompany

  // 如果当前公司id存在，则不进行处理
  if (currentCompany.id || currentCompany.id === 0) { 
    callback(true)
    return
  }

  // 否则请求公司列表
  const res = await api.getCompanyList()
  if (res.data && res.data.data) {
    const { companies } = res.data.data
    store.commit('SET_COMPANY_LIST', companies)
    if (companies.length === 0) { 
      console.log('异常错误：该用户没有绑定任何公司！')
      callback(false)
      return
    }
    // 如果公司只有一个的话，默认这个公司就是当前公司
    if (companies.length === 1) {
      store.commit('SET_CURRENT_COMPANY', companies[0])
      callback(true)
      return
    } 
    
    // 如果本地有设置公司ID的话，则请求该ID，否则，请求第一个公司信息
    const companyID = localStorage.getItem(CURRENT_COMPANY_ID)
    let currentCompany = companies.find((item) => { return item.id == companyID })
    store.commit('SET_CURRENT_COMPANY', currentCompany ? currentCompany : companies[0])
    callback(true)
  }
  callback(false)
}

// Router pemission
// If login is false, redirect to Login page
router.beforeEach((to, from, next) => {

  store.commit(TOGGLE_SIDEBAR, to.meta.isSideBar)

  const NOT_CHECK_PERMISSION = ['Login']

  // 如果有用户信息，如果去不需要登录的界面则调回首页
  // 如果没有用户信息，且是去登录页，则直接去
  // 否则获取用户信息，如果没有获取，跳会登录页

  let user = store.getters.user
  let isUserExisted = user && (user.id || user.id === 0)

  if (isUserExisted) {
    if (NOT_CHECK_PERMISSION.includes(to.name)) {
      next('/')
      return
    }
    getCompanyInfo((isEnded) => {
      next()
    })
    return
  }

  if (NOT_CHECK_PERMISSION.includes(to.name)) {
    next()
    return
  }

  store.dispatch('GetUserInfo')
    .then((res) => {
      // 获取用户信息成功
      getCompanyInfo((isEnded) => {
        next()
      })
    })
    .catch((err) => {
      // 获取用户信息失败
      next({ name: 'Login' })
    })
})

