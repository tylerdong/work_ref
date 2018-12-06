import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})

// 获取版本日志
export const getVersionNoticeList = params => { return instance.post('systemMessage/version/getVersionNoticeList', params) }
