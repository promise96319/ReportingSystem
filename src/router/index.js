import Vue from 'vue'
import Router from 'vue-router'

import BasicLayout from '@/components/BasicLayout'

import login from './login'
import user from './user'
import home from './home'
import main from './main'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default new Router({
  routes: [
    ...login,
    {
      path: '/',
      name: 'BasicLayout',
      component: BasicLayout,
      children: [...user, ...home, ...main]
    }
  ]
})
