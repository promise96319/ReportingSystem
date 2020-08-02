export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

const app = {
  state: {
    // side bar 是否高亮显示
    isSideBarActive: false
  },
  mutations: {
    [TOGGLE_SIDEBAR](state, payload) {
      state.isSideBarActive = payload
    }
  }
}

export default app
