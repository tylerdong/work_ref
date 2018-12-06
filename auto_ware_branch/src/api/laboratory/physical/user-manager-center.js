import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/system/managerUser',
  timeout: window.global.timeout
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 查询用户列表
// 请求参数：accessToken: , pageIndex: 当前页数 , pageCount: 每页条数
export const normalUserList = params => { return instance.post('getUserList', params) }
