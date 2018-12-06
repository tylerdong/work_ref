/* 二期定等中心值
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labCentralValueDictionaryController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 二期待实验，二期定等中心值，添加样品批号
export const createLabCentralValueDictionary = params => {
  return instance.post('createLabCentralValueDictionary', params)
}

// 二期待实验，二期定等中心值，编辑样品批号
export const updateLabCentralValueDictionary = params => {
  return instance.post('updateLabCentralValueDictionary', params)
}

// 二期待实验，二期定等中心值，删除样品批号
export const deleteLabCentralValueDictionary = params => {
  return instance.post('deleteLabCentralValueDictionary', params)
}

// 二期待实验，二期定等中心值，获取样品批号
export const getLabCentralValueDictionaryList = sampleId => {
  return instance.get('getLabCentralValueDictionaryList?sampleId=' + sampleId)
}

// 二期待实验，二期定等中心值，添加中心值
export const createLabCentralValueDictionaryLine = params => {
  return instance.post('createLabCentralValueDictionaryLine', params)
}

// 二期待实验，二期定等中心值，修改中心值
export const updateLabCentralValueDictionaryLine = params => {
  return instance.post('updateLabCentralValueDictionaryLine', params)
}

// 二期待实验，二期定等中心值，获取中心值操作日志
export const getLabCentralValueDictionaryLogList = params => {
  return instance.post('getLabCentralValueDictionaryLogList', params)
}
// 二期待实验，二期定等中心值，获取中心值列表
export const getLabCentralValueDictionaryLineList = dictionaryId => {
  return instance.post('getLabCentralValueDictionaryLineList?dictionaryId=' + dictionaryId)
}

// 二期待实验，二期定等中心值，删除字典值
export const deleteLabCentralValueDictionaryLine = params => {
  return instance.post('deleteLabCentralValueDictionaryLine', params)
}
