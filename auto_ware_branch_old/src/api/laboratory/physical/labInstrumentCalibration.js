/*
 * 二期 仪器管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labInstrumentCalibrationController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 仪器校准  新增
export const createLabInstrumentCalibrationDo = params => {
  return instance.post('createLabInstrumentCalibrationDo', params)
}
// 仪器校准查询
export const getLabInstrumentCalibrationDoList = params => {
  return instance.post('getLabInstrumentCalibrationDoList', params)
}

// 仪器校准修改
export const updateLabInstrumentCalibrationDo = params => {
  return instance.post('updateLabInstrumentCalibrationDo', params)
}

// 仪器校准删除
export const deleteLabInstrumentCalibrationDo = params => {
  return instance.post('deleteLabInstrumentCalibrationDo', params)
}
