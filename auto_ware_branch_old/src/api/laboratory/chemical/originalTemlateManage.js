/* 原始记录单模板管理
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labOriginalTemplateController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 查询模板列表
export const getLabOriginalTemplateDoList = params => {
  return instance.post('getLabOriginalTemplateDoList', params)
}

// 创建模板
export const createLabOriginalTemplateDo = params => {
  return instance.post('createLabOriginalTemplateDo', params)
}

// 修改模板
export const updateLabOriginalTemplateDo = params => {
  return instance.post('updateLabOriginalTemplateDo', params)
}

// 获取模板基本信息
export const getLabOriginalTemplateVoById = params => {
  return instance.post('getLabOriginalTemplateVoById', params)
}

// 获取原始记录单模板属性信息
export const getLabOriginalTemplateAttributeDosByTemplateId = params => {
  return instance.post('getLabOriginalTemplateAttributeDosByTemplateId', params)
}

// 获取已经存在的模板信息
export const getLabOriginalTemplateVoList = params => {
  return instance.post('getLabOriginalTemplateVoList', params)
}

// 获取标样模板
export const getAllGuideSampleTemplate = params => {
  return instance.post('getAllGuideSampleTemplate', params)
}
