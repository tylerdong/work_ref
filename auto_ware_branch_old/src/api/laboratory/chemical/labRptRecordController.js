/* 实验 -- 列表
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labRptRecordController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 待实验--报告单
export const getLabRptRecordDoList4Processing = params => {
  return instance.post('getLabRptRecordDoList4Processing', params)
}
// 实验查询--报告单
export const getLabRptRecordDoList4Completed = params => {
  return instance.post('getLabRptRecordDoList4Completed', params)
}
// 待实验--左侧Tree
export const getLabSampleManagementGroupVoByProcessingRptRecords = params => {
  return instance.post('getLabSampleManagementGroupVoByProcessingRptRecords', params)
}

// 实验查询--报告单--左侧Tree
export const getLabSampleManagementGroupVoByCompletedRptRecords = params => {
  return instance.post('getLabSampleManagementGroupVoByCompletedRptRecords', params)
}

// 查询报告单
export const getLabRptRecordDoByRptRecordId = params => {
  return instance.post('getLabRptRecordDoByRptRecordId', params)
}

// 生成报告单
export const produceRptRecord = params => {
  return instance.post('produceRptRecord', params)
}

// 待实验/报告单/取消样品
export const cancelRptRecord = params => {
  return instance.post('cancelRptRecord', params)
}

// 化检任务/报告单月趋势图
export const getLabRptMonthTrendGroup = params => { return instance.post('getLabRptMonthTrendGroup', params) }
