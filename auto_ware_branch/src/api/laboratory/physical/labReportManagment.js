/* 实验报告单管理
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labRptTemplateController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 生成实验报告单
export const createLabRptTemplateDo = param => {
  return instance.post('createLabRptTemplateDo', param)
}

// 更新实验报告单
export const updateLabRptTemplateDo = param => {
  return instance.post('updateLabRptTemplateDo', param)
}

// 实验报告单列表
export const getLabRptTemplateDoList = param => {
  return instance.post('getLabRptTemplateDoList', param)
}

// 获取实验报告单信息
export const getLabRptTemplateVoById = param => {
  return instance.post('getLabRptTemplateVoById', param)
}
