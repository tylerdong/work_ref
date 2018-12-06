/*
 * 二期 材料登记
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labMaterialController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 材料登记， 增加
export const createLabMaterialDo = params => {
  return instance.post('createLabMaterialDo', params)
}
// 材料登记， 更新
export const updateLabMaterialDo = params => {
  return instance.post('updateLabMaterialDo ', params)
}
// 材料登记， 删除
export const deleteLabMaterialDo = params => {
  return instance.post('deleteLabMaterialDo ', params)
}
// 材料登记， 列表
export const getLabMaterialDoList = params => {
  return instance.post('getLabMaterialDoList ', params)
}
// 材料登记，选择材料
export const getLabMaterialDosByDataGroupDicId = params => {
  return instance.post('getLabMaterialDosByDataGroupDicId ', params)
}
// 材料登记，根据名字模糊查找
export const getLabMaterialDosByName = params => {
  return instance.post('getLabMaterialDosByName ', params)
}
// 材料统计列表
export const getLabGroupMaterialInAndOutStorageVos = params => {
  return instance.post('getLabGroupMaterialInAndOutStorageVos ', params)
}
// 查找材料库存
export const getInventoryByLabMaterialId = params => {
  return instance.post('getInventoryByLabMaterialId   ', params)
}
