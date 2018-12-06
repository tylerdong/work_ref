/*
 * 二期 人员管理/培训管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labTrainingPlanController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 培训计划 新增
export const createLabTrainingPlanVo = params => {
  return instance.post('createLabTrainingPlanVo', params)
}
// 培训计划 列表
export const getLabTrainingPlanDoList = params => {
  return instance.post('getLabTrainingPlanDoList', params)
}
// 培训计划 更新
export const updateLabTrainingPlanVo = params => {
  return instance.post('updateLabTrainingPlanVo', params)
}
// 培训计划 删除
export const deleteLabTrainingPlanVo = params => {
  return instance.post('deleteLabTrainingPlanVo', params)
}
// 培训记录 模糊查找
export const getLabTrainingPlanDosByTrainingTile = params => {
  return instance.post('getLabTrainingPlanDosByTrainingTile', params)
}
// 培训计划 查找单条
export const getLabTrainingPlanVoById = params => {
  return instance.post('getLabTrainingPlanVoById', params)
}
