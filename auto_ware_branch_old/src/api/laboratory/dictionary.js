import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/dictionary',
  timeout: window.global.timeout
})

// 获取数据字典
export const getDictionaryList = params => {
  return instance.post('getDictionaryList', params)
}

// 新增子数据
export const addDictionary = params => {
  return instance.post('addDictionary', params)
}

// 更新数据
export const updateDictionary = params => {
  return instance.post('updateDictionary', params)
}

// 删除子数据
export const deleteDictionary = params => {
  return instance.post('deleteDictionary', params)
}

// 获取工种信息
export const getDictionaryListByCode = params => {
  return instance.post('getDictionaryListByCode', params)
}
