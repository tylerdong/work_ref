/* 样品，原始记录单，列表，新增，修改，删除
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labSampleManagement',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 获取，样品
export const getLabSampleManagementDoList = params => {
  return instance.post('getLabSampleManagementDoList', params)
}
// 新增样品，样品
export const createLabSampleManagementDo = params => {
  return instance.post('createLabSampleManagementDo', params)
}
// 修改样品，样品
export const updateLabSampleManagementDo = params => {
  return instance.post('updateLabSampleManagementDo', params)
}
// 删除样品，样品
export const deleteLabSampleManagementDo = params => {
  return instance.post('deleteLabSampleManagementDo', params)
}
// 根据样品ID获取原始记录单模板列表
export const getLabOriginalTemplateBySampleId = params => {
  return instance.post('getLabOriginalTemplateBySampleId', params)
}

// 样品登记/根据部门查询样品名称
export const getLabSampleManagementVoListByDepartId = params => {
  return instance.post('getLabSampleManagementVoListByDepartId', params)
}

// 日常任务/根据部门查询样品名称
export const getDailyLabSampleManagementVoListByDepartId = params => {
  return instance.post('getDailyLabSampleManagementVoListByDepartId', params)
}

// 根据样品名称查询信息
export const getRptRecordBySampleId = params => {
  return instance.post('getRptRecordBySampleId', params)
}
