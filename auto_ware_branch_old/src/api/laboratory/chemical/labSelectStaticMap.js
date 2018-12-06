/* 静态map管理
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labSelectStaticMapController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 创建字典
export const createLabSelectStaticMapDo = param => {
  return instance.post('createLabSelectStaticMapDo', param)
}

// 获取所有字典
export const getAllParentDos = () => {
  return instance.post('getAllParentDos')
}

// 根据父节点选择字典选项 , get请求 by ning
export const getLabSelectStaticMapDosByParentId = param => {
  return instance.get(`getLabSelectStaticMapDosByParentId?parentId=${param.parentId}`)
}

// 删除字典
export const deleteLabSelectStaticMapDo = param => {
  return instance.post('deleteLabSelectStaticMapDo', param)
}

// 更新字典
export const updateLabSelectStaticMapDo = param => {
  return instance.post('updateLabSelectStaticMapDo', param)
}
