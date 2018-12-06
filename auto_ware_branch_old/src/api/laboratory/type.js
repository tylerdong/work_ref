import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labFileController/labDataGroupDicController',
  timeout: window.global.timeout
})
export const getLabDataGroupDicDoList = params => {
  return instance.post('getLabDataGroupDicDoList', params)
}
