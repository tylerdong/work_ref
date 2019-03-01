import axios from 'axios'
import config from '../module/config'

let baseUrl = config.baseUrl.pro
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = config.baseUrl.dev
    break
  case 'test':
    baseUrl = config.baseUrl.devtest
    break
  default:
    baseUrl = config.baseUrl.pro
    break
}


const instance = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true
})
/**
 * 添加请求拦截器，在header中添加token字段
 */
instance.interceptors.request.use(
  // config => {
  //   if (!config.url.includes('login')) {
  //     const user = storage.getUser(true)
  //     if (user) config.headers.token = user.token
  //   }
  //   return config
  // },
  // error => {
  //   return Promise.reject(error)
  // }
  // TODO
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  // response => {
  //   return response
  // },
  // error => {
  //   if (error.response.data.message.includes('请重新登录')) {
  //     MessageBox.alert(error.response.data.message, '提示', {
  //       confirmButtonText: '确定',
  //       type: 'warning',
  //       callback: action => {
  //         storage.removeUser(true)
  //         router.push({path: '/login'})
  //       }
  //     })
  //   }
  //   return Promise.reject(error)
  // }
  // TODO
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance