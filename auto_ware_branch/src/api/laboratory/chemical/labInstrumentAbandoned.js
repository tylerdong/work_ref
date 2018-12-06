/*
 * 二期 仪器管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labInstrumentAbandonedController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 仪器报废新增
export const createLabInstrumentAbandonedDo = params => {
  return instance.post('createLabInstrumentAbandonedDo', params)
}
// 仪器报废查询
export const getLabInstrumentAbandonedDoList = params => {
  return instance.post('getLabInstrumentAbandonedDoList', params)
}

// 仪器报废修改
export const updateLabInstrumentAbandonedDo = params => {
  return instance.post('updateLabInstrumentAbandonedDo', params)
}

// 仪器报废删除
export const deleteLabInstrumentAbandonedDo = params => {
  return instance.post('deleteLabInstrumentAbandonedDo', params)
}
