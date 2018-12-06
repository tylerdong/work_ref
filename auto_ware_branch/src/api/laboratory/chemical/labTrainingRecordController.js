/*
 * 二期 人员管理/培训记录
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labTrainingRecordController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 培训记录 新增
export const createLabTrainingRecordVo = params => {
  return instance.post('createLabTrainingRecordVo', params)
}
// 培训记录 列表
export const getLabTrainingRecordDoList = params => {
  return instance.post('getLabTrainingRecordDoList', params)
}
// 培训记录 更新
export const updateLabTrainingRecordVo = params => {
  return instance.post('updateLabTrainingRecordVo', params)
}
// 培训记录 删除
export const deleteLabTrainingRecordVo = params => {
  return instance.post('deleteLabTrainingRecordVo', params)
}
