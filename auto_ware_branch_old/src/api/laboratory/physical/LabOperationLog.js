/**
 * 实验室操作记录
 * */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/LabOperationLogController',
  timeout: window.global.timeout
})

export const getLabOperationLogDos = param => {
  return instance.post('getLabOperationLogDos', param)
}
