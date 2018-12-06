import axios from 'axios'
import storage from '../module/storage'
import router from '../router/index'
import { MessageBox } from 'element-ui'
const instance = axios.create({
  baseURL: window.global.ajaxDefectUrl + 'pcs/controller',
  withCredentials: true
})
/**
 * 添加请求拦截器，不是登录接口情况下，在header中添加token字段
 */
instance.interceptors.request.use(
  config => {
    if (!config.url.includes('login')) {
      const user = storage.getUser(true)
      if (user) config.headers.token = user.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.data.message.includes('请重新登录')) {
      MessageBox.alert(error.response.data.message, '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          storage.removeUser(true)
          router.push({path: '/login'})
        }
      })
    }
    return Promise.reject(error)
  }
)
export default instance
