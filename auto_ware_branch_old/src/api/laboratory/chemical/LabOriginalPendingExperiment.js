/* 实验 -- 左侧列表
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/LabOriginalPendingExperiment',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 获取待实验左侧二级菜单
export const getLabOriginalPendingGroupVo = params => {
  return instance.post('getLabOriginalPendingGroupVo', params)
}
// 获取列表
export const getLabOriginalPendingExperimentDoListBySampleId = params => {
  return instance.post('getLabOriginalPendingExperimentDoListBySampleId', params)
}

// 查询原始记录待实验
export const getLabOriginalPendingExperimentDoListByExperimentId = params => {
  return instance.post('getLabOriginalPendingExperimentDoListByExperimentId', params)
}

// 待实验/原始记录/暂存
export const setProcessingAndUpdateJsonValues = params => {
  return instance.post('setProcessingAndUpdateJsonValues', params)
}

// 待实验/原始记录/提交审核
export const setPendingAndUpdateJsonValues = params => {
  return instance.post('setPendingAndUpdateJsonValues', params)
}

// 待实验/原始记录/驳回
export const setAuditRejectedLabOriginalPending = params => {
  return instance.post('setAuditRejectedLabOriginalPending', params)
}

// 待实验/标样/新增标样模板
export const createGuideSampleLabOriginalPendingExperiment = params => {
  return instance.post('createGuideSampleLabOriginalPendingExperiment', params)
}

// 待实验/标样/获取字典信息
export const getLabOriginalPendingExperimentByGuideSample = params => {
  return instance.post('getLabOriginalPendingExperimentByGuideSample', params)
}

// 待实验/标样/获取列表信息
export const getLabOriginalPendingExperimentDetailsByGuideSample = params => {
  return instance.post('getLabOriginalPendingExperimentDetailsByGuideSample', params)
}

// 待实验/原始记录/tab模板分组
export const getLabTemplateVoBySampleId = params => {
  return instance.post('getLabTemplateVoBySampleId', params)
}

// 待实验/原始记录/原始记录取消项目
export const cancelLabOriginalPendingExperimentDo = params => {
  return instance.post('cancelLabOriginalPendingExperimentDo', params)
}

// 人员管理/人员台帐/实验记录
export const getLabOriginalPendingExperimentDoByUserId = params => {
  return instance.post('getLabOriginalPendingExperimentDoByUserId', params)
}
