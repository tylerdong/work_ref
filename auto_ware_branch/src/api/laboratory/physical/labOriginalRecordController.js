/* 实验 -- 列表 查询 记录
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labOriginalRecordController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 获取原始记录单列表||实验查询标样
export const getLabOriginalRecordDoList = params => {
  return instance.post('getLabOriginalRecordDoList', params)
}
// 获取下拉列表
export const getLabOriginalRecordDoListByRptRecordId = params => {
  return instance.post('getLabOriginalRecordDoListByRptRecordId', params)
}
// 获取实验查询--Tree
export const getLabSampleManagementGroupVoByOriginalRecords = params => {
  return instance.post('getLabSampleManagementGroupVoByOriginalRecords', params)
}

// 计算公式值
export const calFormula = params => {
  return instance.post('calFormula', params)
}

// 审核
export const produceOriginalRecord = params => {
  return instance.post('produceOriginalRecord', params)
}

// 实验查询/标样/左侧显示
export const getLabTemplateVoListByGuideSample = params => {
  return instance.post('getLabTemplateVoListByGuideSample', params)
}

// 待实验/原始记录/实验
export const getGuideSampleRecordDoListByTemplateId = params => {
  return instance.post('getGuideSampleRecordDoListByTemplateId', params)
}

// 待实验/原始记录单/计算平均数
export const calTableAve = params => {
  return instance.post('calTableAve', params)
}

// 待实验/原始记录单/计算标准偏差
export const calTableStandardDeviation = params => {
  return instance.post('calTableStandardDeviation', params)
}

// 实验查询/原始记录/tab
export const getLabTemplateVoListBySampleId = params => {
  return instance.post('getLabTemplateVoListBySampleId', params)
}

