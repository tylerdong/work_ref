/*
 * 二期 材出库
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labMaterialOutStorageController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 材料入库， 增加
export const createLabMaterialOutStorageDo = params => {
  return instance.post('createLabMaterialOutStorageDo', params)
}
// 材料入库， 获取数据列表
export const getLabMaterialOutStorageDoList = params => {
  return instance.post('getLabMaterialOutStorageDoList', params)
}
