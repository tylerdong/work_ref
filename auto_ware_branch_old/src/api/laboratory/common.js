/**
 * 公用请求
 */

import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api',
  timeout: window.global.timeout
})

// 获取验证码
export const getVerCode = params => { return instance.post('userCenter/getVerCode', params) }
