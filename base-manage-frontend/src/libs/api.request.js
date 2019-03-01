import HttpRequest from '@/libs/axios'
import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
let baseUrl = config.baseUrl.pro

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = config.baseUrl.dev
    break
  case 'devtest':
    baseUrl = config.baseUrl.devtest
    break
  default:
    baseUrl = config.baseUrl.pro
    break
}

// const baseUrl =
//   'http://192.168.36.109:8300/mock/5c208d8a3c08bc00219c9d08/sso_manager'
const axios = new HttpRequest(baseUrl)
export default axios
