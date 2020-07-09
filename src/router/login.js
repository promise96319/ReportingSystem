const Login = () => import('@/pages/login/Login')
const ForgetPassword = () => import('@/pages/login/ForgetPassword')
const SetPassword = () => import('@/pages/login/SetPassword')

export default [
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
  }
]