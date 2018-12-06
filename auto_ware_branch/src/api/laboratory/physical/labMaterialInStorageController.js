/*
 * 二期 材料入库
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labMaterialInStorageController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 材料入库， 增加
export const createLabMaterialInStorageDo = params => {
  return instance.post('createLabMaterialInStorageDo', params)
}
// 材料入库， 获取数据列表
export const getLabMaterialInStorageDoList = params => {
  return instance.post('getLabMaterialInStorageDoList', params)
}
