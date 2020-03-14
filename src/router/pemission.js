import router from './index'
import { TOGGLE_SIDEBAR } from '@/store/modules/app'
import store from '@/store'

// Router pemission
// If login is false, redirect to Login page
router.beforeEach((to, from, next) => {
  
  store.commit(TOGGLE_SIDEBAR, to.meta.isSideBar)
  next() 
})
