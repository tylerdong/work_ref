/*
 * 二期 仪器管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labInstrumentRepairController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 仪器校准  新增
export const createLabInstrumentRepairDo = params => {
  return instance.post('createLabInstrumentRepairDo', params)
}
// 仪器校准查询
export const getLabInstrumentRepairDoList = params => {
  return instance.post('getLabInstrumentRepairDoList', params)
}

// 仪器校准修改
export const updateLabInstrumentRepairDo = params => {
  return instance.post('updateLabInstrumentRepairDo', params)
}

// 仪器校准删除
export const deleteLabInstrumentRepairDo = params => {
  return instance.post('deleteLabInstrumentRepairDo', params)
}
