import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labDataAcquisitionController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 二期数据采集，上传文件
export const importData = params => {
  return instance.post('importData', params)
}
