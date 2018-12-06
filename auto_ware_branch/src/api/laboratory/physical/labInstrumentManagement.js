/*
 * 二期 仪器管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labInstrumentManagementController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 仪器管理新增
export const createLabInstrumentManagementDo = params => {
  return instance.post('createLabInstrumentManagementDo', params)
}
// 仪器查询
export const getLabInstrumentManagementDoList = params => {
  return instance.post('getLabInstrumentManagementDoList', params)
}

// 仪器修改
export const updateLabInstrumentManagementDo = params => {
  return instance.post('updateLabInstrumentManagementDo', params)
}

// 仪器管理 删除
export const deleteLabInstrumentManagementDo = params => {
  return instance.post('deleteLabInstrumentManagementDo', params)
}

// 根据id查询仪器
export const getLabInstrumentManagementDoById = params => {
  return instance.get(`getLabInstrumentManagementDoById?instrumentId=${params.instrumentId}`)
}
