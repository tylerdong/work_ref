/* 留样管理
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labStaticMapController',
  timeout: window.global.timeout
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

// 获取F值
export const getValue4F = params => {
  return instance.get('getValue4F', {params})
}
