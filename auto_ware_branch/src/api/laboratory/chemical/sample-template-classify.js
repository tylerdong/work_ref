/* 样品，原始记录单，列表，新增，修改，删除
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labDataGroupDicController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 新增样品，原始记录单
export const createLabDataGroupDicDo = params => {
  return instance.post('createLabDataGroupDicDo', params)
}
// 获取样品，原始记录单列表
export const getLabDataGroupDicDoList = params => {
  return instance.post('getLabDataGroupDicDoList', params)
}

// 更新样品，原始记录单
export const updateLabDataGroupDicDo = params => {
  return instance.post('updateLabDataGroupDicDo', params)
}

// 删除样品，原始记录单
export const deleteLabDataGroupDicDo = params => {
  return instance.post('deleteLabDataGroupDicDo', params)
}
