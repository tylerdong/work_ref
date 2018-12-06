/* 实验 -- 列表
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labRptRecordController',
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

// 待实验/报告单/暂存
export const updateLabRptRecordDo = params => {
  return instance.post('updateLabRptRecordDo', params)
}

//  待实验/报告单/提交审核
export const changeStatusAndUpdateLabRptRecordDo = params => {
  return instance.post('changeStatusAndUpdateLabRptRecordDo', params)
}

// 二期生产带审核List
export const getCheckPendingRptRecordoList = params => {
  return instance.post('getCheckPendingRptRecordoList', params)
}
// 二期生产带审核/当日审核通过
export const examineAndVerifyRptRecord = params => {
  return instance.post('examineAndVerifyRptRecord', params)
}
// 二期实验室报表/周报表
export const getWeekExcelLabRptGroupVo = params => {
  return instance.post('getWeekExcelLabRptGroupVo', params)
}
// 二期实验室报表/月报表
export const getMonthExcelLabRptGroupVo = params => {
  return instance.post('getMonthExcelLabRptGroupVo', params)
}
// 二期实验室报表/日报表
export const getCompletedRptRecordoList = params => {
  return instance.post('getCompletedRptRecordoList', params)
}
// 二期实验室报表/日报表导出
export const exportDailyExcel = params => {
  return instance.post('exportDailyExcel', params)
}
// 二期实验室报表/日报表审核/驳回
export const setAuditRejectedRptRecords = params => {
  return instance.post('setAuditRejectedRptRecords', params)
}
