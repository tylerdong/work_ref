/* 实验 -- 左侧列表
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labIndexEvaluationController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})
// 待实验/报告单/获取指标值
export const getIndexValue = params => {
  return instance.post('getIndexValue', params)
}

// 二期待实验，计算table评定
export const calAllIndexValue = params => {
  return instance.post('calAllIndexValue', params)
}

// 获取指标
export const groupIndexValue = params => {
  return instance.post('groupIndexValue', params)
}

// 一键评定
export const calAllIndexValueOneKey = params => {
  return instance.post('calAllIndexValueOneKey', params)
}
