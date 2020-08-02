import { CURRENT_COMPANY_ID } from '@/constant/storageKey'

export const SET_COMPANY_LIST = 'SET_COMPANY_LIST'
export const SET_CURRENT_COMPANY = 'SET_CURRENT_COMPANY'

const company = {
  state: {
    // 当前用户公司列表
    companyList: [],
    // 当前用户选择的当前公司
    currentCompany: {}
  },
  mutations: {
    [SET_COMPANY_LIST](state, payload) {
      state.companyList = payload
    },
    [SET_CURRENT_COMPANY](state, payload) {
      // 将id存储在本地，以防刷新后丢失
      localStorage.setItem(CURRENT_COMPANY_ID, payload.id)
      state.currentCompany = payload
    }
  }
}

export default company
