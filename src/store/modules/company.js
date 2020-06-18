
import { CURRENT_COMPANY_ID } from '@/constant/storageKey'

export const SET_COMPANY_LIST = 'SET_COMPANY_LIST'
export const SET_CURRENT_COMPANY = 'SET_CURRENT_COMPANY'

const company = {
  state: {
    companyList: [],
    currentCompany: {},
  },
  mutations: {
    [SET_COMPANY_LIST](state, payload) {
      state.companyList = payload
    },
    [SET_CURRENT_COMPANY](state, payload) {
      // 将id存储在本地，以防刷新后丢失
      localStorage.setItem(CURRENT_COMPANY_ID, payload.id)
      state.currentCompany = payload
    },
  }
}

export default company
