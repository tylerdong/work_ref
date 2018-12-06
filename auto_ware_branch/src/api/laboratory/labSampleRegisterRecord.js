/* 留样管理
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labSampleRegisterRecord',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 待处理
export const getUntreatedLabSampleRegisterRecordDoList = params => {
  return instance.post('getUntreatedLabSampleRegisterRecordDoList', params)
}
// 已处理
export const getProcessedLabSampleRegisterRecordDoList = params => {
  return instance.post('getProcessedLabSampleRegisterRecordDoList', params)
}

// 样品登记
export const createLabSampleRegisterRecordDo = params => {
  return instance.post('createLabSampleRegisterRecordDo', params)
}

// 创建日常任务
export const createDailyLabSampleRegisterRecordDo = params => {
  return instance.post('createDailyLabSampleRegisterRecordDo', params)
}

// 留样管理--未处理--Tree
export const getLabSampleManagementGroupVoByUntreatedRptRecords = params => {
  return instance.post('getLabSampleManagementGroupVoByUntreatedRptRecords', params)
}

// 留样管理--已处理--Tree
export const getLabSampleManagementGroupVoByProcessedRptRecords = params => {
  return instance.post('getLabSampleManagementGroupVoByProcessedRptRecords', params)
}

// 留样管理--未处理--处理
export const processedLabSampleRegisterRecord = params => {
  return instance.post('processedLabSampleRegisterRecord', params)
}
