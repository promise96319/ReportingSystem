import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { LOGOUT } from '@/store/modules/user'

// create an axios instance
const request = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // let token = tokenManager.getToken()
    // token = token ? token : ''
    // console.log('token', token)
    // 请求头上都携带token，需要验证 token 的接口自然会验证
    // config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  error => {
    console.log('err', error)
    Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回 0003 则说明权限有问题，登出并返回到登录页
   */
  response => {
    const res = response.data

    // 说明获取不到正确信息
    if (res.error_code != 0 && res.message) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5000,
      })
    }

    return response
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
