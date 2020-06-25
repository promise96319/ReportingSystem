import { CURRENT_ACCOUNT_TYPE } from '@/constant/storageKey'
import { CN } from '@/constant/accountType'

export const CHANGE_TYPE = 'CHANGE_TYPE'

const account = {
  state: {
    // 当前选择的Type,取值CN|EN|FR, 默认EN
    currentType: '',
  },
  getters: {
    currentType(state) {
      if (state.currentType === '') {
        // 如果页面第一次渲染，则去本地取用户选择的类型
        let type = localStorage.getItem(CURRENT_ACCOUNT_TYPE)
        return type || CN
      } else {
        return state.currentType
      }
    }
  },
  mutations: {
    [CHANGE_TYPE](state, payload) {
      localStorage.setItem(CURRENT_ACCOUNT_TYPE, payload)
      state.currentType = payload
    }
  }
}

export default account
