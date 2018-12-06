/* 样品管理--报告单
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labRptTemplateController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 报告单
export const getLabRptTemplateDoList = params => {
  return instance.post('getLabRptTemplateDoList', params)
}
// 二期生产带审核Tabs
export const getCheckPendingLabTemplateVoList = params => {
  return instance.post('getCheckPendingLabTemplateVoList', params)
}

