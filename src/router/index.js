import Vue from 'vue'
import Router from 'vue-router'

import BasicLayout from '@/components/BasicLayout'

const Login = () => import('@/pages/login/Login')
const ForgetPassword = () => import('@/pages/login/ForgetPassword')
const SetPassword = () => import('@/pages/login/SetPassword')

const Home = () => import('@/pages/home/Home')
const Report = () => import('@/pages/home/Report')
const BalanceSheet = () => import('@/pages/home/reports/BalanceSheet')

const Profile = () => import('@/pages/user/Profile')
const Settings = () => import('@/pages/user/Settings')
const UserManagement = () => import('@/pages/user/UserManagement')

const DataImport = () => import('@/pages/main/DataImport')
const DataMaintenance = () => import('@/pages/main/DataMaintenance')
const AccountList = () => import('@/pages/main/AccountList')
const Mapping = () => import('@/pages/main/Mapping')
const ReportResult = () => import('@/pages/main/ReportResult')

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/findpassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/password/set',
      name: 'SetPassword',
      component: SetPassword
    },
    {
      path: '/',
      name: 'BasicLayout',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: '/report',
          name: 'Report',
          component: Report
        },
        {
          path: '/report/balance-sheet',
          name: 'BalanceSheet',
          component: BalanceSheet,
        },

        {
          path: '/profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: '/usermanagement',
          name: 'UserManagement',
          component: UserManagement
        },

        {
          path: '/data/import',
          name: 'DataImport',
          component: DataImport,
          meta: {
            isSideBar: true
          }
        },
        {
          path: '/data/maintenance',
          name: 'DataMaintenance',
          component: DataMaintenance,
          meta: {
            isSideBar: true
          }
        },
        
        {
          path: '/accounts',
          name: 'AccountList',
          component: AccountList,
          meta: {
            isSideBar: true
          }
        },
        {
          path: '/mapping',
          name: 'Mapping',
          component: Mapping,
          meta: {
            isSideBar: true
          }
        },
        {
          path: '/results',
          name: 'ReportResult',
          component: ReportResult,
          meta: {
            isSideBar: true
          }
        },
      ]
    }
  ]
})
